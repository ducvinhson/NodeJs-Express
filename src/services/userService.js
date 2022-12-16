import { User } from "./../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUserService = ({
  email,
  userName,
  passWord,
  name,
  access_token,
  isAdmin,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassWord = bcrypt.hashSync(passWord, 10);

      const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

      const isCheckEmail = await User.find({
        email: email,
      });

      const isCheckUserName = await User.find({
        userName: userName,
      });

      if (isCheckEmail.lenght || isCheckUserName.length) {
        resolve({
          status: "err",
          message: "The Email or UserName is existed",
        });
      }

      if (isEmail) {
        const newUser = await User.create({
          email,
          userName,
          passWord: hashPassWord,
          name,
          access_token,
          isAdmin,
        });
        resolve({
          status: "Ok",
          data: {
            email: newUser.email,
            userName: newUser.userName,
            name: newUser.name,
          },
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "err",
      });
    }
  });
};

const generalAccessToken = (data) => {
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  return access_token;
};

const generalRefreshToken = (data) => {
  const access_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });

  return access_token;
};

export const loginUserService = ({ userName, passWord }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDB = await User.find({
        userName: userName,
      });
      if (userDB[0]) {
        const checkPassWord = await bcrypt.compare(
          passWord,
          userDB[0].passWord
        );
        if (checkPassWord) {
          const access_token = generalAccessToken({
            isAdmin: userDB[0].isAdmin,
            _id: userDB[0]._id,
          });
          const refresh_token = generalRefreshToken({
            isAdmin: userDB[0].isAdmin,
            _id: userDB[0]._id,
          });
          resolve({
            status: "OK",
            data: {
              access_token,
              refresh_token,
            },
          });
        } else {
          resolve({
            status: "ERROR",
            message: "The user name or password is incorrect",
          });
        }
      } else {
        resolve({
          status: "ERROR",
          message: "The user name not is an existed",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "err",
      });
    }
  }).catch((e) => {
    console.log(e);
  });
};

export const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findById(id);
      if (findUser) {
        resolve({
          status: "ok",
          data: findUser,
        });
      }
      {
        resolve({
          status: "ok",
          message: "The user is not defined",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};

export const searchUserService = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findName = await User.find({ name });
      if (findName) {
        resolve({
          status: "ok",
          data: findName,
        });
      }
      {
        resolve({
          status: "ok",
          message: "The user is not defined",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};

export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne(data);
      if (checkUser) {
        resolve({
          status: "error",
          message: " The info of user  is duplicates",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data);
      if (updateUser) {
        const getUserUpdate = await getDetailUser(id);
        resolve({
          status: "ok",
          data: getUserUpdate,
        });
      } else {
        resolve({
          status: "error",
          message: "The user is not defined",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};

export const deleteUserService = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteUser = await User.findByIdAndDelete(_id);
      if (deleteUser) {
        resolve({
          status: "ok",
          data: deleteUser,
        });
      } else {
        resolve({
          status: "error",
          message: "The user is not defined",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};
export const deleteAllUserService = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteAllUser = await User.deleteMany({ _id: ids });
      console.log(deleteAllUser);
      if (deleteAllUser.deletedCount > 0) {
        resolve({
          status: "ok",
          data: deleteAllUser,
        });
      } else {
        resolve({
          status: "error",
          message: "Id is not defined",
        });
      }
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};

export const getAllUserService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "ok",
        data: allUser,
      });
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};

export const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
        if (err) {
          return res.status(404).json({
            message: "The user  is not authentication",
          });
        }
        if (user.isAdmin) {
          next();
        } else {
          return res.status(404).json({
            message: "The user  is not authentication",
          });
        }
      });
      resolve({
        status: "ok",
        data: allUser,
      });
    } catch (err) {
      reject({
        message: err,
        status: "error",
      });
    }
  }).catch((e) => e);
};
