if (!localStorage.getItem("api-url")) {
  localStorage.setItem("api-url", "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.371389&longitude=-4.142222");
}

if (!localStorage.getItem("lat")) {
  localStorage.setItem("lat", 50.371389);
}

if (!localStorage.getItem("long")) {
  localStorage.setItem("long", -4.142222);
}

fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${localStorage.getItem("lat")}&longitude=${localStorage.getItem("long")}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  let backupCoords = `${localStorage.getItem("lat")}, ${localStorage.getItem("long")}`;

  document.title = `Conditions in ${data.city || data.countryName || backupCoords}`
  document.getElementById("title").innerText = `Conditions in ${data.city || data.countryName || backupCoords}`

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data.city || data.countryName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.originalimage) {
        localStorage.setItem("has-image", "yes");

        document.getElementById("img").src = data.originalimage.source;

        document.getElementById("map").style.borderTopRightRadius = "7px";
        document.getElementById("map").style.borderBottomRightRadius = "7px";
      }

      else {
        localStorage.setItem("has-image", "no");

        document.getElementById("img").src = "";

        document.getElementById("map").style.borderTopRightRadius = "24px";
        document.getElementById("map").style.borderBottomRightRadius = "24px";
      }
    });;
});

const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJuYXRoYW5oYWRsZXkucGlnZW9uQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6Im5hdGhhbmhhZGxleS5waWdlb25AZ21haWwuY29tIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLTkxMzQ1MmFiLTZlNWMtNDlhYy05MTRiLTA0Y2EwYTE5YzM3MyIsImlkIjo1MTA5LCJ1dWlkIjoiMDJiY2U5NjMtZjM0MS00ZjQ0LThhYjktNzFkZGExMjBjM2E4In0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE5OTI2NTg5LCJqdGkiOiIyOWM4YTIwMS03OGNiLTQxOTktOGI5YS0yOGVjYjY4ZDUxZTQifQ==.E9J3H1xjitaw6cgpRxJAhUIEF7D-C2SYVBSlJdPlRBvy2BaXUm2IVIJBFR0WAP3a6pm_dJbNzp017RCeu7m6F4Im3IeuSV95lKaWGVFVmVmYfCKjXY5cYTQC5rq4DvIYOCDjxl9gr4yCZ67enaHD1ctJb1FoQncsIHUSp9T_DjN3z2FaPgvvCchXSXzAymdvVGBcmOy-5_jo9Hf_2Mn5t41le4IElgLn90q2cQzGnIAbKvC05C3IkANL_kZUWcSg7NksC3v_aTmOkNxX66mQrmazV9gpn3d0lRh1zDIhUA5xr8nqUxRKA0am2stJ3z2s4MobGHIoLb4Xpo1W4GelDg==";

let temperature, humidity, visibility, uv, uvHigh, rain, windNormal, windGusts, windDirection;

const weatherCodeIcons = {
  0: "bedtime",
  1: "sunny",
  2: "partly_cloudy_night",
  3: "partly_cloudy_day",
  5: "mist",
  6: "foggy",
  7: "cloud",
  8: "foggy",
  9: "rainy_light",
  10: "rainy_light",
  11: "rainy_light",
  12: "rainy_light",
  13: "rainy_heavy",
  14: "rainy_heavy",
  15: "rainy_heavy",
  16: "rainy_snow",
  17: "rainy_snow",
  18: "rainy_snow",
  19: "weather_hail",
  20: "weather_hail",
  21: "weather_hail",
  22: "cloudy_snowing",
  23: "cloudy_snowing",
  24: "cloudy_snowing",
  25: "rainy_snow",
  26: "rainy_snow",
  27: "rainy_snow",
  28: "thunderstorm",
  29: "thunderstorm",
  30: "thunderstorm"
}


