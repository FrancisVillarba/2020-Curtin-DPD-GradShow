import anime from 'animejs';


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

let profileContainer = document.querySelector("#student-profile-container");

const Student = {

    // Create the MAJORS filter bar
    createMajors: () => {
        const majorListing = document.querySelector(".major-container");
        let pageTitle = document.querySelector(".major-title");

        // Create an anchor tag for each major
        majors.forEach(major => {
            let majorEntry = document.createElement('a');
            // set majorEntry name to major name and id to major name
            majorEntry.innerHTML = major;
            majorEntry.setAttribute("id", major);

            // on click, page header to major name, reload profiles
            majorEntry.addEventListener("click", () => {
                pageTitle.innerHTML = major;
                profileContainer.innerHTML = null;
                Student.generateStudentListing();
            })

            // Append anchor tags to their container
            majorListing.appendChild(majorEntry);

        })

    },

    generateStudentListing: () => {
        testArray.forEach(student => {
            let profileEntry = document.createElement("div");
            profileEntry.className = "profile-container";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerHTML= student.first_name + ' ' + student.second_name;

            // Create a majorialisation tag for each student
            let studentSpec = document.createElement("p");
            studentSpec.className = "student-spec";
            studentSpec.innerHTML = student.major;

            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('a');
            profileBtn.className = "profile-btn";
            profileBtn.innerHTML = "Portfolio"

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


