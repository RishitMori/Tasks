import { firestore } from "./auth";
import { doc, updateDoc } from "firebase/firestore";
import { storage } from "./auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const collectionRef = doc(firestore, "cities", 'LA')
const handleAddImagesToDatabase = async (event) => {
    event.preventDefault();
    console.log(event.target[0].files[0]);
    const file = event.target[0].files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            console.log(snapshot);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                try {
                    await updateDoc(collectionRef, { imageurl: downloadURL })
                }
                catch (error) {
                    console.log("error occured ", error)
                }

            });
        }
    );
};
export { handleAddImagesToDatabase };