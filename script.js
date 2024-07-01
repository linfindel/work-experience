const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJuYXRoYW5oYWRsZXkucGlnZW9uQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6Im5hdGhhbmhhZGxleS5waWdlb25AZ21haWwuY29tIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLTkxMzQ1MmFiLTZlNWMtNDlhYy05MTRiLTA0Y2EwYTE5YzM3MyIsImlkIjo1MDczLCJ1dWlkIjoiNDU3ZDg2ZTMtMjVmMC00NjJmLTg0ZjktNzM3YjZhZjhiZGJkIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE5ODM2NTczLCJqdGkiOiI3ZDZhNmMzOS1hYjBhLTQzNGMtYTg2Ni1mZTVmZmM2MjU1MWQifQ==.RqTJn_yeW6ThaZk7oPCj38FMG8i3uQON-pxZj_ghjhsyF-fmjXdPwqNrkynyCZsL2IRctLxTWlbQKH4MDGCfk8KGKrfsEsBYJzvW7LUbynXAAeOHQ1dVuMD-raN3CZ6s1GtK4M3WvQStBqPiTFD7N0XqRp1hRZVVjvnuJ-7X86YTcERzLM5wy9tNej-GROzMxJ5iktwXnuWu3fXxe594D3P5ny3OYGP6a8SZ8oQ32n94kVmWQeKnIinPVyoNTIaqNVIM-p_ddHIccKQrr-55I6MGuWyel3r7Ssc8-sRo6Ht8fLFP8wVCzkjDy9wC-1AK8KvXrJOcWsXt9Ng8luty5w==";
const apiURL = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.371389&longitude=-4.142222";

let temperature, humidity, visibility, uv, rain, windNormal, windGusts, windDirection;

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

    windNormal = data.features[0].properties.timeSeries[0].windSpeed10m;
    windGusts = data.features[0].properties.timeSeries[0].windGustSpeed10m;
    windDirection = data.features[0].properties.timeSeries[0].windDirectionFrom10m;

    document.getElementById("compass-needle").style.rotate = `${windDirection}deg`;
    document.getElementById("bearing").innerText = `${windDirection}°`;
    document.getElementById("wind-description").innerText = `${windNormal} knots with gusts of ${windGusts} knots`;

    if (isSafe() == "sport_not_set") {
      // Do nothing
    }

    else if (isSafe() == "temp") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "emergency_heat";
      document.getElementById("verdict-text").innerText = "It's too hot to be on the water";
    }

    else if (isSafe() == "rain") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "rainy";
      document.getElementById("verdict-text").innerText = "It's too rainy to be on the water";
    }

    else if (isSafe() == "wind") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "air";
      document.getElementById("verdict-text").innerText = "It's too windy to be on the water";
    }

    else if (isSafe() == "uv") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "sunny";
      document.getElementById("verdict-text").innerText = "Apply sun cream";
    }

    else if (isSafe() == "visibility") {
      document.getElementById("verdict-card").classList.add("card-error");
      document.getElementById("verdict-card").classList.remove("card-success");

      document.getElementById("verdict-icon").innerText = "foggy";
      document.getElementById("verdict-text").innerText = "Visibility is too low to be on the water";
    }

    else {
      document.getElementById("verdict-card").classList.remove("card-error");
      document.getElementById("verdict-card").classList.add("card-success");

      document.getElementById("verdict-icon").innerText = "verified";
      document.getElementById("verdict-text").innerText = "It's safe to be on the water";
    }
  }
);

function isSafe() {
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

    else if (uv > 5) {
      return "uv";
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

    else if (uv > 5) {
      return "uv";
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

    else if (uv > 4) {
      return "uv";
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

    else if (uv > 5) {
      return "uv";
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

    else if (uv > 4) {
      return "uv";
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