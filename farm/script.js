const plateInput = document.getElementById('plateinput');
const submitButtons = document.querySelectorAll('.subplate[type="submit"]');

const platePattern = /^[A-Za-z]{3}\d{3}$/;

function updtButtons() {
    const isValid = platePattern.test(window.plate);
    submitButtons.forEach((button) => {
        button.disabled = !isValid;
    });
}

updtButtons();

window.plate = "";
window.indexPlate = 0;

function updatePlate() {
    document.getElementById("platevalue").value = window.plate;
    let displayedPlate = "";
    for (let index = 0; index < 6; index++) {
        if (index < window.plate.length)
            displayedPlate += window.plate[index];
        else {
            if (index < 3)
                displayedPlate += "-";
            else
                displayedPlate += "⋅";
        }
    }

    document.getElementById("plateinput").innerHTML = displayedPlate;
}

function setAzertyKeyboard() {
    document.getElementById("keyboardDiv").innerHTML = `<div class="keyboardRow">
    <button onclick="addSymbol('A')" class="keyButton">A</button>
    <button onclick="addSymbol('Z')" class="keyButton">Z</button>
    <button onclick="addSymbol('E')" class="keyButton">E</button>
    <button onclick="addSymbol('R')" class="keyButton">R</button>
    <button onclick="addSymbol('T')" class="keyButton">T</button>
    <button onclick="addSymbol('Y')" class="keyButton">Y</button>
    <button onclick="addSymbol('U')" class="keyButton">U</button>
    <button onclick="addSymbol('I')" class="keyButton">I</button>
    <button onclick="addSymbol('O')" class="keyButton">O</button>
    <button onclick="addSymbol('P')" class="keyButton">P</button>
    </div><div class="keyboardRow">
    <button onclick="addSymbol('Q')" class="keyButton">Q</button>
    <button onclick="addSymbol('S')" class="keyButton">S</button>
    <button onclick="addSymbol('D')" class="keyButton">D</button>
    <button onclick="addSymbol('F')" class="keyButton">F</button>
    <button onclick="addSymbol('G')" class="keyButton">G</button>
    <button onclick="addSymbol('H')" class="keyButton">H</button>
    <button onclick="addSymbol('J')" class="keyButton">J</button>
    <button onclick="addSymbol('K')" class="keyButton">K</button>
    <button onclick="addSymbol('L')" class="keyButton">L</button>
    <button onclick="addSymbol('M')" class="keyButton">M</button>
    </div><div class="keyboardRow">
    <button onclick="addSymbol('W')" class="keyButton">W</button>
    <button onclick="addSymbol('X')" class="keyButton">X</button>
    <button onclick="addSymbol('C')" class="keyButton">C</button>
    <button onclick="addSymbol('V')" class="keyButton">V</button>
    <button onclick="addSymbol('B')" class="keyButton">B</button>
    <button onclick="addSymbol('N')" class="keyButton">N</button>
    <button onclick="removeSymbol()" class="keyButton">←</button>
    </div>`;
}

function setNumberKeyboard() {
    document.getElementById("keyboardDiv").innerHTML = `<div class="keyboardRow">
    <button onclick="addSymbol('7')" class="keyButton">7</button>
    <button onclick="addSymbol('8')" class="keyButton">8</button>
    <button onclick="addSymbol('9')" class="keyButton">9</button>
    </div><div class="keyboardRow">
    <button onclick="addSymbol('4')" class="keyButton">4</button>
    <button onclick="addSymbol('5')" class="keyButton">5</button>
    <button onclick="addSymbol('6')" class="keyButton">6</button>
    </div><div class="keyboardRow">
    <button onclick="addSymbol('1')" class="keyButton">1</button>
    <button onclick="addSymbol('2')" class="keyButton">2</button>
    <button onclick="addSymbol('3')" class="keyButton">3</button>
    </div><div class="keyboardRow">
    <button onclick="addSymbol('0')" class="keyButton">0</button>
    <button onclick="removeSymbol()" class="keyButton">←</button>
    </div>`;
}

function updateKeyboard() {
    if (window.indexPlate < 3)
        setAzertyKeyboard();
    else
        setNumberKeyboard();
}

function addSymbol(s) {
    console.log(`Added "${s}"`);
    if (window.plate.length < 6) {
        window.plate += s;
        window.indexPlate++;
    }
    updatePlate();
    updateKeyboard();
}

function removeSymbol() {
    console.log(`Remove last char`);
    window.plate = window.plate.slice(0, -1);
    window.indexPlate--;
    updatePlate();
    updateKeyboard();
}

updateKeyboard();

