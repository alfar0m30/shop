document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");


    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    const updateCart = () => {
        cartList.innerHTML = "";
        let total = 0;
        cartItems.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} kr`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Ta bort";
            removeBtn.style.marginLeft = "1rem";
            removeBtn.addEventListener("click", () => {
                cartItems.splice(index, 1);
                saveCart();
                updateCart();
            });

            li.appendChild(removeBtn);
            cartList.appendChild(li);
        });

        totalDisplay.textContent = `Totalt: ${total} kr`;
    };

    let existingMessage = null;
    let messageTimeout = null;
    
    const showMessage = (message) => {
        if (existingMessage) {

            existingMessage.textContent = message;
            
            clearTimeout(messageTimeout);
            messageTimeout = setTimeout(removeMessage, 3000);
            return;
        }

        existingMessage = document.createElement("div");
        existingMessage.textContent = message;
        existingMessage.style.position = "fixed";
        existingMessage.style.top = "50%";
        existingMessage.style.left = "50%";
        existingMessage.style.transform = "translate(-50%, -50%)";
        existingMessage.style.background = "violet";
        existingMessage.style.color = "black";
        existingMessage.style.padding = "20px";
        existingMessage.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
        existingMessage.style.borderRadius = "8px";
        existingMessage.style.zIndex = "1000";
        existingMessage.style.textAlign = "center";
        existingMessage.style.fontSize = "18px";
        existingMessage.style.fontWeight = "bold";
        existingMessage.style.border = "solid black";
        existingMessage.style.opacity = "1";
        existingMessage.style.transition = "opacity 0.5s ease-out";
    
        document.body.appendChild(existingMessage);
    

        messageTimeout = setTimeout(removeMessage, 3000);
    };
    
    const removeMessage = () => {
        if (existingMessage) {
            existingMessage.style.opacity = "0";
            setTimeout(() => {
                if (existingMessage) {
                    document.body.removeChild(existingMessage);
                    existingMessage = null;
                }
            }, 500);
        }
    };

    
    
    
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const name = product.getAttribute("data-name");
            const price = parseInt(product.getAttribute("data-price"));
            cartItems.push({ name, price });
            saveCart();
            updateCart();
        });
    });

    document.getElementById("checkout").addEventListener("click", function () {
        if (cartItems.length === 0) {
            showMessage("Din varukorg är tom\n");
        } else {
            showMessage("Nu har du köpt!\n");
            cartItems = [];
            saveCart();
            updateCart();
        }
    });

    updateCart();
});
