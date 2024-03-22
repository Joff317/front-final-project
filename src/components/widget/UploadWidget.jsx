import { useEffect, useRef } from "react";
import "./uploadWidget.css";
const UploadWidget = ({ onImageChange }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    // Save the current value
    cloudinaryRef.current = window.cloudinary; // Ici on utilise cette ligne pour stocket l'objet window.cloudinary et donc accéder à l'api
    // Cette ligne crée une nouvelle instance de l'upload widget en utilisant les infos de configuration et le préreglage du téléchargement.
    widgetRef.current = cloudinaryRef.current.createUploadWidget( 
      {
        cloudName: `${process.env.CLOUD_NAME}`,
        uploadPreset: `${process.env.UPLOAD_PRESET}`,
      },
      function (err, result) {
        if (result && result.event === "success") {
          // Appeler la fonction de rappel avec le chemin de l'image après le téléchargement réussi
          onImageChange(result.info.url);
        }
      }
    );
  }, [onImageChange]);
  return (
    <button id="widget-btn" onClick={() => widgetRef.current.open()}>
      Telecharger une image
    </button>
  );
};

export default UploadWidget;
