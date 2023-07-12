//Check Password Validation

let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm-password")
let passwordWarning = document.getElementById("password-validate")


password.addEventListener('input', function() {
    validatePasswordsMatch();
});

confirmPassword.addEventListener('input', function() {
    validatePasswordsMatch();
});

function validatePasswordsMatch() {
    if (password.value === confirmPassword.value) {
        passwordWarning.style.display = "block";
        passwordWarning.innerText = "The passwords match!";
    } else {
        passwordWarning.style.display = "block";
        passwordWarning.innerText = "The passwords do not match!";
    }
}
