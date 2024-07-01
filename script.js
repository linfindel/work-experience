const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwYXN0aWxsZXBsYXlzQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InBhc3RpbGxlcGxheXNAZ21haWwuY29tIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWZhMGE4M2IxLWJmOTAtNGFhNi05Y2ExLTg4MzRiZmFiMWQxYSIsImlkIjo1MDUwLCJ1dWlkIjoiODBmMTM5OTAtNzhjNS00NzI4LWE3YzctNTNiOGE2Yzg4YjE1In0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE5ODI0OTk0LCJqdGkiOiIxODY3NDQxNC02MjllLTRmZTQtYWEzNy05NGMxNTA5YmZlZmIifQ==.ab4F8gZs4n0KuAJIE5FOB8a5UIVOcDcLh4ISKK24YHJScgQX0GEqixxEY8t4UMJ6fRTrlBhsAoX84AYli6o_7qDTgUKYQzQ0IjIFioscivMRLU8sh6-w9qr2W59uDQaTIyxANzNRf_wuTxXQfHhWmn8-5Va-2zMh2Z8nkC3KTh2pG1ZzgWnExfkXPWOLVkTwKuSim0EZNlDlrqdQDgU6W06CwyY6Mqk-8fGSGgH_0EUnaKGRzj8957kt-FZPwAK2KTtSuIrGZfEyCpzX_JS4YHIONj1DDammOoUI3O_qJgEPHfawfMLHeyOPUTiDBpJTcBchtcfslwiNvE94VwV3jQ==";
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
    document.getElementById("wind-description").innerText = `${windNormal}mph with gusts of ${windGusts}mph`;

    if (isSafe() == "temp") {
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
  if (temperature < 5 || temperature > 30) {
    return "temp";
  }

  else if (rain > 90) {
    return "rain";
  }

  else if (windNormal > 13 || windGusts > 15) {
    return "wind";
  }

  else if (uv > 5) {
    return "uv";
  }

  else if (visibility < 500) {
    return "visibility";
  }

  else {
    return true;
  }
}