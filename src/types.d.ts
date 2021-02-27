import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthChallengeName =
  | 'NEW_PASSWORD_REQUIRED'
  | 'SMS_MFA'
  | 'SOFTWARE_TOKEN_MFA'
  | 'MFA_SETUP';

export type AuthUser = CognitoUser & {
    challengeName: AuthChallengeName
};

export enum MediationNetwork {
    IRONSOURCE = 'IRONSOURCE',
    ADMOB_VIA_IS = 'ADMOB_VIA_IS',
    ADMOB = 'ADMOB',
    ADGEM = 'ADGEM',
}

export interface ReportingEntry {
    mediationNetwork: MediationNetwork;
    id: string;
    name: string;
}

interface DDBEntry {
    dataIdx: string;
    name: string;
    userId: string;
    wallet: string;
    appId: string;
}

export type UserQueryResult = DDBEntry;

export enum DataType {
    REVENUE = 'revenue',
    ECPM = 'eCPM',
    CLICKS = 'clicks',
    IMPRESSIONS = 'impressions',
    FILL_RATE = 'appFillRate'
}

export interface HotWallet {
    service_version: string;
    horizon: string;
    app_id: string;
    public_address: string;
    balance: number;
    channels: {
        non_free_channels: number;
        free_channels: number;
        total_channels: number;
    };
}

export interface Payout {
    date: string;
    kin: number;
    txId: string;
    userId: string;
    kinPrice: number;
    revenue: number;
}
