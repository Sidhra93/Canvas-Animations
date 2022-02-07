const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let circleArray = []

// // RECTANGLE/SQUARE
// c.fillStyle = 'green'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'pink'
// c.fillRect(100, 500, 100, 100)


// //  LINE
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.strokeStyle = 'red'
// c.stroke()

// // ARC/CIRCLE
// c.beginPath()
// c.arc(400, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'purple'
// c.stroke()

let mouse = {
    x: undefined,
    y: undefined
}

const numberOfCircles = 800
const maxRadius = 40
const colorArray = ['#916981', '#DE95C0', '#B28ADE', '#4C5D91', '#6886E0']

window.addEventListener('touchmove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    init()
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = () => {
        this.draw()

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        // INTERACTIVITY
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

    }
}



const init = () => {
    circleArray = []
    for (let i = 0; i < numberOfCircles; i++) {
        let radius = Math.random() * 3 + 1
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = (Math.random() - 0.5)
        let dy = (Math.random() - 0.5)

        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    circleArray.forEach(circle => circle.update())

}

init()
animate()