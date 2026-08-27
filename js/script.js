/* =========================================================
   RAKHI WEBSITE
   COMPLETE SCRIPT.JS

   Kavya ❤️ Priyanshu
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (
  selector,
  parent = document
) => parent.querySelector(selector);


const $$ = (
  selector,
  parent = document
) => [
  ...parent.querySelectorAll(selector)
];


/* =========================================================
   DOM
   ========================================================= */

const loader =
  $("#loader");

const floatingDots =
  $("#floatingDots");

const typing =
  $("#typing");

const music =
  $("#music");

const musicBtn =
  $("#musicBtn");

const fairySound =
  $("#giftSound");

const celebrationLayer =
  $("#celebrationLayer");

const confettiHolder =
  $("#confetti");

const modal =
  $("#modal");

const photoModal =
  $("#photoModal");

const fullPhoto =
  $("#fullPhoto");

const photoCaption =
  $("#photoCaption");

const reelGrid =
  $(".reel-grid");

const reelCards =
  $$(".reel-card");

const reelVideos =
  $$(".reel-video");


/* =========================================================
   REDUCED MOTION
   ========================================================= */

const reduceMotion =
  window.matchMedia &&
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   LOADER
   ========================================================= */

/*
 * IMPORTANT:
 *
 * We intentionally DO NOT use window.load.
 *
 * The website contains 5 MP4 files.
 * Waiting for every MP4 to load can keep
 * the loader visible for a very long time.
 */

function hideLoader(){

  if(!loader){
    return;
  }

  loader.classList.add(
    "hide"
  );

  setTimeout(
    () => {

      loader.style.display =
        "none";

    },
    750
  );

}


/*
 * Hide loader quickly after HTML
 * becomes available.
 */

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      setTimeout(
        hideLoader,
        reduceMotion
          ? 100
          : 900
      );

    },
    {
      once:true
    }
  );

}

else{

  setTimeout(
    hideLoader,
    reduceMotion
      ? 100
      : 900
  );

}


/* =========================================================
   FLOATING DOTS
   ========================================================= */

if(floatingDots){

  const count =
    reduceMotion
      ? 8
      : 34;

  const fragment =
    document.createDocumentFragment();

  for(
    let i = 0;
    i < count;
    i++
  ){

    const dot =
      document.createElement(
        "span"
      );

    dot.className =
      "float-dot";

    const size =
      2 +
      Math.random() * 4;

    dot.style.left =
      `${Math.random() * 100}%`;

    dot.style.width =
      `${size}px`;

    dot.style.height =
      `${size}px`;

    dot.style.animationDuration =
      `${10 + Math.random() * 14}s`;

    dot.style.animationDelay =
      `${Math.random() * 8}s`;

    fragment.appendChild(
      dot
    );

  }

  floatingDots.appendChild(
    fragment
  );

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

const lines = [

  "Kavya, your brother is always in your corner. ❤️",

  "8 years apart — one forever bond.",

  "Keep smiling. Keep dreaming. Keep being you.",

  "A little chaos, a lot of love. 😂❤️",

  "Always your brother. Always family."

];


let lineIndex = 0;

let charIndex = 0;

let deleting = false;


function typeText(){

  if(!typing){
    return;
  }

  const current =
    lines[lineIndex];


  if(!deleting){

    typing.textContent =
      current.slice(
        0,
        charIndex + 1
      );

    charIndex++;


    if(
      charIndex ===
      current.length
    ){

      deleting = true;

      setTimeout(
        typeText,
        1500
      );

      return;

    }

  }

  else{

    typing.textContent =
      current.slice(
        0,
        charIndex - 1
      );

    charIndex--;


    if(charIndex === 0){

      deleting = false;

      lineIndex =
        (
          lineIndex + 1
        ) %
        lines.length;

    }

  }


  setTimeout(
    typeText,
    deleting
      ? 28
      : 55
  );

}


typeText();


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

if(
  "IntersectionObserver"
  in window
){

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:.12
      }
    );


  $$(".reveal").forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

}

