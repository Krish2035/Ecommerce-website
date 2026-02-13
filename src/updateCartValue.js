const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (cartProducts) => {
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping fa-2x"> ${cartProducts.length} </i>`);
};