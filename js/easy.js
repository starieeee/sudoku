var numSelected = null;
var tileSelected = null;

var error = 0;
var board = [
    "-7-583-2-",
    "-592--3--",
    "34---65-7",
    "795---632",
    "--36971--",
    "68---27--",
    "914835-76",
    "-3-7-1495",
    "567429-13"
]
var solution = [
    "176583924",
    "859274361",
    "342916587",
    "795148632",
    "423697158",
    "681352749",
    "914835276",
    "238761495",
    "567429813"
]

window.onload = function () {
    setGame();
}

function setGame() {
    for (let h = 1; h <= 9; h++) {
        let number = document.createElement("div");
        number.id = h;
        number.innerText = h;
        number.classList.add("number");
        number.addEventListener("click", selectNumber); // Add this line to attach the event listener
        document.getElementById("digit").appendChild(number);
    }

    // board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            if (board[i][j] != "-") {
                tile.innerText = board[i][j];
                tile.classList.add("tile-start");
            }
            if (i == 2 || i == 5) {
                tile.classList.add("horizontal-line");
            }
            if (j == 2 || j == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}


function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let coords = this.id.split("-");
        let i = parseInt(coords[0]);
        let j = parseInt(coords[1]);

        let selectedNumber = parseInt(numSelected.innerText);
        let solutionNumber = parseInt(solution[i][j]);

        console.log("Selected Number:", selectedNumber);
        console.log("Solution Value:", solutionNumber);

        if (selectedNumber === solutionNumber) {
            this.innerText = selectedNumber;
            this.classList.remove("tile-wrong");
            this.classList.add("tile-correct");
        } else {
            this.classList.remove("tile-correct");
            this.classList.add("tile-wrong");
            incrementError();
        }
    }
}

function incrementError() {
    error++;
    document.getElementById("error").innerText = error;
}

function showAnswer() {
    let emptyTiles = 0;

    // Iterate over each tile in the board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tileId = i.toString() + "-" + j.toString();
            let tile = document.getElementById(tileId);

            // Check if the tile is empty
            if (tile.innerText === "") {
                // Fill the tile with the corresponding solution number
                tile.innerText = solution[i][j];
                tile.classList.add("tile-correct");
                emptyTiles++;
            }
        }
    }

    // Check if all tiles are filled
    if (emptyTiles === 0) {
        // Display congratulatory message
        alert("Congratulations! You've completed the Sudoku puzzle!");
    }
}