const dot = document.querySelector('.dot')
const dotOuter = document.querySelector('.dot-outer')
const links = document.querySelectorAll('a, button')
const avatar = document.querySelector('.center img')

let muted = true
let audioCtx
let idleTimer

const playTone = (freq) => {
  if (muted) return
  audioCtx = audioCtx || new AudioContext()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  const now = audioCtx.currentTime
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, now)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.18)
  gain.gain.setValueAtTime(0.06, now)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
  osc.connect(gain).connect(audioCtx.destination)
  osc.start(now)
  osc.stop(now + 0.2)
}

const toggleHover = (shouldEffect = false, isClick = false) => {
  dot.classList.remove('dot-hover')
  dotOuter.classList.remove('dot-outer-hover')
  dotOuter.classList.remove('dot-outer-click')
  if (shouldEffect) {
    playTone(isClick ? 520 : 780)
    dot.classList.add('dot-hover')
    dotOuter.classList.add('dot-outer-hover')
  }
  if (isClick) {
    dotOuter.classList.add('dot-outer-click')
  }
}

document.addEventListener('mousedown', function () {
  toggleHover(true, true)
})

document.addEventListener('dblclick', function () {
  muted = !muted
  if (!muted) playTone(660)
})

document.addEventListener('mouseup', function () {
  toggleHover(false, false)
})

document.addEventListener('click', function (e) {
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.left = `${e.clientX}px`
  ripple.style.top = `${e.clientY}px`
  document.body.appendChild(ripple)
  ripple.addEventListener('animationend', () => ripple.remove())
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
  const driftX = (e.clientX / window.innerWidth - 0.5) * 10
  const driftY = (e.clientY / window.innerHeight - 0.5) * 10
  avatar.style.transform = `translate(${driftX}px, ${driftY}px)`
  document.body.classList.remove('cursor-idle')
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    document.body.classList.add('cursor-idle')
    avatar.style.transform = ''
  }, 2000)
})
