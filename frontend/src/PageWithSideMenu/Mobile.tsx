import * as React from "react";

import { CoreProps } from "./props";
import { DesktopProps } from "./Desktop";

export type MobileProps = {
    menuIsVisible: boolean,
    menuIsVisibleOnChange: (state: boolean) => void
};

const Mobile = (props: CoreProps & DesktopProps & MobileProps) => <p>FOO</p>;

export default Mobile;