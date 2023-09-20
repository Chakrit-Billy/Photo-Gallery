/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const customModalStyles = {
  content: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    zIndex: 9999,
  },
};

function PhotoGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className='photo-grid'>
        {images.map((image, index) => (
          <div
            key={index}
            className='grid-item'
            onClick={() => openModal(image)}>
            <img src={image.imageurl} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        style={customModalStyles}>
        <IconButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
          }}
          onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <img
            src={selectedImage.imageurl}
            alt='Selected'
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        )}
      </Modal>
    </div>
  );
}

export default PhotoGrid;
