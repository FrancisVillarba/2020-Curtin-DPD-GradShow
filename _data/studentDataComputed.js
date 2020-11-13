const data = require('./studentData.json')

const computed = data.map(student => {
    const temp = {...student}
    temp.headshots.pro = '/imgs/headshots/' + student.studentId + '_2.jpg'
    temp.headshots.fun = '/imgs/headshots/' + student.studentId + '_1.jpg'
    return temp
});

export default computed
