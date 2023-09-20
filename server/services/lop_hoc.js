import { connection } from "../database/db_connection.js";

export const getAllLopHoc = async (req, res) => {
  let sql = `SELECT * FROM DEMO_LOPHOC`;

  try {
    connection.query(sql, function (err, data) {
      if (err) res.json(`Lỗi DB : ${err}`);

      const rowCount = data?.length;
      if (rowCount > 0) {
        res.json({
          message: "Lấy thành công",
          data,
        });
      } else {
        res.json({ message: "Không tìm thấy lớp nào" });
      }
    });
  } catch (error) {
    res.json({ message: `Đã có lỗi xảy ra: ${error} ` });
  }
};
