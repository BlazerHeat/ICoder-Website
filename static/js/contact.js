const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function checkForm(){
    return !(!validateName() | !validateEmail() | !validateMessage());
}

function validateName(){
    const name = document.getElementById('name').value;
    if(name.length < 3) {
        nameError.innerHTML = "Name should be at least of 3 characters."
        return false;
    }
    nameError.innerHTML = "";
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) {
        emailError.innerHTML = "Invalid Email."
        return false;
    }
    emailError.innerHTML = "";
    return true;
}

function validateMessage(){
    const message = document.getElementById('message').value;
    if(message.length < 3) {
        messageError.innerHTML = "Message should be at least of 3 characters."
        return false;
    }
    messageError.innerHTML = "";
    return true;
}