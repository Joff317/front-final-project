import { useEffect, useRef } from "react";
const UploadWidget = ({ onImageChange }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    // Save the current value
    cloudinaryRef.current = window.cloudinary;
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
    <button onClick={() => widgetRef.current.open()}>
      Telecharger une image
    </button>
  );
};

export default UploadWidget;
