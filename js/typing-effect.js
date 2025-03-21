document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "Building web experiences...",
        "Solving problems...",
        "Creating solutions...",
        "Learning new technologies..."
    ];
    
    const typedTextElement = document.querySelector('.typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingDelay);
    }

    type();
});
