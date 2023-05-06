module.exports = {
  registerController: async (req, res, next) => {
    try {
      res.status(200);
      res.send("Register");
    } catch (error) {}
  },
  loginController: async (req, res, next) => {
    try {
      res.status(200);
      res.send("Login");
    } catch (error) {
      next(error);
    }
  },
};
