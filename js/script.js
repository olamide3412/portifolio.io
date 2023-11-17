import * as helper from "./helper.js";
const navbar = document.querySelector(".navigation");
const about = document.querySelector(".hero");

// Sticky Navbar
const observer = new IntersectionObserver(
  (entries) => {
    console.log("passed");
    const ent = entries[0];
    if (!ent.isIntersecting) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
    console.log(ent);
    // alert('hi')
  },
  {
    root: null,
    rootMargin: "",
    threshold: 0,
  }
);
console.log(window.innerWidth);
if (window.innerWidth > "768") observer.observe(about);

// Navbar mobile view
const hamburger = document.querySelector(".hamburger");
const links = document.querySelector(".links");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  links.classList.toggle("active");
});
//remove the active class from each of the link
document.querySelectorAll(".link").forEach((n) =>
  n.addEventListener("click", function () {
    hamburger.classList.remove("active");
    links.classList.remove("active");
  })
);

//Using data from dev api
//Create markup
const parentElement = document.querySelector(".blogs");
const generateMarkup = async function () {
  const blogs = await helper.fetchData();
  console.log(blogs);
  blogs.forEach((blog) => {
    const html = `
    <a href="${blog.url}" target="_blank">
    
      <div class="blog">
        <div class="blog__top">
        <img src="${
          blog.cover_image ? blog.cover_image : blog.social_image
        }" alt="" />
        </div>
      <div class="blog__bottom">
        <h2 class="blog__title">${blog.title}</h2>
        <p class="blog__description">
          ${blog.description}
        </p>
        <div class="hashtags">
        ${
          !blog.tag_list.length
            ? ` <div>
        <p style="font-size: .8rem">No hashtag on this post </p>
        </div>`
            : blog.tag_list.map((tag) => {
                console.log(blog.tag_list.length);

                return `<div>
          <ion-icon name="pricetag-outline" class="blog__icon"></ion-icon>
          <p>${tag}</p>
        </div>`;
              }).join('')
        }
          
        </div>
        <hr />
        <div class="reactions">
          <div>
            <ion-icon name="calendar-outline" class="blog__icon"></ion-icon>
            <p>${new Date(blog.published_at).toDateString()}</p>
          </div>
          <div>
            <ion-icon name="chatbox-ellipses-outline" class="blog__icon"></ion-icon>
            <p>${blog.comments_count}</p>
          </div>
          <div>
            <ion-icon name="thumbs-up-outline" class="blog__icon"></ion-icon>
            <p>${blog.positive_reactions_count}</p>
          </div>
        </div>
        </div>
      </div>
    </a>`;
    return parentElement.insertAdjacentHTML("beforeend", html);
  });
};
generateMarkup();
