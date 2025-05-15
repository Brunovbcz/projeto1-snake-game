let gridButton = document.querySelector('#grid')
let gameOptionsButton = document.querySelector('#game-options')
let soundButton = document.querySelector('#sound')

// Settings menu
let gridSettings = document.querySelector('.grid-settings')
let gameOptions = document.querySelector('.game-options')
let audioSettings = document.querySelector('.audio-settings')

//Global variables
let rows = 11
let columns = 14
let fruitsQuant = 1
let gamemode = 'colisions'

//elements
let nh1 = document.querySelector('.nh1')

//Consts
const events = ['click', 'keydown', 'scroll', 'touchstart'];

let menuMusic
let isPlaying = false
soundEventAdded = false

//Musics array
let musics = [
    'contents/audios/musics/day.mp3',
    'contents/audios/musics/onceUpon.mp3',
    'contents/audios/musics/startMenu.mp3'
]

let playMenuMusic = () => {
    menuMusic = new Audio(musics[0])
    menuMusic.loop = true
    menuMusic.play().catch((err) => {})

    events.forEach(e => {
        window.removeEventListener(e, playMenuMusic)
    })
}

events.forEach(e => {
    window.addEventListener(e, playMenuMusic)
})

let changeMenusSett = (men) => {
    gridSettings.style.display = 'none'
    gameOptions.style.display = 'none'
    audioSettings.style.display = 'none'

    men.style.display = 'flex'
}

//Canvas Preview
let canvasPreview = () => {
    let canvas = document.querySelector('.grid-canvas')
    let ctx = canvas.getContext('2d')
    let size = 28

    canvas.width = columns * size
    canvas.height = rows * size

    let drawLine = () => {
        ctx.lineWidth = 1
        ctx.strokeStyle = 'gray'

        for (let i = size; i < canvas.width; i += size) {
            ctx.beginPath()
            ctx.lineTo(i, 0)
            ctx.lineTo(i, canvas.height)
            ctx.stroke()
        }
        
        for(let i = size; i < canvas.height; i += size) {
            ctx.beginPath()
            ctx.lineTo(0, i)
            ctx.lineTo(canvas.width, i)
            ctx.stroke()
        }
    }
    drawLine()
}
canvasPreview()

let verifyPair = () => {
    if (!(rows * columns % 2 === 0)){
        nh1.style.marginTop = '5.8%'
        nh1.style.display = ''
        nh1.style.color = 'rgb(235, 228, 16)'
        gridSettings.style.flexDirection = 'column'
    }
    else{
        nh1.style.display = 'none'
        gridSettings.style.flexDirection = 'row'
    }
}

gridButton.addEventListener('click', () => {
    changeMenusSett(gridSettings)

    let lSlider = document.querySelector('#l-slider')
    let lSliderValue = document.querySelector('#l-slider-value')

    let rSlider = document.querySelector('#r-slider')
    let rSliderValue = document.querySelector('#r-slider-value')
    
    lSlider.addEventListener('input', () => {
        lSliderValue.textContent = lSlider.value
        columns = lSlider.value
        canvasPreview()
        verifyPair()
    })

    rSlider.addEventListener('input', () => {
        rSliderValue.textContent = rSlider.value
        rows = rSlider.value
        canvasPreview()
        verifyPair()
    })
})

gameOptionsButton.addEventListener('click', () => {
    changeMenusSett(gameOptions)

    let sSlider = document.querySelector('#s-slider')
    let sSliderValue = document.querySelector('#s-slider-value')

    sSlider.addEventListener('input', () => {
        sSliderValue.textContent = sSlider.value
        speed = sSlider.value
    })

    let fSlider = document.querySelector('#f-slider')
    let fSliderValue = document.querySelector('#f-slider-value')

    fSlider.addEventListener('input', () => {
        fSliderValue.textContent = fSlider.value
        fruitsQuant = fSlider.value
    })

    let mode = document.getElementById('mode')
    
    mode.addEventListener('change', () => {
        if (mode.value === 'non-colision'){
            gamemode = 'nonColisions'
        }else if (mode.value === 'colision'){
            gamemode = 'colisions'
        }
    })
})

soundButton.addEventListener('click', () => {
    changeMenusSett(audioSettings)

    let audioSlider = document.querySelector('#a-slider')
    let audioSliderValue = document.querySelector('#audio-slider-value')

    let musicSlider = document.querySelector('#m-slider')
    let musicSliderValue = document.querySelector('#music-slider-value')

    let mType = document.querySelector('#m-type')

    if (soundEventAdded) return
    soundEventAdded = true
    
    audioSlider.addEventListener('input', () => {
        audioSliderValue.textContent = audioSlider.value

        gameAudios.forEach(aud => {
            aud.volume = audioSlider.value * 0.01
        })
    })
    
    musicSlider.addEventListener('input', () => {
        musicSliderValue.textContent = musicSlider.value
        menuMusic.volume = musicSlider.value * 0.01
    })
    
    mType.addEventListener('change', () => {
        menuMusic.currentTime = 0
        menuMusic.pause()
        if (mType.value === 'music1'){
            menuMusic = new Audio(musics[0])
        }else if (mType.value === 'music2'){
            menuMusic = new Audio(musics[1])
        }else if (mType.value === 'music3'){
            menuMusic = new Audio(musics[2])
        }
        menuMusic.loop = true
        menuMusic.play()
        menuMusic.volume = musicSlider.value * 0.01
    })
})