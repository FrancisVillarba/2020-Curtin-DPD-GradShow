const data = require('./studentData.json')

const computed = data.map(student => {
    const temp = {...student}
    const sub = 'https://storage.googleapis.com/curtin-dpd-gradshow-2020.appspot.com/headshots/'
    temp.headshots.pro = '/imgs/headshots/' + temp.headshots.pro.substring(sub.length)
    temp.headshots.fun = '/imgs/headshots/' + temp.headshots.fun.substring(sub.length)
    
    return temp
});

module.exports = computed
