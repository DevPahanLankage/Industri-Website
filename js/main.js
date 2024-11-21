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

// Add this to ensure video plays
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("heroVideo");
  if (video) {
    video.play().catch(function (error) {
      console.log("Video play failed:", error);
    });
  }
});

// Add this at the start of your JS file
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('heroVideo');
  
  // Reduce video quality on mobile devices
  if (window.innerWidth <= 768) {
    video.setAttribute('playbackQuality', 'small');
  }
  
  // Pause video when not in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(video);
});
