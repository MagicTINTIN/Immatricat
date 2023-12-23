const plateInput = document.getElementById('plateinput');
const submitButtons = document.querySelectorAll('.subplate[type="submit"]');

function updtButtons() {
    const isValid = plateInput.checkValidity();
    submitButtons.forEach((button) => {
        button.disabled = !isValid;
    });
}

plateInput.addEventListener('input', e => updtButtons());
updtButtons();

document.addEventListener('DOMContentLoaded', function () {
    plateInput.focus();
    plateInput.select();
    plateInput.setSelectionRange(0, 0);
});

function addSymbol(s) {
    console.log(`Added "${s}"`);
}

function removeSymbol() {
    console.log(`Remove last char`);
}

function setAzertyKeyboard() {
    document.getElementById("keyboardDiv") = `<div class="keyboardRow">
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