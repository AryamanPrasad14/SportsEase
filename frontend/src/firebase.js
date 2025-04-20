import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD6JFk_66s1UmDCkOIIb1fdL3Eg4Fth6TY",
  authDomain: "sportease-13449.firebaseapp.com",
  projectId: "sportease-13449",
  storageBucket: "sportease-13449.firebasestorage.app",
  messagingSenderId: "1027206235897",
  appId: "1:1027206235897:web:4c1aa909b80f5563844428",
  measurementId: "G-LPQHJ17G9H"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export { analytics } // ✅ Export this
