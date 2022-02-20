import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Switch, Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";

const columns = [
  { id: "totalTasks", label: "Total Tasks", width: 300 },
  { id: "inProgress", label: "In Progress", width: 100 },
  { id: "done", label: "Done", width: 100 },
  { id: "actions", label: "Actions", width: 120 },
];

const CustomTable = ({ newRecord }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getData = async () => {
    try {
      const result = await axios.get("/tasks");
      setData(result.data.tasks.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newRecord) {
      getData();
    }
  }, [newRecord]);

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (oldRow, e) => {
    const { name, checked } = e.target;
    const changeData = { [name]: checked };
    let newRow;

    if (name === "done") {
      newRow = { ...oldRow, ...changeData, inProgress: !checked };
    } else {
      newRow = { ...oldRow, ...changeData, done: !checked };
    }

    const index = data.findIndex((dataRow) => dataRow._id === oldRow._id);
    const newData = [...data];
    newData[index] = newRow;

    setData(newData);
  };

  const upDateData = async (data) => {
    try {
      const result = await axios.put(`/tasks/updateTask/${data._id}`, {
        taskName: data.taskName,
        inProgress: data.inProgress,
        done: data.done,
      });
      if (result.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const result = await axios.delete(`/tasks/delete/${id}`);
      if (result.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No Task added yet!</Typography>
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.id} style={{ width: col.width, fontWeight: "bold" }}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length !== 0 &&
                  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{row.taskName}</TableCell>
                      <TableCell>
                        <Switch
                          checked={row.inProgress}
                          onChange={(e) => handleChange(row, e)}
                          name="inProgress"
                        ></Switch>
                      </TableCell>
                      <TableCell>
                        <Switch checked={row.done} onChange={(e) => handleChange(row, e)} name="done"></Switch>
                      </TableCell>
                      <TableCell sx={{ m: 0, p: 0 }}>
                        <Button variant="contained" onClick={() => upDateData(row)} sx={{ mr: 1 }}>
                          Update
                        </Button>
                        <Button variant="contained" onClick={() => deleteData(row._id)} color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default CustomTable;
