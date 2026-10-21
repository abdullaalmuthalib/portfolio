/**
 * ABDULLA AL MUTHALIB — PORTFOLIO JAVASCRIPT
 * Handles mobile navigation, project filtering, contact form mailto interaction,
 * clipboard copy, and interactive feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('is-active');
      mobileDrawer.classList.toggle('open');
      
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile drawer when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('is-active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close when clicking any nav link in drawer
    const drawerLinks = mobileDrawer.querySelectorAll('.nav-link, .nav-cta');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('is-active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Highlight Current Page in Navigation (Robust pathname matching)
  const currentPath = window.location.pathname;
  const pageFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const allNavLinks = document.querySelectorAll('.site-header a.nav-link, .mobile-nav-drawer a.nav-link');
  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === pageFilename || (pageFilename === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Project Filtering (Projects Page)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button state
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category').split(' ');
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Contact Form Handler (Direct Static Email Support)
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        formAlert.className = 'form-alert error';
        formAlert.innerHTML = '⚠️ Please fill out all required fields before submitting.';
        return;
      }

      // Generate mailto link with encoded parameters
      const emailAddress = 'abdullaalmuthalib@gmail.com';
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Abdulla,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

      formAlert.className = 'form-alert success';
      formAlert.innerHTML = `
        <strong>Thank you, ${name}!</strong><br>
        Please email me directly to get in touch. 
        <div style="margin-top: 10px;">
          <a href="${mailtoUrl}" class="btn btn-dark btn-sm" style="display: inline-flex;">
            ✉️ Open Email Client (${emailAddress})
          </a>
        </div>
      `;

      // Trigger user's mail client directly
      window.location.href = mailtoUrl;
    });
  }

  // 6. Copy Email to Clipboard helper
  const copyEmailButtons = document.querySelectorAll('[data-copy-email]');
  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-copy-email') || 'abdullaalmuthalib@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied to Clipboard!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });

  // 7. Cute Flower Cursor & Android Emoji Butterfly Followers 🌸🦋
  initCuteFlowerAndButterflies();

  // 8. Stalking & Hiding Minion Easter Egg 🍌👀
  initStalkingMinion();
});

/**
 * Initializes the custom flower cursor and 3 trailing blue-and-black butterflies
 * styled like the Android Blue Morpho butterfly emoji (🦋).
 */
