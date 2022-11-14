const form = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const p=document.querySelector('body p')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let obj = {
        "email":email.value,
        "password":password.value
    };
    axios.post("http://localhost:5000/users/login",obj).then(res =>{
        if(res.status == 200){
            p.innerHTML='';
            alert('User logged in Successfully');
        }
        
    }).catch(err => {
        if(err.response.status == 401){
            p.innerHTML="Error: Check your Password"
        }
        else{
            p.innerHTML="Error: Email id not found"
        }
    }
        );
})