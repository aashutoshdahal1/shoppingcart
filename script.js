import { productData } from "./products.js";
let productList = productData;
let carticon = document.querySelector(".carticon");
let sidebar = document.querySelector(".sidebar");
let sidebarclosebtn = document.querySelector(".sidebar__closebtn");
let shopItemHtml = document.querySelector(".app__productcontainer");
let sidebarContainerHtml = document.querySelector(".sidebar__itemcontainer");
let carts = [];
let localsavedata = [];
let carticonnumberhtml = document.querySelector(".carticon__number");
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
      let { name, price, image, id } = product;
      let htmlData = `
<div class="app__productcontainer-item" id ="${id}">
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
shopItemHtml.addEventListener("click", (event) => {
  if (event.target.classList.contains("app__productcontainer-item-btn")) {
    console.log(event.target.parentElement);

    let productId = event.target.parentElement.id;
    addToCart(productId);
  }
});

let addToCart = (productId) => {
  let positionofproductincarts = carts.findIndex((value) => {
    return value.id == productId;
  });
  if (carts.length <= 0) {
    carts.push({
      id: productId,
      quantity: 1,
    });
  } else if (positionofproductincarts < 0) {
    carts.push({
      id: productId,
      quantity: 1,
    });
  } else {
    carts[positionofproductincarts].quantity =
      carts[positionofproductincarts].quantity + 1;
  }
  console.log(carts);
  addCartDataToSidebar();
  addCartToLocalStorage();
};

let addCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

let totalpricehtml = document.querySelector(".sidebar__total-price");
let addCartDataToSidebar = () => {
  let totalQuantity = carts
    .map((element) => {
      return element.quantity;
    })
    .reduce((c, a) => {
      return c + a;
    }, 0);

  let totalPrice = carts.reduce((sum, item) => {
    let product = productList.find((p) => p.id == item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  totalpricehtml.innerHTML = `Total $${totalPrice}`;
  console.log("total price", totalPrice);

  carticonnumberhtml.innerHTML = totalQuantity;
  sidebarContainerHtml.innerHTML = "";
  if (carts.length > 0) {
    carts.forEach((cart) => {
      let productDatabaseIndex = productList.findIndex((data) => {
        return data.id == cart.id;
      });
      if (productDatabaseIndex >= 0) {
        let { name, price, image, id } = productData[productDatabaseIndex];
        let sidebarHtml = `     <div class="sidebar__item">
        <img src="${image}" alt="" />

        <div class="sidebar__item-details">
          <h2 class="sidebar__item-title">${name}</h2>

          <span class="sidebar__item-price">$${price * cart.quantity}</span>

          <div class="sidebar__item-btn" id="${id}">
            <button id="decrement">-</button>
            <span class="sidebar__item-quantity">${cart.quantity}</span>
            <button id="increment">+</button>
          </div>
        </div>
        <div class="sidebar__item-delete" id="${id}">
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
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>`;

        sidebarContainerHtml.innerHTML += sidebarHtml;
      }
    });
  }
};
function getdata() {
  if (localStorage.getItem("cart")) {
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    data.forEach((e, i) => {
      data[i].id = Number(e.id);
    });
    carts = data;
    addCartDataToSidebar();
    console.log(data);
  }
}
getdata();

sidebarContainerHtml.addEventListener("click", (event) => {
  let element = event.target;
  let selectitemid = element.parentElement.id;

  if (element.id == "increment") {
    sidebarPlusMinusOperation(selectitemid, "plus");
  } else if (element.id == "decrement") {
    sidebarPlusMinusOperation(selectitemid, "minus");
  }
  if (element.parentElement.classList.contains("sidebar__item-delete")) {
    DeleteSidebarData(element.parentElement.id);
  }
});
const DeleteSidebarData = (id) => {
  let findindexincarts = carts.findIndex((e, i) => {
    return id == e.id;
  });
  console.log("delete", findindexincarts);
  carts.splice(findindexincarts, 1);
  addCartDataToSidebar();
  addCartToLocalStorage();
};

let sidebarPlusMinusOperation = (id, operation) => {
  let indexincart = carts.findIndex((value) => {
    return value.id == id;
  });

  if (indexincart >= 0) {
    if (operation == "plus") {
      addToCart(id);
      addCartToLocalStorage();
    } else if (operation == "minus") {
      if (carts[indexincart].quantity > 0) {
        carts[indexincart].quantity = carts[indexincart].quantity - 1;
        addCartDataToSidebar();
        addCartToLocalStorage();
        console.log(carts);
      } else {
        console.log(indexincart);
        carts.splice(indexincart, 1);
        addCartDataToSidebar();
      }
    }
  }
};
