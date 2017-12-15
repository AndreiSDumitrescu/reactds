/* eslint-disable */
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { ThemeProvider } from "styled-components";

import ActivityList from "./ActivityList";
import themes from "../themes";
import { apiService } from "../services";

export default class Venue extends React.Component {
    constructor() {
        super();
        this.state = {
            venueData: "",
            mode: "",
            activitiesData: [],
            weatherData: [],
            directoryData: [],
            venueCss: {},
        };
    }
    componentWillMount() {
        const { params } = this.props.match;
        const { mode } = params;
        const themeName = params.name.replace(/-/g, "");
        const venueCss = themes[themeName];

        apiService.getActivities( params )
            .then( activitiesData => {
                apiService.getWeather( params )
                    .then( weatherData => {
                        apiService.getDirectories( params )
                            .then( directoryData => {
                                this.setState( {
                                    venueData: params,
                                    mode,
                                    venueCss,
                                    directoryData: directoryData.nodes,
                                    activitiesData: activitiesData.activities,
                                    weatherData: weatherData.weather,
                                } );
                            } );
                    } );
            } );
    }
    renderActivitiesList() {
        return (
            <ThemeProvider theme={ this.state.venueCss }>
                <ActivityList
                    activities={ this.state.activitiesData }
                    theme={ this.state.venueCss }
                />
            </ThemeProvider>
        );
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderActivitiesList()}
                </div>
            </div>
        );
    }
}

Venue.propTypes = {
    // eslint-disable-next-line react/no-typos
    match: ReactRouterPropTypes.match.isRequired,
};
