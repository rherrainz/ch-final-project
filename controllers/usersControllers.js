import { UsersManager } from "../services/usersServices.js";

export const usersManager = new UsersManager();

export class UsersController {
  async addUser(req, res) {
    const { email, password } = req.body;
    const existeUsuario = await usersModel.find({ email, password });
    if (existeUsuario.length !== 0) {
      res.redirect("/errorRegistro");
    } else {
      await usersModel.create(req.body);
      res.redirect("/login");
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    const usuario = await usersModel.find({ email, password });
    if (usuario.length !== 0) {
      for (const key in req.body) {
        req.session[key] = req.body[key];
      }
      req.session.logged = true;
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      res.redirect("/products");
    } else {
      res.redirect("/errorLogin");
    }
  }
  async getGitHub(req, res) {
    req.session.email = req.user.email;
    req.session.logged = true;
    res.redirect("/products");
  }
  async logout(req, res) {
    req.session.destroy((error) => {
      if (error) console.log(error);
      else res.redirect("/login");
    });
  }
}
