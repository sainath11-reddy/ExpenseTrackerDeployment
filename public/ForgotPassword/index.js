const forgotPasswordForm = document.querySelector('#forgotPasswordForm');

forgotPasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    axios.post('http://localhost:5000/password/forgotpassword', {"email":forgotPasswordForm.email.value});
})