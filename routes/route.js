const express = require("express");
const router = express.Router();
const multer = require("multer");
const MenuController = require("../controllers/MenuController");
const shortid = require("shortid");


const storage = multer.diskStorage({
    destination:(req,res,next) => {
  
     next(null,__dirname+"../../uploads");
 },
 filename: (req,file,next) => {
     const extension = file.mimetype.split("/")[1];
     next(null,`${shortid.generate()}.${extension}`);
 }
});


const upload = multer({storage});



module.exports = () => {


    router.post("/create_menu",upload.single("img"),MenuController.createMenu);
    router.put("/img_portada",upload.single("imgPortada"),MenuController.imgPortada);
    router.get("/obtener_menu/:restaurant",MenuController.obtenerMenu);
    router.get("/obtener_servicios/:restaurant",MenuController.obtenerSevicios);
    router.put("/insert_platillo",upload.single("img"),MenuController.insertPlatillo);
    return router
}