import studentData from '../../_data/studentDataComputed';
import majorImages from '../../_data/majorImages'
import { reorderAlpha } from './sortyBy';
import { path } from 'animejs';
// Array for each major for demonstration purposes
let majors = [
    'Digital Design', 'Animation & Game Design', 'Illustration', 'Graphic Design', 'Creative Advertising'
]

class StudentListing {
    constructor(majorid) {
        this.profileContainer = document.querySelector(".student-profile-container");
        this.searchBar = document.querySelector(".search-bar");
        
        this.sortedBy = null
        this.majorid = majorid

        this.computedStudentData = studentData.map(student => {
            student.thumb = {
                pro: student.headshots.pro.replace('headshots', 'thumbHeadshots'),
                fun: student.headshots.fun.replace('headshots', 'thumbHeadshots'),
            }

            if (!student.name.preferred) {
                student.name.preferred = student.name.first
            }
            return student
        })
        this.studentDataInstance = this.computedStudentData;
        this.sortedInstance;

        this.studentArray = [];
        this.usingPref = true

        const sortByEl = document.getElementById('sortby')
        sortByEl.addEventListener('change', (e) => {
            this.sortedBy = e.target.value
            this.sortList()
        })

        const isPrefEl = document.getElementById('ispref')
        isPrefEl.addEventListener('change', (e) => {
            this.usingPref = e.target.checked
            this.sortList()
        })
    }

    search(e) {
        const searchValue = e.target.value.toLowerCase()
        const newStudentData = [...this.computedStudentData]
        this.studentDataInstance = newStudentData.filter(student => {
            const fullName = student.name.preferred + ' ' + student.name.last
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
        this.sortList()
    }

    generate() {
        this.sortList()
    }

    sortList() {
        const randomised = this.studentDataInstance.sort(randomiser);  
        function randomiser(a, b) {  
            return 0.5 - Math.random();
        }

        const nameType = this.usingPref ? 'preferred' : 'first'
        let sorted
        switch (this.sortedBy) {
            case 'firstaz':
                sorted = reorderAlpha(randomised, ['name', nameType])
                break;
            case 'firstza':
                sorted = reorderAlpha(randomised, ['name', nameType], true)
                break;
            case 'lastaz':
                sorted = reorderAlpha(randomised, ['name', 'last'])
                break;
            case 'lastza':
                sorted = reorderAlpha(randomised, ['name', 'last'], true)
                break;
            case null:            
            default:
                sorted = randomised
                break;
        }
        
        this.sortedInstance = sorted

        this.generateStudentListing()
    }

    generateStudentListing() {
        this.profileContainer.innerHTML = ''

        this.studentArray = []

        this.sortedInstance.forEach(student => {
            if (this.majorid !== '0') {
                if (!student.majors.find(major => major.id === this.majorid)) {
                    return
                }    
            }
                
            let profileWrapper = document.createElement("div");
            profileWrapper.className = "profile-container fadein-quick headshot-hover";

            // Create a name h3 tag for each student
            let studentName = document.createElement("h3");
            studentName.className="student-name";
            studentName.innerText = (this.usingPref ? student.name.preferred : student.name.first) + ' ' + student.name.last

            let studentSpec = document.createElement('div');
            studentSpec.className = 'student-major-container';

            let majorCont = document.createElement('div');
            majorCont.className = 'is-flex spaced';

            student.majors.forEach(major => {
                if (!majorImages[major.id]) return
                let majorBall = document.createElement("img");
                majorBall.className = "student-major";
                majorBall.setAttribute("src", majorImages[major.id]);
                majorBall.setAttribute("alt", major.title);
                majorCont.appendChild(majorBall);
            })

            studentSpec.appendChild(majorCont);

            // Create an image tag for each student
            const studentImgPro = document.createElement("img");
            studentImgPro.dataset.studentId = student.id
            studentImgPro.className = "student-headshot headshot-pro";
            studentImgPro.dataset.headshotPro = true
            studentImgPro.setAttribute("src", student.thumb.pro);
            studentImgPro.setAttribute("alt", `${student.name.first} Pro Headshot`);

            const studentImgFun = document.createElement("img");
            studentImgFun.dataset.studentId = student.id
            studentImgFun.className = "student-headshot";
            studentImgFun.dataset.headshotFun = true
            studentImgFun.setAttribute("src", student.thumb.fun);
            studentImgPro.setAttribute("alt", `${student.name.first} Fun Headshot`);

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

            this.studentArray.push(profileWrapper)
        })

        this.render()
    }
    
    render() {
        this.studentArray.forEach(student => {
            this.profileContainer.appendChild(student);
        })
    }
}
export { StudentListing }