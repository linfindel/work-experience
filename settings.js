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
