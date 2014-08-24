var mysql = require('mysql');

connection = mysql.createConnection(

		{
			host:"localhost",
			user: "root",
			password: "123456",
			database: "erpito"
		}

	);

var Contable ={};

Contable.getCuentas = function(callback){

	if(connection)
	{
		sql = "SELECT * FROM Cuenta";
		connection.query(sql, function(error, rows){
			if(error)
			{
				throw error;
			}
			else{
				callback(null, rows);
			}

		});
	};

}

Contable.eliminar = function(id, callback){

	if(connection)
	{
		sql = "SELECT * FROM Cuenta WHERE ID = " +connection.escape(id);
		connection.query(sql, function(error, rows){

			if(row)
            {
                var sql = 'DELETE FROM Cuenta WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }

		});
	}

}

Contable.agregarCuenta = function(data, callback){
  if(connection)
  {
  	sql = "INSERT INTO Cuenta SET ?"
  	connection.query(sql, data, function(error, callback){
  		if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }

  	});
  }

};

module.exports = Contable;