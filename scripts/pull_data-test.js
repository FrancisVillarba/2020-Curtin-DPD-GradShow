/**
 * pull_data_test.js
 * 
 * For testing and debugging only, use the standard update_data.js script
 * from node instead as this version contains loads of console logging 
 * and debugging that makes it significantly slower to execute!
 * 
 * Pulls in, parses and then, saves the latest student data and information
 * from the database and stores it in the global data files _data (as JSON)
 * for eleventy to use use in the output generation ./dist/ as part of the
 * data cascade.
 * 
 * @author Francis Villarba <francis.villarba@me.com>
 * @version 1.0
 * @since 14th October 2020
 */

// Imports ----------------------------------------------------------------- //

// Globals ----------------------------------------------------------------- //

// Functionality ----------------------------------------------------------- //

// Running ----------------------------------------------------------------- //

console.log('Hello World!');

process.on('exit', function (code) {
    return console.log(`Catch you next time! Exited with code ${code}`);
});