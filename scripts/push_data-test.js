/**
 * push_data-test.js
 *
 * For testing and debugging only, use the standard update_data.js script
 * from node instead as this version contains loads of console logging
 * and debugging that makes it significantly slower to execute!
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
 * Tests pushing to the database using a known test dummy data
 */
async function testPush() {
    console.log('Student Data System', '[Test] Push Data Script');
    console.log('Written by Francis Villarba <francis.villarba@me.com>', '\n');

    // Timestamp
    const timestamp = Date.now();
    console.log('Timestamp: ', timestamp, '\n');

    // Delcare the test student object
    const TEST_DATA = {
        timestamp: {
            creation: timestamp,
            updated: null
        },
        name: {
            first: "Test",
            last: "Student",
            preferred: "Test Student Document"
        },
        statement: "I am a test user document. Use me to test various features while the database creation is in progress!",
        bio: "Testing is very important!",
        email: "test.student@example.com.au",
        profile: "STUDENT PORTFOLIO WEBSITE / LINKEDIN URL HERE",
        headshots: {
            pro: "PROFESSIONAL B/W PHOTO URL HERE",
            fun: "FUN PHOTO URL HERE"
        },
        majors: [
            DATABASE.collection('majors').doc('Wvll0Lz78WqyUWpZ6qmD'),
            DATABASE.collection('majors').doc('Q2JKhMh3LUxZjZRXpTvf')
        ],
        social: {
            facebook: "FACEBOOK URL",
            instagram: "INSTAGRAM @HANDLE",
            linkedin: "LINKEDIN URL",
            twitter: "TWITTER @Handle",
            github: "GITHUB URL",
            behance: "BEHANCE URL",
            dribbble: "DRIBBBLE URL"
        },
        projects: [
            {
                src: "PROJECT IMAGE SRC URL HERE",
                alt: "Image captions and alt tags are important for accessibility!"
            },
            {
                src: "PROJECT IMAGE SRC URL HERE [2]",
                alt: "IMAGE CAPTION / ALT TAG HERE [2]"
            }
        ],
    }

    // Add this test document to the database
    const result = await DATABASE.collection('students').add(TEST_DATA)

    // Output the results to console
    console.log('Student Data System', 'Successfully added document with ID: ', result.id);

    // -- Output the saved data to console ---------------------------------- //

    // Query the DB
    const STUDENT_DATABASE_REFERENCE = await DATABASE.collection('students');
    // Get the newly created document
    const PUSH_RESULT = await STUDENT_DATABASE_REFERENCE.doc(result.id).get();
    // Output to console
    console.log('Document Data: ', PUSH_RESULT.data());
}

// Running ----------------------------------------------------------------- //

testPush()
.then(process.on('exit', (code) => {
        return console.log('\n', '\n', `Test Complete!`, `Catch you next time! Exited with code ${code}`, '\n');
    })
) .catch(console.error);