import firebase from 'firebase'

const config ={
    apiKey: "AIzaSyA3JXRiMHekMUNSX_JXMIm6MEsGRDEu65Y",
    authDomain: "tecesinf-6f2e8.firebaseapp.com",
    databaseURL: "https://tecesinf-6f2e8.firebaseio.com",
    projectId: "tecesinf-6f2e8",
    storageBucket: "tecesinf-6f2e8.appspot.com",
    messagingSenderId: "312435946709",
    appId: "1:312435946709:web:93700da28a0108d541de5c"
}
//inicializar firebase
firebase.initializeApp(config)
export default firebase;