function fetchData() {
  fetch(localStorage.getItem("api-url"), {headers: {apikey: apiKey}})
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

        if (temperature > 40) {
          document.getElementById("verdict-icon").innerText = "emergency_heat";
          document.getElementById("verdict-text").innerText = "It's too hot to be outside";

          document.getElementById("temp-text").innerHTML += "<br> Stay indoors";
        }
        
        else if (temperature > 30) {
          document.getElementById("verdict-icon").innerText = "emergency_heat";
          document.getElementById("verdict-text").innerText = "It's too hot to be on the water";

          document.getElementById("temp-text").innerHTML += "<br> Drink water";
        }

        else if (temperature < 5) {
          document.getElementById("verdict-icon").innerText = "severe_cold";
          document.getElementById("verdict-text").innerText = "It's too cold to be on the water";

          document.getElementById("temp-text").innerHTML += "<br> Wrap up warm";
        }

        document.getElementById("temp-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
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

        document.getElementById("visibility-card").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        document.getElementById("visibility-text").innerHTML += "<br> Keep the shore in sight";
      }

      else {
        document.getElementById("verdict-card").classList.remove("card-error");
        document.getElementById("verdict-card").classList.add("card-success");

        document.getElementById("verdict-icon").innerText = "verified";
        document.getElementById("verdict-text").innerText = "It's safe to be on the water";
      }
    }
  );

  fetch(localStorage.getItem("api-url").replace("hourly", "daily"), {headers: {apikey: apiKey}})
  .then(response => response.json())
  .then(data => {
    for (let index = 1; index <= 8; index++) {
      let code = getWeatherDescription(data.features[0].properties.timeSeries[index].daySignificantWeatherCode);

      document.getElementById(`day${index}-icon`).innerText = weatherCodeIcons[data.features[0].properties.timeSeries[index].daySignificantWeatherCode];
      document.getElementById(`day${index}-description`).innerText = code;
      document.getElementById(`day${index}-date`).innerText = data.features[0].properties.timeSeries[index].time.replace("T00:00Z", "");       
    }
  })
}

fetchData();

