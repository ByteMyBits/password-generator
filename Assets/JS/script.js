

// holds true/false if a checkbox has been selected
//upper is true initially, if not weird things happen until a checkbox state is changed
let hasUpper = true;
let hasLower = true;
let hasNumber = true;
let hasSpecial;

//arrays to hold the unicode corresponding numbers
//this is probably not a good/readable way of doing it, because I then have to refer to these inner arrays by their indexes later in the code instead of by their names
//could have these pre-populated to save on processing (see closing comment)

let characterArrays = [uppper = [], lower = [], number = [], special = []];

function populate(min, max, index) {

    for (let i = min; i <= max; i++) {

        characterArrays[index].push(i);
    }

}

//populate each character array with the unicode starting position, end position, and the array to select e.g. 0 = upper, 1 = lower etc. as per characterArrays
populate(65, 90, 0);
populate(97, 122, 1);
populate(48, 57, 2);
populate(32, 47, 3);
populate(58, 64, 3);
populate(91, 96, 3);
populate(123, 126, 3);


// let upper = [];
// let lower = [];
// let number = [];
// let special = [];

// function populateUpper(a, b) {

//     for (let i = a; i <= b; i++) {

//         upper.push(i);
//     }
// }

// function populateLower(a, b) {

//     for (let i = a; i <= b; i++) {

//         lower.push(i);
//     }
// }

// function populateNumber(a, b) {

//     for (let i = a; i <= b; i++) {

//         number.push(i);
//     }
// }

// function populateSpecial(a, b) {

//     for (let i = a; i <= b; i++) {

//         special.push(i);
//     }
// }



let combined = [];

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


// populateUpper(65, 90);
// populateLower(97, 122);
// populateNumber(48, 57);
// //is there a better way of doing this?
// populateSpecial(32, 47);
// populateSpecial(58, 64);
// populateSpecial(91, 96);
// populateSpecial(123, 126);

//adding the relevant arrays to the combined array
//using combined += combined.concat() produces weird results (where each character in an array becomes its own array item); so instead just use + 




//TESTING

// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6, 11];
// let array3 = array1.concat(array2);
// console.log("Array 3 = " + array3);

// console.log("The four character arrays are:\n")
// console.log("Upper = " + upper);
// console.log("Lower = " + lower);
// console.log("Number = " + number);
// console.log("Special = " + special);



//TESTING
// let testArray = [1, 2, 3, "cat", "dog"];

// console.log("testArray length: " + testArray.length);
// console.log("Combined array contains: " + combined);
// let ArrayLength = combined.length;
// console.log("The length of combined array is: " + ArrayLength);
// let password = "";


//pick random number from final array and print the equivalent unicode
// for (let i = 0; i <= length; i++) {


//     let x = getRandom(0, (ArrayLength - 1));
//     let y = combined[x]
//     let z = String.fromCharCode(y);
//     // console.log("Random number is: " + x);
//     // console.log("Value at array index: " + combined[x]);
//     // console.log("Correponding unicode is: " + z);
//     password = password.concat(z);

// }

// console.log("Random generated password is: " + password);

let slider = document.getElementById("passwordLength");
let output = document.getElementById("lengthValue");
// what is the difference between .textContent .innerHTML .innerText?
output.textContent = slider.value;

slider.oninput = function () {
    output.textContent = this.value;
}

let areAllFalse = false;
let buttonOpacity = document.getElementById("generatePassword");
let initialCheck = document.getElementById("upperCheck");
initialCheck.checked = true;

// let password = "";

// let howManyChecked = 0;
let outputPassword = document.getElementById("password");

let upperCheck = document.getElementById("upperCheck");
let lowerCheck = document.getElementById("lowerCheck");
lowerCheck.checked = true;
let numberCheck = document.getElementById("numberCheck");
numberCheck.checked = true;
let specialCheck = document.getElementById("specialCheck");
let textArea = document.getElementById("textarea");

let copyPassword = document.getElementById("copy");
let password = "";

//testing randomness

let noUpper = 0;
let noLower = 0;
let noNumber = 0;
let noSpecial = 0;

