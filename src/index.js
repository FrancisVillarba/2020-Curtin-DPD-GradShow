import Swup from 'swup';
const swup = new Swup();
import { Student } from './Components/StudentListing';


// Entry Point for JS
console.log("Hello World")

/* 
** Currently, listing only appears when refreshing the page (not when visiting it for the first time)
** I believe this is due to swup (it works fine when commented out)
** 
*/

if(window.location.pathname == '/listing/') {
    Student.createMajors();
    Student.generateStudentListing();
}


// Tried using the following code, it will generate BOTH the majors list and the profiles, but would only append the majors list

/* 
swup.on('contentReplaced', function() {
    if(window.location.pathname == '/listing/') {
        Student.createMajors();
        Student.generateStudentListing();
    }
})  
*/
