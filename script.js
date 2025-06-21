// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Terminal animation on scroll
const terminalSection = document.querySelector('.product-terminal');
let lastScrollPosition = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const terminalRect = terminalSection.getBoundingClientRect();
    
    if (terminalRect.top < window.innerHeight) {
        const scrollProgress = (window.innerHeight - terminalRect.top) / window.innerHeight;
        terminalSection.style.transform = `translateY(${Math.min(scrollProgress * 50, 50)}px)`;
        terminalSection.style.opacity = Math.min(scrollProgress * 2, 1);
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Glitch effect for main heading
const glitchText = document.querySelector('.glitch-text');
let isGlitching = false;

function createGlitchEffect() {
    if (isGlitching) return;
    isGlitching = true;
    
    const originalText = glitchText.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    
    let iterations = 0;
    const interval = setInterval(() => {
        glitchText.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) return originalText[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        iterations += 1/3;
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
            glitchText.textContent = originalText;
            isGlitching = false;
        }
    }, 30);
}

glitchText.addEventListener('mouseover', createGlitchEffect);
setInterval(createGlitchEffect, 5000); 