function getWeatherDescription(code) {
  let description = '';

  if (code === -1) {
      description = "Trace rain";
  } else if (code === 0) {
      description = "Clear night";
  } else if (code === 1) {
      description = "Sunny day";
  } else if (code === 2) {
      description = "Partly cloudy";
  } else if (code === 3) {
      description = "Partly cloudy";
  } else if (code === 4) {
      description = "Not used";
  } else if (code === 5) {
      description = "Mist";
  } else if (code === 6) {
      description = "Fog";
  } else if (code === 7) {
      description = "Cloudy";
  } else if (code === 8) {
      description = "Overcast";
  } else if (code === 9) {
      description = "Light rain shower";
  } else if (code === 10) {
      description = "Light rain shower";
  } else if (code === 11) {
      description = "Drizzle";
  } else if (code === 12) {
      description = "Light rain";
  } else if (code === 13) {
      description = "Heavy rain shower";
  } else if (code === 14) {
      description = "Heavy rain shower";
  } else if (code === 15) {
      description = "Heavy rain";
  } else if (code === 16) {
      description = "Sleet shower";
  } else if (code === 17) {
      description = "Sleet shower";
  } else if (code === 18) {
      description = "Sleet";
  } else if (code === 19) {
      description = "Hail shower";
  } else if (code === 20) {
      description = "Hail shower";
  } else if (code === 21) {
      description = "Hail";
  } else if (code === 22) {
      description = "Light snow shower";
  } else if (code === 23) {
      description = "Light snow shower";
  } else if (code === 24) {
      description = "Light snow";
  } else if (code === 25) {
      description = "Heavy snow shower";
  } else if (code === 26) {
      description = "Heavy snow shower";
  } else if (code === 27) {
      description = "Heavy snow";
  } else if (code === 28) {
      description = "Thunder shower";
  } else if (code === 29) {
      description = "Thunder shower";
  } else if (code === 30) {
      description = "Thunder";
  } else {
      description = "Unknown weather code";
  }

  return description;
}

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
  
    else if (visibility < 3) {
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
  
    else if (visibility < 1) {
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
  
    else if (visibility < 0.5) {
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
  
    else if (visibility < 0.1) {
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
  
    else if (visibility < 0.5) {
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

  document.getElementById("verdict-card").onmouseenter = () => {
    document.getElementById("settings-button").style.boxShadow = "0px 0px 0px 2px white";
  }

  document.getElementById("verdict-card").onmouseleave = () => {
    document.getElementById("settings-button").style.boxShadow = "";
  }

  document.getElementById("verdict-icon").innerText = "warning";
  document.getElementById("verdict-icon").style.fontSize = "2.5rem";

  document.getElementById("verdict-text").innerText = "For safety advice, set a watersport in the settings";
  document.getElementById("verdict-text").style.fontSize = "1.5rem";
}

var map = L.map("map").setView([localStorage.getItem("lat"), localStorage.getItem("long")], 5);

L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let latlong  = {
  lat: localStorage.getItem("lat") || 50.371389,
  lng: localStorage.getItem("long") || -4.142222
}

L.marker(latlong).addTo(map);

map.on('click', function(e){
  let lat = e.latlng.lat;
  let long = e.latlng.lng;

  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);

  localStorage.setItem("api-url", `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${lat}&longitude=${long}`);

  location.reload();
});

// Responsiveness stuff
setInterval(() => {
  if (window.innerWidth < window.innerHeight) {
    // Button
    document.getElementById("action-button-row").style.width = "100%";
    document.getElementById("settings-button").style.flex = "1";
  
    // Map and image section
    document.getElementById("map").style.width = "90vw";
    document.getElementById("map").style.borderRadius = "24px";
    
    document.getElementById("map").style.borderBottomLeftRadius = "7px";
    document.getElementById("map").style.borderBottomRightRadius = "7px";
  
    document.getElementById("img").style.width = "90vw";
    document.getElementById("img").style.borderRadius = "24px";
    document.getElementById("img").style.borderTopLeftRadius = "7px";
    document.getElementById("img").style.borderTopRightRadius = "7px";
  
    // Stats section
    document.getElementById("verdict-card").style.width = "calc(90vw - 5rem)";
  
    document.getElementById("stats-row").style.flexDirection = "column";
  
    document.getElementById("temp-card").style.width = "calc(90vw - 5rem)";
    document.getElementById("temp-card").style.borderRadius = "24px";
    document.getElementById("temp-card").style.borderBottomLeftRadius = "7px";
    document.getElementById("temp-card").style.borderBottomRightRadius = "7px";
  
    document.getElementById("humidity-card").style.width = "calc(90vw - 5rem)";
    document.getElementById("humidity-card").style.borderRadius = "7px";
  
    document.getElementById("visibility-card").style.width = "calc(90vw - 5rem)";
    document.getElementById("visibility-card").style.borderRadius = "7px";
  
    document.getElementById("uv-card").style.width = "calc(90vw - 5rem)";
    document.getElementById("uv-card").style.borderRadius = "7px";
  
    document.getElementById("rain-card").style.width = "calc(90vw - 5rem)";
    document.getElementById("rain-card").style.borderRadius = "24px";
    document.getElementById("rain-card").style.borderTopLeftRadius = "7px";
    document.getElementById("rain-card").style.borderTopRightRadius = "7px";
  
    document.getElementById("wind-card").style.width = "calc(90vw - 5rem)";
  }

  else {
    // Button
    document.getElementById("action-button-row").style.width = "";
    document.getElementById("settings-button").style.flex = "";
  
    // Map and image section
    document.getElementById("map").style.width = "50vw";
    document.getElementById("map").style.borderRadius = "24px";
    
    if (localStorage.getItem("has-image") == "yes") {
      document.getElementById("map").style.borderTopRightRadius = "7px";
      document.getElementById("map").style.borderBottomRightRadius = "7px";
    }

    else {
      document.getElementById("map").style.borderTopRightRadius = "24px";
      document.getElementById("map").style.borderBottomRightRadius = "24px";
    }
  
    document.getElementById("img").style.width = "";
    document.getElementById("img").style.borderRadius = "24px";
    document.getElementById("img").style.borderTopLeftRadius = "7px";
    document.getElementById("img").style.borderBottomLeftRadius = "7px";
  
    // Stats section
    document.getElementById("verdict-card").style.width = "";
  
    document.getElementById("stats-row").style.flexDirection = "row";
  
    document.getElementById("temp-card").style.width = "";
    document.getElementById("humidity-card").style.width = "";
    document.getElementById("visibility-card").style.width = "";
    document.getElementById("uv-card").style.width = "";
    document.getElementById("rain-card").style.width = "";
    document.getElementById("wind-card").style.width = "";
  }

  if (document.getElementById("forecast-row").scrollWidth <= document.getElementById("forecast-row").clientWidth) {
    document.getElementById("forecast-row").style.justifyContent = "center";
  }
}, 100);