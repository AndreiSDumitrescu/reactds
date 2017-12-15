import React from "react";
import ReactDOM from "react-dom";
import {
    Route,
    HashRouter,
    Switch,
} from "react-router-dom";

import "../sass/styles.scss";
import VenueSelection from "./components/VenueSelection";
import Venue from "./components/Venue";

ReactDOM.render(
    <HashRouter>
        <div>
            <Switch>
                <Route exact path="/" component={ VenueSelection } />
                <Route path="/venue/:brand/:name/:locale/:mode" component={ Venue } />
            </Switch>
        </div>
    </HashRouter>
    , document.getElementById( "ds-app" ),
);
