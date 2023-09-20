import express from "express";
import { getAllLopHoc } from "../services/lop_hoc.js";
const router = express.Router();

router.get("/", getAllLopHoc);

export default router;
