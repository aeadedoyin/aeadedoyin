const dot = document.querySelector('.dot')
const dotOuter = document.querySelector('.dot-outer')
const links = document.querySelectorAll('a')
const audio = document.querySelector('.audio')
audio.muted = true

const toggleHover = (shouldEffect = false, isClick = false) => {
  dot.classList.remove('dot-hover')
  dotOuter.classList.remove('dot-outer-hover')
  dotOuter.classList.remove('dot-outer-click')
  if (shouldEffect) {
    audio.play()
    dot.classList.add('dot-hover')
    dotOuter.classList.add('dot-outer-hover')
  }
  if (isClick) {
    audio.play()
    dotOuter.classList.add('dot-outer-click')
  }
}

document.addEventListener('mousedown', function () {
  toggleHover(true, true)
})

document.addEventListener('dblclick', function () {
  audio.muted = !audio.muted
})

document.addEventListener('mouseup', function () {
  toggleHover(false, false)
})

links.forEach((item) => {
  item.addEventListener('mouseover', () => {
    toggleHover(true, false)
  })
  item.addEventListener('mouseleave', () => {
    toggleHover(false, false)
  })
})

document.addEventListener('mousemove', function (e) {
  const newPosition = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
  dot.style.transform = newPosition
  dotOuter.style.transform = newPosition
})
