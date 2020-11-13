const data = require('./majorsComputed.js')

const rawData = [...data]
const majorImages = {}
rawData.forEach(major => {
  if (major.color) {
    majorImages[major.id] = major.color
  }
})

module.exports = majorImages
