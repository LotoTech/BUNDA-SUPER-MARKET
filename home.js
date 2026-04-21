function get(key){
    return JSON.parse(localStorage.getItem(key)) || [];
}

let currentPage = 1;
const perPage = 8;

const container = document.getElementById("productContainer");
const pageNumber = document.getElementById("pageNumber");

let products = get("products");

/* =========================
   LOAD + DISPLAY
========================= */
function displayProducts(){

    // 🔥 ALWAYS REFRESH FROM LOCALSTORAGE (IMPORTANT FIX)
    products = get("products");

    container.innerHTML = "";

    let start = (currentPage - 1) * perPage;
    let end = start + perPage;

    let pageItems = products.slice(start, end);

    pageItems.forEach(p => {
        container.innerHTML += `
        <div class="product-card">
            <img src="${p.image}" style="width:100%;height:150px;object-fit:cover;">
            <h3>${p.name}</h3>
            <p>MWK ${p.price}</p>
            <small>Seller: ${p.seller || "Unknown"}</small>
        </div>
        `;
    });

    pageNumber.innerText = currentPage;
}

/* =========================
   PAGINATION
========================= */
function nextPage(){
    if(currentPage < Math.ceil(products.length / perPage)){
        currentPage++;
        displayProducts();
    }
}

function prevPage(){
    if(currentPage > 1){
        currentPage--;
        displayProducts();
    }
}

/* =========================
   AUTO UPDATE WHEN SELLER ADDS PRODUCT
========================= */

// 1. When switching tabs/pages
window.addEventListener("storage", (e) => {
    if(e.key === "products"){
        displayProducts();
    }
});

// 2. Backup live sync (same tab fix)
setInterval(() => {
    displayProducts();
}, 1000);

/* =========================
   START
========================= */
displayProducts();