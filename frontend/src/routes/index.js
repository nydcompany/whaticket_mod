import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoggedInLayout from "../layout";
import Dashboard from "../pages/Dashboard/";
import Tickets from "../pages/Tickets/";
import Login from "../pages/Login/";
import Connections from "../pages/Connections/";
import Settings from "../pages/Settings/";
import Users from "../pages/Users";
import Contacts from "../pages/Contacts/";
import Queues from "../pages/Queues/";
import Answers from "../pages/Answers/";
import { AuthProvider } from "../context/Auth/AuthContext";
import { WhatsAppsProvider } from "../context/WhatsApp/WhatsAppsContext";
import Route from "./Route";

const Routes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route exact path="/login" component={Login} />
					<WhatsAppsProvider>
						<LoggedInLayout>
							<Route exact path="/" component={Dashboard} isPrivate />
							<Route
								exact
								path="/tickets/:ticketId?"
								component={Tickets}
								isPrivate
							/>
							<Route
								exact
								path="/connections"
								component={Connections}
								isPrivate
							/>
														<Route
								exact
								path="/answers"
								component={Answers}
								isPrivate
							/>
							<Route exact path="/contacts" component={Contacts} isPrivate />
							<Route exact path="/users" component={Users} isPrivate />
							<Route exact path="/Settings" component={Settings} isPrivate />
							<Route exact path="/Queues" component={Queues} isPrivate />
						</LoggedInLayout>
					</WhatsAppsProvider>
				</Switch>
				<ToastContainer autoClose={3000} />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default Routes;
