$(document).ready(function () {
    if (localStorage.getItem("states") == null) {
        localStorage.setItem("states", JSON.stringify(statesDic));
    }
    if (localStorage.getItem("score") == null) {
        localStorage.setItem("score", score);
    }
    if (localStorage.getItem("carScore") == null) {
        localStorage.setItem("carScore", score);
    }
    if (localStorage.getItem("truckScore") == null) {
        localStorage.setItem("truckScore", score);
    }
    if (localStorage.getItem("statesTotal") == null) {
        localStorage.setItem("statesTotal", statesTotal);
    }

    statesDic = JSON.parse(localStorage.getItem("states"));
    score = localStorage.getItem("score");
    carScore = localStorage.getItem("score");
    truckScore = localStorage.getItem("score");
    statesTotal = localStorage.getItem("statesTotal");

    document.getElementById('score').innerHTML = "Total Score: " + score;
    document.getElementById('carScore').innerHTML = "Total Score (Cars): " + carScore;
    document.getElementById('truckScore').innerHTML = "Total Score (Trucks): " + truckScore;
    document.getElementById('statesCount').innerHTML = "Total States Found: " + statesTotal;

    createStatesList(JSON.parse(localStorage.getItem("states")));
});

function createStatesList(states) {
    states.forEach(state => {
        var label = document.createElement("label");
        label.name = state.name;
        label.id = state.name;
        label.value = state.name;
        label.innerHTML = state.name;

        var carCheckBox = document.createElement("input");
        carCheckBox.type = "checkbox";
        carCheckBox.id = state.name;
        var carCheckBoxLabel = document.createElement('label');
        carCheckBoxLabel.innerHTML = "Car (" + state.carPoints + ")";
        carCheckBoxLabel.htmlFor = state.name + "CarCheckbox";

        carCheckBox.onchange = function () {
            var updateStates = JSON.parse(localStorage.getItem("states"));
            var carPoints = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].carPoints;
            var truckPoints = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].truckPoints;
            var truckChecked = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].truckCheck;
            var stateChecked = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck;

            if (carCheckBox.checked) {
                updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].carCheck = true;
                if (truckChecked) {
                    updateScore(false, truckPoints);   
                }
                updateScore(true, carPoints);
                updateCarScore(true, carPoints);
                if (!stateChecked) {
                    updateStateTotal(true);
                    updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck = true;
                }
            }
            else {
                updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].carCheck = false;
                if (truckChecked) {
                    updateScore(true, truckPoints);
                }
                else {
                    updateStateTotal(false);
                    updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck = false;
                }
                updateScore(false, carPoints);
                updateCarScore(false, carPoints);
            }
            localStorage.setItem("states", JSON.stringify(updateStates));
            console.log(JSON.parse(localStorage.getItem("states")));
        }

        var truckCheckBox = document.createElement("input");
        truckCheckBox.type = "checkbox";
        truckCheckBox.id = state.name;
        var truckCheckBoxLabel = document.createElement('label');
        truckCheckBoxLabel.innerHTML = "Truck (" + state.truckPoints + ")";
        truckCheckBoxLabel.htmlFor = state.name + "TruckCheckbox";

        truckCheckBox.onchange = function () {
            var updateStates = JSON.parse(localStorage.getItem("states"));
            var truckPoints = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].truckPoints;
            var carChecked = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].carCheck;
            var stateChecked = updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck;

            if (truckCheckBox.checked) {
                updateStates.filter(obj => {return obj.name === truckCheckBox.id})[0].truckCheck = true;
                if (!carChecked) {
                    updateScore(true, truckPoints);
                    updateStateTotal(true);
                    updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck = true;
                }
                updateTruckScore(true, truckPoints);
            }
            else {
                updateStates.filter(obj => {return obj.name === truckCheckBox.id})[0].truckCheck = false;
                if (!carChecked) {
                    updateScore(false, truckPoints);
                    updateStateTotal(false);
                    updateStates.filter(obj => {return obj.name === carCheckBox.id})[0].stateCheck = false;
                }
                updateTruckScore(false, truckPoints);
            }
            localStorage.setItem("states", JSON.stringify(updateStates));
            console.log(JSON.parse(localStorage.getItem("states")));
        }

        var br = document.createElement('br');

        var container = document.getElementById('states');
        container.appendChild(label);
        container.appendChild(carCheckBox);
        container.appendChild(carCheckBoxLabel);
        container.appendChild(truckCheckBox);
        container.appendChild(truckCheckBoxLabel);
        container.appendChild(br);
    });
}

