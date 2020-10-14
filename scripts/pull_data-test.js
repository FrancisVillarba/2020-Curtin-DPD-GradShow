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
const FIREBASE_ADMIN = require('firebase-admin');

// Globals ----------------------------------------------------------------- //
const FIREBASE_SERVICE_ACCOUNT = require('../.firebase/firebase-adminsdk.json');

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
 * Tests pulling data from the database and outputs it to the console
 */
async function testPull() {
    console.log('Student Data System', '[Test] Pull Data Script');
    console.log('Written by Francis Villarba <francis.villarba@me.com>', '\n');

    const majors = await DATABASE.collection('majors').get();
    const students = await DATABASE.collection('students').get();

    console.log('Majors', '[Test] Database Output', '\n');
    majors.forEach((doc) => {
        console.log(doc.id, '==>', doc.data());
    });

    console.log('\n', '\n', 'Students', '[Test] Database Output', '\n');
    students.forEach((doc) => {
        console.log(doc.id, '==>', doc.data());
    });
};

// Running ----------------------------------------------------------------- //

testPull()
.then( process.on('exit', (code) => {
        return console.log('\n', '\n', `Test Complete!`, `Catch you next time! Exited with code ${code}`, '\n');
    })
)
.catch( console.error );