
const elementUSD = document.querySelector('[data-value="USD"]'),
      elementEUR = document.querySelector('[data-value="EUR"]'),
      firstInput = document.querySelector("#input1"),
      secondInput = document.querySelector("#input2"),
      firstSelect = document.querySelector("#select1"),
      secondSelect = document.querySelector("#select2");


      let aKey = "nHeXKpxnUg5CFZumQDYWmyM2gu2XPXEM";


function base() {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=UAH&from=USD&amount=1`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        elementUSD.innerHTML = (data.result).toFixed(2)
    });

    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=UAH&from=EUR&amount=1`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        elementEUR.innerHTML = (data.result).toFixed(2)
    });
}
base()

firstInput.addEventListener("input", () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=${secondSelect.value}&from=${firstSelect.value}&amount=${firstInput.value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    secondInput.value = (data.result).toFixed(2)
  })
})

secondInput.addEventListener("input", () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=${firstSelect.value}&from=${secondSelect.value}&amount=${secondInput.value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    firstInput.value = (data.result).toFixed(2)
  })
})

firstSelect.addEventListener("input", () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=${secondSelect.value}&from=${firstSelect.value}&amount=${firstInput.value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    secondInput.value = (data.result).toFixed(2)
  })
})

secondSelect.addEventListener("input", () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?apikey=${aKey}&to=${firstSelect.value}&from=${secondSelect.value}&amount=${secondInput.value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    firstInput.value = (data.result).toFixed(2)
  })
})