function clearStorage() {
    if (confirm('Are you sure you want to start a new trip? All state data will be cleared.')) {
        localStorage.clear();
        console.log(localStorage.getItem("states"))
        console.log(localStorage.getItem("score"))
        location.reload();
    }
    else {
        console.log('Clear canceled.');
    }
}

function updateScore(direction, points, vehicle) {
    score = parseInt(localStorage.getItem("score"));
    if (direction) {
        score = score + points;
    }
    else {
        score = score - points;
    }
    document.getElementById('score').innerHTML = "Total Score: " + score;
    localStorage.setItem("score", score);
}

function updateCarScore(direction, points) {
    carScore = parseInt(localStorage.getItem("carScore"));
    if (direction) {
        carScore = carScore + points;
    }
    else {
        carScore = carScore - points;
    }
    document.getElementById('carScore').innerHTML = "Total Score (Cars): " + carScore;
    localStorage.setItem("carScore", carScore);
}

function updateTruckScore(direction, points) {
    truckScore = parseInt(localStorage.getItem("truckScore"));
    if (direction) {
        truckScore = truckScore + points;
    }
    else {
        truckScore = truckScore - points;
    }
    document.getElementById('truckScore').innerHTML = "Total Score (Trucks): " + truckScore;
    localStorage.setItem("truckScore", truckScore);
}

function updateStateTotal(direction) {
    statesTotal = parseInt(localStorage.getItem("statesTotal"));
    if (direction) {
        statesTotal = statesTotal + 1;
    }
    else {
        statesTotal = statesTotal - 1;
    }
    document.getElementById('statesCount').innerHTML = "Total States Found: " + statesTotal;
    localStorage.setItem("statesTotal", statesTotal);
}

function addPlate() {
    var states = JSON.parse(localStorage.getItem("states"));
    var newState = document.getElementById('add').value;
    states[newState] = true;
    localStorage.setItem("states", JSON.stringify(states));
    updateScore(true);
    location.reload();
}

var score = 0;
var carScore = 0;
var truckScore = 0;
var statesTotal = 0;

var statesDic =
    [
        {
            "name": "Alabama",
            "carPoints": 4,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Alaska",
            "carPoints": 5,
            "truckPoints": 5,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Arizona",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Arkansas",
            "carPoints": 3,
            "truckPoints": 2,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "California",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Colorado",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Connecticut",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Delaware",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Florida",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Georgia",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Hawaii",
            "carPoints": 5,
            "truckPoints": 5,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Idaho",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },

        {
            "name": "Illinois",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Indiana",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Iowa",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Kansas",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Kentucky",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Louisiana",
            "carPoints": 4,
            "truckPoints": 2,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Maine",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Maryland",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Massachusetts",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Michigan",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Minnesota",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Mississippi",
            "carPoints": 4,
            "truckPoints": 2,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Missouri",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Montana",
            "carPoints": 4,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Nebraska",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Nevada",
            "carPoints": 3,
            "truckPoints": 2,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "New Hampshire",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "New Jersey",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "New Mexico",
            "carPoints": 3,
            "truckPoints": 2,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "New York",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "North Carolina",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "North Dakota",
            "carPoints": 5,
            "truckPoints": 4,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Ohio",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Oklahoma",
            "carPoints": 2,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Oregon",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Pennsylvania",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Rhode Island",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "South Carolina",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "South Dakota",
            "carPoints": 5,
            "truckPoints": 4,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Tennessee",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Texas",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Utah",
            "carPoints": 4,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Vermont",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Virginia",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Washington",
            "carPoints": 3,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "West Virginia",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Wisconsin",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Wyoming",
            "carPoints": 4,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Washington D.C.",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Alberta",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "British Columbia",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Manitoba",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "New Brunswick",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Nova Scotia",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Ontario",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Quebec",
            "carPoints": 1,
            "truckPoints": 1,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Saskatchewan",
            "carPoints": 3,
            "truckPoints": 3,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "EU",
            "carPoints": 4,
            "truckPoints": 4,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        },
        {
            "name": "Diplomat",
            "carPoints": 1,
            "truckPoints": 0,
            "carCheck": false,
            "truckCheck": false,
            "stateCheck": false
        }
    ];
