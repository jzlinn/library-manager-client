import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid, TextField } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AddNewBookItem from "./AddNewBookItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux-toolkit/store";
import { getBooks } from "../redux-toolkit/reducers/api";
import { IBooks, IPaginate } from "../services/types";

const ListAllBook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { books, loading, error, status } = useSelector(
    (state: RootState) => state.books
  );

  const [fetchedBook, setFetchedBook] = useState<IBooks[] | any>([]);
  const [searchBook, setSearchBook] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log("dispatch call");
    let params: IPaginate = {
      page: page,
      limit: 10,
    };
    dispatch(getBooks(params));
  }, [dispatch, page]);

  useEffect(() => {
    if (status === "success") {
      setFetchedBook(books?.books);
    }
  }, [status]);

  const lastBookElementRef: any = useCallback(
    (node: HTMLLIElement | any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container maxWidth="lg">
      <div>
        <h2>Books</h2>
        <br />
      </div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                variant="standard"
                margin="none"
                required
                fullWidth
                name="searchbookname"
                label=" Search Book Name"
                type="text"
                id="searchbookname"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
              />
              <br />
            </Grid>

            <Grid item xs={3}>
              <AddNewBookItem />
            </Grid>
          </Grid>
        </Box>
        <br />
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {status === "success" ? (
            fetchedBook.map((book: any, index: number) => {
              return (
                <Grid item xs={3} key={book._id} /* ref={lastBookElementRef}*/>
                  <Card variant="outlined">
                    <div>
                      <Grid item spacing={2}>
                        <Card variant="outlined">
                          <Fragment>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                {book ? book.name : "Book Name"}
                              </Typography>
                              <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                {book ? book.description : "Description"}
                              </Typography>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {book ? book.author : "author"}
                              </Typography>
                              <Typography variant="body2">
                                <Box sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                      <p>
                                        {book ? book.publisher : "publidhed by"}
                                      </p>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <p>{book ? book.price : "price"}</p>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Typography>
                            </CardContent>
                          </Fragment>
                        </Card>
                      </Grid>
                    </div>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ListAllBook;
