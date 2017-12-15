import ReactRouterPropTypes from "react-router-prop-types";
import React from "react";
import { apiService } from "../services";

export default class VenueSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            venues: [],
            initialVenue: {},
            mode: "interactive",
        };

        this.openVenue = this.openVenue.bind( this );
        this.handleVenueChange = this.handleVenueChange.bind( this );
        this.handleModeChange = this.handleModeChange.bind( this );
    }
    componentWillMount() {
        apiService.getVenues().then( response => {
            this.setState( {
                venues: response.venues,
                initialVenue: response.venues[ 0 ],
            } );
        } );
    }
    handleVenueChange( event ) {
        const { dataset } = event.target.options[ event.target.selectedIndex ];
        const selectedVenue = this.state.venues.find( ( { venue } ) => venue.slug === dataset.venue );
        this.setState( {
            initialVenue: selectedVenue,
        } );
    }
    handleModeChange ( event ) {
        this.setState( {
            mode: event.target.value,
        } );
    }
    openVenue( e ) {
        e.preventDefault();
        const selectedVenue = this.state.initialVenue.venue;
        const location = {
            pathname: `/venue/${ selectedVenue.brand_slug }/${ selectedVenue.slug }/${ selectedVenue.default_locale }/${ this.state.mode }`,
        };
        this.props.history.push( location );
    }
    render() {
        return (
            <div className="venue-selection valign-wrapper">
                <div className="container">
                    <form action="#">
                        <div className="row">
                            <div className="col s12">
                                <select name="brand-venue" id="brand-venue" className="browser-default" onChange={ this.handleVenueChange }>
                                    {
                                        this.state.venues.map( ( { venue } ) => (
                                            <option
                                                key={ venue.slug }
                                                data-venue={ venue.slug }
                                            >{ venue.title }
                                            </option> ) )
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <div id="interactionType">
                                    <p>
                                        <input
                                            name="group1"
                                            type="radio"
                                            id="Interactive"
                                            value="interactive"
                                            defaultChecked
                                            onChange={ this.handleModeChange }
                                        />
                                        {
                                        // eslint-disable-next-line
                            }<label htmlFor="Interactive">Interactive</label>
                                    </p>
                                    <p>
                                        <input
                                            name="group1"
                                            type="radio"
                                            id="Linear"
                                            value="linear"
                                            onChange={ this.handleModeChange }
                                        />
                                        {
                                        // eslint-disable-next-line
                            }<label htmlFor="Linear">Linear</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row center-align">
                            <div className="col s12">
                                <button
                                    onClick={ this.openVenue }
                                    className="btn waves-effect waves-light"
                                >Current Window
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

VenueSelection.propTypes = {
    // eslint-disable-next-line react/no-typos
    history: ReactRouterPropTypes.history.isRequired,
};
