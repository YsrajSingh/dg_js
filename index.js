var startTime = 0;
var endTime = 0;
var overallTime = 0; // Store the overall time
var counted = false;
var animationInterval;
var duration = 5000; // Adjust the duration as needed
var setLocalTime = "store_time";
const showMapButton = document.getElementById("showMapButton");
const mapModal = document.getElementById("mapModal");
const closeButton = document.getElementById("closeButton");
const openModalButtons = document.querySelectorAll(".openModalButton");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalButton = document.getElementById("closeModalButton");
const counterElements = document.querySelectorAll(".counter");
const columns = document.querySelectorAll(".container_column");

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Adjust this threshold as needed
};

openModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
        modalOverlay.style.display = "block";
    });
});

closeModalButton.addEventListener("click", function () {
    modalOverlay.style.display = "none";
});

showMapButton.addEventListener("click", () => {
    mapModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    mapModal.style.display = "none";
});

columns.forEach((column) => {
    column.addEventListener("mouseenter", () => {
        column.style.transform = "scale(1.05)"; // Increase scale on hover
    });

    column.addEventListener("mouseleave", () => {
        column.style.transform = "scale(1)"; // Reset scale when not hovering
    });
});

window.addEventListener("scroll", checkScroll);

document.addEventListener("DOMContentLoaded", function () {
    startTime = new Date().getTime();

    // Retrieve the stored overall time from local storage
    var storedOverallTime = localStorage.getItem(setLocalTime);
    if (storedOverallTime) {
        overallTime = parseInt(storedOverallTime); // Convert to integer
    }

    showTime(startTime);
    startSlideshow();
    setInterval(() => {
        showTime(startTime);
    }, 1000);

    // form handling
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const firstName = document.getElementById("fname").value;
        const lastName = document.getElementById("lname").value;
        const email = document.getElementById("email").value;

        if (firstName === "") {
            alert("First Name is required");
        } else if (lastName === "") {
            alert("Last Name is required");
        } else if (email === "") {
            alert("Email Address is required");
        }
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        if (firstName !== "" && lastName !== "" && email !== "") {
            alert(
                "Form Data:\n" +
                    "First Name: " +
                    formData.firstName +
                    "\n" +
                    "Last Name: " +
                    formData.lastName +
                    "\n" +
                    "Email: " +
                    formData.email
            );
            // Clear form input fields
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            document.getElementById("email").value = "";
        }
    });
});

function checkScroll() {
    var container = document.querySelector(".counter_container");
    var oTop = container.getBoundingClientRect().top - window.innerHeight + 950; // Adjust the value as needed
    console.log(oTop, window.scrollY);

    if (window.scrollY > oTop) {
        startCounters();
        window.removeEventListener("scroll", checkScroll);
    }
}

var maxCount = Math.max(
    ...Array.from(counterElements).map((element) =>
        parseInt(element.getAttribute("data-count"))
    )
);
function startCounters() {
    var startTime;
    function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;

        counterElements.forEach(function (element) {
            var countTo = element.getAttribute("data-count");
            countTo = countTo.includes("+")
                ? parseFloat(countTo)
                : parseInt(countTo);

            var countNum = Math.min(countTo, (progress / duration) * maxCount);

            element.textContent = countNum.toFixed(countTo > 1 ? 0 : 1);
        });

        if (progress < duration) {
            animationInterval = requestAnimationFrame(animateCounter);
        }
    }

    animationInterval = requestAnimationFrame(animateCounter);
}

function showTime(starter_time) {
    const time_display = document.getElementById("spent_time");
    const overall_time_display = document.getElementById("overall_time");
    endTime = new Date().getTime(); // Capture the current time
    // Calculate the session time spent and convert to seconds
    var sessionTime = Math.round((endTime - starter_time) / 1000);
    time_display.innerText =
        "Time spent in this session: " + sessionTime + " seconds";

    // Update overall time only if a new second has passed
    if (sessionTime > 0) {
        overallTime += 1;
        localStorage.setItem(setLocalTime, overallTime);
    }
    overall_time_display.innerText =
        "Overall spent time on website: " + overallTime + " seconds";
}

function startSlideshow() {
    let slideIndex = 0;

    function showSlides() {
        let slides = document.getElementsByClassName("mySlides");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0.4";
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].style.animation = "fade 2.5s"; // Apply fade-in animation

        setTimeout(() => {
            slides[slideIndex - 1].style.animation = ""; // Clear animation
            slides[slideIndex - 1].style.opacity = "1"; // Set opacity to 1
            setTimeout(showSlides, 2000); // Change image every 2 seconds
        }, 2500); // Wait for the fade-in animation to complete
    }

    showSlides(); // Start the slideshow
}
