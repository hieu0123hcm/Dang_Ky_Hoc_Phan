import express from "express";
import { getHocPhanByMasv, dangKyHocPhan } from "../services/hoc_phan.js";
const router = express.Router();

router.get("/:masv", getHocPhanByMasv);
router.post("/dang_ky", dangKyHocPhan);

export default router;
