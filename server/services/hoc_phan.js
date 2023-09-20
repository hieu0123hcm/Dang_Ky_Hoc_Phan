import { connection } from "../database/db_connection.js";
import moment from "moment/moment.js";

//Service dùng để fetch dữ liệu học phần của 1 sinh viên
export const getHocPhanByMasv = async (req, res) => {
  var masv = req.params.masv;
  let sql = `SELECT * FROM DEMO_DKHP WHERE MASV LIKE '${masv}'`;
  try {
    connection.query(sql, function (err, data) {
      if (err) {
        res.json({
          message: `Lỗi Database: ${err}`,
        });
      }

      const rowCount = data?.length;
      if (rowCount > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không tìm thấy học phần đã đăng ký nào" });
      }
    });
  } catch (error) {
    res.json({ message: `Đã có lỗi xảy ra: ${error} ` });
  }
};

//Service dùng để đăng ký học phần
export const dangKyHocPhan = async (req, res) => {
  const { masv, malophoc } = req.body;

  const now = moment();
  const localTime = now.format("YYYY-MM-DD");

  //Có for update để lock 2 table
  const remainingSlots_sql = `Select (
    (SELECT sisolop FROM demo_lophoc WHERE malophoc LIKE '${malophoc}') 
    - 
    (SELECT COUNT(*) FROM demo_dkhp WHERE malophoc LIKE '${malophoc}')
    ) 
    as 'remaining slot' FOR UPDATE;`;

  const insert_sql = `INSERT INTO demo_dkhp(id,masv,malophoc,ngaydk) 
  VALUES (NULL, '${masv?.toUpperCase()}', '${malophoc}', '${localTime}') ;`;

  await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

  connection.getConnection(function (get_connection_err, db) {
    if (get_connection_err) {
      db.release();
      res.json({
        message: `Lỗi Database: ${get_connection_err}`,
      });
    }

    //Bắt đầu transaction
    db.beginTransaction(function (begin_transaction_err) {
      if (begin_transaction_err) {
        db.release();
        res.json({
          message: `Lỗi Database: ${begin_transaction_err}`,
        });
      }

      //Check slot
      db.query(remainingSlots_sql, function (query_err, data) {
        if (query_err) {
          db.rollback(function () {
            db.release();
            res.json({
              message: `Lỗi Database: ${query_err}`,
            });
          });
        }
        var remainingSlots = data[0]?.["remaining slot"];
        //Nếu còn slot
        if (remainingSlots > 0) {
          //Insert dữ liệu
          db.query(insert_sql, function (insert_query_err, data) {
            if (insert_query_err) {
              db.rollback(function () {
                db.release();
                if (insert_query_err.toString().includes("Duplicate entry")) {
                  res.json({ message: `Bạn đã có trong danh sách lớp` });
                } else if (
                  insert_query_err
                    .toString()
                    .includes("CONSTRAINT `demo_dkhp_ibfk_1`")
                ) {
                  res.json({
                    message: `Mã sinh viên không có trong dữ liệu`,
                  });
                } else {
                  res.json({
                    message: `Lỗi Database: ${insert_query_err}`,
                  });
                }
              });

              //Insert thành công
            } else {
              //Commit
              db.commit(function (commit_err) {
                if (commit_err) {
                  db.rollback(function () {
                    db.release();
                    res.json({
                      message: `Lỗi Database: ${commit_err}`,
                    });
                  });
                }
                db.release();
                res.json({
                  message: `Đã thêm thành công sv ${masv} vào lớp ${malophoc}`,
                });
              });
            }
          });

          //Trường hợp hết slot
        } else if (remainingSlots === 0) {
          db.rollback();
          db.release();
          res.json({ message: `Lớp học đã đầy` });

          //Trường hợp Mã lớp học không tồn tại
        } else {
          db.rollback();
          db.release();
          res.json({ message: `Lớp học không tồn tại` });
        }
      });
    });
  });
};
