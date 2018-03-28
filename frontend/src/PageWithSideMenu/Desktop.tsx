import * as React from "react";

import Icon from "react-svg-icons";

import Link from "../Link";

const IconMinMax = (props: {
    menuIsVisible: boolean
}): React.ReactElement<any> => {

    let icon;
    let style;
    if (props.menuIsVisible) {
        icon = "minimize";
        style = {
            position: "absolute",
            right: 10
        };
    } else {
        icon = "maximize";
        style = {
            position: "fixed",
            left: 10
        };
    }

    return (
        <Link params={{menuIsVisible: !props.menuIsVisible}}>
            <Icon 
                style={{
                    marginLeft: 4
                }}
                name={icon}
                width={30}
                height={30}
                color="#FFFFFF" 
            />
        </Link>
    );

};

const MaximizedMenu = (props: {
    menu: React.ReactElement<any>
}): React.ReactElement<any> => (
    <div 
        style={{
            position: "absolute",
            backgroundColor: "#1B2E3C",
            padding: 5,
            width: 250,
            height: "100%"
        }}
    >
        {props.menu}
        <IconMinMax menuIsVisible={true} />
    </div>
);

const PageWithSideMenu = (props: {
    menu: React.ReactElement<any>,
    content: React.ReactElement<any>
}): React.ReactElement<any> => {

    let menuWidth;
    let menu;

    if (this.context.location.menuIsVisible) {
        menu = <MaximizedMenu menu={this.props.menu} />;
        menuWidth = 250;
    } else {
        menu = <IconMinMax menuIsVisible={false} />;
        menuWidth = 0;
    }

    return (
        <div
            style={{
                position: "relative", height: "100%", width: "100%"
            }}
        >
            {menu}
            <div 
                style={{
                    position: "absolute",
                    right: 0,
                    height: "100%",
                    width: "calc(100% - " + menuWidth + "px)"
                }} 
            >
                {this.props.content}
            </div>
        </div>
    );
};

export default PageWithSideMenu;