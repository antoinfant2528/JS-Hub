const concepts =
[
  {
    id:1,
    title:"Execution Context",
    description:"Understand how JavaScript code is executed, including the global context and function contexts. ",
    link:"execution-context.html"
  },
  {
    id:2,
    title:"Hoisting",
    description:"Understanding how variables and functions are moved.",
    link:"hoisting.html"
  },
  {
    id:3,
    title:"Scopes",
    description:"How scopes plays a major role .",
    link:"scope.html"
  },
  {
    id:4,
    title:"Closures",
    description:"How functions remember their environment.",
    link:"closures.html"
  },
  {
    id:5,
    title:"Async Javascript",
    description:"Promises,CallBacks,and Async/Await simplified.",
    link:"async.html"
  },
  {
    id:6,
    title:"Map,Filter,Reduce",
    description:"Powerful array operations for cleaner code.",
    link:"hof.html"
  }

];

//Slider code
const slidesContainer = document.getElementById("conceptsSlides");
concepts.forEach(concept => {
  const slide = document.createElement("div");
  slide.classList.add("concept-slide");

  const linkHtml = concept.link ? `<a href="${concept.link}" target="_blank" class="learn-btn">Learn More</a>` : '';

  slide.innerHTML = `
    <h3>${concept.title}</h3>
    <p>${concept.description}</p>
    ${linkHtml}
  `;

  slidesContainer.appendChild(slide);
});

const slides = document.querySelectorAll(".concept-slide");
const prevbtn = document.querySelector(".prev");
const nextbtn = document.querySelector(".next");
let currIndex = 0;

function showSlide(index) {
 
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  currIndex = index;

  slides.forEach((slide, i) => {
    slide.style.display = i === currIndex ? "block" : "none";
  });
}

if (prevbtn) {
  prevbtn.addEventListener("click", () => {
    showSlide(currIndex - 1);
  });
}

if (nextbtn) {
  nextbtn.addEventListener("click", () => {
    showSlide(currIndex + 1);
  });
}

function nextslide(){
  showSlide(currIndex+1);
}
setInterval(nextslide,3000);

showSlide(currIndex);

