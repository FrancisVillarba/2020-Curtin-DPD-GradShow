/**
 * pull_data.js
 * 
 * Pulls in, parses and then, saves the latest student data and information
 * from the database and stores it in the global data files _data (as JSON)
 * for eleventy to use use in the output generation ./dist/ as part of the
 * data cascade.
 * 
 * @author Francis Villarba <francis.villarba@me.com>
 * @version 2.1
 * @since 14th October 2020
 */

// Imports ----------------------------------------------------------------- //
const FIREBASE_ADMIN = require('firebase-admin');

const fs = require('fs').promises;
const fs_sync = require('fs');

// Globals ----------------------------------------------------------------- //
const FIREBASE_SERVICE_ACCOUNT = require('../.firebase/firebase-adminsdk.json');

const ELEVENTY_DATA_PATH = './_data/';

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
 * Welcomes the user in console form and provides instructions / information
 * about what this script does and what it is about to do
 */
function welcome() {
    console.log('\x1b[36m', '\n Student Data System - Pull Data Script');
    console.log('\x1b[36m', 'Written by Francis Villarba <francis.villarba@me.com> for Curtin DPD Graduation Show 2020\n');
    console.log('\x1b[0m', `Timestamp: ${new Date().toTimeString()}`);
    console.log('\x1b[33m', 'Please wait while we communicate to the database...\n', '\x1b[0m');
};

/**
 * A nice little farewell message if all went well with the script
 */
function farewell() {
    console.log('\x1b[32m', '\n Student Data System - Pull Data Script');
    console.log('\x1b[32m', 'All tasks successfully completed!', '\n\n Process exited with exit code 0\n', '\x1b[0m');
    return process.exit(0);
}

/**
 * Pulls in student data from the database and returns an object.
 * Also does some conversion so the document references for majors
 * are in the following format { documentID, title }.
 * 
 * @param {Object} majorsList - The majors in the system
 * @return {Object} students - Data of every single student
 */
async function pullStudentData(majorsList) {
    console.log('\x1b[34m', '- Pulling Student Data...');

    // Get the student data from the database
    const students = await DATABASE.collection('students').get();
    let studentObj = [];

    // Parse the response from the database and append the data to an object
    console.log('\x1b[34m', '- Parsing Student Data...', '\x1b[0m');
    students.forEach( (doc) => {
        // For Debugging
        // console.log(doc);

        // Assign values
        let tempDoc = doc.data();
        let majors = doc.data().majors;
        // Clear the majors object as we are going to put our converted version
        tempDoc.majors = [];
        // Add the document id
        tempDoc.id = doc.id;
        
        // For debugging
        // console.log('Temp Doc', tempDoc);

        majors.forEach( (major) => {
            // For Debugging
            // console.log('Major Object', major );
            // console.log('Major Path: ', major.path);
            // console.log('Major Document ID: ', major.path.split('/')[1]);

            // Get the information we need for this
            let majorId = major.path.split('/')[1];
            // TODO - Get the major title
            let majorTitle = majorsList[majorId].title;
            let majorElement = {
                id: majorId,
                title: majorTitle,
            };

            tempDoc.majors.push( majorElement );
        });

        // Append it to our version of the student data object (using lodash.merge)
        studentObj.push( tempDoc );
    });

    // Return the object representation of the database response (after conversion)
    let studentObjConversion = convertArrayToObject( studentObj, 'id' );
    return studentObjConversion;
};

/**
 * Helper function for student data that creates a minimised representation of
 * the data for use with listing pages.
 * 
 * This is to help keep things clear and slightly faster to generate as the 
 * entirety of the student data set won't have to be parsed by eleventy during 
 * the listing page generation.
 * 
 * @param {Object} studentData - The student data
 * @return {Object} studentsList - The list of students and bare minimum data
 */
async function parseStudentList(studentData) {
    console.log('\x1b[34m', '- Parsing Student List Data...');

    let studentListTemp = [];

    // For debugging
    // console.log(studentData);

    // Parse through the student data object
    for( let key in studentData ) {
        // For debugging
        // console.log('Key', key, '\n');
        // console.log('Value', studentData[key], '\n\n');

        // Declare the student
        let student = studentData[key];

        // Pull only the data we need -------------------------------------- //

        // Get their name
        let name = '';
        if( student.name.preferred != null ) {
            // If they have a preferred name
            name = `${student.name.preferred} ${student.name.last}`;
        } else {
            // Use default name
            name = `${student.name.first} ${student.name.last}`;
        }
        // Get their majors
        let majors = student.majors;
        // Get their headshot photos
        let headshots = student.headshots;

        // Create the object
        let studentListObject = {
            id: key,
            name: name,
            majors: majors,
            headshots: headshots
        }

        // Append to the array
        studentListTemp.push(studentListObject);
    }

    // Convert and return
    let studentListObject = convertArrayToObject( studentListTemp, 'id' );
    return studentListObject;
};

