class ProfileModel {
  changeCurrentUserPassword(data) {
    return new Promise((resolve, reject) => {
      process.firebase
        .auth()
        .currentUser.updatePassword(data.newPassword)
        .then(() => {
          resolve({ message: "Password successfully changed!" });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteCurrentUser() {
    return new Promise((resolve, reject) => {
      process.firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          resolve({ message: "User successfully deleted!" });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = ProfileModel;
