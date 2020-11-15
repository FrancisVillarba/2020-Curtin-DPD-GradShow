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
const FIREBASE_ADMIN = require('firebase-admin')

const fs = require('fs')

const csv_parser = require('csv-parser')

// Globals ----------------------------------------------------------------- //
const FIREBASE_SERVICE_ACCOUNT = require('../.firebase/firebase-adminsdk.json')
const { parse } = require('url')

const INPUT_DATA_PATH = './input/'

const MAJORS_COLLECTION = 'majors/'

const BASE_HEADSHOTS_URL = "/public/imgs/headshots/";

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
  console.log('\x1b[36m', '\n Student Data System - Push Data Script')
  console.log(
    '\x1b[36m',
    'Written by Francis Villarba <francis.villarba@me.com> for Curtin DPD Graduation Show 2020\n'
  )
  console.log('\x1b[0m', `Timestamp: ${new Date().toTimeString()}`)
  console.log(
    '\x1b[34m',
    'Ensure input data is located at ./input/coredata.csv \n',
    '\x1b[0m'
  )
  console.log('\x1b[33m', 'Please wait we run tasks...\n', '\x1b[0m')
}

/**
 * A nice farewell message if all went well with the script
 */
function farewell() {
  console.log('\x1b[32m', '\n Student Data System - Push Data Script')
  console.log(
    '\x1b[32m',
    'All tasks successfully completed!',
    '\n\n Process exited with exit code 0\n',
    '\x1b[0m'
  )
  return process.exit(0)
}

/**
 * Pulls majors data from the database
 * @return {Object} majorsData - The array of majors in the database
 */
async function pullMajorsData() {
  console.log('\x1b[34m', '- Pulling Majors Data...')
  let majorsTemp = []

  const majors = await DATABASE.collection('majors').get()

  // Iterate through the majors data and pull what we need
  console.log('\x1b[34m', '- Parsing Majors Data...')
  majors.forEach(major => {
    let majorList = {
      id: major.id,
      title: major.data().title,
    }

    majorsTemp.push(majorList)
  })

  console.log(
    '\x1b[32m',
    '+ Finished pulling majors data from database!',
    '\x1b[0m'
  )
  return majorsTemp
}

/**
 * Parse student data from the csv file and returns an object
 * @return {Object} studentData - The student data as an array
 */
async function parseStudentData() {
  console.log('\x1b[34m', '- Parsing Student Data Input File...')

  // Let's make it into a promise
  let endData = new Promise((resolve, reject) => {
    let results = []

    fs.createReadStream(`${INPUT_DATA_PATH}coredata.csv`)
      .pipe(csv_parser())
      .on('data', data => {
        // console.log(data);
        results.push(data)
      })
      .on('end', () => {
        // For debugging
        // console.log(results);
        console.log(
          '\x1b[32m',
          '+ Finished Parsing Student Data Input File!',
          '\x1b[0m'
        )
        resolve(results)
      })
      .on('error', () => {
        // For debugging
        console.log(
          '\x1b[31m',
          '[ERROR] - An error occured when parsing student data!',
          '\x1b[0,'
        )
        reject
      })
  })
  return await endData
}

/**
 * Push student data to the database
 * @param {Object} studentDataObj - The core student data
 * @param {Object} manjorDataObj - The majors data
 */
