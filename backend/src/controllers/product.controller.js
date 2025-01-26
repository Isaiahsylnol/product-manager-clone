//import your model or else ..

var userControl = {
  getAlluser: async (req, res) => {
    try {
      // get functionality here..
      let users = [{ uid: 1, uname: "rahul" }];
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userControl;
