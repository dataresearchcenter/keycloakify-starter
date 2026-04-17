import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, user } = kcContext;
    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} classes={{}} headerNode={msg("emailVerifyTitle")} displayMessage={false}>
            <p style={{ marginTop: 0, color: "var(--color-text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
                {msg("emailVerifyInstruction1", user?.email ?? "")}
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                {msg("emailVerifyInstruction2")}{" "}
                <a className="darc-link" href={url.loginAction}>
                    {msg("doClickHere")}
                </a>{" "}
                {msg("emailVerifyInstruction3")}
            </p>
        </Template>
    );
}
