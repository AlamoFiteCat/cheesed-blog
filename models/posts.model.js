class PostsModel {
  constructor() {}

  getAllPosts() {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection("posts")
        .orderBy("date", "desc")
        .get()
        .then((docArray) => {
          let data = [];
          docArray.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getSinglePostById(id) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection("posts")
        .doc(id)
        .get()
        .then((response) => {
          resolve(response.data());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createNewPost(postData) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection("posts")
        .add({ ...postData, date: new Date() })
        .then(() => {
          resolve({ message: "Post successfully created!" });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updatePost(postId, postData) {
    const partialPost = {
      title: postData.data.title,
      text: postData.data.text,
      tags: postData.data.tags.split(","),
    };

    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection("posts")
        .doc(postId.id)
        .update(partialPost)
        .then(() => {
          resolve({ message: "Post successfully saved!" });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deletePost(param) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection("posts")
        .doc(param.id)
        .delete()
        .then(() => {
          resolve({ message: "Post successfully deleted!" });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = PostsModel;
