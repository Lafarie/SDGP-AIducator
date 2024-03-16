import { getAuth, onAuthStateChanged } from "firebase/auth";

function getCurrentUser() {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            resolve(user);
        } else {
            resolve(null);
        }
    }, reject)
    });
}

export default getCurrentUser;