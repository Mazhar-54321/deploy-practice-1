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
import ButtonGroup from "@mui/material/ButtonGroup";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Chip from "@mui/material/Chip";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PublishOutlinedIcon from "@mui/icons-material/BackupOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InboxIcon from "@mui/icons-material/Inbox";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const defaultState = {
  eventName: "",
  country: "India",
  city: "",
  date: new Date(),
  filesData: [],
  urls: "",
  address: "",
};
const AddEvent = ({
  eventData = defaultState,
  isUpdate = false,
  goback = () => {},
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [state, setState] = useState(eventData);
  const [loading, setLoading] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const handleDelete = (chipToDelete) => {
    setState((prev) => ({
      ...prev,
      filesData: prev.filesData?.filter((chip) => chip !== chipToDelete),
    }));
  };
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    // Filter valid image files and check for size limit (5MB)
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

      // Discard files that are not images or exceed the size limit
      return isImage && isValidSize;
    });

    // Prevent duplicates by using a Set
    const uniqueFiles = Array.from(
      new Set([...state?.filesData, ...validFiles], (a) => a?.[0]?.name)
    );

    // Update the chipsData state with unique files
    setState((prev) => ({ ...prev, filesData: uniqueFiles }));
  };
  const handleStateChange = (fieldName, fieldValue) => {
    setState((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const handleUpload = async (files, courseKey = "Events") => {
    try {
      if (!files || !Array.isArray(files) || files.length === 0) {
        throw new Error("No files provided for upload.");
      }

      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        if (file.name.includes("firebasestorage.googleapis.com")) {
          return file.name;
        }
        const fileRef = ref(storage, `${courseKey}/${fileName}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      });

      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error("Error uploading files: ", error);
      alert("Error uploading files: " + error.message);
      throw error;
    }
  };

  const saveEventToDB = async (eventData) => {
    setLoading(true);
    try {
      if (!eventData || !eventData.filesData) {
        throw new Error("Event data or files missing.");
      }

      // Files upload karo aur URLs lo
      const urls = await handleUpload(eventData.filesData);

      // Clean eventData - sirf Firestore-compatible fields rakho
      const cleanEventData = {
        eventName: eventData.eventName || "Unnamed Event",
        country: eventData.country || "",
        city: eventData.city || "",
        address: eventData.address || "",
        urls: eventData?.urls, // Array of uploaded file URLs
        files: urls,
        uuid: isUpdate ? eventData?.uuid : Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Firestore mein save karo
      const docRef = doc(db, "events", cleanEventData.uuid);
      await setDoc(docRef, cleanEventData);
      if (isUpdate) {
        goback();
      }
      setSnackbar({ open: true, message: "Event saved successfully" });

      setState(defaultState);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleChipClick = (file) => {
    const fileURL = isUpdate ? file?.name : URL.createObjectURL(file); // Create URL for the file
    const link = document.createElement("a");
    link.href = fileURL;
    link.target = "_blank"; // Open in a new tab
    link.click(); // Trigger the click to open in new tab
  };

  useEffect(() => {
    setShowSubmitButton(
      state?.eventName?.trim() &&
        state?.country?.trim() &&
        state?.address?.trim() &&
        state?.city?.trim() &&
        Boolean(state?.filesData?.length) &&
        state?.urls
    );
  }, [state]);
  useEffect(() => {
    if (isUpdate) {
      setState({
        ...eventData,
        filesData: eventData?.files?.map((el) => ({ name: el })),
      });
    }
  }, []);
  return loading ? (
    <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            onClick={() => saveEventToDB(state)}
            variant="outlined"
            endIcon={<PublishOutlinedIcon />}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </div>
      )}
      <TextField
        label="Event name"
        id="outlined-size-small"
        value={state.eventName}
        onChange={(event) => handleStateChange("eventName", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2, mt: 2 }} // Margin bottom
      />
      <TextField
        label="Country"
        id="outlined-size-small"
        value={state.country}
        onChange={(event) => handleStateChange("country", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
      <TextField
        label="City"
        id="outlined-size-small"
        value={state.city}
        onChange={(event) => handleStateChange("city", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
      <TextField
        label="Address"
        id="outlined-size-small"
        value={state.address}
        onChange={(event) => handleStateChange("address", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
      <TextField
        label="Youtube urls separated by comma"
        id="outlined-size-small"
        value={state.urls}
        onChange={(event) => handleStateChange("urls", event.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }} // Margin bottom
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ mb: 1 }}>
          <DatePicker
            label="Select Date"
            format="DD-MMM-YYYY"
            value={dayjs(state?.date)}
            maxDate={dayjs(new Date())}
            onChange={(newValue) => handleStateChange("date", newValue)}
            sx={{
              width: "100%",
              mb: 1,
              "& .MuiInputBase-root": {
                height: "40px", // Match the height of a small TextField
                fontSize: "0.875rem", // Adjust font size to match TextField's smaller size
                padding: "0 12px", // Adjust padding to reduce input height
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "4px", // Rounded corners
              },
              "& .MuiInputBase-input": {
                padding: "10px 0", // Adjust input padding for better height
              },
              "& .MuiFormLabel-root": {
                top: "0px", // Adjust label position if necessary
                color: "black",
              },
            }}
          />
        </Box>
      </LocalizationProvider>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{ mb: 2, mr: 2 }} // Margin bottom
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          multiple
        />
      </Button>
      {state?.filesData?.map((el, index) => (
        <Chip
          onClick={() => handleChipClick(el)}
          key={index}
          label={el?.name}
          onDelete={() => handleDelete(el)}
          sx={{ mb: 1 }}
        />
      ))}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </Box>
  );
};
const EditOrDeleteEvent = ({ eventData = [], refresh }) => {
  const [status, setStatus] = useState({
    name: "",
    data: {},
  });

  const [eventName, setEventName] = useState("");
  const [hideIds, setHideIds] = useState({});
  const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "events", eventId); // Document reference banaya
    await deleteDoc(eventRef); // Document delete kiya
    refresh();
  } catch (error) {
    console.error("Error deleting event:", error);
    
  }
}
  const getLayout = () => {
    if (status?.name?.length === 0) {
      return eventData
        ?.filter((el) =>
          el?.eventName
            ?.trim()
            ?.toLowerCase()
            ?.includes(eventName?.trim()?.toLowerCase())
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
                {event.eventName}
              </Typography>

              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Location:</strong> {event.city}, {event.country}
              </Typography>

              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Address:</strong> {event.address}
              </Typography>

              <Typography variant="body1" sx={{ color: "#212121", mb: 1 }}>
                <strong>Created At:</strong>{" "}
                {dayjs(new Date(event.createdAt)).format("DD-MMM-YYYY")}
              </Typography>

              {/* Files as Images or Links */}
              {event.files && Array.isArray(event.files) && (
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "medium", color: "#212121", mb: 0.5 }}
                    >
                      Files:
                    </Typography>
                    <Button
                      onClick={() =>
                        setHideIds((prev) => ({
                          ...prev,
                          [event.uuid]: !prev[event.uuid],
                        }))
                      }
                      startIcon={
                        !hideIds[event.uuid] ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )
                      }
                      sx={{ textTransform: "none", minWidth: 0, p: 0 }}
                    >
                      {hideIds[event.uuid] ? "Hide" : "Show"}
                    </Button>
                  </Box>
                  {hideIds[event.uuid] && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {event.files.map((fileUrl, index) => (
                        <CardMedia
                          key={index}
                          component="img"
                          image={fileUrl}
                          alt={`Event Image ${index + 1}`}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(fileUrl, "_blank")}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              {/* Edit and Delete Buttons */}
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
                  onClick={() => {deleteEvent(event.uuid)}}
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ));
    }
    if (status?.name === "update") {
      return (
        <AddEvent
          eventData={status?.data}
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
    setEventName(val);
  };
  return (
    <>
      <TextField
        label="Search Event by event name"
        id="outlined-size-small"
        value={eventName}
        onChange={(event) => handleEventChange(event.target.value)}
        size="small"
        sx={{ mb: 2, mt: 2 }}
        fullWidth
      />
      {getLayout()}
    </>
  );
};
const NoDataWidget = () => {
    return (
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            p: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
            Looks like there are no events to display right now. Add some events or
            try refreshing!
          </Typography>
          
        </Box>
      </Fade>
    );
  };
const Event = () => {
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState("Add Event");
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsCollection = collection(db, "events"); // "events" collection reference
      const eventsSnapshot = await getDocs(eventsCollection); // Saara data fetch karo
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document ka data
      }));
      setEvents(eventsList); // State mein save karo
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentState === "Update/Delete Event") {
      fetchEvents();
    }
  }, [currentState]);
  return loading ? (
    <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1200,
            }}
          >
            <CircularProgress />
          </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        minHeight: "100%",
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
          value="Add Event"
          onClick={() => setCurrentState("Add Event")}
          sx={{ textTransform: "none" }}
        >
          Add Event
        </ToggleButton>
        <ToggleButton
          value="Update/Delete Event"
          onClick={() => setCurrentState("Update/Delete Event")}
          sx={{ textTransform: "none" }}
        >
          Update/Delete Event
        </ToggleButton>
      </ToggleButtonGroup>
      {currentState === "Add Event" && <AddEvent />}
      {currentState === "Update/Delete Event" &&
        !loading &&
        (Boolean(events?.length) ? (
          <EditOrDeleteEvent eventData={events} refresh={fetchEvents} />
        ) : (
          <NoDataWidget />
        ))}
    </Box>
  );
};

export default Event;
