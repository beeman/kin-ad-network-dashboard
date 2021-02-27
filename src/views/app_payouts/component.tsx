import React, { Component } from 'react';
import {
    Header, Table,
} from 'semantic-ui-react';
import moment from 'moment';
import base58 from 'micro-base58';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { GetAction } from '../../actions/payouts';
import { Payout } from '../../types';

interface Props {
    payouts?: Payout[];
    group?: string;
    get: GetAction;
    username: string;
}

class Payouts extends Component<Props> {
    componentDidMount() {
        const { get, username } = this.props;
        get(username);
    }

    render() {
        const { group, payouts } = this.props;

        return (
            <div>
                {group === 'AdminGroup' && (
                    <Link to="/">&laquo; <FormattedMessage id="back" /></Link>
                )}
                <Header size="huge"><FormattedMessage id="apps_payouts" /></Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><FormattedMessage id="payout_date" /></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id="payout_kin_amount" /></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id="payout_revenue" /></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id="payout_kinPrice" /></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id="payout_txId" /></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {payouts && payouts.sort((a, b) => (moment(a.date, 'YYYYMMDD').unix() > moment(b.date, 'YYYYMMDD').unix() ? -1 : 1)).map((payout) => (
                            <Table.Row key={`${payout.date}`}>
                                <Table.Cell>{moment(payout.date, 'YYYYMMDD').format('DD MMM YYYY')}</Table.Cell>
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
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Payouts;