/**
 * Pulls in majors data from the database and returns an object representation
 * of this data for us to parse in our helper functions.
 * 
 * @return {Object} majors - The list of majors in English and Document ID forms
 */
async function pullMajorsData() {
    // Temporary place to store major information
    let majorsTemp = [];
    // Get the majors data from the database
    console.log('\x1b[34m', '- Pulling Majors Data...');
    const majors = await DATABASE.collection('majors').get();

    // Iterate through the majors data
    console.log('\x1b[34m', '- Parsing Majors Data...');
    majors.forEach( (major) => {
        // For debugging
        // console.log(major);
        // console.log('Major ID:', major.id);
        // console.log('Major Title', major.data().title, '\n');

        // Pull the information we need into an object
        let majorList = {
            id: major.id,
            title: major.data().title
        }
        // Push this to our temporary array
        majorsTemp.push(majorList);
    });

    // For debugging
    // console.log(majorsTemp);

    // Convert the array then return the object
    let majorsObj = convertArrayToObject( majorsTemp, 'id' ); 
    return majorsObj;
}

/**
 * Converts JS object data into JSON then writes the resultant JSON file 
 * to eleventy's global _data folder (typically located in ./_data/ from
 * the projects' root directory).
 * 
 * @param {String} filename - The name of the file to output to
 * @param {Object} data - The data to store in the file (as JS Object)
 * 
 */
async function saveData( filename, data ) {
    console.log('\x1b[34m', `- Saving ${filename}...`);

    // Convert the data to json
    let jsonData = JSON.stringify( data );

    // Check if the file already exists
    if (fs_sync.existsSync(`${ELEVENTY_DATA_PATH}${filename}`)) {
        console.log('\x1b[33m', `- Removing previous ${filename}`);
        fs_sync.unlink(`${ELEVENTY_DATA_PATH}${filename}`);
    }

    // Save the data
    return await fs.writeFile( `${ELEVENTY_DATA_PATH}${filename}`, jsonData, "utf8", (err) => {
        if( err ) {
            console.log("\x1b[31m", '\nStudent Data System - Pull Data Script\n');
            console.log("\x1b[31m", `Could not save ${filename} into ${ELEVENTY_DATA_PATH}!`);
            console.log(err);
            return 1;
        } else {
            console.log('\x1b[35m', `+ Successfully saved ${filename}!`);
            return 0;
        }
    });
};

/**
 * Helper function that converts arrays into objects using javascript reduce
 * accumilator. It's not the fastest way to do it, but it made more sense to
 * me at the time.
 * 
 * @param {Array} array - The array to convert
 * @param {String} keyField - The key that we will be using for each element
 * @return {Object} object - The converted output
 */
function convertArrayToObject (array, keyField) {
    return array.reduce((object, item) => {
        object[item[keyField]] = item;
        return object;
    }, {});
};

/**
 * The main function for pull data.
 */
function pullData() {
    // Show MOTD - Welcome Message
    welcome();
    // Pull in Majors Data from the Database
    pullMajorsData()
    .then( (majorsData) => {
        // For debugging
        // console.log(majorsData);
        // console.log(majorsData['5XKZy8Y2iwtsFmJn2E8A']);
        // console.log(majorsData['CnruF793Ul6dYidFnQxB']);

        // Save majorsData to file
        saveData( 'majors.json', majorsData )
        .then( () => {
            // Pull student data from the database
            pullStudentData(majorsData)
            .then( (studentData) => {
                // For debugging
                // console.log(studentData);

                // Save studentData to file
                saveData( 'studentData.json', studentData )
                .then( () => {
                    // Parse studentData to generate studentList
                    parseStudentList(studentData)
                    .then( (studentList) => {
                        // For debugging
                        // console.log(studentList);

                        // Save studentList to file
                        saveData( 'studentList.json', studentList )
                        .then( process.on('exit', () => {
                            // Farewell the user on script completion
                            farewell();
                        }));
                    })
                    .catch( (error) => {
                        console.log("\x1b[31m", '\nStudent Data System - Pull Data Script\n');
                        console.log("\x1b[31m", '[ERROR] - An error occured when parsing student lists!');
                        console.error("\x1b[31m", error, '\n\n');
                        return process.exit(5);
                    });
                })
            })
            .catch( (error) => {
                console.log("\x1b[31m", '\nStudent Data System - Pull Data Script\n');
                console.log("\x1b[31m", '[ERROR] - An error occured when processing student data!');
                console.error("\x1b[31m", error, '\n\n');
                return process.exit(5);
            });
        })
    })
    .catch( (error) => {
        console.log("\x1b[31m", '\nStudent Data System - Pull Data Script\n' );
        console.log("\x1b[31m", '[ERROR] - An error occured when pulling majors from the database!');
        console.error("\x1b[31m", error, '\n\n');
        return process.exit(5);
    });
}

// Running ----------------------------------------------------------------- //
pullData();