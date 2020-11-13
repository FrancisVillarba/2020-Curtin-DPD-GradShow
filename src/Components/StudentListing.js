import studentData from '../../_data/studentData.json';
import majorImages from '../../_data/majorImages'
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
            profileEntry.href = `/student/${student.id}`;
            profileEntry.className = "profile-link scale"
            let profileWrapper = document.createElement("div");
            profileWrapper.className = "profile-container fadein-quick";
            profileEntry.appendChild(profileWrapper)

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = student.name.first + ' ' + student.name.last

            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';

            let majorCont = document.createElement('div');
            majorCont.className = 'is-flex spaced';

            student.majors.forEach(major => {
                if (!majorImages[major.id]) return
                let majorBall = document.createElement("img");
                majorBall.className = "student-major";
                majorBall.setAttribute("src", majorImages[major.id]);
                majorCont.appendChild(majorBall);
            })

            studentSpec.appendChild(majorCont);


            // Create an image tag for each student
            let studentImg = document.createElement("img");
            studentImg.className = "student-img";
            studentImg.setAttribute("src", student.img);

            // Creates Container for both buttons
            const btnCont = document.createElement('div')      
            btnCont.className = "profile-btn-cont";

            // Create a button that links to their portfolio
            let portBtn = document.createElement('button');
            portBtn.className = "button is-black is-small";
            portBtn.innerText = ">"
            btnCont.appendChild(portBtn);

            // Create a button that links to the student's individual profile
            let profileBtn = document.createElement('button');
            profileBtn.className = "button is-black is-light is-small";
            profileBtn.innerText = "Portfolio"
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