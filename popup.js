// get the toggle button element in popup
const toggleBtn = document.getElementById('toggleButton');

// get the current value of active form storage when popup opens
chrome.storage.local.get('active', (data) => {
  const initialStatus = data.active !== undefined ? data.active : true;

  // set the intial button text
  toggleBtn.innerHTML = initialStatus ? "Disable" : "Enable";
});

// when toggle button clicked toggle spooky mode on or off
document.getElementById('toggleButton').addEventListener('click', function() {
  const toggleBtn = document.getElementById('toggleButton');
  let status = true;

  // change the text
  if (toggleBtn.innerText == "Disable") {
    status = false;
    toggleBtn.innerHTML = "Enable";
  }
  else {
    status = true;
    toggleBtn.innerHTML = "Disable";
  }

  // change the value of the active variable in store 
  chrome.storage.local.set({ active: status }, () => {
    // get the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        // reload the tab to clear the spooky mode
        chrome.tabs.reload(tabs[0].id, {});
      }
    });
  });
});



