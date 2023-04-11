import { Router } from "express";
import { usersModel } from "../dao/mongoDB/models/users.model.js";
import { UsersController } from "../../controllers/usersControllers.js";
import passport from "passport";

const router = Router();
const usersController = new UsersController();

router.post("/registro", usersController.addUser());

router.post("/login", usersController.login());

//registro con github
router.get(
  "/registroGitHub",
  passport.authenticate("githubRegistro", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("githubRegistro", { failureRedirect: "/errorLogin" }),
  usersController.getGitHub()
);

router.get("/logout", usersController.logout());

export default router;
