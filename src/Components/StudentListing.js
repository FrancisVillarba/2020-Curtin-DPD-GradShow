import awardWinners from '../../_data/awardWinners';
import studentData from '../../_data/studentDataComputed';
import { reorderAlpha } from './sortyBy';
import createProfileCard from './createProfileCard';
import createAwardCard from './createAwardCard';

const computeStudents = (students) => {
    const out = students.map(student => {
        if (!student.thumb) {
            student.thumb = {
                pro: student.headshots.pro.replace('headshots', 'thumbHeadshots'),
                fun: student.headshots.fun.replace('headshots', 'thumbHeadshots'),
            }
        }

        if (!student.name.preferred) {
            student.name.preferred = student.name.first
        }
        return student
    })
    return out
}

const random = (list) => {
    function randomiser(a, b) {  
        return 0.5 - Math.random();
    }
    return list.sort(randomiser)
}

export class AwardListing {
    constructor() {
        this.profileContainer = document.querySelector(".award-container");
        this.awardWinners = computeStudents(awardWinners.students)
        this.companies = awardWinners.companies
        this.studentArray = []
        this.generate()
    }
    generate() {
        this.profileContainer.innerHTML = ''
        this.studentArray = []
        this.awardWinners.forEach(student => {
            const company = this.companies[student.awardCompany]
            const studentCard = createAwardCard(student, company, this.usingPref)
            this.studentArray.push(studentCard)
        })
        this.render()
    }
    render() {
        this.studentArray.forEach(student => {
            this.profileContainer.appendChild(student);
        })
    }
}

export class StudentListing {
    constructor(majorid) {
        this.profileContainer = document.querySelector(".student-profile-container");
        this.searchBar = document.querySelector(".search-bar");
        
        this.sortedBy = null
        this.majorid = majorid

        this.computedStudentData = computeStudents(studentData)
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

        this.generate()
    }

    // Called by user
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
        const randomised = random(this.studentDataInstance)

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
            const studentCard = createProfileCard(student, this.usingPref)
            this.studentArray.push(studentCard)
        })

        this.render()
    }
    
    render() {
        this.studentArray.forEach(student => {
            this.profileContainer.appendChild(student);
        })
    }
}
