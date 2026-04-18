import { Fragment } from "react";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                realm.registrationAllowed && !registrationDisabled ? (
                    <div className="darc-info">
                        <span>
                            {msg("noAccount")}{" "}
                            <a href={url.registrationUrl} className="darc-link">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                ) : undefined
            }
            headerNode={
                <div className="darc-passkey-header">
                    <div className="darc-passkey-icon">🔐</div>
                    <h1>{msg("webauthn-login-title") || "Sign in with passkey"}</h1>
                    <p className="darc-passkey-subtitle">Use your fingerprint, face, or device PIN to sign in securely</p>
                </div>
            }
        >
            <div className="darc-webauthn-form">
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>

                {authenticators && (
                    <>
                        <form id="authn_select" className="darc-hidden-form">
                            {authenticators.authenticators.map((authenticator, index) => (
                                <input key={index} type="hidden" name="authn_use_chk" value={authenticator.credentialId} />
                            ))}
                        </form>

                        {shouldDisplayAuthenticators && authenticators.authenticators.length > 1 && (
                            <div className="darc-authenticator-list">
                                <h3 className="darc-authenticator-title">{msg("webauthn-available-authenticators") || "Available authenticators"}</h3>
                                <div className="darc-authenticator-grid">
                                    {authenticators.authenticators.map((authenticator, i) => (
                                        <div key={i} className="darc-authenticator-item">
                                            <div className="darc-authenticator-icon">🔐</div>
                                            <div className="darc-authenticator-content">
                                                <div className="darc-authenticator-label">{advancedMsg(authenticator.label)}</div>
                                                {authenticator.transports.displayNameProperties?.length && (
                                                    <div className="darc-authenticator-transport">
                                                        {authenticator.transports.displayNameProperties
                                                            .map((displayNameProperty, i, arr) => ({
                                                                displayNameProperty,
                                                                hasNext: i !== arr.length - 1
                                                            }))
                                                            .map(({ displayNameProperty, hasNext }) => (
                                                                <Fragment key={displayNameProperty}>
                                                                    {advancedMsg(displayNameProperty)}
                                                                    {hasNext && <span>, </span>}
                                                                </Fragment>
                                                            ))}
                                                    </div>
                                                )}
                                                <div className="darc-authenticator-created">
                                                    <span>{msg("webauthn-createdAt-label") || "Created:"} </span>
                                                    <span>{authenticator.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className="darc-webauthn-action">
                    <div className="darc-passkey-visual">
                        <div className="darc-passkey-animation">
                            <div className="darc-passkey-pulse"></div>
                            <div className="darc-passkey-icon-large">🔐</div>
                        </div>
                        <p className="darc-passkey-instruction">Touch your security key or use biometric authentication</p>
                    </div>

                    <button id={authButtonId} type="button" className="darc-btn darc-btn--primary darc-btn--large" autoFocus>
                        {msgStr("webauthn-doAuthenticate") || "Sign in with passkey"}
                    </button>
                </div>
            </div>
        </Template>
    );
}
