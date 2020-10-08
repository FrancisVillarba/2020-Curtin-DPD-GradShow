import anime from 'animejs';

let testArray = [
    { 
        "first_name": "test",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "2",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "3",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    },
    { 
        "first_name": "student",
        "second_name": "name",
        "major":  'Digital Design',
        "img": 'https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png'
    }
    
]

let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

let profileContainer = document.querySelector("#student-profile-container");

const Student = {

    createMajors: () => {
        const majorListing = document.querySelector(".major-container");
        let pageTitle = document.querySelector(".major-title");
        
        // set default page title to Digital Design
        pageTitle.innerHTML = "Digital Design"

        // Create an anchor tag for each major
        majors.forEach(major => {
            let majorEntry = document.createElement('a');
            majorEntry.innerHTML = major;
            majorEntry.setAttribute("id", major);
            
            // Add event listener to clear student listing, generate new student listing and change page title to major title
            majorEntry.addEventListener("click", () => {
                profileContainer.innerHTML = null;
                Student.generateStudentListing();
                pageTitle.innerHTML = major;
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

            // Create a major tag for each student
            let studentSpec = document.createElement("p");
            studentSpec.className = "student-spec";
            studentSpec.innerHTML = student.major;

            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // create URL for each student profile
            let params = new URLSearchParams();
            params.append('name', student.first_name + '_'  + student.second_name); 

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('a');
            profileBtn.className = "profile-btn";
            profileBtn.innerHTML = "Portfolio"
            profileBtn.setAttribute("href", window.location + params.toString());

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
                delay: anime.stagger(150)
            })
    },
    
}

export { Student }


