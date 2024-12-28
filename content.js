// replaces all images with a halloween theme image
function replaceImages() {
  const replacementImage = chrome.runtime.getURL('spooky-img.jpg');
  const images = document.querySelectorAll('img');
  images.forEach(img => img.src = replacementImage);
}

// plays halloween piano music
function playAudio() {
    const audio = new Audio(chrome.runtime.getURL('audio.mp3'));
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.error('Audio play failed:', err);
    });
}

// update the active state (for example when the toggle button is pressed)
function updateActiveState(isActive) {
    active = isActive;
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

// when user clicks on the page
document.addEventListener('click', () => {

    // if spooky mode activated
    if (active) {
        replaceImages();
        playAudio();
    }
});

