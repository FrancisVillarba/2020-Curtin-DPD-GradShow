import Swup from 'swup';
const swup = new Swup();

import { StudentListing } from './Components/StudentListing';
import { handleStudentPage } from './student'
import { setupEntries } from './observer'

// Entry Point for JS
console.log("Hello World")

// check if profile container exists before running Student component
function init() {
    const homeBtn = document.getElementById('home-btn')
    if (window.location.pathname === '/') {
        homeBtn.style.opacity = 0
        setTimeout(() => {
          homeBtn.classList.remove('dynamic-gradient')          
          homeBtn.style.opacity = 1
        }, 200);
    } else if (!homeBtn.classList.contains('dynamic-gradient')) {
        homeBtn.style.opacity = 0
        setTimeout(() => {
          homeBtn.classList.add('dynamic-gradient')
          homeBtn.style.opacity = 1
        }, 200);
    } else {
      homeBtn.style.opacity = 1
    }
    
    if (document.querySelector(".student-profile-container")) {
        const majorid = document.querySelector('.major-title').dataset.majorId
        const DDListing = new StudentListing(majorid)
        DDListing.generateStudentListing();
        
        let searchBar = document.querySelector(".search-bar");
        searchBar.addEventListener("input", (e) => {
            DDListing.search(e);
        })
    }
    handleStudentPage()
    setupEntries()
}

// run check on page load
init();

// run check on swup page transition
swup.on('contentReplaced', function() {
    window.scrollTo(0, 0)
    init();
})  

// nav hamburger show/hide 
function  toggleNav() {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const elements = [burger, menu];
  burger.addEventListener('click', () => {
    elements.forEach(element => {
      element.classList.toggle('is-active');
    });
  })
}
// listen for nav being toggled
toggleNav();
