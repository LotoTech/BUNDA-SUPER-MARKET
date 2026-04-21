let cart = [
    {name:"Sneakers", price:25000, image:"https://via.placeholder.com/200"},
    {name:"HP Laptop", price:450000, image:"https://via.placeholder.com/200"}
];

const container = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");

function displayCart(){
    container.innerHTML="";
    let total = 0;

    cart.forEach((item,index)=>{
        total += item.price;

        container.innerHTML += `
        <div class="cart-card">
            <img src="${item.image}">
            <h3><i class="fas fa-box"></i> ${item.name}</h3>
            <p><i class="fas fa-money-bill"></i> MWK ${item.price}</p>
            <button class="remove-btn" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>`;
    });

    totalPrice.innerText = total;
}

function removeItem(index){
    cart.splice(index,1);
    displayCart();
}

displayCart();