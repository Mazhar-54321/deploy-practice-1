import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Event from "./Event"; // Event component import
import Khanqah from "./Khanqah"; // Khanqah component import
import Video from "./Video"; // Video component import

const Activity = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Dropdown ka state

  // Dropdown change handler
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Conditional rendering ke liye component select karna
  const renderComponent = () => {
    switch (selectedOption) {
      case "Event":
        return <Event />;
      case "Khanqah":
        return <Khanqah />;
      case "Video":
        return <Video />;
      default:
        return <Event />
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel id="activity-label">Activity</InputLabel>
        <Select
          labelId="activity-label"
          value={selectedOption}
          label="Activity"
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Khanqah">Khanqah</MenuItem>
          <MenuItem value="Video">Video</MenuItem>
        </Select>
      </FormControl> */}

      {/* Selected component render karna */}
      <div >{renderComponent()}</div>
    </div>
  );
};

export default Activity;