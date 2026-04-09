const DEFAULT_LOGO_URL = "/darc-logo.svg";

export default function DarcLogo({ size = 36, src = DEFAULT_LOGO_URL }: { size?: number; src?: string }) {
    return (
        <img
            src={src}
            alt="Darc Knights"
            width={size}
            height={size * 0.4}
            style={{ display: "block" }}
        />
    );
}
