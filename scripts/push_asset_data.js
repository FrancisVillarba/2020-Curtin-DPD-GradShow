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

const BASE_PROJECTS_URL = '/imgs/projects/';

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
    // console.log(studentAssetData);

    // iterate through the student asset data object
    for( let i = 0; i < studentAssetData.length; i++ ) {
        // For debugging
        console.log(
            'Verifying that: ',
            studentAssetData[i]['First Name'],
            studentAssetData[i]['Last Name'],
            studentAssetData[i]['Student Number'],
            ' exists in the students database...'
        );

        let studentID = studentAssetData[i]['Student Number'];

        // Search the database for a particular student document who's ID matches the student ID
        let databaseQueryResult = await DATABASE.collection('students').where('id', '==', studentID).get();

        // Check the result of the database query
        if( databaseQueryResult.empty ) {
            console.error('Could not find matching student in database with student number', studentID);
            return false;
        }
    };
    // For debugging
    console.log(
        '\x1b[32m',
        '+ Finished Student Asset Data Verification! Now Continuing...',
        '\x1b[0m'
    );
    return true;
};

/**
 * Pushes student asset data to the database
 * @param {Object} studentAssetData - The student's asset data as an array object
 */
async function pushStudentAssetData(studentAssetData) {
    // For debugging
    console.log('\x1b[34m', '- Pushing Student Asset Data...');

    // Iterate through the student asset data array
    for( let i = 0; i < studentAssetData.length; i++ ) {
        // For debugging
        console.log(
            'Preparing to push assets for:',
            studentAssetData[i]['First Name'],
            studentAssetData[i]['Last Name'],
            studentAssetData[i]['Student Number']
        );

        // Prepare the social media links array ------------------------------- /
        let studentSocialMediaLinksTemp = [];
        if (studentAssetData[i]['Your Artstation link'] != "") {
            let artstation = {
                name: "Artstation",
                link: `${studentAssetData[i]['Your Artstation link']}`
            };
            studentSocialMediaLinksTemp.push(artstation);
        }

        if (studentAssetData[i]['Your Behance link'] != "") {
            let behanceData = {
                name: "Behance",
                link: `${studentAssetData[i]['Your Behance link']}`
            }
            studentSocialMediaLinksTemp.push(behanceData);
        }

        if (studentAssetData[i]['Your CGSociety link'] != "") {
            let cgsocietyData = {
                name: "CGSociety",
                link: `${studentAssetData[i]['Your CGSociety link']}`
            }
            studentSocialMediaLinksTemp.push(cgsocietyData);
        }

        if (studentAssetData[i]['Your Dribbble link'] != "") {
            let dribbbleData = {
                name: "Dribbble",
                link: `${studentAssetData[i]['Your Dribbble link']}`
            }
            studentSocialMediaLinksTemp.push(dribbbleData);
        }

        if (studentAssetData[i]['Your Facebook business page link'] != "") {
            let facebookData = {
                name: "Facebook",
                link: `${studentAssetData[i]['Your Facebook business page link']}`
            }
            studentSocialMediaLinksTemp.push(facebookData);
        }

        if (studentAssetData[i]['Your Github link'] != "") {
            let githubData = {
                name: "GitHub",
                link: `${studentAssetData[i]['Your Github link']}`
            }
            studentSocialMediaLinksTemp.push(githubData);
        }

        if (studentAssetData[i]['Your Instagram link'] != "") {
            let instagramData = {
                name: "Instagram",
                link: `${studentAssetData[i]['Your Instagram link']}`
            }
            studentSocialMediaLinksTemp.push(instagramData);
        }

        if (studentAssetData[i]['Your LinkedIn link'] != "") {
            let linkedInData = {
                name: "LinkedIn",
                link: `${studentAssetData[i]['Your LinkedIn link']}`
            }
            studentSocialMediaLinksTemp.push(linkedInData);
        }

        if (studentAssetData[i]['Your Twitter link'] != "") {
            let twitterData = {
                name: "Twitter",
                link: `${studentAssetData[i]['Your Twitter link']}`
            }
            studentSocialMediaLinksTemp.push(twitterData);
        }

        if (studentAssetData[i]['Your Vimeo link'] != "") {
            let vimeoData = {
                name: "Vimeo",
                link: `${studentAssetData[i]['Your Vimeo link']}`
            }
            studentSocialMediaLinksTemp.push(vimeoData);
        }

        if (studentAssetData[i]['Your Youtube link'] != "") {
            let youtubeData = {
                name: "YouTube",
                link: `${studentAssetData[i]['Your Youtube link']}`
            }
            studentSocialMediaLinksTemp.push(youtubeData)
        }

        if (studentAssetData[i]['Your Bitbucket link'] != "") {
            let bitbucketData = {
                name: "Bitbucket",
                link: `${studentAssetData[i]['Your Bitbucket link']}`
            }
            studentSocialMediaLinksTemp.push(bitbucketData);
        }

        if (studentAssetData[i]['Your CodePen link'] != "") {
            let codepenData = {
                name: "CodePen",
                link: `${studentAssetData[i]['Your CodePen link']}`
            }
            studentSocialMediaLinksTemp.push(codepenData);
        }

        if (studentAssetData[i]['Your Polycount link'] != "") {
            let polycountData = {
                name: "PolyCount",
                link: `${studentAssetData[i]['Your Polycount link']}`
            }
            studentSocialMediaLinksTemp.push(polycountData);
        }

        if (studentAssetData[i]['Your Tumblr link'] != "") {
            let tumblrData = {
                name: "Tumblr",
                link: `${studentAssetData[i]['Your Tumblr link']}`
            }
            studentSocialMediaLinksTemp.push(tumblrData);
        }

        // Parse the student's projects data -------------------------- /
        // -- And also generate the relative path for the project images based on the project data -- /
        let studentProjectsTemp = [];
        let studentProjectURLsTemp = studentAssetData[i]['Upload Images Here'].split(',');

        // Iterate through the project URLs and setup our objects
        for( let j = 0; j < studentProjectURLsTemp.length; j++ ) {
            // Create the project object
            // "/public/imgs/projecrs/FirstName_LastName_StudentNumber_ImageNumber"
            let projectTemp = {
                alt: `${studentAssetData[i]['First Name']} ${studentAssetData[i]['Last Name']}'s Project ${j+1}`,
                src: `${BASE_PROJECTS_URL}${studentAssetData[i]['First Name']}_${studentAssetData[i]['Last Name']}_${studentAssetData[i]['Student Number']}_${j+1}.jpg`
            };
            // Append to the array
            studentProjectsTemp.push(projectTemp);
        }

        // Prepare data for for update ------------------------------- /
        let studentDataUpdateTemp = {
            portfolio: studentAssetData[i]['Your portfolio link'],
            social: studentSocialMediaLinksTemp,
            projects: studentProjectsTemp
        };

        // For debugging
        // console.log(studentDataUpdateTemp);
        
        // Get the reference for this student's data in the database
        let databaseDocumentReference;
        let studentID = studentAssetData[i]['Student Number'];
        let databaseQueryResult = await DATABASE.collection('students').where('id', '==', studentID).get();
        databaseQueryResult.forEach( (doc) => {
            databaseDocumentReference = doc.id;
        });

        // For debugging
        // console.log(databaseDocumentReference);

        // For debugging
        console.log('Pushing...');
        
        // Update the Fields
        DATABASE.collection('students').doc(databaseDocumentReference).set(studentDataUpdateTemp, {
            merge: true
        })
        .then( () => {
            console.log('\x1b[32m', 'Successfully updated assets for', studentAssetData[i]['First Name'], studentAssetData[i]['Last Name'], '!');
        });
    }
};

/**
 * The main function for running this script
 */
async function pushAssetData() {
    // Show MOTD - Welcome Message
    welcome();
    
    parseStudentAssetData().then( (assetData) => {
        // For debugging
        // console.log(assetData);

        // Verify if the data is correct (by having IDs on each side)
        verifyAssetData(assetData).then( (valid) => {
            // We can proceed if it is valid, otherwise, stop (to maintain data integrity)
            if( valid ) {
                pushStudentAssetData( assetData );
            } else {
                process.exit(5);
            }
        });
    });
}

// Running ----------------------------------------------------------------- //
pushAssetData();

// TODO - Hard code one of the person's thing