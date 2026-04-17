import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "logout-confirm.ftl" });

const meta = {
    title: "login/logout-confirm.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: {
                    name: "My Application"
                },
                logoutConfirm: {
                    sessionState: "test-session-123"
                },
                url: {
                    logoutConfirmAction: "/logout",
                    loginRestartFlowUrl: "/login"
                }
            }}
        />
    )
};

export const WithoutClientName: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: {},
                logoutConfirm: {
                    sessionState: "test-session-123"
                },
                url: {
                    logoutConfirmAction: "/logout",
                    loginRestartFlowUrl: "/login"
                }
            }}
        />
    )
};