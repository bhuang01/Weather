
window.addEventListener("load", ()=> {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');

    // console.log("message");
    // window.alert("message");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            console.log("location");
            // window.alert("message");

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/0079aff8c3da1efc5fa309a264a7adc0/${lat},${long}`;

            //Testing:
            //const api = 'data.json';

            fetch(api)
                .then(response => {

                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    console.log(data.timezone);

                    //Sets DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    }

    else {
        h1.textContent = "Please enable your location!"
    }
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
