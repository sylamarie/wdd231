// script.js
document.addEventListener("DOMContentLoaded", function () {
    const addExpenseButton = document.getElementById("add-expense");
    const budgetForm = document.getElementById("budget-form");
    const expensesContainer = document.getElementById("expenses-container");
    const resultDiv = document.getElementById("result");
    const pastBudgetsDiv = document.getElementById("past-budgets");
  
    // Add new expense field
    addExpenseButton.addEventListener("click", function () {
      const expenseItem = document.createElement("div");
      expenseItem.classList.add("expense-item");
  
      expenseItem.innerHTML = `
        <select class="expense-type">
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" class="expense-amount" placeholder="Amount" required />
        <button type="button" class="remove-expense">Remove</button>
      `;
  
      expensesContainer.appendChild(expenseItem);
  
      // Add event listener for remove
      expenseItem.querySelector(".remove-expense").addEventListener("click", function () {
        expenseItem.remove();
      });
    });
  
    // Calculate and save budget
    budgetForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const incomeMonth = document.getElementById("income-month").value;
      const income = parseFloat(document.getElementById("income").value);
      let totalExpenses = 0;
  
      const expenseInputs = document.querySelectorAll(".expense-amount");
      expenseInputs.forEach((input) => {
        totalExpenses += parseFloat(input.value) || 0;
      });
  
      const remaining = income - totalExpenses;
  
      const budget = {
        incomeMonth,
        income,
        totalExpenses,
        remainingBudget: remaining,
      };
  
      let saved = JSON.parse(localStorage.getItem("budgets")) || [];
      saved.push(budget);
      localStorage.setItem("budgets", JSON.stringify(saved));
  
      displayBudgetSummary(budget);
      loadPastBudgets();
    });
  
    function displayBudgetSummary(data) {
      resultDiv.innerHTML = `
        <h3>Budget Summary for ${data.incomeMonth}</h3>
        <p>Income: $${data.income.toFixed(2)}</p>
        <p>Total Expenses: $${data.totalExpenses.toFixed(2)}</p>
        <p><strong>Remaining Budget: $${data.remainingBudget.toFixed(2)}</strong></p>
      `;
    }
  
    function loadPastBudgets() {
      let saved = JSON.parse(localStorage.getItem("budgets")) || [];
      pastBudgetsDiv.innerHTML = "";
  
      saved.forEach((budget, index) => {
        const div = document.createElement("div");
        div.classList.add("budget-summary");
        div.innerHTML = `
          <p><strong>Month:</strong> ${budget.incomeMonth}</p>
          <p><strong>Income:</strong> $${budget.income.toFixed(2)}</p>
          <p><strong>Expenses:</strong> $${budget.totalExpenses.toFixed(2)}</p>
          <p><strong>Remaining:</strong> $${budget.remainingBudget.toFixed(2)}</p>
          <button class="remove-budget" data-index="${index}">Remove</button>
        `;
        pastBudgetsDiv.appendChild(div);
  
        div.querySelector(".remove-budget").addEventListener("click", function () {
          removeBudget(index);
        });
      });
    }
  
    function removeBudget(index) {
      let saved = JSON.parse(localStorage.getItem("budgets")) || [];
      saved.splice(index, 1);
      localStorage.setItem("budgets", JSON.stringify(saved));
      loadPastBudgets();
    }
  
    loadPastBudgets();
  });


// BILL TRACKER
document.addEventListener("DOMContentLoaded", () => {
    const billForm = document.getElementById("bill-form");
    const billNameInput = document.getElementById("bill-name");
    const billAmountInput = document.getElementById("bill-amount");
    const billDueDateInput = document.getElementById("bill-due-date");
    const billList = document.getElementById("bill-list");
  
    const loadBills = () => {
      const bills = JSON.parse(localStorage.getItem("bills")) || [];
      billList.innerHTML = "";
  
      bills.forEach((bill, index) => {
        const billItem = document.createElement("li");
        billItem.classList.add("bill-item");
  
        billItem.innerHTML = `
          <span>${bill.name} - $${bill.amount} - Due: ${bill.dueDate}</span>
          <div>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
  
        billList.appendChild(billItem);
      });
    };
  
    const saveBills = (bills) => {
      localStorage.setItem("bills", JSON.stringify(bills));
    };
  
    billForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const billName = billNameInput.value.trim();
      const billAmount = parseFloat(billAmountInput.value);
      const billDueDate = billDueDateInput.value;
  
      if (!billName || isNaN(billAmount) || !billDueDate) {
        alert("Please fill out all fields correctly.");
        return;
      }
  
      const newBill = {
        name: billName,
        amount: billAmount,
        dueDate: billDueDate,
      };
  
      const bills = JSON.parse(localStorage.getItem("bills")) || [];
      bills.push(newBill);
      saveBills(bills);
  
      billNameInput.value = "";
      billAmountInput.value = "";
      billDueDateInput.value = "";
      loadBills();
    });
  
    billList.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const bills = JSON.parse(localStorage.getItem("bills")) || [];
  
      if (e.target.classList.contains("edit-btn")) {
        const bill = bills[index];
        billNameInput.value = bill.name;
        billAmountInput.value = bill.amount;
        billDueDateInput.value = bill.dueDate;
  
        bills.splice(index, 1);
        saveBills(bills);
        loadBills();
      }
  
      if (e.target.classList.contains("remove-btn")) {
        bills.splice(index, 1);
        saveBills(bills);
        loadBills();
      }
    });
  
    loadBills();
  });

