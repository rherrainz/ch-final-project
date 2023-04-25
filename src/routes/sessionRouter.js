import { Router } from "express";

const router = Router();

router.get("/current", (req, res) => {
    if (req.session.passport){
        const auth = req.session.auth;
        res.send(`Usuario autenticado mediante ${auth}`)

    }else{
        res.send("No hay usuario autenticado")
    }

});

export default router;