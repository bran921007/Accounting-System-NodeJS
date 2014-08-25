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

	app.post("/getCuenta", function(req, res){
		var id = req.body.id;
		contable.getCuenta(id, function(data){
			res.send(data, 200);
			console.log(data);

		});
	});

	app.post("/editar", function(req, res){
		var msg;
		 
		var Data = {
			id: req.body.id,
			Descripcion: req.body.descripcion,
			TipoCuenta: req.body.tipoCuenta,
			CuentaPadre: null,
			Trans: req.body.transaccion,
			Nivel: req.body.nivel,
			CuentaMayor: req.body.cuentaMayor,
			Balance: req.body.balance,
			Estado: req.body.estado

			
		};
		contable.actualizarCuenta(Data, function(data){
			if(data)
            {
                msg = " Su cuenta ha sido Actualizada";
                res.send(msg, 200);
            }
            else
            {
                msg = " Hubo un error al actualizar Cuenta";
                res.send(msg, 200);
            }
		});

	});	

	app.post("/eliminar", function(req, res){

		var msg;
		var id = req.body.id;
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
			Descripcion: req.body.descripcion,
			TipoCuenta: req.body.tipoCuenta,
			CuentaPadre: null,
			Trans: req.body.transaccion,
			Nivel: req.body.nivel,
			CuentaMayor: req.body.cuentaMayor,
			Balance: req.body.balance,
			Estado: req.body.estado

			
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