const UserRepository = require("../repositories/user.repository");

const userRepository = new UserRepository();

async function getAllUsers(req, res) {
  try {
    const result = await userRepository.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all users." });
  }
}

async function findByPin(req, res) {
  const { pin } = req.body;
  try {
    const result = await userRepository.findByPin(pin);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user by pin." });
  }
}

module.exports = {
  getAllUsers,
  findByPin,
};
