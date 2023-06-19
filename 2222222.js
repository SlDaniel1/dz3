document.addEventListener("DOMContentLoaded", function() {
  var addButton = document.getElementById("add-button");
  var productInput = document.getElementById("product-input");
  var productList = document.getElementById("product-list");
  var productTable = document.getElementById("product-table");
  
  addProductWithName("Кавун");
  addProductWithName("Банан");
  addProductWithName("Мандарин");

  addButton.addEventListener("click", addProduct);

  productInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      addProduct();
    }
  });

  function addProductWithName(productName) {
    productInput.value = productName;
    addProduct();
  }
  

  function addProduct() {
    var productName = productInput.value;

    if (productName !== "") {
      var isValidProduct = checkProductExists(productName);

      if (isValidProduct) {
        var newWindow = document.createElement("div");
        newWindow.className = "new-window";

        var productText = document.createElement("span");
        productText.className = "item-name";
        productText.textContent = productName;

        var quantityContainer = document.createElement("div");
        quantityContainer.className = "item-quantity";

        var decrementButton = document.createElement("button");
        decrementButton.className = "quantity-button decrement";
        decrementButton.textContent = "-";
        decrementButton.addEventListener("click", function() {
          decrementQuantity(quantityInput, decrementButton);
        });

        var quantityInput = document.createElement("input");
        quantityInput.className = "quantity-input";
        quantityInput.type = "text";
        quantityInput.value = "1";

        var incrementButton = document.createElement("button");
        incrementButton.className = "quantity-button increment-button";
        incrementButton.textContent = "+";
        incrementButton.addEventListener("click", function() {
          incrementQuantity(quantityInput, decrementButton);
        });

        quantityContainer.appendChild(decrementButton);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(incrementButton);

        var cancelButton = document.createElement("button");
        cancelButton.className = "cancel-button";
        cancelButton.textContent = "X";
        cancelButton.addEventListener("click", function() {
          newWindow.remove();
        });

        var boughtButton = document.createElement("button");
        boughtButton.className = "bought-button";
        boughtButton.textContent = "Куплено";
        boughtButton.addEventListener("click", function() {
          markAsBought(newWindow);
        });

        var notBoughtButton = document.createElement("button");
        notBoughtButton.className = "not-bought-button";
        notBoughtButton.textContent = "Не куплено";
        notBoughtButton.style.display = "none";
        notBoughtButton.addEventListener("click", function() {
          markAsNotBought(newWindow);
        });

        newWindow.appendChild(productText);
        newWindow.appendChild(quantityContainer);
        newWindow.appendChild(boughtButton);
        newWindow.appendChild(notBoughtButton);
        newWindow.appendChild(cancelButton);

        productList.appendChild(newWindow);

        productInput.value = "";
        productInput.focus();
      } else {
        alert("Такого товара не найдено!");
      }
    }
  }

  function checkProductExists(productName) {
    var rows = productTable.querySelectorAll("tbody tr");
    for (var i = 0; i < rows.length; i++) {
      var name = rows[i].querySelector("td:first-child").textContent;
      if (name.toLowerCase() === productName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function incrementQuantity(input, decrementButton) {
    var value = parseInt(input.value);
    input.value = (value + 1).toString();
    decrementButton.classList.remove("lighter");
  }

  function decrementQuantity(input, decrementButton) {
    var value = parseInt(input.value);
    if (value > 1) {
      input.value = (value - 1).toString();
    } else {
      decrementButton.classList.add("lighter");
    }
  }

  function markAsBought(item) {
    var productNameElement = item.querySelector(".item-name");
    var quantityInput = item.querySelector(".quantity-input");
    var decrementButton = item.querySelector(".decrement");
    var incrementButton = item.querySelector(".increment-button");
    var cancelButton = item.querySelector(".cancel-button");
    var boughtButton = item.querySelector(".bought-button");
    var notBoughtButton = item.querySelector(".not-bought-button");

    var productName = productNameElement.textContent;
    var quantity = quantityInput.value;

    var boughtItemsDiv = document.querySelector(".sub-box1");
    var dif = calculateQuantityDifference(productName, quantity);

    var newItemText = document.createElement("div");
    newItemText.classList.add("added-text1");
    newItemText.textContent = productName + ": " + dif;
    boughtItemsDiv.appendChild(newItemText);

    var boughtItemsDiv = document.querySelector(".sub-box2");

    var newItemText = document.createElement("div");
    newItemText.classList.add("added-text");
    newItemText.textContent = productName + ": " + quantity;

    

    boughtItemsDiv.appendChild(newItemText);

    productNameElement.classList.toggle("bought");
    quantityInput.style.display = "none";
    decrementButton.style.display = "none";
    incrementButton.style.display = "none";

    boughtButton.style.display = "none";
    notBoughtButton.style.display = "inline-block";

    cancelButton.style.display = "none";
    productNameElement.style.textDecoration = "line-through";
  }
  function calculateQuantityDifference(productName, quantity) {
    var rows = productTable.querySelectorAll("tbody tr");
    for (var i = 0; i < rows.length; i++) {
      var name = rows[i].querySelector("td:first-child").textContent;
      if (name.toLowerCase() === productName.toLowerCase()) {
        var tableQuantity = parseInt(rows[i].querySelector("td:last-child").textContent);
        return tableQuantity - quantity;
      }
    }
    return 0;
  }
  function markAsNotBought(item) {
    var productNameElement = item.querySelector(".item-name");
    var quantityInput = item.querySelector(".quantity-input");
    var decrementButton = item.querySelector(".decrement");
    var incrementButton = item.querySelector(".increment-button");
    var cancelButton = item.querySelector(".cancel-button");
    var boughtButton = item.querySelector(".bought-button");
    var notBoughtButton = item.querySelector(".not-bought-button");

    var boughtItemsDiv = document.querySelector(".sub-box2");

    var itemName = productNameElement.textContent;
    var items = boughtItemsDiv.getElementsByClassName("added-text");

    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i].textContent.includes(itemName)) {
        boughtItemsDiv.removeChild(items[i]);
      }
    }
    
    var boughtItemsDiv = document.querySelector(".sub-box1");

    var itemName = productNameElement.textContent;
    var items = boughtItemsDiv.getElementsByClassName("added-text1");

    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i].textContent.includes(itemName)) {
        boughtItemsDiv.removeChild(items[i]);
      }
    }

    productNameElement.classList.remove("bought");
    quantityInput.style.display = "block";
    decrementButton.style.display = "inline-block";
    incrementButton.style.display = "inline-block";

    boughtButton.style.display = "inline-block";
    notBoughtButton.style.display = "none";

    cancelButton.style.display = "inline-block";
    productNameElement.style.textDecoration = "none";
  }
});










                      





 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


