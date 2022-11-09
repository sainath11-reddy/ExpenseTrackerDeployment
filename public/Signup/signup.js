const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(name.value=='' || email.value =='' || password.value==''){
        alert("Fill all the elements")
    }
    else{
        const obj = {
            "name":name.value,
            "email":email.value,
            "phoneNumber":password.value
        }
        axios.post('http://localhost:5000/signin',obj);

    }
})