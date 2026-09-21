
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const cursorGlow = document.getElementById("cursorGlow");

let musicWanted = true;

// Intro / enter experience
enterBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  document.body.classList.remove("locked");
  musicBtn.classList.add("show");

  // Browsers allow audio after a user click. If the MP3 file is present,
  // this starts it. If not, the page still works normally.
  if (musicWanted) {
    try {
      bgMusic.volume = 0.55;
      await bgMusic.play();
      musicBtn.classList.add("playing");
    } catch (_) {
      musicBtn.classList.remove("playing");
    }
  }

  setTimeout(() => intro.remove(), 1200);
});

// Music toggle
musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.classList.add("playing");
      musicWanted = true;
    } catch (_) {}
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
    musicWanted = false;
  }
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Countdown — Cairo / Egypt local time
const eventDate = new Date("2026-10-17T19:00:00+03:00").getTime();

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      '<div style="font-family:Cormorant Garamond,serif;font-size:clamp(44px,7vw,90px);text-align:center;">Tonight is the night ✨</div>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Soft cursor glow on desktop
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// Tiny parallax on large devices
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    document.querySelector(".bg-shape-1").style.transform = `translateY(${y * 0.045}px)`;
    document.querySelector(".bg-shape-2").style.transform = `translateY(${-y * 0.035}px)`;
  });
}

// Magnetic hover
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
