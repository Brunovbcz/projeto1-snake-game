//Constants
const size = 30
const colorGradient = 1
let gameAudios = [
    eatingAudio = new Audio('contents/audios/eating.mp3'),
    colisionAudio = new Audio('contents/audios/colision.mp3'),
    turnRight = new Audio('contents/audios/right.mp3'),
    turnUp = new Audio('contents/audios/up.mp3'),
    turnLeft = new Audio('contents/audios/left.mp3'),
    turnDown = new Audio('contents/audios/down.mp3')
]

//Canvas settings
let canvas = document.querySelector('.game-canvas');
let ctx = canvas.getContext('2d');

canvas.width = columns * size
canvas.height = rows * size

//Menus
let gameOverMenu = document.querySelector('.game-over-menu')
let fruitImg = document.querySelector('.fruit-img')

//Buttons
const restartButton = document.querySelector('#restart')
const menuButton = document.querySelector('#menu')
const exitGameMenuButton = document.querySelector('#exit-game-menu')

//Global variables
let speed = 15
let fruitsNumber = 1
let eaten = 0
let record = 0
let strokeColor = 'gray'

//Canvas Margins
let middleX = canvas.width / 2
let xMargin = Math.floor((canvas.width / size) / 4) * size
let middleY

if ((canvas.height / size) % 2 === 0) { middleY = canvas.height / 2 }
else { middleY = (canvas.height / 2) - size / 2 }

//Unitialized variables
let direction
let currentDirection
let oldDirection
let loop


//Bools
let db = false
let shouldGrow = false
let losed = false

//Images
const eyeImage = new Image()
eyeImage.src = 'contents/images/snake/eyes/var1.png' // The snake's eye

const fruitImage = new Image()
fruitImage.src = 'contents/images/fruits/apple.png' // The fruit that the snake will eat
fruitImg.src = fruitImage.src       // The fruit that will be shown in the menu

//Generate a random number bettwen 0 and canvas width multiple of size
let randomXPos = () => {
    let maxMultipleX = Math.floor(canvas.width / size)
    let randomMultipleX = Math.floor(Math.random() * (maxMultiple + 1));
    let result = (randomMultipleX * size) - size
    if (result < 0){ result = 0 }
    return result
}

//Generate a random number bettwen 0 and canvas height multiple of size
let randomYPos = () => {
    let maxMultipleY = Math.floor(canvas.height / size)
    let randomMultipleY = Math.floor(Math.random() * (maxMultiple + 1));
    let result = (randomMultipleY * size) - size
    if (result < 0){ result = 0 }
    return result
}

//The initial snake array
let snake = [
    {x: xMargin, y: middleY},
    {x: xMargin + (size), y: middleY},
    {x: xMargin + (size * 2), y: middleY},
    {x: xMargin + (size * 3), y: middleY},
]

//The intial fruit
let fruitsArray = [
    {x: canvas.width - xMargin, y: middleY},
]

//Function to update the snake array, fruit object, canvas size, randomPos functions and some variables
//Called when playButton as pressed or reset and main button as pressed
function updateLayoutVars() {
    canvas.width = columns * size
    canvas.height = rows * size

    middleX = canvas.width / 2
    xMargin = Math.floor((canvas.width / size) / 4) * size

    if ((canvas.height / size) % 2 === 0) {
        middleY = canvas.height / 2
    } else {
        middleY = (canvas.height / 2) - size / 2
    }

    losed = false

    randomXPos = () => {
        let maxMultipleX = Math.floor(canvas.width / size)
        let randomMultipleX = Math.floor(Math.random() * (maxMultipleX + 1));
        let result = (randomMultipleX * size) - size
        if (result < 0){ result = 0 }
        return result
    }
    
    randomYPos = () => {
        let maxMultipleY = Math.floor(canvas.height / size)
        let randomMultipleY = Math.floor(Math.random() * (maxMultipleY + 1));
        let result = (randomMultipleY * size) - size
        if (result < 0){ result = 0 }
        return result
    }

    snake = [
        {x: xMargin, y: middleY},
        {x: xMargin + (size), y: middleY},
        {x: xMargin + (size * 2), y: middleY},
        {x: xMargin + (size * 3), y: middleY},
    ]

    fruitsArray = [
        {x: canvas.width - xMargin, y: middleY},
    ]

    for (i = 30; i < fruitsQuant * size; i+=size){
        if (i === 30){
            fruitsArray.push({x: canvas.width - xMargin, y: middleY + i})
        }else if (i === 60){
            fruitsArray.push({x: canvas.width - xMargin, y: middleY - (i - size)})
        }else if (i === 90){
            fruitsArray.push({x: canvas.width - xMargin, y: middleY + (i - size)})
        }else if (i === 120){
            fruitsArray.push({x: canvas.width - xMargin, y: middleY - (i - (size * 2))})
        }
    }
}

