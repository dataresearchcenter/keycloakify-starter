import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, social } = kcContext;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            socialProvidersNode={
                social?.providers && social.providers.length > 0 ? (
                    <div className="darc-social-buttons">
                        {social.providers.map(provider => (
                            <a key={provider.alias} href={provider.loginUrl} className="darc-btn darc-btn--secondary darc-btn--social">
                                {provider.displayName}
                            </a>
                        ))}
                    </div>
                ) : null
            }
            infoNode={
                <span>
                    {msg("noAccount")}{" "}
                    <a className="darc-link" href={url.registrationUrl}>
                        {msg("doRegister")}
                    </a>
                </span>
            }
        >
            {realm.password && (
                <form onSubmit={() => setIsLoginButtonDisabled(true)} action={url.loginAction} method="post">
                    {!usernameHidden && (
                        <div className="darc-form-group">
                            <label className="darc-label" htmlFor="username">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </label>
                            <input
                                id="username"
                                className={`darc-input${messagesPerField.existsError("username", "password") ? " darc-input--error" : ""}`}
                                name="username"
                                type="text"
                                defaultValue={login.username ?? ""}
                                autoFocus
                                autoComplete="username"
                                spellCheck={false}
                            />
                            {messagesPerField.existsError("username", "password") && (
                                <span className="darc-field-error">
                                    <span dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("username", "password") }} />
                                </span>
                            )}
                        </div>
                    )}

                    <div className="darc-form-group">
                        <label className="darc-label" htmlFor="password">
                            {msg("password")}
                        </label>
                        <div className="darc-input-group">
                            <input
                                id="password"
                                className={`darc-input${messagesPerField.existsError("username", "password") ? " darc-input--error" : ""}`}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                style={{ paddingRight: "60px" }}
                            />
                            <button
                                type="button"
                                className="darc-input-toggle"
                                onClick={() => setShowPassword(v => !v)}
                                aria-label={showPassword ? msgStr("hidePassword") : msgStr("showPassword")}
                            >
                                {showPassword ? "hide" : "show"}
                            </button>
                        </div>
                    </div>

                    <div className="darc-form-footer">
                        {realm.rememberMe && !usernameHidden && (
                            <label className="darc-checkbox-group">
                                <input
                                    className="darc-checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    defaultChecked={!!login.rememberMe}
                                />
                                <span className="darc-checkbox-label">{msg("rememberMe")}</span>
                            </label>
                        )}
                        {realm.resetPasswordAllowed && (
                            <a className="darc-link" href={url.loginResetCredentialsUrl}>
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                    <button className="darc-btn darc-btn--primary" type="submit" disabled={isLoginButtonDisabled}>
                        {msg("doLogIn")}
                    </button>
                </form>
            )}
        </Template>
    );
}
