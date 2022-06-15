// настройки api

let myHeaders = new Headers();
myHeaders.append("apikey", "wfycVJWNX7GfBuxy5g53jhDamxO44ek8");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// объект с курсами, и элементы на странице

const rates = {},
      elementUSD = document.querySelector('[data-value="USD"]'),
      elementEUR = document.querySelector('[data-value="EUR"]'),
      firstInput = document.querySelector("#input1"),
      secondInput = document.querySelector("#input2"),
      firstSelect = document.querySelector("#select1"),
      secondSelect = document.querySelector("#select2");

// не нашел бесплатного api с всеми курсами поэтому 9 разных запросов чтобы предусмотреть все варианты развития событий

getCurrency("UAH", "USD", "UAHtoUSD", elementUSD);
getCurrency("UAH", "EUR", "UAHtoEUR", elementEUR);
getCurrency("UAH", "UAH", "UAHtoUAH");
getCurrency("USD", "EUR", "USDtoEUR");
getCurrency("USD", "UAH", "USDtoUAH");
getCurrency("USD", "USD", "USDtoUSD");
getCurrency("EUR", "UAH", "EURtoUAH");
getCurrency("EUR", "USD", "EURtoUSD");
getCurrency("EUR", "EUR", "EURtoEUR");

// сам запрос и вывод текущего курса на страницу

async function getCurrency(to, from, current, element = false) {
    const response = fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=1`, requestOptions),
          data = await (await response).text(),
          result = await JSON.parse(data);
          rates[current] = result.result;

          if (element !== false) {
            element.textContent = result.result.toFixed(2);
          }
}

// очистка всех инпутов

function clearInputs() {
    firstInput.value = "";
    secondInput.value = "";
}

// ввод в первый инпут и вывод во второй (если значение меньше 0 очистка всех инпутов, чтобы нельзя было ввести меньше нуля)

firstInput.oninput = function() {
    if (firstInput.value < 0) {
        clearInputs();
    }
    // первый инпут делим на значение которое находится в объкте выше, так же смотрим на выбранные валюты
    secondInput.value = (firstInput.value / rates[firstSelect.value + "to" + secondSelect.value]).toFixed(2);
}

// ввод во второй инпут и вывод в первый (если значение меньше 0 очистка всех инпутов, чтобы нельзя было ввести меньше нуля)

secondInput.oninput = function() {
    if (secondInput.value < 0) {
        clearInputs();
    }
    // первый инпут умножаем на значение которое находится в объкте выше, так же смотрим на выбранные валюты
    firstInput.value = (firstInput.value * rates[firstSelect.value + "to" + secondSelect.value]).toFixed(2);
}

// выбор валюты и изменение инпутов исходя из выбора

firstSelect.oninput = function() {
    secondInput.value = (firstInput.value / rates[firstSelect.value + "to" + secondSelect.value]).toFixed(2);
}
secondSelect.oninput = function() {
    secondInput.value = (firstInput.value / rates[firstSelect.value + "to" + secondSelect.value]).toFixed(2);
}