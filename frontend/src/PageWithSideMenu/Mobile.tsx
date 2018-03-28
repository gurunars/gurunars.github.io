import * as React from "react";
import * as _ from "lodash";

import Icon from "react-svg-icons";

import Link from "../Link";

const Tab = (props: {
    children: React.ReactElement<any>,
    menuIsVisible: boolean
}): React.ReactElement<any> => {

    const baseStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "white",
        marginBottom: -1,
        width: "50%",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        textDecoration: "none",
        color: "black",
        cursor: "pointer",
        fontWeight: "bold"
    } as React.CSSProperties;

    const activeStyle = {
        borderBottom: "1px solid white",
        backgroundColor: "white"
    };

    return (
        <Link
            params={{
                menuIsVisible: props.menuIsVisible
            }}
        >
        { isActive => {
            const style = isActive ? _.merge({}, baseStyle, activeStyle) : baseStyle;
            return <span style={style}>{props.children}</span>;
        }}
        </Link>
    );

};

const PageWithSideMenu = (props: {
    menuTitle: string,
    contentTitle: string,
    menu: React.ReactElement<any>,
    content: React.ReactElement<any>
}): React.ReactElement<any> => {

    let contentArea;

    if (this.context.location.menuIsVisible) {
        contentArea = this.props.menu;
    } else {
        contentArea = this.props.content;
    }

    return (
        <div 
            style={{
                overflowY: "hidden",
                position: "relative",
                height: "100%",
                width: "100%"
            }}
        >
            <div 
                style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    height: 35,
                    borderBottom: "1px solid black"
                }}
            >

                <Tab menuIsVisible={true}>
                    {this.props.menuTitle}
                </Tab>

                <Tab menuIsVisible={false}>
                    {this.props.contentTitle}
                </Tab>

            </div>

            <div 
                style={{
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    height: "calc(100% - 35px)",
                    width: "100%"
                }}
            >
                {contentArea}
            </div>
        </div>
    );

};

export default PageWithSideMenu;