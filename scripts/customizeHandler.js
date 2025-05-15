//Menus
let fruitMenu = document.querySelector('.fruits-menu')
let eyesMenu = document.querySelector('.eyes-menu')
let colorsMenu = document.querySelector('.colors-menu')
let themeMenu = document.querySelector('.theme-menu')

//Buttons
let fruitsButton = document.querySelector('#fruits-button')
let eyesButton = document.querySelector('#eyes-button')
let colorsButton = document.querySelector('#colors-button')
let themeButton = document.querySelector('#theme-button')
let randomButton = document.querySelector('#random-button')

//Intial variables
let color = 'rgb(60, 100, 180)'
document.documentElement.classList.add('classicPalet')

//Arrays
let fruits = [
    'contents/images/fruits/apple.png',
    'contents/images/fruits/banana.png',
    'contents/images/fruits/grape.png',
    'contents/images/fruits/kiwi.png',
    'contents/images/fruits/melon.png',
    'contents/images/fruits/orange.png',
    'contents/images/fruits/pear.png',
    'contents/images/fruits/pineapple.png',
    'contents/images/fruits/strawberry.png',
    'contents/images/fruits/watermelon.png'
]

let eyes = [
    'contents/images/snake/eyes/var1.png',
    'contents/images/snake/eyes/var2.png',
    'contents/images/snake/eyes/var3.png',
    'contents/images/snake/eyes/var4.png',
    'contents/images/snake/eyes/var5.png',
    'contents/images/snake/eyes/var6.png',
    'contents/images/snake/eyes/var7.png',
    'contents/images/snake/eyes/var8.png'
]

let colors = [
    'rgb(60, 100, 180)',
    'rgb(190, 30, 45)',
    'rgb(60, 120, 60)',
    'rgb(240, 220, 100)',
    'rgb(230, 120, 40)',
    'rgb(100, 70, 130)',
    'rgb(20, 20, 20)',
    'rgb(245, 245, 245)',
    'rgb(110, 110, 110)',
    'rgb(230, 150, 170)'
]

let themes = [
    'contents/images/mainMenu/backgrounds/background1.png',
    'contents/images/mainMenu/backgrounds/background2.png',
    'contents/images/mainMenu/backgrounds/background3.png',
    'contents/images/mainMenu/backgrounds/background4.png',
    'contents/images/mainMenu/backgrounds/background5.png',
    'contents/images/mainMenu/backgrounds/background6.png'
]

let themesNames = [
    'Clássico',
    'Espaço',
    'Arco-Íris',
    'Mágico',
    'Natal',
    'Futuro'
]

let themesClasses = [
    'classicPalet',
    'cosmicPalet',
    'rainbowPalet',
    'magicPalet',
    'christmasPalet',
    'futurePalet'
]

//Counters
let fruitCounter = 0
let eyesCounter = 0
let colorsCounter = 0
let themeCounter = 0

//Boleans
let fruitEvent = false
let eyesEvent = false
let colorsEvent = false
let themeEvent = false
let randomDb = false

//Fruits vars
let fruitMenuImage = document.querySelector('.fruit-menu-img')

//Eyes vars
let eyeMenuImage = document.querySelector('.eye-menu-img')

//Themes vars
let bodyElement = document.querySelector('body')
let themeNameElement = themeMenu.querySelector('span')

//Debounce function for aplly delays
function debounce(fn, delay){
    let isWaiting = false
    return function (...args) {
        if (isWaiting) return
        fn.apply(this, args)
        isWaiting = true

        setTimeout(() => {
            isWaiting = false
        }, delay)
    }
}


//Change customize menus
let changeMenus = (menu) => {
    fruitMenu.style.display = 'none'
    eyesMenu.style.display = 'none'
    colorsMenu.style.display = 'none'
    themeMenu.style.display = 'none'

    menu.style.display = 'flex'
}


//Draw the preview snake (from the colors menu)
let drawCustomizeSnake = () =>{
    let canvas = document.querySelector('.snake-canvas')
    let ctx = canvas.getContext('2d')

    canvas.height = 100
    canvas.width = 400

    ctx.fillStyle = color   
    
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(eyeImage, 300, 0, 95, 95)
}

