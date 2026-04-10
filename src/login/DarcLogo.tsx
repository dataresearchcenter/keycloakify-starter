const DEFAULT_LOGO_URL =
    "https://openaleph.org/assets/Logo/RGB/Open-Aleph-Logo-RGB-Square-Neg.svg";

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
            alt="OpenAleph"
            width={size}
            height={size}
            style={{ display: "block" }}
        />
    );
}
