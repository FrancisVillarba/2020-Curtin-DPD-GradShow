import anime from 'animejs';
import studentList from '../../_data/studentList.json';

// Array for each major for demonstration purposes
let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

class StudentListing {
    constructor(major) {
        this.majors = [
            {name: 'Digital Design', color: 'red'},
            {name: 'Animation & Game Design', color: 'blue'},
            {name: 'Illustration', color: 'yellow'},
            {name: 'Graphic Design', color: 'orange'},
            {name: 'Creative Advertising', color: 'purple'}
        ];
        this.profileContainer = document.querySelector(".student-profile-container");
        this.searchBar = document.querySelector(".search-bar");
    
        this.onMajor = major;
        this.studentListInstance = studentList;
    }

    // Create the MAJORS filter bar
    createMajors(profileContainer = this.profileContainer) {
        const majorListing = document.querySelector(".major-container");
        let pageTitle = document.querySelector(".major-title");

        // Create an anchor tag for each major
        this.majors.forEach(major => {
            let majorEntry = document.createElement('a');
            // set majorEntry name to major name and id to major name
            majorEntry.innerText = major.name;
            majorEntry.setAttribute("id", major.name);

            // on click, page header to major name, reload profiles
            majorEntry.addEventListener("click", () => {
                let bannerImg = document.querySelector(".banner-img");
                this.onMajor = major.name;
                pageTitle.innerText = major.name;
                bannerImg.style.background = major.color;
            })

            // Append anchor tags to their container
            majorListing.appendChild(majorEntry);

        })

    }

    search(e) {
        const searchValue = e.target.value.toLowerCase()
        console.log(searchValue);
        const newStudentList = [...studentList]
        this.studentListInstance = newStudentList.filter(student => {
            if(student.name.toLowerCase().includes(searchValue)){
                return student        
            } 
        })
        console.log(this.studentListInstance.length);
        this.generateStudentListing()
    }

    generateSearch() {
        let profiles = document.querySelector(".profile-container");
        let profileContainer = document.querySelector(".student-profiles");
        profileContainer.innerHTML = null;

    }

    generateStudent() {
        this.studentListInstance.forEach(student => {

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
    }

    generateStudentListing() {
        this.profileContainer.innerHTML = ''
        this.studentListInstance.forEach(student => {

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
            this.profileContainer.appendChild(profileEntry);
        })

        let profileEntry = document.querySelectorAll(".profile-container");
    }
    
}

export { StudentListing }