function check() {

    hasUpper = upperCheck.checked;
    hasLower = lowerCheck.checked;
    hasNumber = numberCheck.checked;
    hasSpecial = specialCheck.checked;

    if ((hasUpper || hasLower || hasNumber || hasSpecial) === false) {
        areAllFalse = true;
        buttonOpacity.setAttribute("style", "opacity:0.5; pointer-events:none; user-select: none");
    }
    else {
        areAllFalse = false;
        buttonOpacity.setAttribute("style", "opacity:1;  user-select: none");

    }
}
//right now, because numbers represent only 10 / 128 characters they appear only ~8% of the time when all character types are selected
//to get a more even distribution they would need to be normalised first
//Achieved this by creating two sets of random numbers, the first chooses whether the type of character should be Uppercase, Lowercase, Numeric or Special. The second random number selects the specific character within that type

function copyText() {

    navigator.clipboard.writeText(outputPassword.textContent);
    console.log("copied!")

}


function generatePassword() {


    // copyPassword.textContent = "Click to copy";

    console.clear();
    password = "";
    combined = [];
    whichArraysToAdd = [];
    if (slider.value > 26) {

        outputPassword.setAttribute("style", "font-size: 16px");
    } else if (slider.value > 29) {
        outputPassword.setAttribute("style", "font-size: 14px");
    } else {

        outputPassword.setAttribute("style", "font-size: 18px");
    }


    if (!areAllFalse) {

        if (hasUpper) {
            // combined = combined.push(characterArrays[0]);
            whichArraysToAdd.push(0);

        }
        if (hasLower) {
            // combined = combined.concat(characterArrays[1]);
            whichArraysToAdd.push(1);
        }
        if (hasNumber) {
            // combined = combined.concat(characterArrays[2]);
            whichArraysToAdd.push(2);
        }
        if (hasSpecial) {
            // combined = combined.concat(characterArrays[3]);
            whichArraysToAdd.push(3);
        }
        console.log(whichArraysToAdd);
        let whichArraysToAddLength = (whichArraysToAdd.length - 1);

        // let ArrayLength = combined.length;
        for (let i = 0; i < slider.value; i++) {

            // let x = getRandom(0, (ArrayLength - 1));
            // let y = combined[x]
            // let z = String.fromCharCode(y);
            // password = password.concat(z)

            //putting it all on one line, this probably isn't a good way to do it (overloading?)
            //remember that strings can be concatenated together with +=, arrays can't (at least not without weird results)
            // password += (String.fromCharCode(combined[getRandom(0, (ArrayLength - 1))]));



            let selectCharacterArray = whichArraysToAdd[getRandom(0, (whichArraysToAddLength))]; //this picks a random number between 0 and 3, depending which checkboxes are ticked, and then selects respective array from whichArraysToAdd
            // console.log("Randomly chosen array is: " + selectCharacterArray);


            // if (selectCharacterArray === 0) noUpper++;
            // if (selectCharacterArray === 1) noLower++;
            // if (selectCharacterArray === 2) noNumber++;
            // if (selectCharacterArray === 3) noSpecial++;


            let selectedArray = characterArrays[selectCharacterArray];
            // console.log("Length of this array is:" + selectedArrayLength);
            // console.log("This array is: " + selectedArray);


            // console.log("The chosen array is" + selectCharacterArray);
            // console.log("This array is: " + selectedArrayLength + " characters long.");
            let randomChar = selectedArray[getRandom(0, (selectedArray.length - 1))];
            // console.log("The random character number is " + randomChar);
            password += String.fromCharCode(randomChar);
            // password += String.fromCharCode(randomChar);

            // password += (String.fromCharCode(characterArrays[selectCharacterArray[getRandom(0, characterArrays[selectCharacterArray].length)]]));


        }

        outputPassword.textContent = password;
        // console.log(`Upper = ${noUpper}\nLower = ${noLower}\nNumber = ${noNumber}\nSpecial = ${noSpecial}`);

    }

}

//on reflection, it would have been a lot more simple and efficient to use character strings i.e. lower = 'abcdefg...' number = '0123456789' etc. and then access the character with a random index. 

