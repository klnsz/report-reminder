import {FC, useEffect, useState} from "react";
import ApiService from "../services/api.service";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import ReportContent from "../components/ReportContent";
import timeConverter from "../utils/helpers";

const MyReports: FC<any> = () => {
  const [reports, setReports] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState({
    title: null,
    content: null
  })

  const columns: GridColDef[] = [{
    field: 'content',
    headerName: 'Report Content',
    sortable: false,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Button onClick={() => reportDetails(params.row)}>
          See Full Report
        </Button>
      )
    }
  }, {
    field: 'created',
    headerName: 'Created',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return timeConverter(params.row.created)
    }
  }, {
    field: 'reportTime',
    headerName: 'Last Update',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return timeConverter(params.row.reportTime)
    }
  }]

  useEffect(() => {
    ApiService.get('report').then(res => {
      console.log(res.data);
      setReports(res.data)
    })
  }, [])

  function reportDetails (content: any) {
    console.log(content);
    setSelectedRow(({
      title: content.created,
      content: content.content
    }))
    setShowDialog(true)
  }

  function handleDialogClose () {
    setShowDialog(false)
  }


  return (
    <div>
      <ReportContent open={showDialog} handleClose={handleDialogClose} title={selectedRow.title} content={selectedRow.content} />
      <DataGrid columns={columns} rows={reports} pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                disableSelectionOnClick />
    </div>
  )
}

export default MyReports