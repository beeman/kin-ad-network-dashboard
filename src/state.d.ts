import {
    ReportingEntry,
    HotWallet,
    Payout,
} from './types';

interface Init {
    complete: boolean;
}

// Must be flat object as this is returned from DDB
export interface AppInfo {
    dataIdx: string;
    userId: string;
    wallet: string;
    appId: string;
    username: string;
}

interface AppState extends AppInfo {
    username: string;
    entries?: {
        reporting: ReportingEntry[];
    };
}

interface App {
    createSubmitting: boolean;
    createEntrySubmitting: boolean;
    createErrorMessage?: string;
    apps: Record<string, string>;
    currentApp?: AppState;
}

interface User {
    errorMessage?: string;
    isLoggedIn: boolean;
    userId?: string;
    group?: string;

    loginSubmitting: boolean;

    resetPasswordSubmitting: boolean;
    resetPasswordErrorMessage?: string;

    forgotPasswordSubmitting: boolean;
    forgotPasswordErrorMessage?: string;

    forgotPasswordResetSubmitting: boolean;
    forgotPasswordResetErrorMessage?: string;
}

interface Locales {
    lang: string;
    messages: Record<string, string>
}

interface Reporting {
    // userid -> date -> network -> data
    reporting?: {
        [date: string]: {
            [username: string]: {
                [networkMediationId: string]: Record<string, string | number>
            }
        }
    };
}

interface HotWalletStatus {
    hotWallet?: HotWallet;
}

interface Payouts {
    payouts?: Payout[]
}

interface State {
    app: App;
    init: Init;
    locales: Locales;
    user: User;
    reporting: Reporting;
    hotWallet: HotWalletStatus;
    payouts: Payouts;
}

export default State;
