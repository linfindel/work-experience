const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJvZzM1MTUxM0BjYWxseXdpdGguYWMudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJvZzM1MTUxM0BjYWxseXdpdGguYWMudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtMTdhYWI2MjMtOThmOS00MjNmLWEyNGQtYzE0MjQ0NzAzMmJmIiwiaWQiOjUwNzQsInV1aWQiOiI0MTAyNGY5YS00YzIxLTRlNzMtYTRlNC1iNmRkZjA1MDIwYzMifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MTk4MzY4OTIsImp0aSI6IjhlZGU5M2UzLTk0NjctNGVmMy1hZDc0LTcyMTY4OGQ2NGMxZSJ9.HE1yTSdKD0dVnVHKlhujFiBbf6cBj1DogI9xrINRiGlBP1oNtD1ueYKydXC6YzdJR_S_qKUs_OITbrH6ciOMs7HOzx3ZyKV2p1tY0UlRyoE1zUbu5-2ldClzvhXCveafLt7jY-lPTX4MqCUVUjWBTQkrkXxIixmEc-2TCn_YN7QsE7Mgtgc_Xb7N_uGSsKgCSL_ocU-LGzGbOts_LgZPpbIuu6Jo89GFuL-xQNnjs9T7yltG9PTSNJNY0IcxQ9m35K4IAiVBVDEP1if6S47OYPaRqP9AveEO15ZZM4HYaAHZk74siBq0vrbPIe2m5vE5h2Gc0dP-xiaS1BKA9p66MA==";
const apiURL = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.371389&longitude=-4.142222";

let temperature, humidity, visibility, uv, uvHigh, rain, windNormal, windGusts, windDirection;

fetch(apiURL, {headers: {apikey: apiKey}})
.then(response => response.json())
.then(data => {
    console.log(data.features[0].properties.timeSeries[0]);
  
    temperature = data.features[0].properties.timeSeries[0].screenTemperature;
    humidity = data.features[0].properties.timeSeries[0].screenRelativeHumidity;
    visibility = data.features[0].properties.timeSeries[0].visibility;
    uv = data.features[0].properties.timeSeries[0].uvIndex;
    rain = data.features[0].properties.timeSeries[0].probOfPrecipitation;

    visibility /= 1000;

    document.getElementById("temp").innerText = `${temperature} °C`;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("visibility").innerText = `${visibility} km`;
    document.getElementById("uv").innerText = `${uv}`;
    document.getElementById("rain").innerText = `${rain}%`;

    if (localStorage.getItem("sport") == "boat" || localStorage.getItem("sport") == "jetski" || localStorage.getItem("sport") == "surf") {
      if (uv > 5) {
        uvHigh = true
      }
    }

    else if (localStorage.getItem("sport") == "paddle" || localStorage.getItem("sport") == "swim") {
      if (uv > 4) {
        uvHigh = true;
      }
    }

    if (uvHigh) {
      document.getElementById("uv-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
      document.getElementById("uv-text").innerHTML += "<br> Apply sun cream"
    }

    windNormal = data.features[0].properties.timeSeries[0].windSpeed10m;
    windGusts = data.features[0].properties.timeSeries[0].windGustSpeed10m;
    windDirection = data.features[0].properties.timeSeries[0].windDirectionFrom10m;

    document.getElementById("compass-needle").style.rotate = `${windDirection}deg`;
    document.getElementById("bearing").innerText = `${windDirection}°`;
    document.getElementById("wind-description").innerText = `${windNormal} knots with gusts of ${windGusts} knots`;

    if (isUnsafe() == "sport_not_set") {
      // Do nothing
    }

    else if (isUnsafe() == "temp") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "emergency_heat";
      document.getElementById("verdict-text").innerText = "It's too hot to be on the water";

      document.getElementById("temp-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
      document.getElementById("temp-text").innerHTML += "<br> Drink water";
    }

    else if (isUnsafe() == "rain") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "rainy";
      document.getElementById("verdict-text").innerText = "It's too rainy to be on the water";

      document.getElementById("rain-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
      document.getElementById("rain-text").innerHTML += "<br> Bring a coat";
    }

    else if (isUnsafe() == "wind") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "air";
      document.getElementById("verdict-text").innerText = "It's too windy to be on the water";
    }

    else if (isUnsafe() == "visibility") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "foggy";
      document.getElementById("verdict-text").innerText = "Visibility is too low to be on the water";

      document.getElementById("temp-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
      document.getElementById("temp-text").innerHTML += "<br> Keep the shore in sight";
    }

    else {
      document.getElementById("verdict-card").classList.remove("card-error");
      document.getElementById("verdict-card").classList.add("card-success");

      document.getElementById("verdict-icon").innerText = "verified";
      document.getElementById("verdict-text").innerText = "It's safe to be on the water";
    }
  }
);

function isUnsafe() {
  if (!localStorage.getItem("sport")) {
    return "sport_not_set";
  }

  if (temperature < 5 || temperature > 30) {
    return "temp";
  }

  if (localStorage.getItem("sport") == "boat") {  
    if (rain > 90) {
      return "rain";
    }
  
    else if (windNormal > 13 || windGusts > 15) {
      return "wind";
    }
  
    else if (visibility < 20) {
      return "visibility";
    }
  }

  else if (localStorage.getItem("sport") == "jetski") {  
    if (rain > 75) {
      return "rain";
    }
  
    else if (windNormal > 13 || windGusts > 15) {
      return "wind";
    }
  
    else if (visibility < 20) {
      return "visibility";
    }
  }

  else if (localStorage.getItem("sport") == "paddle") {  
    if (rain > 75) {
      return "rain";
    }
  
    else if (windNormal > 13 || windGusts > 15) {
      return "wind";
    }
  
    else if (visibility < 2) {
      return "visibility";
    }
  }

  else if (localStorage.getItem("sport") == "surf") {  
    if (rain > 75) {
      return "rain";
    }
  
    else if ((windNormal < 13 || windGusts < 15) && (windNormal > 75 || windGusts > 90)) {
      return "wind";
    }
  
    else if (visibility < 1) {
      return "visibility";
    }
  }

  else if (localStorage.getItem("sport") == "swim") {  
    if (rain > 75) {
      return "rain";
    }
  
    else if (windNormal > 5 || windGusts > 10) {
      return "wind";
    }
  
    else if (visibility < 1) {
      return "visibility";
    }
  }

  else {
    return true;
  }
}

if (!localStorage.getItem("sport")) {
  document.getElementById("verdict-card").className = "";
  document.getElementById("verdict-card").classList.add("card-warning");
  document.getElementById("verdict-card").classList.add("column");
  document.getElementById("verdict-card").style.gap = 0;

  document.getElementById("verdict-icon").innerText = "warning";
  document.getElementById("verdict-icon").style.fontSize = "2.5rem";

  document.getElementById("verdict-text").innerText = "For safety advice, set a watersport in the settings";
  document.getElementById("verdict-text").style.fontSize = "1.5rem";
}