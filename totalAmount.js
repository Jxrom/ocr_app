// Import Firestore methods
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Ensure it's correctly imported

// Function to store totalAmount in Firestore
const storeTotalAmount = async (totalAmount) => {
  try {
    const docRef = await addDoc(collection(db, "receipts"), {
      totalAmount,
      // You can add more fields like date, user ID, etc.
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Call this function where you determine the totalAmount
storeTotalAmount(extractedTotalAmount);
