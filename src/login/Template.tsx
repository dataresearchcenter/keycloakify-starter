import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import DarcLogo from "./DarcLogo";
import "./assets/theme-light.css";
import "./assets/template.css";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        children
    } = props;

    const { msg, msgStr } = i18n;
    const { realm, locale, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    return (
        <div className="darc-root">
            <header className="darc-header">
                <div className="darc-header-inner">
                    <div className="darc-header-brand">
                        <DarcLogo size={32} />
                        <span className="darc-header-name">OpenAleph</span>
                    </div>
                    {realm.internationalizationEnabled && (locale?.supported?.length ?? 0) > 1 && (
                        <div className="darc-locale-select">
                            <select
                                onChange={e => {
                                    const selected = locale?.supported?.find(l => l.label === e.target.value);
                                    if (selected) window.location.href = selected.url;
                                }}
                                value={locale?.currentLanguageTag}
                            >
                                {locale?.supported?.map(l => (
                                    <option key={l.languageTag} value={l.label}>
                                        {l.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </header>

            <main className="darc-main">
                <div className="darc-card">
                    {headerNode && (
                        <div className="darc-card-header">
                            <h1 className="darc-card-title">{headerNode}</h1>
                        </div>
                    )}

                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div className={`darc-alert darc-alert--${message.type}`}>
                            <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                        </div>
                    )}

                    <div className="darc-card-body">{children}</div>

                    {socialProvidersNode && (
                        <div className="darc-social-providers">
                            <div className="darc-divider">
                                <span>{msg("identity-provider-login-label")}</span>
                            </div>
                            {socialProvidersNode}
                        </div>
                    )}

                    {displayInfo && infoNode && <div className="darc-card-info">{infoNode}</div>}
                </div>
            </main>

            <footer className="darc-footer">
                <span>
                    Made with ❤️ by{" "}
                    <a href="https://dataresearchcenter.org" target="_blank" rel="noreferrer">
                        DARC
                    </a>
                </span>
            </footer>
        </div>
    );
}
