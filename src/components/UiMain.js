import {
  Typography,
  Button,
  FormControlLabel,
  Popover,
  Switch,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Modal,
  Icon,
} from "@mui/material";
import * as React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const CustomTrackingCell = (props) => {
  console.log(93, props.row);
  return (
    <>
      {props.row.track === "Already installed" ? (
        <>
          <CheckCircleIcon sx={{ color: "green" }} />
          <div style={{ marginLeft: "20px" }}>Already Installed</div>
        </>
      ) : (
        <>
          <ErrorIcon sx={{ color: "red" }} />
          <div style={{ marginLeft: "20px" }}>Not Installed</div>
        </>
      )}
    </>
  );
};
const CustomStatusCell = () => {
  const [isOn, setIsOn] = useState(false);
  const handleChange = (e) => {
    const val = e.target.checked;
    setIsOn(val);
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <Switch onChange={handleChange} checked={isOn} {...label} defaultChecked />
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CustomActionCell = (props) => {
  const [update, setupdate] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  return (
    <>
      <div
        style={{ fontWeight: "750" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        ...
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{ p: 1, fontSize: 14 }}
          onClick={(e) => {
            setupdate(props.row);
            handleOpen1();
          }}
        >
          <BorderColorIcon sx={{ fontSize: 15 }}></BorderColorIcon>
          &nbsp;&nbsp;Edit
        </Typography>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Domain
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#c7adab" }}
            >
              Domain/Subdomain
            </Typography>

            <TextField
              value={update.name}
              size="small"
              sx={{ width: "250px" }}
            ></TextField>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <Button variant="contained" onClick={handleClose1}>
                Update
              </Button>
              <Button onClick={handleClose1}>Cancel</Button>
            </div>
          </Box>
        </Modal>

        <Typography sx={{ p: 1, fontSize: 14 }}>
          <DescriptionOutlinedIcon
            sx={{ fontSize: 19 }}
          ></DescriptionOutlinedIcon>
          &nbsp;&nbsp;Install script
        </Typography>

        <Typography sx={{ p: 1, fontSize: 14 }}>
          <AutoDeleteOutlinedIcon
            sx={{ fontSize: 20 }}
          ></AutoDeleteOutlinedIcon>
          &nbsp;&nbsp;Delete
        </Typography>
      </Popover>
    </>
  );
};

const columns = [
  // { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "DOMAIN NAME",
    width: 300,
    editable: true,
  },
  {
    field: "track",
    headerName: "TRACKING",
    renderCell: CustomTrackingCell,
    width: 300,
  },
  {
    field: "status",
    headerName: "STATUS",
    renderCell: CustomStatusCell,
    width: 300,
  },
  {
    field: "action",
    headerName: "ACTION",
    renderCell: CustomActionCell,
    width: 255,
  },
];

const rows = [
  {
    id: 1,
    name: "connect.domains.google.com",
    track: "Not installed",
    status: true,
  },
  {
    id: 2,
    name: "userlove.test.in",
    track: "Already installed",
    status: true,
  },
  {
    id: 3,
    name: "tracking.user.com",
    track: "Already installed",
    status: true,
  },
  {
    id: 4,
    name: "design.creation.com",
    track: "Not installed",
    status: true,
  },
  {
    id: 5,
    name: "bussiness.tour.holiday.com",
    track: "Not installed",
    status: true,
  },
];

export const UiMain = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="main-div">
        <span className="left-span">
          <div>
            <Typography fontFamily="sans-serif" variant="h6">
              Manage domain
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" fontSize="13px" color="#9b9b96">
              You can add,export,edit and delete your domain
            </Typography>
          </div>
        </span>
        <span className="right-span">
          <div>
            <Button
              onClick={() => setOpen(true)}
              size="small"
              className="header-menu"
              variant="contained"
              color="primary"
            >
              Add domain
            </Button>

            <Dialog
              className="main-dialog"
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle>Add new domain</DialogTitle>
              <DialogContent>
                <DialogContentText>Domain/Subdomain</DialogContentText>
                <TextField
                  size="small"
                  placeholder="ex: www.domain.com subdomain.domain.com"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Create
                </Button>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </span>
      </div>
      <div className="middle-div">
        <Box sx={{ height: 400, width: "88%", marginLeft: "60px" }}>
          {/* <DataGrid

            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          /> */}
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </div>
      <div className="center">
        <div className="pagination">
          <Pagination count={10} color="primary" />
        </div>
      </div>
    </>
  );
};
