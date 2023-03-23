import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

messaging.setBackgroundMessageHandler((payload) => {
  console.log("Message received.", payload);
  const title = "Push Alert";
  const options = {
    body: payload.data.message,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(title, options);
});