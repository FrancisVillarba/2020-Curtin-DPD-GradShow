export const handleStudentImageGrid = () => {
  const images = document.querySelectorAll('.student-image-grid')
  if (images.length > 0) {
    images.forEach(image => {
      if (image.childElementCount % 2) {
        image.classList.add('student-grid-large-last')
      }
    })
  }
}
