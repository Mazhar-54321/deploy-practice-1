import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const DisplayCourses = () => {
  const [loading, setLoading] = useState(true);
  const [coursesObj, setCoursesObj] = useState({});
  const [selectedCourseCategory, setSelectedCourseCategory] =
    useState("Ruhaniyat");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "course");
        const snapshot = await getDocs(colRef);
        const docs = snapshot.docs.reverse().map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        let categorizedData = docs.reduce(
          (acc, curr) => (
            (acc[curr["category"]] = acc[curr["category"]]
              ? [...acc[curr["category"]], curr]
              : [curr]),
            acc
          ),
          {}
        );
        console.log("categorizedData", categorizedData);
        setCoursesObj(categorizedData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  return (
    loading ?<Box
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
  </Box> :<>
      
        <FormControl
        size="small"
        sx={{ minWidth: "90%", margin: "10px", marginTop: "20px" }}
      >
        <InputLabel id="demo-simple-select-helper-label">
          Select type of operation
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCourseCategory}
          label="Select type of operation"
          onChange={(e) => setSelectedCourseCategory(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                transform: " translateX(-10px)",
              },
            },
          }}
        >
          <MenuItem value={"Ruhaniyat"}>Ruhaniyat</MenuItem>
          <MenuItem value={"General"}>General</MenuItem>
          <MenuItem value={"Hikmat"}>Hikmat</MenuItem>
        </Select>
      </FormControl>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          marginBottom: "20px",
        }}
      >
        {coursesObj[selectedCourseCategory]?.map((e, i) => (
          <Card sx={{ width: "100%", m: 2 }}>
            <CardMedia
              sx={{
                height: "200px",
                objectFit: "scale-down",
                width: "100%",
                objectPosition: "center",
              }}
              image={e?.url}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {e.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Typography gutterBottom variant="h6" component="div">
                {e.fees} INR
              </Typography>
            </CardActions>
          </Card>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          background: "black",
          color: "white",
          padding: "5px",
          width: "100%",
          fontSize: "10px",
        }}
      >
        Call Salim Ashrafi @9576800000 for Trade enquiry
      </div>
    </>
  );
};
