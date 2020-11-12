const handleIntersect = (entries, observer) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1
    } else {
      e.target.style.opacity = 0
    }
  })
}

const newObserver = (target, t = 0.5) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: t,
  }
  const observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(target)
}

export const setupEntries = () => {
  const targets = document.querySelectorAll('.fadein')
  targets.forEach(target => {
    newObserver(target)
  })

  const quickTargets = document.querySelectorAll('.fadein-quick')
  quickTargets.forEach(quickTarget => {
    newObserver(quickTarget, 0.1)
  })
}
