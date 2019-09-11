import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import DashboardDocente from "./dashboardDocente";
import DashboardEstablecimientoEducativo from "./dashboardEstablecimientoEducativo";
import DashboardGobierno from "./dashboardGobierno";
import DashboardEvaluador from "./dashboardEvaluador";

class Dashboard extends Component {
    constructor() {
        super();
        this.dashboard = "";
    }

    render() {
        switch (this.props.userType) {
            case "DOCENTE":
                this.dashboard = <DashboardDocente userProfile={this.props.userProfile} />;
                break;
            case "INSTITUCIÓN":
                
                break;
            case "ESTABLECIMIENTO":
                this.dashboard = <DashboardEstablecimientoEducativo userProfile={this.props.userProfile} />;
                break;
            case "GOBIERNO":
                this.dashboard = <DashboardGobierno userProfile={this.props.userProfile} />;
                break;
            case "EVALUADOR":
                this.dashboard = <DashboardEvaluador userProfile={this.props.userProfile} />;
                break;
            case "SUPERADMIN":
                
                break;
            case "ADMIN":
                
                break;
            default:
                break;
        }

        return (
            <React.Fragment>
                <Translation>
                    {
                        t => (
                            <Helmet>
                                <title>{`${t("titulo.inicio")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                        )
                    }
                </Translation>
                {this.dashboard}
            </React.Fragment>
        );
    }
}

export default Dashboard;