const forgotPasswordForm = document.querySelector('#forgotPasswordForm');
const Para = document.querySelector('p');
forgotPasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    axios.post('http://ec2-3-112-224-27.ap-northeast-1.compute.amazonaws.com:5000/password/forgotpassword', {"email":forgotPasswordForm.email.value})
    .then(result =>{
        console.log(result)
        if(result.status == 200){
            Para.innerHTML = "Password Reset URL sent to e-mail successfully"
        }
        else if(result.status == 401){
            Para.innerHTML = "Check Email ID";
        }
    });
})