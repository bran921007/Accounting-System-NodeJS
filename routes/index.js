var contable = require('../models/conexion');


module.exports = function (app){

	app.get("/",function(req, res){
		//res.send("No se dice diglesica");

		contable.getCuentas(function(error, data){

			res.render("index",{
				title :"Sistema Contable",
				data: data
			});

		});

	});


	app.get("/editar/:id", function(req, res){

		var id = req.params.id;

	});	

	app.get("/eliminar/:id", function(req, res){

		var msg;
		var id = req.params.id;
		contable.eliminar(id, function(error, data){

			if(data && data.msg === "deleted" || data.msg === "notExist")
            {
                msg = " Su cuenta ha sido eliminada";
                res.send(msg, 200);
            }
            else
            {
                msg = " Hubo un error al eliminar su mensaje";
                res.send(msg, 200);
            }

		});


	});

	app.get("/agregar", function(req, res){
		res.render('agregar',{

			title: "Sistema Contable - agregar"

		});

	});

	app.post("/agregar", function(req, res){
		var Data = {
			ID: null,
			Descripcion: req.body.Description,
			TipoCuenta: req.body.TipoCuenta,
			CuentaPadre: req.body.CuentaPadre,
			Trans: req.body.Trans,
			Nivel: req.body.Nivel,
			CuentaMayor: 1,
			Balance: 0,
			Estado: "Activo"
		};

		contable.agregarCuenta(Data, function(error, data){

			var msg;

			if(data && data.insertId)
            {
            	msg = " Su cuenta ha sido agregada";
                res.send(msg, 200);
            }
            else
            {
            	msg = "Hubo un error al agregar su cuenta";
                res.send(msg, 200);
            }

		});


	});



}