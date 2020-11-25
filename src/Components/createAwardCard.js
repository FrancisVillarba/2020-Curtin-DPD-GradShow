import createCardCore from './createCardCore'

export default function createAwardCard(student, company, usingPref) {
  const awardWrapper = document.createElement('div')
  awardWrapper.className = 'award-profile headshot-hover fadein-quick'


  const rightWrapper = document.createElement('div')
  rightWrapper.className = 'profile-container'

  // Create an image tag for each student
  const studentImgPro = document.createElement('img')
  studentImgPro.dataset.studentId = student.id
  studentImgPro.className = 'student-headshot headshot-pro'
  studentImgPro.dataset.headshotPro = true
  studentImgPro.setAttribute('src', student.thumb.pro)
  studentImgPro.setAttribute('alt', `${student.name.first} Pro Headshot`)

  const studentImgFun = document.createElement('img')
  studentImgFun.dataset.studentId = student.id
  studentImgFun.className = 'student-headshot'
  studentImgFun.dataset.headshotFun = true
  studentImgFun.setAttribute('src', student.thumb.fun)
  studentImgPro.setAttribute('alt', `${student.name.first} Fun Headshot`)

  const studentImgLink = document.createElement('a')
  studentImgLink.href = `/student/${student.id}`
  const studentImgCont = document.createElement('div')
  studentImgCont.className = 'portfolio-image listing-headshot'

  studentImgCont.appendChild(studentImgPro)
  studentImgCont.appendChild(studentImgFun)
  studentImgLink.appendChild(studentImgCont)
  rightWrapper.appendChild(studentImgLink)

  
  const awardDetails = document.createElement('div')
  awardDetails.className = "award-details"
  const awardTitle = document.createElement('h3')
  awardTitle.innerText = student.awardName
  const companyLogo = document.createElement('img')
  companyLogo.setAttribute('src', company.logo)
  companyLogo.setAttribute('alt', company.name)
  awardDetails.appendChild(companyLogo)
  awardDetails.appendChild(awardTitle)

  rightWrapper.appendChild(awardDetails)
  createCardCore(rightWrapper, student, usingPref)

  awardWrapper.appendChild(studentImgLink)
  awardWrapper.appendChild(rightWrapper)

  return awardWrapper
}
