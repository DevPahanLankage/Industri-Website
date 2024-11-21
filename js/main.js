// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Event data
const events = [
  {
    title: "INDUSTRI FRIDAYS",
    date: "Every Friday",
    time: "10PM - 4AM",
    description: "The ultimate Hip-Hop & R&B experience featuring resident DJs",
    image: "images/events/friday-nights.jpg",
    djs: ["DJ Rax", "DJ Naushad"],
    price: "Ladies Free Before 11PM",
  },
  {
    title: "TRAP HOUSE",
    date: "Every Saturday",
    time: "10PM - 4AM",
    description: "Trap music all night long with the best urban sounds",
    image: "images/events/trap-house.jpg",
    djs: ["DJ Kevin", "DJ Rax"],
    price: "Entry: Rs. 2000",
  },
  {
    title: "R&B SUNDAYS",
    date: "Every Sunday",
    time: "8PM - 2AM",
    description: "Smooth R&B vibes to end your weekend right",
    image: "images/events/rnb-sundays.jpg",
    djs: ["DJ Naushad"],
    price: "Ladies Night - Free Entry",
  },
  {
    title: "THROWBACK THURSDAY",
    date: "Every Thursday",
    time: "9PM - 3AM",
    description: "Old school Hip-Hop & R&B classics all night",
    image: "images/events/throwback.jpg",
    djs: ["Guest DJ", "DJ Kevin"],
    price: "Entry: Rs. 1500",
  },
];

// Function to create event cards
function createEventCards() {
  const eventsGrid = document.querySelector(".events-grid");

  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    eventCard.innerHTML = `
      <div class="event-image">
        <img src="${event.image}" alt="${
      event.title
    }" onerror="this.src='images/events/default-event.jpg'">
        <div class="event-date">${event.date}</div>
      </div>
      <div class="event-details">
        <h3>${event.title}</h3>
        <div class="event-time">${event.time}</div>
        <p>${event.description}</p>
        <div class="event-djs">
          <strong>Featuring:</strong> ${event.djs.join(" • ")}
        </div>
        <div class="event-price">${event.price}</div>
      </div>
    `;

    eventsGrid.appendChild(eventCard);
  });
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", createEventCards);

// Video handling
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("heroVideo");
  if (video) {
    video.play().catch(function (error) {
      console.log("Video play failed:", error);
    });
  }

  // Reduce video quality on mobile devices
  if (window.innerWidth <= 768) {
    video.setAttribute("playbackQuality", "small");
  }

  // Pause video when not in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(video);
});

// Gallery Navigation
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".gallery-dots");
  let currentIndex = 0;

  // Create dots
  galleryItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("gallery-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".gallery-dot");

  function updateGallery() {
    galleryItems.forEach((item) => {
      item.classList.remove("active");
    });

    dots.forEach((dot) => dot.classList.remove("active"));

    galleryItems[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function goToSlide(index) {
    currentIndex = index;
    updateGallery();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateGallery();
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
  }

  // Update the auto-advance interval
  let autoAdvanceInterval;

  function startAutoAdvance() {
    stopAutoAdvance(); // Clear any existing interval
    autoAdvanceInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoAdvance() {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
    }
  }

  // Update event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoAdvance();
    startAutoAdvance();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoAdvance();
    startAutoAdvance();
  });

  // Start auto-advance
  startAutoAdvance();

  // Initial update
  updateGallery();
});

// Add touch support for gallery
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery-grid");
  let touchStartX = 0;
  let touchEndX = 0;

  gallery.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  gallery.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      document.querySelector(".next-btn").click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      document.querySelector(".prev-btn").click();
    }
  }
});