function initCuteFlowerAndButterflies() {
  // Only activate on pointer/mouse devices (desktops/laptops)
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // Create cursor container
  const container = document.createElement('div');
  container.id = 'custom-cursor-container';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  // 1. Create Cute Flower Element
  const flowerEl = document.createElement('div');
  flowerEl.className = 'cursor-flower';
  flowerEl.innerHTML = `
    <svg viewBox="0 0 40 40" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(20,20)">
        <!-- 5 Cute Rounded Petals -->
        <circle cx="0" cy="-9" r="6" fill="#FFBBD8" stroke="#121316" stroke-width="1.8"/>
        <circle cx="8.5" cy="-2.8" r="6" fill="#FFBBD8" stroke="#121316" stroke-width="1.8"/>
        <circle cx="5.3" cy="7.3" r="6" fill="#FFBBD8" stroke="#121316" stroke-width="1.8"/>
        <circle cx="-5.3" cy="7.3" r="6" fill="#FFBBD8" stroke="#121316" stroke-width="1.8"/>
        <circle cx="-8.5" cy="-2.8" r="6" fill="#FFBBD8" stroke="#121316" stroke-width="1.8"/>
        <!-- Center Disk -->
        <circle cx="0" cy="0" r="5.2" fill="#FFE816" stroke="#121316" stroke-width="1.8"/>
        <!-- Sparkle highlight -->
        <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF"/>
      </g>
    </svg>
  `;
  container.appendChild(flowerEl);

  // 2. Android 🦋 Butterfly SVG Generator (Electric Cyan/Blue & Rich Black with White Dots)
  function createAndroidButterflySvg(width, height) {
    return `
      <svg viewBox="0 0 64 64" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <g>
          <!-- Left Wing Group -->
          <g class="wing-left">
            <!-- Upper Left Outer Wing (Black Border) -->
            <path d="M 32 30 C 26 12 12 8 4 16 C -2 24 6 36 24 35 Z" fill="#121316"/>
            <!-- Upper Left Inner Wing (Vibrant Cyan / Blue) -->
            <path d="M 31 29 C 25 15 14 12 8 18 C 3 24 9 33 24 33 Z" fill="#00B0FF"/>
            <!-- Wing Gradient Sheen -->
            <path d="M 30 28 C 26 18 18 16 13 20 C 10 24 15 31 24 31 Z" fill="#80D8FF" opacity="0.6"/>
            <!-- Lower Left Outer Wing (Black Border) -->
            <path d="M 32 33 C 24 35 10 39 12 50 C 14 58 26 54 32 39 Z" fill="#121316"/>
            <!-- Lower Left Inner Wing (Electric Blue) -->
            <path d="M 31 34 C 25 36 14 40 15 48 C 17 54 26 50 31 40 Z" fill="#0091EA"/>
            <!-- White Edge Detail Dots (Android 🦋 signature) -->
            <circle cx="5" cy="18" r="1" fill="#FFFFFF"/>
            <circle cx="4" cy="23" r="1" fill="#FFFFFF"/>
            <circle cx="7" cy="29" r="1" fill="#FFFFFF"/>
            <circle cx="14" cy="51" r="0.9" fill="#FFFFFF"/>
            <circle cx="19" cy="53" r="0.9" fill="#FFFFFF"/>
          </g>

          <!-- Right Wing Group -->
          <g class="wing-right">
            <!-- Upper Right Outer Wing (Black Border) -->
            <path d="M 32 30 C 38 12 52 8 60 16 C 66 24 58 36 40 35 Z" fill="#121316"/>
            <!-- Upper Right Inner Wing (Vibrant Cyan / Blue) -->
            <path d="M 33 29 C 39 15 50 12 56 18 C 61 24 55 33 40 33 Z" fill="#00B0FF"/>
            <!-- Wing Gradient Sheen -->
            <path d="M 34 28 C 38 18 46 16 51 20 C 54 24 49 31 40 31 Z" fill="#80D8FF" opacity="0.6"/>
            <!-- Lower Right Outer Wing (Black Border) -->
            <path d="M 32 33 C 40 35 54 39 52 50 C 50 58 38 54 32 39 Z" fill="#121316"/>
            <!-- Lower Right Inner Wing (Electric Blue) -->
            <path d="M 33 34 C 39 36 50 40 49 48 C 47 54 38 50 33 40 Z" fill="#0091EA"/>
            <!-- White Edge Detail Dots -->
            <circle cx="59" cy="18" r="1" fill="#FFFFFF"/>
            <circle cx="60" cy="23" r="1" fill="#FFFFFF"/>
            <circle cx="57" cy="29" r="1" fill="#FFFFFF"/>
            <circle cx="50" cy="51" r="0.9" fill="#FFFFFF"/>
            <circle cx="45" cy="53" r="0.9" fill="#FFFFFF"/>
          </g>

          <!-- Black Slender Body & Antennae -->
          <ellipse cx="32" cy="35" rx="2" ry="9" fill="#121316"/>
          <circle cx="32" cy="25" r="2.2" fill="#121316"/>
          <path d="M 32 24 Q 28 17 24 16" fill="none" stroke="#121316" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M 32 24 Q 36 17 40 16" fill="none" stroke="#121316" stroke-width="1.2" stroke-linecap="round"/>
          <circle cx="23.5" cy="15.5" r="0.8" fill="#121316"/>
          <circle cx="40.5" cy="15.5" r="0.8" fill="#121316"/>
        </g>
      </svg>
    `;
  }

  // 3. Create 3 Butterflies with varying sizes & flight dynamics
  const butterflies = [
    {
      size: 28,
      speed: 0.12,
      orbitRadius: 28,
      orbitSpeed: 0.0025,
      orbitPhase: 0,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      className: 'butterfly-1'
    },
    {
      size: 22,
      speed: 0.08,
      orbitRadius: 42,
      orbitSpeed: 0.0018,
      orbitPhase: 2.1,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      className: 'butterfly-2'
    },
    {
      size: 16,
      speed: 0.05,
      orbitRadius: 56,
      orbitSpeed: 0.0014,
      orbitPhase: 4.2,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      angle: 0,
      className: 'butterfly-3'
    }
  ];

  butterflies.forEach(b => {
    const el = document.createElement('div');
    el.className = `cursor-butterfly ${b.className}`;
    el.innerHTML = createAndroidButterflySvg(b.size, b.size);
    container.appendChild(el);
    b.element = el;
  });

  // Mouse State
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentFlowerX = mouseX;
  let currentFlowerY = mouseY;
  let isMouseInside = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMouseInside) {
      isMouseInside = true;
      container.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    isMouseInside = false;
    container.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isMouseInside = true;
    container.style.opacity = '1';
  });

  // Interactive Hover Detection (Flower blooms on links, buttons, inputs)
  const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], label, .card, .sticker';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      flowerEl.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      flowerEl.classList.remove('is-hovering');
    }
  });

  // Click Animation & Pollen Sparkles
  window.addEventListener('mousedown', () => {
    flowerEl.classList.add('is-clicking');
    createPollenSparkles(mouseX, mouseY);
  });

  window.addEventListener('mouseup', () => {
    flowerEl.classList.remove('is-clicking');
  });

  function createPollenSparkles(x, y) {
    const colors = ['#FFE816', '#FFBBD8', '#00B0FF', '#C3FF16'];
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'flower-sparkle';
      const size = Math.floor(Math.random() * 5 + 4);
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5);
      const dist = Math.random() * 32 + 18;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.backgroundColor = colors[i % colors.length];
      sparkle.style.border = '1px solid #121316';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty('--dx', `${dx}px`);
      sparkle.style.setProperty('--dy', `${dy}px`);
      
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 700);
    }
  }

  // Animation Loop (60+ FPS via requestAnimationFrame)
  let lastTimestamp = performance.now();

  function animate(timestamp) {
    const delta = Math.min(timestamp - lastTimestamp, 100);
    lastTimestamp = timestamp;

    // 1. Move Flower Cursor directly to mouse with subtle spring
    currentFlowerX += (mouseX - currentFlowerX) * 0.45;
    currentFlowerY += (mouseY - currentFlowerY) * 0.45;
    flowerEl.style.transform = `translate3d(${currentFlowerX}px, ${currentFlowerY}px, 0) translate(-50%, -50%)`;

    // 2. Animate Butterflies
    butterflies.forEach((b) => {
      // Natural organic hovering wave
      const orbitX = Math.cos(timestamp * b.orbitSpeed + b.orbitPhase) * b.orbitRadius;
      const orbitY = Math.sin(timestamp * b.orbitSpeed * 1.3 + b.orbitPhase) * (b.orbitRadius * 0.7);

      const targetX = currentFlowerX + orbitX;
      const targetY = currentFlowerY + orbitY;

      // Position lerp
      const prevX = b.x;
      const prevY = b.y;

      b.x += (targetX - b.x) * b.speed;
      b.y += (targetY - b.y) * b.speed;

      b.vx = b.x - prevX;
      b.vy = b.y - prevY;

      // Calculate directional flight angle
      const moveDistance = Math.hypot(b.vx, b.vy);
      if (moveDistance > 0.4) {
        const targetAngle = (Math.atan2(b.vy, b.vx) * 180) / Math.PI + 90;
        // Smooth rotation angle interpolation
        let angleDiff = (targetAngle - b.angle) % 360;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        b.angle += angleDiff * 0.15;
      }

      // Render Butterfly
      b.element.style.transform = `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0) rotate(${b.angle}deg)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * Initializes the Stalking & Hiding Minion Easter Egg 🍌👀
 * Peeks out from different vantage points, stalks the user with tracking eye,
 * and ducks out of sight whenever the cursor comes near!
 */
function initStalkingMinion() {
  // Only activate on devices with fine pointer (mouse/trackpad)
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // Create Minion Stalker DOM Container
  const minionEl = document.createElement('div');
  minionEl.id = 'minion-stalker';
  minionEl.className = 'pos-bottom-right';
  minionEl.setAttribute('aria-hidden', 'true');

  minionEl.innerHTML = `
    <div class="minion-inner">
      <div class="minion-bubble" id="minion-bubble">Bello!</div>
      <svg class="minion-svg" viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Sprout Hairs -->
        <path d="M 45 10 Q 42 2 37 3" fill="none" stroke="#121316" stroke-width="2" stroke-linecap="round"/>
        <path d="M 45 10 Q 45 1 47 0" fill="none" stroke="#121316" stroke-width="2" stroke-linecap="round"/>
        <path d="M 45 10 Q 48 3 53 4" fill="none" stroke="#121316" stroke-width="2" stroke-linecap="round"/>

        <!-- Main Yellow Capsule Body -->
        <rect x="15" y="10" width="60" height="100" rx="30" fill="#FFE816" stroke="#121316" stroke-width="2.6"/>

        <!-- Goggle Black Strap -->
        <rect x="12" y="32" width="66" height="12" fill="#212121"/>
        <line x1="12" y1="32" x2="78" y2="32" stroke="#121316" stroke-width="1.5"/>
        <line x1="12" y1="44" x2="78" y2="44" stroke="#121316" stroke-width="1.5"/>

        <!-- Silver Goggle Outer Ring -->
        <circle cx="45" cy="38" r="21" fill="#CCCCCC" stroke="#121316" stroke-width="2.6"/>
        <circle cx="45" cy="38" r="17" fill="#E6E6E6" stroke="#888888" stroke-width="1.5"/>
        
        <!-- Eyeball (White Sclera) -->
        <circle cx="45" cy="38" r="14.5" fill="#FFFFFF" stroke="#121316" stroke-width="1.2"/>

        <!-- Pupil & Iris Tracking Group -->
        <g class="minion-pupil" id="minion-pupil">
          <!-- Hazel / Brown Iris -->
          <circle cx="45" cy="38" r="6" fill="#795548" stroke="#4E342E" stroke-width="1"/>
          <!-- Black Inner Pupil -->
          <circle cx="45" cy="38" r="3.5" fill="#121316"/>
          <!-- Cute White Eye Sparkle -->
          <circle cx="43" cy="36" r="1.4" fill="#FFFFFF"/>
        </g>

        <!-- Cute Mischievous Smile -->
        <path id="minion-mouth-normal" d="M 37 68 Q 45 74 53 68" fill="none" stroke="#121316" stroke-width="2.4" stroke-linecap="round"/>
        
        <!-- Shocked / Scared Mouth (Hidden by default) -->
        <ellipse id="minion-mouth-scared" cx="45" cy="69" rx="5" ry="7" fill="#121316" style="display: none;"/>

        <!-- Blue Denim Overalls -->
        <path d="M 15 84 Q 45 80 75 84 L 75 110 L 15 110 Z" fill="#1976D2" stroke="#121316" stroke-width="2"/>
        
        <!-- Overalls Bib Front -->
        <rect x="27" y="74" width="36" height="22" rx="4" fill="#1976D2" stroke="#121316" stroke-width="2"/>
        
        <!-- Overalls Straps -->
        <line x1="16" y1="70" x2="30" y2="78" stroke="#1976D2" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="16" y1="70" x2="30" y2="78" stroke="#121316" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="1 99"/>
        <line x1="74" y1="70" x2="60" y2="78" stroke="#1976D2" stroke-width="6.5" stroke-linecap="round"/>
        
        <!-- Black Overall Buttons -->
        <circle cx="28" cy="78" r="2.2" fill="#121316"/>
        <circle cx="62" cy="78" r="2.2" fill="#121316"/>

        <!-- Gru 'G' Pocket Badge -->
        <rect x="38" y="82" width="14" height="12" rx="3" fill="#1565C0" stroke="#121316" stroke-width="1.2"/>
        <circle cx="45" cy="88" r="3.2" fill="#121316"/>
        <circle cx="45" cy="88" r="1.8" fill="#1565C0"/>

        <!-- Gloved Black Hands Peeking Over Edge -->
        <g class="minion-hands">
          <ellipse cx="23" cy="113" rx="7" ry="5" fill="#121316"/>
          <ellipse cx="67" cy="113" rx="7" ry="5" fill="#121316"/>
        </g>
      </svg>
    </div>
  `;

  document.body.appendChild(minionEl);

  const bubbleEl = document.getElementById('minion-bubble');
  const pupilEl = document.getElementById('minion-pupil');
  const mouthNormal = document.getElementById('minion-mouth-normal');
  const mouthScared = document.getElementById('minion-mouth-scared');

  // Available stalking spots
  const positions = [
    'pos-bottom-right',
    'pos-bottom-left',
    'pos-bottom-center',
    'pos-left-center',
    'pos-right-center',
    'pos-top-right'
  ];

  let currentPosIndex = 0;
  let isHiding = false;
  let hideTimeout = null;
  let idleMoveTimeout = null;

  const greetings = ['Bello!', 'Banana? 🍌', '👀', 'Hehehe!', 'Psst...', 'Poopaye!'];
  const scares = ['Uh-oh!', 'Eek!', 'Gasp! 😱', 'Whoops!'];

  function showBubble(text, duration = 1600) {
    if (!bubbleEl || isHiding) return;
    bubbleEl.textContent = text;
    bubbleEl.classList.add('show');
    setTimeout(() => {
      bubbleEl.classList.remove('show');
    }, duration);
  }

  // Peek out at chosen position
  function peekOut() {
    isHiding = false;
    minionEl.classList.remove('is-hiding', 'scared-duck');
    if (mouthNormal) mouthNormal.style.display = 'block';
    if (mouthScared) mouthScared.style.display = 'none';

    // Show friendly speech bubble occasionally
    setTimeout(() => {
      if (!isHiding && Math.random() > 0.3) {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        showBubble(randomGreeting, 1800);
      }
    }, 400);

    // If ignored for a while, sneak to another position autonomously
    resetIdleTimer();
  }

  // Hide / Duck away
  function hideMinion(isScaredByCursor = true) {
    if (isHiding) return;
    isHiding = true;

    clearTimeout(idleMoveTimeout);

    if (isScaredByCursor) {
      // Scare expression
      if (mouthNormal) mouthNormal.style.display = 'none';
      if (mouthScared) mouthScared.style.display = 'block';
      const randomScare = scares[Math.floor(Math.random() * scares.length)];
      showBubble(randomScare, 700);
      minionEl.classList.add('scared-duck');
    }

    minionEl.classList.add('is-hiding');

    // Pick a new position and re-emerge after 3.5 to 5.5 seconds
    const respawnDelay = isScaredByCursor ? (Math.random() * 2000 + 3500) : 2200;

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      // Choose a different position
      let newIndex = currentPosIndex;
      while (newIndex === currentPosIndex) {
        newIndex = Math.floor(Math.random() * positions.length);
      }

      minionEl.classList.remove(positions[currentPosIndex]);
      currentPosIndex = newIndex;
      minionEl.classList.add(positions[currentPosIndex]);

      // Small pause before popping back out
      setTimeout(peekOut, 350);
    }, respawnDelay);
  }

  function resetIdleTimer() {
    clearTimeout(idleMoveTimeout);
    idleMoveTimeout = setTimeout(() => {
      if (!isHiding) {
        hideMinion(false);
      }
    }, 14000);
  }

  // Track cursor position, eyeball tracking & proximity hiding
  let lastCheckTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastCheckTime < 16) return; // ~60fps throttle
    lastCheckTime = now;

    if (isHiding) return;

    // Get current screen center of the minion's eye
    const rect = minionEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const minionCenterX = rect.left + rect.width / 2;
    const minionCenterY = rect.top + rect.height * 0.35; // Eye is around 35% from top

    const dx = e.clientX - minionCenterX;
    const dy = e.clientY - minionCenterY;
    const distance = Math.hypot(dx, dy);

    // 1. Stalking Eye: Pupil tracks cursor direction
    if (pupilEl) {
      const angle = Math.atan2(dy, dx);
      const shiftDistance = Math.min(distance * 0.04, 6.2); // max 6.2px shift
      const pupilX = Math.cos(angle) * shiftDistance;
      const pupilY = Math.sin(angle) * shiftDistance;
      pupilEl.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    // 2. Proximity Trigger: When cursor comes near him, he hides!
    // Threshold distance: 175px
    if (distance < 175) {
      hideMinion(true);
    }
  });

  // Initial peek out
  setTimeout(peekOut, 1200);
}


