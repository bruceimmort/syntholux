import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const createUser = async (username, email, password) => {
    try {
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update the user profile with the username
        await updateProfile(userCredential.user, {
            displayName: username,
        });

        return userCredential;
    } catch (error) {
        // Handle any errors that occur during signup
        console.error("Error during user signup:", error);
        throw error;
    }
};

export const login = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return auth.signOut();
};