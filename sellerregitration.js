const form=document.querySelector(".form-box");
const fileInput=document.querySelector('input[type="file"]');

const preview=document.createElement("img");
preview.style.width="100%";
preview.style.display="none";
fileInput.parentElement.appendChild(preview);

fileInput.addEventListener("change",function(){
 const reader=new FileReader();
 reader.onload=()=>{ preview.src=reader.result; preview.style.display="block"; }
 reader.readAsDataURL(this.files[0]);
});

form.addEventListener("submit",function(e){
 e.preventDefault();

 const inputs=form.querySelectorAll("input, select");

 const seller={
  businessName:inputs[0].value,
  ownerName:inputs[1].value,
  nationalId:inputs[2].value,
  idPicture:preview.src,
  phone:inputs[4].value,
  email:inputs[5].value,
  gender:inputs[6].value,
  date:new Date().toLocaleString()
 };

 let sellers=JSON.parse(localStorage.getItem("sellerApplications"))||[];
 sellers.push(seller);
 localStorage.setItem("sellerApplications",JSON.stringify(sellers));

 alert("Seller registration submitted successfully!");
 form.reset(); preview.style.display="none";
});