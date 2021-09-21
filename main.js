const $ = str => [...document.querySelectorAll(str)];


class ArrProxy {
  constructor(arr) {
    this.arr = arr;
    this.arrRev = [...this.arr].reverse();
  }
  indexOf(n) {
    if (n < 0) {
      n++;
      return this.arrRev[Math.abs(n) % this.arr.length];
    }
    return this.arr[n % this.arr.length];
  }
}

const main = function () {
  console.log("We have liftoff");
  configureDisplayOptions();
  equipCarousel();
}

function configureDisplayOptions() {
  const navButtons = $("nav button");
  navButtons.forEach(e => e.addEventListener("click", function() {
    activateButton("#"+this.id);
    activatePage(this.id);
  }));

  function activateButton(str) {
    const target = $(str)[0];
    if (target.classList.contains("active")) return;
    $("nav button.active")[0].classList.remove("active");
    target.classList.add("active");
  }
  function activatePage(str) {
    $(".pageContent.active")[0].classList.remove("active");
    $("#"+str+"Page")[0].classList.add("active");
  }
}

function equipCarousel() {
  const imgContainers = $("#photoCarousel .displayImgs");
  const imgPaths = "🌟".repeat(4 - 1).split("🌟")
    .map((e,i) => `${i + 1}.jpg`);
  const pathProxy = new ArrProxy(imgPaths);
  let timesLooped = 0;
  function stepThroughPhotos() {
    for(let i = 0; i < imgContainers.length; i++) {
      const targetContainer = imgContainers[i];
      targetContainer.style.backgroundImage =
      "url(\"./imgs/caroselPhotos/"+
      pathProxy.indexOf(timesLooped - i) +
      // pathProxy.indexOf(i + timesLooped) +
      "\")";
    }
    timesLooped--;
    // timesLooped++;
  }
  let carouselTimer;
  let stopCarousel = false;
  function cyclePhotos() {
    if (stopCarousel)
    return;
    stepThroughPhotos();
    carouselTimer = setTimeout(cyclePhotos, 3000);
  }
  cyclePhotos();
  equipCarouselButtons();
  function equipCarouselButtons() {
    const [backBtn, pauseBtn, nextBtn] = $("#photoCarousel span");
    pauseBtn.addEventListener("click", function () {
      if(stopCarousel) {
        stopCarousel = false;
        this.innerText = "⏸"; //go from play to pause
        cyclePhotos();
      } else {
        stopCarousel = true;
        clearTimeout(carouselTimer);
        carouselTimer = null;
        this.innerText = "⏯";
      }
    });
    nextBtn.addEventListener("click", function() {
      if(!stopCarousel) {
        pauseBtn.click();
      }
      stepThroughPhotos();
    });
    backBtn.addEventListener("click", function() {
      if(!stopCarousel) {
        pauseBtn.click();
      }
      timesLooped += 2;
      // timesLooped -= 2;
      stepThroughPhotos();
    });
  }
}


window.addEventListener("load", main);
