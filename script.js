// Replace the entire script.js content with this
document.addEventListener("DOMContentLoaded", function() {
    // Card tilt effect (unchanged)
    const tiltEffectSettings = {
        max: 15,
        perspective: 1000,
        scale: 1.04,
        speed: 1000,
        easing: "cubic-bezier(.03,.98,.52,.99)"
    };

    const cards = document.querySelectorAll(".card");
    if (window.innerWidth > 576) {
        cards.forEach((card) => {
            card.addEventListener("mouseenter", (event) => {
                setTransition(card);
            });

            card.addEventListener("mousemove", (event) => {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;
                const centerX = cardRect.left + cardWidth / 2;
                const centerY = cardRect.top + cardHeight / 2;
                const mouseX = event.clientX - centerX;
                const mouseY = event.clientY - centerY;

                const rotateX = (tiltEffectSettings.max * mouseY) / (cardHeight / 2);
                const rotateY = (-tiltEffectSettings.max * mouseX) / (cardWidth / 2);

                card.style.transform = `
                    perspective(${tiltEffectSettings.perspective}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(${tiltEffectSettings.scale})
                `;
            });

            card.addEventListener("mouseleave", (event) => {
                card.style.transform = `
                    perspective(${tiltEffectSettings.perspective}px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                `;
                setTransition(card);
            });
        });
    }

    function setTransition(card) {
        card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    }

    // Enhanced ghost trail cursor effect
    const header = document.querySelector('header');
    const divider = document.querySelector('.divider');
    let isInHeader = false;
    let mouseX = 0, mouseY = 0;
    
    // Create multiple trail segments for ultra-smooth ghosting effect
    const trailLength = 20; // More segments for smoother trail
    const trailSegments = [];
    
    // Initialize trail segments
    for (let i = 0; i < trailLength; i++) {
        const segment = document.createElement('div');
        segment.className = 'cursor-trail-head';
        
        // Much smaller incremental changes for smoother appearance
        const size = 100 - (i * 3); // Size decreases more gradually from 100px to 43px
        const blur = 1 + (i * 0.6); // Blur increases more gradually from 1px to 12.4px
        
        segment.style.width = `${size}px`;
        segment.style.height = `${size}px`;
        segment.style.opacity = '0'; // Initially hidden
        segment.style.filter = `blur(${blur}px)`;
        segment.style.transition = 'opacity 0.3s ease';
        
        // Keep strong backdrop-filter for all segments, with very gradual reduction
        const backdropOpacity = Math.max(0.3, 1 - (i * 0.035)); // Ensures minimum 0.3 opacity
        segment.style.backdropFilter = `invert(1) contrast(1.1) brightness(1.1) blur(4px) opacity(${backdropOpacity})`;
        
        document.body.appendChild(segment);
        
        trailSegments.push({
            element: segment,
            x: 0,
            y: 0,
            targetOpacity: 1, // Keep full opacity for consistent mix-blend-mode effect
            speed: 0.12 + (i * 0.004) // Much smaller speed differences for smoother motion
        });
    }
    /*
    // Animation loop
    function animateTrail() {
        // Update each trail segment
        trailSegments.forEach((segment, index) => {
            let targetX, targetY;
            
            if (index === 0) {
                // First segment follows mouse directly
                targetX = mouseX;
                targetY = mouseY;
            } else {
                // Each subsequent segment follows the previous one
                targetX = trailSegments[index - 1].x;
                targetY = trailSegments[index - 1].y;
            }
            
            // Smooth interpolation
            const dx = targetX - segment.x;
            const dy = targetY - segment.y;
            segment.x += dx * segment.speed;
            segment.y += dy * segment.speed;
            
            // Position the segment
            segment.element.style.left = `${segment.x}px`;
            segment.element.style.top = `${segment.y}px`;
            
            // Show/hide based on header state with staggered timing
            const shouldShow = isInHeader;
            const currentOpacity = shouldShow ? segment.targetOpacity : 0;
            segment.element.style.opacity = currentOpacity;
        });
        
        requestAnimationFrame(animateTrail);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        const headerRect = header.getBoundingClientRect();
        const dividerRect = divider.getBoundingClientRect();
        const isAboveDivider = e.clientY < dividerRect.top;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if cursor is in header area
        isInHeader = (e.clientY >= headerRect.top && 
                      e.clientY <= headerRect.bottom && 
                      isAboveDivider);
    });

    // Start animation
    animateTrail();
    */
});