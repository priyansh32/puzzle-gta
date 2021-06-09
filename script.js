const tiles = document.querySelectorAll('.box')
var color = ["red", "green", "orange", "yellow", "blue", "white"];

let emptytile = tiles[24];

const images = [
    './puzzle/1.png',
    './puzzle/2.png',
    './puzzle/3.png',
    './puzzle/4.png',
    './puzzle/5.png',
    './puzzle/6.png',
    './puzzle/7.png',
    './puzzle/8.png',
    './puzzle/9.png',
    './puzzle/10.png',
    './puzzle/11.png',
    './puzzle/12.png',
    './puzzle/13.png',
    './puzzle/14.png',
    './puzzle/15.png',
    './puzzle/16.png',
    './puzzle/17.png',
    './puzzle/18.png',
    './puzzle/19.png',
    './puzzle/20.png',
    './puzzle/21.png',
    './puzzle/22.png',
    './puzzle/23.png',
    './puzzle/24.png'
]

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
]

for (let i = 0; i < 24; i++) {
    tiles[i].style.backgroundImage = `url(${images[i]})`
}
emptytile.style.backgroundImage = 'url("./puzzle/25.png")'

function shuffle() {
    //even no. of inversions i.e 40
    for (let i = 0; i < 40; i++) {
        //one and two will bw two random tiles that will be inverted
        let one = Math.floor(Math.random() * images.length);
        let two = Math.floor(Math.random() * images.length);

        //inverting the background images (ES6 syntax)
        [tiles[one].style.backgroundImage, tiles[two].style.backgroundImage] = [tiles[two].style.backgroundImage, tiles[one].style.backgroundImage]
    }
}

setTimeout(shuffle, 5000)

//adding event listeners to tiles
tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if (neighbourslist[parseInt(emptytile.classList[1]) - 1].includes(parseInt(tile.classList[1]))) {
            //inverting backgrounds
            [tile.style.backgroundImage, emptytile.style.backgroundImage] = [emptytile.style.backgroundImage, tile.style.backgroundImage]
            emptytile = tile;
        }
    })
})