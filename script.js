const page = document.body.dataset.page;

const filler = [
  "Dennis adjusted the neon setting until the walls of cyberspace started humming.",
  "The Civic accepted another playlist and gained +4 horsepower in spirit.",
  "A bouncing button escaped containment and now roams the sidebar.",
  "Someone asked if this was too much animation. Dennis said not enough.",
  "The message board now archives legends and mildly cursed opinions.",
  "This paragraph exists to make the page even denser. Mission complete."
];

const civicFacts = [
  "The 2001 Civic is from the seventh generation and known for reliability.",
  "Many 2001 Civics used the D17 engine family with efficient fuel economy.",
  "Manual transmission variants are especially loved by tuner communities.",
  "The Civic's compact size made it practical and fun to modify.",
  "Aftermarket support for this era of Civic remains huge.",
  "Dennis claims wax adds at least +2 style points per coat.",
  "Cup holders in this Civic are rated for elite slushie operations.",
  "The sound system can allegedly summon nostalgic energy on command."
];

function fillFeed() {
  const feed = document.getElementById("fillerFeed");
  if (!feed) return;
  for (let i = 0; i < 32; i += 1) {
    const item = document.createElement("div");
    item.className = "filler-item";
    item.style.animationDelay = `${i * 0.03}s`;
    item.textContent = `${i + 1}. ${filler[i % filler.length]}`;
    feed.appendChild(item);
  }
}

function ticker() {
  const el = document.getElementById("tickerStack");
  if (!el) return;
  [":: MOUSE TRAIL READY ::", ":: REV PAGE ONLINE ::", ":: ARCADE MODE ENABLED ::"].forEach((t, i) => {
    const p = document.createElement("p");
    p.textContent = t;
    p.style.animation = `pulse ${0.8 + i * 0.2}s infinite`;
    el.appendChild(p);
  });
}

function cursorTrail() {
  const dots = Array.from({ length: 14 }, () => {
    const d = document.createElement("div");
    d.className = "cursor-orb";
    document.body.appendChild(d);
    return { d, x: innerWidth / 2, y: innerHeight / 2 };
  });
  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  const run = () => {
    let x = mx;
    let y = my;
    dots.forEach((o, i) => {
      o.x += (x - o.x) * (0.24 - i * 0.01);
      o.y += (y - o.y) * (0.24 - i * 0.01);
      o.d.style.transform = `translate(${o.x}px,${o.y}px) scale(${1 - i / 16})`;
      o.d.style.opacity = `${1 - i / 14}`;
      x = o.x;
      y = o.y;
    });
    requestAnimationFrame(run);
  };
  run();
}

function sky() {
  const c = document.getElementById("skyCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  const stars = Array.from({ length: 220 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, s: Math.random() * 2 + 0.5 }));
  const resize = () => {
    c.width = innerWidth;
    c.height = innerHeight;
  };
  resize();
  addEventListener("resize", resize);
  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach((st) => {
      st.y += st.s;
      if (st.y > c.height) {
        st.y = -2;
        st.x = Math.random() * c.width;
      }
      ctx.fillStyle = `rgba(255,255,255,${0.2 + st.s / 4})`;
      ctx.fillRect(st.x, st.y, st.s, st.s * 2);
    });
    requestAnimationFrame(draw);
  };
  draw();
}

