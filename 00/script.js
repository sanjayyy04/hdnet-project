document.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector(".nav");
    let menu = document.getElementById("menu-btn");
    let close = document.getElementById("close-btn");
    const menuLinks = document.querySelectorAll(".services-menu .link1");
    const hero_section_btn = document.querySelectorAll(".hero-section-btn button");
    const typo3_section_btn = document.querySelectorAll(".typo3-section-btn button");

    //for firstlink back btn
    const dropdowns = document.querySelectorAll(".dropdown");
    const backButtons = document.querySelectorAll(".back-btn");



    function setActive_for_buttons(e) {
        const group = e.currentTarget.parentElement.querySelectorAll("button");
        // get only buttons in the same container (parent div)

        if (e.target.classList.contains("active-btn")) {
            // remove active if the same button is clicked again
            e.target.classList.remove("active-btn");
        } else {
            // remove active from all in this group
            group.forEach(el => el.classList.remove("active-btn"));
            // add active to the clicked one
            e.target.classList.add("active-btn");
        }
    }

    // For hero buttons
    hero_section_btn.forEach(btn => {
        btn.addEventListener("click", setActive_for_buttons);
    });

    // For typo3 buttons
    typo3_section_btn.forEach(btn => {
        btn.addEventListener("click", setActive_for_buttons);
    });



    window.addEventListener("resize", () => {
        let screenWidth = window.innerWidth;
        console.log(screenWidth);

    });

    menu.addEventListener("click", () => {

        nav.style.left = "0%";
        close.style.display = "block";
        menu.style.display = "none";
    });

    close.addEventListener("click", () => {
        nav.style.left = "100%";
        close.style.display = "none";
        menu.style.display = "block";
    });


    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            const content = link.nextElementSibling;
            const arrow = link.querySelector("img");
            const isActive = link.classList.contains("active1");

            // Step 1: reset all
            document.querySelectorAll(".service-content-ul2").forEach(c => c.style.display = "none");
            document.querySelectorAll(".services-menu img").forEach(img => {
                img.style.transform = "rotate(0deg)";
                img.style.backgroundColor = "transparent"; // reset background
            });
            document.querySelectorAll(".services-menu .link1").forEach(l => l.classList.remove("active1"));

            // Step 2: if clicked was not active → activate it
            if (!isActive) {
                content.style.display = "block";
                arrow.style.transform = "rotate(-180deg)";
                arrow.style.backgroundColor = "red";   // 🔴 active arrow
                link.classList.add("active1");
            }
        });
    });

    // ✅ Make first item active by default
    if (menuLinks.length > 0) {
        const firstLink = menuLinks[0];
        const firstContent = firstLink.nextElementSibling;
        const firstArrow = firstLink.querySelector("img");

        firstLink.classList.add("active1");
        firstContent.style.display = "block";
        firstArrow.style.transform = "rotate(-180deg)";
        firstArrow.style.backgroundColor = "red";
    }

    dropdowns.forEach(drop => {
        const dropItem = drop.querySelector(".drop-item");
        const firstLink = drop.querySelector(".firstlink");

        dropItem.addEventListener("click", () => {
            // Remove active from all firstlinks
            document.querySelectorAll(".firstlink").forEach(fl => fl.classList.remove("active"));

            // Remove active-btn from all nav links
            document.querySelectorAll(".drop-item").forEach(item => item.classList.remove("active-btn"));

            // Add active state to this one
            firstLink.classList.add("active");
            dropItem.classList.add("active-btn");
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const parentFirstLink = btn.closest(".firstlink");
            parentFirstLink.classList.remove("active");

            // Remove active-btn when going back
            document.querySelectorAll(".drop-item").forEach(item => item.classList.remove("active-btn"));
        });
    });


    // LazyLoad for all .lazy images
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 300,
        callback_loaded: function (el) {
            el.classList.add("loaded"); // optional fade-in class
        },
        callback_error: function (el) {
            console.error("Error loading", el.getAttribute("data-src"));
        }
    });

});





