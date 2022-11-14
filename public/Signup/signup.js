const form = document.querySelector('form');


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let  name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    if(name.value=='' || email.value =='' || password.value==''){
        alert("Fill all the elements")
    }
    else{
        const obj = {
            "name":name.value,
            "email":email.value,
            "password":password.value
        }
        console.log(name.value, email.value, password.value);
        axios.post('http://localhost:5000/users/signup',obj).then(res =>{
            console.log(res);
            window.location.href = "../Login/login.html"
        }).catch(err =>{
            form.innerHTML+="<p>Error: Request failed with status code 403<p>";
        });
    }
})