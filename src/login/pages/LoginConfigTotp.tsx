import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;
    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} classes={{}} headerNode={msg("loginTotpTitle")} displayInfo={false}>
            <ol className="darc-totp-steps">
                <li className="darc-totp-step">
                    <p className="darc-totp-step-title">{msg("loginTotpStep1")}</p>
                    <ul className="darc-totp-apps">
                        <li>
                            <strong>FreeOTP</strong>:{" "}
                            <a href="https://freeotp.github.io/" target="_blank" rel="noopener">
                                Android
                            </a>{" "}
                            /{" "}
                            <a href="https://apps.apple.com/us/app/freeotp/id872559395" target="_blank" rel="noopener">
                                iPhone
                            </a>
                        </li>
                        <li>
                            <strong>Google Authenticator</strong>:{" "}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                target="_blank"
                                rel="noopener"
                            >
                                Android
                            </a>{" "}
                            /{" "}
                            <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noopener">
                                iPhone
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="darc-totp-step">
                    <p className="darc-totp-step-title">{msg("loginTotpStep2")}</p>
                    <div className="darc-qr-container">
                        <img src={`data:image/png;base64,${totp.totpSecretQrCode}`} alt="QR Code" className="darc-qr-code" />
                        <div className="darc-qr-fallback">
                            <p className="darc-qr-fallback-text">{msg("loginTotpUnableToScan")}</p>
                            <div className="darc-secret-key">
                                <span className="darc-secret-key-label">Manual entry key:</span>
                                <code className="darc-secret-key-value">{totp.totpSecretEncoded}</code>
                            </div>
                        </div>
                    </div>
                </li>

                <li className="darc-totp-step">
                    <p className="darc-totp-step-title">{msg("loginTotpStep3")}</p>
                    <form action={url.loginAction} className="darc-totp-form" method="post">
                        <div className="darc-form-group">
                            <label className="darc-label" htmlFor="totp">
                                {msg("authenticatorCode")}
                            </label>
                            <input
                                type="text"
                                id="totp"
                                name="totp"
                                className="darc-input darc-input--centered"
                                autoComplete="off"
                                autoFocus
                                placeholder="000000"
                                maxLength={6}
                                pattern="[0-9]{6}"
                            />
                        </div>

                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" name="mode" value={mode} />}

                        <div className="darc-form-group">
                            <label className="darc-label" htmlFor="userLabel">
                                {msg("loginTotpDeviceName")}
                                {totp.otpCredentials && totp.otpCredentials.length >= 1 && <span className="darc-required"> *</span>}
                            </label>
                            <input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                className={`darc-input${messagesPerField.existsError("userLabel") ? " darc-input--error" : ""}`}
                                placeholder="My Device"
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <span className="darc-field-error">
                                    <span dangerouslySetInnerHTML={{ __html: messagesPerField.get("userLabel") }} />
                                </span>
                            )}
                        </div>

                        <div className="darc-form-actions">
                            <button className="darc-btn darc-btn--primary" type="submit">
                                {msg("doSubmit")}
                            </button>
                            {!isAppInitiatedAction && (
                                <a className="darc-btn darc-btn--secondary" href={url.loginUrl}>
                                    {msg("doCancel")}
                                </a>
                            )}
                        </div>
                    </form>
                </li>
            </ol>
        </Template>
    );
}
