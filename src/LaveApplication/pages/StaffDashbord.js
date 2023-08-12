import React, { useState } from 'react'
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "540px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: "40px",
  borderRadius: "25px"
};

function StaffDashbord() {
  const [open, setOpen] = useState(false);
  const [addLeave, setAddLeave] = useState({
    from: '',
    to: "",
    reason: ""
  });

  const [leaveData, setLeaveData] = useState(JSON.parse(localStorage.getItem("leavedata") || "[]"));


  const loginname = JSON.parse(localStorage.getItem("login"));
console.log("loginname", loginname);
  const handleChange = (e) => {
    setAddLeave((prev) => ({ ...prev,loginname:loginname.id, id: uuidv4(), fname: loginname.fname, lname: loginname.lname, status: "pending", [e.target.name]: e.target.value }))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setLeaveData([...leaveData, addLeave]);
  //   localStorage.setItem("leavedata", JSON.stringify([...leaveData,addLeave]))
  // }

  //   const handleSubmit = (e) => {
  //     e.preventDefault()
  //     const leaveData =JSON.parse(localStorage.getItem("leavedata") || "[]")
  //   leaveData.push(addLeave)
  //   localStorage.setItem("leavedata",JSON.stringify(leaveData))
  //   setAddLeave({
  //     from: '',
  //     to: "",
  //     reason: ""
  //   });
  // }



  const handleSubmit = (e) => {
    e.preventDefault()
    // leaveData.push(addLeave)
    setLeaveData([...leaveData, addLeave])
    const ldata =[...leaveData, addLeave]
    localStorage.setItem("leavedata", JSON.stringify(ldata))
    setAddLeave({
      from: '',
      to: "",
      reason: ""
    });
  }

  const staffData = JSON.parse(localStorage.getItem("leavedata")) || [];
  console.log("staffdata",staffData);

  const loginstaffLeaves = staffData?.filter((leave)=>leave.loginname === loginname.id)
  console.log(loginstaffLeaves);

  const approvedLeave = loginstaffLeaves?.filter((appr) => appr.status === "Approved")
  const rejectLeave = loginstaffLeaves?.filter((rej) => rej.status === "Rejected")


  return (
    <>
      <div className='text-center my-4'>
        <Button sx={{ backgroundColor: "blue", color: "white", ":hover": { backgroundColor: "blue" } }} onClick={() => setOpen(true)}>+ Apply Leave</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

        <Box sx={style}>
          <Typography sx={{ mb: 3 }} id="modal-modal-title" variant="h6" component="h2"> Leave Details</Typography>
          <form onSubmit={handleSubmit}>

            <FormControl sx={{ mb: 3 }}>
              <Typography>From Data:</Typography>
              <TextField size='small' variant='outlined' onChange={handleChange} name='from' value={addLeave.from}
                type='date' />
            </FormControl>

            <FormControl sx={{ ml: 3, mb: 3 }}>
              <Typography>To Date:</Typography>
              <TextField size='small' variant='outlined' onChange={handleChange} name='to' value={addLeave.to}
                type='date' />
            </FormControl>

            <FormControl fullWidth>
              <Typography>Reason:</Typography>
              <TextField variant='outlined' multiline minRows={3} onChange={handleChange} value={addLeave.reason} name='reason' />
            </FormControl>

            <Grid container justifyContent="flex-end" marginTop="20px">
              <Button onClick={() => setOpen(false)} sx={{ color: "black", mr: 2 }}>cancel</Button>
              <Button sx={{ backgroundColor: "green", color: "white" }} type='submit'>Submit</Button>
            </Grid>

          </form>
        </Box>
      </Modal>

      <div className='container'>
        <div className='row text-center'>
          <div className='col-sm-3'>
          </div>
          <div className='col-sm-2'>
            <h1 className='text-primary'>{loginstaffLeaves ? loginstaffLeaves.length:0}</h1>
            <p>Total Leaves</p>
          </div>
          <div className='col-sm-2'>
            <h1 className='text-success'>{approvedLeave?.length}</h1>
            <p>Approved </p>
          </div>
          <div className='col-sm-2'>
            <h1 className='text-danger'>{rejectLeave?.length}</h1>
            <p>Rejected </p>
          </div>
        </div>
        <div className='row'>
          {loginstaffLeaves?.map((data) => {
            return <div className='col-sm-4 '>
              <div className='border border-black rounded shadow p-3'>
                <div className='mb-2'>
                  <h4>Leave For</h4>
                  <p className='m-0'>{moment(data.from).format('Do MMMM YYYY')} to { moment(data.to).format('Do MMMM YYYY')}</p>
                  <p>Number Of days {moment(data.to).diff(moment(data.form), "Days")+1}</p>
                </div>
                <div className='mb-2'>
                  <h4>Reason</h4>
                  <p>{data.reason}</p>
                </div>
                {data.status === 'pending' &&
                     <div className='mb-2'>
                     <h4>Status</h4>
                     <p>{data.status}</p>
                   </div>
                    }
                  {data.status === "Approved" &&
                    <div>
                      <h4 className='text-success'><CheckCircleIcon /> Approved</h4>
                    </div>
                  }
                  {data.status === "Rejected" &&
                    <div>
                      <h4 className='text-danger'><HighlightOffIcon /> Rejected</h4>
                    </div>
                  }
                  {/* <p className='text-secondary ml-5 mb-4'>Applide date : {moment().subtract(10, 'days').calendar()}</p> */}

              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default StaffDashbord
