
const registeredUsers = localStorage.getItem('users');
const users = registeredUsers ? JSON.parse(registeredUsers) : [];
const reg = document.getElementById('rgstr_btn');
const log = document.getElementById('form-login');
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


let changeUserName = document.getElementById('changeUserName');
let changeUserPass = document.getElementById('changePassword');
let changeLoginButton = document.getElementById('log_btn');
let changeRegButton = document.getElementById('rgstr_btn');

const translateControls = document.querySelectorAll('[data-translate]');
const languageBar = document.getElementById("language");
languageBar.addEventListener('change', (event)=> changeLanguage(event.target.value));

function changeLanguage(value) {
    import(`../languages/${value}.js`).then(locale => {

        translateControls.forEach(item => {
            item.innerHTML = locale.default[item.dataset.translate];
            item.value = locale.default[item.dataset.translate];
        })
    })
}

changeLanguage(languageBar.value)


let store = () => {
    let nameSurname = document.forms[0].name.value;
    let email = document.forms[0].email.value;
    let pw = document.forms[0].pw.value;
    let cpw = document.forms[0].cpw.value;
    let myUsers = new User(nameSurname, email, pw);

    if (!email || !pw || !pw.match(numbers)
        || !pw.match(upperCaseLetters) || !pw.match(lowerCaseLetters)
        || pw !== cpw) {
        alert('Please fill in all the fields')
    } else {
        users.push(myUsers);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Your account has been created');

    }
}

let check = (e) => {
    e.preventDefault()
    debugger
    let email = document.forms[0].userName.value;
    let pass = document.forms[0].userPw.value;

    debugger
    let user = users.find(el => {
        return el.email === email && el.password === pass;
    });
    if (user) {
        alert('You are logged in.');
        window.location = 'file:///Users/fastshift/Desktop/Internship/carList/menu.html';
    } else {
        alert('User not found');
    }
}
reg.addEventListener('click', store);
log.addEventListener('submit', check);

