const apiKey = "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwYXN0aWxsZXBsYXlzQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InBhc3RpbGxlcGxheXNAZ21haWwuY29tIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWZhMGE4M2IxLWJmOTAtNGFhNi05Y2ExLTg4MzRiZmFiMWQxYSIsImlkIjo1MDUwLCJ1dWlkIjoiODBmMTM5OTAtNzhjNS00NzI4LWE3YzctNTNiOGE2Yzg4YjE1In0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzE5ODI0OTk0LCJqdGkiOiIxODY3NDQxNC02MjllLTRmZTQtYWEzNy05NGMxNTA5YmZlZmIifQ==.ab4F8gZs4n0KuAJIE5FOB8a5UIVOcDcLh4ISKK24YHJScgQX0GEqixxEY8t4UMJ6fRTrlBhsAoX84AYli6o_7qDTgUKYQzQ0IjIFioscivMRLU8sh6-w9qr2W59uDQaTIyxANzNRf_wuTxXQfHhWmn8-5Va-2zMh2Z8nkC3KTh2pG1ZzgWnExfkXPWOLVkTwKuSim0EZNlDlrqdQDgU6W06CwyY6Mqk-8fGSGgH_0EUnaKGRzj8957kt-FZPwAK2KTtSuIrGZfEyCpzX_JS4YHIONj1DDammOoUI3O_qJgEPHfawfMLHeyOPUTiDBpJTcBchtcfslwiNvE94VwV3jQ==";
const apiURL = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.371389&longitude=-4.142222";

fetch(apiURL, {headers: {apikey: apiKey}})
.then(response => response.json())
.then(data => {
    console.log(data.features[0].properties.timeSeries[0]);
  
    let temperature = data.features[0].properties.timeSeries[0].screenTemperature;
    let humidity = data.features[0].properties.timeSeries[0].screenRelativeHumidity;
    let uv = data.features[0].properties.timeSeries[0].uvIndex;
    let rain = data.features[0].properties.timeSeries[0].probOfPrecipitation;

    document.getElementById("temp").innerText = `${temperature} °C`;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("uv").innerText = `${uv}`;
    document.getElementById("rain").innerText = `${rain}%`;

    let windNormal = data.features[0].properties.timeSeries[0].windSpeed10m;
    let windGusts = data.features[0].properties.timeSeries[0].windGustSpeed10m;
    let windDirection = data.features[0].properties.timeSeries[0].windDirectionFrom10m;

    document.getElementById("compass-needle").style.rotate = `${windDirection}deg`;
    document.getElementById("bearing").innerText = `${windDirection}°`;
    document.getElementById("wind-description").innerText = `${windNormal}mph with gusts of ${windGusts}mph`;
  }
);