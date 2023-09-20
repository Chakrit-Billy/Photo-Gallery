import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// eslint-disable-next-line react/prop-types
function EditCardForm({ cardData, onSave, onCancel }) {
  const [editedCardData, setEditedCardData] = useState(cardData);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedCardData({
      ...editedCardData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedCardData);
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form>
        <TextField
          name='title'
          label='Title'
          value={editedCardData.title}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name='description'
          label='Description'
          value={editedCardData.description}
          onChange={handleFieldChange}
          fullWidth
        />
        {/* Add more fields as needed */}
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
        <Button variant='outlined' color='primary' onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default EditCardForm;
