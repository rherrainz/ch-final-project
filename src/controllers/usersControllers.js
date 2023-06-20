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
  async changeRole(req, res) {
    const { uid } = req.params;
    const role = req.body;
    try{
      const user = await usersManager.updateUser(uid, role);
      res.json({message: "Role changed successfully", data: user});
    }catch(error){
      return error;
    }
  }
  
  async logout(req, res) {
    req.session.destroy((error) => {
      if (error) console.log(error);
      else res.redirect("/login");
    });
  }

  async documentUploader(req, res) {
    const { uid } = req.params;
    const { name, reference } = req.files;
    try{
      const user = await usersManager.getUserById(uid);
      const requiredDocuments = ['identification', 'adress', 'account'];
      if(requiredDocuments.length!== user.documents.length){
        res.json({message: "You must upload all the required documents"});
      }else{
        const updatedUser = await usersManager.updateUser(uid, role);
        res.json({message: "Documents uploaded successfully", data: updatedUser});
      }
    }catch(error){
      return error;
    }
  }
}