//Function to change the value of direction for the snake movment
let changeDirection = (e) => {
    if (db) return

        if ((e.key === 'w' || e.key === 'ArrowUp') && direction !== 'down') {
            direction = 'up'
            db = true
        }
        else if ((e.key === 's' || e.key === 'ArrowDown') && direction !== 'up') {
            direction = 'down'
            db = true
        }
        else if ((e.key === 'a' || e.key === 'ArrowLeft') && direction !== 'right' && direction) {
            direction = 'left'
            db = true
        }
        else if ((e.key === 'd' || e.key === 'ArrowRight') && direction !== 'left') {
            direction = 'right'
            db = true
        }
}

//Function restart to reset the played game
let restart = () => {
    eaten = 0
    losed = false
    document.querySelector('.background-game').querySelector('.fruit-counter').innerText = eaten
    gameOverMenu.style.display = 'none'
    canvas.style.filter = 'none'
    direction = undefined
    updateLayoutVars()
}

let resetOnSpace = (e) => {
    if (e.key == ' '){
        restart()
        document.addEventListener('keydown', changeDirection)
        document.removeEventListener('keydown', resetOnSpace)
    }
}

//Play button event listener to start the game
playButton.addEventListener('click', () => {
    document.addEventListener('keydown', changeDirection)
    updateLayoutVars()
})

//Function to draw an rotated canvas image
function drawRotatedImage(img, x, y, size, angleDeg) {
    const angleRad = angleDeg * Math.PI / 180;

    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(angleRad);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
}

//Function to draw the snake conform the sanke array values
let drawSnake = () => {
    let mainColor = color
    let [r, g, b] = color.match(/\d+/g).map(Number)
    let posX, posY

    for (let i = snake.length - 1; i >= 0 ; i--) {
        let pos = snake[i]
        ctx.fillStyle = color
        
        if (i === snake.length - 1) {
            posX = pos.x
            posY = pos.y
        }
        else {
            ctx.fillRect(pos.x, pos.y, size, size)
        }

        if (r > 50 || g > 50 || b > 50){
            r -= colorGradient
            g -= colorGradient
            b -= colorGradient
        }

        color = `rgb(${r}, ${g}, ${b})`
    }

    color = mainColor
    ctx.fillStyle = color

    ctx.fillRect(posX, posY, size, size)

    if (currentDirection === 'right' || !currentDirection){
        drawRotatedImage(eyeImage, posX, posY, size, 90)
    }else if (currentDirection === 'left'){
        drawRotatedImage(eyeImage, posX, posY, size, -90)
    }else if (currentDirection === 'up'){
        ctx.drawImage(eyeImage, posX, posY, size, size)
    }else if (currentDirection === 'down'){
        drawRotatedImage(eyeImage, posX, posY, size, -180)
    }
}

//Function to draw the fruit
let drawFruit = () => {
    fruitsArray.forEach((fruit, i) => {
        ctx.shadowColor = 'white'
        ctx.shadowBlur = 10
        ctx.drawImage(fruitImage, fruit.x, fruit.y, size, size)
        ctx.shadowBlur = 0
    })
    
}

//Function to check if the snake's head is in the same position that the fruit
let checkEat = () => {
    if (eaten + 4 < rows * columns){
        const head = snake[snake.length - 1]
        
        fruitsArray.forEach((fruit, i) => {
            if (fruit && head.x === fruit.x && head.y === fruit.y) {      
                shouldGrow = true;

                eatingAudio.play()
                
                eaten++
                let x = randomXPos()
                let y = randomYPos()

                if (eaten + 3 + fruitsArray.length === rows * columns){
                    fruitsArray.splice(i, 1)
                }

                while (snake.find(pos => pos.x === x && pos.y === y) ||
                fruitsArray.some((f, idx) => idx !== i && f.x === x && f.y === y)){
                    x = randomXPos()
                    y = randomYPos()
                }

                fruit.x = x
                fruit.y = y
                
                document.querySelector('.background-game').querySelector('.fruit-counter').innerText = eaten

                if (eaten >= record){
                    record = eaten
                    document.querySelector('.background-game').querySelector('.trophy-counter').innerText = record
                }
            }
        })
    }
}

