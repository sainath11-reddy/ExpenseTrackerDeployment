const form = document.querySelector('form');
const ul = document.getElementById('ExpenseList');
const premiumButton = document.querySelector('.premium-btn')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const obj = {
        "expenseAmt":form.expenseAmt.value,
        "desc":form.desc.value,
        "category":form.category.value
    }
    axios.post('http://localhost:5000/expenses/add-expense',obj,{headers:{"Authorization":localStorage.getItem("token")}}).then(result =>{
        // console.log(result);
        addElement(result.data);
    })
})

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function addElement(obj){
    const str = obj.expenseAmt+" - "+obj.desc+" - "+obj.category+' ';
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Delete Expense'));
    btn.className='delete-btn';
    const li = document.createElement("li");
    li.id = obj.id;
    li.appendChild(document.createTextNode(str));
    li.appendChild(btn);
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    
    axios.get('http://localhost:5000/expenses/get-expenses',{headers:{"Authorization":localStorage.getItem("token")}}).then(result =>{
        if(result.data.premiumUser == true){
            document.body.classList.add("dark");
        }
        for(let i of result.data.expenses){
            addElement(i);
        }
    })
})

ul.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('delete-btn')){
        const li = e.target.parentElement
        axios.post('http://localhost:5000/expenses/delete-expense',{"id":li.id}).then(done =>{
            ul.removeChild(li);
        })
        
    }
})

function download(e){
    
    axios.get('http://localhost:5000/expenses/download',{headers:{"Authorization":localStorage.getItem("token")}})
    .then(response => {
        if(response.status === 201){
            var a = document.createElement('a');
            a.href=response.data.fileURl;
            a.download='myexpense.csv';
            a.click();
        }
        else{
            throw new Error(response.data.message)
        }
        
    }).catch(err =>{
        console.log(err);
        showError(err.response.data.message);
    })
}
premiumButton.addEventListener('click',(e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/api/payment/order", {"amount": 50000,"currency": "INR","receipt": "order_rcptid_11"},{headers:{"Authorization":localStorage.getItem("token")}}).then(res =>{
        let order_id = res.data.sub.id;
        var options ={
            "key":"rzp_test_JNAScYuEsFdKAs",
            "currency":"INR",
            "name":"Premium Membership",
            "description":"Razor Test Transaction",
            "order_id":order_id,
            "handler": function(response){
                axios.post("http://localhost:5000/api/payment/verify",{
                    "paymentId":response.razorpay_payment_id,
                    "orderId":response.razorpay_order_id,
                    "orderSig":response.razorpay_signature
                },{headers:{"Authorization":localStorage.getItem("token")}}).then(suc =>{
                    if(suc.data.status === "success"){
                        alert("Payment successfull");
                        localStorage.setItem('premium', true);
                    document.body.classList.add("dark");
                    }
                    
                    else
                    alert("Payment not verified");
                }).catch(err => console.log(err))
            }
        
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    })
})