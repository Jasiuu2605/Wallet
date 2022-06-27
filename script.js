const incomeSection = document.querySelector(".income-area");
const expenseSection = document.querySelector(".expenses-area");
const avalaibleMoney = document.querySelector(".avalaible-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");
const lightButton = document.querySelector(".light");
const darkButton = document.querySelector(".dark");

let root = document.documentElement;
let id = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    nameInput.value !== "" &&
    amountInput.value !== "" &&
    categorySelect.value !== "none"
  ) {
    createNewTransaction();
  } else {
    alert("Wypełnij wszystkie pola!");
  }
};

const clearInputs = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", id);

  checkCategory(selectedCategory);

  newTransaction.innerHTML = `
        <p class="transaction-name">
                ${categoryIcon} ${nameInput.value}
              </p>
              <p class="transaction-amount">
                ${amountInput.value} zł
                <button class="delete" onClick='deleteTransaction(${id})'><i class="fas fa-times"></i></button>
              </p>
    `;

  amountInput.value > 0
    ? incomeSection.appendChild(newTransaction) &&
      newTransaction.classList.add("income")
    : expenseSection.appendChild(newTransaction) &&
      newTransaction.classList.add("expense");

  moneyArr.push(parseFloat(amountInput.value));
  countMoney(moneyArr);
  closePanel();
  id++;
  clearInputs();
};

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[+] Przychód":
      categoryIcon = "<i class='fas fa-money-bill-wave'></i>";

      break;
    case "[-] Zakupy":
      categoryIcon = "<i class='fas fa-cart-arrow-down'></i>";

      break;
    case "[-] Jedzenie":
      categoryIcon = "<i class='fas fa-hamburger'></i>";

      break;
    case "[-] Kino":
      categoryIcon = "<i class='fas fa-film'></i>";

      break;
  }
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  avalaibleMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);

  const transactionAmount = parseFloat(
    transactionToDelete.childNodes[3].innerText
  );
  const indexOfTransaction = moneyArr.indexOf(transactionAmount);
  moneyArr.splice(indexOfTransaction, 1);
  transactionToDelete.classList.contains("income")
    ? incomeSection.removeChild(transactionToDelete)
    : expenseSection.removeChild(transactionToDelete);
  countMoney(moneyArr);
};

const deleteAllTransaction = () => {
  incomeSection.innerHTML = "<h3>Przychód: </h3>";
  expenseSection.innerHTML = "<h3>Wydatki: </h3>";
  avalaibleMoney.textContent = "0zł";
  moneyArr = [0];
};

const changeStyleToLight = () => {
  root.style.setProperty("--first-color", "#f9f9f9");
  root.style.setProperty("--second-color", "#14161f");
  root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.2)");
};

const changeStyleToDark = () => {
  root.style.setProperty("--first-color", "#14161f");
  root.style.setProperty("--second-color", "#f9f9f9");
  root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.4)");
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransaction);
lightButton.addEventListener("click", changeStyleToLight);
darkButton.addEventListener("click", changeStyleToDark);
