import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from "../../env";

/* export const initFirebase = () => {
  return initializeApp(firebaseConfig);
}; */

const app = initializeApp(firebaseConfig);

// Storage 인스턴스 export
export const storage = getStorage(app);

export default app;
