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
          alert("Din varukorg är tom");
      } else {
          alert("Nu har du köpt!");
          cartItems = [];
          saveCart();
          updateCart();
      }
  });
  updateCart();
});
