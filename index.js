var startTime = 0;
var endTime = 0;
var overallTime = 0; // Store the overall time
var setLocalTime = "store_time";
const showMapButton = document.getElementById("showMapButton");
const mapModal = document.getElementById("mapModal");
const closeButton = document.getElementById("closeButton");

showMapButton.addEventListener("click", () => {
    mapModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    mapModal.style.display = "none";
});

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
});

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
