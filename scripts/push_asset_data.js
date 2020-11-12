/**
 * push_asset_data.js
 * 
 * Parses and then updates the data that is stored in the firebase database
 * with the round two asset data (from assetdata.csv in the /input/ folder)
 * 
 * @author Francis Villarba <francis.villarba@me.com>
 * @version 1.0
 */

// Imports ----------------------------------------------------------------- //
const FIREBASE_ADMIN = require('firebase-admin')
const fs = require('fs')
const csv_parser = require('csv-parser')

// Globals ----------------------------------------------------------------- //
const FIREBASE_SERVICE_ACCOUNT = require('../.firebase/firebase-adminsdk.json')
const { parse } = require('url')

const INPUT_DATA_PATH = './input/'

// Setup and Inits --------------------------------------------------------- //

// Init the Firebase Admin SDK
FIREBASE_ADMIN.initializeApp({
    credential: FIREBASE_ADMIN.credential.cert(FIREBASE_SERVICE_ACCOUNT),
    databaseURL: 'https://curtin-dpd-gradshow-2020.firebaseio.com',
})

// Declare the database object
const DATABASE = FIREBASE_ADMIN.firestore()

// Functionality ----------------------------------------------------------- //

/**
 * Welcomes the user in the console and provides instructions / information
 * about what this script does and what it is about to do
 */
function welcome() {
    console.log('\x1b[36m', '\n Student Data System - Push Asset Data Script');
    console.log(
        '\x1b[36m',
        'Written by Francis Villarba <francis.villarba@me.com> for Curtin DPD Graduation Show 2020\n'
    );
    console.log('\x1b[0m', `Timestamp: ${new Date().toTimeString()}`);
    console.log(
        '\x1b[34m',
        'Ensure input data is located at ./input/assetdata.csv \n',
        '\x1b[0m'
    );
    console.log('\x1b[33m', 'Please wait we run tasks...\n', '\x1b[0m');
}

/**
 * A nice farewell message if all went well with the script
 */
function farewell() {
    console.log('\x1b[32m', '\n Student Data System - Push Asset Data Script');
    console.log(
        '\x1b[32m',
        'All tasks successfully completed!',
        '\n\n Process exited with exit code 0\n',
        '\x1b[0m'
    );
    return process.exit(0);
};

/**
 * Parse the student asset data from the CSV file and returns an object
 * representation of that data for the rest of the system to use
 * @return {Object} studentAssetData - The student's asset data as an array object
 */
async function parseStudentAssetData() {
    // For debugging
    console.log('\x1b[34m', '- Parsing Student Asset Data Input File...');

    // Return a promise as this may take a while
    let studentAssetData = new Promise( (resolve, reject) => {
        let results = [];

        fs.createReadStream(`${INPUT_DATA_PATH}assetdata.csv`)
        .pipe(csv_parser())
        .on('data', data => {
            // console.log(data);
            results.push(data);
        })
        .on('end', () => {
            // For debugging
            // console.log(results);
            console.log(
                '\x1b[32m',
                '+ Finished Parsing Student Data Input File!',
                '\x1b[0m'
            );
            resolve(results);
        })
        .on('error', () => {
            // For debugging
            console.log(
                '\x1b[31m',
                '[ERROR] - An error occured when parsing student data!',
                '\x1b[0,'
            );
            reject;
        });
    });
    return await studentAssetData;
};

/**
 * Checks if the assets data keys are correct before proceeding
 * @param {Object} studentAssetData - The student's asset data as an array object
 */
async function verifyAssetData( studentAssetData ) {
    console.log('\x1b[34m', '- Verifying Student Asset Data...');

    // For debugging
    console.log(studentAssetData);

    // iterate through the student asset data object
    for( let i = 0; i < studentAssetData.length; i++ ) {
        // For debugging
        console.log(
            'Preparing to push assets for:',
            studentAssetData[i]['First Name'],
            studentAssetData[i]['Last Name'],
            studentAssetData[i]['Student Number']
        );

        let studentID = studentAssetData[i]['Student Number'];

        // Search the database for a particular student document who's ID matches the student ID
        let databaseQueryResult = await DATABASE.collection('students').where('id', '==', studentID).get();

        // Check the result of the database query
        if( databaseQueryResult.empty ) {
            console.error('Could not find matching student in database with student number', studentID);
            return false;
        } else {
            // For debugging
            databaseQueryResult.forEach( (doc) => {
                console.log(doc.id, '==>', doc.data());
            });
        }
    };
    return true;
};

/**
 * The main function for running this script
 */
async function pushAssetData() {
    // Show MOTD - Welcome Message
    welcome();
    
    parseStudentAssetData().then( (assetData) => {
        // For debugging
        console.log(assetData);

        verifyAssetData(assetData).then( (valid) => {
            if( valid ) {

            } else {
                process.exit(5);
            }
        });
    });
}

// Running ----------------------------------------------------------------- //
pushAssetData();

// TODO - Hard code one of the person's thing