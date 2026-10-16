
console.log("Portfolio JavaScript Loaded!");
console.log("EmailJS Status:", typeof emailjs);

const contactForm = document.getElementById("contactForm");

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "XVHBqFPcaJRd5SoHY"
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const emailInput = contactForm.querySelector(
            'input[type="email"], input[name="email"]'
        );

        if (!emailInput) {
            alert("Email field not found. Please check your form.");
            return;
        }

        const email = emailInput.value.trim();

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {
            alert("Invalid email address. Please enter a valid email.");
            emailInput.focus();
            return;
        }

        if (typeof emailjs === "undefined") {
            alert("Email service is unavailable. Please try again later.");
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) submitButton.disabled = true;

        try {
            await emailjs.sendForm(
                "service_cvdsrtq",
                "template_5846e0g",
                contactForm
            );

            alert("Message sent successfully!");
            contactForm.reset();

        } catch (error) {
            console.error("Email Error:", error);
            alert("Message sending failed. Please check the email and try again.");
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}



const skillsSection = document.querySelector(".skills-card");
const skillsMenu = document.querySelector('a[href="#skills"]');

if (skillsSection && skillsMenu) {
    skillsMenu.addEventListener("click", () => {
        skillsSection.classList.remove("skills-animate");

        // Reset animation
        void skillsSection.offsetWidth;

        // Play again
        skillsSection.classList.add("skills-animate");
    });
}


const themeButton = document.querySelector(".theme-btn");

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeButton.textContent = "☀";
    } else {
        themeButton.textContent = "☾";
    }

});

const revealElements = document.querySelectorAll(
    ".about-skills, .projects, .certificates, .achievements, .contact"
);

function revealOnScroll() {

    revealElements.forEach(function(element) {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }

    });

}

revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


const achievementCards = document.querySelectorAll(".achievement-card");

if (achievementCards.length) {
    achievementCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";
        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";
        card.style.transitionDelay = `${index * 150}ms`;
    });

    const achievementObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    achievementCards.forEach((card) => {
        achievementObserver.observe(card);
    });
}


/* =====================================
   SKILLS — CENTER ZOOM AUTO SLIDER
===================================== */


function showCard(index) {
    currentIndex = (index + cards.length) % cards.length;

    const previous = (currentIndex - 1 + cards.length) % cards.length;
    const next = (currentIndex + 1) % cards.length;

    cards.forEach((card, i) => {
        card.classList.remove("active", "is-active", "is-prev", "is-next");

        if (i === currentIndex) {
            card.classList.add("is-active");
        } else if (i === previous) {
            card.classList.add("is-prev");
        } else if (i === next) {
            card.classList.add("is-next");
        }

        card.setAttribute("aria-hidden", String(i !== currentIndex));
    });

    currentLabel.textContent =
        String(currentIndex + 1).padStart(2, "0");

    progressFill.style.width =
        `${((currentIndex + 1) / cards.length) * 100}%`;
}


function toggleMenu() {
    const navLinks = document.querySelector(".navlink");
    const menuButton = document.querySelector(".menu-btn");

    if (!navLinks || !menuButton) return;

    const isOpen = navLinks.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
}

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".navlink");
    const menuButton = document.querySelector(".menu-btn");

    if (!navLinks || !menuButton) return;

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove("show");
                menuButton.classList.remove("active");
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    });
});
