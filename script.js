// Selecionando os elementos do formulário.

const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const form = document.querySelector("form");
const footer = document.querySelector("main footer"); // ??? main e footer juntos ???
const description = document.getElementById("description");
const result = document.getElementById("result");

// Cotação de moedas do dia.
const USD = 5.16;
const EUR = 5.89;
const GBP = 6.9;

// Manipulando o input "amouth" para receber apenas números.

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit (enviar) do formulário.
form.onsubmit = function () {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
    // Calcula o total.
    let total = amount * price;

    // Verifica se o resultado mão é um número
    if (isNaN(total)) {
      return alert("Digite apenas valores numéricos!");
    }

    // Formatar o valor total
    total = formatCurrencyBRL(total).replace("R$", "");

    // Exibi o resultado total.
    result.textContent = `${total} Reais`;

    // Aplica a classe que exibe o footer (resultado).
    footer.classList.add("show-result");
  } catch (error) {
    // Remove a classe do footer, ocultando.
    footer.classList.remove("show-result");

    console.error();
    alert("Não foi possível converter. Tente mais tarde!");
  }
}

// Formata a moeda em real brasileiro.
function formatCurrencyBRL(value) {
  // Converte em número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
