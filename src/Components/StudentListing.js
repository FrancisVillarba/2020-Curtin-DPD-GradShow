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

        const pageTitle = document.querySelector(".major-title");
        const bannerImg = document.querySelector(".banner-img"); 
        bannerImg.style.background = this.majors.find(major => major.name === this.onMajor)?.color
        pageTitle.innerText = this.onMajor;
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
            let majorBalls = document.createElement("div");
            majorBalls.className = 'major-ball-container';

            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';
            student.majors.forEach(major => {
                let majorBall = document.createElement("img");
                majorBall.className = "student-major";
                if(major.title == 'Graphic Design') {
                    majorBall.setAttribute("src", ".././imgs/gd.png");
            } else if (major.title == 'Digital Design') {
                majorBall.setAttribute("src", ".././imgs/dd.png");  

            } else if(major.title == 'Creative Advertising') {
                majorBall.setAttribute("src", ".././imgs/ca.png");

            } else if(major.title == 'Animation & Game Design') {
                majorBall.setAttribute("src", ".././imgs/agd.png");

            } else if(major.title == 'Illustration') {
                majorBall.setAttribute("src", ".././imgs/ill.png");

            }
                majorBalls.appendChild(majorBall);
            })
            studentSpec.appendChild(majorBalls);


            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('a');
            profileBtn.className = "profile-btn";
            profileBtn.innerText = "Portfolio"
            studentSpec.appendChild(profileBtn);

            // Append name tag and spec to student's container
            profileEntry.appendChild(studentImg);
            profileEntry.appendChild(studentName);
            profileEntry.appendChild(studentSpec);

            // Append to profile container
            this.profileContainer.appendChild(profileEntry);
        })

        let profileEntry = document.querySelectorAll(".profile-container");
    }
    
}

export { StudentListing }


