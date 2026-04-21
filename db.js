function get(key){
    return JSON.parse(localStorage.getItem(key)) || [];
}

function set(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

// check approved seller
function isApprovedSeller(businessName){
    let approved = get("approvedSellers");
    return approved.some(s => s.businessName === businessName);
}