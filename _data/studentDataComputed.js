const data = require('./studentData.json')

const computed = data.map(student => {
  switch (student.id) {
    case 'MaQP23RnGTzjr2N4h57k':
    case 'NwsrMz9k5nyTwbcOPnBk':
    case 'FSgnOhWR9ugd0B2dqi0P':
    case 'ic762noIXphwxq6GEcGx':
    case 'qGu72EDEGkT9cBxLBpdh':
    case '4TToM4u7tXuHcTyyCLhH':
    case '8sP6QljOT0ffNVdRxq77':
    case 'RQeZT0M5ZaRHNr0FQcHh':
    case 'RfyPNvoK86OJ1ydRi7I0':
      student.headshots.pro = '/imgs/placeholderPro.jpg'
      student.headshots.fun = '/imgs/placeholderFun.jpg'
      student.thumb = {
        pro: '/imgs/placeholderProThumb.jpg',
        fun: '/imgs/placeholderFunThumb.jpg',
      }
      break
    default:
      break
  }

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
  if (student.id === '3lQ3trqqLxDi3ycwSk0R') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('David ', 'David')
      return project
    })
  }
  if (student.id === 'bsbBDe5AbdgQUsemWUJo') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('David ', 'David')
      return project
    })
  }
  if (student.id === 'HOANYbz6YhqN8stCAruS') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace(
        'Dwayne Alexander_Koo Chim Fong',
        'Dwayne_Koo'
      )
      return project
    })
  }
  if (student.id === 'XxgCeZdYw9yW0omfPqq7') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Genesis Ann', 'GenesisAnn')
      return project
    })
  }
  if (student.id === 'K4qmqNLnKYzuzmkoXyyr') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Julian ', 'Julian')
      return project
    })
  }
  if (student.id === 'tyzZq0XLTm7VYxCKhIBX') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('14851357', '1481357')
      return project
    })
  }

  if (student.id === 'Cz28yyKMRy1pc9ggKIqd') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Macushla ', 'Macushla')
      return project
    })
  }
  if (student.id === 'fay8ncSX2p18IsSxS6RS') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Michael', 'Storman')
      return project
    })
  }
  if (student.id === '8sP6QljOT0ffNVdRxq77') {
    student.projects = []
  }
  if (student.id === 'RPoC1mzf3mFCiZFnzpSF') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Quen Yi', 'QuenYi')
      return project
    })
  }
  if (student.id === 'yhwvrN7k4R8As2tJUIHf') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Rania ', 'Rania')
      project.src = project.src.replace('Roz ', 'Roz')
      return project
    })
  }
  if (student.id === 'dotCeUcsU4n0ukjcRFXX') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Thomas', 'Tom')
      return project
    })
  }
  if (student.id === 'KDgA7kSc4KKd59Yku64m') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('YongAi', 'Yong')
      return project
    })
  }

  return student
})

module.exports = computed
