const data = require('./studentDataComputed.js')

const companies = {
  curtin: {
    name: 'Curtin University',
    logo: '/imgs/curtin-logo.png',
    url: 'https://www.curtin.edu.au/',
  },
}

const students = []
data.forEach(student => {
  switch (student.id) {
    case 'MaQP23RnGTzjr2N4h57k':
    case 'NwsrMz9k5nyTwbcOPnBk':
    case 'FSgnOhWR9ugd0B2dqi0P':
    case 'ic762noIXphwxq6GEcGx':
    case 'qGu72EDEGkT9cBxLBpdh':
    case '4TToM4u7tXuHcTyyCLhH':
    case 'RQeZT0M5ZaRHNr0FQcHh':
      students.push({
        awardCompany: 'curtin',
        awardName: 'Creative Advertising Portfolio Award',
        ...student,
      })
      break
    default:
      break
  }
})

module.exports = { students, companies }
