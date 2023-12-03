const express = require("express");
const { signUpController,signInController, signOut,allUsersGetController,singleUserGetController, userRoleUpdateController,deleteUserController } = require("../controller/auth.controller");
const { IsAuthenticUser } = require("../hook/middelware");

const router = express.Router();



router.post("/signup",signUpController);
router.post("/login",signInController);
router.get('/signout', signOut)

router.get('/users',  allUsersGetController)
router.get('/user/:id',singleUserGetController)
router.put('/user-update-role/:id',IsAuthenticUser,userRoleUpdateController)
router.delete('/user-delete/:id',IsAuthenticUser,deleteUserController)

//protected User route auth
router.get("/user-auth/:id", IsAuthenticUser, (req, res) => {
    res.status(200).send({ ok: true });
  });

//   //protected Admin route auth
//   router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
//     res.status(200).send({ ok: true });
//   });
  




module.exports = router;