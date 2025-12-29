// Header shrink on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// Active page indicator based on scroll position
const sections = document.querySelectorAll('.section, .home');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Set active link on scroll
window.addEventListener('scroll', setActiveLink);

// Set active link on page load
window.addEventListener('load', setActiveLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// 3D Parallax Effect for Profile Image
const profileImg = document.querySelector('.profile-img');
const homeSection = document.querySelector('.home');

if (profileImg && homeSection) {
    homeSection.addEventListener('mousemove', (e) => {
        const rect = homeSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        profileImg.style.transform = `
            translateY(-20px) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;

        // Dynamic shadow based on mouse position
        const shadowX = ((x - centerX) / centerX) * 20;
        const shadowY = ((y - centerY) / centerY) * 20;

        profileImg.style.boxShadow = `
            ${shadowX}px ${shadowY + 30}px 80px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(212, 175, 55, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15)
        `;
    });

    homeSection.addEventListener('mouseleave', () => {
        profileImg.style.transform = '';
        profileImg.style.boxShadow = '';
    });
}
