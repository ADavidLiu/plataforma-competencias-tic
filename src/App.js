import React from "react";

import "./styles/custom.css";

import { BrowserRouter as Router } from "react-router-dom";

import RouterInner from "./components/routerInner/routerInner";
import LoginCheck from "./components/loginCheck/loginCheck";

function App() {
	return (
		<Router>
			<RouterInner>
				<LoginCheck />
			</RouterInner>
		</Router>
	);
}

export default App;
