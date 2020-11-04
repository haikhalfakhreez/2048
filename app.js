document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    // create a playing board
    function createBoard () {
        for (let i = 0;  i < width*width; i++) {
            square = document.createElement('article');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
        invisibleZeros();
        colorTiles();
    }
    createBoard();
    
    // generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        }else generate ()
    }

    // swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML; // column 1 - 0,4,8,12
                let totalTwo = squares[i+1].innerHTML; // column 2 - 1,5,9,13
                let totalThree = squares[i+2].innerHTML; // column 3 - 2,6,10,14
                let totalFour = squares[i+3].innerHTML; // column 4 - 3,7,11,15
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML; // column 1 - 0,4,8,12
                let totalTwo = squares[i+1].innerHTML; // column 2 - 1,5,9,13
                let totalThree = squares[i+2].innerHTML; // column 3 - 2,6,10,14
                let totalFour = squares[i+3].innerHTML; // column 4 - 3,7,11,15
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+(width*2)].innerHTML = newColumn[2];
            squares[i+(width*3)].innerHTML = newColumn[3];
        }
    }

    // swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+(width*2)].innerHTML = newColumn[2];
            squares[i+(width*3)].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares [i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares [i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares [i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares [i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        }else if (e.keyCode === 37) {
            keyLeft();
        }else if (e.keyCode === 38) {
            keyUp();
        }else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);
    
    function keyRight () {
        moveRight();
        combineRow();
        moveRight();
        generate();
        invisibleZeros();
        colorTiles();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
        invisibleZeros();
        colorTiles();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
        invisibleZeros();
        colorTiles();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
        invisibleZeros();
        colorTiles();
    }

    // check for the number 2048 in the squares to win
    function checkForWin () {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!";
                document.removeEventListener('keyup', control);
            }
        }
    }

    // check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = "You Lose!";
            document.removeEventListener('keyup', control);
        }
    }

    // make zeros invisible
    function invisibleZeros() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.color = "rgba(198, 188, 178, 1)";
            }else if (squares[i].innerHTML !== 0) {
                squares[i].style.color = "#444";
            }
        }
    }

    // color tiles according to number
    function colorTiles() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.backgroundColor = "rgba(198, 188, 178, 1)";
            }else if (squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = "#eee4da";
                squares[i].style.color = "#776e65";
            }else if (squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = "#ede0c8";
                squares[i].style.color = "#776e65";
            }else if (squares[i].innerHTML == 8) {
                squares[i].style.backgroundColor = "#f2b179";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = "#f59563";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = "#f67c5f";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = "#f65e3b";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = "#edcf72";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = "#edcc61";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = "#edc850";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = "#edc53f";
                squares[i].style.color = "#f9f6f2";
            }else if (squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = "#edc22e";
                squares[i].style.color = "#f9f6f2";
            }else {
                squares[i].style.backgroundColor = "#3c3a32";
                squares[i].style.color = "#f9f6f2";
            }
        }
    }

    // swipe
    function detectswipe(el,func) {
        swipe_det = new Object();
        swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
        var min_x = 30;  //min x swipe for horizontal swipe
        var max_x = 30;  //max x difference for vertical swipe
        var min_y = 50;  //min y swipe for vertical swipe
        var max_y = 60;  //max y difference for horizontal swipe
        var direc = "";
        ele = document.getElementById(el);
        ele.addEventListener('touchstart',function(e){
          var t = e.touches[0];
          swipe_det.sX = t.screenX; 
          swipe_det.sY = t.screenY;
        },false);
        ele.addEventListener('touchmove',function(e){
          e.preventDefault();
          var t = e.touches[0];
          swipe_det.eX = t.screenX; 
          swipe_det.eY = t.screenY;    
        },false);
        ele.addEventListener('touchend',function(e){
          //horizontal detection
          if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
            if(swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
          }
          //vertical detection
          else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
            if(swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
          }
      
          if (direc != "") {
            if(typeof func == 'function') func(el,direc);
          }
          direc = "";
          swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
        },false);  
    }
      
    function myDown(el,d) {
        moveDown();
    }
    function myUp(el,u) {
        moveUp();
    }
    function myLeft(el,l) {
        moveLeft();
    }
    function myRight(el,r) {
        moveRight();
    }
    function control(e) {
        if (myRight) {
            keyRight();
        }else if (myLeft) {
            keyLeft();
        }else if (myUp) {
            keyUp();
        }else if (myDown) {
            keyDown();
        }
    }

})