fruitsButton.addEventListener('click', () => {
    changeMenus(fruitMenu)

    let left = fruitMenu.querySelector('#l-fruits')
    let right = fruitMenu.querySelector('#r-fruits')

    if (!fruitEvent){
        fruitEvent = true

        right.addEventListener('click', () => {
            fruitCounter ++
            if (fruitCounter > fruits.length - 1){
                fruitCounter = 0
            }
            
            fruitImage.src = fruits[fruitCounter]
            fruitMenuImage.src = fruits[fruitCounter]
            fruitImg .src = fruits[fruitCounter]
        })   

        left.addEventListener('click', () => {
            fruitCounter --
            
            if (fruitCounter < 0){
                fruitCounter = fruits.length - 1
            }
            fruitImage.src = fruits[fruitCounter]
            fruitMenuImage.src = fruits[fruitCounter]
            fruitImg.src = fruits[fruitCounter]
        })
    }
})

eyesButton.addEventListener('click', () => {
    changeMenus(eyesMenu)

    let left = eyesMenu.querySelector('#l-eyes')
    let right = eyesMenu.querySelector('#r-eyes')

    if (!eyesEvent){
        eyesEvent = true

        right.addEventListener('click', () => {
            eyesCounter ++
            if (eyesCounter > eyes.length - 1){
                eyesCounter = 0
            }

            eyeImage.src = eyes[eyesCounter]
            eyeMenuImage.src = eyes[eyesCounter]
        })

        left.addEventListener('click', () => {
            eyesCounter --
            if (eyesCounter < 0){
                eyesCounter = eyes.length - 1
            }

            eyeImage.src = eyes[eyesCounter]
            eyeMenuImage.src = eyes[eyesCounter]
        })   
    }
    
})

colorsButton.addEventListener('click', () => {
    changeMenus(colorsMenu)
    drawCustomizeSnake()

    let left = colorsMenu.querySelector('#l-colors')
    let right = colorsMenu.querySelector('#r-colors')

    let canvas = document.querySelector('.snake-canvas')
    let ctx = canvas.getContext('2d')
    
    if (!colorsEvent){
        colorsEvent = true

        right.addEventListener('click', () => {
            colorsCounter ++
            if (colorsCounter > colors.length - 1){
                colorsCounter = 0
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            color = colors[colorsCounter]
            drawCustomizeSnake()
        })

        left.addEventListener('click', () => {
            colorsCounter --
            if (colorsCounter < 0){
                colorsCounter = colors.length - 1
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            color = colors[colorsCounter]
            drawCustomizeSnake(colors[colorsCounter])
        })   
    }
})

themeButton.addEventListener('click', () => {
    changeMenus(themeMenu)

    let left = document.querySelector('#l-themes')
    let right = document.querySelector('#r-themes')

    let onRight = () => {
        themeCounter ++
        if (themeCounter > themes.length - 1){
            themeCounter = 0
        }

        bodyElement.style.backgroundImage = `url(${themes[themeCounter]})`
        themeNameElement.textContent = themesNames[themeCounter]
        document.documentElement.classList.remove(...themesClasses)
        document.documentElement.classList.add(themesClasses[themeCounter])
    }

    let onLeft = () => {
        themeCounter --
        if (themeCounter < 0){
            themeCounter = themes.length - 1
        }

        bodyElement.style.backgroundImage = `url(${themes[themeCounter]})`
        themeNameElement.textContent = themesNames[themeCounter]
        document.documentElement.classList.remove(...themesClasses)
        document.documentElement.classList.add(themesClasses[themeCounter])
    }

    if (!themeEvent){
        themeEvent = true
        right.addEventListener('click', debounce(onRight, 500))
        left.addEventListener('click', debounce(onLeft, 500))   
    } 
})

randomButton.addEventListener('click', () => {
    let randomizeItems = () => {
        let randomNumber = (max) => {
            return Math.round(Math.random() * max)
        }

        //Fruits comands
        fruitCounter = randomNumber(fruits.length - 1)
        fruitImage.src = fruits[fruitCounter]
        fruitMenuImage.src = fruits[fruitCounter]
        fruitImg .src = fruits[fruitCounter]

        //Colors comands
        colorsCounter = randomNumber(colors.length - 1)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        color = colors[colorsCounter]
        drawCustomizeSnake(colors[colorsCounter])

        //Eyes comands
        eyesCounter = randomNumber(eyes.length - 1)
        eyeImage.src = eyes[eyesCounter]
        eyeMenuImage.src = eyes[eyesCounter]

        //Themes comands
        themeCounter = randomNumber(themes.length - 1)
        bodyElement.style.backgroundImage = `url(${themes[themeCounter]})`
        themeNameElement.textContent = themesNames[themeCounter]
        document.documentElement.classList.remove(...themesClasses)
        document.documentElement.classList.add(themesClasses[themeCounter])  
    }
    if (!randomDb){
        randomDb = true
        randomizeItems()  
        setTimeout(() => {
            randomDb = false
        }, 500)
    }
})