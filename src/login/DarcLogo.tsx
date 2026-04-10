const DEFAULT_LOGO_URL = "https://cdn.investigativedata.org/style/logos/darc/svg/DARC-Logo-RGB-Square-Triangle-Neg.svg";

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
