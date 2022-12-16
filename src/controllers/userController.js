import {
  createUserService,
  deleteAllUserService,
  deleteUserService,
  getAllUserService,
  getDetailUser,
  loginUserService,
  refreshTokenService,
  searchUserService,
  updateUserService,
} from "./../services/userService.js";

export const userController = (req, res) => {
  res.render("user");
};

export const userDetailsController = async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const response = await getDetailUser(userId);
    return res.json(response);
  }
  return res.json({
    status: "error",
    message: "the id is required",
  });
};

export const searchController = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await searchUserService(name);
      return res.json(response);
    } else {
      return res.json({
        status: "error",
        message: "the name is required",
      });
    }
  } catch (err) {
    return res.json({
      status: "error",
      message: err,
    });
  }
};

export const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (id) {
      const response = await updateUserService(id, data);
      if (response) {
        return res.json(response);
      } else {
        res.json({
          status: "error",
          message: "The sever is problem",
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "The id of user is required",
      });
    }
  } catch (err) {
    return res.json({
      status: "error",
      message: err,
    });
  }
};

export const DeleteController = async (req, res) => {
  try {
    const _id = req.params.id;
    if (_id) {
      const response = await deleteUserService(_id);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({
        status: "error",
        message: "The userId is required",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

export const DeleteAllController = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteAllUserService(id);
    return res.status(200).json({
      status: "ok",
      data: response,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

export const createUserController = async (req, res) => {
  const { email, userName, passWord, name, access_token, isAdmin } = req.body;
  if (email && userName && passWord && name) {
    const response = await createUserService({
      email,
      userName,
      passWord,
      name,
      access_token,
      isAdmin,
    });
    return res.json(response);
  } else {
    return res.json({
      status: "err",
      message: "email,userName, passWord and name is required",
    });
  }
};

export const loginUserController = async (req, res) => {
  const { userName, passWord } = req.body;
  if (userName && passWord) {
    const response = await loginUserService({
      userName,
      passWord,
    });
    return res.json(response);
  } else {
    return res.json({
      status: "err",
      message: "userName and passWord is required",
    });
  }
};

export const getAllController = async (req, res) => {
  try {
    const response = await getAllUserService();
    return res.status(200).json({
      status: "ok",
      data: response,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refresh_token = req.headers.token.split(" ")[1];
    if (refresh_token) {
      const response = await refreshTokenService(refresh_token);
      return res.json(response);
    } else {
      return res.json({
        message: "The refresh token is valid",
      });
    }
  } catch (err) {
    return res.json({
      status: "err",
      messages: err,
    });
  }
};
