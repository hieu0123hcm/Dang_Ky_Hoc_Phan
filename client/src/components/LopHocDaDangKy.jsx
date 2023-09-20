import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../api_services/fetchFromAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';



const LopHocDaDangKy = () => {
  const [hocPhanList, setHocPhanList] = useState([])
  const maSinhVien = useSelector((state) => state.maSinhVien.result);
  const globalVar = useSelector((state) => state.globalVariable.refresh);
  //Load dữ liệu khi state MaSV thay đổi
  useEffect(() => {
    if(maSinhVien !== ''){
      fetchFromAPI(`hoc-phan/${maSinhVien}`).then((data) => setHocPhanList(data))
    }
  }, [maSinhVien, globalVar])


  return (
    <Box>
      <Typography fontSize={'20px'}>{maSinhVien === '' ? 'Vui lòng nhập Mã sinh viên để xem' : `Danh sách lớp học của ${maSinhVien}`}</Typography>
      <TableContainer sx={{marginY:'10px'}} component={Paper}>
        <Table padding='normal' size='medium' aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell ><b>ID</b></TableCell>
              <TableCell  align="center"><b>Mã sinh viên</b></TableCell>
              <TableCell align="center"><b>Mã lớp học</b></TableCell>
              <TableCell align="right"><b>Ngày đăng ký</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Check dữ liệu */}
            {hocPhanList?.length > 0 
            ? hocPhanList.map((row) => (
               <TableRow key={row.id}>
                <TableCell >{row.id}</TableCell>
                <TableCell align="center"><b>{row.masv}</b></TableCell>
                <TableCell align="center"><b>{row.malophoc}</b></TableCell>
                <TableCell align="right">{format(new Date(row.ngaydk), 'dd/MM/yyyy')}</TableCell>
               </TableRow>
            )): 
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
)}

export default LopHocDaDangKy