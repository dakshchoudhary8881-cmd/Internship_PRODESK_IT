const home = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Data Hub API Running Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const healthCheck = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  home,
  healthCheck,
};
