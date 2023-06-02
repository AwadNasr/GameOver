// ? =============> Global ===============>
const inputs=document.querySelectorAll('input')
const btnLogin=document.getElementById('btnLogin')
const form=document.getElementById('login')
let isValid=false
// ! =============> When Start ===============>


// * =============> Events ===============>
form.addEventListener('submit',function(e){
    e.preventDefault()
    if(isValid){
        setData()
    }
})
form.addEventListener('input',function(){
    if(validationEmail() && validationPassword()){
        isValid=true
    }else{
        isValid=false
    }
})
// ! =============> Functions ===============>
function setData(){
    let user={
        email:inputs[0].value,
        password:inputs[1].value,
    }
    console.log(user);
    dataLogin(user)
}
async function dataLogin(userData){
    const api= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    const response = await api.json();
    if (response.message === "success") {
        localStorage.setItem("uToken", response.token);     //This is token session
        location.href = "./home.html";
     } else {
        document.getElementById("msg").innerHTML = response.message;
     }
     console.log(response);
}
//  =============> Validation ===============>
function validationEmail(){
    const regex=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regex.test(inputs[0].value)){
        inputs[0].classList.add("is-valid")
        inputs[0].classList.remove("is-invalid")
        return true
    }else{
        inputs[0].classList.add("is-invalid")
        inputs[0].classList.remove("is-valid")
        return false
    }
}

function validationPassword(){
    const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regex.test(inputs[1].value)){
        inputs[1].classList.add("is-valid")
        inputs[1].classList.remove("is-invalid")
        return true
    }else{
        inputs[1].classList.add("is-invalid")
        inputs[1].classList.remove("is-valid")
        return false
    }
}



