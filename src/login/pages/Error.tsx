import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { message, client, skipLink } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("errorTitle")}
            displayMessage={false}
        >
            <div className="darc-alert darc-alert--error" style={{ margin: 0, marginBottom: "20px" }}>
                <span dangerouslySetInnerHTML={{ __html: message.summary }} />
            </div>

            {!skipLink && client?.baseUrl && (
                <a className="darc-btn darc-btn--secondary" href={client.baseUrl} style={{ display: "inline-flex" }}>
                    {msg("backToApplication")}
                </a>
            )}
        </Template>
    );
}
