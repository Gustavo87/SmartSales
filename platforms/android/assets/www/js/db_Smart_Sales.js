/**
 * 
 */
var dbSize = 20 * 1024 * 1024; //20MB
var db=null
var db_smart_sales={
	metodos: {
		crear_db: function (){
			try {
				db = window.openDatabase("DbAutoventa", "2.0", "DB_Autoventa", dbSize);
				db.transaction(db_smart_sales.metodos.crear_tablas, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
			}
			catch(err) {
			    console.log("error: "+ err.message)
			}
		},
		crear_tablas: function (tx) {
			try{
			 	tx.executeSql('CREATE TABLE IF NOT EXISTS Facturas (ID_Cliente INTEGER NOT NULL, SKU TEXT NOT NULL, Descripcion TEXT NOT NULL, Conteo INTEGER, Precio_Unitario DOUBLE, Precio_Envase DOUBLE, Familia TEXT, Exento INTEGER, Linea_Pedido TEXT, Impresa INTEGER )');
			 	tx.executeSql('CREATE TABLE IF NOT EXISTS Tipo_Pago (CODIGO INTEGER NOT NULL, DESCRIPCION TEXT NOT NULL, MONEDA TEXT, SELECCIONAR_BANCO INTEGER, SE_DEPOSITA INTEGER)')
			 	tx.executeSql('CREATE TABLE IF NOT EXISTS Bancos (CODIGO INTEGER NOT NULL, BANCO TEXT NOT NULL)')
			 	tx.executeSql('CREATE TABLE	IF NOT EXISTS BancosxRuta (Ruta TEXT, Tipo_Pago INTEGER, Moneda TEXT, Codigo_Banco INTEGER, Banco TEXT, Banco_Deposito TEXT, Banco_Deposito_Bpsc TEXT, Orgien INTEGER) ')
			 	tx.executeSql('CREATE TABLE	IF NOT EXISTS Inventario (llaveFecha TEXT, Ruta TEXT, codigoProducto TEXT, descripcionProducto TEXT, unidades INTEGER, unidadesxCaja INTEGER) ')
                tx.executeSql('CREATE TABLE	IF NOT EXISTS Productos (clienteCorporativo TEXT, codigoProducto TEXT, descripcionProducto TEXT, unidadesxCaja INTEGER, precioProducto REAL, info1 REAL, familia TEXT, info2 integer, codigoGrupo TEXT, descripcionGrupo TEXT, codigoFamilia TEXT, descripcionFamilia TEXT) ')
//			 	tx.executeSql('CREATE TABLE	IF NOT EXISTS Productos (clienteCorporativo TEXT, codigoProducto TEXT, descripcionProducto TEXT, unidadesxCaja INTEGER, precioProducto REAL, info1 REAL, familia TEXT, info2 integer) ')

			}
		   catch(err){
			   console.log("error: "+ err.message)
		   }
		},

		insertar_factura: function (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,impresa,exitoCallback,intentos) {
			   try{
				   db.transaction(function (tx) {

//		                tx.executeSql('INSERT INTO Facturas (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido) VALUES (' + ID_Cliente + ',"' + SKU + '","' + Descripcion + '",' + Conteo + ',' + Precio_Unitario + ',' + Precio_Envase + ',"' + Familia + '",' + Exento + ',"' + Linea_Pedido + '")');
                        tx.executeSql('INSERT INTO Facturas (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,Impresa) VALUES (?,?,?,?,?,?,?,?,?,?)',[ID_Cliente, SKU, Descripcion, Conteo, Precio_Unitario, Precio_Envase, Familia, Exento, Linea_Pedido, impresa]);

				   },function (error) {
						console.log("Error en Web SQL: "+error.message); logErrores.push("Error en proceso Web SQL: "+error.message);
			 	          console.log('Reintentando Insertar...'); logErrores.push('Reintentando Insertar...');
			            intentos-=1;
			            if(intentos>0){
										db_smart_sales.metodos.insertar_factura(ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,impresa,exitoCallback,intentos);
									}else{
										   var parametros=' '+ID_Cliente+' '+SKU+' '+Descripcion+' '+Conteo+' '+Precio_Unitario+' '+Precio_Envase+' '+Familia+' '+Exento+' '+Linea_Pedido;
										   //Alerta a usuario...
										   logErrores.push('No se pudo facturar el pedido '+parametros);
										   alert('No se pudo guardar la factura en el archivo oficial, solo en el archivo de respaldo. El mensaje de error es el siguiente: '+error.message);
										   persistenciaSistema();  
									}
								 }
				   , exitoCallback);
			   }
			   catch(err){
				   console.log("error: "+ err.message);
				   logErrores.push('Error en metodo insertar_factura '+err.message);
				   persistenciaSistema();
			   }
		    },
            insertar_factura_temporal: function (listaPedidos, exito, error) {
                db.transaction(function (tx) {
                $(listaPedidos).each(function(i,item){
                  tx.executeSql('INSERT INTO Facturas (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,Impresa) VALUES (?,?,?,?,?,?,?,?,?,?)',
                  [item.ID_Cliente, item.SKU, item.Descripcion, item.Conteo, item.Precio_Unitario, item.Precio_Envase, item.Familia, item.Exento, item.Linea_Factura, 0]);
                });
                    }, error, exito);
            },
			automatico: function (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido) {		  
				   try{
					   db.transaction(function (tx) {
			                tx.executeSql('INSERT INTO Facturas (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido) VALUES (' + ID_Cliente + ',"' + SKU + '","' + Descripcion + '",' + Conteo + ',' + Precio_Unitario + ',' + Precio_Envase + ',"' + Familia + '",' + Exento + ',"' + Linea_Pedido + '")');
					   },function (error) {
							alert("Error en Web SQL: "+error.message); logErrores.push("Error en proceso Web SQL: "+error.message);
							 persistenciaSistema();  
						 }
					   , function(){
						   console.log(' *********** Insertado ***********');
						   db_smart_sales.metodos.automatico(ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido);
					   });
				   }
				   catch(err){
					   console.log("error: "+ err.message);
					   logErrores.push('Error en metodo insertar_factura '+err.message);
					   persistenciaSistema();
				   }
			    },
       /*
	   insertar_factura: function (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,exitoCallback,intentos) {
		   try{
			   db.transaction(function (tx) {
	                tx.executeSql('INSERT INTO Facturas (ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido) VALUES (' + ID_Cliente + ',"' + SKU + '","' + Descripcion + '",' + Conteo + ',' + Precio_Unitario + ',' + Precio_Envase + ',"' + Familia + '",' + Exento + ',"' + Linea_Pedido + '")');
			   },function (error) {
					console.log("Error en Web SQL: "+error.message); logErrores.push("Error en proceso Web SQL: "+error.message);
		 	          console.log('Reintentando Insertar...'); logErrores.push('Reintentando Insertar...');
		            intentos-=1;
		            if(intentos>0){
									db_smart_sales.metodos.insertar_factura(ID_Cliente,SKU,Descripcion,Conteo,Precio_Unitario,Precio_Envase,Familia,Exento,Linea_Pedido,exitoCallback,intentos);
								}else{
									   var parametros=' '+ID_Cliente+' '+SKU+' '+Descripcion+' '+Conteo+' '+Precio_Unitario+' '+Precio_Envase+' '+Familia+' '+Exento+' '+Linea_Pedido;
									   //Alerta a usuario...
									   //alert('No se pudo facturar el pedido, parametros '+Descripcion);
									   logErrores.push('No se pudo facturar el pedido '+parametros);
									   alert('No se pudo guardar la factura en el archivo oficial, solo en el archivo de respaldo. El mensaje de error es el siguiente: '+error.message);
									   //Cuenta error...
									   errorFacturacion.push(1);
								}
							 }
			   , exitoCallback);
		   }
		   catch(err){
			   console.log("error: "+ err.message);
			   logErrores.push('Error en metodo insertar_factura '+err.message);
		   }
	    },
        */
	    insertar_Tipo_Pago: function (Codigo, Descripcion, Modena, seleccionar_banco, se_deposita) {
		   try{
			   db.transaction(function (tx) {
	                tx.executeSql('INSERT INTO Tipo_Pago (CODIGO, DESCRIPCION, MONEDA, SELECCIONAR_BANCO, SE_DEPOSITA) VALUES (' + Codigo + ',"' + Descripcion + '","' + Modena + '",'+ seleccionar_banco +','+ se_deposita +')');
			   }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
		   }
		   catch(err){
			   console.log("error: "+ err.message)
		   }
	    },
	    insertar_bancos: function (Codigo, Banco) {
		   try{
			   db.transaction(function (tx) {
	                tx.executeSql('INSERT INTO Bancos (CODIGO,BANCO) VALUES (' + Codigo + ',"' + Banco + '")');
			   }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
		   }
		   catch(err){
			   console.log("error: "+ err.message)
		   }
	    },
	    insertar_Bancos_X_Ruta: function(Ruta, Tipo_Pago, Moneda, Codigo_Banco,Banco, Banco_Deposito, Banco_Deposito_Bpsc, Orgien){
	    	 try{
			   db.transaction(function (tx) {
	                tx.executeSql('INSERT INTO BancosxRuta (Ruta,Tipo_Pago,Moneda,Codigo_Banco,Banco, Banco_Deposito, Banco_Deposito_Bpsc, Orgien) VALUES ("' + Ruta + '",' + Tipo_Pago + ',"' + Moneda + '",' + Codigo_Banco + ',"' + Banco + '","' + Banco_Deposito + '","' + Banco_Deposito_Bpsc + '",' + Orgien +')');

			   }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
		   }
		   catch(err){
			   console.log("error: "+ err.message)
		   }

	    },

	    Obtener_Datos_Tipo_Pago: function (opcion, Tipo_Pago ,callback) {
	    	try{
		    	db.transaction(function (tx) {
		    			var query= ""
		    			switch(opcion) {
							    case 1:
							        	query= 'SELECT * FROM Tipo_Pago'
							        break;
							    case 2:
							        	query= 'SELECT * FROM Tipo_Pago WHERE SE_DEPOSITA=1'
							        break;
							     case 3:
							        	query='SELECT SELECCIONAR_BANCO, MONEDA FROM Tipo_Pago WHERE CODIGO='+ Tipo_Pago 
							        break;
							}
	                	tx.executeSql(query, [], function (tx, resultSet) {
	                    callback(resultSet);
	                }, function (err) {false})
	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        Obtener_Bancos: function (callback) {
	    	try{
		    	db.transaction(function (tx) {
	                	tx.executeSql('SELECT * FROM Bancos', [], function (tx, resultSet) {
	                    callback(resultSet);
	                }, function (err) {false})
	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        /*
        Obtener_Datos_Facturas: function (callback) {
	    	try{
	    		
		    	db.transaction(function (tx) {
	                	tx.executeSql('SELECT * FROM Facturas', [], function (tx, resultSet) {
	                    callback(resultSet);
	                }, function (err) {false})
	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        //*/
        Obtener_Datos_Facturas: function (callback,callbackError) {
        	    	try{

        		    	db.transaction(function (tx) {
        	                	tx.executeSql('SELECT * FROM Facturas', [], function (tx, resultSet) {
        	                    callback(resultSet);
        	                }, callbackError)
        	            }, callbackError, db_smart_sales.metodos.success_db);

        	    	}
        	    	catch(err){
        	    		  console.log("error: "+ err.message)
        	    	}
                },

        obtenerFacturaxCodigo: function (codigo, callbackExito){



                                          var sql        =  "select * from facturas where Linea_Pedido like '%" + codigo + "%'";

                                          var error      = function(e){ console.log('Ocurrio un error buscando factura' + e); };
                                          var exito      = function(){ console.log('Exito buscando factura'); };

                                          db.transaction(
                                                        function (tx) {
                                                          tx.executeSql(
                                                                        sql,
                                        								[],
                                                                        function (tx, resultSet) { callbackExito(resultSet);},
                                                                        error)
                                                        },
                                                        error,
                                                        exito);

                                        }
                ,
        ExisteFacturaProductoWSQL: function (cliente, callback,callbackError) {
                                           	    	try{

                                           		    	db.transaction(function (tx) {
                                           	                	tx.executeSql("select *from Facturas where ID_Cliente = '" + cliente + "' and Familia != '1D'", [], function (tx, resultSet) {
                                           	                    callback(resultSet);
                                           	                }, callbackError)
                                           	            }, callbackError, db_smart_sales.metodos.success_db);

                                           	    	}
                                           	    	catch(err){
                                           	    		  console.log("error: "+ err.message)
                                           	    	}
                                                   },
        ExisteFacturaEnvaseWSQL: function (cliente, callback,callbackError) {
                                         	    	try{

                                         		    	db.transaction(function (tx) {
                                         	                	tx.executeSql("select *from Facturas where ID_Cliente = '" + cliente + "' and Familia = '1D'", [], function (tx, resultSet) {
                                         	                    callback(resultSet);
                                         	                }, callbackError)
                                         	            }, callbackError, db_smart_sales.metodos.success_db);

                                         	    	}
                                         	    	catch(err){
                                         	    		  console.log("error: "+ err.message)
                                         	    	}
                                                 },

        Obtener_Bancos_Por_Tipo_Pago: function (Tipo_Pago, Codigo_Banco, efectivo, callback) {
	    	try{
		    	db.transaction(function (tx) {
		    			var query='SELECT Banco, Banco_Deposito, Banco_Deposito_Bpsc FROM BancosxRuta WHERE Tipo_Pago='+ Tipo_Pago
		    			if (!efectivo){
			    			tx.executeSql('SELECT Orgien FROM BancosxRuta WHERE Tipo_Pago='+ Tipo_Pago, [], function (tx, resultado) {
			    				if(resultado.rows.length > 0){
			    					if(resultado.rows.item(0).Orgien==1){query='SELECT Banco, Banco_Deposito, Banco_Deposito_Bpsc FROM BancosxRuta WHERE Tipo_Pago='+ Tipo_Pago +' AND Codigo_Banco='+ Codigo_Banco}
									tx.executeSql(query, [], function (tx, resultSet) {
	                   	 				callback(resultSet);
	                				}, function (err) {false})
			    				}else{ callback({rows:[]});}
		                	}, function (err) {false})
		    			}else{
		    					tx.executeSql(query, [], function (tx, resultSet) {
	                   	 			callback(resultSet);
	                			}, function (err) {false})

		    			}
	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        Obtener_Banco_Deposito: function (callback,callbackerror) {
	    	try{
		    	db.transaction(function (tx) {
	                	tx.executeSql('SELECT Banco FROM BancosxRuta WHERE Tipo_Pago=1', [], function (tx, resultSet) {
	                    	callback(resultSet);
	                	}, function (err) {callbackerror(err)})
	            },db_smart_sales.metodos.error_db , db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        Obtener_moneda_por_tipo_pago: function (Tipo_Pago, abono_ , indice ,callback) {
	    	try{
		    	db.transaction(function (tx) {
	                	tx.executeSql('SELECT DESCRIPCION, MONEDA, SELECCIONAR_BANCO FROM Tipo_Pago WHERE CODIGO='+ Tipo_Pago , [], function (tx, resultSet) {
	                    callback(resultSet,abono_,indice);
	                }, function (err) {false})
	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
        },
        actualizarInventario : function (codigoProducto,unidades) {
        			   try{
        				   db.transaction(function (tx) {
        		                tx.executeSql("Update Inventario set unidades = ? where codigoProducto = ?", [unidades, codigoProducto]);
        				   },db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
        			   }
        			   catch(err){
        				   console.log("Error en la actualizacion");
        			   }
        },
        actualizarEstadoFactura : function (codigoFactura) {
        			   try{
        				   db.transaction(function (tx) {
        		                tx.executeSql("update facturas set Impresa = 1 where Linea_Pedido like '%" + codigoFactura + "%'");
        				   },function(e){console.log(e);}, function(){console.log('exito')});
        			   }
        			   catch(err){
        				   console.log("Error en la actualizacion");
        			   }
        }
        ,
        insertar_inventario : function () {
            var inicio = new Date().toString();
            //navigator.notification.activityStart("Insertando Datos de Inventario", "Por favor espere...");
            db.transaction(function (tx) {
					inventario.map((i) =>
					   {

							var inventario      		= i.split("|");
							var llavefecha	   	 		= inventario[0];
							var ruta		     		= inventario[1];
							var codigoProducto          = inventario[2];
						    var descripcionProducto     = inventario[3];
							var unidades        		= inventario[4];
							var unidadesxCaja   		= inventario[5];
							tx.executeSql("INSERT INTO INVENTARIO (llavefecha,ruta,codigoProducto,descripcionProducto,unidades,unidadesxCaja) values (?,?,?,?,?,?)", [llavefecha,ruta,codigoProducto,descripcionProducto,unidades,unidadesxCaja]);
						}
					);
                }, db_smart_sales.metodos.error_db, function () {
                    var fin = new Date().toString();
                    console.log('Inicio ' + inicio + ' Fin ' + fin);
                 //   navigator.notification.activityStop();
            });
        },
        insertar_productos : function () {
            var inicio = new Date().toString();
            console.log('Inicio xxx ' + inicio);
         //   navigator.notification.activityStart("Insertando Datos de Productos", "Por favor espere...");
            db.transaction(function (tx) {
					productos.map((p) =>
						{
							var producto 			     = p.split("|");
							var clienteCorporativo	   	 = producto[0];
							var codigoProducto		     = producto[1];
							var descripcionProducto      = producto[2];
							var unidadesxCaja     		 = producto[3];
							var precioProducto        	 = producto[4];
							var info1   				 = producto[5];
							var familia 				 = producto[6];
							var info2   				 = producto[7];
							var codigoGrupo              = producto[8];
							var descripcionGrupo         = producto[9];
							var codigoFamilia            = producto[10];
							var descripcionFamilia       = producto[11];

							tx.executeSql("INSERT INTO PRODUCTOS (clienteCorporativo,codigoProducto,descripcionProducto,unidadesxCaja,precioProducto,info1,familia,info2,codigoGrupo,descripcionGrupo,codigoFamilia,descripcionFamilia) values (?,?,?,?,?,?,?,?,?,?,?,?)", [clienteCorporativo,codigoProducto,descripcionProducto,unidadesxCaja,precioProducto,info1,familia,info2,codigoGrupo,descripcionGrupo,codigoFamilia,descripcionFamilia]);

						}
					);
                }, db_smart_sales.metodos.error_db, function () {
                    armarGruposFamiliasUI();
                    var fin = new Date().toString();
                    console.log('Inicio ' + inicio + ' Fin ' + fin);
              //      navigator.notification.activityStop();
            });
        },
	    limpiar_tabla: function (nombre_tabla) {
	    	try{
	    		db.transaction(function (tx) {
                	tx.executeSql('DELETE FROM '+ nombre_tabla +' WHERE 1');
            	}, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);
	    	}
	    	catch(err){
	    		  console.log("error: "+ err.message)
	    	}
      
        },
        ObtenerInventarioPantalla: function(indice, callback){

            try{

                	    var query;
                	    query = " Select rowid, codigoProducto, descripcionProducto, unidades, unidadesxCaja ";
                	    query = query + " from Inventario ";
						query = query + " where rowid > " + indice + " ";
						query = query + " Limit 300 ";


                		db.transaction(function (tx) {
                	          	tx.executeSql(query, [], function (tx, resultSet) {
                	                    callback(resultSet);
                	                }, function (err) {false})
                	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

                	 }
                	  catch(err){
                	    console.log("error: "+ err.message)
                    }

         }
        ,
        ObtenerInventario: function(callback){

            try{

                	    var query;
                	    query = " Select rowid, codigoProducto, descripcionProducto, unidades, unidadesxCaja ";
                	    query =query + " from Inventario  ";

                		db.transaction(function (tx) {
                	          	tx.executeSql(query, [], function (tx, resultSet) {
                	                    callback(resultSet);
                	                }, function (err) {false})
                	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

                	 }
                	  catch(err){
                	    console.log("error: "+ err.message)
                    }

         },
         buscarProductoxCodigo: function(codigoProducto, callback){

            try{

        	    var query;
        	    query = " select * ";
        	    query =query + " from productos ";
        	    query = query + " where codigoProducto = '" +codigoProducto + "' ";
        	    query = query + " and clienteCorporativo like '" + clienteCorporativo + "'  Limit 1";

        		db.transaction(function (tx) {
        	          	tx.executeSql(query, [], function (tx, resultSet) {
        	                    callback(resultSet);
        	                }, function (err) {false})
        	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

        	 }
        	  catch(err){
        	    console.log("error: "+ err.message)
            }

         },
         obtenerGruposyFamilias: function(callback){

            try{

        	    var query;
        	    query = " Select codigoGrupo, descripcionGrupo, codigoFamilia, descripcionFamilia ";
        	    query = query + "  from Productos  ";
        	    query = query + " group by codigoGrupo, descripcionGrupo, codigoFamilia, descripcionFamilia ";

        		db.transaction(function (tx) {
        	          	tx.executeSql(query, [], function (tx, resultSet) {
        	                    callback(resultSet);
        	                }, function (err) {false})
        	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

        	 }
        	  catch(err){
        	    console.log(err)
            }

         }
        ,obtenerProductos : function (familia, clienteCorp, busqueda, cantidadRegistros, callback) {
            try{


        	    var query;
        	    var filtros = "";

                console.log("Busqueda " + busqueda);

        	    if(busqueda!=""){

        	        filtros = " and ( productos.descripcionProducto like '%" + busqueda + "%' or productos.codigoProducto like '%" + busqueda + "%')";

        	    }

        	        query = " select productos.codigoProducto,productos.descripcionProducto ,ifnull(inventario.unidades, 0) AS  unidades, productos.familia ";
                    query = query + " from productos AS productos LEFT JOIN inventario AS inventario ";
                    query = query + " ON productos.codigoProducto = inventario.codigoProducto "
                    query = query + " WHERE productos.codigoFamilia " + familia + "  ";
                    query = query + " and productos.clienteCorporativo = '" + clienteCorp + "' ";
                    query = query + filtros;
                    query = query + cantidadRegistros;


        		db.transaction(function (tx) {
        	          	tx.executeSql(query, [], function (tx, resultSet) {
        	                    callback(resultSet);
        	                }, function (err) {false})
        	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

        	 }
        	  catch(err){
        	    console.log("error: "+ err.message)
            }
        },
        obtenerTodosProductos : function (familia, clienteCorp, callback) {
                    try{


                	    var query;

                	    if( familia != " in ('1D') " ){

                	        query = " select productos.codigoProducto,productos.descripcionProducto ,ifnull(inventario.unidades, 0) AS  unidades ";
                            query = query + " from productos AS productos LEFT JOIN inventario AS inventario ";
                            query = query + " ON productos.codigoProducto = inventario.codigoProducto "
                            query = query + " WHERE productos.familia " + familia + "  ";
                            query = query + " and productos.clienteCorporativo = '" + clienteCorp + "' ";
                	    }
                	    else{
                	        query = " select productos.codigoProducto,productos.descripcionProducto "
                	        query = query + " from productos ";
                	        query = query + " where familia " + familia + " and clienteCorporativo = '" + clienteCorp + "'";
                	    }

                		db.transaction(function (tx) {
                	          	tx.executeSql(query, [], function (tx, resultSet) {
                	                    callback(resultSet);
                	                }, function (err) {false})
                	            }, db_smart_sales.metodos.error_db, db_smart_sales.metodos.success_db);

                	 }
                	  catch(err){
                	    console.log("error: "+ err.message)
                    }
                }
        ,
		error_db: function (tx, error) {
		    console.log("Error en proceso Web SQL: "+ error.message);
		},
		succes_factura_insertada: function(nombre_archivo){
			try{
						db_smart_sales.metodos.Obtener_Datos_Facturas(function (item) {
							var array_aux = new Array()
		                	for (var i = 0; i < item.rows.length; i++) {
		                			var Datos_factura = {
									    ID_Cliente: item.rows.item(i).ID_Cliente,
									    SKU: item.rows.item(i).SKU,
									    Descripcion: item.rows.item(i).Descripcion,
									    Conteo: item.rows.item(i).Conteo,
									    Precio_Unitario:item.rows.item(i).Precio_Unitario,
									    Precio_Envase:item.rows.item(i).Precio_Envase,
									    Familia:item.rows.item(i).Familia,
									    Exento:item.rows.item(i).Exento,
									    Linea_Pedido:item.rows.item(i).Linea_Pedido
		                			}
		                			array_aux.push(Datos_factura)
		                		}
		                		var path = "/mnt/sdcard/autoventa/tmp/" + nombre_archivo + ".txt";
							    var temp2;
							    var writer2 = new FileWriter("/mnt/sdcard/external_sd/SER/tmp/" + nombre_archivo + ".txt");
							    var writer = new FileWriter(path);
							    temp2 = JSON.stringify(array_aux);
							   	writer.write(temp2, false);
							    writer2.write(temp2, false);
		            	})
			}catch(err){
				console.log("*** E R R O R ***");
			}
		},
		success_db: function () {
			console.log("*** E X I T O ***");
		}
	}	
}