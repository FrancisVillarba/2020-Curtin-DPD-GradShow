import studentData from '../_data/studentData.json'

export const handleStudentPage = () => {
  // Handle Student Grid
  const images = document.querySelectorAll('.student-image-grid')
  if (images.length > 0) {
    images.forEach(image => {
      if (image.childElementCount % 2) {
        image.classList.add('student-grid-large-last')
      }
    })
  }
  
  // Handle Major Orbs
  const orbs = document.querySelectorAll('.major-orbs')
  if (orbs.length > 0) {
    orbs.forEach(orb => {
      if (orb.childElementCount < 2) {
        orb.classList.add('single-orb')
      }
    })
  }
}
