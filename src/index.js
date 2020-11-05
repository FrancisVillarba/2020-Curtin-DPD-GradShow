import Swup from 'swup';
const swup = new Swup();

import { StudentListing } from './Components/StudentListing';
import { handleStudentImageGrid } from './student'

// Entry Point for JS
console.log("Hello World")

// check if profile container exists before running Student component
function init() {
    const studentGridContainer = document.querySelector(".student-profile-container")
    if (studentGridContainer) {
        const DDListing = new StudentListing('Digital Design')
        DDListing.generateStudentListing();
        
        let searchBar = document.querySelector(".search-bar");
        searchBar.addEventListener("input", (e) => {
            DDListing.search(e);
        })
    }
    handleStudentImageGrid()
}

// run check on page load
init();

// run check on swup page transition
swup.on('contentReplaced', function() {
    init();
})  

