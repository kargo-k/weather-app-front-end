const BASE_URL = "https://weather-app-rails.herokuapp.com";
// const LOCATION_ENDPOINT = `/location/${location}`;
// const WEATHER_ENDPOINT = `/weather?loc=${latitude}_${longitude}`;

const submitButton = document.getElementById("location-submit");
submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  let inputVal = document.getElementById("location").value;
  let new_url = BASE_URL + `/location/${inputVal}`;
  fetch(new_url)
    .then(resp => resp.json())
    .then(json => {
      let location = json.results[0].geometry.location;
      let weather_url =
        BASE_URL + `/weather?loc=${location.lat}_${location.lng}`;
      fetch(weather_url)
        .then(resp => resp.json())
        .then(json => {
          renderForecast(json);
        });
    });
});

function renderForecast(forecast) {
  const main = document.getElementById("weather-display");
  main.innerHTML = "";
  forecast.daily.data.forEach(day => {
    let divDay = document.createElement("div");
    divDay.setAttribute("class", "dayBox");
    main.appendChild(divDay);
    let boxT = document.createElement("div");
    let boxDate = document.createElement("div");
    let highT = document.createElement("p");
    let lowT = document.createElement("p");
    let icon = document.createElement("img");
    let date = document.createElement("h4");
    let summary = document.createElement("p");
    icon.setAttribute("src", setIcon(day.icon));
    boxT.className = "boxT";
    boxDate.className = "boxDate";

    divDay.appendChild(boxT);
    boxT.appendChild(highT);
    boxT.appendChild(lowT);
    divDay.appendChild(icon);
    divDay.appendChild(boxDate);
    boxDate.appendChild(date);
    boxDate.appendChild(summary);
    highT.innerText = "Hi: " + day.temperatureHigh;
    lowT.innerText = "Lo: " + day.temperatureLow;

    date.innerText = toDateTime(day.time);
    summary.innerText = day.summary;
  });
  console.log(forecast.daily.data[0]);
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  let dateString = t.getMonth() + "/" + t.getDate();

  return dateString;
}

function setIcon(arg) {
  if (arg === "rain") {
    return "rain_s_cloudy.png";
  } else if (arg === "clear-day") {
    return "sunny.png";
  } else {
    return "partly_cloudy.png";
  }
}
