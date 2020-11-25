import majorImages from '../../_data/majorImages'

export default function createCardCore(profileWrapper, student, usingPref = true) {
  const studentName = document.createElement('h4')
  studentName.className = 'student-name'
  studentName.innerText =
    (usingPref ? student.name.preferred : student.name.first) +
    ' ' +
    student.name.last

  const studentSpec = document.createElement('div')
  studentSpec.className = 'student-major-container'

  const majorCont = document.createElement('div')
  majorCont.className = 'is-flex spaced'

  student.majors.forEach(major => {
    if (!majorImages[major.id]) return
    const majorBall = document.createElement('img')
    majorBall.className = 'student-major'
    majorBall.setAttribute('src', majorImages[major.id])
    majorBall.setAttribute('alt', major.title)
    majorCont.appendChild(majorBall)
  })

  studentSpec.appendChild(majorCont)

  // Creates Container for both buttons
  const btnCont = document.createElement('div')
  btnCont.className = 'profile-btn-cont'

  // Create a button that links to their portfolio
  const arrLink = document.createElement('a')
  arrLink.href = `/student/${student.id}`
  const portBtn = document.createElement('button')
  portBtn.className = 'button is-black is-small'
  const arrSpan = document.createElement('span')
  arrSpan.className = 'align-arrow'
  arrSpan.innerText = '>'
  portBtn.appendChild(arrSpan)

  arrLink.appendChild(portBtn)
  btnCont.appendChild(arrLink)

  // Create a button that links to the student's individual profile
  if (student.portfolio) {
    const profileLink = document.createElement('a')
    profileLink.href = student.portfolio
    profileLink.target = '_blank'
    profileLink.rel = 'noopener noreferrer'

    profileLink.className = 'profile-link'
    const profileBtn = document.createElement('button')
    profileBtn.className = 'button is-light is-small'
    profileBtn.innerText = 'Portfolio'
    profileLink.appendChild(profileBtn)
    btnCont.appendChild(profileLink)
  }

  studentSpec.appendChild(btnCont)

  // Append name tag and spec to student's container
  profileWrapper.appendChild(studentName)
  profileWrapper.appendChild(studentSpec)
}
