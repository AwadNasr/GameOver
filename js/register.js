// ? =============> Global ===============>
const inputs=document.querySelectorAll('input')
const btnRegister=document.getElementById('btnRegister')
const form=document.getElementById('register')
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
    if(validationName() && validationEmail() && validationPassword() && validationRepassword() && validationPhone() ){
        isValid=true
    }else{
        isValid=false
    }
})
// ! =============> Functions ===============>
function setData(){
    let user={
        name:inputs[0].value,
        email:inputs[1].value,
        password:inputs[2].value,
        rePassword:inputs[3].value,
        phone:inputs[4].value,
    }
    console.log(user);
    dataRegister(user)
}

async function dataRegister(userData){
    const api= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    const response = await api.json();
    if (response.message === "success") {
        console.log(response);
        location.href = "./index.html";
     } else {
        document.getElementById("msg").innerHTML = response.errors?.msg || response.message ;
     }
     console.log(response);
}

//  =============> Validation ===============>
function validationName(){
    const regex=/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
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

function validationEmail(){
    const regex=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
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

function validationPassword(){
    const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regex.test(inputs[2].value)){
        inputs[2].classList.add("is-valid")
        inputs[2].classList.remove("is-invalid")
        return true
    }else{
        inputs[2].classList.add("is-invalid")
        inputs[2].classList.remove("is-valid")
        return false
    }
}
function validationRepassword(){
    const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regex.test(inputs[3].value)){
        inputs[3].classList.add("is-valid")
        inputs[3].classList.remove("is-invalid")
        return true
    }else{
        inputs[3].classList.add("is-invalid")
        inputs[3].classList.remove("is-valid")
        return false
    }
}

function validationPhone(){
    const regex=/^01[0125][0-9]{8}$/
    if(regex.test(inputs[4].value)){
        inputs[4].classList.add("is-valid")
        inputs[4].classList.remove("is-invalid")
        return true
    }else{
        inputs[4].classList.add("is-invalid")
        inputs[4].classList.remove("is-valid")
        return false
    }
}

