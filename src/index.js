import Swup from 'swup';
const swup = new Swup();
import { Student } from './Components/StudentListing';


// Entry Point for JS
console.log("Hello World")

// check if profile container exists before running Student component
function init() {

    const studentGridContainer = document.querySelector(".student-profile-container")
    if (studentGridContainer) {
        Student.createMajors();
        Student.generateStudentListing();
        
        let searchBar = document.querySelector(".search-bar");
        searchBar.addEventListener("input", (e) => {
            Student.search(e);
        })
    }
}

// run check on page load
init();


// run check on swup page transition
swup.on('contentReplaced', function() {
    init();
})  

