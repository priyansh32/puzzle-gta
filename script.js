const tiles = document.querySelectorAll('.box');
const youwon = document.querySelector('.winner')
let emptytile = tiles[24];

const images = [
    'url("./puzzle/1.png")',
    'url("./puzzle/2.png")',
    'url("./puzzle/3.png")',
    'url("./puzzle/4.png")',
    'url("./puzzle/5.png")',
    'url("./puzzle/6.png")',
    'url("./puzzle/7.png")',
    'url("./puzzle/8.png")',
    'url("./puzzle/9.png")',
    'url("./puzzle/10.png")',
    'url("./puzzle/11.png")',
    'url("./puzzle/12.png")',
    'url("./puzzle/13.png")',
    'url("./puzzle/14.png")',
    'url("./puzzle/15.png")',
    'url("./puzzle/16.png")',
    'url("./puzzle/17.png")',
    'url("./puzzle/18.png")',
    'url("./puzzle/19.png")',
    'url("./puzzle/20.png")',
    'url("./puzzle/21.png")',
    'url("./puzzle/22.png")',
    'url("./puzzle/23.png")',
    'url("./puzzle/24.png")',
    'url("./puzzle/25.png")'
];

//this array stores list of neighbours for each tile
const neighbourslist = [
    [2, 6],//1
    [1, 3, 7],//2
    [2, 4, 8],//3
    [3, 5, 9],//4
    [4, 10],//5
    [1, 7, 11],//6
    [2, 6, 8, 12],//7
    [3, 7, 9, 13],//8
    [4, 8, 10, 14],//9
    [5, 9, 15],//10
    [6, 12, 16],//11
    [7, 11, 13, 17],//12
    [8, 12, 14, 18],//13
    [9, 13, 15, 19],//14
    [10, 14, 20],//15
    [11, 17, 21,],//16
    [12, 16, 18, 22],//17
    [13, 17, 19, 23],//18
    [14, 18, 20, 24],//19
    [15, 19, 25],//20
    [16, 22],//21
    [17, 21, 23],//22
    [18, 22, 24],//23
    [19, 23, 25],//24
    [20, 24],//25   
];

let live = images.slice();
for (let i = 0; i < 24; i++) {
    tiles[i].style.backgroundImage = `${images[i]}`;
}
emptytile.style.backgroundImage = 'url("./puzzle/25.png")';

//this function shuffles the tiles

function shuffle() {
    //even no. of inversions i.e 40
    for (let i = 0; i < 40; i++) {
        //one and two will bw two random tiles that will be inverted
        let one = Math.floor(Math.random() * 24);
        let two = Math.floor(Math.random() * 24);
        console.log(one, ' ', two);
        if (one != two) {
            //inverting the background images(ES6 syntax)
            [tiles[one].style.backgroundImage, tiles[two].style.backgroundImage] = [tiles[two].style.backgroundImage, tiles[one].style.backgroundImage];
            live[one] = tiles[one].style.backgroundImage;
            live[two] = tiles[two].style.backgroundImage;
        }
        else
            i--;
    }
}

//this function adds click event listeners to tiles
function clickEvents() {
    tiles.forEach((tile, i) => {
        tile.addEventListener('click', () => {
            if (neighbourslist[parseInt(emptytile.classList[1]) - 1].includes(parseInt(tile.classList[1]))) {
                //inverting backgrounds
                live[parseInt(emptytile.classList[1]) - 1] = tile.style.backgroundImage;
                [tile.style.backgroundImage, emptytile.style.backgroundImage] = [emptytile.style.backgroundImage, tile.style.backgroundImage];
                emptytile = tile;
                live[i] = tile.style.backgroundImage;
            }
            if (JSON.stringify(images) == JSON.stringify(live)) {
                win()
            }
        })
    })
}

function win() {
    tiles[0].parentElement.classList.add('disabled')
    youwon.classList.add('visible')
}

const timer = document.querySelector('.timer')
let i = 8
let timerInterval = setInterval(() => {
    i--;
    timer.innerHTML = i;
    if (i == 0) {
        clearInterval(timerInterval)
    }
}, 1000);
//shuffling the tiles
setTimeout(shuffle, 8000)

//adding event listeners to tiles
setTimeout(clickEvents, 8000)
