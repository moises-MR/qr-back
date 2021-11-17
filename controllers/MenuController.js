const MenuQRModel = require("../models/menuQRModel");
const ServiciosModel = require("../models/serviciosModel");


exports.createMenu = async (req,res) => {

    try {

    
        const newMenu = {
            url:req.body?.url,
            nameRestaurant:req.body?.nameRestaurant,
            imgLogo:req.file.filename
        }

        const menu = new MenuQRModel(newMenu);

        menu.save().then((result) => {
            res.json({status:200});
        }).catch((err) => {
            console.log(err);
            res.json({status:401});
        });
        
    } catch (error) {
        console.log(error);
    }

}


exports.obtenerMenu = async (req,res) => {

    const { restaurant } = req.params;

    try {
        
       await MenuQRModel.find({url:restaurant}).then((result) => {
          
            if(result.length > 0){
                res.json({status:200,menu:result});

            }else{
                res.json({status:404});

            }
        }).catch((err) => {
        res.json({status:401});
            console.log(err);
        });

        

    } catch (error) {
        console.log(error);
    }

}


exports.obtenerSevicios = async (req,res) => {

    const { restaurant } = req.params;

    try {
        
       await ServiciosModel.find({url:restaurant}).then((result) => {
         
            if(result.length > 0){
                res.json({status:200,servicios:result});

            }else{
                res.json({status:404});

            }
        }).catch((err) => {
        res.json({status:401});
            console.log(err);
        });

        

    } catch (error) {
        console.log(error);
    }

}


exports.insertPlatillo = async (req,res) => {

    try {
        // console.log(req.body);
        // console.log(req.file.filename);
        const img = req.file.filename;
        const  {url,price,title_product,description,nameService} = req.body;
        const restaurant = await ServiciosModel.find({url, nameService});

        const newServicio = {
            url,
            nameService,
            services:[
                {
                    price,
                    title_product,
                    description,
                    img
                    
                }
            ]
        }

        const insertarServicio = {
                    price,
                    title_product,
                    description,
                    img
                }
        // console.log(restaurant);

        if(restaurant.length > 0){
         

          await ServiciosModel.findOneAndUpdate(
            { url, nameService },
            { $push: { services: insertarServicio } }
          )
            .then((result) => {
              res.json({ status: 200 });
            })
            .catch((err) => {
              res.json({ status: 401 });
              console.log(err);
            });
       

        }else{
            // no existe el servicio

            const newSeccion = new ServiciosModel(newServicio);

            newSeccion.save().then((result) => {
                res.json({status:200});
            }).catch((err) => {
                res.json({status:401});
                console.log(err);
            });



        }
        // const response = await MenuQRModel.findOneAndUpdate({url},{$push:{"service" : url}})
   

    } catch (error) {
        console.log(error);
    }

}


exports.imgPortada = async (req,res) => {

   const {filename} =req.file;
   const {url} =req.body;

    try {

        await MenuQRModel.findOneAndUpdate({url},{imgPortada:filename}).then((result) => {

            res.json({status:200})
        }).catch((err) => {
            res.json({status:401})
            console.log(err);
        });
        
    } catch (error) {
        console.log(error);
    }
}