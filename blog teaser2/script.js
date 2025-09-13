let flkty = null;

function initFlickity() {
  // Destroy existing Flickity instance to re-initialize
  if (flkty) {
    flkty.destroy();
  }

  const carousel = document.querySelector('#main-carousel');
  if (!carousel) return;

  const width = window.innerWidth;
  let groupSize;

  // Check screen width to determine the slider's behavior
  if (width <= 450) {
    groupSize = 1;
  } else if (width <= 1023) {
    groupSize = 2;
  } else {
    // Don't initialize on desktop, let the CSS handle it
    return;
  }

  // Initialize Flickity with dynamic options
  flkty = new Flickity(carousel, {
    imagesLoaded: true,
    percentPosition: false,
    groupCells: groupSize,
    wrapAround: false,
    autoPlay: true,
    initialIndex: 0
  });

  // Function to enable/disable buttons based on scroll position
  function updateButtonState() {
    const prevButton = document.querySelector('.flickity-button.previous');
    const nextButton = document.querySelector('.flickity-button.next');

    if (prevButton) {
      prevButton.classList.toggle('is-disabled', flkty.selectedIndex === 0);
    }
    if (nextButton) {
      const lastSlideIndex = flkty.slides.length - flkty.options.groupCells;
      nextButton.classList.toggle('is-disabled', flkty.selectedIndex >= lastSlideIndex);
    }
  }

  // Update button state on initialization and when the selected cell changes
  flkty.on('ready', updateButtonState);
  flkty.on('change', updateButtonState);
}

// Call on page load and window resize
window.addEventListener('load', initFlickity);
window.addEventListener('resize', initFlickity);
