import Swup from 'swup';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';

const swup = new Swup({
    animateHistoryBrowsing: true,
    plugins: [
      new SwupPreloadPlugin(),
      new SwupA11yPlugin(),
      new SwupScrollPlugin({
        doScrollingRightAway: false,
        animateScroll: true,
        scrollFriction: 0.5,
        scrollAcceleration: 0.1,
    }),
  ]
});

import { StudentListing } from './Components/StudentListing';
import { handleStudentPage } from './student'
import { setupEntries } from './observer'

// listen for nav being toggled
const burger = document.querySelector(".navbar-burger");
const menu = document.querySelector(".navbar-menu");
const elements = [burger, menu];
burger.addEventListener('click', () => {
  elements.forEach(element => {
    element.classList.toggle('is-active');
  });
})

function setPageData() {
  const titleData = document.querySelector('[data-title]')
  if (titleData && titleData.dataset.title) {
    document.title = titleData.dataset.title
  }
}

// check if profile container exists before running Student component
function init() {
    setPageData()
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

    //  Handle Placeholder Headshots
    const proSrc = '/imgs/placeholderPro.jpg'
    const funSrc = '/imgs/placeholderFun.jpg'
    document.addEventListener('error', (e) => {
      if (e.target.tagName.toLowerCase() === 'img') {
        if (e.target.src === (proSrc | funSrc)) return
        if (e.target.dataset.headshotPro) {
          e.target.src = proSrc;
        } else if (e.target.dataset.headshotFun) {
          e.target.src = funSrc;
        }
      }
    }, true);
}

// run on page load
init();

// run check on swup page transition
swup.on('contentReplaced', function() {
    init();
})  

swup.on('animationOutStart', function() {
    // Close dropdown on page change
    elements.forEach(element => {
      element.classList.remove('is-active');
    });  
})