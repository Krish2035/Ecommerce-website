export const homeQuantityToggle = (event, id, stock) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    // console.log(currentCardElement);

    const productQuantity = currentCardElement.querySelector(".productQuantity");
    // console.log(productQuantity);
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    //condition
    if(event.target.className === "cartIncrement"){
        //inner condition
        if(quantity < stock){
            quantity += 1;
        }else if(quantity === stock){
            quantity = stock;
        }
    }

    //condition
    if(event.target.className === "cartDecrement"){
        //inner condition
        if(quantity > 1){
            quantity -= 1;
        }
    }

    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity);
    return quantity;
};