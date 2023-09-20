Setup:
1.Bỏ file drupal7.98 vào folder htdocs trong xampp
2.Import file database drupal7_demo.sql vào mysql với tên database là drupal7_demo
3.Start xampp
4.Mở terminal folder server 
	chạy câu lệnh: 'npm i' (cài đặt các module cần thiết)
	chạy câu lệnh: 'npm start' (chạy server nodejs)
5.Mở terminal folder client
	chạy câu lệnh: 'npm i' (cài đặt các module cần thiết)
	chạy câu lệnh: 'npm start' (chạy client reactjs)

drupal7 account: 
-admin
-Admin123


Trả lời câu hỏi:
Nếu số lượng cùng lưu quá nhiều, thì có chuyện gì xảy ra? và phương án xử lý như thế nào?
-Nếu số lượng gọi đến database quá nhiều có thể dẫn đến việc database bị quá tải, làm giảm hiệu suất và API có thể bị gián đoạn
-Để giái quyết vấn đề này ta có thể dùng queue của redis, bỏ các yêu cầu vào queue và chỉ gọi đến database theo điều kiện nhất định, ngoài ra ta có thể dùng load balancer hoặc nâng cấp phần cứng chạy database, dùng rate limiter cho api,…


Nếu nhiều cùng lưu thì sisolop có < số sinh viên đã đăng ký không? phương án xử lý?
-Để giải quyết vấn đề nhiều sinh viên cùng lưu mà sỉ số lớp có hạn (race condition) thì em dùng transaction và lock table (For update). Giả sử có A và B cùng ấn lưu vào cùng 1 thời điểm thì mysql sẽ lock table dkhp lại và chỉ giải quyết cho 1 sinh viên 1 lúc, sau khi đã comit hoặc rollback thì yêu cầu lưu của sinh viên tiếp theo mới được giải quyết.
