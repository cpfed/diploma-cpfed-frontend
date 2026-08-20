import type { NextPage } from "next";

type StandalonePage = NextPage & {
    noLayout?: boolean;
};

const KCPC2026: StandalonePage = () => {
    return (
        <div>
            KCPC2026
        </div>
    );
};

KCPC2026.noLayout = true;

export default KCPC2026;