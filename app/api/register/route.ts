import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default async function POST(req, res) {
 
    try {
      const { id, name, email } = req.body;

      if (!id || !name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const userRef = doc(db, "users", id);
      await setDoc(userRef, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error:   
 "Internal Server Error"   
 });
    }
  
}
