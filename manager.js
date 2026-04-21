// =========================
// LOAD DATABASE
// =========================
let managerQueue   = JSON.parse(localStorage.getItem("managerQueue")) || [];
let approvedSellers = JSON.parse(localStorage.getItem("approvedSellers")) || [];
let blockedSellers  = JSON.parse(localStorage.getItem("blockedSellers")) || [];

// =========================
// SAVE DATABASE
// =========================
function saveDB(){
    localStorage.setItem("managerQueue", JSON.stringify(managerQueue));
    localStorage.setItem("approvedSellers", JSON.stringify(approvedSellers));
    localStorage.setItem("blockedSellers", JSON.stringify(blockedSellers));
}

// =========================
// APPROVE SELLER
// =========================
function approveSeller(index){

    let seller = managerQueue[index];
    approvedSellers.push(seller);

    managerQueue.splice(index,1);
    saveDB();
    loadAllTables();

    alert("Seller Approved Successfully");
}

// =========================
// BLOCK SELLER
// =========================
function blockSeller(index){

    let seller = approvedSellers[index];
    blockedSellers.push(seller);

    approvedSellers.splice(index,1);
    saveDB();
    loadAllTables();

    alert("Seller Blocked");
}

// =========================
// UNBLOCK SELLER
// =========================
function unblockSeller(index){

    let seller = blockedSellers[index];
    approvedSellers.push(seller);

    blockedSellers.splice(index,1);
    saveDB();
    loadAllTables();

    alert("Seller Unblocked");
}

// =========================
// DELETE SELLER (FROM QUEUE)
// =========================
function deleteSeller(index){

    if(!confirm("Delete this seller permanently?")) return;

    managerQueue.splice(index,1);
    saveDB();
    loadAllTables();
}

// =========================
// RENDER TABLES
// =========================
function loadAllTables(){
    loadPending();
    loadApproved();
    loadBlocked();
}

// =========================
// PENDING SELLERS
// =========================
function loadPending(){
    let box = document.getElementById("pendingTable");
    if(!box) return;

    box.innerHTML = "";

    managerQueue.forEach((seller,index)=>{
        box.innerHTML += `
            <div class="sellerCard">
                <h3>${seller.businessName}</h3>
                <p>${seller.ownerName}</p>

                <button onclick="approveSeller(${index})">Approve</button>
                <button onclick="deleteSeller(${index})">Delete</button>
            </div>
        `;
    });
}

// =========================
// APPROVED SELLERS
// =========================
function loadApproved(){
    let box = document.getElementById("approvedTable");
    if(!box) return;

    box.innerHTML = "";

    approvedSellers.forEach((seller,index)=>{
        box.innerHTML += `
            <div class="sellerCard">
                <h3>${seller.businessName}</h3>
                <p>${seller.ownerName}</p>

                <button onclick="blockSeller(${index})">Block</button>
            </div>
        `;
    });
}

// =========================
// BLOCKED SELLERS
// =========================
function loadBlocked(){
    let box = document.getElementById("blockedTable");
    if(!box) return;

    box.innerHTML = "";

    blockedSellers.forEach((seller,index)=>{
        box.innerHTML += `
            <div class="sellerCard">
                <h3>${seller.businessName}</h3>
                <p>${seller.ownerName}</p>

                <button onclick="unblockSeller(${index})">Unblock</button>
            </div>
        `;
    });
}

// =========================
// AUTO LOAD
// =========================
window.onload = loadAllTables;