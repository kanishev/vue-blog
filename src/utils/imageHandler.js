import firebase from "firebase/app";
import "firebase/storage";

export function imageHandler(file, Editor, cursorLocation, resetUploader) {
  const storageRef = firebase.storage().ref();
  const docRef = storageRef.child(`documents/blogPostImages/${file.name}`);

  docRef.put(file).on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
    },
    (err) => {
      console.log(err);
    },
    async () => {
      const downloadURL = await docRef.getDownloadURL();
      Editor.insertEmbed(cursorLocation, "image", downloadURL);
      resetUploader();
    }
  );
}
