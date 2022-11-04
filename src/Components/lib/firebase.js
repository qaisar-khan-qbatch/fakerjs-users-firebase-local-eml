import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  deleteDoc,
  updateDoc,
  limit,
  startAfter, 
  startAt, 
  getCountFromServer,
  orderBy
} from "firebase/firestore";

const firebaseConfig = {
  locationId: '',
  apiKey: `${process.env.REACT_APP_FIREBASE_Key}`,
  authDomain: "fb-react-ts-users-2710.firebaseapp.com",
  databaseURL: "https://fb-react-ts-users-2710-default-rtdb.firebaseio.com",
  projectId: "fb-react-ts-users-2710",
  storageBucket: "fb-react-ts-users-2710.appspot.com",
  messagingSenderId: "361401988282",
  appId: "1:361401988282:web:9770f29e8d630e2dc7be83",
  measurementId: "G-7WXP533SLJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080)

let pagesLastRow;
let pagesFirstRow;
let pagesArray=[]
let pageIndex=0

export const getEmulatorData = async function (paginate, docSnap=null) {
  try {
    if (paginate === 0) {
      pageIndex+=1
      const docRef = query(collection(db, 'users'), orderBy('name'), limit(10))
      let documentSnapshots = await getDocs(docRef);
      pagesLastRow = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      pagesFirstRow = documentSnapshots.docs[0]
      pagesArray.push(pagesFirstRow)

      return {
        snap: documentSnapshots,
        data: documentSnapshots.docs.map((temp) => {
          const items = temp.data()
          items.id = temp.id;
          return items
        })
      }
    }
    else {
      if (paginate === 1) {
        pageIndex+=1
        let pagindatedSnap

        const nextQuery = query(collection(db, "users"), orderBy('name'),
        startAfter(pagesLastRow),
        limit(10))

        pagindatedSnap = await getDocs(nextQuery)
        pagesLastRow = pagindatedSnap.docs[pagindatedSnap.docs.length - 1];
        pagesFirstRow = docSnap?.docs[0] 
        pagesArray.push(pagesFirstRow) 

        return {
          snap: pagindatedSnap,
          data: pagindatedSnap.docs.map((temp) => {
            const items = temp.data()
            items.id = temp.id;
            return items
          })
        }
      } 
      else {
        pageIndex-=1
        let pagindatedSnap 

        const prevQuery = query(collection(db, "users"), orderBy('name'),
        startAt(pagesArray[pageIndex]),
        limit(10))

        pagindatedSnap = await getDocs(prevQuery)
        pagesLastRow = pagindatedSnap.docs[pagindatedSnap.docs.length - 1]; 

        return {
          snap: pagindatedSnap,
          data: pagindatedSnap.docs.map((temp) => {
            const items = temp.data()
            items.id = temp.id;
            return items
          })
        }
      }
      }
  } catch (error) {
    console.log("🚀 ~ file: firebase.js ~ line 57 ~ fakerData ~ error", error)
  }
};

export const documentsCount = async () => {
  const coll = collection(db, "users");
  const snapshot = await getCountFromServer(coll)
  const count = snapshot.data().count
  return count
}

export const addEmulatorData = async (data) => {
  try {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      await addDoc(collection(db, 'users'), item);
    }
  } catch (error) {
    console.log("🚀 ~ file: firebase.js ~ line 91 ~ addFakeData ~ error", error)
  }
}

export const deleteEmulatorDoc = async (value) => {
  try {
    await deleteDoc(doc(db, "users", `${value}`));
  } catch (error) {
    console.log("🚀 ~ file: firebase.js ~ line 100 ~ deleteFakeDoc ~ error", error)
  }
}

export const editEmulatorDoc = async (id) => {
  try {
    const docRef = doc(db, "users", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("🚀 ~ file: firebase.js ~ line 108 ~ updateEmulatorDoc ~ error", error)
  }
}

export const updateEmulatorDoc = async (id, data) => {
  try {
    const updateData = doc(db, "users", `${id}`);
    if (data) {
      await updateDoc(updateData, data)
      window.location.href = "/";
    }
  } catch (error) {
    console.log("🚀 ~ file: firebase.js ~ line 108 ~ updateEmulatorDoc ~ error", error)
  }
} 