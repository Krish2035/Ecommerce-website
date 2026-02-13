import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

if (!productContainer || !productTemplate) {
    console.error("productContainer or productTemplate not found in DOM. Ensure the template and container exist before the script runs.");
}

export const showProductContainer = (products) => {

    if(!products){
        return false;
    }

    products.forEach((curProd) => {
        const { brand, category, description, id, image, name, price, stock } = curProd;

        const productClone = document.importNode(productTemplate.content, true);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productStock").textContent = stock;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector(".productPrice").textContent = `₹${price}`;
        productClone.querySelector(".productActualPrice").textContent = `₹${price * 4}`;

        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
        });

        const addBtn = productClone.querySelector(".add-to-cart-button");
        if (addBtn) {
            addBtn.addEventListener("click", (event) => {
                addToCart(event, id, stock);
            });
        } else {
            console.warn(`Add-to-cart button not found for product id=${id}`);
        }

        productContainer.append(productClone);
    });
};