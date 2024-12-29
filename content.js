let active = false;
let mode = "";
// replaces all images with a halloween theme image
function replaceImages(scareMode) {
    console.log(mode)

    let imageName = "";
    
    if (mode == "loading") {
        imageName = "loading-img.png";
    }
    else if (mode == "spooky") {
        imageName = "spooky-img.jpg";
    }
    else if (mode == "bear") {
        imageName = "bear-img.png";
    }
    else {
        imageName = "loading-img.png";
    }
    console.log(imageName)
    const replacementImage = chrome.runtime.getURL(imageName);
    const images = document.querySelectorAll('img');
    images.forEach(img => img.src = replacementImage);
}

// plays halloween piano music
function playAudio() {
    const audio = new Audio(chrome.runtime.getURL('spookyAudio.mp3'));
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.error('Audio play failed:', err);
    });
}

// update the active state (for example when the toggle button is pressed)
function updateActiveState(isActive) {
    active = isActive;
}

function updateModeState(modeState) {
    mode = modeState;
}

// when the content script runs, load the current active state from storage
chrome.storage.local.get('active', (result) => {
    if (result.active !== undefined) {
        updateActiveState(result.active);
    }
    else {
        updateActiveState(true);
    }
});

// mode
chrome.storage.local.get('mode', (result) => {
    if (result.mode !== undefined) {
        updateModeState(result.mode);
    }
    else {
        updateModeState("Spooky Scream");
    }
});

// when user clicks on the page
document.addEventListener('click', () => {

    // if spooky mode activated
    if (active) {
        replaceImages(mode);
        playAudio();
    }
});

