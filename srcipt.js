document.addEventListener("DOMContentLoaded", () => {
    const temperatureField = document.querySelector(".temp p"); // Select the <p> in .temp
    const locationField = document.querySelector(".time_location p"); // Select the <p> in .time_location
    const dateField = document.querySelector(".time_location span"); // Select the <span> in .time_location
    const condField = document.querySelector(".condition p"); // Select the <p> in .condition
    const searchField = document.querySelector(".search_area");
    const form = document.querySelector('.form');

    form.onsubmit = searchforLocation; // Directly assign the event handler to the onsubmit property

    let targetLoc = '';
    const fetchResults = async () => {
        let url = `http://api.weatherapi.com/v1/current.json?key=c3156b6df9af4505903194611242212&q=${targetLoc}&aqi=no`;
        const res = await fetch(url);
        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    };

    function updateDetails(temp, locationName, time, condition) {

        let splitDate = time.split(' ')[0]
        let splitTime= time.split(' ')[1]
        let currentDay = new Date(splitDate)
        temperatureField.innerText = temp;
        locationField.innerText = locationName;
        dateField.innerText = time;
        condField.innerText = condition;
    }

    function searchforLocation(e) {
        e.preventDefault();

        targetLoc = searchField.value; // Correctly get the user's input
        fetchResults();
    }
});
