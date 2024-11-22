const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AccKH = require('../../model/AccKH');
require('dotenv').config();
// Secret key cho JWT
const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = {

    loginAccKH: async (req, res) => {
        const {email, password} = req.body

        try {
            // Tìm admin bằng email
            const admin = await AccKH.findOne({ email });
            if (!admin) {
                return res.status(401).json({ message: 'Email không tồn tại' });
            }
            let messError = `Tài khoản này vi phạm quy định của trang và đang bị khóa! ` + '\n' + `Vui lòng liên hệ Admin!`
            if(admin.isActive === false) {
                return res.status(401).json({ message: messError });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            console.log("admin.password: ",admin.password);
            console.log("password: ",password);
            console.log("hashedPassword: ",hashedPassword);
            console.log('EXPIRESIN:', process.env.EXPIRESIN);


            // So sánh mật khẩu với bcrypt
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu không chính xác' });
            }

            // Tạo token JWT
            const token = jwt.sign(
                { adminId: admin._id, email: admin.email },
                JWT_SECRET,
                { expiresIn: process.env.EXPIRESIN } // Thời gian hết hạn của token
            );

             // Lưu token vào cookie
            res.cookie('token', token, {
                httpOnly: true, // Bảo mật hơn khi chỉ có server mới có thể truy cập cookie này
                secure: process.env.NODE_ENV === 'production', // Chỉ cho phép cookie qua HTTPS nếu là production
                maxAge: parseInt(process.env.MAXAGE), // 1 giờ
            });

            // Trả về thông tin admin (có thể trả về thông tin khác tùy nhu cầu)
            res.json({ message: 'Đăng nhập thành công', access_token: token, data: admin });
            console.log(`Đăng nhập thành công với token: ${token}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    },

    logoutKH: async (req, res) => {
        try {
            // Xóa cookie chứa token
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Bảo đảm chỉ xóa cookie qua HTTPS nếu là production
            });
    
            // Trả về phản hồi thành công
            res.status(200).json({ message: 'Bạn đã đăng xuất thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    },

    registerAccKH: async (req, res) => {

        const {email, password, fullName, address, phone, gender} = req.body     
        
        console.log("email, password, fullName, address, phone, gender: ", email, password, fullName, address, phone, gender);
        
       try {
            const check = await AccKH.findOne({email: email})
            if(check) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Tài Khoản Đã Tồn Tại! Vui Lòng Chọn Email Khác!' 
                });
            } else {
                // một chuỗi đã được mã hóa có thể lưu vào cơ sở dữ liệu.
                const hashedPassword = await bcrypt.hash(password, 10);

                let dangKy = await AccKH.create({
                    email, password: hashedPassword, fullName, address, phone, gender
                })        
                return res.status(201).json({ 
                    success: true, 
                    message: 'Đăng ký tài khoản thành công', 
                    data: dangKy 
                });
            }
        } catch (error) {
            return res.status(500).json({ success: false , message: error });
        }
    }

}