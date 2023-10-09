
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");


cartIcon.addEventListener("click", () => {
    cart.classList.add("active");

});
closeCart.addEventListener("click" , () => {
    cart.classList.remove("active");
});


// cart Working js
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

// making ready function
function ready(){
    const removeCartButtons = document.getElementsByClassName("cart-remove");
    for(let i=0;i<removeCartButtons.length;i++){
        const button  = removeCartButtons[i];
        button.addEventListener("click" , removeCartItem);
    }

// quantity changes
const quantityInputs = document.getElementsByClassName("cart-quantity");
for(let i=0;i<quantityInputs.length;i++){
    const input = quantityInputs[i];
    input.addEventListener("change",quantityChanged);
}
// Add to Cart
const addCart = document.getElementsByClassName("add-cart");
for(let i=0;i<addCart.length;i++){
    var button = addCart[i];
    button.addEventListener("click",addCartClicked);
}
//buy button work
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);

}
// buy button
function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// remove items from cart
function removeCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

/// add to Cart
function addCartClicked(event){
    const button = event.target;
    const shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title , price , productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    const cartItems = document.getElementsByClassName("cart-content")[0];
    const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(let i=0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
            alert("you have bar nyar");
            return;
        }
    }

var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i> `;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);                        
}



// update total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total ;

    
}


/// lee pale kor