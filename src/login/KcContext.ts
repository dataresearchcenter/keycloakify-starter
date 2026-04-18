/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties?: Record<string, string>;
    auth?: {
        showUsername?: boolean;
        showResetCredentials?: boolean;
        showTryAnotherWayLink?: boolean;
        attemptedUsername?: string;
        authenticationSelections?: Array<{
            helpText: string;
            displayName: string;
            iconCssClass: string;
            authExecId: string;
        }>;
    };
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContextExtensionPerPage = {
    "logout-confirm.ftl": {
        logoutConfirm: {
            sessionState: string;
        };
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
