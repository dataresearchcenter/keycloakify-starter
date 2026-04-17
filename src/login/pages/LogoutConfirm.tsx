import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, client, logoutConfirm } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("logoutConfirmTitle")}
            displayInfo={false}
        >
            <div className="darc-logout-content">
                <div className="darc-logout-message">
                    <p>{msg("logoutConfirmHeader")}</p>
                    {client.name && (
                        <p>
                            <strong>{client.name}</strong>
                        </p>
                    )}
                </div>

                <div className="darc-form-actions">
                    <form action={url.logoutConfirmAction} method="post" style={{ display: "inline" }}>
                        <input type="hidden" name="session_state" value={logoutConfirm.sessionState} />
                        <button className="darc-btn darc-btn--primary" type="submit">
                            {msg("doLogout")}
                        </button>
                    </form>
                    
                    <a href={url.loginRestartFlowUrl || "#"} className="darc-btn darc-btn--secondary">
                        {msg("doCancel")}
                    </a>
                </div>
            </div>
        </Template>
    );
}