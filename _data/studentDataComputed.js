const data = require('./studentData.json')

const computed = data.map(student => {
  if (student.id === 'vFmshvNEbAER84eZ5nJu') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Anjie', 'Anjela')
      return project
    })
  }
  if (student.id === 'MQueaRWHQaAcKqu6wxJg') {
    student.projects = student.projects.map((project, i) => {
      if (i < 4) {
        return project
      }
    })
  }
  if (student.id === 'dzs1Xtf75DKmqyAizb60') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Charles_Giltrow', 'Giltrow_Charles')
      return project
    })
  }
  return student
})

module.exports = computed
