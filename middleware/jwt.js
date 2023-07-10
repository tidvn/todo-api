const jwt = require('jsonwebtoken');
const Service = require("../services");
const jwtMiddleware = async (req, res, next) => {
  // Lấy token từ header hoặc query string
  const token = req.header('Authorization') || req.query.token;

  // Nếu không tồn tại token
  if (!token) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  try {
    const tokenParse = jwt.decode(token)
    const key = await Service.getKeyById(tokenParse.sub);
    // Xác thực token và lấy thông tin giải mã
    const decoded = jwt.verify(token, key.secret);

    // Thêm thông tin giải mã vào request để sử dụng trong các route sau này
    req.token = decoded;

    // Tiếp tục sang middleware/route tiếp theo
    next();
  } catch (err) {
    // Xử lý lỗi xác thực token
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = jwtMiddleware;
