import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    const { msg } = i18n;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("updatePasswordTitle")}
            displayInfo={false}
        >
            <form action={url.loginAction} method="post">
                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="password-new">
                        {msg("passwordNew")}
                    </label>
                    <div className="darc-input-group">
                        <input
                            id="password-new"
                            name="password-new"
                            type={showPassword ? "text" : "password"}
                            className={`darc-input${messagesPerField.existsError("password", "password-confirm") ? " darc-input--error" : ""}`}
                            autoComplete="new-password"
                            autoFocus
                            style={{ paddingRight: "60px" }}
                        />
                        <button
                            type="button"
                            className="darc-input-toggle"
                            onClick={() => setShowPassword(v => !v)}
                            aria-label={showPassword ? msg("hidePassword") : msg("showPassword")}
                        >
                            {showPassword ? "hide" : "show"}
                        </button>
                    </div>
                    {messagesPerField.existsError("password") && (
                        <span className="darc-field-error">
                            <span dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("password") }} />
                        </span>
                    )}
                </div>

                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="password-confirm">
                        {msg("passwordConfirm")}
                    </label>
                    <div className="darc-input-group">
                        <input
                            id="password-confirm"
                            name="password-confirm"
                            type={showPasswordConfirm ? "text" : "password"}
                            className={`darc-input${messagesPerField.existsError("password-confirm") ? " darc-input--error" : ""}`}
                            autoComplete="new-password"
                            style={{ paddingRight: "60px" }}
                        />
                        <button
                            type="button"
                            className="darc-input-toggle"
                            onClick={() => setShowPasswordConfirm(v => !v)}
                            aria-label={showPasswordConfirm ? msg("hidePassword") : msg("showPassword")}
                        >
                            {showPasswordConfirm ? "hide" : "show"}
                        </button>
                    </div>
                    {messagesPerField.existsError("password-confirm") && (
                        <span className="darc-field-error">
                            <span dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("password-confirm") }} />
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
        </Template>
    );
}