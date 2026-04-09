import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithRememberMe: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { rememberMe: "on" }
            }}
        />
    )
};

export const WithSocialProviders: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                social: {
                    displayInfo: true,
                    providers: [
                        { alias: "google", displayName: "Log in with Google", loginUrl: "#", providerId: "google" },
                        { alias: "github", displayName: "Log in with GitHub", loginUrl: "#", providerId: "github" }
                    ]
                }
            }}
        />
    )
};

export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => ["username", "password"].includes(field),
                    getFirstError: () => "Invalid username or password.",
                    get: () => "Invalid username or password.",
                    exists: () => false,
                    printIfExists: () => undefined
                }
            }}
        />
    )
};
