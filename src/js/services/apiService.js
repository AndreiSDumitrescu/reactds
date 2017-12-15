import { fetchWrapper } from "../helpers";

let apiKey = "8w4bv01ei2d8q8vm";
let apiSubDomain = "api";

if ( window.location.href.indexOf( "staging" ) !== -1 ) {
    apiKey = "4ixasznzufax01n4";
    apiSubDomain = "staging-api";
}

const baseUrl = `https://${ apiSubDomain }.hotel-mssngr.com`;
const fallbackLocale = "de";
const version = "v3";
const type = "feed";
const daysToFetch = 3;

const getVenues = () => {
    const fullUrl = `${ baseUrl }/${ fallbackLocale }/${ version }/${ type }/digital-signage/venues?api_key=${ apiKey }`;

    return fetchWrapper( fullUrl ).then( ( res ) => res );
};

const buildUrl = ( resource, params ) => `${ baseUrl }/${ params.locale }/${ version }/${ type }/${ params.brand }/${ params.name }/${ resource }?api_key=${ apiKey }&days=${ daysToFetch }`;

const getActivities = ( venue ) =>
    fetchWrapper( buildUrl( "activities", venue ) ).then( ( res ) => res );

const getWeather = ( venue ) =>
    fetchWrapper( buildUrl( "weather", venue ) ).then( ( res ) => res );

const getDirectories = ( venue ) =>
    fetchWrapper( buildUrl( "directory", venue ) ).then( ( res ) => res );

export default {
    getVenues,
    getActivities,
    getWeather,
    getDirectories,
};
