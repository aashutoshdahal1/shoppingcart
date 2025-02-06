import { productData } from "./products.js";
let productList = productData;
let carticon = document.querySelector(".carticon");
let sidebar = document.querySelector(".sidebar");
let sidebarclosebtn = document.querySelector(".sidebar__closebtn");
let shopItemHtml = document.querySelector(".app__productcontainer");
carticon.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

sidebarclosebtn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

const shopGenerator = () => {
  shopItemHtml.innerHTML = "";
  if (productList.length > 0) {
    productList.forEach((product) => {
      let { name, price, image } = product;
      console.log(name);
      let htmlData = `
<div class="app__productcontainer-item">
  <img src="${image}" alt="" />
  <p class="app__productcontainer-item-name">${name}</p>
  <div class="app__productcontainer-item-price">
    <p>$${price}</p>
  </div>
  <div class="app__productcontainer-item-btn">
    Add To Cart
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</div>`;

      shopItemHtml.innerHTML += htmlData;
    });
  }
};
shopGenerator();
