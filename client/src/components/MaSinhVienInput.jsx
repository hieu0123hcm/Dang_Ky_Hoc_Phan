import { Box, Button, Input } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeMaSinhVien } from '../data/maSinhVienSlice';

const MaSinhVienInput = () => {
  const [maSinhVienState, setMaSinhVienState] = useState('')
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    setMaSinhVienState(e.target.value);
  }

  const submitMaSinhVien = () => {
    dispatch(changeMaSinhVien(maSinhVienState))
  }

  return (
    <Box>
      <Input
        color="primary"
        size="md"
        variant="outlined"
        placeholder='Điền mã sinh viên'
        onChange={handleTextChange}
        sx={{marginRight:'15px'}}
      />
      <Button onClick={submitMaSinhVien} variant="outlined">Tiếp tục</Button>
  </Box>
  )
}

export default MaSinhVienInput