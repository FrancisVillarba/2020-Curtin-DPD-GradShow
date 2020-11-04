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
const { parse } = require('url');

const INPUT_DATA_PATH = './input/';

const MAJORS_COLLECTION = 'majors/';

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
    console.log('\x1b[33m', 'Please wait we run tasks...\n', '\x1b[0m');
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
 * Pulls majors data from the database
 * @return {Object} majorsData - The array of majors in the database
 */
async function pullMajorsData() {
    console.log('\x1b[34m', '- Pulling Majors Data...');
    let majorsTemp = [];

    const majors = await DATABASE.collection('majors').get();

    // Iterate through the majors data and pull what we need
    console.log('\x1b[34m', '- Parsing Majors Data...');
    majors.forEach( (major) => {
        let majorList = {
            id: major.id,
            title: major.data().title
        }

        majorsTemp.push(majorList);
    });

    console.log('\x1b[32m', '+ Finished pulling majors data from database!', '\x1b[0m');
    return majorsTemp;
};

/**
 * Parse student data from the csv file and returns an object
 * @return {Object} studentData - The student data as an array
 */
async function parseStudentData() {
    console.log('\x1b[34m', '- Parsing Student Data Input File...');

    // Let's make it into a promise
    let endData = new Promise( (resolve, reject) => {
        let results = [];

        fs.createReadStream(`${INPUT_DATA_PATH}coredata.csv`)
        .pipe(csv_parser())
        .on('data', (data) => {
            // console.log(data);
            results.push(data)
        })
        .on('end', () => {
            // For debugging
            // console.log(results);
            console.log('\x1b[32m', '+ Finished Parsing Student Data Input File!', '\x1b[0m');
            resolve( results );
        })
        .on( 'error', () => {
            // For debugging
            console.log("\x1b[31m", '[ERROR] - An error occured when parsing student data!', '\x1b[0,');
            reject;
        });
    });
    return await endData;
};

/**
 * Push student data to the database
 * @param {Object} studentDataObj - The core student data
 * @param {Object} manjorDataObj - The majors data
 */
async function pushStudentData(studentDataObj, majorDataObj) {
    console.log('\x1b[34m', '- Pushing Student Data...');

    // For debugging
    // console.log(studentDataObj);
    // console.log(majorDataObj);

    // TODO REMINDER - Don't forget to make a document reference for the student's majors

    // Iterate through the student data object and push to the database
    for (let i = 0; i < studentDataObj.length; i++) {
        // For debugging
        // console.log(studentDataObj[i]);
        // console.log(majorDataObj);
        console.log('Preparing data for:', studentDataObj[i]['First Name'], studentDataObj[i]['Last Name']);

        // Turn the majors into document references for the database
        let referencesTemp = [];
        let studentMajorsTemp = studentDataObj[i]['Major'].split(', ');

        // Iterate through the majors list and compare to our majorDataObj
        for( let j = 0; j < studentMajorsTemp.length; j++ ) {
            // For debugging
            // console.log(studentMajorsTemp[j]);

            let matchedData = majorDataObj[majorDataObj.findIndex( (major) => major.title == studentMajorsTemp[j])];
            
            if( !(matchedData === undefined) ) {
                // Create document references and push to the collection
                referencesTemp.push( DATABASE.doc(MAJORS_COLLECTION + matchedData['id']) );
            }
            else {
                // Could not find the unit, we should raise this as an error
                console.log("\x1b[31m", '[ERROR] - An error occured when parsing student majors data!');
                console.log('Student: ', studentDataObj[i]['First Name'], studentDataObj[i]['Last Name']);
                console.log('Could not find document with title', `"${studentMajorsTemp[j]}"`, 'to reference towards in the database! \n\n');
                process.exit(5);
            }
        }

        // Declare the student's projects and convert them for our schema (with auto generated ALT tags)
        let projectImagesTemp = [];
        let projectImagesData = studentDataObj[i]['Upload Images Here'].split(', ');
        for( let k = 0; k < projectImagesData.length; k++ ) {
            let tempProject = {
                src: projectImagesData[k],
                alt: studentDataObj[i]['First Name'] + `'s Project Preview Image ${k}`
            }
            projectImagesTemp.push( tempProject );
        }

        // Some logic for us to create the array (TODO - Future - Make this nicer)
        let socialLinksTemp = [];
        if (studentDataObj[i]['Your Artstation link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Artstation link']); }
        if (studentDataObj[i]['Your Behance link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Behance link']);}
        if (studentDataObj[i]['Your CGSociety link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your CGSociety link']); }
        if (studentDataObj[i]['Your Dribble link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Dribble link']); }
        if (studentDataObj[i]['Your Facebook business page link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Facebook business page link']); }
        if (studentDataObj[i]['Your Github link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Github link']); }
        if (studentDataObj[i]['Your Instagram link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Instagram link']); }
        if (studentDataObj[i]['Your LinkedIn link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your LinkedIn link']); }
        if (studentDataObj[i]['Your Twitter link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Twitter link']); }
        if (studentDataObj[i]['Your Vimeo link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Vimeo link']); }
        if (studentDataObj[i]['Your Youtube link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Youtube link']); }
        if (studentDataObj[i]['Your Bitbucket link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Bitbucket link']); }
        if (studentDataObj[i]['Your CodePen link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your CodePen link']); }
        if (studentDataObj[i]['Your Polycount link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Polycount link']); }
        if (studentDataObj[i]['Your Tumblr link'] != "") { socialLinksTemp.push(studentDataObj[i]['Your Tumblr link']); }

        // For debugging the student's references
        // console.log(referencesTemp);

        let studentTemp = studentDataObj[i];
        // Create the data that we will be using to push to to the database
        let studentDataTemp = {
            id: studentTemp['Student Number'],
            name: {
                first: studentTemp['First Name'],
                last: studentTemp['Last Name'],
                preferred: studentTemp['Preferred Name']
            },
            majors: referencesTemp,
            email: studentTemp['Email Address'],
            bio: studentTemp['Bio'],
            statement: studentTemp['Short Creative Statement'],
            profile: studentTemp['Your portfolio link'],
            projects: projectImagesTemp,
            social: socialLinksTemp
        };

        // For debugging the student's final data
        // console.log(studentDataTemp);

        console.log('Pushing to firestore database...');
        let res = await DATABASE.collection('students').add(studentDataTemp);

        console.log(`Successfully added document: firebase/students/${res.id}!`);
    }
};

/**
 * The main function for this script
 */
async function pushCoreData() {
    // Show MOTD - Welcome Message
    welcome();
    
    // Because Daniel Westbrook said I should use promises haha :)
    Promise.all([await parseStudentData(), await pullMajorsData()]).then(val => {
        // console.log({val});
        const [data1, data2] = val;
        pushStudentData(data1, data2);
    });
};

// Running ----------------------------------------------------------------- //
pushCoreData();