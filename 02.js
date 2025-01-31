const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Get the image element
const myImage = document.querySelector('#my-image');
let lastScrollPos = window.scrollY;

// Add scroll event listener using Lenis for smooth scrolling
lenis.on('scroll', (e) => {
    const scrollPos = e.animatedScroll;
    
    // Get the position where next div starts
    const newDiv = document.querySelector('#new-div');
    const newDivTop = newDiv.getBoundingClientRect().top + window.scrollY;
    
    // Calculate image movement
    const startPos = 50; // Start at center
    const endPos = 30;   // Move up to 20%
    
    if (scrollPos < newDivTop) {
        // Calculate progress (0 to 1)
        const progress = Math.min(scrollPos / newDivTop, 1);
        
        // Calculate y position with easing
        const yPos = startPos - (progress * (startPos - endPos));
        
        // Update image position with smooth transition
        myImage.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';  // Smooth easing
        myImage.style.backgroundPosition = `center ${yPos}%`;
        myImage.style.opacity = 1 - (progress * 0.3); // Subtle fade effect instead of scale
    } else {
        // Keep final state when past the div
        myImage.style.backgroundPosition = `center ${endPos}%`;
        myImage.style.opacity = 0.7;
    }
    
    lastScrollPos = scrollPos;
});









