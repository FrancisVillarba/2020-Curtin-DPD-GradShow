import Swup from 'swup';
const swup = new Swup();
import { Student } from './Components/StudentListing';


// Entry Point for JS
console.log("Hello World")

// The commented code below wouldn't work in Vercel, so I've just left it like this for now (refreshing the page should make the student listing and majors appear i.e. I hope to God it works this time)

Student.createMajors();
Student.generateStudentListing();


/* 
swup.on('contentReplaced', function() {
    if(window.location.pathname == '/listing/') {
        Student.createMajors();
        Student.generateStudentListing();
    }
})  
*/
