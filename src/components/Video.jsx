import React, { useState, useRef, useEffect } from "react";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebaseConfig";
import {
  db,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocs,
} from "../firebaseConfig";
import {
  Box,
  CircularProgress,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Fade,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PublishOutlinedIcon from "@mui/icons-material/BackupOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InboxIcon from "@mui/icons-material/Inbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const defaultState = {
  productName: "",
  filesData: [],
  description: "",
  category:"ruhaniyat",
  price:1000
};
const AddVideo = ({
  productData = defaultState,
  isUpdate = false,
  goback = () => {},
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [state, setState] = useState(productData);
  const [loading, setLoading] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleStateChange = (fieldName, fieldValue) => {
    setState((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };
  const saveProductToDB = async (productData) => {
    setLoading(true);
    try {
     
      const cleanproductData = {
        title:productData.title,
        url: productData.url || "Unnamed Product",
        description: productData.description || "",
        keyPoints:productData.keyPoints,
        category:productData.category,
        uuid: isUpdate ? productData?.uuid : Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const docRef = doc(db, "videos", cleanproductData.uuid);
      await setDoc(docRef, cleanproductData);
      if (isUpdate) {
        goback();
      }
      setSnackbar({ open: true, message: "Video saved successfully" });

      setState(defaultState);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShowSubmitButton(
      state?.title?.trim()&&
      state?.url?.trim() &&
        state?.description?.trim() &&
        state?.category?.trim() &&
        state?.keyPoints?.trim() 
    );
  }, [state]);
  
  return loading ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1200,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box>
      {showSubmitButton && (
        <div
          style={{
            display: "flex",
            justifyContent: isUpdate ? "space-between" : "flex-end",
          }}
        >
          {isUpdate && (
            <IconButton onClick={goback} aria-label="delete">
              <ArrowBackOutlinedIcon />
            </IconButton>
          )}
          <Button
            onClick={() => saveProductToDB(state)}
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<PublishOutlinedIcon />}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </div>
      )}
       <TextField
        label="Enter video title"
        id="outlined-size-small"
        value={state.title}
        onChange={(event) => handleStateChange("title", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 ,mt: 2}} // Margin bottom
      />
      <TextField
        label="Enter valid youtube url"
        id="outlined-size-small"
        value={state.url}
        onChange={(event) => handleStateChange("url", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
      <TextField
        label="Enter Video category"
        id="outlined-size-small"
        value={state.category}
        onChange={(event) => handleStateChange("category", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
     
      <TextField
        label="Short description about video"
        id="outlined-size-small"
        value={state.description}
        onChange={(event) => handleStateChange("description", event.target.value)}
        size="small"
        fullWidth
        multiline
        rows={3}
        maxRows={4}
        
        sx={{ mb: 2 }} // Margin bottom
      />
      <TextField
        label="Enter key points separated by comma"
        id="outlined-size-small"
        value={state.keyPoints}
        onChange={(event) => handleStateChange("keyPoints", event.target.value)}
        size="small"
        fullWidth
        multiline
        rows={3}
        maxRows={4}
        
        sx={{ mb: 2 }} // Margin bottom
      />


      
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </Box>
  );
};
export const EditOrDeleteVideo = ({
  productData = [],
  refresh,
  showEditDelete = false,
}) => {
  const [status, setStatus] = useState({
    name: "",
    data: {},
  });
  console.log(productData,"profjfjfjjf");
  const [productName, setProductName] = useState("");
  const [hideIds, setHideIds] = useState({});
  const [open, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState("");
  const [imagesLoader, setImagesLoader] = useState({});
  useEffect(() => {
    console.log(imagesLoader, "imagesLoader");
  }, [imagesLoader]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const deleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "videos", eventId); // Document reference banaya
      await deleteDoc(eventRef); // Document delete kiya
      refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const getLayout = () => {
    if (status?.name?.length === 0) {
      return productData
        ?.filter((el) =>
          el?.title
            ?.trim()
            ?.toLowerCase()
            ?.includes(productName?.trim()?.toLowerCase())
        )
        ?.map((event) => (
          <Card
            key={event.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              boxShadow: "none", // Flat design
              bgcolor: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              <strong>Title:</strong> {event.title}
              </Typography>

              

              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
              <strong>URL:</strong> {event.url}
              </Typography>

              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Description:</strong> {event.description}
              </Typography>
              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Key points:</strong> {event.keyPoints}
              </Typography>
              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Category:</strong> {event.category}
              </Typography>

             
              {/* Edit and Delete Buttons */}
              {showEditDelete  && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setStatus({ name: "update", data: event })}
                    sx={{
                      borderRadius: 1,
                      textTransform: "none",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setIsOpen(true);
                      setEventId(event.uuid);
                    }}
                    sx={{
                      borderRadius: 1,
                      textTransform: "none",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        ));
    }
    if (status?.name === "update") {
      return (
        <AddVideo
          productData={status?.data}
          isUpdate={true}
          goback={() => {
            setStatus({ name: "" });
            refresh();
          }}
        />
      );
    }
  };
  const handleEventChange = (val) => {
    setProductName(val);
  };
 
  return (
    <>
      {productData?.length > 5 && (
        <TextField
          label="Search Video by Video title"
          id="outlined-size-small"
          value={productName}
          onChange={(event) => handleEventChange(event.target.value)}
          size="small"
          sx={{ mb: 2, mt: 2 }}
          fullWidth
        />
      )}
      {
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are You sure you want to delete Product?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This action can't be rolled back and data can't be retrieved
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => {
                handleClose();
                deleteEvent(eventId);
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      }
      {getLayout()}
    </>
  );
};
export const NoDataWidget = () => {
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          p: 3,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <InboxIcon sx={{ fontSize: 80, color: "#757575", mb: 2 }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#424242", mb: 1 }}
        >
          No Data Found
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#757575", textAlign: "center", mb: 3 }}
        >
          Looks like there are no products to display right now. Add some products
          or try refreshing!
        </Typography>
      </Box>
    </Fade>
  );
};
const Video = () => {
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState("Add Video");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, "videos"); // "products" collection reference
      const productsSnapshot = await getDocs(productsCollection); // Saara data fetch karo
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document ka data
      }));
      setProducts(productsList); // State mein save karo
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentState === "Update/Delete Video") {
      fetchProducts();
    }
  }, [currentState]);
  return loading ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1200,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "100%", md: "30%", lg: "30%" },
        mx: "auto",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <ToggleButtonGroup
          size="small"
          color="standard"
          value={currentState}
          sx={{ mb: 1 }}
          exclusive
          aria-label="Basic button group"
        >
          <ToggleButton
            value="Add Video"
            onClick={() => setCurrentState("Add Video")}
            sx={{ textTransform: "none" }}
          >
            Add Video
          </ToggleButton>
          <ToggleButton
            value="Update/Delete Video"
            onClick={() => setCurrentState("Update/Delete Video")}
            sx={{ textTransform: "none" }}
          >
            Update/Delete Video
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {currentState === "Add Video" && <AddVideo />}
      {currentState === "Update/Delete Video" &&
        !loading &&
        (Boolean(products?.length) ? (
          <EditOrDeleteVideo
            productData={products}
            refresh={fetchProducts}
            showEditDelete={true}
          />
        ) : (
          <NoDataWidget />
        ))}
    </Box>
  );
};

export default Video;
