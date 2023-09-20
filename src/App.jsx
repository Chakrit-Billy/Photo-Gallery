import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonGroup from "@mui/material/ButtonGroup";
import CardPopup from "./CardPopup.jsx";
import MyAppBar from "./MyAppBar";
import { useNavigate } from "react-router";
import Footer from "./Footer.jsx";
import { supabase } from "../utils/db.js";

function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [i, seti] = useState(0);

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewCard = (card, i) => {
    setSelectedCard(card);
    seti(i);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const handleEditCard = (card) => {
    navigate(`/edit/${card.photoid}`);
  };

  const getDatabase = async () => {
    try {
      const { data, error } = await supabase
        .from("Photo")
        .select("*,user(*)")
        .eq("user.auth_id", localStorage.getItem("id"));

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setCards(data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const handleDelete = async (card) => {
    console.log(card);

    const { error } = await supabase
      .from("Photo")
      .delete()
      .eq("photoid", card.photoid);
    if (error) {
      console.log(error);
    }
    getDatabase();
  };
  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <>
      <CssBaseline />
      <MyAppBar />

      <main className='bg-gray-100'>
        <div className='py-8 px-0 pb-6'>
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
              Capture the moments, cherish the memories
            </Typography>
            <div>
              <Grid container spacing={2} className='flex justify-center '>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate("/gallery")}>
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
                <React.Fragment key={card.photoid}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className='h-[100%] flex flex-col'>
                      <CardMedia
                        style={{ height: "200px" }}
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
                          {card.title}
                        </Typography>
                        <Typography
                          className='truncate-text'
                          style={{ maxHeight: "80px" }}>
                          {card.description}
                        </Typography>
                      </CardContent>
                      <CardActions className='mt-auto'>
                        <Button
                          size='small'
                          color='primary'
                          onClick={() => handleViewCard(card, index)}>
                          View
                        </Button>
                        <Button
                          size='small'
                          color='primary'
                          onClick={() => handleEditCard(card)}>
                          Edit
                        </Button>
                        <Button
                          size='small'
                          color='primary'
                          onClick={() => handleDelete(card)}>
                          Delete
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
                </React.Fragment>
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
