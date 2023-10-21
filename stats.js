prefixes = {};
prefixesCarOnly = {};
letters = {};
numbers = {};

central0 = 0;
doubleLetter = 0;
doubleNumber = 0;
totalPlates = 0;
totalUnique = 0;

function addP(toAdd) {
    if (!prefixes[toAdd])
        prefixes[toAdd] = 1;
    else
        prefixes[toAdd] += 1;
}

function addPCO(toAdd) {
    if (!prefixesCarOnly[toAdd])
        prefixesCarOnly[toAdd] = 1;
    else
        prefixesCarOnly[toAdd] += 1;
}

function addL(toAdd) {
    if (!letters[toAdd])
        letters[toAdd] = 1;
    else
        letters[toAdd] += 1;
}

function addN(toAdd) {
    if (!numbers[toAdd])
        numbers[toAdd] = 1;
    else
        numbers[toAdd] += 1;
}

for (const plate of plates) {
    totalUnique++;

    let prefix = "";
    let i = 0;
    for (const c of plate["name"]) {
        if (i > 2) {
            addN(c)
        }
        else {
            addL(c);
            prefix += c;
        }
        if (i == 4 && c == '0')
            central0++;
        i++;
    }
    addP(prefix);
    if (parseInt(plate["type"]) <= 3)
        addPCO(prefix);
    totalPlates += parseInt(plate["nbSeen"]);

    if (plate["name"][0] == plate["name"][1] || plate["name"][1] == plate["name"][2] || plate["name"][2] == plate["name"][0])
        doubleLetter++;

    if (plate["name"][3] == plate["name"][4] || plate["name"][4] == plate["name"][5] || plate["name"][5] == plate["name"][3])
        doubleNumber++;
}

const sortedPrefixes = Object.entries(prefixes);
sortedPrefixes.sort((a, b) => b[1] - a[1]);

const sortedPrefixesCarOnly = Object.entries(prefixesCarOnly);
sortedPrefixesCarOnly.sort((a, b) => b[1] - a[1]);

const sortedLetters = Object.entries(letters);
sortedLetters.sort((a, b) => b[1] - a[1]);

const sortedNumbers = Object.entries(numbers);
sortedNumbers.sort((a, b) => b[1] - a[1]);