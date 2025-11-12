// ========== Concept Data ==========
const concepts = [
  {
    title: "1. Execution Context",
    description: "Understand how JavaScript code is executed, including the global context and function contexts.",
    link: "execution-context.html",
  },
  {
    title: "2. Hoisting",
    description: "Understanding how variables and functions are moved.",
    link: "hoisting.html",
  },
  {
    title: "3. Scopes",
    description: "How scopes play a major role in variable access.",
    link: "scope.html",
  },
  {
    title: "4. Closures",
    description: "How functions remember their environment.",
    link: "closures.html",
  },
  {
    title: "5. Async JavaScript",
    description: "Promises, Callbacks, and Async/Await simplified.",
    link: "async.html",
  },
  {
    title: "6. Map, Filter, Reduce",
    description: "Powerful array operations for cleaner code.",
    link: "map.html",
  },
];

// ========== DOM Elements ==========
const slidesContainer = document.getElementById("conceptsSlides");
const prevbtn = document.querySelector(".prev");
const nextbtn = document.querySelector(".next");

let currIndex = 0;

// ========== Helper Functions ==========

// Render concepts dynamically
function renderConcepts(list) {
  slidesContainer.innerHTML = `
    <button class="prev">&#10094;</button>
    <button class="next">&#10095;</button>
  `;

  list.forEach((concept) => {
    const slide = document.createElement("div");
    slide.classList.add("concept-slide");
    slide.innerHTML = `
      <h3>${concept.title}</h3>
      <p>${concept.description}</p>
      <a href="${concept.link}" class="learn-btn">Learn More</a>
    `;
    slidesContainer.appendChild(slide);
  });
}

renderConcepts(concepts);
let slides = document.querySelectorAll(".concept-slide");



// Throttle Function
let lastRun = 0;
function throttle(func, limit) {
  return function() {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func();
      lastRun = now;
    }
  };
}
window.addEventListener("scroll", throttle(() => {
  console.log("User scrolling...");
}, 500));


function showSlide(index) { 
  if (index < 0) index = slides.length - 1; 
  if (index >= slides.length) index = 0; 
  currIndex = index; 
  slides.forEach((slide, i) => { 
    slide.style.display = i === currIndex ? "block" : "none"; }); 
  }
  function nextslide(){
     showSlide(currIndex+1); 
    } 
  setInterval(nextslide,2000); 
  showSlide(currIndex);
// Event Listeners for slider 
if (prevbtn) { prevbtn.addEventListener("click", () => { showSlide(currIndex - 1); }); } 
if (nextbtn) { nextbtn.addEventListener("click", () => { showSlide(currIndex + 1); }); } 



// ========== Debounced Search ==========
// Debounce function (prevents search from running too often)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Function to display search results
function displayResults(results) {
  const container = document.getElementById("resultsContainer");
  if (!container) return;
  container.innerHTML = ""; // clear old results

  if (results.length === 0) {
    const noResult = document.createElement("p");
    noResult.textContent = "No matching concepts found.";
    noResult.classList.add("no-results");
    container.appendChild(noResult);
    return;
  }

  results.forEach(concept => {
    const div = document.createElement("div");
    div.classList.add("search-result");
    div.innerHTML = `
           <a href="${concept.link}" target="_parent" class="learn-btn">${concept.title}</a>
    `;
    container.appendChild(div);
  });
}

// Function to handle search logic
function searchConcepts(event) {
  const searchValue = event.target.value.toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");

  // If input is empty → clear everything
  if (searchValue.trim() === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  const filtered = concepts.filter(concept =>
    concept.title.toLowerCase().includes(searchValue) ||
    concept.description.toLowerCase().includes(searchValue)
  );

  displayResults(filtered);
}

// Attach search listener (on keyup)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", debounce(searchConcepts, 300));
}


// ========== Lazy Load Hero Background ==========
const hero=document.querySelector(".hero");
const bg = new Image();
bg.src = 'assets/herosection.jpg';
bg.onload = () => {
  hero.style.backgroundImage = `url('${bg.src}')`;
  hero.style.backgroundSize="cover";
  hero.style.transition = "background-image 1s ease-in-out"; 
};



// ========== Navbar Click Routing ==========
document.querySelector(".navbar").addEventListener("click", (e) => {
  if (e.target.id) {
    window.location.href = "/" + e.target.id + ".html";
  }
});
