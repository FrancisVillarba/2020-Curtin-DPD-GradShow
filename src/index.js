import Swup from 'swup';
const swup = new Swup();
import { Student } from './Components/StudentListing';


// Entry Point for JS
console.log("Hello World")

// check if profile container exists before running Student component
function init() {
    if (document.querySelector("#student-profile-container")) {
        Student.createMajors();
        Student.generateStudentListing();

        let searchBar = document.querySelector(".search-bar");
        searchBar.addEventListener("keydown", () => {
            Student.search();
        })
    }
}

// run check on page load
init();


// run check on swup page transition
swup.on('contentReplaced', function() {
    init();
})  

