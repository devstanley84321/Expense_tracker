document.addEventListener("DOMContentLoaded", () => {
  addExpenses()
  displayExpenses()
  deleteExpense()
})

function getExpensesFromLS() {
  let expenses;
  expenses = !localStorage.getItem("expenses") ? [] : JSON.parse(localStorage.getItem("expenses"))
  return expenses
}

function getTotalAmountFromLS() {
  let totalAmount
  totalAmount = !localStorage.getItem("total") ? 0 : JSON.parse(localStorage.getItem("total"))
  return totalAmount
}

const addExpenses = () => {
  let addExpensesButton = document.querySelector("#expense__btn")

  addExpensesButton.addEventListener("click", (e) => {
    let expenseNameInput = document.querySelector("#expense__name")
    let expenseAmountInput = document.querySelector("#expense__amount")
    let expenses = getExpensesFromLS()
    let totalExp = getTotalAmountFromLS()

    let isduplicateExpense = expenses.some(expense => expense.Expname === expenseNameInput.value)

    if (!expenseNameInput.value || !expenseAmountInput.value) {
      alert("Please Input an Expense details...")
    } else if (isduplicateExpense) {
      alert("Expense Already Exist...")
    } else {
      expenses.push({id: Math.floor(Math.random() * 100) + 1, Expname: expenseNameInput.value, Expamount: parseFloat(expenseAmountInput.value)})

      totalExp += parseFloat(expenseAmountInput.value)
      document.querySelector(".total").textContent = `$${totalExp.toFixed(2)}`
      
      localStorage.setItem("expenses", JSON.stringify(expenses))
      localStorage.setItem("total", JSON.stringify(totalExp))

      expenseNameInput.value = ""
      expenseAmountInput.value = ""
      displayExpenses()
    }

    e.preventDefault()
  })
}

const displayExpenses = () => {
  let expenses = getExpensesFromLS()
  let expenseList = document.querySelector(".expense__list")
  let totalExp = getTotalAmountFromLS()

  expenseList.innerHTML = ""

  expenses.forEach(expense => {
    let list = `<li data-id="${expense.id}">
      ${expense.Expname} - <span class="price" data-amount="${expense.Expamount}">$${expense.Expamount}</span> 
      <i class='bx bx-x'></i>
    </li>`

    expenseList.innerHTML += list
  });

  document.querySelector(".total").textContent = `$${totalExp.toFixed(2)}`
}


const deleteExpense = () => {
  let expenseList = document.querySelector(".expense__list")

  expenseList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("bx-x")) return

    let expenses = getExpensesFromLS()
    let totalExp = getTotalAmountFromLS()
    let expenseID = parseInt(e.target.parentElement.dataset.id)

    totalExp -= parseFloat(e.target.previousElementSibling.dataset.amount)
    totalExp = Math.max(0, totalExp)
    localStorage.setItem("total", JSON.stringify(totalExp))
    document.querySelector(".total").textContent = `$${totalExp.toFixed(2)}`
    

    expenses = expenses.filter(expense => expense.id !== expenseID)
    localStorage.setItem("expenses", JSON.stringify(expenses))
    e.target.parentElement.remove()
  })
}
