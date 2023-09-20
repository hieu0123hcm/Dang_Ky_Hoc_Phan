import React, { useEffect, useState } from 'react'
import { fetchFromAPI, postToAPI } from '../api_services/fetchFromAPI'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import {  useDispatch, useSelector } from 'react-redux'
import { changeVariable } from '../data/globalVariableSlice'

const LopHocDangMo = () => {
  const [lopHocList, setLopHocList] = useState([])
  const [message, setMessage] = useState('');
  
  
  const maSinhVien = useSelector((state) => state.maSinhVien.result);
  const dispatch = useDispatch();
  
  //Load dữ liệu lần đầu
  useEffect(() => {
    fetchFromAPI(`lop-hoc`).then((data) => setLopHocList(data?.data))
  }, [])

  //Xữ lý nút bấm submit
  const submitDangKyMon = (maLopHoc) => {
    var obj = {
      masv : maSinhVien,
      malophoc: maLopHoc
    }
    postToAPI('hoc-phan/dang_ky',obj).then((data) => {
      setMessage(data?.message)
      dispatch(changeVariable())
    })

  }

  return (
    <Box>
      <Typography fontSize={'20px'} variant='h6'>Danh sách lớp học đang mở</Typography>
      {
        message !== '' && <Typography sx={{width:'50vw',marginY:'25px'}} textAlign={'center'} color={'#2196f3'}>{message}</Typography>
      }
      <TableContainer sx={{marginY:'10px', width:'50vw'}} component={Paper}>
        <Table padding='checkbox' size='medium' aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell ><b>ID</b></TableCell>
              <TableCell align="center"><b>Mã lớp học</b></TableCell>
              <TableCell align="center"><b>Tiết học</b></TableCell>
              <TableCell align="center"><b>Thứ</b></TableCell>
              <TableCell align="center"><b>Sỉ số lớp</b></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Check dữ liệu */}
            {lopHocList?.length > 0 ? lopHocList.map((row) => (
               <TableRow key={row.id}>
                <TableCell >{row.id}</TableCell>
                <TableCell align="center"><b>{row.malophoc}</b></TableCell>
                <TableCell align="center">{row.tiethoc}</TableCell>
                <TableCell align="center">{row.thu}</TableCell>
                <TableCell align="center">{row.sisolop}</TableCell>
                <TableCell align="center"><Button key={row.id} onClick={() => submitDangKyMon(row.malophoc)}>Đăng Ký</Button></TableCell>
               </TableRow>             
            )): 
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LopHocDangMo