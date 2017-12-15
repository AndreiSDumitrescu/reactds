const headers = new Headers();
const method = "GET";
const options = {
    method,
    headers,
    mode: "cors",
    cache: "default",
};
const SUCCESS = 200;
const SERVER_ERROR = 500;

const parseResponse = ( status, res ) => {
    if ( status >= SERVER_ERROR ) {
        return Promise.reject( new Error( status ) );
    }
    const jsonResponse = res.then( response => response );
    return new Promise( ( resolve, reject ) => {
        if ( status >= SUCCESS ) {
            jsonResponse.then( response => resolve( response ) );
        } else {
            jsonResponse.then( response => reject( new Error( response ) ) );
        }
    } );
};

export default ( url ) =>
    fetch( url, options ).then( res => parseResponse( res.status, res.json() ) );
