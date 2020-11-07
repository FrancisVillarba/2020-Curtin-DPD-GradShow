import anime from 'animejs';
import studentData from '../../_data/studentData.json';

// Array for each major for demonstration purposes
let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

class StudentListing {
    constructor(majorid) {
        this.profileContainer = document.querySelector(".student-profile-container");
        this.searchBar = document.querySelector(".search-bar");
    
        this.majorid = majorid
        
        this.studentDataInstance = studentData;
    }

    search(e) {
        const searchValue = e.target.value.toLowerCase()
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
        this.generateStudentListing()
    }

    generateStudentListing() {
        this.profileContainer.innerHTML = ''
        this.studentDataInstance.forEach(student => {
            if (this.majorid !== '0') {
                if (!student.majors.find(major => major.id === this.majorid)) {
                    return
                }    
            }
                
            let profileEntry = document.createElement("a");
            profileEntry.href = `/student/${student.name.first.toLowerCase()}${student.name.last.toLowerCase()}`;
            profileEntry.className = "profile-link"
            let profileWrapper = document.createElement("div");
            profileWrapper.className = "profile-container";
            profileEntry.appendChild(profileWrapper)

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = student.name.first + ' ' + student.name.last

            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';
            student.majors.forEach(major => {
                let majorBall = document.createElement("img");
                majorBall.className = "student-major";

                if (major.title == 'Graphic Design') {
                    majorBall.setAttribute("src", "/imgs/orbs/gd.png");

                } else if (major.title == 'Digital Design') {
                    majorBall.setAttribute("src", "/imgs/orbs/dd.png");  

                } else if (major.title == 'Creative Advertising') {
                    majorBall.setAttribute("src", "/imgs/orbs/ca.png");

                } else if (major.title == 'Animation & Game Design') {
                    majorBall.setAttribute("src", "/imgs/orbs/agd.png");

                } else if (major.title == 'Illustration') {
                    majorBall.setAttribute("src", "/imgs/orbs/ill.png");

                } else {
                    return
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
            profileWrapper.appendChild(studentImg);
            profileWrapper.appendChild(studentName);
            profileWrapper.appendChild(studentSpec);

            // Append to profile container
            this.profileContainer.appendChild(profileEntry);
        })

        let profileEntry = document.querySelectorAll(".profile-container");
    }
    
}
export { StudentListing }