prefixes = {};
prefixesCarOnly = {};
letters = {};
numbers = {};

central0 = 0;
doubleLetter = 0;
doubleNumber = 0;
totalPlates = 0;
totalUnique = 0;
totalUniqueCarOnly = 0;

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

function percentages(val) {
    return Math.floor(10000 *val)/100; 
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
    if (parseInt(plate["type"]) <= 3) {
        addPCO(prefix);
        totalUniqueCarOnly++;
    }
    totalPlates += parseInt(plate["nbSeen"]);

    if (plate["name"][0] == plate["name"][1] || plate["name"][1] == plate["name"][2] || plate["name"][2] == plate["name"][0])
        doubleLetter++;

    if (plate["name"][3] == plate["name"][4] || plate["name"][4] == plate["name"][5] || plate["name"][5] == plate["name"][3])
        doubleNumber++;
}

const sortedPrefixes = Object.entries(prefixes);
sortedPrefixes.sort((a, b) => b[1] - a[1]);
prefixesOL = "";
for (let index = 0; index < Math.min(sortedPrefixes.length, 20); index++) {
    prefixesOL+= `<li>${sortedPrefixes[index][0]} - ${sortedPrefixes[index][1]} plates (${percentages(sortedPrefixes[index][1]/totalUnique)}%)</li>`;
}
document.getElementById("prefixlist").innerHTML = prefixesOL;

const sortedPrefixesCarOnly = Object.entries(prefixesCarOnly);
sortedPrefixesCarOnly.sort((a, b) => b[1] - a[1]);
prefixescoOL = "";
for (let index = 0; index < Math.min(sortedPrefixesCarOnly.length, 20); index++) {
    prefixescoOL+= `<li>${sortedPrefixesCarOnly[index][0]} - ${sortedPrefixesCarOnly[index][1]} plates (${percentages(sortedPrefixesCarOnly[index][1]/totalUniqueCarOnly)}%)</li>`;
}
document.getElementById("prefixcolist").innerHTML = prefixescoOL;

const sortedLetters = Object.entries(letters);
sortedLetters.sort((a, b) => b[1] - a[1]);
lettersOL = "";
for (let index = 0; index < sortedLetters.length; index++) {
    lettersOL+= `<li>${sortedLetters[index][0]} - ${sortedLetters[index][1]} uses (${percentages(sortedLetters[index][1]/(3*totalUnique))}%)</li>`;
}
document.getElementById("letterslist").innerHTML = lettersOL;

const sortedNumbers = Object.entries(numbers);
sortedNumbers.sort((a, b) => b[1] - a[1]);
numbersOL = "";
for (let index = 0; index < sortedNumbers.length; index++) {
    numbersOL+= `<li>${sortedNumbers[index][0]} - ${sortedNumbers[index][1]} uses (${percentages(sortedNumbers[index][1]/(3*totalUnique))}%)</li>`;
}
document.getElementById("numberslist").innerHTML = numbersOL;

const sortedNbSeenPlates = plates.slice();
sortedNbSeenPlates.sort((a, b) => b.nbSeen - a.nbSeen);
nbseenplatesOL = "";
for (let index = 0; index < Math.min(sortedNbSeenPlates.length, 20); index++) {
    nbseenplatesOL+= `<li>${sortedNbSeenPlates[index].name} seen ${sortedNbSeenPlates[index].nbSeen} times</li>`;
}
document.getElementById("nbSeen").innerHTML = nbseenplatesOL;


document.getElementById("totalplates").innerHTML = `Total plates written ${totalPlates}`;
document.getElementById("totalunique").innerHTML = `Unique plates : ${totalUnique}`;
document.getElementById("totalbuses").innerHTML = `Buses/rented cars : ${totalUnique - totalUniqueCarOnly} (${percentages((totalUnique - totalUniqueCarOnly)/totalUnique)}%) | Normal cars : ${totalUniqueCarOnly}`;
document.getElementById("doubleletter").innerHTML = `2 or 3 identical letters : ${doubleLetter} plates (${percentages(doubleLetter / totalUnique)}% - normal: 11.24%)`;
document.getElementById("doublenumber").innerHTML = `2 or 3 identical numbers : ${doubleNumber} plates (${percentages(doubleNumber / totalUnique)}% - normal: 28%)`;
document.getElementById("zerocentral").innerHTML = `Has a 0 as center number : ${central0} plates (${percentages(central0 / totalUnique)}% - normal: 10%)`;