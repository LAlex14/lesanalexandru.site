const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show succes
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control succes";
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSucces(input);
    }
  });
}

// Check Input Length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be ${min} - ${max} characters`
    );
  } else {
    showSucces(input);
  }
}

// Check Email
function checkEmail(input) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(input.value)) {
    showSucces(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// Check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(password2, `Passwords do not match`);
  } else {
    showSucces(password2);
  }
}

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
