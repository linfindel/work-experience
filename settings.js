function setSport(sport) {
  localStorage.setItem("sport", sport);

  document.getElementById("boat").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("jetski").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("surf").style.backgroundColor = "rgba(0, 89, 255, 0.25)";
  document.getElementById("swim").style.backgroundColor = "rgba(0, 89, 255, 0.25)";

  document.getElementById(sport).style.backgroundColor = "rgba(0, 89, 255, 0.5)";
}

document.getElementById(localStorage.getItem("sport")).style.backgroundColor = "rgba(0, 89, 255, 0.5)";