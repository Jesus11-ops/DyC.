/* ============================
  Proyecto: Invitación - David & Carolina
  Notas:
    - Reemplaza las imágenes placeholder_photo.jpg, photo1.jpg, photo2.jpg, photo3.jpg
      por tus imágenes reales.
    - Reemplaza 'cancion.mp3' en el <audio> del HTML por tu MP3 cuando lo subas.
    - Para WhatsApp: modifica PHONE_BRIDE y PHONE_GROOM abajo (formato internacional, ej 573001234567)
============================ */

/* ---------- Typing intro & flow ---------- */
const introScreen = document.getElementById('introScreen');
const typingEl = document.getElementById('typing');

const cover = document.getElementById('cover');
const envelope = document.getElementById('envelope');
const app = document.getElementById('app');

const particlesCanvas = document.getElementById('particlesCanvas');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');

const mainPhoto = document.getElementById('mainPhoto');

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const track = document.getElementById('track');

const modal = document.getElementById('modal');
const editBtn = document.getElementById('editBtn');
const editForm = document.getElementById('editForm');
const msgInput = document.getElementById('msgInput');
const saveMsg = document.getElementById('saveMsg');
const closeModal = document.getElementById('closeModal');

const toBride = document.getElementById('toBride');
const toGroom = document.getElementById('toGroom');
const rsvpForm = document.getElementById('rsvpForm');
const sendWhats = document.getElementById('sendWhats');
const guestName = document.getElementById('guestName');
const guestSong = document.getElementById('guestSong'); // NUEVO CAMPO

const guestMsg = document.getElementById('guestMsg');

/* ====== CONFIG WHATSAPP (REEMPLAZAR) ====== */
const PHONE_BRIDE = "3045309913";   // ej: 573001234567
const PHONE_GROOM = "3013556224";  // ej: 573001234567

/* ---------- typing effect / initial display ---------- */
if (introScreen && typingEl) {
  const phrase = "Nuestra Boda — David & Carolina";
  let i = 0;
  function typeWriter() {
    if (i < phrase.length) {
      typingEl.textContent += phrase.charAt(i);
      typingEl.style.opacity = 1;
      i++;
      setTimeout(typeWriter, 48);
    } else {
      // show hint
      document.querySelector('.intro-hint').style.opacity = 1;
    }
  }
  typeWriter();

  /* ---------- intro tap to continue ---------- */
  introScreen.addEventListener('click', () => {
    introScreen.style.transition = 'opacity .6s ease';
    introScreen.style.opacity = 0;
    setTimeout(() => {
      introScreen.style.display = 'none';
      // show cover (sobre)
      cover.classList.remove('hidden');
      cover.classList.add('fade-in');
      // seal pop animation (brief delay so it feels natural on enter)
      setTimeout(() => document.querySelector('.wax-seal')?.classList.add('pop'), 280);
    }, 650);
  });

} else {
  // If the intro screen is not present (we removed it from the HTML),
  // show the cover immediately so the envelope is visible on page load.
  cover.classList.remove('hidden');
  cover.classList.add('fade-in');
  // animate seal on immediate load
  setTimeout(() => document.querySelector('.wax-seal')?.classList.add('pop'), 180);
}

/* ---------- envelope pointer-follow shine ---------- */
envelope.addEventListener('mousemove', (e) => {
  const rect = envelope.getBoundingClientRect();
  const mx = ((e.clientX - rect.left) / rect.width) * 100;
  const my = ((e.clientY - rect.top) / rect.height) * 100;
  envelope.style.setProperty('--mx', mx + '%');
  envelope.style.setProperty('--my', my + '%');
});

/* ---------- open envelope animation -> show app ---------- */
function openEnvelope() {
  envelope.classList.add('open');
  // small delay to sync
  setTimeout(() => {
    cover.style.transition = 'opacity .6s ease';
    cover.style.opacity = 0;
    setTimeout(() => {
      cover.style.display = 'none';
      app.classList.remove('hidden');
      app.setAttribute('aria-hidden','false');
      // launch particles gently
      startParticles();
    }, 500);
  }, 420);
}
envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openEnvelope(); });

/* ---------- music play/pause ---------- */
let playing = false;
if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(()=>{});
      playBtn.textContent = 'Pausar canción ⏸';
      playing = true;
    } else {
      audio.pause();
      playBtn.textContent = '🎵 Dale play a nuestra canción';
      playing = false;
    }
  });
}

/* ---------- change photo (local preview) ---------- */
// Photo controls removed — the main photo is now fixed and should be replaced
// by placing your desired image file into the project and updating the
// <img id="mainPhoto" src="..."> value in `index.html`.

/* ---------- countdown ---------- */
const targetDate = new Date(2025,11,27,9,0,0).getTime(); // diciembre = 11
function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;
  if (diff <= 0) {
    cdDays.textContent = 0; cdHours.textContent = 0; cdMins.textContent = 0; cdSecs.textContent = 0;
    return;
  }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  cdDays.textContent = days;
  cdHours.textContent = String(hours).padStart(2,'0');
  cdMins.textContent = String(mins).padStart(2,'0');
  cdSecs.textContent = String(secs).padStart(2,'0');

  // small pop effect on seconds
  const secCard = document.getElementById('cd-secs').parentElement;
  secCard && (secCard.style.transform = 'scale(1.06)');
  setTimeout(()=>{ secCard && (secCard.style.transform = 'scale(1)') }, 120);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- carousel prev/next (smooth scroll) ---------- */
