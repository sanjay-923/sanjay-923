// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

<script>
    
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active'); // Toggle the overlay
});

// Optional: Close menu when overlay is clicked
menuOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
});

// JavaScript for Modal Popup with Background Blur
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close");

// Open modal and apply background blur
document.querySelectorAll(".project-card, .certification-item").forEach(item => {
    item.addEventListener("click", function() {
        // Set modal content from data attributes
        modalTitle.innerText = this.getAttribute("data-title");
        modalDescription.innerText = this.getAttribute("data-description");

        // Show the modal and apply blur effect
        modal.style.display = "flex";
        document.body.classList.add("modal-active"); // Adds blur to background
    });
});

// Close modal and remove background blur when 'x' is clicked
closeBtn.addEventListener("click", () => {
    closeModal();
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Function to close modal and remove background blur
function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("modal-active");
}


</script>
