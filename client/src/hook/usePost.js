import axios from "axios";

const usePost = (target, data) => {
  axios
    .post(target, data)
    .then((res) => {
      try {
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => console.log(err));
};

export default usePost;
