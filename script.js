const page = document.body.dataset.page;

const fillerParagraphs = [
  "Dennis calibrated the glitter engine to exactly 87% sparkle and declared the day productive.",
  "A swirling GIF storm appeared over the navigation bar and nobody panicked because it looked intentional.",
  "Several decorative stars were promoted to executive leadership in charge of vibes.",
  "The site attempted to self-high-five after loading twelve gradients and an unnecessary marquee.",
  "A tiny status icon whispered that everything is under control, then immediately blinked in panic.",
  "This sentence exists mainly to take up visual real estate and justify another glowing border.",
  "An unnamed browser from 2004 would probably wheeze, salute Dennis, and continue rendering anyway.",
  "There are so many animations here that time itself requested a lower frame rate.",
  "In conclusion, Dennis remains undefeated in the ancient art of dramatic web presentation."
];

const tickerLines = [
  ":: Dennis Online ::",
  ":: Civic Fueled ::",
  ":: Guestbook Open ::",
  ":: Mood: MAXIMUM RETRO ::",
  ":: Browsers Confused But Curious ::"
];

function loadFiller() {
  const feed = document.getElementById("fillerFeed");
  if (!feed) return;
  for (let i = 0; i < 28; i += 1) {
    const div = document.createElement("div");
    div.className = "filler-item";
    div.style.animationDelay = `${i * 0.05}s`;
    div.textContent = `${i + 1}. ${fillerParagraphs[i % fillerParagraphs.length]}`;
    feed.appendChild(div);
  }
}

function loadTicker() {
  const stack = document.getElementById("tickerStack");
  if (!stack) return;
  tickerLines.forEach((line, i) => {
    const p = document.createElement("p");
    p.textContent = line;
    p.style.animation = `pulseHard ${0.8 + i * 0.2}s infinite`;
    p.style.margin = "0.2rem 0";
    stack.appendChild(p);
  });
}

function setupCursorTrail() {
  const orbs = Array.from({ length: 12 }, () => {
    const orb = document.createElement("div");
    orb.className = "cursor-orb";
    document.body.appendChild(orb);
    return { orb, x: 0, y: 0 };
  });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    let x = mouseX;
    let y = mouseY;
    orbs.forEach((item, index) => {
      item.x += (x - item.x) * (0.24 - index * 0.013);
      item.y += (y - item.y) * (0.24 - index * 0.013);
      item.orb.style.transform = `translate(${item.x}px, ${item.y}px) scale(${1 - index / 18})`;
      item.orb.style.opacity = `${1 - index / 15}`;
      x = item.x;
      y = item.y;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function setupStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const stars = [];

  const size = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  size();
  window.addEventListener("resize", size);

  for (let i = 0; i < 180; i += 1) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.4
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.y += s.z;
      if (s.y > canvas.height) {
        s.y = -4;
        s.x = Math.random() * canvas.width;
      }
      ctx.fillStyle = `rgba(255,255,255,${0.25 + s.z / 4})`;
      ctx.fillRect(s.x, s.y, s.z, s.z * 2);
    });
    requestAnimationFrame(tick);
  }
  tick();
}

function setupGuestbook() {
  const form = document.getElementById("guestbookForm");
  const entries = document.getElementById("guestbookEntries");
  if (!form || !entries) return;

  const seed = [
    { name: "NeonRaccoon", message: "Dennis this site absolutely rules. My speakers are glowing." },
    { name: "DialUpKnight", message: "Signed while waiting for three GIFs to finish loading." },
    { name: "PixelMagi", message: "May your Honda Civic forever outrun boring design." }
  ];

  const render = (name, message) => {
    const div = document.createElement("div");
    div.className = "entry pop";
    div.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
    entries.prepend(div);
  };

  seed.forEach((entry) => render(entry.name, entry.message));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    render(data.get("name"), data.get("message"));
    form.reset();
  });
}

