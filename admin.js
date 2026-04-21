// 🔗 BRIDGE normalize sellerApplications
let sellers = JSON.parse(localStorage.getItem("sellerApplications")) || [];

sellers = sellers.map(s=>({
 businessName:s.businessName,
 ownerName:s.ownerName,
 email:s.email,
 idImage:s.idPicture,
 status:s.status||"Pending",
 products:s.products||0,
 sales:s.sales||0
}));

localStorage.setItem("sellerApplications",JSON.stringify(sellers));

let managerRequests = JSON.parse(localStorage.getItem("managerRequests")) || [];

function saveData(){
 localStorage.setItem("sellerApplications",JSON.stringify(sellers));
 localStorage.setItem("managerRequests",JSON.stringify(managerRequests));
}

function renderSellers(){
 const list=document.getElementById("sellerList"); list.innerHTML="";
 sellers.forEach((seller,index)=>{
 list.innerHTML+=`
 <div class="card">
 <img src="${seller.idImage}" width="100">
 <h3>${seller.businessName}</h3>
 <p>${seller.ownerName}</p>
 <p>${seller.email}</p>

 <button onclick="sendToManager(${index},'approve')">Approve</button>
 <button onclick="sendToManager(${index},'delete')">Delete</button>
 <button onclick="sendToManager(${index},'block')">Block</button>
 </div>`;
 });
}

// 🔥 FIXED LINK TO MANAGER
function sendToManager(index,action){
 let sellers=get("sellerApplications");
 let managerQueue=get("managerQueue");
 let seller=sellers[index];

 managerQueue.push({
  businessName:seller.businessName,
  email:seller.email,
  idImage:seller.idImage,
  action:action,
  date:new Date().toLocaleString()
 });

 set("managerQueue",managerQueue);
 alert("Sent to Manager ✔");
}

renderSellers();