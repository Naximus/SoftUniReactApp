const { SECRET } = require("../constants");
const jwt = require("../libs/jsonwebtoken");
const userService = require("../services/userService");
const mongoose = require("mongoose");

exports.authentication = () => async (req, res, next) => {
  const token = req.header("X-Authorization");
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);

      //  Check if token has expired
      const expires = new Date(decodedToken.expires);
      const now = new Date();
      if (expires < now) {
        throw new Error("Token has expired");
      }

      // Check if user exists and is active
      // In case of an inactive user with an unexpired token, who tries to access the app
      if (!decodedToken._id) {
        throw new Error("Not authenticated");
      }
      const user = await userService.getById(decodedToken._id);

      if (!user.active) {
        throw new Error("Inactive user");
      }

      req.user = decodedToken;
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  }

  next();
};

// exports.isAuth = (req, res, next) => {
//   if (!req.user) {
//     //    return res.redirect('/home/404');
//   }

//   next();
// };

exports.authorization = () => (req, res, next) => {
  const endpoint = "/" + req.path.toString().split("/")[1];

  if (req.settings && !req.settings.setupIsComplete) {
    return next();
  }

  if (
    req.settings &&
    (req.settings.guestsAllowedPaths.includes(endpoint) ||
      req.settings.guestsAllowedPaths.includes(req.path))
  ) {
    return next();
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // EXCEPTION - isOwnProfile
  if (isOwnProfile(req)) {
    return next();
  }
  
  
  
  // destruct endpoint
  const pathElements = req.path.toString().split("/").filter(Boolean);
  // replace ids with ":id" placeholder
  for (let i = 1; i <= pathElements.length; i+=2) {
    if (mongoose.Types.ObjectId.isValid(pathElements[i])) {
      pathElements[i] = ":id";
    }
  }
  
  // TODO: add method checks
  const allowedPaths = req.settings[`${req.user.type}sAllowedPaths`]
  
  // console.log(
  //   "--->",
  //   allowedPaths.includes(`/${pathElements.join("/")}`),
  //   allowedPaths,
  //   );
    
  // compare path to allowedPaths
  if (
    !allowedPaths ||
    (
      !allowedPaths.includes("*") &&
      !allowedPaths.includes(`/${pathElements.join("/")}`)
    )
  ) {
    console.log("tuk: ", req.user.allowedPaths, pathElements);
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

function isOwnProfile(req) {
  const endpoint = "/" + req.path.toString().split("/")[1];

  if (
    endpoint === "/managers" ||
    endpoint === "/trainers" ||
    endpoint === "/users"
  ) {
    const pathId = req.path.split("/")[2];

    if (
      `/${req.user.type}s` === endpoint &&
      pathId !== "" &&
      pathId === req.user._id
    ) {
      true;
    }
  }
  return false;
}

const isTrainer = (req) => {
  if (!req.user) {
    return false;
  }

  if (!req.user.type) {
    return false;
  }

  if (req.user.type !== "trainer") {
    return false;
  }

  return true;
};

const isManager = (req) => {
  if (!req.user) {
    return false;
  }

  if (!req.user.type) {
    return false;
  }

  if (req.user.type !== "manager") {
    return false;
  }

  return true;
};
