const form = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const p=document.querySelector('body p');
const forgotPasswordButton = document.querySelector('.forgot-password-btn');

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
            localStorage.setItem('token', res.data.token);
            window.location.href = '../ExpenseTracker/index.html'
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

forgotPasswordButton.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href="../ForgotPassword/index.html";
})

