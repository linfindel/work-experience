function setSport(sport) {
  localStorage.setItem("sport", sport);

  document.getElementById("boat").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("jetski").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("paddle").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("surf").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("swim").style.backgroundColor = "rgba(0, 89, 255, 0.25)";

  document.getElementById(sport).style.backgroundColor = "rgba(0, 89, 255, 0.5)";
}

if (localStorage.getItem("sport")) {
  document.getElementById(localStorage.getItem("sport")).style.backgroundColor = "rgba(0, 89, 255, 0.5)";
}
  
const username = 'linfindel';
const repo = 'work-experience';

fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=1`)
  .then(response => {
    const totalCount = response.headers.get('Link').match(/page=(\d+)>; rel="last"/)[1] / 100;
    return response.json().then(data => {
      const latestCommitMessage = data[0].commit.message;

      document.getElementById("version").innerText = `Version ${totalCount.toFixed(2)} Release Notes`;
      document.getElementById("whats-new").innerText = latestCommitMessage;

      document.getElementById("about-card").style.opacity = "1";
      document.getElementById("about-card").style.pointerEvents = "all";
    });
})
.catch(error => console.error('Error fetching data:', error));

// Responsiveness stuff
setInterval(() => {
  if (window.innerWidth < window.innerHeight) {
    // Action button row
    document.getElementById("action-button-row").style.width = "100%";
    document.getElementById("back-button").style.flex = "1";
    document.getElementById("reset-button").style.flex = "1";
  
    // Watersports
    document.getElementById("sport-button-row").style.flexDirection = "column";
  
    document.getElementById("boat").style.width = "calc(90vw - 5rem)";
    document.getElementById("boat").style.borderRadius = "24px";
    document.getElementById("boat").style.borderBottomLeftRadius = "7px";
    document.getElementById("boat").style.borderBottomRightRadius = "7px";
  
    document.getElementById("jetski").style.width = "calc(90vw - 5rem)";
    document.getElementById("jetski").style.borderRadius = "7px";
  
    document.getElementById("paddle").style.width = "calc(90vw - 5rem)";
    document.getElementById("paddle").style.borderRadius = "7px";
  
    document.getElementById("surf").style.width = "calc(90vw - 5rem)";
    document.getElementById("surf").style.borderRadius = "7px";
  
    document.getElementById("swim").style.width = "calc(90vw - 5rem)";
    document.getElementById("swim").style.borderRadius = "24px";
    document.getElementById("swim").style.borderTopLeftRadius = "7px";
    document.getElementById("swim").style.borderTopRightRadius = "7px";
  }

  else {
    // Action button row
    document.getElementById("action-button-row").style.width = "";
    document.getElementById("back-button").style.flex = "";
    document.getElementById("reset-button").style.flex = "";
  
    // Watersports
    document.getElementById("sport-button-row").style.flexDirection = "row";
    document.getElementById("boat").style.width = "";
    document.getElementById("jetski").style.width = "";
    document.getElementById("paddle").style.width = "";
    document.getElementById("surf").style.width = "";
    document.getElementById("swim").style.width = "";
  }
}, 100);