document.addEventListener("DOMContentLoaded", () => {
    
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const loaderProgress = document.querySelector('.loader-progress');
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            loaderWrapper.style.opacity = '0';
            loaderWrapper.style.visibility = 'hidden';
            document.body.style.overflowY = 'auto';
        } else {
            width += Math.random() * 5;
            if(width > 100) width = 100;
            loaderProgress.style.width = width + '%';
        }
    }, 50);

    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            mobileMenu.classList.add('open');
            menuBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuBtn.children[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            menuBtn.children[0].style.transform = 'none';
            menuBtn.children[1].style.transform = 'none';
            body.style.overflow = 'auto';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            menuBtn.children[0].style.transform = 'none';
            menuBtn.children[1].style.transform = 'none';
            body.style.overflow = 'auto';
        });
    });

    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const links = document.querySelectorAll('.hover-link');

        let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        setInterval(() => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
        }, 10);

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                follower.classList.add('active');
            });
            link.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
            });
        });
    }

    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                el.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });
    
    handleScrollAnimation();
});