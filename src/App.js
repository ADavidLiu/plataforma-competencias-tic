import React from "react";

import "./styles/custom.css";

import { BrowserRouter as Router } from "react-router-dom";

import RouterInner from "./components/routerInner/routerInner";
import LoginCheck from "./components/loginCheck/loginCheck";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#009A9C"
			},
			secondary: {
				main: "#e53935"
			}
		}
	});

	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<RouterInner>
					<LoginCheck />
				</RouterInner>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
