const form = document.querySelector('form');
const ul = document.getElementById('ExpenseList');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const obj = {
        "expenseAmt":form.expenseAmt.value,
        "desc":form.desc.value,
        "category":form.category.value
    }
    axios.post('http://localhost:5000/expenses/add-expense',obj).then(result =>{
        addElement(obj);
    })
})

function addElement(obj){
    const str = obj.expenseAmt+" - "+obj.desc+" - "+obj.category+' ';
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Delete Expense'));
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(str));
    li.appendChild(btn);
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    axios.get('http://localhost:5000/expenses/get-expenses').then(result =>{
        for(let i of result.data.expenses){
            addElement(i);
        }
    })
})