import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAI6jdiSr92SVzXL0AwGKgdl9vf1n6O3xE",
    authDomain: "astrumdashboard.firebaseapp.com",
    databaseURL: "https://astrumdashboard.firebaseio.com",
    projectId: "astrumdashboard",
    storageBucket: "astrumdashboard.appspot.com",
    messagingSenderId: "454472899112",
    appId: "1:454472899112:web:4682681794e9e7de5c331d",
    measurementId: "G-KS2TFQMTZJ"
};

class Firebase{

    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth()
        this.db = app.database()
    }

    createAccount = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    signIn = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    signOut = () => {
        return this.auth.signOut()
    }

    setListenerOnUserData = (user) => {
        return this.db.ref(`/`)
    }

    get_user_data = (user, callback) => {
        this.db.ref(`/users/${user.uid}`).on('value', function(snapshot){
            console.log("Retrieved user information")
            callback(snapshot.val())
        })
    }
}

export default Firebase;