function chaosButtons() {
  const spark = document.getElementById("sparkButton");
  const chaos = document.getElementById("chaosButton");
  const pulse = document.getElementById("themePulseButton");

  spark?.addEventListener("click", () => {
    for (let i = 0; i < 45; i += 1) {
      const s = document.createElement("div");
      s.className = "cursor-orb";
      s.style.left = `${Math.random() * 100}vw`;
      s.style.top = `${Math.random() * 100}vh`;
      s.style.background = `hsl(${Math.random() * 360},100%,60%)`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  });

  chaos?.addEventListener("click", () => {
    document.querySelectorAll(".card,.tile,.retro-nav a,button").forEach((el, i) => {
      el.animate([{ transform: "translate(0,0) rotate(0)" }, { transform: `translate(${(Math.random() - .5) * 30}px,${(Math.random() - .5) * 30}px) rotate(${(Math.random() - .5) * 10}deg)` }, { transform: "translate(0,0)" }], { duration: 450 + i * 5, iterations: 2 });
    });
  });

  pulse?.addEventListener("click", () => {
    const h = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty("--bg1", `hsl(${h},80%,14%)`);
    document.documentElement.style.setProperty("--bg2", `hsl(${(h + 120) % 360},85%,15%)`);
    document.documentElement.style.setProperty("--c1", `hsl(${(h + 40) % 360},100%,64%)`);
    document.documentElement.style.setProperty("--c2", `hsl(${(h + 180) % 360},100%,70%)`);
  });
}

function setupCivicFacts() {
  const list = document.getElementById("factList");
  const btn = document.getElementById("newFactButton");
  const out = document.getElementById("factOutput");
  if (!list) return;
  civicFacts.forEach((f, i) => {
    const li = document.createElement("li");
    li.textContent = f;
    li.style.animationDelay = `${i * 0.08}s`;
    list.appendChild(li);
  });
  btn?.addEventListener("click", () => {
    out.textContent = civicFacts[Math.floor(Math.random() * civicFacts.length)];
    out.animate([{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 280 });
  });
}

function setupMessageBoard() {
  const form = document.getElementById("guestbookForm");
  const feed = document.getElementById("guestbookEntries");
  if (!form || !feed) return;

  const key = "dennis-board-v2";
  const seed = [
    { id: crypto.randomUUID(), name: "TurboPigeon", category: "Civic Talk", message: "Rev page is wild.", likes: 2, ts: Date.now() - 500000 },
    { id: crypto.randomUUID(), name: "CRTWizard", category: "Web Chaos", message: "This color palette punches in a good way.", likes: 4, ts: Date.now() - 300000 }
  ];

  const getPosts = () => JSON.parse(localStorage.getItem(key) || "null") || seed;
  let posts = getPosts();
  let activeFilter = "All";

  const save = () => localStorage.setItem(key, JSON.stringify(posts));

  const render = () => {
    feed.innerHTML = "";
    posts
      .filter((p) => activeFilter === "All" || p.category === activeFilter)
      .sort((a, b) => b.ts - a.ts)
      .forEach((p) => {
        const card = document.createElement("div");
        card.className = "entry";
        card.innerHTML = `<div class="meta"><strong>${p.name}</strong> • ${p.category} • ${new Date(p.ts).toLocaleString()}</div><p>${p.message}</p><div class="button-row"><button data-like="${p.id}">Like (${p.likes})</button><button data-delete="${p.id}">Delete</button></div>`;
        feed.appendChild(card);
      });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    posts.push({ id: crypto.randomUUID(), name: data.get("name"), category: data.get("category"), message: data.get("message"), likes: 0, ts: Date.now() });
    save();
    render();
    form.reset();
  });

  feed.addEventListener("click", (e) => {
    const likeId = e.target.getAttribute("data-like");
    const delId = e.target.getAttribute("data-delete");
    if (likeId) posts = posts.map((p) => (p.id === likeId ? { ...p, likes: p.likes + 1 } : p));
    if (delId) posts = posts.filter((p) => p.id !== delId);
    save();
    render();
  });

  document.querySelectorAll(".filter").forEach((b) => {
    b.addEventListener("click", () => {
      activeFilter = b.dataset.filter;
      render();
    });
  });

  render();
}

function setupDownloads() {
  const grid = document.getElementById("downloadGrid");
  const install = document.getElementById("installButton");
  const bar = document.getElementById("progressBar");
  const status = document.getElementById("installStatus");
  if (!grid) return;
  ["civic-skins-pack.zip", "hypercursor.exe", "guestbook-stamps.iso", "dennis-ringtone.mp3"].forEach((f) => {
    const d = document.createElement("div");
    d.className = "download-card";
    d.innerHTML = `<h3>${f}</h3><p>${(Math.random() * 90 + 8).toFixed(1)} MB</p><button>Download-ish</button>`;
    grid.appendChild(d);
  });
  install?.addEventListener("click", () => {
    let p = 0;
    status.textContent = "Compiling turbo nostalgia...";
    const t = setInterval(() => {
      p += Math.random() * 10;
      bar.style.width = `${Math.min(p, 100)}%`;
      if (p >= 100) {
        clearInterval(t);
        status.textContent = "Install complete. Please restart your vibes.";
      }
    }, 160);
  });
}

function setupRevPage() {
  const throttle = document.getElementById("throttle");
  const rpm = document.getElementById("rpmReadout");
  const speed = document.getElementById("speedReadout");
  const gear = document.getElementById("gearReadout");
  const rev = document.getElementById("revButton");
  const launch = document.getElementById("launchButton");
  const bar = document.getElementById("rpmBar");
  const log = document.getElementById("revLog");
  const img = document.getElementById("revCarImage");
  if (!throttle || !rpm || !speed || !gear || !bar) return;

  let currentGear = "N";
  let audio;
  let osc;
  let gain;

  const update = (boost = 1) => {
    const t = Number(throttle.value);
    const gearFactor = currentGear === "N" ? 0.2 : Number(currentGear) * 0.45;
    const rpmV = Math.floor(900 + t * 65 * boost + gearFactor * 700);
    const spd = currentGear === "N" ? 0 : Math.floor(t * 0.7 + Number(currentGear) * 12 * boost);
    rpm.textContent = rpmV;
    speed.textContent = spd;
    bar.style.width = `${Math.min((rpmV / 8200) * 100, 100)}%`;
    img?.animate([{ transform: "translateX(0)" }, { transform: "translateX(-3px)" }, { transform: "translateX(3px)" }, { transform: "translateX(0)" }], { duration: 160, iterations: 1 });
    if (osc) osc.frequency.value = 120 + rpmV / 22;
  };

  throttle.addEventListener("input", () => update());
  document.querySelectorAll(".gear").forEach((g) => g.addEventListener("click", () => {
    currentGear = g.dataset.gear;
    gear.textContent = currentGear;
    update();
  }));

  rev?.addEventListener("click", () => {
    update(1.45);
    const row = document.createElement("div");
    row.className = "entry";
    row.textContent = `Rev at ${new Date().toLocaleTimeString()} | Gear ${currentGear} | RPM ${rpm.textContent}`;
    log?.prepend(row);
  });

  launch?.addEventListener("click", () => {
    let step = 0;
    const seq = setInterval(() => {
      throttle.value = String((step % 10) * 10 + 10);
      update(1.2);
      step += 1;
      if (step > 12) clearInterval(seq);
    }, 240);
  });

  rev?.addEventListener("mousedown", () => {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    osc = audio.createOscillator();
    gain = audio.createGain();
    gain.gain.value = 0.03;
    osc.type = "sawtooth";
    osc.connect(gain).connect(audio.destination);
    osc.start();
  });
  rev?.addEventListener("mouseup", () => {
    if (osc) osc.stop();
    if (audio) audio.close();
    osc = null;
    audio = null;
  });

  update();
}

function setupGames() {
  const start = document.getElementById("startGame");
  const arena = document.getElementById("gameArena");
  const target = document.getElementById("target");
  const scoreEl = document.getElementById("gameScore");
  const timeEl = document.getElementById("gameTime");
  const qEl = document.getElementById("triviaQ");
  const aEl = document.getElementById("triviaAnswers");
  const result = document.getElementById("triviaResult");

  if (start && arena && target && scoreEl && timeEl) {
    let score = 0;
    let time = 20;
    let timer;
    const move = () => {
      target.style.left = `${Math.random() * (arena.clientWidth - 100)}px`;
      target.style.top = `${Math.random() * (arena.clientHeight - 50)}px`;
    };
    target.addEventListener("click", () => {
      score += 1;
      scoreEl.textContent = score;
      move();
    });
    start.addEventListener("click", () => {
      score = 0;
      time = 20;
      scoreEl.textContent = score;
      timeEl.textContent = time;
      clearInterval(timer);
      move();
      timer = setInterval(() => {
        time -= 1;
        timeEl.textContent = time;
        move();
        if (time <= 0) {
          clearInterval(timer);
          alert(`Round over! Score: ${score}`);
        }
      }, 1000);
    });
  }

  if (qEl && aEl && result) {
    const questions = [
      { q: "Which model year is Dennis's Civic?", a: ["1998", "2001", "2008"], correct: "2001" },
      { q: "What is most important on this site?", a: ["Minimalism", "Animations", "Silence"], correct: "Animations" }
    ];
    let idx = 0;
    const show = () => {
      const current = questions[idx % questions.length];
      qEl.textContent = current.q;
      aEl.innerHTML = "";
      current.a.forEach((opt) => {
        const b = document.createElement("button");
        b.textContent = opt;
        b.addEventListener("click", () => {
          result.textContent = opt === current.correct ? "Correct! +100 Dennis points" : "Nope. Try next.";
          idx += 1;
          setTimeout(show, 500);
        });
        aEl.appendChild(b);
      });
    };
    show();
  }
}

fillFeed();
ticker();
cursorTrail();
sky();
chaosButtons();
setupCivicFacts();
setupMessageBoard();
setupDownloads();
setupRevPage();
setupGames();
console.log(`Loaded page: ${page}`);
