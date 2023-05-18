// Get DOM elements
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const transactionsList = document.getElementById('transactions');
const addButton = document.getElementById('add-button');

// Initialize transactions array
let transactions = [];

// Check if there are existing transactions in local storage
if (localStorage.getItem('transactions')) {
  transactions = JSON.parse(localStorage.getItem('transactions'));
  renderTransactions();
}

// Add transaction event listener
addButton.addEventListener('click', addTransaction);

// Function to add a new transaction
function addTransaction() {
  const title = titleInput.value;
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  // Validate input
  if (title.trim() === '' || isNaN(amount)) {
    alert('Please enter a valid title and amount.');
    return;
  }

  // Create new transaction object
  const transaction = {
    title,
    category,
    amount
  };

  // Add transaction to the array
  transactions.push(transaction);

  // Save transactions to local storage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Clear input fields
  titleInput.value = '';
  amountInput.value = '';

  // Render transactions
  renderTransactions();
}

// Function to delete a transaction
function deleteTransaction(index) {
  // Remove transaction from the array
  transactions.splice(index, 1);

  // Save transactions to local storage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Render transactions
  renderTransactions();
}

// Function to render transactions
function renderTransactions() {
  // Clear transaction list
  transactionsList.innerHTML = '';

  // Loop through transactions and create list items
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    // Create list item
    const listItem = document.createElement('li');

    // Set CSS class based on transaction category
    listItem.className = transaction.category;

    // Create transaction info
    const transactionInfo = document.createElement('span');
    transactionInfo.textContent = `${transaction.title} - $${transaction.amount}`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className='delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(i));

    // Append transaction info and delete button to the list item
    listItem.appendChild(transactionInfo);
    listItem.appendChild(deleteButton);

    // Append list item to the transaction list
    transactionsList.appendChild(listItem);
  }
}
