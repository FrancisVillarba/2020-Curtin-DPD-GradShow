const data = require('./majors.json')

const computed = [...data]
computed.push({ id: '0', title: 'All Graduates' })

computed.forEach(major => {
  switch (major.id) {
    case 'Wvll0Lz78WqyUWpZ6qmD':
      major.color = '/imgs/orbs/dd.png'
      break
    case 'HMc6Bn6bu79CwRPUaeI6':
      major.color = '/imgs/orbs/agd.png'
      break
    case 'K77VrZratwDXnVAaeF4c':
      major.color = '/imgs/orbs/ill.png'
      break
    case 'Q2JKhMh3LUxZjZRXpTvf':
      major.color = '/imgs/orbs/gd.png'
      break
    case 'SY1ApOdJzRd0TmSzkIz5':
      major.color = '/imgs/orbs/ca.png'
      break
    default:
      break
  }
})

module.exports = computed
