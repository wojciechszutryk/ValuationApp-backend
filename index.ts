import express from "express";
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 5000;

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );