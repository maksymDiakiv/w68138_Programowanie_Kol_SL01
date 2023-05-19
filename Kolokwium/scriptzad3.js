const form = document.querySelector('form');

const birthDateField = document.querySelector("[name='birthDate']");
birthDateField.addEventListener('input', () => {
    requiredValidation(birthDateField);
    validAge();
});

const phoneField = document.querySelector("[name='phone']");
phoneField.addEventListener('input', () => {
    requiredValidation(phoneField);
    minLengthValidation(phoneField, 9);

});

phoneField.addEventListener('keypress', (event) => {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
    return true;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validForm()) {
        alert('Sukces');
    }
});

const nameField = document.querySelector("[name='name']");
nameField.addEventListener('input', () => {
    requiredValidation(nameField);
    minLengthValidation(nameField, 3);
});

const emailField = document.querySelector("[name='email']");
emailField.addEventListener('input', () => {
    requiredValidation(emailField);
    minLengthValidation(emailField, 2);
    emailValidation(emailField);
});


const passwordField = document.querySelector("[name='password']");
passwordField.addEventListener('input', () => {
    requiredValidation(passwordField);
});

const confirmPasswordField = document.querySelector("[name='confirm-password']");
confirmPasswordField.addEventListener('input', () => {
    validConfirmPassword();
});

function requiredValidation(field) {

    const errorField = document.querySelector(`[name='${field.name}'] + span.error`);
    if (!field.value || field.value === '') {
       
        errorField.innerHTML = 'To pole jest wymagane';
        return true;
    }
    else {
        
        errorField.innerHTML = '';
        return false;
    }
}

function minLengthValidation(field, minLength = 0) {
    const errorField = document.querySelector(`[name='${field.name}'] + span.error`);
    if (field.value.length < minLength) {
        //Zad 2
        //field.setCustomValidity(`To pole musi mieć conajmniej ${minLength} znaków`);
        errorField.innerHTML = `To pole musi mieć conajmniej ${minLength} znaków`;
        return true;
    }
    else {
        //Zad 2
        //field.setCustomValidity('');
        errorField.innerHTML = '';
        return false;
    }
}

function emailValidation(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorField = document.querySelector(`[name='${field.name}'] + span.error`);
    if (!emailRegex.test(field.value)) {
        //Zad 2
        // field.setCustomValidity("Proszę podać poprawny adres e-mail.");
        errorField.innerHTML = 'Proszę podać poprawny adres e-mail.';
        return true;
    }
    else {
        //Zad 2
        //field.setCustomValidity('');
        errorField.innerHTML = '';
        return false;
    }
}

function passwordValidation(field) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,}$/;
    const errorField = document.querySelector(`[name='${field.name}'] + span.error`);
    if (!passwordRegex.test(field.value)) {
        //Zad 2
        //field.setCustomValidity("Hasło mieć co najmniej 8 znaków i zawierać przynajmniej jedną cyfrę, jedną małą literę i jedną dużą literę.");
        errorField.innerHTML = 'Hasło mieć co najmniej 8 znaków i zawierać przynajmniej jedną cyfrę, jedną małą literę i jedną dużą literę.';
        return true;
    }
    else {
        //Zad 2
        //field.setCustomValidity('');
        errorField.innerHTML = '';
        return false;
    }
}

function validConfirmPassword() {
    const errorField = document.querySelector(`[name='confirm-password'] + span.error`);
    if (confirmPasswordField.value !== passwordField.value) {
        errorField.innerHTML = 'Hasła nie są takie same';
        return true;
    }
    else {
        errorField.innerHTML = '';
        return false;
    }
}

function validAge() {
    const today = new Date();
    const date = new Date(birthDateField.value);

    var age = today.getFullYear() - date.getFullYear();
    var m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
    }

    const errorField = document.querySelector('[name="birthDate"] + span.error');

    errorField.innerHTML = age < 18 ? 'Musisz być pełnoletni' : '';

    return age < 18;
}

function validForm() {
    if (requiredValidation(nameField) || requiredValidation(emailField)
        || requiredValidation(passwordField)  || minLengthValidation(nameField, 2) || minLengthValidation(emailField, 2)
        || minLengthValidation(passwordField, 8) || minLengthValidation(nameField, 3) || minLengthValidation(phoneField, 9) || validAge()
        || emailValidation(emailField) || passwordValidation(passwordField) || 
        validConfirmPassword() 
        ) {
        return false;
    }

    return true;
}

function dodajDoTabeli() {
    let imieInput = document.getElementById("name");
    let emailInput = document.getElementById("email");

    let imie = imieInput.value;
    let email = emailInput.value;

    if (imie !== "" && nazwisko !== "") {
      let tabela = document.getElementById("tabela");

      let nowyWiersz = tabela.insertRow();

      let komorkaImie = nowyWiersz.insertCell();
      komorkaImie.innerHTML = imie;

      let komorkaEmail = nowyWiersz.insertCell();
      komorkaEmail.innerHTML = email;

      imieInput.value = "";
      emailInput.value = "";
    }
  }
