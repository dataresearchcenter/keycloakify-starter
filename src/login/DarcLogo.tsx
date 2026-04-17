const DEFAULT_LOGO_URL =
    "https://cdn.investigativedata.org/style/logos/darc/svg/DARC-Logo-RGB-Square-Triangle-Neg.svg";

export default function DarcLogo({
    size = 36,
    src = DEFAULT_LOGO_URL
}: {
    size?: number;
    src?: string;
}) {
    return (
        <img
            src={src}
            alt="DARC"
            width={size}
            height={size}
            style={{ display: "block" }}
        />
    );
}
