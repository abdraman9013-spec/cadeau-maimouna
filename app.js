(() => {
  const screens = [...document.querySelectorAll(".screen")];
  const progress = document.querySelector("#progress span");
  const order = [
    "intro", "game1", "game2", "gameNext", "game3", "question", "eyes",
    "flowers", "chocolates", "queen", "cake", "dreams", "dreamDetail", "letter", "finale"
  ];

  const dreams = {
    voiture: {
      title: "Ta voiture de rêve",
      text: "La plus belle voiture du monde… avec ton nom dessus. Cadeau imaginaire pour Maimouna.",
      video: "https://www.youtube.com/embed/uqjAfD2xYiU?autoplay=1&rel=0&modestbranding=1"
    },
    maison: {
      title: "Ta maison de rêve",
      text: "Une demeure digne d’une reine. Imagine ton nom sur la porte.",
      video: "https://www.youtube.com/embed/6IwZhvgoPZM?autoplay=1&rel=0&modestbranding=1"
    },
    iphone: {
      title: "Ton iPhone de rêve",
      text: "Le plus beau téléphone… gravé mentalement : MAIMOUNA AZIBERT TAHA.",
      video: "https://www.youtube.com/embed/XHTrLYSh8q4?autoplay=1&rel=0&modestbranding=1"
    },
    voyage: {
      title: "Ton voyage de rêve",
      text: "Des horizons, des lumières, et toi au centre. Le monde t’attend, Maimouna.",
      video: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&rel=0&modestbranding=1"
    },
    bijoux: {
      title: "Tes bijoux de reine",
      text: "Or, diamants, éclat… parce qu’une reine mérite de briller.",
      video: "https://www.youtube.com/embed/f7L97YKqT-4?autoplay=1&rel=0&modestbranding=1"
    },
    bonheur: {
      title: "Ton bonheur infini",
      text: "Le plus beau cadeau : un cœur léger, des jours doux, et quelqu’un qui pense à toi chaque jour.",
      video: "https://www.youtube.com/embed/ZbZSe6N_BXs?autoplay=1&rel=0&modestbranding=1"
    }
  };

  let visitedDreams = 0;

  function go(name) {
    const target = document.querySelector(`[data-screen="${name}"]`);
    if (!target) return;
    screens.forEach((s) => s.classList.remove("active"));
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const idx = Math.max(0, order.indexOf(name));
    const pct = Math.round(((idx + 1) / order.length) * 100);
    progress.style.width = `${pct}%`;
    if (name === "flowers") spawnPetals(36);
    if (name === "cake" || name === "queen" || name === "chocolates") burst();
    if (name !== "dreamDetail") stopVideo();
  }

  function burst() {
    const fx = document.getElementById("fx");
    const el = document.createElement("div");
    el.className = "burst";
    fx.appendChild(el);
    setTimeout(() => el.remove(), 850);
  }

  function spawnPetals(n) {
    const box = document.getElementById("petals");
    box.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${4 + Math.random() * 5}s`;
      p.style.animationDelay = `${Math.random() * 1.5}s`;
      p.style.transform = `scale(${0.7 + Math.random() * 0.8}) rotate(${Math.random() * 60}deg)`;
      box.appendChild(p);
    }
    setTimeout(() => { box.innerHTML = ""; }, 9000);
  }

  function stopVideo() {
    const iframe = document.getElementById("dreamVideo");
    iframe.src = "";
  }

  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      burst();
      go(btn.getAttribute("data-next"));
    });
  });

  // Guess chips
  const chips = document.querySelectorAll("#guessChips .chip");
  const afterGuess = document.getElementById("afterGuess");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("selected"));
      chip.classList.add("selected");
      afterGuess.classList.remove("hidden");
      burst();
    });
  });

  // Dreams
  const toLetter = document.getElementById("toLetter");
  document.querySelectorAll(".dream").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-dream");
      const data = dreams[key];
      if (!data) return;
      document.getElementById("dreamEyebrow").textContent = "Waouh — cadeau rêve";
      document.getElementById("dreamTitle").textContent = data.title;
      document.getElementById("dreamText").textContent = data.text;
      document.getElementById("dreamVideo").src = data.video;
      visitedDreams += 1;
      if (visitedDreams >= 2) {
        toLetter.classList.remove("hidden");
        toLetter.textContent = "Lire le message d’AAG →";
      } else {
        toLetter.classList.remove("hidden");
        toLetter.textContent = "Explore encore un rêve… ou lis le message →";
      }
      burst();
      go("dreamDetail");
    });
  });

  document.getElementById("backDreams").addEventListener("click", () => {
    stopVideo();
    go("dreams");
  });
  document.getElementById("moreDreams").addEventListener("click", () => {
    stopVideo();
    go("dreams");
  });

  // Eyes long press feel
  const eyesBtn = document.getElementById("eyesBtn");
  eyesBtn.addEventListener("click", () => spawnPetals(20));

  // Initial progress
  progress.style.width = `${Math.round((1 / order.length) * 100)}%`;
})();
