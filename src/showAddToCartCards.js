import products from "../api/products.json";
import { getCartProductFromLS } from "./getCartProducts";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { removeProdFromCart } from "./removeProdFromCart";
import { incrementDecrement } from "./incrementDecrement";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

if (!cartElement || !templateContainer) {
    console.error("productCartContainer or productCartTemplate not found in DOM.");
}

const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        const productClone = document.importNode(templateContainer.content, true);

        const lsActualData = fetchQuantityFromCartLS(id, price);

        const cardElem = productClone.querySelector("#cardValue");
        if (cardElem) cardElem.setAttribute("id", `card${id}`);

        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lsActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lsActualData.price;

        productClone
        .querySelector(".stockElement")
        .addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
        });

        productClone.querySelector('.remove-to-cart-button')
        .addEventListener("click", () => removeProdFromCart(id));

        cartElement.appendChild(productClone);
    });
};

showCartProduct();

updateCartProductTotal();