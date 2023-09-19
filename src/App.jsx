import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ButtonGroup from "@mui/material/ButtonGroup";
import CardPopup from "./CardPopup.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer.jsx";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xranypgachpyeenmfzfv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYW55cGdhY2hweWVlbm1memZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxMzI1NjUsImV4cCI6MjAxMDcwODU2NX0.of-2CuGElVhR0AD_6y0iRhxtUCMO_dM5fHYdFUQf2FY";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const navigate = useNavigate();
  const userid = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [i, seti] = useState(0);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleViewCard = (card, i) => {
    setSelectedCard(card);
    seti(i);
  };

  // Function to close the pop-up
  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const getDatabase = async () => {
    try {
      const { data, error } = await supabase
        .from("Photo")
        .select("*")
        .eq("userid", userid);

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setCards(data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    getDatabase();
  }, []);
  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <PhotoCamera className='mr-[20px]' />
          <Typography variant='h6' gutterBottom>
            Photo Album
          </Typography>
        </Toolbar>
      </AppBar>
      <main className='bg-gray-100'>
        <div className=' py-8 px-0 pb-6 className="flex justify-center"'>
          <Container maxWidth='sm'>
            <Typography
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom>
              Photo Album
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph>
              Hello everyone, this is a photo album and I'm trying to make this
              sentence as long as possible.
            </Typography>
            <div>
              <Grid container spacing={2} className='flex justify-center '>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    See My Photos
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => navigate("/add")}>
                    Add Album
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container maxWidth='md' className='py-[20px] px-[0px] mt-[20px]'>
          <Grid container spacing={4}>
            {currentCards.map((card, index) => {
              return (
                <>
                  <Grid item key={card.photoid} xs={12} sm={6} md={4}>
                    <Card className='h-[100%] flex flex-col'>
                      <CardMedia
                        style={{ height: "200px" }} // Set the height of the image
                        image={card.imageurl}
                        title='Image Title'
                      />
                      <CardContent className='flex-grow'>
                        <Typography
                          gutterBottom
                          variant='h5'
                          className='truncate-text'
                          style={{
                            maxHeight: "40px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}>
                          {" "}
                          {/* Set the maximum height for the title and hide overflow */}
                          {card.title}
                        </Typography>
                        <Typography
                          className='truncate-text'
                          style={{ maxHeight: "80px" }}>
                          {" "}
                          {/* Set the maximum height for the description */}
                          {card.description}
                        </Typography>
                      </CardContent>
                      <CardActions className='mt-auto'>
                        {" "}
                        {/* Position buttons at the bottom */}
                        <Button
                          size='small'
                          color='primary'
                          onClick={() => handleViewCard(card, index)}>
                          View
                        </Button>
                        <Button size='small' color='primary'>
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <CardPopup
                    isOpen={selectedCard !== null}
                    onClose={handleClosePopup}
                    card={selectedCard}
                    cards={cards[i]}
                  />
                </>
              );
            })}
          </Grid>
        </Container>
      </main>

      <div className='flex justify-center bg-gray-100'>
        <ButtonGroup color='primary' aria-label='pagination'>
          {Array(Math.ceil(cards.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}>
                {index + 1}
              </Button>
            ))}
        </ButtonGroup>
      </div>
      <Footer />
    </>
  );
}

export default App;
