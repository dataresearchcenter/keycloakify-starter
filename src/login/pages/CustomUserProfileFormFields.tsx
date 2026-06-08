import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { Fragment } from "react";

export default function CustomUserProfileFormFields(props: UserProfileFormFieldsProps) {
    const { kcContext, i18n, onIsFormSubmittableValueChange, doMakeUserConfirmPassword } = props;
    const { profile, messagesPerField } = kcContext;
    const { msg } = i18n;

    // Notify parent that form is submittable
    if (onIsFormSubmittableValueChange) {
        onIsFormSubmittableValueChange(true);
    }

    // Fallback if profile or attributes are not available (e.g., in storybook)
    if (!profile || !profile.attributes) {
        return (
            <>
                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="email">
                        {msg("email")} <span className="darc-required">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="darc-input"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="password">
                        {msg("password")} <span className="darc-required">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="darc-input"
                        autoComplete="new-password"
                        required
                    />
                </div>

                {doMakeUserConfirmPassword && (
                    <div className="darc-form-group">
                        <label className="darc-label" htmlFor="password-confirm">
                            {msg("passwordConfirm")} <span className="darc-required">*</span>
                        </label>
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            className="darc-input"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                )}

                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="firstName">
                        {msg("firstName")} <span className="darc-required">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="darc-input"
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div className="darc-form-group">
                    <label className="darc-label" htmlFor="lastName">
                        {msg("lastName")} <span className="darc-required">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="darc-input"
                        autoComplete="family-name"
                        required
                    />
                </div>
            </>
        );
    }

    return (
        <>
            {profile.attributes.map((attribute: any, i: number) => {
                const { validators = {}, value, name } = attribute;
                const required = validators.length !== undefined || Object.keys(validators).length > 0;

                // Handle specific field types
                if (name === "email") {
                    return (
                        <div key={i} className="darc-form-group">
                            <label className="darc-label" htmlFor={name}>
                                {attribute.displayName || msg("email")}
                                {required && <span className="darc-required"> *</span>}
                            </label>
                            <input
                                type="email"
                                id={name}
                                name={name}
                                className={`darc-input${messagesPerField.existsError(name) ? " darc-input--error" : ""}`}
                                defaultValue={value || ""}
                                autoComplete="email"
                                required={required}
                            />
                            {messagesPerField.existsError(name) && (
                                <span className="darc-field-error">
                                    <span dangerouslySetInnerHTML={{ __html: messagesPerField.get(name) }} />
                                </span>
                            )}
                        </div>
                    );
                }

                if (name === "password") {
                    return (
                        <Fragment key={i}>
                            <div className="darc-form-group">
                                <label className="darc-label" htmlFor={name}>
                                    {msg("password")}
                                    {required && <span className="darc-required"> *</span>}
                                </label>
                                <input
                                    type="password"
                                    id={name}
                                    name={name}
                                    className={`darc-input${messagesPerField.existsError(name) ? " darc-input--error" : ""}`}
                                    autoComplete="new-password"
                                    required={required}
                                />
                                {messagesPerField.existsError(name) && (
                                    <span className="darc-field-error">
                                        <span dangerouslySetInnerHTML={{ __html: messagesPerField.get(name) }} />
                                    </span>
                                )}
                            </div>

                            {doMakeUserConfirmPassword && (
                                <div className="darc-form-group">
                                    <label className="darc-label" htmlFor="password-confirm">
                                        {msg("passwordConfirm")}
                                        {required && <span className="darc-required"> *</span>}
                                    </label>
                                    <input
                                        type="password"
                                        id="password-confirm"
                                        name="password-confirm"
                                        className={`darc-input${messagesPerField.existsError("password-confirm") ? " darc-input--error" : ""}`}
                                        autoComplete="new-password"
                                        required={required}
                                    />
                                    {messagesPerField.existsError("password-confirm") && (
                                        <span className="darc-field-error">
                                            <span dangerouslySetInnerHTML={{ __html: messagesPerField.get("password-confirm") }} />
                                        </span>
                                    )}
                                </div>
                            )}
                        </Fragment>
                    );
                }

                // Handle regular text fields (firstName, lastName, etc)
                return (
                    <div key={i} className="darc-form-group">
                        <label className="darc-label" htmlFor={name}>
                            {attribute.displayName || name}
                            {required && <span className="darc-required"> *</span>}
                        </label>
                        <input
                            type="text"
                            id={name}
                            name={name}
                            className={`darc-input${messagesPerField.existsError(name) ? " darc-input--error" : ""}`}
                            defaultValue={value || ""}
                            autoComplete={name === "firstName" ? "given-name" : name === "lastName" ? "family-name" : name}
                            required={required}
                        />
                        {messagesPerField.existsError(name) && (
                            <span className="darc-field-error">
                                <span dangerouslySetInnerHTML={{ __html: messagesPerField.get(name) }} />
                            </span>
                        )}
                    </div>
                );
            })}
        </>
    );
}