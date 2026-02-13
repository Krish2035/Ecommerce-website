import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {

    let productSubTotal = document.querySelector(".productSubTotal");
    let productFinalTotal = document.querySelector(".productFinalTotal");
    let productTax = document.querySelector(".productTax");

    let localCartProducts = getCartProductFromLS();
    let initialValue = 0;
    let totalProductPrice = localCartProducts.reduce((accum, curElem, index, arr, tj) => {
        
        let productPrice = parseInt(curElem.price) || 0;
        return accum + productPrice;

    },initialValue);

    // If no products in cart, show ₹0 for subtotal and final total (don't add fixed fee)
    if (!productSubTotal || !productFinalTotal) return;

    productSubTotal.textContent = `₹${totalProductPrice}`;

    const taxAmount = totalProductPrice > 0 ? 50 : 0;

    if (productTax) productTax.textContent = `₹${taxAmount}`;

    productFinalTotal.textContent = `₹${totalProductPrice + taxAmount}`;
};