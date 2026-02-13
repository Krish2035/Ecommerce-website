import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const incrementDecrement = (event, id, stock, price) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    if (!currentCardElement) return;

    const productQuantityElem = currentCardElement.querySelector(".productQuantity");
    const productPriceElem = currentCardElement.querySelector(".productPrice");

    let quantity = 1;

    let localCartProducts = getCartProductFromLS();
    let existingProd = localCartProducts.find((curProd) => curProd.id === id);

    if (existingProd) {
        quantity = Number(existingProd.quantity) || 1;
    }

    const btn = event.target.closest('.cartIncrement, .cartDecrement');
    if (!btn) return;

    console.log('incrementDecrement clicked ->', { id, btn: btn.className, currentQuantity: quantity, stock, price });

    if (btn.classList.contains("cartIncrement")) {
        if (quantity < stock) {
            quantity += 1;
        } else {
            quantity = stock;
        }
    }

    if (btn.classList.contains("cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        }
    }

    const numericPrice = Number(price);
    const newPrice = numericPrice * quantity;

    const updatedCartArray = localCartProducts.some((p) => p.id === id)
        ? localCartProducts.map((curProd) => (curProd.id === id ? { id, quantity, price: newPrice } : curProd))
        : [...localCartProducts, { id, quantity, price: newPrice }];

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCartArray));

    updateCartValue(updatedCartArray);

    if (productQuantityElem) productQuantityElem.innerText = quantity;
    if (productPriceElem) productPriceElem.innerText = `₹${newPrice}`;

    updateCartProductTotal();
};