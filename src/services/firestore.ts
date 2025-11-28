import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { Service, Withdrawal } from "../../types";

// --- Services Collection ---

const SERVICES_COLLECTION = "services";

export const subscribeToServices = (callback: (services: Service[]) => void) => {
    const q = query(collection(db, SERVICES_COLLECTION), orderBy("startDate", "desc"));

    return onSnapshot(q, (snapshot) => {
        const services = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Service[];
        callback(services);
    });
};

export const addService = async (service: Omit<Service, "id">) => {
    try {
        const docRef = await addDoc(collection(db, SERVICES_COLLECTION), service);
        return docRef.id;
    } catch (e) {
        console.error("Error adding service: ", e);
        throw e;
    }
};

export const updateService = async (service: Service) => {
    try {
        const serviceRef = doc(db, SERVICES_COLLECTION, service.id);
        // Remove id from data to avoid duplication in document
        const { id, ...data } = service;
        await updateDoc(serviceRef, data);
    } catch (e) {
        console.error("Error updating service: ", e);
        throw e;
    }
};

export const deleteService = async (id: string) => {
    try {
        await deleteDoc(doc(db, SERVICES_COLLECTION, id));
    } catch (e) {
        console.error("Error deleting service: ", e);
        throw e;
    }
};

// --- Withdrawals Collection ---

const WITHDRAWALS_COLLECTION = "withdrawals";

export const subscribeToWithdrawals = (callback: (withdrawals: Withdrawal[]) => void) => {
    const q = query(collection(db, WITHDRAWALS_COLLECTION), orderBy("date", "desc"));

    return onSnapshot(q, (snapshot) => {
        const withdrawals = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Withdrawal[];
        callback(withdrawals);
    });
};

export const addWithdrawal = async (withdrawal: Omit<Withdrawal, "id">) => {
    try {
        const docRef = await addDoc(collection(db, WITHDRAWALS_COLLECTION), withdrawal);
        return docRef.id;
    } catch (e) {
        console.error("Error adding withdrawal: ", e);
        throw e;
    }
};

export const deleteWithdrawal = async (id: string) => {
    try {
        await deleteDoc(doc(db, WITHDRAWALS_COLLECTION, id));
    } catch (e) {
        console.error("Error deleting withdrawal: ", e);
        throw e;
    }
};
