import { Router } from "express";
//import { usersModel } from "../dao/mongoDB/models/users.model.js";
import { UsersController } from "../controllers/usersControllers.js";
import passport from "passport";
import { uploader } from "../utils.js";

const router = Router();
const usersController = new UsersController();

router.get('/', usersController.getAllUsers);

router.delete('/', usersController.deleteUnactiveUsers);

router.post("/registro", usersController.addUser);

router.post("/login", usersController.login);

router.put('/premium/:uid', usersController.changeRole);

router.get(
  "/registroGitHub",
  passport.authenticate("githubRegistro", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("githubRegistro", { failureRedirect: "/errorLogin" }),
  usersController.getGitHub
);

router.get("/logout", usersController.logout);

router.post('/premium/:uid/document', uploader.fields([
  {name: 'profileImage'},
  {name: 'productImage'},
  {name: 'document'},
  {name: 'identification'},
  {name: 'address'},
  {name: 'account'}
], usersController.documentUploader));

export default router;
