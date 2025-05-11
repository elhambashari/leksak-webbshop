


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyA6mS8b_pSe4YggqYHa9S_Vu84gK-UjlmY",
	authDomain: "elham-chatt.firebaseapp.com",
	projectId: "elham-chatt",
	storageBucket: "elham-chatt.appspot.com",
	messagingSenderId: "1030621000488",
	appId: "1:1030621000488:web:c750f37f048ca7ca32961d"
  };


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
