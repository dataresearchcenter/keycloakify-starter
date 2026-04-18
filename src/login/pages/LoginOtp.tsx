import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, otpLogin, messagesPerField, auth } = kcContext;
    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} classes={{}} headerNode={msg("doLogIn")} displayInfo={true}>
            <form action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="darc-form-group">
                        <label className="darc-label">{msg("loginChooseAuthenticator")}</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {otpLogin.userOtpCredentials.map(credential => (
                                <label key={credential.id} className="darc-radio-group">
                                    <input
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={credential.id}
                                        defaultChecked={credential.id === otpLogin.selectedCredentialId}
                                        className="darc-radio"
                                    />
                                    <span className="darc-radio-label">{credential.userLabel}</span>
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

            {auth?.authenticationSelections && auth.authenticationSelections.length > 1 && (
                <div className="darc-auth-alternatives">
                    <div className="darc-divider">
                        <span>Try another way</span>
                    </div>
                    <div className="darc-auth-selections">
                        {auth.authenticationSelections.map((selection, index) => (
                            <form key={index} action={url.loginAction} method="post" style={{ display: "inline-block", margin: "4px" }}>
                                <input type="hidden" name="authenticationExecution" value={selection.authExecId} />
                                <button type="submit" className="darc-btn darc-btn--secondary darc-auth-selection">
                                    <span className="darc-auth-selection-name">{selection.displayName}</span>
                                    {selection.helpText && <span className="darc-auth-selection-help">{selection.helpText}</span>}
                                </button>
                            </form>
                        ))}
                    </div>
                </div>
            )}
        </Template>
    );
}
