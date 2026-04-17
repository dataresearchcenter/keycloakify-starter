import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("emailForgotTitle")}
            displayInfo
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
        >
            <form action={url.loginAction} method="post">
                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="username">
                        {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                    </label>
                    <input
                        id="username"
                        className={`darc-input${messagesPerField.existsError("username") ? " darc-input--error" : ""}`}
                        name="username"
                        type="text"
                        autoFocus
                        autoComplete="username"
                        defaultValue={auth.attemptedUsername ?? ""}
                    />
                    {messagesPerField.existsError("username") && (
                        <span className="darc-field-error">
                            <span dangerouslySetInnerHTML={{ __html: messagesPerField.get("username") }} />
                        </span>
                    )}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <a className="darc-btn darc-btn--secondary" href={url.loginUrl}>
                        {msg("backToLogin")}
                    </a>
                    <button className="darc-btn darc-btn--primary" type="submit" style={{ flex: 1 }}>
                        {msg("doSubmit")}
                    </button>
                </div>
            </form>
        </Template>
    );
}
