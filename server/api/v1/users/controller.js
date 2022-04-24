const { User } = require('./user.entity');

// Request handlers

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userModel = new User(body);
    const createdUserDoc = await userModel.save();
    res.status(201).json(createdUserDoc);
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email = '', password = '' } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return next({ statusCode: 401, message: 'Invalid credentials' });
    }
    const isPasswordValid = await userDoc.verifyPassword(password);
    if (!isPasswordValid) {
      return next({ statusCode: 401, message: 'Invalid credentials' });
    }
    return res.status(200).json(userDoc);
  } catch (err) {
    return next(err);
  }
};
