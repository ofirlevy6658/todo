import React, { useEffect, useState } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddTaskIcon from "@mui/icons-material/AddTask";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { CheckboxList } from "../components/CheckboxList";
import { ITodo } from "../Types";
import { Typography } from "@mui/material";

export const Todo = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(1);
  const [toastData, setToastData] = useState<{
    msg: string;
    severity: AlertColor;
  }>({ severity: "success", msg: "" });
  const [taskInputValue, setTaskInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/");
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInputValue) return;
    try {
      const resp = await axios.post("http://localhost:5000/save", {
        desc: taskInputValue,
      });
      setToastData({ msg: "Task added successfully", severity: "success" });
      setOpen(true);
      setData([...data, resp.data]);
      setTaskInputValue("");
    } catch (e) {
      setToastData({
        msg: "Oops somthing went wrong, please check the connection",
        severity: "error",
      });
      setOpen(true);
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await axios.delete("http://localhost:5000/delete", { data: { _id: id } });
      setToastData({ msg: "Task removed successfully", severity: "success" });
      setOpen(true);
      setData((prevData) => prevData?.filter((s) => s._id !== id));
    } catch (e) {
      setToastData({
        msg: "Oops somthing went wrong, please check the connection",
        severity: "error",
      });
      console.log(e);
    }
  };

  const handleToggle = async (id: string, done: boolean) => {
    console.log(done);
    try {
      await axios.put("http://localhost:5000/update", { _id: id, done });
      setData((prevData) =>
        prevData?.map((s) => {
          if (s._id === id) s.done = done;
          return s;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          mt: 25,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom color={"primary"}>
          To-Do List
        </Typography>
        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              width: 500,
              height: 500,
            },
          }}
        >
          <Paper elevation={10}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                mx: "auto",
              }}
              onSubmit={handleSubmit}
            >
              <InputBase
                value={taskInputValue}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add new task"
                onChange={(e) => setTaskInputValue(e.currentTarget.value)}
              />
              <IconButton type="submit" color="primary">
                <AddTaskIcon />
              </IconButton>
            </Paper>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "430px",
              }}
            >
              <Box>
                {data ? (
                  <CheckboxList
                    todos={data.slice(page * 7 - 7, page * 7)}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                  />
                ) : (
                  <Box />
                )}
              </Box>
              <Stack spacing={2}>
                <Pagination
                  count={data?.length ? Math.ceil(data.length / 7) : 1 || 1}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                  sx={{
                    "& .MuiPagination-ul": {
                      justifyContent: "center",
                    },
                  }}
                />
              </Stack>
            </Box>
          </Paper>
        </Box>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toastData.severity}
            sx={{ width: "100%" }}
          >
            {toastData.msg}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
