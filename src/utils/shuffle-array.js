export default function arrayShuffle(arr) {
  let len = arr.length;
  //even no. of inversions i.e 40
  for (let i = 0; i < 40; i++) {
    //one and two will bw two random tiles that will be inverted
    let one = Math.floor(Math.random() * (len - 1));
    let two = Math.floor(Math.random() * (len - 1));
    if (one !== two) {
      //inverting the background images(ES6 syntax)
      [arr[one], arr[two]] = [arr[two], arr[one]];
    } else i--;
  }
  return arr;
}
