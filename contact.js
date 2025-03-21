document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            // Here you would typically send the form data to your server
            // For demonstration, we'll simulate a random success/failure
            const isSuccess = Math.random() > 0.5; // Random success/failure

            if (isSuccess) {
                // Show success message
                showMessage(successMessage);
                // Clear form
                contactForm.reset();
            } else {
                // Show error message
                showMessage(errorMessage);
            }
        } catch (error) {
            // Show error message
            showMessage(errorMessage);
        }
    });

    function showMessage(messageElement) {
        // Hide any existing messages
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');

        // Show the new message
        messageElement.classList.add('show');

        // Hide message after 3 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 3000);
    }
});
