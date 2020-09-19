var productContainer,
  indx,
  nameVal = false,
  priceVal = false,
  quantVal = false;

if (localStorage.getItem("productData") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productData"));
  displayProducts();
}
var addptn = document.getElementById("addPro");
var clrptn = document.getElementById("clrData");
var updtptn = document.getElementById("updatePro");

function chekNamekVal(productName) {
  var nameRegex = /^[A-Z][a-z]{2,8}/;
  if (nameRegex.test(productName) == false) {
    document.getElementById("productName").classList.add("is-invalid");
    nameVal = false;
  } else {
    document.getElementById("productName").classList.remove("is-invalid");
    document.getElementById("productName").classList.add("is-valid");
    nameVal = true;
  }
  if (nameVal && priceVal && quantVal == true) {
    addptn.removeAttribute("disabled");
  }
}

function chekPriceVal(productPrice) {
  var priceRegex = /^([1-9][0-9]{0,3}|10000)$/;
  if (priceRegex.test(productPrice) == false) {
    document.getElementById("productPrice").classList.add("is-invalid");
    priceVal = false;
  } else {
    document.getElementById("productPrice").classList.remove("is-invalid");
    document.getElementById("productPrice").classList.add("is-valid");
    priceVal = true;
  }
  if (nameVal && priceVal && quantVal == true) {
    addptn.removeAttribute("disabled");
  }
}

function chekQuantVal(productQuant) {
  var quantRegex = /^([1-9][0-9]{0,2}|1000)$/;
  if (quantRegex.test(productQuant) == false) {
    document.getElementById("productQuantity").classList.add("is-invalid");
    quantVal = false;
  } else {
    document.getElementById("productQuantity").classList.remove("is-invalid");
    document.getElementById("productQuantity").classList.add("is-valid");
    quantVal = true;
  }
  if (nameVal && priceVal && quantVal == true) {
    addptn.removeAttribute("disabled");
  }
}

function clearStyle() {
  document.getElementById("productName").classList.remove("is-valid");
  document.getElementById("productName").classList.remove("is-invalid");
  document.getElementById("productPrice").classList.remove("is-valid");
  document.getElementById("productPrice").classList.remove("is-invalid");
  document.getElementById("productQuantity").classList.remove("is-valid");
  document.getElementById("productQuantity").classList.remove("is-invalid");
}

function clearData() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  var rad = document.getElementsByName("sales");
  for (var i = 0; i < rad.length; i++) {
    rad[i].checked = false;
  }
  document.getElementById("productQuantity").value = "";
  document.getElementById("productCategory").selectedIndex = 0;
  document.getElementById("producDesc").value = "";
  clearStyle();
  addptn.setAttribute("disabled", "true");
}

function deletePro(id) {
  var x = productContainer.splice(id, 1);
  localStorage.setItem("productData", JSON.stringify(productContainer));
  displayProducts();
}

function updatePro(id) {
  document.getElementById("productName").value = productContainer[id].name;
  document.getElementById("productPrice").value = productContainer[id].price;
  var onSale = false;
  if (productContainer[id].saleVal == true) {
    document.getElementsByName("sales")[1].checked = true;
    onSale = true;
  } else {
    document.getElementsByName("sales")[0].checked = true;
  }
  document.getElementById("productQuantity").value =
    productContainer[id].quantity;
  document.getElementById("productCategory").value =
    productContainer[id].category;
  document.getElementById("producDesc").value =
    productContainer[id].description;
  indx = id;
  addptn.classList.add("d-none");
  updtptn.classList.remove("d-none");
}

function updated() {
  productContainer[indx].name = document.getElementById("productName").value;
  productContainer[indx].price = document.getElementById("productPrice").value;
  var sales = document.getElementsByName("sales");
  var onSale = false;
  if (sales[1].checked == true) {
    onSale = true;
  }
  productContainer[indx].saleVal = onSale;
  productContainer[indx].quantity = document.getElementById(
    "productQuantity"
  ).value;
  productContainer[indx].category = document.getElementById(
    "productCategory"
  ).value;
  productContainer[indx].description = document.getElementById(
    "producDesc"
  ).value;
  addptn.classList.remove("d-none");
  updtptn.classList.add("d-none");

  localStorage.setItem("productData", JSON.stringify(productContainer));
  displayProducts();
  clearData();
}

function displayProducts() {
  var temp = ``;

  for (var i = 0; i < productContainer.length; i++) {
    temp +=
      `<div class="col-lg-4 col-md-6 col-sm-12 p-3">
<div class="bg-light disInfo">
  <div class="p-2">
    <h3>` +
      productContainer[i].name +
      `</h3>
    <p>` +
      productContainer[i].description +
      `</p><h3>` +
      productContainer[i].price +
      `$</h3><span class="badge badge-info float-right mt-1">` +
      productContainer[i].category +
      `</span>`;
    if (productContainer[i].saleVal == true) {
      temp += '<div class="sale">sale</div>';
    }
    temp +=
      `<button onclick="updatePro(` +
      i +
      `)" class="btn btn-info px-3">Update</button>
    <button onclick="deletePro(` +
      i +
      `)" class="btn btn-outline-danger px-3">Delete</button>
    </div>
    </div>
    </div>`;
  }
  document.getElementById("displayProducts").innerHTML = temp;
}

function add() {
  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;
  var sales = document.getElementsByName("sales");
  var onSale = false;
  if (sales[1].checked == true) {
    onSale = true;
  }
  var productQuantity = document.getElementById("productQuantity").value;
  var productCategory = document.getElementById("productCategory").value;
  var producDesc = document.getElementById("producDesc").value;
  var product = {
    name: productName,
    price: productPrice,
    saleVal: onSale,
    quantity: productQuantity,
    category: productCategory,
    description: producDesc,
  };
  if (nameVal || priceVal || quantVal == false) {
    return alert("PLEASE ENTER VALID DATA");
  }
  productContainer.push(product);
  localStorage.setItem("productData", JSON.stringify(productContainer));

  displayProducts();
  clearData();
  clearStyle();
}

function searchPro(key) {
  var temp = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(key.toLowerCase())) {
      temp +=
        `<div class="col-lg-4 col-md-6 col-sm-12 p-3">
            <div class="bg-light disInfo">
              <img class="img-fluid" src="images/iphone.jpg"/>
            <div class="p-2">
            <h3>` +
        productContainer[i].name +
        `<span class="badge badge-info float-right mt-1">` +
        productContainer[i].category +
        `</span></h3>
    <p>` +
        productContainer[i].description +
        `</p><h3>` +
        productContainer[i].price +
        `$</h3>`;
      if (productContainer[i].saleVal == true) {
        temp += '<div class="sale">sale</div>';
      }
      temp += `<button class="btn btn-info px-3">Update</button>
    <button class="btn btn-outline-danger px-3">Delete</button>
    </div>
    </div>
    </div>`;
    }
  }
  document.getElementById("displayProducts").innerHTML = temp;
}

addptn.addEventListener("click", add);
clrptn.addEventListener("click", clearData);
updtptn.addEventListener("click", updated);
