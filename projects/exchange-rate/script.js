const currency_1 = document.getElementById("currency-one"),
  amount_1 = document.getElementById("amount-one"),
  currency_2 = document.getElementById("currency-2"),
  amount_2 = document.getElementById("amount-2"),
  rateEl = document.getElementById("rate"),
  swap = document.getElementById("swap");

// Fetch exhange rates and update the DOM
function calculate() {
  const currencyEl_1 = currency_1.value;
  const currencyEl_2 = currency_2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyEl_1}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.rates[currencyEl_2];
      console.log(rate);
      rateEl.innerText = `1 ${currencyEl_1} = ${rate} ${currencyEl_2}`;

      amount_2.value = (rate * amount_1.value).toFixed(2);
      //   amount_1.value = (amount_2.value / rate).toFixed(2);
    });
  //   console.log(currencyEl_1, currencyEl_2);
}

function calculate2() {
  const currencyEl_1 = currency_1.value;
  const currencyEl_2 = currency_2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyEl_1}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.rates[currencyEl_2];
      console.log(rate);
      rateEl.innerText = `1 ${currencyEl_1} = ${rate} ${currencyEl_2}`;

      // amount_2.value = (rate * amount_1.value).toFixed(2);
      amount_1.value = (amount_2.value / rate).toFixed(2);
    });
  //   console.log(currencyEl_1, currencyEl_2);
}

// Event listeners
currency_1.addEventListener("change", calculate);
amount_1.addEventListener("change", calculate);
currency_2.addEventListener("change", calculate);
amount_2.addEventListener("change", calculate2);

swap.addEventListener("click", () => {
  const schimb = currency_1.value;
  currency_1.value = currency_2.value;
  currency_2.value = schimb;
  calculate();
});

calculate();
