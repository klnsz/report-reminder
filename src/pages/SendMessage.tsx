import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Alert, Grid, TextField, Typography} from "@mui/material";
import {KeyboardArrowRight} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Swal from 'sweetalert2'
import ApiService from "../services/api.service";
import timeConverter from "../utils/helpers";

const SendMessage: FC<any> = () => {

  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [reportExist, setReportExist] = useState(false)

  useEffect(() => {
    ApiService.get('report/today').then(res => {
      console.log(res);
      if (res.data.content) {
        setValue(res.data.content)
        setReportExist(true)
      }
    })
  }, [])

  let auth = useSelector((state: any) => state.rootReducer.auth)

  function parseDate() {
    let date = new Date()
    return timeConverter(date)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function handleSubmit() {
    if (!value) {
      Swal.fire({
        title: 'Invalid Report',
        text: 'Looks like your report is empty. You can not submit an empty report.',
        icon: 'warning'
      })
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to ${reportExist ? 'update' : 'send'} your report?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: reportExist ? 'Update' : 'Send',
      focusConfirm: true
    }).then(res => {
      if (!res.value) return
      setLoading(true)
      ApiService.post('report', {
        report: value
      }).then(res => {
        Swal.fire({
          title: 'Success',
          text: `Your report has been ${reportExist ? 'updated': 'sent'}`,
          icon: 'success'
        })
        console.log(res);
      }).catch(err => {
        let errMsg = ''
        if (err.response && err.response.data) {
          errMsg =  err.response.data.message
        } else {
          errMsg = err.message
        }
        Swal.fire({
          title: 'Ops',
          text: errMsg,
          icon: 'warning'
        })
        console.log(err);
      }).finally(() => setLoading(false))
    })
  }

  return (
    <Grid>
      <Grid item container alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          Hello, {auth.user.name || auth.user.email}
        </Typography>
        <Typography>
          Report Date: <b>{ parseDate() }</b>
        </Typography>
      </Grid>
      {reportExist &&
          <Grid sx={{ mt: 2 }}>
              <Alert severity="info">You have already submit your report. However, you can make changes until midnight.</Alert>
          </Grid>
      }
      <Grid sx={{ mt: 2 }}>
        <TextField
          id="filled-multiline-flexible"
          label="Daily Report"
          multiline
          value={value}
          onChange={handleChange}
          fullWidth
          rows={10}
          variant="filled"
        />
      </Grid>
      <Grid

        container
        sx={{ mt: 2 }} justifyContent="end">
        <LoadingButton
          loading={loading}
          disabled={!value}
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          size="large"
        >
          {reportExist ? 'Update' : 'Send'} Report
        </LoadingButton>
      </Grid>
    </Grid>
  )
}
export default SendMessage