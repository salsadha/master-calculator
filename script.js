document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan elemen-elemen yang diperlukan
  const displayNumber = document.getElementById("displayNumber");
  const buttons = document.querySelectorAll(".button");
  let currentNumber = "";
  let operator = "";
  let previousNumber = "";

  // Fungsi untuk menampilkan angka di layar
  function updateDisplay() {
      displayNumber.textContent = currentNumber;
  }

  // Fungsi untuk menambahkan angka ke bilangan saat ini
  function addToCurrentNumber(number) {
      if (currentNumber === "0" && number !== ".") {
          currentNumber = number;
      } else {
          currentNumber += number;
      }
      updateDisplay();
  }

  // Fungsi untuk mengubah bilangan saat ini menjadi negatif atau positif
  function toggleNegativity() {
      currentNumber = (parseFloat(currentNumber) * -1).toString();
      updateDisplay();
  }

  // Fungsi untuk menangani operasi penjumlahan dan pengurangan
  function handleOperator(nextOperator) {
      if (currentNumber !== "") {
          if (previousNumber !== "") {
              calculate();
          } else {
              previousNumber = currentNumber;
          }
          currentNumber = "";
          operator = nextOperator;
      }
  }

  // Fungsi untuk menghitung hasil
  function calculate() {
      let result;
      const num1 = parseFloat(previousNumber);
      const num2 = parseFloat(currentNumber);
      if (operator === "+") {
          result = num1 + num2;
      } else if (operator === "-") {
          result = num1 - num2;
      }
      currentNumber = result.toString();
      operator = "";
      previousNumber = "";
      updateDisplay();
  }

  // Menambahkan event listener untuk setiap tombol
  buttons.forEach((button) => {
      button.addEventListener("click", function () {
          const buttonText = button.textContent;
          if (!isNaN(buttonText) || buttonText === ".") {
              addToCurrentNumber(buttonText);
          } else if (buttonText === "+/-") {
              toggleNegativity();
          } else if (buttonText === "+" || buttonText === "-") {
              handleOperator(buttonText);
          } else if (buttonText === "=") {
              calculate();
          } else if (buttonText === "CE") {
              currentNumber = "0";
              previousNumber = "";
              operator = "";
              updateDisplay();
          }
      });
  });
});