async function pushStudentData(studentDataObj, majorDataObj) {
  console.log('\x1b[34m', '- Pushing Student Data...')

  // For debugging
  // console.log(studentDataObj);
  // console.log(majorDataObj);

  // Iterate through the student data object and push to the database
  for (let i = 0; i < studentDataObj.length; i++) {
    // For debugging
    // console.log(studentDataObj[i]);
    // console.log(majorDataObj);
    console.log(
      'Preparing data for:',
      studentDataObj[i]['First Name'],
      studentDataObj[i]['Last Name']
    )

    // Turn the majors into document references for the database
    let studentMajorsTemp = studentDataObj[i]['Major'].split(', ');

    // Check the majors array and transform them as required before proceeding 
    for( let n = 0; n < studentMajorsTemp.length; n++ ) {
      if( studentMajorsTemp[n] == 'Advertising' ) {
        studentMajorsTemp[n] = 'Creative Advertising & Graphic Design';
      }

      if( studentMajorsTemp[n] == 'Creative Advertising' ) {
        studentMajorsTemp[n] = 'Creative Advertising & Graphic Design';
      }

      if( studentMajorsTemp[n] == 'Graphic Design') {
        studentMajorsTemp[n] = 'Creative Advertising & Graphic Design';
      }

      if (studentMajorsTemp[n] == 'Advertising & Graphic Design') {
        studentMajorsTemp[n] = 'Creative Advertising & Graphic Design';
      }

      if (studentMajorsTemp[n] == 'Creative advertising and Graphic design') {
          studentMajorsTemp[n] = 'Creative Advertising & Graphic Design';
      }

      if( studentMajorsTemp[n] == 'Photography') {
        studentMajorsTemp[n] = 'Illustration';
      }
    }

    // De-dupe the javascript array
    let dedupedStudentMajorsTemp = new Set(studentMajorsTemp);

    // For debugging
    // console.log(studentMajorsTemp);
    // console.log(dedupedStudentMajorsTemp);

    // The final majors and the document references goes here
    let referencesTemp = [];

    // Iterate through the student's de-duped majors list and compare with majorsDataObject (for consistency)
    dedupedStudentMajorsTemp.forEach( (value) => {
      let matchedData = majorDataObj[
        majorDataObj.findIndex( major => major.title == value)
      ];

      if (!(matchedData === undefined)) {
        // Create document references and push to the collection
        referencesTemp.push(DATABASE.doc(MAJORS_COLLECTION + matchedData['id']))
      } else {
        // Could not find the unit, we should raise this as an error
        console.log(
          '\x1b[31m',
          '[ERROR] - An error occured when parsing student majors data!'
        )
        console.log(
          'Student: ',
          studentDataObj[i]['First Name'],
          studentDataObj[i]['Last Name']
        )
        console.log(
          'Could not find document with title',
          `"${value}"`,
          'to reference towards in the database! \n\n'
        )
        process.exit(5)
      }
    });

    // Create the data that we will be using to push to to the database
    let studentTemp = studentDataObj[i]

    // For Daniel Westbrook, convert empty fields to nulls to support nunjucks + eleventy stuff
    let studentPreferredNameTemp = null;
    if( studentTemp['Preferred Name'] != "" ) {
      studentPreferredNameTemp = studentTemp['Preferred Name'];
    }

    let studentBioTemp = null;
    if( studentTemp['Bio'] != "" ) {
      studentBioTemp = studentTemp['Bio'];
    }

    let studentStatementTemp = null;
    if( studentTemp['Short Creative Statement'] != "" ) {
      studentStatementTemp = studentTemp['Short Creative Statement'];
    }

    // Here, we make the final student data object to push to the database
    let studentDataTemp = {
      id: studentTemp['Student Number'],
      name: {
        first: studentTemp['First Name'],
        last: studentTemp['Last Name'],
        preferred: studentPreferredNameTemp,
      },
      headshots: {
        "pro": `${BASE_HEADSHOTS_URL}${studentTemp['Student Number']}_2.jpg`,
        "fun": `${BASE_HEADSHOTS_URL}${studentTemp['Student Number']}_1.jpg`
      },
      majors: referencesTemp,
      email: studentTemp['Email Address'],
      bio: studentBioTemp,
      statement: studentStatementTemp,
    }

    // For debugging the student's final data
    // console.log(studentDataTemp);

    console.log('Pushing to firestore database...')
    let res = await DATABASE.collection('students').add(studentDataTemp)

    console.log(`Successfully added document: firebase/students/${res.id}!`)
  }
}

/**
 * The main function for this script
 */
async function pushCoreData() {
  // Show MOTD - Welcome Message
  welcome()

  // Because Daniel Westbrook said I should use promises haha :)
  Promise.all([await parseStudentData(), await pullMajorsData()]).then(val => {
    // console.log({val});
    const [data1, data2] = val
    pushStudentData(data1, data2)
  })
}

// Running ----------------------------------------------------------------- //
pushCoreData()
