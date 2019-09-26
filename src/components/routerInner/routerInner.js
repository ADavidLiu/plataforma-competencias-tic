import React from "react";

import { withRouter } from "react-router";
import SweetScroll from "sweet-scroll";

const RouterInner = (props) => {
    const scroller = new SweetScroll();

    props.history.listen((location, action) => {
        scroller.to("#top");
    });

    return props.children;
}

export default withRouter(RouterInner);