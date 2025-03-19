import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { firebaseConfig } from "../constants/firebaseConfig";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   databaseURL: "https://flashcard-reactnative-default-rtdb.firebaseio.com",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


const storageService = {
    async writeUserData(cardId, name, email, imageUrl) {
        const db = getDatabase();
        set(ref(db, 'cards/' + cardId), {
            username: name,
            email: email,
            profile_picture : imageUrl
        });
    },
    pushData(data) {
        const db = getDatabase();
        const postListRef = ref(db, 'cardsx');
        const newPostRef = push(postListRef);
        set(newPostRef, data);
    }
}

export {storageService}