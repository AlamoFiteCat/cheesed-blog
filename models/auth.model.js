class AuthModel {
  constructor() {}

  logout() {
    return new Promise((resolve, reject) => {
      process.firebase
        .auth()
        .signOut()
        .then(() => {
          resolve({ currentEmail: false, currentUsername: false });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(loginCredentials) {
    const { email, password } = loginCredentials;
    return new Promise((resolve, reject) => {
      process.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  register(registerCredentials) {
    const {
      email,
      password,
      dateOfBirth,
      username,
      location,
    } = registerCredentials;
    return new Promise((resolve, reject) => {
      process.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          process.firebase
            .firestore()
            .collection("users")
            .doc(email)
            .set({
              email: email,
              dateOfBirth: new Date(dateOfBirth),
              username: username,
              roles: ["user"],
              location,
            })
            .then(() => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = AuthModel;
