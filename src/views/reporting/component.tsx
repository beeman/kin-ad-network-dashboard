/* eslint-disable no-bitwise */
import React, { Component } from 'react';
import {
    Header, Segment, Loader, Checkbox, Form, Dropdown, Table,
} from 'semantic-ui-react';
import moment from 'moment';
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import { GetReportingAction } from '../../actions/reporting';
import { convertReport, reportingNetworks } from '../../helpers/reporting';
import { getReportingData as GetReportingData } from '../../selectors/reporting';
import { DataType } from '../../types.d';

const colors = [
    166505,
    104128,
    799071,
    994822,
    177568,
    609296,
    345748,
    670172,
    383467,
    136048,
    135740,
    360775,
    672116,
    509840,
    835083,
    206704,
    342566,
    339071,
    124251,
    225154,
    910084,
    562806,
    952183,
    871983,
    529808,
    412270,
    945483,
    157047,
    811734,
    837274,
];

interface State {
    dataType: DataType;
    deselectedApps?: string[];
    deselectedNetworks?: string[];
    currentDate: { startDate?: number, numDays: number },
}

interface Props extends WrappedComponentProps {
    getReporting: GetReportingAction;
    reporting?: ReturnType<typeof GetReportingData>;
    group?: string;
}

class Reporting extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentDate: { startDate: undefined, numDays: 0 },
            deselectedApps: undefined,
            deselectedNetworks: undefined,
            dataType: DataType.REVENUE,
        };

        this.updateDateRange = this.updateDateRange.bind(this);
    }

    componentDidMount() {
        const { getReporting } = this.props;
        const startDate = moment().subtract(6, 'days');
        const numDays = 6;
        getReporting(startDate, numDays + 1);
        this.setState({ currentDate: { startDate: startDate.unix(), numDays } });
    }

    updateDateRange(value: Date | Date[] | null) {
        if (!value || value instanceof Date || value.length === 1) {
            return;
        }
        const [startDate, endDate]: Date[] = value as Date[];
        const numDays = moment(endDate).diff(moment(startDate), 'days');

        const { currentDate } = this.state;
        if (currentDate.startDate === moment(startDate).unix() && currentDate.numDays === numDays) {
            return;
        }

        const { getReporting } = this.props;
        getReporting(moment(startDate), numDays + 1);
        this.setState({ currentDate: { startDate: moment(startDate).unix(), numDays } });
    }

    updateDataType(dataType: DataType) {
        this.setState({ dataType });
    }

    toggleAppFilter(app: string) {
        const { deselectedApps } = this.state;

        if (deselectedApps && deselectedApps.includes(app)) {
            this.setState({
                deselectedApps: deselectedApps.filter((selectedApp) => selectedApp !== app),
            });
        } else {
            this.setState({ deselectedApps: [...deselectedApps || [], app] });
        }
    }

    toggleNetworkFilter(app: string) {
        const { deselectedNetworks } = this.state;

        if (deselectedNetworks && deselectedNetworks.includes(app)) {
            this.setState({
                deselectedNetworks: deselectedNetworks.filter((selectedApp) => selectedApp !== app),
            });
        } else {
            this.setState({ deselectedNetworks: [...deselectedNetworks || [], app] });
        }
    }

    render() {
        const {
            deselectedApps, dataType, deselectedNetworks, currentDate,
        } = this.state;
        const { reporting, intl, group } = this.props;

        if (!reporting) {
            return (
                <>
                    <Header size="huge"><FormattedMessage id="reporting" /></Header>
                    <Loader active />
                </>
            );
        }

        const { chartData, lines } = convertReport(
            reporting,
            dataType,
            deselectedApps,
            deselectedNetworks,
        );
        const allApps = Array.from(
            new Set(Object.values(reporting).map((report) => Object.keys(report)).flat()),
        );
        allApps.unshift('total');

        let totalData: Record<string, number> = chartData.reduce((acc, dayData) => {
            Object.entries(dayData).forEach(([app, value]) => {
                if (app === 'name') {
                    return;
                }

                if (!acc[app]) {
                    acc[app] = 0;
                }

                acc[app] += value;
            });
            return acc;
        }, {});

        if (dataType === DataType.ECPM || dataType === DataType.FILL_RATE) {
            totalData = Object.entries(totalData).reduce((acc, [key, value]) => {
                const numDays = chartData.length;
                acc[key] = Math.floor((100 * value) / numDays) / 100;
                return acc;
            }, {} as Record<string, number>);
        }

        return (
            <div>
                <Header size="huge"><FormattedMessage id="reporting" /></Header>
                <Segment.Group horizontal compact>
                    <Segment>
                        {currentDate.startDate && (
                            <SemanticDatepicker
                                type="range"
                                onChange={(e, data) => this.updateDateRange(data.value)}
                                format="DD-MM-YYYY"
                                showOutsideDays
                                maxDate={moment().toDate()}
                                value={[
                                    moment(currentDate.startDate * 1000).toDate(),
                                    moment(currentDate.startDate * 1000).add(currentDate.numDays, 'days').toDate(),
                                ]}
                            />
                        )}
                    </Segment>
                    <Segment>
                        <Dropdown
                            placeholder="Data Type"
                            fluid
                            selection
                            onChange={(e, data) => this.updateDataType(data.value as DataType)}
                            options={[
                                {
                                    key: DataType.REVENUE,
                                    text: intl.formatMessage({ id: 'revenue' }),
                                    value: DataType.REVENUE,
                                },
                                {
                                    key: DataType.ECPM,
                                    text: intl.formatMessage({ id: 'eCPM' }),
                                    value: DataType.ECPM,
                                },
                                {
                                    key: DataType.CLICKS,
                                    text: intl.formatMessage({ id: 'clicks' }),
                                    value: DataType.CLICKS,
                                },
                                {
                                    key: DataType.IMPRESSIONS,
                                    text: intl.formatMessage({ id: 'impressions' }),
                                    value: DataType.IMPRESSIONS,
                                },
                                {
                                    key: DataType.FILL_RATE,
                                    text: intl.formatMessage({ id: 'fill_rate' }),
                                    value: DataType.FILL_RATE,
                                },
                            ]}
                            value={dataType}
                        />
                    </Segment>
                </Segment.Group>

                {chartData && (
                    <>
                        <Segment>
                            <Header><FormattedMessage id="totals" /></Header>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell><FormattedMessage id="apps_name" /></Table.HeaderCell>
                                        <Table.HeaderCell><FormattedMessage id={(dataType === DataType.ECPM || dataType === DataType.FILL_RATE) ? 'avg_dates' : 'sum_dates'} /></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {totalData && Object.entries(totalData).map(([app, value]) => (
                                        <Table.Row key={app}>
                                            <Table.Cell>{app}</Table.Cell>
                                            <Table.Cell>{Math.round(100 * value) / 100}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Header><FormattedMessage id="report_per_day" /></Header>
                            <ResponsiveContainer height={500} width="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 5, right: 20, bottom: 5, left: 0,
                                    }}
                                >
                                    {lines.map((line, i) => <Line key={line} type="monotone" strokeWidth={2} dataKey={line} stroke={`#${colors[i]}`} />)}
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <Legend layout="horizontal" verticalAlign="top" align="right" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                            <FormattedMessage id="report_two_days_accurate" />
                        </Segment>
                        <Segment.Group horizontal>
                            {group === 'AdminGroup' && (
                                <Segment>
                                    <Header size="medium"><FormattedMessage id="reporting_select_apps" /></Header>
                                    <Form>
                                        {allApps.map(
                                            (app) => (
                                                <Form.Field key={app}>
                                                    <Checkbox
                                                        // eslint-disable-next-line max-len
                                                        checked={!deselectedApps || !deselectedApps.includes(app)}
                                                        label={app}
                                                        onClick={() => this.toggleAppFilter(app)}
                                                    />
                                                </Form.Field>
                                            ),
                                        )}
                                    </Form>
                                </Segment>
                            )}
                            <Segment>
                                <Header size="medium"><FormattedMessage id="reporting_select_networks" /></Header>
                                <Form>
                                    {reportingNetworks.map(
                                        (network) => (
                                            <Form.Field key={network}>
                                                <Checkbox
                                                    // eslint-disable-next-line max-len
                                                    checked={!deselectedNetworks || !deselectedNetworks.includes(network)}
                                                    label={intl.formatMessage({ id: `mediation_network_${network}` })}
                                                    // eslint-disable-next-line max-len
                                                    onClick={() => this.toggleNetworkFilter(network)}
                                                />
                                            </Form.Field>
                                        ),
                                    )}
                                </Form>
                            </Segment>
                        </Segment.Group>
                    </>
                )}
            </div>
        );
    }
}

export default injectIntl(Reporting);
