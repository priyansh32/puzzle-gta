const tiles = document.querySelectorAll('.box');
const youWon = document.querySelector('.winner')
let emptytile = tiles[24];

const images = [
    '1_f7sadu.png',
    '2_nburbx.png',
    '3_sgnv8g.png',
    '4_xajtk2.png',
    '5_oynbzz.png',
    '6_mo75dr.png',
    '7_bhudje.png',
    '8_qskaxk.png',
    '9_ovld9h.png',
    '10_dlyrzj.png',
    '11_isvewz.png',
    '12_qlr3yf.png',
    '13_xyrser.png',
    '14_sipeha.png',
    '15_qo2p9f.png',
    '16_adzel1.png',
    '17_omjh3d.png',
    '18_suonme.png',
    '19_cojhmj.png',
    '20_g0tw6i.png',
    '21_tpvxju.png',
    '22_q7fieh.png',
    '23_bsyfyp.png',
    '24_y1zunx.png',
    '25_dqqw9k.png'
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
    tiles[i].style.backgroundImage = `url('https://res.cloudinary.com/dvqyo2zki/image/upload/v1634050037/puzzles/${images[i]}')`;
}
emptytile.style.backgroundImage = `url('https://res.cloudinary.com/dvqyo2zki/image/upload/v1634050037/puzzles/${images[24]}')`;

//this function shuffles the tiles
function shuffle() {
    //even no. of inversions i.e 40
    for (let i = 0; i < 40; i++) {
        //one and two will bw two random tiles that will be inverted
        let one = Math.floor(Math.random() * 24);
        let two = Math.floor(Math.random() * 24);
        if (one !== two) {
            //inverting the background images(ES6 syntax)
            [tiles[one].style.backgroundImage, tiles[two].style.backgroundImage] = [tiles[two].style.backgroundImage, tiles[one].style.backgroundImage];
            live[one] = tiles[one].style.backgroundImage.slice(75, -2);
            live[two] = tiles[two].style.backgroundImage.slice(75, -2);
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
                live[parseInt(emptytile.classList[1]) - 1] = tile.style.backgroundImage.slice(75, -2);
                console.log(live[parseInt(emptytile.classList[1]) - 1])
                // [tile.style.backgroundImage, emptytile.style.backgroundImage] = [emptytile.style.backgroundImage, tile.style.backgroundImage];
                //swap background images with temp variable
                let temp = tile.style.backgroundImage;
                tile.style.backgroundImage = emptytile.style.backgroundImage;
                emptytile.style.backgroundImage = temp;

                emptytile = tile;
                live[i] = tile.style.backgroundImage.slice(75, -2);
            }
            if (JSON.stringify(images) == JSON.stringify(live)) {
                win()
            }
        })
    })
}

function win() {
    tiles[0].parentElement.classList.add('disabled')
    youWon.classList.add('visible')
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
