import anime from 'animejs';
import studentList from '../../_data/studentList.json';


// Array of sample students for demonstration purposes
let testArray = [
    { 
        "first_name": "student",
        "second_name": "one",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "2",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'
    }
    
]

// Array for each major for demonstration purposes
let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

const Student = {

    majors: [
        {name: 'Digital Design', color: 'red'},
        {name: 'Animation & Game Design', color: 'blue'},
        {name: 'Illustration', color: 'yellow'},
        {name: 'Graphic Design', color: 'orange'},
        {name: 'Creative Advertising', color: 'purple'}
    ],

    onMajor: 'Digital Design',

    // FILTERS
    getSpecific: (data) => {
        let profileContainer = document.querySelector("#student-profile-container");
        
    },

    // Create the MAJORS filter bar
    createMajors: () => {
        let profileContainer = document.querySelector("#student-profile-container");

        const majorListing = document.querySelector(".major-container");
        let pageTitle = document.querySelector(".major-title");

        // Create an anchor tag for each major
        Student.majors.forEach(major => {
            let majorEntry = document.createElement('a');
            // set majorEntry name to major name and id to major name
            majorEntry.innerText = major.name;
            majorEntry.setAttribute("id", major.name);

            // on click, page header to major name, reload profiles
            majorEntry.addEventListener("click", () => {
                let bannerImg = document.querySelector(".banner-img");
                Student.onMajor = major.name;
                pageTitle.innerText = major.name;
                bannerImg.style.background = major.color;
            })

            // Append anchor tags to their container
            majorListing.appendChild(majorEntry);

        })

    },

    search: () => {
        let searchBar = document.querySelector(".search-bar");
        let searchValue = searchBar.value.toLowerCase();
        console.log(searchValue);
        studentList.forEach(student => {

            if(student.name.toLowerCase().includes(searchValue)){
                console.log(student.name);
                
            } 
        })

    },

    generateSearch: () => {
        let profiles = document.querySelector(".profile-container");
        let profileContainer = document.querySelector(".student-profiles");
        profileContainer.innerHTML = null;

    },

    generateStudent: () => {
        studentList.forEach(student => {

            let profileEntry = document.createElement("div");
            profileEntry.className = "profile-container";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = student.name

            // Create a major colour for each student
            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';
            student.majors.forEach(major => {
                let majorBall = document.createElement("div");
                majorBall.className = "student-major";
                if(major.title == 'Graphic Design') {
                    majorBall.style.background = "#21bace"
            } else if (major.title == 'Digital design') {
                majorBall.style.background = "#f79421"

            } else if(major.title == 'Creative Advertising') {
                majorBall.style.background = "#ee2d2a"

            } else if(major.title == 'Animation & Game Design') {
                majorBall.style.background = "#92298d"

            } else if(major.title == 'Illustration') {
                majorBall.style.background = "#00aa6c";

            }
                studentSpec.appendChild(majorBall);
            })

            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('a');
            profileBtn.className = "profile-btn";
            profileBtn.innerText = "Portfolio"

            // Append name tag and spec to student's container
            profileEntry.appendChild(studentImg);
            profileEntry.appendChild(studentName);
            profileEntry.appendChild(studentSpec);
            profileEntry.appendChild(profileBtn);

            // Append to profile container
            profileContainer.appendChild(profileEntry);
        })

        let profileEntry = document.querySelectorAll(".profile-container");
                    // Animate profiles into view
                    anime({
                        targets: profileEntry,
                        keyframes: [
                            { opacity: 0, },
                            { opacity: 1, }
                        ],
                        delay: anime.stagger(50)
                    })
    },


    generateStudentListing: () => {
        let profileContainer = document.querySelector("#student-profile-container");

        studentList.forEach(student => {

            let profileEntry = document.createElement("div");
            profileEntry.className = "profile-container";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = student.name

            // Create a major colour for each student
            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';
            student.majors.forEach(major => {
                let majorBall = document.createElement("div");
                majorBall.className = "student-major";
                if(major.title == 'Graphic Design') {
                    majorBall.style.background = "#21bace"
            } else if (major.title == 'Digital design') {
                majorBall.style.background = "#f79421"

            } else if(major.title == 'Creative Advertising') {
                majorBall.style.background = "#ee2d2a"

            } else if(major.title == 'Animation & Game Design') {
                majorBall.style.background = "#92298d"

            } else if(major.title == 'Illustration') {
                majorBall.style.background = "#00aa6c";

            }
                studentSpec.appendChild(majorBall);
            })

            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('a');
            profileBtn.className = "profile-btn";
            profileBtn.innerText = "Portfolio"

            // Append name tag and spec to student's container
            profileEntry.appendChild(studentImg);
            profileEntry.appendChild(studentName);
            profileEntry.appendChild(studentSpec);
            profileEntry.appendChild(profileBtn);

            // Append to profile container
            profileContainer.appendChild(profileEntry);
        })

        let profileEntry = document.querySelectorAll(".profile-container");
                    // Animate profiles into view
                    anime({
                        targets: profileEntry,
                        keyframes: [
                            { opacity: 0, },
                            { opacity: 1, }
                        ],
                        delay: anime.stagger(50)
                    })
    },
    
}

export { Student }


