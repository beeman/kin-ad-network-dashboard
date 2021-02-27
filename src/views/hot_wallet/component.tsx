/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import {
    Segment,
    Header,
    Table,
} from 'semantic-ui-react';
import moment from 'moment';
import base58 from 'micro-base58';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { FormattedMessage } from 'react-intl';
import { HotWallet, Payout } from '../../types';
import { GetByDateAction, SetAction } from '../../actions/payouts';
import { ListAction } from '../../actions/app';

interface Props {
    apps: Record<string, string>;
    data?: HotWallet;
    getByDate: GetByDateAction;
    set: SetAction;
    payouts?: Payout[];
    list: ListAction;
}

class HotWalletComponent extends Component<Props> {
    componentDidMount() {
        const { list, set } = this.props;
        set([]);
        list();
    }

    render() {
        const {
            apps,
            getByDate,
            data,
            payouts,
        } = this.props;

        return (
            <>
                <Segment>
                    <Header><FormattedMessage id="hot_wallet" /></Header>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><FormattedMessage id="public_address" /></Table.Cell>
                                <Table.Cell>{data && data.public_address}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><FormattedMessage id="current_balance" /></Table.Cell>
                                <Table.Cell>{data && data.balance}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
                <Segment>
                    <Header><FormattedMessage id="payout_by_date" /></Header>
                    <SemanticDatepicker
                        onChange={(e, date) => getByDate(moment(date.value as Date).format('YYYYMMDD'))}
                        format="DD-MM-YYYY"
                        showOutsideDays
                        maxDate={moment().toDate()}
                    />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell><FormattedMessage id="payout_app" /></Table.HeaderCell>
                                <Table.HeaderCell><FormattedMessage id="payout_kin_amount" /></Table.HeaderCell>
                                <Table.HeaderCell><FormattedMessage id="payout_revenue" /></Table.HeaderCell>
                                <Table.HeaderCell><FormattedMessage id="payout_kinPrice" /></Table.HeaderCell>
                                <Table.HeaderCell><FormattedMessage id="payout_txId" /></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {payouts && payouts.map((payout) => (
                                <Table.Row key={`${payout.userId}`}>
                                    <Table.Cell>{apps && apps[payout.userId]}</Table.Cell>
                                    <Table.Cell>{payout.kin.toLocaleString()}</Table.Cell>
                                    <Table.Cell>${payout.revenue?.toLocaleString()}</Table.Cell>
                                    <Table.Cell>${payout.kinPrice?.toFixed(8)}</Table.Cell>
                                    <Table.Cell>
                                        <a rel="noopener noreferrer" target="_blank" href={`https://explorer.solana.com/tx/${base58(Buffer.from(payout.txId, 'hex'))}`}>
                                            {`${payout.txId.substr(0, 3)}...${payout.txId.substr(payout.txId.length - 3, payout.txId.length)}`}
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {payouts && payouts.length > 0 && (
                                <Table.Row key="totals">
                                    <Table.Cell><FormattedMessage id="payout_total" /></Table.Cell>
                                    <Table.Cell>
                                        {payouts.reduce((acc, val) => acc += val.kin, 0).toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        ${payouts.reduce((acc, val) => acc += val.revenue, 0).toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell>${payouts[0].kinPrice.toFixed(8)}</Table.Cell>
                                    <Table.Cell>&nbsp;</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Segment>
            </>
        );
    }
}

export default HotWalletComponent;
