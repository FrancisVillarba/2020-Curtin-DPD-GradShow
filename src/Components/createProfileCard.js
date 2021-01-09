import createCardCore from "./createCardCore"

export default function createProfileCard(student, usingPref) {
  const profileWrapper = document.createElement('div')
  profileWrapper.className = 'profile-container fadein-quick headshot-hover'


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
  profileWrapper.appendChild(studentImgLink)

  createCardCore(profileWrapper, student, usingPref)

  return profileWrapper
}
