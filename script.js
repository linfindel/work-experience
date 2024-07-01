const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9";
const apiURL = `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.371389&longitude=-4.142222`;

fetch(apiURL)
.then(response => response.json())
.then(data => {
    console.log(data);
  }
);