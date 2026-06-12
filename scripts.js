// ============================
// Portfolio Interactions
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Smooth Scrolling ----
    initSmoothScroll();

    // ---- Mobile Menu ----
    initMobileMenu();

    // ---- Modal Popups ----
    initModal();

});

/**
 * Smooth-scrolls to in-page anchor targets.
 * Guards against href="#" and missing targets.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu after navigating, if open
                const navLinks = document.querySelector('.nav-links');
                const menuOverlay = document.querySelector('.menu-overlay');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

/**
 * Hamburger menu toggle with overlay and aria-expanded state.
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (!menuToggle || !navLinks || !menuOverlay) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Modal popup for project cards and certification items.
 * Supports mouse click, keyboard (Enter/Space), Escape to close,
 * and basic focus handling.
 */
function initModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close');

    if (!modal || !modalTitle || !modalDescription || !closeBtn) {
        return;
    }

    let lastFocusedElement = null;

    function openModal(item) {
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        if (!title && !description) {
            // Item has no modal content; do nothing.
            return;
        }

        modalTitle.textContent = title || '';
        modalDescription.textContent = description || '';

        lastFocusedElement = document.activeElement;

        modal.style.display = 'flex';
        document.body.classList.add('modal-active');

        // Move focus into the modal
        closeBtn.focus();
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-active');

        // Return focus to whatever opened the modal
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    // Make project cards / certification items interactive & accessible
    document.querySelectorAll('.project-card, .certification-item').forEach(item => {
        const hasModalContent = item.hasAttribute('data-title') || item.hasAttribute('data-description');
        if (!hasModalContent) return;

        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');

        item.addEventListener('click', () => openModal(item));

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item);
            }
        });
    });

    // Close on close-button click
    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}
