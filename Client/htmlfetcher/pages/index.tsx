import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import TaskModal from "./components/taskmodal";
export type Task = {
  id: number;
  url: string;
  status: string;
  html: string;
};

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [userInput, setUserInput] = useState<string>("");
  console.log(userInput);

  function apiCall() {
    axios
      .get("http://localhost:3000/urls/")
      .then((response) => setTasks(response.data.tasks));
  }

  useEffect(() => {
    apiCall();
    setInterval(apiCall, 5000);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    console.log(event.target.value);
  };
  function handleClick() {
    axios
      .post("http://localhost:3000/urls/", { url: userInput })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUserInput("");
      });
  }

  function handleDelete(id: number) {
    axios
      .delete(`http://localhost:3000/urls/${id}`)
      .then((res) => console.log(res, "this url has been deleted"));
  }

  return (
    <div>
      <Typography variant="h3"> HTML FETCHER</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          onChange={handleChange}
          value={userInput}
        />
        <Button variant="contained" onClick={handleClick}>
          Get the HTML
        </Button>

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(task.id)}
                  />
                </IconButton>
              }
            >
              {task.status === "failed" ? (
                <CancelIcon
                  sx={(t) => ({ color: t.palette.error.light, mr: "2rem" })}
                />
              ) : task.status === "completed" ? (
                <CheckCircleIcon
                  sx={(t) => ({ color: t.palette.success.light, mr: "2rem" })}
                />
              ) : (
                <PendingIcon />
              )}

              <ListItemText sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                {task.url}
              </ListItemText>
              <TaskModal task={task} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Home;
