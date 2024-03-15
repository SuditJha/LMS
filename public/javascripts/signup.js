import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { localDB, database } from "./index"

const formSignUpEl = document.getElementById('form-sign-up')
formSignUpEl.addEventListener('submit', signUpUser)

function signUpUser(e) {
    e.preventDefault();
    const newUserFormData = new FormData(formSignUpEl)
    // Getting Form Data 
    const email = newUserFormData.get('email')
    const userName = newUserFormData.get('user-name')
    const password = newUserFormData.get('password')
    // Making the user ID
    const userID = email.slice(0, email.indexOf('@'))
    // Setting the reference of Database and pushing the Signup Info
    const userInDB = ref(database, `/users/${userID}`)

    set(userInDB, {
        email: email,
        name: userName,
        password: password
    })

    document.getElementById('sign-up-heading').textContent = `You are Registered`

    setTimeout(() => {
        document.getElementById('sign-up-heading').textContent = `Sign Up`
        formSignUpEl.reset()
    }, 3000)
}

// Implementation of Updating the Local Array
const dbRef = ref(database, '/users')
onValue(dbRef, function (snapshot) {
    if (snapshot.exists()) {
        // console.log(snapshot.val())
        localDB.length = 0;
        snapshot.forEach(snap => {
            localDB.push(snap.val())
            // console.log(snap.val())
        });
    }
})
