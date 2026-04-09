import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Suspense } from "react";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: React.ComponentType<any>;
    doMakeUserConfirmPassword: boolean;
}) {
    const { kcContext, i18n, Template, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { url, recaptchaRequired, recaptchaSiteKey } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={{}}
            headerNode={msg("registerTitle")}
            displayInfo={false}
        >
            <form action={url.registrationAction} method="post">
                <Suspense>
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        doUseDefaultCss={false}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />
                </Suspense>

                {recaptchaRequired && (
                    <div className="darc-form-group">
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} />
                    </div>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <a className="darc-btn darc-btn--secondary" href={url.loginUrl}>
                        {msg("backToLogin")}
                    </a>
                    <button className="darc-btn darc-btn--primary" type="submit" style={{ flex: 1 }}>
                        {msg("doRegister")}
                    </button>
                </div>
            </form>
        </Template>
    );
}
