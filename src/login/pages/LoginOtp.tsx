import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, otpLogin, messagesPerField } = kcContext;
    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} classes={{}} headerNode={msg("doLogIn")}>
            <form action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="darc-form-group">
                        <label className="darc-label">{msg("loginChooseAuthenticator")}</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {otpLogin.userOtpCredentials.map(credential => (
                                <label key={credential.id} className="darc-checkbox-group" style={{ cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={credential.id}
                                        defaultChecked={credential.id === otpLogin.selectedCredentialId}
                                        style={{ accentColor: "var(--color-accent)" }}
                                    />
                                    <span className="darc-checkbox-label">{credential.userLabel}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="otp">
                        {msg("loginOtpOneTime")}
                    </label>
                    <input
                        id="otp"
                        className={`darc-input darc-input--centered${messagesPerField.existsError("totp") ? " darc-input--error" : ""}`}
                        name="otp"
                        type="text"
                        autoComplete="one-time-code"
                        autoFocus
                        inputMode="numeric"
                        placeholder="000000"
                        maxLength={6}
                    />
                    {messagesPerField.existsError("totp") && (
                        <span className="darc-field-error">
                            <span dangerouslySetInnerHTML={{ __html: messagesPerField.get("totp") }} />
                        </span>
                    )}
                </div>

                <button className="darc-btn darc-btn--primary" type="submit">
                    {msg("doLogIn")}
                </button>
            </form>
        </Template>
    );
}
