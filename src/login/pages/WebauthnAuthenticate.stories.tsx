import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-authenticate.ftl" });

const meta = {
    title: "login/webauthn-authenticate.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationAllowed: true
                },
                registrationDisabled: false,
                url: {
                    loginAction: "/auth/login",
                    registrationUrl: "/auth/register"
                },
                authenticators: {
                    authenticators: [
                        {
                            credentialId: "cred-1",
                            label: "Touch ID",
                            createdAt: "2024-01-15",
                            transports: {
                                iconClass: "kcAuthenticatorWebAuthnClass",
                                displayNameProperties: ["USB", "NFC", "Bluetooth"]
                            }
                        },
                        {
                            credentialId: "cred-2",
                            label: "YubiKey",
                            createdAt: "2024-02-10",
                            transports: {
                                iconClass: "kcAuthenticatorWebAuthnClass",
                                displayNameProperties: ["USB"]
                            }
                        }
                    ]
                },
                shouldDisplayAuthenticators: true
            }}
        />
    )
};

export const SingleAuthenticator: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationAllowed: true
                },
                registrationDisabled: false,
                url: {
                    loginAction: "/auth/login",
                    registrationUrl: "/auth/register"
                },
                authenticators: {
                    authenticators: [
                        {
                            credentialId: "cred-1",
                            label: "Touch ID",
                            createdAt: "2024-01-15",
                            transports: {
                                iconClass: "kcAuthenticatorWebAuthnClass",
                                displayNameProperties: ["Internal"]
                            }
                        }
                    ]
                },
                shouldDisplayAuthenticators: true
            }}
        />
    )
};

export const NoRegistration: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationAllowed: false
                },
                registrationDisabled: true,
                url: {
                    loginAction: "/auth/login"
                },
                authenticators: {
                    authenticators: [
                        {
                            credentialId: "cred-1",
                            label: "Security Key",
                            createdAt: "2024-01-15",
                            transports: {
                                iconClass: "kcAuthenticatorWebAuthnClass",
                                displayNameProperties: ["USB", "NFC"]
                            }
                        }
                    ]
                },
                shouldDisplayAuthenticators: false
            }}
        />
    )
};