else{

  $$(".reveal").forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   STORY CARD 3D EFFECT
   ========================================================= */

$$(".story-card").forEach(
  card => {

    card.addEventListener(
      "mousemove",
      event => {

        if(
          reduceMotion ||
          window.matchMedia(
            "(hover:none)"
          ).matches
        ){

          return;

        }


        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const rx =
          (
            (
              y -
              rect.height / 2
            ) /
            rect.height
          ) *
          -4;


        const ry =
          (
            (
              x -
              rect.width / 2
            ) /
            rect.width
          ) *
          4;


        card.style.transform =
          `
          perspective(900px)
          rotateX(${rx}deg)
          rotateY(${ry}deg)
          translateY(-5px)
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  }
);


/* =========================================================
   PHOTO SYSTEM
   ========================================================= */

const photoCards =
  $$(".photo-card");


function openPhotoViewer(
  card
){

  if(
    !photoModal ||
    !fullPhoto
  ){

    return;

  }


  const image =
    $("img", card);


  if(
    !image ||
    !image.src
  ){

    return;

  }


  /*
   * Stop all media.
   *
   * Photo does NOT play fairy sound.
   * Photo does NOT create butterflies.
   */

  stopAllReels();

  stopBackgroundMusic();

  stopFairySound();


  /*
   * Set fullscreen image.
   */

  fullPhoto.src =
    image.currentSrc ||
    image.src;

  fullPhoto.alt =
    image.alt ||
    "Memory";


  /*
   * Caption.
   */

  if(photoCaption){

    photoCaption.textContent =
      $("figcaption strong", card)
        ?.textContent ||
      image.alt ||
      "Memory";

  }


  /*
   * Open viewer.
   */

  photoModal.classList.add(
    "active"
  );

  photoModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closePhotoViewer(){

  if(!photoModal){
    return;
  }


  photoModal.classList.remove(
    "active"
  );

  photoModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";


  setTimeout(
    () => {

      if(
        !photoModal.classList.contains(
          "active"
        )
      ){

        if(fullPhoto){

          fullPhoto.src =
            "";

        }

      }

    },
    350
  );

}


/*
 * Image loading.
 */

photoCards.forEach(
  card => {

    const image =
      $("img", card);


    if(!image){
      return;
    }


    const markLoaded =
      () => {

        if(
          image.naturalWidth > 0
        ){

          card.classList.add(
            "has-image"
          );

        }

      };


    image.addEventListener(
      "load",
      markLoaded
    );


    image.addEventListener(
      "error",
      () => {

        card.classList.remove(
          "has-image"
        );

      }
    );


    if(
      image.complete &&
      image.naturalWidth > 0
    ){

      markLoaded();

    }


    /*
     * Photo click.
     */

    card.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        openPhotoViewer(
          card
        );

      }
    );


    /*
     * Keyboard.
     */

    card.addEventListener(
      "keydown",
      event => {

        if(
          event.key === "Enter" ||
          event.key === " "
        ){

          event.preventDefault();

          openPhotoViewer(
            card
          );

        }

      }
    );

  }
);


/* =========================================================
   PHOTO CLOSE
   ========================================================= */

$("#photoClose")?.addEventListener(
  "click",
  closePhotoViewer
);


photoModal?.addEventListener(
  "click",
  event => {

    if(
      event.target ===
      photoModal
    ){

      closePhotoViewer();

    }

  }
);


/* =========================================================
   AUDIO SYSTEM
   ========================================================= */

let musicPlaying =
  false;


/*
 * Stop background music.
 */

function stopBackgroundMusic(){

  if(!music){
    return;
  }


  music.pause();


  try{

    music.currentTime =
      0;

  }

  catch(error){}


  musicPlaying =
    false;


  musicBtn?.classList.remove(
    "playing"
  );


  if(musicBtn){

    musicBtn.textContent =
      "♪";

    musicBtn.setAttribute(
      "aria-pressed",
      "false"
    );

  }

}


/*
 * Stop fairy sound.
 */

function stopFairySound(){

  if(!fairySound){
    return;
  }


  fairySound.pause();


  try{

    fairySound.currentTime =
      0;

  }

  catch(error){}

}


/*
 * Play fairy sound.
 *
 * ONLY Gift uses this.
 */

function playFairySound(){

  if(!fairySound){
    return;
  }


  stopFairySound();


  try{

    fairySound.currentTime =
      0;


    const promise =
      fairySound.play();


    if(
      promise &&
      promise.catch
    ){

      promise.catch(
        () => {}
      );

    }

  }

  catch(error){}

}


/* =========================================================
   BACKGROUND MUSIC BUTTON
   ========================================================= */

musicBtn?.addEventListener(
  "click",
  async () => {

    if(!music){

      return;

    }


    /*
     * If music is already playing,
     * stop it.
     */

    if(
      !music.paused
    ){

      stopBackgroundMusic();

      return;

    }


    /*
     * Music starts.
     *
     * Reels stop.
     * Fairy sound stops.
     */

    stopAllReels();

    stopFairySound();


    try{

      await music.play();

      musicPlaying =
        true;


      musicBtn.classList.add(
        "playing"
      );


      musicBtn.textContent =
        "♫";


      musicBtn.setAttribute(
        "aria-pressed",
        "true"
      );

    }

    catch(error){

      alert(
        "Add your music file at assets/audio/music.mp3 first."
      );

    }

  }
);


/* =========================================================
   MUSIC EVENTS
   ========================================================= */

music?.addEventListener(
  "play",
  () => {

    musicPlaying =
      true;

    musicBtn?.classList.add(
      "playing"
    );

  }
);


music?.addEventListener(
  "pause",
  () => {

    musicPlaying =
      false;

    musicBtn?.classList.remove(
      "playing"
    );

    if(musicBtn){

      musicBtn.textContent =
        "♪";

      musicBtn.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  }
);


/* =========================================================
   REELS
   ========================================================= */


/*
 * Remember user's reel sound choice.
 *
 * "on"  = sound enabled
 * "off" = sound muted
 *
 * Default = ON preference.
 */

let reelSoundEnabled =
  localStorage.getItem(
    "rakhiReelSound"
  ) !== "off";


/*
 * Save reel sound preference.
 */

function saveReelSound(){

  localStorage.setItem(
    "rakhiReelSound",
    reelSoundEnabled
      ? "on"
      : "off"
  );

}


/*
 * Stop every reel except
 * optional current reel.
 */

function stopAllReels(
  except = null
){

  reelVideos.forEach(
    video => {

      if(
        video === except
      ){

        return;

      }


      if(
        !video.paused
      ){

        video.pause();

      }


      const card =
        video.closest(
          ".reel-card"
        );


      card?.classList.remove(
        "playing"
      );

    }
  );

}


/*
 * Update mute button.
 */

function updateMuteButton(
  video
){

  const card =
    video.closest(
      ".reel-card"
    );


  const button =
    $(".reel-mute", card);


  if(!button){
    return;
  }


  button.textContent =
    video.muted
      ? "🔇"
      : "🔊";


  button.setAttribute(
    "aria-label",
    video.muted
      ? "Unmute reel"
      : "Mute reel"
  );

}


/* =========================================================
   PLAY REEL
   ========================================================= */

async function playReel(
  video
){

  if(!video){
    return;
  }


  /*
   * Current reel becomes active.
   *
   * Previous reel STOP.
   * Music STOP.
   * Fairy STOP.
   */

  stopAllReels(
    video
  );

  stopBackgroundMusic();

  stopFairySound();


  /*
   * Apply current sound preference.
   */

  video.muted =
    !reelSoundEnabled;


  try{

    await video.play();


    const card =
      video.closest(
        ".reel-card"
      );


    card?.classList.add(
      "playing"
    );


    updateMuteButton(
      video
    );

  }

  catch(error){

    /*
     * Chrome/Safari can block
     * autoplay with sound.
     *
     * Fallback:
     * play muted.
     */

    video.muted =
      true;


    try{

      await video.play();


      const card =
        video.closest(
          ".reel-card"
        );


      card?.classList.add(
        "playing"
      );


      updateMuteButton(
        video
      );

    }

    catch(innerError){

      const card =
        video.closest(
          ".reel-card"
        );


      card?.classList.remove(
        "playing"
      );

    }

  }

}


/* =========================================================
   PAUSE REEL
   ========================================================= */

function pauseReel(
  video
){

  if(!video){
    return;
  }


  video.pause();


  const card =
    video.closest(
      ".reel-card"
    );


  card?.classList.remove(
    "playing"
  );

}


/* =========================================================
   REEL EVENTS
   ========================================================= */

reelVideos.forEach(
  video => {

    const card =
      video.closest(
        ".reel-card"
      );


    const placeholder =
      $(".reel-placeholder", card);


    const playButton =
      $(".reel-play-overlay", card);


    const muteButton =
      $(".reel-mute", card);


    /*
     * Video loaded.
     */

    video.addEventListener(
      "loadedmetadata",
      () => {

        placeholder?.classList.add(
          "hidden"
        );

      }
    );


    video.addEventListener(
      "loadeddata",
      () => {

        placeholder?.classList.add(
          "hidden"
        );

      }
    );


    /*
     * Video error.
     */

    video.addEventListener(
      "error",
      () => {

        placeholder?.classList.remove(
          "hidden"
        );

      }
    );


    /*
     * When ANY reel plays,
     * stop every other reel.
     */

    video.addEventListener(
      "play",
      () => {

        stopAllReels(
          video
        );

        stopBackgroundMusic();

        stopFairySound();


        card?.classList.add(
          "playing"
        );

      }
    );


    /*
     * Pause.
     */

    video.addEventListener(
      "pause",
      () => {

        card?.classList.remove(
          "playing"
        );

      }
    );


    /*
     * End.
     */

    video.addEventListener(
      "ended",
      () => {

        card?.classList.remove(
          "playing"
        );

      }
    );


    /*
     * Play button.
     */

    playButton?.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        if(
          video.paused
        ){

          playReel(
            video
          );

        }

        else{

          pauseReel(
            video
          );

        }

      }
    );


    /*
     * MUTE / UNMUTE.
     *
     * This preference applies
     * to the next reel too.
     */

    muteButton?.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        video.muted =
          !video.muted;


        reelSoundEnabled =
          !video.muted;


        saveReelSound();


        updateMuteButton(
          video
        );


        /*
         * If user unmutes while
         * video is paused, start it.
         */

        if(
          !video.muted &&
          video.paused
        ){

          playReel(
            video
          );

        }

      }
    );


    /*
     * Clicking the actual video.
     */

    video.addEventListener(
      "click",
      event => {

        if(
          event.target !==
          video
        ){

          return;

        }


        if(
          video.paused
        ){

          playReel(
            video
          );

        }

        else{

          pauseReel(
            video
          );

        }

      }
    );


    /*
     * Initial mute icon.
     */

    updateMuteButton(
      video
    );

  }
);


/* =========================================================
   INSTAGRAM-STYLE REEL OBSERVER
   ========================================================= */

if(
  reelGrid &&
  reelCards.length &&
  "IntersectionObserver"
  in window
){

  const reelObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            const video =
              $(".reel-video", entry.target);


            if(!video){
              return;
            }


            /*
             * Start ONLY when a reel
             * is mostly visible.
             */

            if(
              entry.isIntersecting &&
              entry.intersectionRatio >= .75
            ){

              playReel(
                video
              );

            }

            else{

              pauseReel(
                video
              );

            }

          }
        );

      },
      {
        root:reelGrid,

        threshold:[
          .25,
          .5,
          .75,
          .9
        ]

      }
    );


  reelCards.forEach(
    card => {

      reelObserver.observe(
        card
      );

    }
  );

}


/* =========================================================
   DESKTOP MOUSE WHEEL
   ========================================================= */

if(reelGrid){

  let wheelLock =
    false;


  reelGrid.addEventListener(
    "wheel",
    event => {

      /*
       * Don't interfere with
       * small trackpad movement.
       */

      if(
        Math.abs(
          event.deltaY
        ) < 10
      ){

        return;

      }


      if(wheelLock){

        event.preventDefault();

        return;

      }


      event.preventDefault();


      const direction =
        event.deltaY > 0
          ? 1
          : -1;


      const height =
        reelGrid.clientHeight;


      const current =
        reelGrid.scrollTop;


      let target =
        current +
        direction *
        height;


      target =
        Math.max(
          0,
          Math.min(
            target,
            reelGrid.scrollHeight -
            reelGrid.clientHeight
          )
        );


      reelGrid.scrollTo({

        top:target,

        behavior:"smooth"

      });


      wheelLock =
        true;


      setTimeout(
        () => {

          wheelLock =
            false;

        },
        600
      );

    },
    {
      passive:false
    }
  );

}


/* =========================================================
   KEYBOARD REEL NAVIGATION
   ========================================================= */

reelGrid?.addEventListener(
  "keydown",
  event => {

    if(
      event.key !==
        "ArrowDown" &&
      event.key !==
        "ArrowUp"
    ){

      return;

    }


    event.preventDefault();


    const direction =
      event.key ===
        "ArrowDown"
        ? 1
        : -1;


    const target =
      reelGrid.scrollTop +
      direction *
      reelGrid.clientHeight;


    reelGrid.scrollTo({

      top:target,

      behavior:"smooth"

    });

  }
);


/* =========================================================
   GIFT CELEBRATION
   ========================================================= */


/*
 * Create ONE butterfly image.
 */

function createButterfly(){

  const wrapper =
    document.createElement(
      "span"
    );


  wrapper.className =
    "celebration-item celebration-butterfly";


  const image =
    document.createElement(
      "img"
    );


  /*
   * IMPORTANT:
   *
   * Put your butterfly image here:
   *
   * assets/butterfly.png
   */

  image.src =
    "assets/butterfly.png";


  image.alt =
    "";


  image.setAttribute(
    "aria-hidden",
    "true"
  );


  const size =
    18 +
    Math.random() *
    34;


  wrapper.style.width =
    `${size}px`;

  wrapper.style.height =
    `${size}px`;


  wrapper.style.left =
    `${Math.random() * 100}vw`;


  wrapper.style.setProperty(
    "--duration",
    `${5 + Math.random() * 7}s`
  );


  wrapper.style.setProperty(
    "--drift",
    `${-180 + Math.random() * 360}px`
  );


  wrapper.style.setProperty(
    "--drift2",
    `${-250 + Math.random() * 500}px`
  );


wrapper.style.animationDelay = "0s";

  wrapper.appendChild(
    image
  );


  return wrapper;

}


/*
 * Create flowers.
 */

function createFlowers(
  count = 90
){

  if(!celebrationLayer){
    return;
  }


  const flowers = [

    "🌸",
    "🌺",
    "🌷",
    "🌼",
    "🌹",
    "💐",
    "🌻"

  ];


  const fragment =
    document.createDocumentFragment();


  for(
    let i = 0;
    i < count;
    i++
  ){

    const flower =
      document.createElement(
        "span"
      );


    flower.className =
      "celebration-item celebration-flower";


    flower.textContent =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];


    flower.style.left =
      `${Math.random() * 100}vw`;


    flower.style.setProperty(
      "--duration",
      `${3 + Math.random() * 3}s`
    );


    flower.style.setProperty(
      "--drift",
      `${-150 + Math.random() * 300}px`
    );


    flower.style.setProperty(
      "--flower-size",
      `${18 + Math.random() * 22}px`
    );


flower.style.animationDelay = "0s";

    fragment.appendChild(
      flower
    );

  }


  celebrationLayer.appendChild(
    fragment
  );

}


/*
 * Create 500 butterflies.
 *
 * DocumentFragment is used so the browser
 * doesn't repaint 500 times individually.
 */

function createButterflies(
  count = 500
){

  if(!celebrationLayer){
    return;
  }


  const fragment =
    document.createDocumentFragment();


  for(
    let i = 0;
    i < count;
    i++
  ){

    fragment.appendChild(
      createButterfly()
    );

  }


  celebrationLayer.appendChild(
    fragment
  );

}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti(
  count = 120
){

  if(!confettiHolder){
    return;
  }


  const colors = [

    "#78957e",
    "#d69a43",
    "#c83b82",
    "#f3dca4",
    "#ffffff",
    "#7b4ba3"

  ];


  const fragment =
    document.createDocumentFragment();


  for(
    let i = 0;
    i < count;
    i++
  ){

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "confetti-piece";


    piece.style.left =
      `${Math.random() * 100}vw`;


    piece.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    piece.style.animationDuration =
      `${2 + Math.random() * 3}s`;


    piece.style.animationDelay =
      `${Math.random() * .5}s`;


    fragment.appendChild(
      piece
    );


    setTimeout(
      () => {

        piece.remove();

      },
      6000
    );

  }


  confettiHolder.appendChild(
    fragment
  );

}


/* =========================================================
   COMPLETE GIFT EFFECT
   ========================================================= */

function celebrationBurst(){

  if(!celebrationLayer){
    return;
  }

  celebrationLayer.innerHTML = "";

  /*
   * Fairy sound starts immediately
   */
  playFairySound();

  /*
   * Effects start immediately
   */
  createButterflies(180);

  createFlowers(45);

  createConfetti(80);

  /*
   * Cleanup
   */
  setTimeout(
    () => {
      celebrationLayer.innerHTML = "";
    },
    12000
  );

}

/* =========================================================
   SURPRISE / GIFT MODAL
   ========================================================= */

function openModal(){

  if(!modal){
    return;
  }


  modal.classList.add(
    "active"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeModal(){

  if(!modal){
    return;
  }


  modal.classList.remove(
    "active"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   SURPRISE BUTTON
   ========================================================= */

$("#surpriseBtn")?.addEventListener(
  "click",
  () => {

    /*
     * Gift starts:
     *
     * Reels STOP
     * Music STOP
     * Fairy PLAY
     * Butterflies PLAY
     * Flowers PLAY
     * Confetti PLAY
     */

    stopAllReels();

    stopBackgroundMusic();


    celebrationBurst();


    openModal();

  }
);


/* =========================================================
   LOVE / GIFT BUTTON
   ========================================================= */

$("#loveBtn")?.addEventListener(
  "click",
  () => {

    /*
     * Same celebration.
     */

    stopAllReels();

    stopBackgroundMusic();


    celebrationBurst();


    const button =
      $("#loveBtn");


    if(!button){
      return;
    }


    const original =
      button.innerHTML;


    button.innerHTML =
      "Love sent to Kavya 💖";


    setTimeout(
      () => {

        button.innerHTML =
          original;

      },
      3000
    );

  }
);


/* =========================================================
   MODAL CLOSE
   ========================================================= */

$("#closeModal")?.addEventListener(
  "click",
  closeModal
);


$("#continueBtn")?.addEventListener(
  "click",
  closeModal
);


modal?.addEventListener(
  "click",
  event => {

    if(
      event.target ===
      modal
    ){

      closeModal();

    }

  }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key !==
      "Escape"
    ){

      return;

    }


    if(
      modal?.classList.contains(
        "active"
      )
    ){

      closeModal();

    }


    if(
      photoModal?.classList.contains(
        "active"
      )
    ){

      closePhotoViewer();

    }

  }
);


/* =========================================================
   VISIBILITY
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if(
      document.hidden
    ){

      /*
       * Stop active media when
       * leaving the browser tab.
       */

      stopAllReels();

      music?.pause();

    }

  }
);


/* =========================================================
   INITIAL REEL STATE
   ========================================================= */

reelCards.forEach(
  card => {

    card.classList.remove(
      "playing"
    );

  }
);


/* =========================================================
   INITIAL CELEBRATION STATE
   ========================================================= */

if(celebrationLayer){

  celebrationLayer.innerHTML =
    "";

}


if(confettiHolder){

  confettiHolder.innerHTML =
    "";

}