import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import lopHocRoutes from "./routes/lop_hoc.js";
import hocPhanRoutes from "./routes/hoc_phan.js";
import helmet from "helmet";

const app = express();

//Set up middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

//Routes
app.use("/lop-hoc", lopHocRoutes);
app.use("/hoc-phan", hocPhanRoutes);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
