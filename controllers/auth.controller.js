const AuthModel = require("../models/auth.model");
const authModel = new AuthModel();

class AuthController {
  loginUser(loginCredentials) {
    return authModel.login(loginCredentials);
  }

  registerUser(registerCredentials) {
    return authModel.register(registerCredentials);
  }

  logoutUser() {
    return authModel.logout();
  }
}

module.exports = AuthController;
