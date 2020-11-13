const data = require('./majors.json')

const computed = [...data]
computed.push({ id: '0', title: 'All Graduates', color: '/imgs/orbs/all.png' })

computed.forEach(major => {
  switch (major.id) {
    case 'Wvll0Lz78WqyUWpZ6qmD':
      major.color = '/imgs/orbs/dd.png'
      break
    case 'HMc6Bn6bu79CwRPUaeI6':
      major.color = '/imgs/orbs/agd.png'
      break
    case 'nvjZfYRytFwceJz66qBf':
      major.color = '/imgs/orbs/ill.png'
      break
    case 'wv8b6Q5MsnqrMmtEmXPE':
      major.color = '/imgs/orbs/cagd.png'
      break
    default:
      break
  }
})

module.exports = computed
