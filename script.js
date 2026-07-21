// Force scroll to top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Typing Effect for Hero Section
const textArray = ["I build intelligent Android applications.",  "I write scalable code."];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typingElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Add blinking cursor
    typingElement.insertAdjacentHTML('afterend', '<span class="cursor"></span>');
    setTimeout(type, 1000);

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => { revealOnScroll.observe(reveal); });
});

// --- SMART NAVBAR LOGIC ---
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

// Hide/Show on Scroll
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // If scrolling down and past the first 50px of the page
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        navbar.style.top = "-100px"; // Hide navbar by pushing it up
    } else {
        navbar.style.top = "0";      // Show navbar
    }

    lastScrollTop = scrollTop;
});

// Show if the user moves their mouse to the very top of the screen
window.addEventListener('mousemove', function (e) {
    if (e.clientY < 50) {
        navbar.style.top = "0";
    }
});


// --- MOBILE MENU LOGIC ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle menu when clicking the hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Switch icon between hamburger bars and 'X'
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Automatically close the menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');

        // Reset icon back to hamburger bars
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});