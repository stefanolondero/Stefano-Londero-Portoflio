// Wait for DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    const tiltEffectSettings = {
        max: 15, // Maximum tilt rotation in degrees
        perspective: 1000, // Perspective for the 3D effect
        scale: 1.04, // Scale effect on hover
        speed: 1000, // Transition speed in milliseconds
        easing: "cubic-bezier(.03,.98,.52,.99)" // Easing function for smooth transitions
    };

    const cards = document.querySelectorAll(".card");

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

    function setTransition(card) {
        card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    }
});