if (prevBtn && nextBtn && track) {
  const slideW = () => track.querySelector('.slide')?.clientWidth + 12 || 252;
  prevBtn.addEventListener('click', () => track.scrollBy({left: -slideW(), behavior:'smooth'}));
  nextBtn.addEventListener('click', () => track.scrollBy({left: slideW(), behavior:'smooth'}));
}

/* ---------- modal edit message ---------- */
editBtn && editBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  editForm.classList.remove('hidden');
  rsvpForm && rsvpForm.classList.add('hidden');
  msgInput.value = document.getElementById('welcomeText').textContent;
});
closeModal && closeModal.addEventListener('click', () => modal.classList.add('hidden'));
saveMsg && saveMsg.addEventListener('click', (e) => {
  e.preventDefault();
  const v = msgInput.value.trim();
  if (v) document.getElementById('welcomeText').textContent = v;
  modal.classList.add('hidden');
});

/* ---------- RSVP via WhatsApp (opens wa.me link) ---------- */
let currentRecipient = null;
toBride && toBride.addEventListener('click', ()=> { currentRecipient = PHONE_BRIDE; openRSVPModal('Enviar a la novia'); });
toGroom && toGroom.addEventListener('click', ()=> { currentRecipient = PHONE_GROOM; openRSVPModal('Enviar al novio'); });

function openRSVPModal(title){
  modal.classList.remove('hidden');
  editForm && editForm.classList.add('hidden');
  rsvpForm && rsvpForm.classList.remove('hidden');
  document.getElementById('rsvpTitle').textContent = title;
}

sendWhats && sendWhats.addEventListener('click', (e) => {
  e.preventDefault();
  if (!currentRecipient || currentRecipient.includes('PHONE_')) {
    alert('Por favor edita script.js y coloca el número real de la novia/novio (PHONE_BRIDE / PHONE_GROOM).');
    return;
  }
  const name = guestName.value.trim() || 'Invitado';
const song = guestSong.value.trim() || 'Sin canción favorita';
const message = guestMsg.value.trim() || '';

const text = `Dios te bendiga! Soy ${encodeURIComponent(name)}.%0AQuiero escuchar: ${encodeURIComponent(song)}%0AMensaje: ${encodeURIComponent(message)}`;

  const url = `https://wa.me/${currentRecipient}?text=${text}`;
  window.open(url, '_blank');
  modal.classList.add('hidden');
});

/* ---------- PARTICLES (gold bokeh) ---------- */
function startParticles(){
  const c = particlesCanvas;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;
  const particles = [];
  const colors = ['rgba(255, 223, 120, 0.12)','rgba(255, 198, 68, 0.10)','rgba(255, 236, 179, 0.12)'];
  /*const colors = [
  'rgba(60, 179, 113, 0.12)',
  'rgba(46, 139, 87, 0.10)',
  'rgba(144, 238, 144, 0.12)'
];*/
  function rand(min,max){ return Math.random()*(max-min)+min; }

  function create(){
    const p = {
      x: rand(0,w),
      y: rand(-h, h),
      r: rand(8, 36),
      s: rand(0.1,0.6),
      c: colors[Math.floor(Math.random()*colors.length)],
      vx: rand(-0.2,0.2),
      vy: rand(0.1,0.7)
    };
    particles.push(p);
  }

  for(let i=0;i<28;i++) create();

  function resize(){ w = c.width = innerWidth; h = c.height = innerHeight; }
  addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.r += Math.sin(Date.now()/1000 + i)*0.01;

      if (p.y - p.r > h || p.x < -50 || p.x > w+50){
        p.x = rand(0,w);
        p.y = rand(-100, -10);
        p.vy = rand(0.1,0.6);
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- OPTIONAL: startParticles only after entering (to save perf) ---------- */
/* called on openEnvelope */

/* ---------- small UX: envelope shine follows touch too ---------- */
['touchstart','touchmove'].forEach(ev => {
  document.addEventListener(ev, (e) => {
    const touch = e.touches ? e.touches[0] : null;
    if (!touch) return;
    const env = envelope.getBoundingClientRect();
    const mx = ((touch.clientX - env.left) / env.width) * 100;
    const my = ((touch.clientY - env.top) / env.height) * 100;
    envelope.style.setProperty('--mx', mx + '%');
    envelope.style.setProperty('--my', my + '%');
  }, {passive:true});
});

/* ---------- Accessibility: allow Enter to open envelope ---------- */
envelope.addEventListener('keydown', (e) => { if (e.key === 'Enter') openEnvelope(); });

/* END */



/* FRASES ROTADORAS */
const phrases = [
  "El amor no mira con los ojos, sino con el alma.",
  "Juntos es mi lugar favorito.",
  "Donde esté tu corazón, estará mi hogar.",
  "Amar no es mirarse el uno al otro; es mirar juntos en la misma dirección."
];
let phraseIndex = 0;
const phraseText = document.getElementById('phraseText');
document.getElementById('nextPhrase').addEventListener('click', ()=> {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  phraseText.textContent = '"' + phrases[phraseIndex] + '"';
});
document.getElementById('prevPhrase').addEventListener('click', ()=> {
  phraseIndex = (phraseIndex - 1 + phrases.length) % phrases.length;
  phraseText.textContent = '"' + phrases[phraseIndex] + '"';
});



