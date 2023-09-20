import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../utils/db.js";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function EditCardPage() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [oldName, setOldName] = useState(null);
  const [cardData, setCardData] = useState({
    title: "",
    description: "",
    imageurl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const { data, error } = await supabase
          .from("Photo")
          .select("*")
          .eq("photoid", cardId)
          .single();

        if (error) {
          console.error("Supabase error:", error);
        } else {
          setCardData(data);
          setOldName(data.title);
          setImagePreview(data.imageurl);
        }
      } catch (e) {
        console.error("Error fetching card data:", e);
      }
    };

    fetchCardData();
  }, [cardId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(cardData.imageurl);
  };

  const handleEditCard = async () => {
    try {
      setIsSubmitting(true);

      if (imageFile) {
        const { data: imageDel, error: Error } = await supabase.storage
          .from("PhotoImage")
          .remove(`PhotoImage/${oldName}`);
        console.log(imageDel);
        console.log(Error);
        const { data: imagePath, error: imageError } = await supabase.storage
          .from("PhotoImage")
          .upload(`PhotoImage/${cardData.title}`, imageFile);

        if (imageError) {
          throw imageError;
        }

        const imgUrl = `https://xranypgachpyeenmfzfv.supabase.co/storage/v1/object/public/PhotoImage/${imagePath.path}`;
        cardData.imageurl = imgUrl;
      }

      const { error } = await supabase
        .from("Photo")
        .update({
          title: cardData.title,
          description: cardData.description,
          imageurl: cardData.imageurl,
        })
        .eq("photoid", cardId);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      navigate("/");
    } catch (e) {
      setError(e.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='py-3 px-6 mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
        <Typography variant='h4' align='center' gutterBottom>
          Edit Card
        </Typography>
        <form className='space-y-5'>
          {imagePreview && (
            <div className='mb-4 cursor-pointer'>
              <img
                src={imagePreview}
                alt='Selected'
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <Button
                variant='outlined'
                color='error'
                style={{ marginTop: "10px" }}
                onClick={handleCancelImage}>
                Cancel Image
              </Button>
            </div>
          )}
          <TextField
            label='Title'
            variant='outlined'
            fullWidth
            value={cardData.title}
            onChange={(e) =>
              setCardData({ ...cardData, title: e.target.value })
            }
          />
          <TextField
            label='Description'
            variant='outlined'
            multiline
            rows={4}
            fullWidth
            value={cardData.description}
            onChange={(e) =>
              setCardData({ ...cardData, description: e.target.value })
            }
          />
          <input type='file' accept='image/*' onChange={handleImageChange} />
          {isSuccess && (
            <Alert severity='success' className='mb-4'>
              Card edited successfully!
            </Alert>
          )}
          {error && (
            <Alert severity='error' className='mb-4'>
              {error}
            </Alert>
          )}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleEditCard}
            disabled={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditCardPage;