function setupDownloads() {
  const grid = document.getElementById("downloadGrid");
  const button = document.getElementById("installButton");
  const bar = document.getElementById("progressBar");
  const status = document.getElementById("installStatus");
  if (!grid) return;

  const files = [
    "dennis_wallpaper_pack.zip",
    "ultra_cursor_collection.exe",
    "civic_engine_sounds.mp3",
    "totally_not_virus_toolbar.msi",
    "guestbook_stickers.iso",
    "rainbow_markup_guide.pdf"
  ];

  files.forEach((name, i) => {
    const card = document.createElement("article");
    card.className = "download-card bob";
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `<h3>${name}</h3><p>${(Math.random() * 70 + 4).toFixed(1)} MB</p><button>Download-ish</button>`;
    grid.appendChild(card);
  });

  if (button && bar && status) {
    button.addEventListener("click", () => {
      let progress = 0;
      status.textContent = "Installing nostalgia components...";
      const interval = setInterval(() => {
        progress += Math.random() * 12;
        bar.style.width = `${Math.min(progress, 100)}%`;
        if (progress >= 100) {
          clearInterval(interval);
          status.textContent = "Installation complete. Please reboot your imagination.";
        }
      }, 180);
    });
  }
}

function setupCivicLab() {
  const modList = document.getElementById("modList");
  const revButton = document.getElementById("revButton");
  const rpm = document.getElementById("rpmReadout");
  const speed = document.getElementById("speedReadout");
  const bass = document.getElementById("bassReadout");

  if (!modList) return;

  const mods = [
    "Chrome shift knob with +9 confidence",
    "Fog lights tuned to cinematic blue",
    "Cup holder reinforced for mega slushies",
    "Sticker that says 'Powered by CSS'",
    "Subwoofer calibrated to rattle nearby optimism",
    "Dashboard bobble figure of a tiny wizard"
  ];

  mods.forEach((mod, i) => {
    const li = document.createElement("li");
    li.className = "pop";
    li.style.animationDelay = `${i * 0.12}s`;
    li.textContent = mod;
    modList.appendChild(li);
  });

  if (revButton && rpm && speed && bass) {
    revButton.addEventListener("click", () => {
      const rpmValue = Math.floor(3000 + Math.random() * 5500);
      const speedValue = Math.floor(20 + Math.random() * 80);
      const bassValue = Math.floor(50 + Math.random() * 250);
      rpm.textContent = rpmValue;
      speed.textContent = speedValue;
      bass.textContent = bassValue;
      document.body.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 220, iterations: 2 }
      );
    });
  }
}

function setupChaosButtons() {
  const sparkButton = document.getElementById("sparkButton");
  const chaosButton = document.getElementById("chaosButton");
  const muteButton = document.getElementById("muteButton");

  if (sparkButton) {
    sparkButton.addEventListener("click", () => {
      for (let i = 0; i < 35; i += 1) {
        const spark = document.createElement("div");
        spark.className = "cursor-orb";
        spark.style.left = `${Math.random() * 100}vw`;
        spark.style.top = `${Math.random() * 100}vh`;
        spark.style.background = `hsl(${Math.random() * 360},100%,60%)`;
        spark.style.position = "fixed";
        spark.style.animation = "popIn 0.2s ease, blink 0.8s steps(1) 4";
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1600);
      }
    });
  }

  if (chaosButton) {
    chaosButton.addEventListener("click", () => {
      document.querySelectorAll(".window, .tile, .retro-nav a").forEach((el, i) => {
        el.animate(
          [
            { transform: "translate(0,0) rotate(0deg)" },
            { transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) rotate(${(Math.random() - 0.5) * 6}deg)` },
            { transform: "translate(0,0) rotate(0deg)" }
          ],
          { duration: 450 + i * 10, iterations: 2 }
        );
      });
    });
  }

  if (muteButton) {
    let audioCtx;
    let oscillator;
    let gain;
    let on = false;

    const start = () => {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      oscillator = audioCtx.createOscillator();
      gain = audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = 220;
      gain.gain.value = 0.02;
      oscillator.connect(gain).connect(audioCtx.destination);
      oscillator.start();
    };

    muteButton.addEventListener("click", () => {
      if (!on) {
        start();
        on = true;
        muteButton.textContent = "Mute Bleep Track";
      } else {
        oscillator.stop();
        audioCtx.close();
        on = false;
        muteButton.textContent = "Unmute Bleep Track";
      }
    });
  }
}

loadFiller();
loadTicker();
setupCursorTrail();
setupStarfield();
setupGuestbook();
setupDownloads();
setupCivicLab();
setupChaosButtons();

console.log(`Dennis portal initialized for page: ${page}`);
