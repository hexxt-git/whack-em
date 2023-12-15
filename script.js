let holes = document.getElementById('holes')
let starting_holes = 4

function fixCSS() {
    if(holes.childElementCount <= 6) {
        holes.style.height = '300px'
    } else {
        holes.style.height = '520px'
    }
}
function add_hole() {
    let hole = document.createElement('div')
    hole.id = 'hole-' + holes.childElementCount
    hole.className = 'hole'
    holes.appendChild(hole)
    fixCSS()
}
function removeHole() {
    if(holes.childElementCount > 1) {
        holes.removeChild(holes.lastChild)
        fixCSS()
    }
}

function difficulty_control() {
    if(parseInt(scoreValue.innerText) == 0) return 0
    if(parseInt(scoreValue.innerText) % 5 == 0) {
        add_hole()
    }
}
function score() {
    let score = document.getElementById('scoreValue')
    score.innerText = parseInt(score.innerText) + 1
    difficulty_control()
    replace_yugad()
}
function score_down(i) {
    let score = document.getElementById('scoreValue')
    score.innerText = parseInt(score.innerText) - 2
    if(parseInt(score.innerText) < 0) score.innerText = 0
    difficulty_control()
    document.getElementById('hole-' + i).firstChild.remove()
    replace_yugad()
    bomb_count--
}

function replace_yugad(e=0){
    if(e > 15){
        alert('error')
        location.reload()
        return 0
    }

    let yugad = document.getElementById('yugad')
    if(yugad != undefined) yugad.remove()

    new_yugad = document.createElement('div')
    new_yugad.id = 'yugad'
    new_yugad.innerText = '🐭'
    new_yugad.onclick = score

    let i = Math.floor(Math.random() * holes.childElementCount)
    let hole = document.getElementById('hole-' + i)
    if(hole.childElementCount != 0) return replace_yugad(e+1)
    hole.appendChild(new_yugad)
}
function add_bomb(e=0){
    if(e > 5) return 0

    let bomb = document.createElement('div')
    bomb.id = 'bomb'
    bomb.innerText = '💣'
    bomb.onclick = () => score_down(i)

    let i = Math.floor(Math.random() * holes.childElementCount)
    let hole = document.getElementById('hole-' + i)
    if(hole.childElementCount != 0) return add_bomb(e+1)
    hole.appendChild(bomb)
    bomb_count++
    setTimeout(()=>{
        document.getElementById('hole-' + i).firstChild.remove()
        bomb_count--
    }, 1000 * (parseInt(document.getElementById('scoreValue').innerText) / 5 + 1))
}

for (let i = 1; i <= starting_holes; i++) {
    add_hole()
}
replace_yugad()

t = 0
bomb_count = 0
setInterval(() => {
    t++
    if(t % 2 == 0) add_bomb()

    let time = document.getElementById('timeLeft')
    time.innerText = parseInt(time.innerText) - 1
    if(parseInt(time.innerText) == -1) {
        alert(
            `
TIMES UP!
You Scored: ${document.getElementById('scoreValue').innerText}
            `
        )
        location.reload()
    }

}, 1000)