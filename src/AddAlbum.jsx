import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CancelIcon from "@mui/icons-material/Cancel";
import { supabase } from "../utils/db.js";
function AddAlbum() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store the selected image file
  const [imagePreview, setImagePreview] = useState(""); // Store the data URL of the selected image
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { data: path, error: err } = await supabase.storage
        .from("PhotoImage")
        .upload(`PhotoImage/${title}`, imageFile);
      const imgUrl = `https://xranypgachpyeenmfzfv.supabase.co/storage/v1/object/public/PhotoImage/${path.path}`;
      console.log(imgUrl);
      const submitObject = {
        title: `${title}`,
        description: `${description}`,
        imageurl: `${imgUrl}`,
        userid: 1,
      };
      console.log(submitObject);
      const { data, error } = await supabase
        .from("Photo")
        .insert([submitObject])
        .select();
      console.log(data);
      console.log(error);
      if (data) {
        setIsSuccess(true);
        setTitle("");
        setDescription("");
        setImageFile(null);
        setImagePreview("");
      } else {
        throw new Error("Failed to add album");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[40%]'>
        <Typography variant='h4' style={{ marginBottom: "20px" }}>
          Add Album
        </Typography>
        {isSuccess && (
          <Alert severity='success' className='mb-4'>
            Album added successfully!
          </Alert>
        )}
        {error && (
          <Alert severity='error' className='mb-4'>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
          </div>
          {imagePreview && (
            <div className='mb-4 relative cursor-pointer'>
              <img
                src={imagePreview}
                alt='Selected'
                style={{ maxWidth: "100%" }}
              />
              <CancelIcon
                className='absolute top-0 right-0'
                onClick={handleCancelImage}
              />
            </div>
          )}
          <div className='text-center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={isSubmitting}>
              Add Album
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAlbum;
