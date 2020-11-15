import studentData from '../../_data/studentDataComputed.js';
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
            const pref = student.name.preferred ? student.name.preferred : student.name.first
            const fullName = pref + ' ' + student.name.last
            const actualName = student.name.first + ' ' + student.name.last
            if(fullName.toLowerCase().includes(searchValue)){
                return student
            } 
            if(actualName.toLowerCase().includes(searchValue)){
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

        const studentArray = []

        this.studentDataInstance.forEach(student => {
            if (this.majorid !== '0') {
                if (!student.majors.find(major => major.id === this.majorid)) {
                    return
                }    
            }
                
            let profileWrapper = document.createElement("div");
            profileWrapper.className = "profile-container fadein-quick scale headshot-hover";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            const pref = student.name.preferred ? student.name.preferred : student.name.first
            studentName.innerText = pref + ' ' + student.name.last

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
            const studentImgPro = document.createElement("img");
            studentImgPro.dataset.studentId = student.id
            studentImgPro.className = "student-headshot headshot-pro";
            studentImgPro.setAttribute("src", student.headshots.pro);

            const studentImgFun = document.createElement("img");
            studentImgFun.dataset.studentId = student.id
            studentImgFun.className = "student-headshot";
            studentImgFun.setAttribute("src", student.headshots.fun);

            const studentImgLink = document.createElement('a')
            studentImgLink.href = `/student/${student.id}`;
            const studentImgCont = document.createElement('div')
            studentImgCont.className = 'portfolio-image listing-headshot'


            studentImgCont.appendChild(studentImgPro);
            studentImgCont.appendChild(studentImgFun);
            studentImgLink.appendChild(studentImgCont);
            profileWrapper.appendChild(studentImgLink);

            // Creates Container for both buttons
            const btnCont = document.createElement('div')      
            btnCont.className = "profile-btn-cont";

            // Create a button that links to their portfolio
            let arrLink = document.createElement('a')
            arrLink.href = `/student/${student.id}`;
            let portBtn = document.createElement('button');
            portBtn.className = "button is-black is-small";
            portBtn.innerText = ">"
            arrLink.appendChild(portBtn);
            btnCont.appendChild(arrLink);

            // Create a button that links to the student's individual profile
            if (student.portfolio) {
                let profileLink = document.createElement('a')
                profileLink.href = student.portfolio
                profileLink.target = "_blank" 
                profileLink.rel = "noopener noreferrer"
                
                profileLink.className = 'profile-link'
                let profileBtn = document.createElement('button');
                profileBtn.className = "button is-black is-light is-small";
                profileBtn.innerText = "Portfolio"
                profileLink.appendChild(profileBtn);
                btnCont.appendChild(profileLink);
            }

            studentSpec.appendChild(btnCont);

            // Append name tag and spec to student's container
            profileWrapper.appendChild(studentName);
            profileWrapper.appendChild(studentSpec);

            studentArray.push(profileWrapper)
        })
        
        this.generateListFromStudents(studentArray)
    }
    
    generateListFromStudents(studentArray) {
        const randomised = studentArray.sort(randomiser);  
        function randomiser(a, b) {  
            return 0.5 - Math.random();
        }  

        randomised.forEach(student => {
            this.profileContainer.appendChild(student);
        })
    }
}
export { StudentListing }