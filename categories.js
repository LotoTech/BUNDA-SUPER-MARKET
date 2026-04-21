// ALL CATEGORIES
const categories = [
    "Electronics",
    "Phones",
    "Laptops",
    "Fashion",
    "Shoes",
    "Groceries",
    "Books",
    "Furniture",
    "Beauty",
    "Sports",
    "Accessories",
    "Food",
    "Stationery",
    "Bags",
    "Watches"
];

// SAMPLE PRODUCTS DATABASE
const products = [
    {name:"iPhone 11", category:"Phones", image:"https://via.placeholder.com/200"},
    {name:"HP Laptop", category:"Laptops", image:"https://via.placeholder.com/200"},
    {name:"Sneakers", category:"Shoes", image:"https://via.placeholder.com/200"},
    {name:"Rice Bag", category:"Groceries", image:"https://via.placeholder.com/200"},
    {name:"Handbag", category:"Bags", image:"https://via.placeholder.com/200"},
    {name:"Face Cream", category:"Beauty", image:"https://via.placeholder.com/200"},
    {name:"Football", category:"Sports", image:"https://via.placeholder.com/200"},
    {name:"Notebook", category:"Stationery", image:"https://via.placeholder.com/200"},
    {name:"Smart Watch", category:"Watches", image:"https://via.placeholder.com/200"}
];

const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

// SHOW CATEGORIES
categories.forEach(cat=>{
    const div = document.createElement("div");
    div.className="category-card";
    div.innerHTML = `<h3>${cat}</h3>`;
    div.onclick = ()=>filterCategory(cat);
    categoryContainer.appendChild(div);
});

// SHOW PRODUCTS
function displayProducts(list){
    productContainer.innerHTML="";
    list.forEach(p=>{
        productContainer.innerHTML += `
        <div class="product-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.category}</p>
        </div>`;
    });
}

// FILTER BY CATEGORY
function filterCategory(cat){
    const filtered = products.filter(p=>p.category===cat);
    displayProducts(filtered);
}

// SEARCH FUNCTION
searchInput.addEventListener("keyup", ()=>{
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

// INITIAL LOAD
displayProducts(products);