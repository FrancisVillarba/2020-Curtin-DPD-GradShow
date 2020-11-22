const data = require('./studentData.json')

const computed = data.map(student => {
  switch (student.id) {
    case 'MaQP23RnGTzjr2N4h57k':
    case 'NwsrMz9k5nyTwbcOPnBk':
    case 'FSgnOhWR9ugd0B2dqi0P':
    case 'ic762noIXphwxq6GEcGx':
    case 'qGu72EDEGkT9cBxLBpdh':
    case '4TToM4u7tXuHcTyyCLhH':
    case 'RQeZT0M5ZaRHNr0FQcHh':
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

  if (student.id === 'h3OIhihYeV3BH4lGbKj8') {
    student.bio = student.bio.replace('I am a highly dedicated an passionate branding geek', 'I am a highly dedicated and passionate branding geek')
  }
  if (student.id === 'D2hXmjpzdjIqGHZIec4Q') {
    student.bio = student.bio.replace('w3schools.com', 'codepen')
  }
  if (student.id === 'GmqbcZWKHTWtNxypDGqA') {
    student.portfolio = 'https://thatsminht.com'
  }
  if (student.id === 'xtpndBzYODDxBEHW9yV1') {
    student.bio = student.bio.replace('I am freelance', 'I am a freelance')
  }
  if (student.id === '2C2u6dIpSXhSvXIdANaa') {
    student.name.preferred = 'Marcelo'
    student.name.first = 'Marcelo Jopia'
    student.name.last = 'Vilches'
  }
  if (student.id === 'MaQP23RnGTzjr2N4h57k') {
    student.name.preferred = 'Brayden'
  }
  if (student.id === '7bouzycpeETium5sT5fN') {
    student.name.preferred = 'Garreth'
  }
  if (student.id === '4TToM4u7tXuHcTyyCLhH') {
    student.portfolio = 'https://aquagraphics.co'
    student.social = [
      {
        name: 'Behance',
        link: 'https://www.behance.net/oakiediggins/appreciated',
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/aquagraphics.co/',
      },
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/oakie-diggins/',
      }
    ]
    student.projects = []
    for (let i = 1; i < 7; i++) {
      student.projects.push({
        "src": `/imgs/projects/${student.name.first}_${student.name.last}_${student.studentId}_${i}.jpg`,
        "alt": `${student.name.first} ${student.name.last}'s Project ${i}`
      })      
    }
  }

  if (student.id === 'sYlGZHSLgdkLEYjZ2BuN') {
    student.headshots.pro = student.headshots.pro.replace('19140102', '19146168')
    student.headshots.fun = student.headshots.fun.replace('19140102', '19146168')
  }
  if (student.id === 'iBnQDcFeTp3oxx2Herzv') {
    student.headshots.pro = student.headshots.pro.replace('19146168', '19140102')
    student.headshots.fun = student.headshots.fun.replace('19146168', '19140102')
  }

  if (student.id === 'vFmshvNEbAER84eZ5nJu') {
    student.projects = student.projects.map(project => {
      project.src = project.src.replace('Anjie', 'Anjela')
      return project
    })
  }
  // if (student.id === 'JbCgTRQvqbDFI0oIi53C') {
  //   const i = student.majors.indexOf(student.majors.find(major => major.id === 'wv8b6Q5MsnqrMmtEmXPE'))
  //   if (i >= 0) {
  //     student.majors.splice(i, 1)
  //   }
  // }
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
