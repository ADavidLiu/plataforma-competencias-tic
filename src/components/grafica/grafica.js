import React, { Component } from "react";

import { Translation } from "react-i18next";

class Grafica extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        ""
                    )
                }
            </Translation>
        );
    }
}

export default Grafica;