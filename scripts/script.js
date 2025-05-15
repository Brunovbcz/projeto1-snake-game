let playButton = document.querySelector('#play')
let custButton = document.querySelector('#customize')
let leaveButton = document.querySelector('#leave')
let settButton = document.querySelector('#setting')
let htpButton = document.querySelector('#how-to-play')

//Exit buttons
let exitButtonSetting = document.querySelector('#exit-setting')
let exitButtonHtp = document.querySelector('#exit-htp')
let exitButtonLeave = document.querySelector('#exit-leave')
let exitButtonCustomize = document.querySelector('#exit-customize')

//Menus
let mainMenu = document.querySelector('.main-menu')
let settingMenu = document.querySelector('.setting-menu')
let howToPlayMenu = document.querySelector('.how-to-play-menu')
let leaveMenu = document.querySelector('.leave-menu')
let customizeMenu = document.querySelector('.customize-menu')
let gameMenu = document.querySelector('.game-menu')

// Event listeners for buttons

// Open setting menu
settButton.addEventListener('click', () => {
    mainMenu.style.display = 'none'
    settingMenu.style.display = 'flex'

    let settMenus = Array.from(settingMenu.querySelector('.container').children)
    settMenus.forEach((menu) => {
        menu.style.display = 'none'
    })
})

// Open how to plau menu
htpButton.addEventListener('click', () => {
    mainMenu.style.display = 'none'
    howToPlayMenu.style.display = 'flex'
})

// Open leave menu
leaveButton.addEventListener('click', () => {
    let yesButton = document.querySelector('#yes')
    let noButton = document.querySelector('#no')

    mainMenu.style.display = 'none'
    leaveMenu.style.display = 'flex'

    yesButton.addEventListener('click', () => {
        window.location.href = 'about:blank'
    })

    noButton.addEventListener('click', () => {
        mainMenu.style.display = 'flex'
        leaveMenu.style.display = 'none'
    })
})

// Open customize menu
custButton.addEventListener('click', () => {
    mainMenu.style.display = 'none'
    customizeMenu.style.display = 'flex'
    
    let custMenus = Array.from(customizeMenu.querySelector('.container').children)
    custMenus.forEach((menu) => {
        menu.style.display = 'none'
    })
})

// Open game menu

playButton.addEventListener('click', () => {
    mainMenu.style.display = 'none'
    gameMenu.style.display = 'flex'
})

// Exit buttons events

// Close setting menu
exitButtonSetting.addEventListener('click', () => {
    mainMenu.style.display = 'flex'
    settingMenu.style.display = 'none'
})

// Close how to play menu
exitButtonHtp.addEventListener('click', () => {
    mainMenu.style.display = 'flex'
    howToPlayMenu.style.display = 'none'
})

// Close leave menu
exitButtonLeave.addEventListener('click', () => {
    mainMenu.style.display = 'flex'
    leaveMenu.style.display = 'none'
})

// Close customize menu
exitButtonCustomize.addEventListener('click', () => {
    mainMenu.style.display = 'flex'
    customizeMenu.style.display = 'none'
})