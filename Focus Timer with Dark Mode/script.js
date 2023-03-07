/* Seção dos botões do timer */

let btnPlay = document.querySelector('.play')
let btnPause = document.querySelector('.pause')
let btnStop = document.querySelector('.stop')
let btnAdd = document.querySelector('.plusMinutes')
let btn = document.querySelector('.minusMinutes')
let minutesDisplay = document.querySelector('.minutes')
let secondsDisplay = document.querySelector('.seconds')
let timerTimeOut
let minutes = Number(minutesDisplay.textContent) 
let btnIncrease = document.querySelector('.plusMinute')
let btnDecrease = document.querySelector('.minusMinute')

function resetControls() {
    btnPlay.classList.remove('hide')
    btnPause.classList.add('hide')
}

function updateTimerDisplay(minutes, seconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, '0')
    secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
    updateTimerDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
}

function restartTimer() {
    clearTimeout(timerTimeOut)
    countdown()
}

function isRunning() {
    if (btnPause.classList.contains('hide') == false) {
        restartTimer()
    }
}

function countdown() {
    timerTimeOut = setTimeout(function(){
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)

        updateTimerDisplay(minutes, 0)

        if (minutes <= 0 && seconds <= 0) {
            resetControls()
            resetTimer()
            new Audio("audios/timerEnd.mp3").play()
            return
        }

        if (seconds <= 0) {
            seconds = 60

            --minutes
        }

        updateTimerDisplay(minutes, String(seconds - 1))

        countdown()
    }, 1000)
}

btnPlay.addEventListener('click', function() {
    btnPlay.classList.add('hide')
    btnPause.classList.remove('hide')
    countdown()
})

btnPause.addEventListener('click', function() {
    resetControls()
    clearTimeout(timerTimeOut)
})

btnStop.addEventListener('click', function() {
    resetControls()
    resetTimer()    
})

btnIncrease.addEventListener('click', function () {
    if (Number(minutesDisplay.textContent) >= 55)  {
        minutesDisplay.textContent = 60
        secondsDisplay.textContent = '00'
        isRunning()
    } else {
        minutesDisplay.textContent = String(Number(minutesDisplay.textContent) + 5).padStart(2, '0')
        secondsDisplay.textContent = '00'
        isRunning()  
    }
})

/* console.log(btnPause.classList.contains('hide')); false é quando está contando || true é quando está parado*/
  
btnDecrease.addEventListener('click', function () {
if (Number(minutesDisplay.textContent) <= 6) {
    minutesDisplay.textContent = '00'
    secondsDisplay.textContent = '00'
    isRunning()
} else {
    minutesDisplay.textContent = String(Number(minutesDisplay.textContent) - 5).padStart(2, '0')
    secondsDisplay.textContent = '00'
    isRunning()
}
})

/* Seção dos botões de sons */

const btnForest = document.querySelector('.forest')
const btnRain = document.querySelector('.rain')
const btnCoffeShop = document.querySelector('.coffeShop')
const btnFireplace = document.querySelector('.fireplace')
const forestAudio = new Audio('audios/forest.wav')
const rainAudio = new Audio('audios/rain.wav')
const coffeShopAudio = new Audio('audios/coffeshop.wav')
const fireplaceAudio = new Audio('audios/fireplace.wav')

function rainOff() {
rainAudio.pause()
btnRain.classList.remove('changeSelectedColor')
document.querySelector('.volumeRain').classList.remove('changeSelectedColor')
}

function forestOff() {
forestAudio.pause()
btnForest.classList.remove('changeSelectedColor')
document.querySelector('.volumeForest').classList.remove('changeSelectedColor')
}

function coffeShopOff() {
coffeShopAudio.pause()
btnCoffeShop.classList.remove('changeSelectedColor')
document.querySelector('.volumeCoffeShop').classList.remove('changeSelectedColor')
}

function fireplaceOff() {
fireplaceAudio.pause()
btnFireplace.classList.remove('changeSelectedColor')
document.querySelector('.volumeFireplace').classList.remove('changeSelectedColor')
}

btnForest.addEventListener('click', function() {
if (!forestAudio.paused) {
    forestAudio.pause()
    btnForest.classList.remove('changeSelectedColor')
    document.querySelector('.volumeForest').classList.remove('changeSelectedColor')
    forestAudio.currentTime = 0
} else {
    btnForest.classList.add('changeSelectedColor')
    document.querySelector('.volumeForest').classList.add('changeSelectedColor')
    forestAudio.play()
    forestAudio.loop = true
    rainOff()
    coffeShopOff()
    fireplaceOff()
}
})

btnRain.addEventListener('click', function() {
if (!rainAudio.paused) {
    rainAudio.pause()
    btnRain.classList.remove('changeSelectedColor')
    document.querySelector('.volumeRain').classList.remove('changeSelectedColor')
    rainAudio.currentTime = 0
} else {
    btnRain.classList.add('changeSelectedColor')
    document.querySelector('.volumeRain').classList.add('changeSelectedColor')
    rainAudio.play()
    rainAudio.loop = true
    forestOff()
    coffeShopOff()
    fireplaceOff()
}
})

btnCoffeShop.addEventListener('click', function() {
if (!coffeShopAudio.paused) {
    coffeShopAudio.pause()
    btnCoffeShop.classList.remove('changeSelectedColor')
    document.querySelector('.volumeCoffeShop').classList.remove('changeSelectedColor')
    coffeShopAudio.currentTime = 0
} else {
    btnCoffeShop.classList.add('changeSelectedColor')
    document.querySelector('.volumeCoffeShop').classList.add('changeSelectedColor')
    coffeShopAudio.play()
    coffeShopAudio.loop = true
    forestOff()
    rainOff()
    fireplaceOff()
}
})

btnFireplace.addEventListener('click', function() {
if (!fireplaceAudio.paused) {
    fireplaceAudio.pause()
    btnFireplace.classList.remove('changeSelectedColor')
    document.querySelector('.volumeFireplace').classList.remove('changeSelectedColor')
    fireplaceAudio.currentTime = 0
} else {
    btnFireplace.classList.add('changeSelectedColor')
    document.querySelector('.volumeFireplace').classList.add('changeSelectedColor')
    fireplaceAudio.play()
    fireplaceAudio.loop = true
    forestOff()
    coffeShopOff()
    rainOff()
}
})

/* Controle dark mode */

const btnChangeBrightness = document.querySelector('#changeBrightness')

btnChangeBrightness.addEventListener('click', function() {
    document.querySelector('.brightMode').classList.toggle('hide')
    document.querySelector('.darkMode').classList.toggle('hide')
    document.body.classList.toggle('changeBrightness')
})

/* Controle de volume */

const volumeForest = document.querySelector('.volumeForest')
const volumeRain = document.querySelector('.volumeRain')
const volumeCoffeShop = document.querySelector('.volumeCoffeShop')
const volumeFireplace = document.querySelector('.volumeFireplace')

volumeForest.addEventListener('input', function(e) {
    forestAudio.volume = e.currentTarget.value / 100
})

volumeRain.addEventListener('input', function(e) {
    rainAudio.volume = e.currentTarget.value / 100
})

volumeCoffeShop.addEventListener('input', function(e) {
    coffeShopAudio.volume = e.currentTarget.value / 100
})

volumeFireplace.addEventListener('input', function(e) {
    fireplaceAudio.volume = e.currentTarget.value / 100
})
