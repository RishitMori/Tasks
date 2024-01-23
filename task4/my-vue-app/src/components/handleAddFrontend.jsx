import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { firestore } from "./auth";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "./auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Component1() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleAddImagesToDatabase = async (event) => {
        event.preventDefault();
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
                        await addDoc(collection(firestore, "users"), {
                            title: title,
                            text: text,
                            imageurl: downloadURL
                        });
                    }
                    catch (error) {
                        console.log("error occured ", error)
                    }
                });
            }
        );
    };
    return (
        <div className="handlechange">
            <Box component="form" noValidate onSubmit={handleAddImagesToDatabase} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        label="choose image"
                        input
                        type="file"
                        multiple
                        accept="image/*"
                    />
                </Grid>

                <TextField type="text" placeholder="enter the title" value={title} onChange={(e) => { setTitle(e.target.value) }}></TextField>
                <TextField type="text" placeholder="enter the text" value={text} onChange={(e) => { setText(e.target.value) }}></TextField>
                <br></br>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </Box>

        </div >
    );
}

export { Component1 };