//Function to call the game over menu and finish/restart the game
let gameOver = (str) => {
    direction = undefined
    currentDirection = undefined
    document.removeEventListener('keydown', changeDirection)
    document.addEventListener('keydown', resetOnSpace)
    gameOverMenu.style.display = 'flex'
    gameOverMenu.querySelector('.background').querySelector('h1').textContent = str
    gameOverMenu.querySelector('h2').innerText = `frutas comidas: ${eaten}`
    canvas.style.filter = 'blur(5px)'
}

//Function to check if the player reset the game
let checkRestart = () => {
    if (snake.length === (rows * columns)){
        gameOver('Parabéns, você zerou o jogo! 👏👏👏')
    }
}

//Function to check if the head's position is the same that another part of the snake's body or is outside the canvas (call's game over)
let checkCollision = () => {
    if (gamemode === 'colisions'){
        let head = snake[snake.length - 1]
        let neck = snake.length - 2

        const wallColision = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height
        const selfColision = snake.find((pos, i) => {
            return i < neck && pos.x === head.x && pos.y === head.y
        })
        
        if (wallColision || selfColision) {
            if(!losed){
                losed = true
                colisionAudio.play()
                gameOver('Você Perdeu! 🤦‍♂️🤷‍♂️')   
            }  
        }   
    }
    else if(gamemode === 'nonColisions'){
        let head = snake[snake.length - 1]
        
        if (head.x >= canvas.width){
            head.x = 0
        }
        else if (head.x <= -size){
            head.x = canvas.width - size
        }

        if (head.y >= canvas.height){
            head.y = 0
        }else if (head.y <= -size){
            head.y = canvas.height - size
        }
    }
    
}

let playTurnSound = () => {
    if (direction !== oldDirection){
        switch (direction){
            case 'right':
                turnRight.play()
            break
            case 'left':
                turnLeft.play()
            break
            case 'up':
                turnUp.play()
            break
            case 'down':
                turnDown.play()
            break
        }
    }
    oldDirection = direction
}

//Function to move the snake conform direction's value
let moveSnake = () => {
    if (!direction) return
    let head = snake[snake.length - 1]
    let oldPos = {x: head.x, y: head.y}

    if (head.x % size === 0 && head.y % size === 0) {
        currentDirection = direction;
        db = false
    }

    switch (currentDirection) {
        case 'up':
            head.y -= size
            break
        case 'down':
            head.y += size
            break
        case 'left':
            head.x -= size
            break
        case 'right':
            head.x += size
            break
    }

    for (let i = snake.length - 2; i >= 0; i--){
        let temp = snake[i]
        snake[i] = oldPos
        oldPos = temp 
    }

    if (shouldGrow){
        snake.unshift(oldPos)
        shouldGrow = false
    }
}

//Function only for draw the canvas line and make the grid
let drawLine = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = strokeColor

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

//The main game loop, call's some function
let gameLoop = () => {
    clearInterval(loop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    checkRestart()
    drawLine()
    moveSnake()
    checkCollision()
    drawSnake()
    drawFruit()
    checkEat()
    playTurnSound()
    

    loop = setInterval(() => {
        gameLoop()
    }, 500 - ((speed - 1) * (450 / 24)))
}

//Restart button event listener to instantly restart the game
restartButton.addEventListener('click', () => {
    restart()
    document.addEventListener('keydown', changeDirection)
    document.removeEventListener('keydown', resetOnSpace)
})

//Menu button event listener to back to the main menu and restart the values
menuButton.addEventListener('click', () => {
    restart()
    document.removeEventListener('keydown', resetOnSpace)
    document.removeEventListener('keydown', changeDirection)
    gameMenu.style.display = 'none'
    mainMenu.style.display = 'flex'
})

exitGameMenuButton.addEventListener('click', () => {
    direction = undefined
    currentDirection = undefined
    restart()
    document.removeEventListener('keydown', resetOnSpace)
    document.removeEventListener('keydown', changeDirection)
    gameMenu.style.display = 'none'
    mainMenu.style.display = 'flex'
})

//call's game loop and start the mechanics
gameLoop()