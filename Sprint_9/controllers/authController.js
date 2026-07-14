const { generateMockToken } = require("../utils/tokenGenerator");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Both username and password are required.",
      });
    }

    const token = generateMockToken();

    return res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
