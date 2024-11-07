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

</script>
