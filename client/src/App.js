import { Box, Stack, Typography } from "@mui/material";
import LopHocDangMo from "./components/LopHocDangMo";
import LopHocDaDangKy from "./components/LopHocDaDangKy";
import MaSinhVienInput from "./components/MaSinhVienInput";

function App() {
  return (
    <Box sx={{ padding: "25px", backgroundColor: "#F9FAFF", height: "100vh" }}>
      <Typography variant="h4" align="center">
        Đăng Ký Học Phần
      </Typography>
      <Box height={"25px"} />
      <MaSinhVienInput />
      <Box height={"25px"} />
      <Stack direction={"column"} justifyContent={"start"} gap={"25px"}>
        <LopHocDangMo />
        <LopHocDaDangKy />
      </Stack>
    </Box>
  );
}

export default App;
