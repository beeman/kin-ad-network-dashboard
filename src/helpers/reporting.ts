import moment from 'moment';

import { getReportingData as GetReportingData } from '../selectors/reporting';
import { MediationNetwork, DataType } from '../types.d';

export const reportingNetworks = [
    MediationNetwork.ADMOB,
    MediationNetwork.IRONSOURCE,
    MediationNetwork.ADMOB_VIA_IS,
    MediationNetwork.ADGEM,
];

export const convertReport = (
    reporting: ReturnType<typeof GetReportingData>,
    dataType: DataType,
    deselectedApps?: string[],
    deselectedNetworks?: string[],
) => {
    const chartData = [] as { [x: string]: any }[];
    const lines = ['total'] as string[];

    const dataToFetch = dataType === DataType.ECPM ? 'revenue' : dataType;

    if (!reporting) {
        return { chartData, lines: [] };
    }

    for (let i = 0; i < Object.keys(reporting).length; i += 1) {
        const date = Object.keys(reporting)[i];
        const name = moment(date, 'YYYYMMDD').format('DD-MM-YYYY');
        const users = reporting[date];
        if (!users) {
            chartData.push({ name });
        } else {
            const dayStats = { name } as Record<string, any>;
            const dayStatsImpressions = {} as Record<string, any>;
            const appCounter = {} as Record<string, number>;

            Object.values(users).forEach((user) => {
                Object.values(user).forEach((networkReport) => {
                    // Network filter
                    if (
                        deselectedNetworks
                        && deselectedNetworks.includes(networkReport.network as string)
                    ) {
                        return;
                    }

                    // Totals
                    if (!deselectedApps || !deselectedApps.includes('total')) {
                        if (!dayStats.total) {
                            dayStats.total = 0;
                            dayStatsImpressions.total = 0;
                            appCounter.total = 0;
                        }
                        // eslint-disable-next-line max-len
                        dayStats.total = Math.round(100 * ((networkReport[dataToFetch] || 0) as number + dayStats.total)) / 100;
                        dayStatsImpressions.total += networkReport.impressions;
                        appCounter.total += 1;
                    }

                    // Per app
                    const username = networkReport.username as string;
                    if (!deselectedApps || !deselectedApps.includes(username)) {
                        if (!dayStats[username]) {
                            dayStats[username] = 0;
                            dayStatsImpressions[username] = 0;
                            appCounter[username] = 0;
                        }
                        // eslint-disable-next-line max-len
                        dayStats[username] = Math.round(100 * ((networkReport[dataToFetch] || 0) + dayStats[username])) / 100;
                        dayStatsImpressions[username] += networkReport.impressions;
                        appCounter[username] += 1;
                        lines.push(username);
                    }
                });
            });

            if (dataType === DataType.ECPM) {
                const dayStatKeys = Object.keys(dayStats);
                // eslint-disable-next-line
                for (const i in dayStatKeys) {
                    const key = dayStatKeys[i];
                    if (key !== 'name') {
                        // eslint-disable-next-line max-len
                        dayStats[key] = Math.round(100 * (dayStats[key] / (dayStatsImpressions[key] / 1000))) / 100;
                    }
                }
            }

            if (dataType === DataType.FILL_RATE) {
                const dayStatKeys = Object.keys(dayStats);
                // eslint-disable-next-line
                for (const i in dayStatKeys) {
                    const key = dayStatKeys[i];
                    if (key !== 'name') {
                        // eslint-disable-next-line max-len
                        dayStats[key] = Math.round(100 * (dayStats[key] / appCounter[key])) / 100;
                    }
                }
            }

            // Remove "myusername"
            delete dayStats.myusername;

            chartData.push(dayStats);
        }
    }

    return { chartData, lines: Array.from(new Set(lines)) };
};
