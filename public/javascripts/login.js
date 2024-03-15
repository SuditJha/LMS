import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
    set,
    get,
    child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


import { database, localDB } from "./index";

const formLoginEl = document.getElementById("form-login");
formLoginEl.addEventListener("submit", loginUser);


function loginUser(e) {
    e.preventDefault();
    const newLoginFormData = new FormData(formLoginEl);
    const email = newLoginFormData.get("email");
    const password = newLoginFormData.get("password");
    // console.log(localDB)
    const newUserLogin = localDB.filter(user => {
        return email === user.email && password === user.password
    })

    if (newUserLogin.length) {
        const user = newUserLogin[0]
        console.log(user)
        document.getElementById('message').textContent = `You have Successfully Logged In ${user.name}`
    }
    setTimeout(() => {
        document.getElementById('message').textContent = `LogIn`
        formLoginEl.reset()
    }, 3000);
}