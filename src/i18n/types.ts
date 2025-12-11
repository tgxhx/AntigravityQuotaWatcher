export type TranslationKey =
    // Status Bar
    | 'status.initializing'
    | 'status.detecting'
    | 'status.fetching'
    | 'status.retrying'
    | 'status.error'
    | 'status.notLoggedIn'
    | 'status.refreshing'

    // Tooltip
    | 'tooltip.title'
    | 'tooltip.credits'
    | 'tooltip.available'
    | 'tooltip.remaining'
    | 'tooltip.depleted'
    | 'tooltip.resetTime'
    | 'tooltip.model'
    | 'tooltip.status'
    | 'tooltip.error'
    | 'tooltip.notLoggedIn'
    | 'tooltip.clickToRetry'
    | 'tooltip.clickToRecheck'

    // Messages
    | 'msg.portDetectionFailed'
    | 'msg.portDetectionSuccess'
    | 'msg.quotaRefreshed'

    // Notifications (vscode.window.show*Message)
    | 'notify.unableToDetectProcess'
    | 'notify.retry'
    | 'notify.cancel'
    | 'notify.refreshingQuota'
    | 'notify.recheckingLogin'
    | 'notify.detectingPort'
    | 'notify.detectionSuccess'
    | 'notify.unableToDetectPort'
    | 'notify.unableToDetectPortHint1'
    | 'notify.unableToDetectPortHint2'
    | 'notify.portDetectionFailed'
    | 'notify.configUpdated'
    | 'notify.portCommandRequired'
    | 'notify.portCommandRequiredDarwin';

export interface TranslationMap {
    [key: string]: string;
}
