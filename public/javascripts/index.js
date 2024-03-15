// importing files from firebasse

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Firebase Config

const appSettings = {
    databaseURL: "https://management-system-a81dd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
// Init app and get database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const localDB = []

function getDataFromDB() {
    const dbRef = ref(database, '/users')
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Data exists, handle it push to local DB
            localDB.length = 0;
            snapshot.forEach(snap => {
                localDB.push(snap.val())
                // console.log(snap.val())
            });
        } else {
            // Data doesn't exist
            console.log("No data available");
        }
    }).catch((error) => {
        // Error handling
        console.error(error);
    });
}

getDataFromDB()
// console.log(localDB)
export { database, localDB }