import React from 'react'
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
function HodDassBord() {

  const navigate = useNavigate()
  const leaveDatas = JSON.parse(localStorage.getItem("leavedata"))
  console.log(leaveDatas);

  const handleApprove = (data) => {
    const approvedLeave = leaveDatas?.find((user) => user.id === data.id)
    if (approvedLeave) {
      const updateleave = leaveDatas?.map((user) => {
        if (user.id === data.id) {
          return { ...user, status: "Approved" }
        }
        console.log("approved");
        return user
      })
      localStorage.setItem("leavedata", JSON.stringify(updateleave))
      navigate("/dashbord/hod")

    }
  }
  const handleReject = (data) => {
    const approvedLeave = leaveDatas.find((user) => user.id === data.id)
    if (approvedLeave) {
      const updateleave = leaveDatas?.map((user) => {
        if (user.id === data.id) {
          return { ...user, status: "Rejected" }
        }
        return user
      })
      localStorage.setItem("leavedata", JSON.stringify(updateleave))
      navigate("/dashbord/hod")

    }
  }

  return (
    <>
      <div className='container'>
        <div className='row mt-4'>
          {leaveDatas.map((data) => {
            return <div className='col-4 '>
              <div className='border border-black p-4 shadow'>
                <h5>{data.fname} {data.lname}  </h5>
                <p className='m-0'>{data.from} To {data.to}</p>
                <p>Number of days</p>
                <h5 className='mt-3'>reason</h5>
                <p>{data.reason}</p>
                <div className='row'>

                  {data.status === 'pending' &&
                    <>
                      <div className='col-6'>
                        <button onClick={() => handleApprove(data)} className='text-white bg-success border border-black py-2 px-5  shadow'>Approve</button>
                      </div>
                      <div className='col-6'>
                        <button onClick={() => handleReject(data)} className='text-white bg-danger border border-black py-2 px-5 shadow'>Reject</button>
                      </div>
                    </>}
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
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default HodDassBord
