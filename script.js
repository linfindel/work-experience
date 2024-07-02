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

const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJuYXRoYW5oYWRsZXkucGlnZW9uQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6Im5hdGhhbmhhZGxleS5waWdlb25AZ21haWwuY29tIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLTkxMzQ1MmFiLTZlNWMtNDlhYy05MTRiLTA0Y2EwYTE5YzM3MyIsImlkIjo1MDgzLCJ1dWlkIjoiYzU1MWYwN2QtNjFlMS00YzMxLThiNDgtMmY5ZGY3ZTc3MWI0In0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE5ODU0NzU0LCJqdGkiOiI4NGJmYTQ1YS04MjFhLTQ0YzQtOGZmYi1mMGY2YTMxOTdhOGYifQ==.WZT47H5h8qpENDD7HLHXo2GZUwiaHVQZOS5ns6o6MRSxNqc9O-Cy23rmuZJgyjdke17qGK6XMCieN3dOOwR1Zbu__i7xk-zd3qzQAyuki6HxCx-yfpOVf4PUqDHacp1t-so3R1iSUikPbYYluqYfkduI5ekyk7VI6bxcJOYoy4grO1a8xFuUDidXox7FcxwEY--bkKWxP4SWPEOiYtALrkWodimMktzl-u6Eiw-3JWKVqn-FxGMtx9nZkiwnF_-47_rCT1VpjQPYA0M2UhQwWW__1pfmA8T7dbJTsYl75O5s7ka-ineFc8FC_PCUywtM0tbbysn6GKlFDqorC5ACYA==";

let temperature, humidity, visibility, uv, uvHigh, rain, windNormal, windGusts, windDirection;

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
}

fetchData();

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
  let lat = Math.round(e.latlng.lat);
  let long = Math.round(e.latlng.lng);

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
}, 100);