// =========================
// LOAD DATABASE
// =========================
let products = JSON.parse(localStorage.getItem("products")) || [];

// =========================
// SAVE DATABASE
// =========================
function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

// =========================
// GET CURRENT SELLER
// (simple login simulation)
// =========================
function getCurrentSeller(){
    return localStorage.getItem("loggedSeller") || "Demo Seller";
}

// =========================
// ADD PRODUCT
// =========================
function addProduct(){

    let name = document.getElementById("pname").value.trim();
    let price = document.getElementById("pprice").value.trim();
    let desc = document.getElementById("pdesc").value.trim();
    let imageFile = document.getElementById("pimage").files[0];
    let videoFile = document.getElementById("pvideo").files[0];

    if(name === "" || price === ""){
        alert("Please fill Product Name and Price");
        return;
    }

    let seller = getCurrentSeller();

    // Convert files to base64
    let imageReader = new FileReader();
    let videoReader = new FileReader();

    imageReader.onload = function(){
        let imageData = imageReader.result;

        if(videoFile){
            videoReader.onload = function(){
                let videoData = videoReader.result;
                saveProduct(name, price, desc, imageData, videoData, seller);
            };
            videoReader.readAsDataURL(videoFile);
        } else {
            saveProduct(name, price, desc, imageData, "", seller);
        }
    };

    if(imageFile){
        imageReader.readAsDataURL(imageFile);
    } else {
        saveProduct(name, price, desc, "", "", seller);
    }
}

// =========================
// SAVE PRODUCT OBJECT
// =========================
function saveProduct(name, price, desc, image, video, seller){

    let product = {
        id: Date.now(),
        name: name,
        price: price,
        desc: desc,
        image: image,
        video: video,
        seller: seller
    };

    products.push(product);
    saveProducts();
    loadProducts();

    alert("Product Added Successfully!");

    // clear form
    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pdesc").value = "";
    document.getElementById("pimage").value = "";
    document.getElementById("pvideo").value = "";
}

// =========================
// LOAD SELLER PRODUCTS
// =========================
function loadProducts(){

    let seller = getCurrentSeller();
    let container = document.getElementById("productList");
    container.innerHTML = "";

    let myProducts = products.filter(p => p.seller === seller);

    if(myProducts.length === 0){
        container.innerHTML = "<p>No products yet</p>";
        return;
    }

    myProducts.reverse().forEach(product => {

        let div = document.createElement("div");
        div.className = "productCard";

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p><b>Price:</b> MK ${product.price}</p>
            <p>${product.desc}</p>

            ${product.image ? `<img src="${product.image}" width="100%">` : ""}
            ${product.video ? `<video src="${product.video}" controls width="100%"></video>` : ""}

            <button onclick="deleteProduct(${product.id})">
                <i class="fa fa-trash"></i> Delete
            </button>
        `;

        container.appendChild(div);
    });
}

// =========================
// DELETE PRODUCT
// =========================
function deleteProduct(id){

    if(!confirm("Delete this product?")) return;

    products = products.filter(p => p.id !== id);
    saveProducts();
    loadProducts();
}

// =========================
// AUTO LOAD PRODUCTS
// =========================
window.onload = loadProducts;