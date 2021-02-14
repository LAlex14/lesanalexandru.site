const main = document.getElementById("main"),
  addUser = document.getElementById("add-user"),
  double = document.getElementById("double"),
  showMili = document.getElementById("show-mili"),
  sort = document.getElementById("sort"),
  calculate = document.getElementById("calculate");

let data = [];

// Fetch random user an add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  //   console.log(data);
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  //   console.log(newUser);
  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update Dom
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2>Person<span>Wealth</span></h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("name");
    element.innerHTML = `${item.name} <span>$${formatMoney(item.money)}</span>`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMilionaries() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  //   console.log(wealth);
  const wealthEl = document.createElement("div");
  wealthEl.classList.add("name");
  wealthEl.innerHTML = `<span>Total wealth:</span>$${formatMoney(wealth)}`;
  main.appendChild(wealthEl);
}

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
showMili.addEventListener("click", showMilionaries);
calculate.addEventListener("click", calculateWealth);
