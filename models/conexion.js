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

//obtenemos un usuario por su id
Contable.getCuenta = function(id,callback)
{
    if (connection) 
    {
        var sql = 'SELECT * FROM Cuenta WHERE id = ' + connection.escape(id);
        connection.query(sql, function(error, row) 
        {
            if(error)
            {
                throw error;
            }
            else
            {

                callback(row);
            }
        });
    }
}

Contable.actualizarCuenta = function(data, callback){
  if(connection)
  {
    var sql = "UPDATE Cuenta SET `Descripcion` = "+ connection.escape(data.Descripcion) +" WHERE ID =" + connection.escape(data.id); 
/*UPDATE cuenta
SET
`Descripcion` = "servicios cobrar"
WHERE ID = 5;*/


    connection.query(sql,  function(error, rows){

      if(error)
      {
        throw error;
      }else{

        callback({"msg":"success"});

      }


    });

    
  }
}

Contable.eliminar = function(id, callback){

	if(connection)
	{
		sql = "SELECT * FROM Cuenta WHERE ID = " +connection.escape(id);
		connection.query(sql, function(error, rows){

			if(rows)
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
  	connection.query(sql, data, function(error, row){
  		if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,row);
            }

  	});
  }

};

module.exports = Contable;