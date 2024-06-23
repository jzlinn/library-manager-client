import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-toolkit/store";
import { addNewBook } from "../redux-toolkit/reducers/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddNewBookItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [bookName, setBookName] = useState<string>("");
  const [autherName, setAutherName] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [publishedBy, setPublishedBy] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveNewBook = () => {
    if (bookName.length > 0) {
      if (autherName.length > 0) {
        if (publisher.length > 0) {
          if (price > 0) {
            if (description.length > 0) {
              let data: any = {
                name: bookName,
                description: description,
                price: price,
                publisher: publisher,
                author: autherName,
                publishedOn: new Date(publishedBy).valueOf(),
              };
              dispatch(addNewBook(data));
            } else {
              alert("Description should not be empty");
            }
          } else {
            alert("Price should not be zero");
          }
        } else {
          alert("Publisher name should not be empty");
        }
      } else {
        alert("Auther name should not be empty");
      }
    } else {
      alert("Bookname should not be empty");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add new book</Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            // component="form" onSubmit={handleSaveNewBook} noValidate
            sx={style}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new book
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ mt: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="bookname"
                  label="Book Name"
                  type="text"
                  id="bookname"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="AutherName"
                  label="Auther Name"
                  type="Text"
                  id="AutherName"
                  value={autherName}
                  onChange={(e) => setAutherName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Publisher"
                  label="Publisher Name"
                  type="Text"
                  id="PublisherName"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  type="number"
                  id="Price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Price"
                  label="Published on"
                  type="date"
                  id="date"
                  value={publishedBy}
                  onChange={(e) => setPublishedBy(new Date(e.target.value))}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSaveNewBook()}
                >
                  Save book
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AddNewBookItem;
