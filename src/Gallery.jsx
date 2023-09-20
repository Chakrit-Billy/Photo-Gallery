import { useEffect, useState } from "react";
import { supabase } from "../utils/db.js";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MyAppBar from "./MyAppBar.jsx";
import PhotoGrid from "./PhotoGrid";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from("Photo")
          .select("imageurl,user(*)")
          .eq("user.auth_id", localStorage.getItem("id"))
          .order("photoid", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
        } else {
          setImages(data);
        }
      } catch (e) {
        console.error("Error fetching images:", e);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <MyAppBar />
      <Container style={{ marginTop: "30px" }}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          style={{ marginBottom: "30px" }}>
          Photo Gallery
        </Typography>
        <PhotoGrid images={images} />
      </Container>
    </>
  );
}

export default Gallery;
