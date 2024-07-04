function setStage(stage) {
  document.getElementById("main").style.opacity = "0";
  document.getElementById("background-vignette").style.filter = "blur(500px)";

  setTimeout(() => {
    if (stage == "lives-saved") {
      document.getElementById("background-vignette").src = "rnli-saving-lives.jpg";
      document.getElementById("next-button").onclick = () => {
        setStage('money-raised')
      }
      
      document.getElementById("main").innerHTML = `
        <div class="card column">
            <h1 class="material-symbols-rounded" style="font-size: 5rem;">support</h1>
            <div class="row">
              <h1>
                <span id="number-lives">146,000</span>
                lives saved
              </h1>
  
              <p>
                108% of the entire population of Exeter
              </p>
            </div>
          </div>
      `;
    }
  
    else if (stage == "money-raised") {
      document.getElementById("background-vignette").src = "rnli-donations.jpg";
      document.getElementById("next-button").onclick = () => {
        setStage('water-deaths')
      }
  
      document.getElementById("main").innerHTML = `
        <div class="card column" onpointermove="setBackgroundVignette('money-raised')">
          <h1 class="material-symbols-rounded" style="font-size: 5rem;">credit_card_heart</h1>
  
          <div class="row">
            <h1>
              £<span id="number-money">38.42</span>
              billion in donations
            </h1>
          </div>
  
          <p>
            211% of China's 2024 GDP
          </p>
        </div>
      `;
    }
  
    else if (stage == "water-deaths") {
      document.getElementById("background-vignette").src = "rnli-deaths.jpg";
      document.getElementById("next-button").onclick = () => {
        setStage('tip1')
      }
  
      document.getElementById("main").innerHTML = `
        <div class="card column" onpointermove="setBackgroundVignette('water-deaths')">
          <h1 class="material-symbols-rounded" style="font-size: 5rem;">deceased</h1>
  
          <div class="row">
            <h1>
              <span id="number-deaths">254</span>
              water-related deaths
            </h1>
          </div>
  
          <p>
            13% increase from previous year
          </p>
        </div>
      `;
    }
  
    else if (stage == "tip1") {
      document.getElementById("background-vignette").src = "rnli-lifeguard.jpg";

      document.getElementById("next-button").onclick = () => {
        setStage('tip2')
      }

      document.getElementById("main").innerHTML = `
        <div class="card column" onpointermove="setBackgroundVignette('water-deaths')">
          <h1 class="material-symbols-rounded" style="font-size: 5rem;">health_and_safety</h1>
  
          <div class="row text-center">
            <h1>
              Stay near the shore and make sure there are lifeguards at the beach
            </h1>
          </div>
        </div>
      `;
    }

    else if (stage == "tip2") {
      document.getElementById("background-vignette").src = "rnli-helicopter.jpg";

      document.getElementById("next-button").onclick = () => {
        setStage('end')
      }

      document.getElementById("main").innerHTML = `
        <div class="card column" onpointermove="setBackgroundVignette('water-deaths')">
          <h1 class="material-symbols-rounded" style="font-size: 5rem;">emergency_share</h1>
  
          <div class="row text-center">
            <h1>
              If you get into trouble, call 999 and ask for the Coastguard
            </h1>
          </div>
        </div>
      `;
    }

    else if (stage == "end") {
      location.href = ".";
    }
  
    document.getElementById("main").style.opacity = "1";
    document.getElementById("background-vignette").style.filter = "blur(5px)";
  }, 500);
}