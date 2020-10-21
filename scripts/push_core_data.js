/**
 * push_core_data.js
 * 
 * Parses and then pushes / updates the data that is stored in the
 * firebase database for other members to be able to use when
 * they build the project on their own machines.
 *
 * @author Francis Villarba <francis.villarba@me.com>
 * @version 2.0
 * @since 14th October 2020
 */

// Imports ----------------------------------------------------------------- //
const FIREBASE_ADMIN = require('firebase-admin');

const fs = require('fs');

const csv_parser = require('csv-parser');

// Globals ----------------------------------------------------------------- //
const FIREBASE_SERVICE_ACCOUNT = require('../.firebase/firebase-adminsdk.json');

const INPUT_DATA_PATH = './input/';

// Setup and Inits --------------------------------------------------------- //

// Init the Firebase Admin SDK
FIREBASE_ADMIN.initializeApp({
    credential: FIREBASE_ADMIN.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: "https://curtin-dpd-gradshow-2020.firebaseio.com"
});

// Declare the database object
const DATABASE = FIREBASE_ADMIN.firestore();

// Functionality ----------------------------------------------------------- //

/**
 * Welcomes the user in the console and provides instructions / information
 * about what this script does and what it is about to do
 */
function welcome() {
    console.log('\x1b[36m', '\n Student Data System - Push Data Script');
    console.log('\x1b[36m', 'Written by Francis Villarba <francis.villarba@me.com> for Curtin DPD Graduation Show 2020\n');
    console.log('\x1b[0m', `Timestamp: ${new Date().toTimeString()}`);
    console.log('\x1b[34m', 'Ensure input data is located at ./input/coredata.csv \n', '\x1b[0m');
    console.log('\x1b[33m', 'Please wait while we communicate to the database...\n', '\x1b[0m');
};

/**
 * A nice farewell message if all went well with the script
 */
function farewell() {
    console.log('\x1b[32m', '\n Student Data System - Push Data Script');
    console.log('\x1b[32m', 'All tasks successfully completed!', '\n\n Process exited with exit code 0\n', '\x1b[0m');
    return process.exit(0);
}

/**
 * Push student data to the database
 * @param {Object} studentDataInput - The core student data
 */
async function pushStudentData( studentDataInput ) {
    console.log('\x1b[34m', '- Pushing Student Data...');

    // TODO REMINDER - Don't forget to make a document reference for the student's majors
};

/**
 * Parse student data from the csv file and returns an object
 * @return {Object} studentData - The student data as an array
 */
function parseStudentData() {
    console.log('\x1b[34m', '- Parsing Student Data Input File...');

    // This is what we will be returning
    let results = [];

    // Actually parse the csv
    fs.createReadStream(`${INPUT_DATA_PATH}coredata.csv`)
    .pipe(csv_parser())
    .on('data', (data) => {
        results.push(data)
    })
    .on('end', () => {
        // For debugging
        console.log(results);

        return results;
    });
};

/**
 * The main function for this script
 */
function pushCoreData() {
    // Show MOTD - Welcome Message
    welcome();

    // Actual work starts here
    let studentDataObj = parseStudentData();
};

// Running ----------------------------------------------------------------- //
pushCoreData();