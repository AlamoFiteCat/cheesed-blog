const ProfileModel = require("../models/profile.model");
const profileModel = new ProfileModel();

class ProfileController {
  changePassword(data) {
    return profileModel.changeCurrentUserPassword(data);
  }

  deleteUser() {
    return profileModel.deleteCurrentUser();
  }
}

module.exports = ProfileController;
