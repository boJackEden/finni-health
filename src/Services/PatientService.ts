import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { db } from "../Configs/firebase";
import { doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { TPatient, TSavedPatient } from "../Routes/Patient";

const patientsRef = collection(db, "patients");

export async function getPatients() {
  try {
    const snapshot = await getDocs(patientsRef);
    let patients = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return patients;
  } catch(e) {
    console.error(e);
  }
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
      return {...docSnap.data(), id: docSnap.id};
    } else {
      console.error("No such document!");
    }
  } catch(e) {
    console.error(e);
  }
}

export const updatePatient = async (patientId: string, updates: TPatient) => {
  const docRef = doc(db, "patients", patientId);
  try {
    await updateDoc(docRef, updates);
  } catch(e) {
    console.error(e);
  }
}

export const deletePatient = async (patientId: string) => {
  const docRef = doc(db, "patients", patientId);
  try {
    await deleteDoc(docRef);
    return true;
  } catch(e) {
    console.error(e);
  }
}
