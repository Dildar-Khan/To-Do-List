import { Container, CssBaseline, Box, TextField, Button } from "@mui/material";

import CustomTable from "../components/CustomTable";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post("/tasks/addTask", { taskName, inProgress: false, done: false });
    if (result.status === 200) {
      setData(result.data.task);
      setTaskName("");
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ alignSelf: "center", width: 500 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="task"
            label="Please enter task name"
            name="task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Add
          </Button>
        </Box>
        <Box component="div">
          <CustomTable newRecord={data} />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
