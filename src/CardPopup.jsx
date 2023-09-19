import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function CardPopup({ isOpen, onClose, card, cards }) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='md'>
      <DialogTitle>View Card</DialogTitle>
      <DialogContent>
        <Card className='h-[100%] flex flex-col'>
          <CardMedia
            className='pt-[56.25%]'
            image={cards.imageurl}
            title='Image Title'
          />
          <CardContent className='flex-grow'>
            <Typography gutterBottom variant='h5'>
              {cards.title}
            </Typography>
            <Typography>{cards.description}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <Button onClick={onClose} color='primary' variant='contained'>
        Close
      </Button>
    </Dialog>
  );
}

export default CardPopup;
