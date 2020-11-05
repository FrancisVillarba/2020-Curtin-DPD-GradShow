import anime from 'animejs';
import studentData from '../../_data/studentData.json';

// Array for each major for demonstration purposes
let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

class StudentListing {
    constructor(major) {
        this.majors = [
            {name: 'Digital Design', color: '.././imgs/orbs/dd.png'},
            {name: 'Animation & Game Design', color: '.././imgs/orbs/agd.png'},
            {name: 'Illustration', color: '.././imgs/orbs/ill.png'},
            {name: 'Graphic Design', color: '.././imgs/orbs/gd.png'},
            {name: 'Creative Advertising', color: '.././imgs/orbs/ca.png'}
        ];
        this.profileContainer = document.querySelector(".student-profile-container");
        this.searchBar = document.querySelector(".search-bar");
    
        this.onMajor = major;
        this.studentDataInstance = studentData;

        const pageTitle = document.querySelector(".major-title");
        const bannerImg = document.querySelector(".banner-img"); 
        bannerImg.setAttribute("src", this.majors.find(major => major.name === this.onMajor)?.color)
        pageTitle.innerText = this.onMajor;
    }

    search(e) {
        const searchValue = e.target.value.toLowerCase()
        console.log(searchValue);
        const newStudentData = [...studentData]
        this.studentDataInstance = newStudentData.filter(student => {
            const fullName = student.name.first + ' ' + student.name.last
            if(fullName.toLowerCase().includes(searchValue)){
                return student        
            } 
            if(student.major){
                return student        
            } 
        })
        console.log(this.studentDataInstance.length);
        this.generateStudentListing()
    }

    generateStudentListing() {
        this.profileContainer.innerHTML = ''
        this.studentDataInstance.forEach(student => {

            let profileEntry = document.createElement("div");
            profileEntry.className = "profile-container";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = student.name.first + ' ' + student.name.last

            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';
            student.majors.forEach(major => {
                let majorBall = document.createElement("img");
                majorBall.className = "student-major";
                if(major.title == 'Graphic Design') {
                    majorBall.setAttribute("src", ".././imgs/orbs/gd.png");
            } else if (major.title == 'Digital Design') {
                majorBall.setAttribute("src", ".././imgs/orbs/dd.png");  

            } else if(major.title == 'Creative Advertising') {
                majorBall.setAttribute("src", ".././imgs/orbs/ca.png");

            } else if(major.title == 'Animation & Game Design') {
                majorBall.setAttribute("src", ".././imgs/orbs/agd.png");

            } else if(major.title == 'Illustration') {
                majorBall.setAttribute("src", ".././imgs/orbs/ill.png");

            }
            studentSpec.appendChild(majorBall);
            })


            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('button');
            profileBtn.className = "profile-btn";
            profileBtn.innerText = "Portfolio"
            let btnCont = document.createElement('div');
            btnCont.className = "layout-main";
            btnCont.appendChild(profileBtn);
            studentSpec.appendChild(btnCont);

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