import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { db } from "../Configs/firebase";
import { doc, getDocs, getDoc, addDoc, collection } from "firebase/firestore";
import { TPatient } from "../Routes/Patient";

const patientsRef = collection(db, "patients");

export async function getPatients() {
  try {
    const snapshot = await getDocs(patientsRef);
    let patients = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return patients;
  } catch(e) {
    console.error(e);
  }
  // await fakeNetwork(`getContacts:${query}`);
  // let contacts = await localforage.getItem("contacts");
  // if (!contacts) contacts = [];
  // if (query) {
  //   contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  // }
  // return contacts.sort(sortBy("last", "createdAt"));
}

export async function createPatient(patientInfo: TPatient) {
  try {
    const docRef = await addDoc(patientsRef, patientInfo);
    return docRef.id;
  } catch(e) {
    console.error(e);
  }
}

export async function getPatient(patientId: string) {
  const docRef = doc(db, "patients", patientId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
    }
  } catch(e) {
    console.error(e);
  }
}

// export async function updateContact(id, updates) {
//   await fakeNetwork();
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   if (!contact) throw new Error("No contact found for", id);
//   Object.assign(contact, updates);
//   await set(contacts);
//   return contact;
// }

// export async function deleteContact(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex(contact => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise(res => {
//     setTimeout(res, Math.random() * 800);
//   });
// }