document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let role = document.getElementById("role").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(role === "" || email === "" || username === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    alert("Login Successful as " + role);

    // redirect based on role
     if(role === "Admin"){
        window.location.href = "admin.html";
    }
    else if(role === "Seller"){
        window.location.href = "seller.html";
    }
    else if(role === "Manager"){
        window.location.href = "manager.html";
    }
});