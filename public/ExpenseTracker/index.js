const form = document.querySelector('form');
const ul = document.getElementById('ExpenseList');
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