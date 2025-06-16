// Card tilt effect (your original code)
document.addEventListener("DOMContentLoaded", function() {
    // Create cursor element
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    // Update cursor position
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Check if hovering over the download link
        const downloadLink = document.querySelector('.header-text a');
        if (e.target === downloadLink || downloadLink.contains(e.target)) {
            cursor.style.opacity = "1";
            cursor.style.width = "50px";
            cursor.style.height = "50px";
            cursor.style.backgroundColor = "transparent";
            cursor.style.fontSize = "40px";
            cursor.style.color = "lightgreen";
            cursor.textContent = "✈︎"; // Arrow character
            cursor.style.display = "flex";
            cursor.style.alignItems = "center";
            cursor.style.justifyContent = "center";
        } else {
            cursor.style.width = "40px";
            cursor.style.height = "40px";
            cursor.style.backgroundColor = "#ecd5b32a";
            cursor.textContent = "";
        }
    });

    // Make sure cursor stays visible
    cursor.style.opacity = "1";
    

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
});