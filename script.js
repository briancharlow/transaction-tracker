// Select elements from the DOM
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const addButton = document.getElementById('add-button');
const transactionsList = document.getElementById('transactions');

// Initialize the transactions array
let transactions = [];

// Function to add a new transaction
function addTransaction() {
  // Get the values from the input fields
  const title = titleInput.value;
  const category = categoryInput.value;
  const amount = parseInt(amountInput.value);

  // Create a new transaction object
  const transaction = {
    title: title,
    category: category,
    amount: amount,
  };

  // Add the transaction to the transactions array
  transactions.push(transaction);

  // Clear the input fields
  titleInput.value = '';
  categoryInput.value = 'income';
  amountInput.value = '';

  // Render the transactions on the page
  renderTransactions();
}

// Function to delete a transaction
function deleteTransaction(index) {
  // Remove the transaction at the specified index
  transactions.splice(index, 1);

  // Render the transactions on the page
  renderTransactions();
}

// Function to render the transactions on the page
function renderTransactions() {
  // Clear the transactions list
  transactionsList.innerHTML = '';

  // Iterate over the transactions array and create list items
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    // Create a list item element
    const listItem = document.createElement('li');

    // Set the text content of the list item
    listItem.textContent = `${transaction.title} - ${transaction.category} - ${transaction.amount}`;

    // Add a CSS class based on the transaction category
    listItem.classList.add(transaction.category);

    // Create a delete button for each transaction
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(i));

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the transactions list
    transactionsList.appendChild(listItem);
  }

  // Apply styles to incomes and expenses
  const incomeItems = document.getElementsByClassName('income');
  const expenseItems = document.getElementsByClassName('expense');

  for (let i = 0; i < incomeItems.length; i++) {
    incomeItems[i].style.color = 'green';
  }

  for (let i = 0; i < expenseItems.length; i++) {
    expenseItems[i].style.color = 'red';
  }
}

// Add event listener to the add button
addButton.addEventListener('click', addTransaction);
