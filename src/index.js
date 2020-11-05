import Swup from 'swup';
const swup = new Swup();
import { Student } from './Components/StudentListing';
import { handleStudentImageGrid } from './student'


// Entry Point for JS
console.log("Hello World")

// check if profile container exists before running Student component
function init() {
    if (document.querySelector("#student-profile-container")) {
        Student.createMajors();
        Student.generateStudentListing();
    }
    handleStudentImageGrid()
}

// run check on page load
init();

// run check on swup page transition
swup.on('contentReplaced', function() {
    init();
})  

