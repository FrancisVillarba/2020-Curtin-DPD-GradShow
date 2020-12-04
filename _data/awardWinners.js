const data = require('./studentDataComputed.js')

const students = {
  agd: [],
  cagd: [],
  dd: [],
  ill: [],
}

data.forEach(student => {
  switch (student.id) {
    // AGD
    case 'tyzZq0XLTm7VYxCKhIBX':
      students.agd.push({
        awardCompany: 'curtin',
        awardName:
          'Animation & Game Design Head of School Academic Excellence Award',
        ...student,
      })
      students.agd.push({
        awardCompany: 'marketforce',
        awardName: 'Animation & Game Design MarketForce Group Internship Award',
        ...student,
      })
      break
    case 'Jq6EuLU6FtWBLYCvQKWp':
      students.agd.push({
        awardCompany: 'boogie-monster',
        awardName: 'Animation & Game Design Boogie Monster Internship Award',
        ...student,
      })
      break

    // CAGD
    case 'prmpiLX3Wb2cC4lfoJgc':
      students.cagd.push({
        awardCompany: 'curtin',
        awardName:
          'Creative Advertising & Graphic Design Head of School Academic Excellence Award',
        ...student,
      })
      break
    case 'prmpiLX3Wb2cC4lfoJgc':
      students.cagd.push({
        awardCompany: 'curtin',
        awardName:
          'Creative Advertising & Graphic Design Head of School Academic Excellence Award',
        ...student,
      })
      break
    case 'HqkwueL8VOG8a88C0lRe':
      students.cagd.push({
        awardCompany: 'block',
        awardName: 'Graphic Design Block Branding Internship Award',
        ...student,
      })
      students.cagd.push({
        awardCompany: 'media-on-mars',
        awardName: 'Graphic Design Media on Mars Internship Award',
        ...student,
      })
      students.cagd.push({
        awardCompany: 'rare',
        awardName: 'Creative Advertising Rare Internship Award',
        name: {
          first: 'Devon',
          last: 'Jackson',
        },
        headshots: {
          pro: '/imgs/placeholderPro.jpg',
          fun: '/imgs/placeholderFun.jpg',
        },
        thumb: {
          pro: '/imgs/placeholderProThumb.jpg',
          fun: '/imgs/placeholderFunThumb.jpg',
        },
      })
      break
    case 'Cz28yyKMRy1pc9ggKIqd':
      students.cagd.push({
        awardCompany: 'gatecrasher',
        awardName: 'Creative Advertising Gatecrasher Internship Award',
        ...student,
      })
      // students.cagd.push({
      //   awardCompany: 'brand-agency',
      //   awardName: 'Graphic Design Brand Agency Internship Award',
      //   name: {
      //     first: 'Under',
      //     last: 'Consideration',
      //   },
      // })
      // students.cagd.push({
      //   awardCompany: 'wunderman-thompson',
      //   awardName: 'Graphic Design Wunderman Thompson Internship Award',
      //   name: {
      //     first: 'Under',
      //     last: 'Consideration',
      //   },
      // })
      // students.cagd.push({
      //   awardCompany: 'juicebox',
      //   awardName: 'Graphic Design Juicebox Internship Award',
      //   name: {
      //     first: 'Under',
      //     last: 'Consideration',
      //   },
      // })
      break

    // DD
    case 'hEYoEHuzZoIhA3jcEASN':
      students.dd.push({
        awardCompany: 'curtin',
        awardName: 'Digital Design Head of School Academic Excellence Award',
        ...student,
      })
      students.dd.push({
        awardCompany: 'equilibrium',
        awardName: 'Digital Design Equilibrium Internship Award',
        ...student,
      })
      break
    case 'PEvCLHsuxQciz79O74ET':
      students.dd.push({
        awardCompany: 'humaan',
        awardName: 'Digital Design Humaan Internship Award',
        ...student,
      })
      break
    case 'PEvCLHsuxQciz79O74ET':
      students.dd.push({
        awardCompany: 'equilibrium',
        awardName: 'Digital Design Equilibrium Internship Award',
        ...student,
      })
      // students.dd.push({
      //   awardCompany: 'word-of-mouth',
      //   awardName:
      //     'Graphic Design & Digital Design Word of Mouth Internship Award',
      //   name: {
      //     first: 'Under',
      //     last: 'Consideration',
      //   },
      // })
      break

    // ILL
    case 'FaL9Eq2f0hSHdkmfsEhc':
      students.ill.push({
        awardCompany: 'curtin',
        awardName: 'Illustration Head of School Academic Excellence Award',
        ...student,
      })
      students.ill.push({
        awardCompany: 'curtin',
        awardName: 'Illustration Best in Show Award',
        ...student,
      })
      break

    default:
      break
  }
})

const companies = {
  curtin: {
    name: 'Curtin University',
    logo: '/imgs/companies/curtin-logo.png',
    url: 'https://www.curtin.edu.au/',
  },
  marketforce: {
    name: 'Marketforce Group',
    logo: '/imgs/companies/marketforce-logo.png',
    url: 'https://www.marketforce.com.au/',
  },
  'boogie-monster': {
    name: 'Boogie Monster',
    logo: '/imgs/companies/boogie-monster-logo.png',
    url: 'https://boogiemonster.com.au/',
  },
  block: {
    name: 'block',
    logo: '/imgs/companies/block-logo.png',
    url: 'https://www.blockbranding.com/',
  },
  'media-on-mars': {
    name: 'Media on Mars',
    logo: '/imgs/companies/media-on-mars-logo.png',
    url: 'https://www.mediaonmars.com.au/',
  },
  rare: {
    name: 'Rare',
    logo: '/imgs/companies/rare-logo.png',
    url: 'https://hellorare.com/',
  },
  gatecrasher: {
    name: 'Gatecrasher',
    logo: '/imgs/companies/gatecrasher-logo.png',
    url: 'https://www.gatecrasher.com.au/',
  },
  'brand-agency': {
    name: 'The Brand Agency',
    logo: '/imgs/companies/brand-agency-logo.png',
    url: 'https://www.brandagency.com.au/',
  },
  'wunderman-thompson': {
    name: 'wunderman-thompson',
    logo: '/imgs/companies/wunderman-thompson-logo.png',
    url: 'https://www.wundermanthompson.com/',
  },
  juicebox: {
    name: 'Juicebox',
    logo: '/imgs/companies/juicebox-logo.png',
    url: 'https://www.juicebox.com.au/',
  },
  humaan: {
    name: 'Humaan',
    logo: '/imgs/companies/humaan-logo.png',
    url: 'https://humaan.com/',
  },
  equilibrium: {
    name: 'equilibrium',
    logo: '/imgs/companies/equilibrium-logo.png',
    url: 'https://equ.com.au/',
  },
  'word-of-mouth': {
    name: 'word-of-mouth',
    logo: '/imgs/companies/word-of-mouth-logo.png',
    url: 'https://www.wordofmouthagency.com.au/',
  },
}

module.exports = { students, companies }
