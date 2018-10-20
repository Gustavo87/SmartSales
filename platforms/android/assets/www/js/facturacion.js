function aplicarFacturadePedidos(cliente, tipoFactura){

	//Parche para correlativo no numerico...
	if(isNaN(Number(correlativo))){
        alert("Ocurrio un error, por favor, intente facturar nuevamente. Si el problema continua cierra y vuelva a abrir la aplicación");
        return;
	}

    if(ImpresoraEnUso){
        desbloquearFacturacion();
        alert("En este momento la impresora está en uso, favor espere unos segundos y vuelva a intentar");
         return;
    }

	facturarPedidos(cliente, tipoFactura);

}

function insertar_factura_arreglo(listaPedidos){
  $(listaPedidos).each(function(i,item){

    var sku        = [ item.ID_Cliente, item.SKU,  item.Descripcion, item.Conteo, item.Precio_Unitario,  item.Precio_Envase, item.Familia, item.Exento ];
    var facturatmp = new Array(sku, item.Linea_Factura);
    var impresa    = 0;
    facturas.push(facturatmp);
  });
}

function confirmaExistenciaProductoEnInventario(sku, cantidad) {
    var encontrado = false;
    for ( j = 0; j < inventario.length; j++) {
	        var tmpInv = inventario[j].split("|");
	        var tmp1 = tmpInv[2].toString();
	        if (tmp1.toUpperCase() == sku) {
	            encontrado = true;
	            if (cantidad <= Number(tmpInv[4])) {
	                return '';
	            } else {
	                return "Producto [" + tmpInv[3] + "] no posee suficiente inventario, su inventario es: " + tmpInv[4] + " unidades.";
	            }
	        }
    }
    if (!encontrado) {
        var tmpprod = buscadatosProducto(clienteCorporativo, sku);
        return "El producto [" + tmpprod[2] + "] no fue cargado en su inventario inicial";
    }

}

function obtenerFactura(cliente, esEnvase, callbackExito){

  var sqlLiquido = "select * from Facturas where ID_Cliente = ? and Familia != ? ";
  var sqlEnvase  = "select * from Facturas where ID_Cliente = ? and Familia  = ? ";
  var sql        =  esEnvase ? sqlEnvase : sqlLiquido;

  var error      = function(){ console.log('Ocurrio un error buscando factura'); };
  var exito      = function(){ console.log('Exito buscando factura'); };

  db.transaction(
                function (tx) {
                  tx.executeSql(
                                sql,
                                [clienteenuso, '1D'],
                                function (tx, resultSet) { callbackExito(resultSet);},
                                error)
                },
                error,
                exito);

}

function imprimirCopiaFactura(tipoFactura){

    if(ImpresoraEnUso){
        desbloquearFacturacion();
        alert("En este momento la impresora está en uso, favor espere unos segundos y vuelva a intentar");
    } else{
        var esEnvase = tipoFactura == 'envase' ? true : false;
        obtenerFactura(clienteenuso,  esEnvase, function(factura){

              // Existe factura
              var existeFactura = factura.rows.length > 0;
              if(existeFactura){
                      imprimirFactura(factura,"COPIA",esEnvase,function(){
                      desbloquearFacturacion();
                      console.log("Impreso exito copia");
                      },function(error){
                                desbloquearFacturacion();
                                console.log("Impreso error copia");

                            });
              }
              else{
                alert('Este cliente no tiene factura de ' + tipoFactura + ' registrada.');
                desbloquearFacturacion();
              }

        },function(error){
        desbloquearFacturacion();
        console.log(error);
        });
    }
}

function facturarPedidos(cliente, tipoFactura){

var esEnvase = tipoFactura == 'envase' ? true : false;
obtenerFactura(cliente,  esEnvase, function(factura){

  // Existe factura
  var existeFactura = factura.rows.length > 0;
  if(existeFactura){
    // Existe Documento original (Se imprimió)
    var existeOriginal = factura.rows.item(0).Impresa == 1;
    console.log(factura.rows.item(0).Impresa);
    if(existeOriginal){
      // REIMPRESION
      alert('Este cliente ya posee factura de ' + tipoFactura + '!');
      imprimirFactura(factura,"REIMPRESION",esEnvase,function(){
      console.log("Impreso exito reimpresion");
			desbloquearFacturacion();
      },function(){
				console.log("Impreso error");
				desbloquearFacturacion();
			});
    }
    else{
    // No existe Documento original (no Se imprimió)
    // RECUPERAMOS IMPRESION
     imprimirFactura(factura,"ORIGINAL",esEnvase,function(){
     console.log("Impreso exito original");
     db_smart_sales.metodos.actualizarEstadoFactura(factura.rows.item(0).Linea_Pedido.split("|")[8]);
     // Sacamos las copias...
       alert("Impresa Factura Original. Imprimir Copia 1?");
       imprimirFactura(factura,"COPIA # 1",esEnvase,function(){
          console.log("Impreso exito copia# 1");

          alert("Impresa Factura Original. Imprimir Copia 2?");
          imprimirFactura(factura,"COPIA # 2",esEnvase,function(){
             desbloquearFacturacion();
             console.log("Impreso exito copia# 2");

          },function(){
          desbloquearFacturacion();
          console.log("Impreso error copia# 2");
          });
       },function(){
       desbloquearFacturacion();
       console.log("Impreso error copia# 1");
       });
       // Fin copias
     },function(){
			 console.log("Impreso error");
			 desbloquearFacturacion();
		 });
    }
  }else{

   var confirma_factura= window.confirm("Esta seguro que desea facturar el " + tipoFactura + " al cliente "+ cliente +"?");
   if(confirma_factura){

        // FACTURAMOS
        // Aplanamos el arreglo Pedidos
        var listaPedidosEnvase            = [];
        var listaPedidosLiquido           = [];
        var totalPedidosEnvase            = 0;
        var totalPedidosLiquido           = 0;
        var inventarioInsuficienteEnvase  = false;
        var inventarioInsuficienteLiquido = false;
        var inventarioInsuficiente		  = false;
        var noHayPedidos                  = false;
        var listaPedidos				  = [];
        var totalPedidos				  = 0;
        var msgSinInventario              = '';
        var msgnoHayPedidos               = '';
        var msgCreditoExcedido            = '';
        var factSubtotalLiquido           = 0.00;
        var factIvaLiquido                = 0.00;
        var factTotalLiquido              = 0.00;
        var factSubtotalEnvase            = 0.00;
        var factIvaEnvase                 = 0.00;
        var factTotalEnvase               = 0.00;
        var factSubtotal                  = 0.00;
        var factIva                       = 0.00;
        var factTotal                     = 0.00;
        var FC                            = '';

        $(pedidos).each(function(i,item){
            var obj             = {};
            obj.ID_Cliente      = item[0][0];
            obj.SKU             = item[0][1];
            obj.Descripcion     = item[0][2];
            obj.Conteo          = item[0][3];
            obj.Precio_Unitario = item[0][4];
            obj.Precio_Envase   = item[0][5];
            obj.Familia         = item[0][6];
            obj.Exento          = item[0][7];
            obj.Linea_Pedido    = item[1];
            obj.Linea_Factura   = "";
            var monto           = obj.Linea_Pedido.split("|")[4];
            var unidades        = obj.Linea_Pedido.split("|")[2];

            if(obj.ID_Cliente == clienteenuso){
              if(obj.Familia == '1D'){

                  var numFactura      = ruta + "-" + creacorrelativo(correlativo);
                  var lineaFactura    = obj.Linea_Pedido;
                  lineaFactura       += "|" + numFactura + "|" + fechasistema() + " " + horasistema();
                  lineaFactura       += "|" + (buscadatosCliente(clienteenuso)[2] == "CONTADO"?"1":"0");
                  if(FCEnvase != ""){ lineaFactura     += "|" +  FCEnvase }
                  obj.Linea_Factura   = lineaFactura;
                  totalPedidosEnvase += Number(monto);
                  factSubtotalEnvase  = (Number(factSubtotalEnvase) + Number(obj.Linea_Pedido.split("|")[3])).toFixed(2);
                  factIvaEnvase       = (Number(factIvaEnvase) + Number(obj.Linea_Pedido.split("|")[5])).toFixed(2);
                  factTotalEnvase     = (Number(factIvaEnvase) + Number(factSubtotalEnvase)).toFixed(2);
                  listaPedidosEnvase.push(obj);
              }else{

                var Inventario = false; msgSinInventario
                Inventario     = confirmaExistenciaProductoEnInventario(obj.SKU, unidades);

                if (Inventario != '') {
                  inventarioInsuficienteLiquido = true;
                  msgSinInventario             += Inventario + '\n';
                }
                else{

                  var numFactura    = ruta + "-" + creacorrelativo(correlativo);
                  var lineaFactura  = obj.Linea_Pedido;
                  lineaFactura     += "|" + numFactura + "|" + fechasistema() + " " + horasistema();
                  lineaFactura     += "|" + (buscadatosCliente(clienteenuso)[2] == "CONTADO"?"1":"0");
                  if(FCLiquido != ""){ lineaFactura     += "|" +  FCLiquido }
                  obj.Linea_Factura = lineaFactura;
                  totalPedidosLiquido += Number(monto);
                  factSubtotalLiquido  = (Number(factSubtotalLiquido) + Number(obj.Linea_Pedido.split("|")[3])).toFixed(2);
                  factIvaLiquido       = (Number(factIvaLiquido) + Number(obj.Linea_Pedido.split("|")[5])).toFixed(2);
                  factTotalLiquido     = (Number(factIvaLiquido) + Number(factSubtotalLiquido)).toFixed(2);
                  listaPedidosLiquido.push(obj);
                }

              }
            }
        });

        if(esEnvase){
            listaPedidos			 = listaPedidosEnvase;
            totalPedidos			 = totalPedidosEnvase;
            inventarioInsuficiente   = inventarioInsuficienteEnvase;
            factSubtotal             = factSubtotalEnvase;
            factIva                  = factIvaEnvase;
            factTotal                = factTotalEnvase;
            FC                       = FCEnvase;
        }
        else{
            listaPedidos			 = listaPedidosLiquido;
            totalPedidos			 = totalPedidosLiquido;
            inventarioInsuficiente   = inventarioInsuficienteLiquido;
            factSubtotal             = factSubtotalLiquido;
            factIva                  = factIvaLiquido;
            factTotal                = factTotalLiquido;
            FC                       =  FCLiquido
        }


        var clienteEsCredito        = buscadatosCliente(clienteenuso)[2] != 'CONTADO';
        var limiteCreditoExcedido   = false;

        if(clienteEsCredito){
          var saldoCli=CalcularSaldoCliente();
          saldoCli.done(function(saldo){
               if(saldo-totalPedidos<0){
                   esEnvase ? limiteExcedidoEnv = 1 : limiteExcedido = 1;
                   limiteCreditoExcedido        = true;
                   msgCreditoExcedido           = '\nEsta factura excede el crédito disponible.\nSaldo Actual: C$'+formatoDinero(saldo)+ '\n';
               }
               else{
                   esEnvase ? limiteExcedidoEnv = 0 : limiteExcedido = 0;
               }
          });
          saldoCli.fail(function(mensajeError){
              limiteCreditoExcedido = true;
              alert(mensajeError);
           });

        }

        console.log(totalPedidos);
        noHayPedidos = listaPedidos.length == 0;

        if( inventarioInsuficiente || limiteCreditoExcedido || noHayPedidos ){
          desbloquearFacturacion();
          msgnoHayPedidos =  noHayPedidos ? '\nDebe de ingresar al menos una linea para facturar!\n' : '';
          if(msgSinInventario!= ''){
            alert(msgSinInventario + msgnoHayPedidos + msgCreditoExcedido + '\nPara poder facturar elimine este producto(s) del pedido.');
          }
          else{
            alert(msgSinInventario + msgnoHayPedidos + msgCreditoExcedido + '\nNo puede continuar con la facturación');
          }

        }
        else{

          insertar_factura_arreglo(listaPedidos);

          if(validarExisteFacturaArreglo(ruta + "-" + creacorrelativo(correlativo))){

              db_smart_sales.metodos.insertar_factura_temporal(listaPedidos, function(){console.log('Exito en factura');

                // Descargamos del inventario los items facturados
                $(listaPedidos).each(function(i,item){
                      var unidades = item.Linea_Pedido.split("|")[2];
                      descargaInventario(item.SKU, unidades);
                });

                var codigodeFactura = ruta + "-" + creacorrelativo(correlativo);
               //******* Si la factura se insertó correctamente en WebSQL, hacemos lo siguiente:
                 // Se crea el archivo de respaldo de la tabla de factura de web sql
                   db_smart_sales.metodos.succes_factura_insertada("facturas_web_sql");
                 // Agrega el documento pendiente a la lista de documentos pendientes
                   var tmpDocpendiente = "" + codigodeFactura + "|" + clienteenuso + "|" + fechasistema() + "|" + Number(factTotal).toFixed(2) + "|" + Number(factTotal).toFixed(2) + "|" + (buscadatosCliente(clienteenuso)[2] == "CONTADO"?"1":"0")+ "|" + Number(factTotal).toFixed(2);
                     if(FC != ""){ tmpDocpendiente += "|"+  FC }
                     docspendientes.unshift(tmpDocpendiente);



                 // Se incrementa el numero de correlativo y se guarda automaticamente
                    correlativo++;
                    grabatmp("6", correlativo);
                 // Si el cliente es de Contado Bloqueamos la app en pantalla de Pago
                 if (buscadatosCliente(clienteenuso)[2] == "CONTADO") {
                    $("#btnInfoClientePagos").hide();
                    pagoBloqueado = 1;
                    }

                // Aplicamos estos cambios en la UI
                $("#btnAtras").hide();
                marcaDocpendientes();
                obtenerSaldoActual();
                if(esEnvase == false){
                  ocultarProductosEncontrados();
                }
               //**************************************
               // Buscamos la factura insertada...
               db_smart_sales.metodos.obtenerFacturaxCodigo(codigodeFactura, function(factura){
                 imprimirFactura(factura,"ORIGINAL",esEnvase,function(){
                 console.log("Impreso exito original");

                 db_smart_sales.metodos.actualizarEstadoFactura(factura.rows.item(0).Linea_Pedido.split("|")[8]);
                 // Sacamos las copias...
                   alert("Impresa Factura Original. Imprimir Copia 1?");
                   imprimirFactura(factura,"COPIA # 1",esEnvase,function(){
                      console.log("Impreso exito copia# 1");

                      alert("Impresa Factura Original. Imprimir Copia 2?");
                      imprimirFactura(factura,"COPIA # 2",esEnvase,function(){
                             desbloquearFacturacion();
                             console.log("Impreso exito copia# 2");

                          },function(){
                          desbloquearFacturacion();
                          console.log("Impreso error copia# 2");
                          });
                   },function(){
                   desbloquearFacturacion();
                   console.log("Impreso error copia# 1");
                   });
                   // Fin copias
                 },function(){
                 desbloquearFacturacion();
                 console.log("Impreso error original");
                 });
               });


              },function(error){
                        console.log('Error' + error );
                         desbloquearFacturacion();
                    });

          }else{

            alert('Ocurrió un error insertando la factura, por favor, intente nuevamente');
            var opcionesF = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            var FechaAFor = new Date();
            var StringFec = new Date(Number(FechaAFor.getTime())).toLocaleDateString('es-ES', opcionesF);
            var linError = ":::ERROR INSERTANDO FACTURA EN ARREGLO:::" + StringFec + " Codigo Factura: " + ruta + "-" + creacorrelativo(correlativo);
            LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + linError + "*";
            desbloquearFacturacion();

          }

        }

   }
   else{
        desbloquearFacturacion();
   }

  }

});

}

function imprimirFactura(objFactura, tipoDocumento, esEnvase, exito, error){

  // Transformamos el objeto a un array, para poder usar map y reduce
  var filas      = $.map(objFactura.rows,(value,index)=>{return [value]});
  // Nos quedamos con los totales por pedido
  var Array_iva  = filas.map((n)=>{return n.Linea_Pedido.split("|")[5];});
  // Nos quedamos con los iva por pedido
  var Array_pre  = filas.map((n)=>{return n.Linea_Pedido.split("|")[3];});
  // Sumamos todos los iva
  var iva        = Array_iva.reduce((acum,n)=>{ return acum + parseFloat(n); }, 0 );
  // Sumamos todos los totales
  var subtotal   = Array_pre.reduce((acum,n)=>{ return acum + parseFloat(n); }, 0 );
  // Dejamos solo 2 decimales
  iva            = iva.toFixed(2);
  subtotal       = subtotal.toFixed(2);

  // Armamos el detalle de la factura
  var detalleFactura = filas.map((i) =>
                    {
                      var precio =   parseFloat(i.Linea_Pedido.split("|")[3])
                             / parseFloat(i.Linea_Pedido.split("|")[2]);
                      precio     = precio.toFixed(4);

                      return[
                            i.SKU,
                            i.Descripcion,
                            i.Linea_Pedido.split("|")[0],
                            i.Linea_Pedido.split("|")[1],
                            precio,
                            parseFloat(i.Linea_Pedido.split("|")[3]).toFixed(2),
                            null
                         ];
                    }
                  );
    console.log(objFactura.rows);
    console.log(JSON.stringify(objFactura));
    // Armamos la cabecera de la factura
  	var tipoImpresion     = tipoDocumento;
  	var factura           = "FACTURA";
  	var cliente           = clienteenuso;
  	var dato3             = buscadatosCliente(clienteenuso)[3];
  	var codFac            = objFactura.rows.item(0).Linea_Pedido.split("|")[8];
  	var nombcl            = buscadatosCliente(clienteenuso)[1];
  	var rut               = ruta;
  	var fech              = formatofecha(objFactura.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[0]);
  	var nulo1             = null;
  	var hora     	 =      objFactura.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[1];
  	var factNumPedid      = (objFactura.rows.item(0).Linea_Pedido.split("|")[7] != "") ? objFactura.rows.item(0).Linea_Pedido.split("|")[7] : numpedido;
  	var tipocli  	 =      buscadatosCliente(clienteenuso)[2];
  	var subtotalfac       = subtotal;
  	var ivafac            = iva;
  	var total             = Number(subtotalfac) + Number(ivafac);
  	var nulo2             = null;
  	var nulo3             = null;
  	var FCLIQ             = objFactura.rows.item(0).Linea_Pedido.split("|")[11];

    var EncabezadoFactura = [tipoImpresion,
            factura,
            cliente,
            dato3,
            codFac,
            nombcl,
            rut,
            fech,
            nulo1,
            hora,
            factNumPedid,
            tipocli,
            subtotalfac,
            ivafac,
            total.toFixed(2),
            nulo2,
            nulo3,
            FCLIQ
            ];
    var objetodata =dataFactura(EncabezadoFactura, detalleFactura);

    ejecutarImpresionFactura(objetodata, esEnvase, exito, error);

}

function dataFactura(encabezadoFact, detalleFact) {

  Facturacion.tipoBoucher = "FACTURACION";
  //Define el tipo de impresora...
  Facturacion.impresoraEnUso=nombreImpresoraConectada;
  Facturacion.tipoImpresion = encabezadoFact[0];      //tipoImpresion Esto es si se va imprimir Original o Reimpresion o Copias
  Facturacion.tituloFactura = encabezadoFact[1];      //tituloFactura
  Facturacion.codigoCliente = encabezadoFact[2];      //codigoCliente
  Facturacion.factNumero = encabezadoFact[3];         //factNumero esto hace referencia al numero de la factura aplica para devolucion para cambio y factura poner null
  													  //En este campo Recibiremos el numero RUC del CLIENTE
  Facturacion.numeroFactura = encabezadoFact[4];      //numeroFactura el numero tanto para Factura, Cambio y Devolucion
  Facturacion.cliente = encabezadoFact[5];            //cliente nombre del cliente
  Facturacion.ruta = encabezadoFact[6];               //ruta
  Facturacion.fecha = encabezadoFact[7];              //fecha esta fecha es la fecha en que se emite la Factura, Cambio o Devolucion
  Facturacion.fechaFact = encabezadoFact[8];          //fechaFact esta es la fecha que hace referencia a la factura esto aplica para devolucion para cambio y factura poner null
  Facturacion.hora = encabezadoFact[9];               //hora
  Facturacion.pedido = encabezadoFact[10];            //pedido este es el numero de pedido solo aplica para factura para cambio y devolucion poner null
  Facturacion.tipoFacturacion = encabezadoFact[11];   //tipoFacturacion esto es si se va imprimir contado o credito info del cliente
  Facturacion.subTotal = encabezadoFact[12];          //subTotal este aplica solo para Factura para los demas poner null
  Facturacion.IVA = encabezadoFact[13];               //IVA este aplica solo para Factura para los demas poner null
  Facturacion.total = encabezadoFact[14];             //total este aplica solo para Factura para los demas poner null
  Facturacion.montoOriginal = encabezadoFact[15];     //para devoluciones si es factura o cambio null
  Facturacion.saldo = encabezadoFact[16];             //para devoluciones si es factura o cambio null
  Facturacion.rucCliente = encabezadoFact[3];         //para todos
  Facturacion.facturaManual = encabezadoFact[17];     //Numero de Factura Manual
  Facturacion.noCopia = 0;                             //Numero de Copia

//  Facturacion.porcentajeCentralizacion = Number(ObtenerPorcentajeCentralizacion(encabezadoFact[2]));
  var PorcentajeC = ObtenerPorcentajeCentralizacion(encabezadoFact[2]);
  PorcentajeC = PorcentajeC == undefined ? 0 : PorcentajeC ;
  Facturacion.porcentajeCentralizacion = Number(PorcentajeC );


  Facturacion.copias = 0;

  var detalleLineasFacturacion = new Array();

	$.each(detalleFact, function (indice, valor) {
		detalleLineasFacturacion[indice] = {
			codigoProducto: valor[0],                 //codigoProducto aplica para todos Factura, Cambio y Devolucion
			producto: valor[1],                       //producto aplica para todos Factura, Cambio y Devolucion
			CAJ: valor[2],                            //CAJ aplica para todos Factura, Cambio y Devolucion
			BOT: valor[3],                            //BOT aplica para todos Factura, Cambio y Devolucion
			PBOT: valor[4],                           //PBOT aplica para Factura para Cambio y Devolucion poner null
			total: valor[5],                          //total aplica para Factura para Cambio y Devolucion poner null
			motivoCambio: valor[6]                    //motivoCambio aplica para Cambio para Factura y Devolucion poner null
		};
	});

	Facturacion.detalleFactura = detalleLineasFacturacion;
	console.log(JSON.stringify(Facturacion));

  return Facturacion;

}

function ejecutarImpresionFactura(factura, esEnvase, exito, error){
  if( ImpresoraEnUso == false ){
    bloquearImpresion();
    BluetoothPlugin.write(
                         function(plantilla){
                           ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,
                                                                    plantilla,
                                                                    nombreImpresoraConectada,
                                                                   function(){
                                                                    desbloquearImpresion();
                                                                    console.log('Impresión exitosa');
                                                                    registrarDocImpreso(factura, esEnvase);
                                                                    exito();

                                                                   },
                                                                   function(e){
                                                                    desbloquearImpresion();
                                                                    console.log('Error imprimiendo:' + e );
                                                                    alert(e);
                                                                    error();
                                                                    RegistrarLogErrorImpresion(factura, e);
                                                                   });
                         },
                         function(error) {
                            desbloquearImpresion();
                            desbloquearFacturacion();
                            console.log('Error armando plantilla ' + error);
                            alert(error);
                         },
                         g_socketid,
                         factura
                         );
  }
  else{
      alert("En este momento la impresora está en uso, favor espere unos segundos y vuelva a intentar");
  }

}





function registrarDocImpreso(fact, esEnvase){

  var docimp = fact.ruta + "|FACTURA|" + fact.tipoImpresion + "|" + fact.numeroFactura + "|" + fact.codigoCliente + "|" + fechasistema() + "|" + horasistema();
  docsimpresos.push(docimp);
  if(fact.tipoImpresion == "ORIGINAL"){
                var factImp =   fact.tipoImpresion                                       + "|" +
				  			    fact.tituloFactura                                       + "|" +
				  			    fact.codigoCliente                                       + "|" +
				  			    fact.factNumero 		                                 + "|" +
				  			    fact.numeroFactura                                       + "|" +
				  			    fact.cliente                                             + "|" +
				  			    fact.ruta                                                + "|" +
				  			    fact.fecha                                               + "|" +
                                convertirNuloaVacio(fact.fechaFact)                      + "|" +
				  			    fact.hora                                                + "|" +
				  			    fact.pedido                                              + "|" +
				  			    fact.tipoFacturacion                                     + "|" +
				  			    fact.subTotal                                            + "|" +
				  			    fact.IVA                                                 + "|" +
				  			    fact.total                                               + "|" +
                                convertirNuloaVacio(fact.montoOriginal)                  + "|" +
                                convertirNuloaVacio(fact.saldo)                          + "|" +
                                convertirNuloaVacio(fact.facturaManual)                  + "|" +
                                convertirAString(esEnvase);
    facturasimpresas.push(factImp);
  }
    persistenciaSistema();
}

function convertirAString(esEnvase){
  return (esEnvase ? "ENV" : "PROD");
}

function convertirNuloaVacio(valor){

  return ( valor == null ? '' : valor )

}

function RegistrarLogErrorImpresion(fact, error){


    // Registramos en el Log de error
    var Documento  = fact.tipoBoucher;
    var Tipo       = fact.tipoImpresion;
    var IDFact     = fact.numeroFactura;
    var ErrorDeta  = error;
    var FechaHora  = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
    var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
    LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
    persistenciaSistema();
}

function bloquearImpresion(){

    // Bloqueamos la impresora
    ImpresoraEnUso = true;
    navigator.notification.activityStart("Imprimiendo documento", "Por favor espere que termine el proceso de impresión");

}

function desbloquearImpresion(){

	// Desbloqueamos la impresora
	ImpresoraEnUso = false;
	navigator.notification.activityStop();

}

function bloquearFacturacion(){
  // Ocultamos los botones de facturación
  $("#facturaProducto").hide();
  $("#facturaEnvase").hide();
  // Ocultamos los botones de copias
  $("#copiaFacturaProducto").hide();
  $("#copiaFacturaEnvase").hide();
  // Ocultamos los botones de Doc de Entrega
  $("#imprimeDocEntrega").hide();
  $("#imprimeDocEntregaEnvase").hide();
  var btnEnvase                    = document.getElementById("facturaEnvase");
  btnEnvase.onclick                = null;
  var btnLiquido                   = document.getElementById("facturaProducto");
  btnLiquido.onclick               = null;
  var btnCopiaEnvase               = document.getElementById("copiaFacturaEnvase");
  btnCopiaEnvase.onclick           = null;
  var btnCopiaLiquido              = document.getElementById("copiaFacturaProducto");
  btnCopiaLiquido.onclick          = null;
  var btnDocEntregaEnvase          = document.getElementById("imprimeDocEntregaEnvase");
  btnDocEntregaEnvase.onclick      = null;
  var btnDocEntregaLiquido         = document.getElementById("imprimeDocEntrega");
  btnDocEntregaLiquido.onclick     = null;


}

function desbloquearFacturacion(){
  // Mostramos los botones de facturación
  $("#facturaProducto").show();
  $("#facturaEnvase").show();
  // Mostramos los botones de copias
  $("#copiaFacturaProducto").show();
  $("#copiaFacturaEnvase").show();
  // Mostramos los botones de Doc de Entrega
    MuestraDocEntrega();

    var btnEnvase                    = document.getElementById("facturaEnvase");
    btnEnvase.onclick                = function(){
                                           bloquearFacturacion();
                                             setTimeout(function(){
                                              aplicarFacturadePedidos(clienteenuso, "envase");
                                             }, 200);

                                         };
    var btnLiquido                   = document.getElementById("facturaProducto");
    btnLiquido.onclick               = function(){
                                             bloquearFacturacion();
                                             setTimeout(function(){
                                              aplicarFacturadePedidos(clienteenuso, "liquido");
                                             }, 200);

                                         };
    var btnCopiaEnvase               = document.getElementById("copiaFacturaEnvase");
    btnCopiaEnvase.onclick           = function(){
                                             bloquearFacturacion();
                                             setTimeout(function(){
                                              imprimirCopiaFactura('envase');
                                             }, 200);

                                        };
    var btnCopiaLiquido              = document.getElementById("copiaFacturaProducto");
    btnCopiaLiquido.onclick          = function(){
                                            bloquearFacturacion();
                                            setTimeout(function(){
                                             imprimirCopiaFactura('liquido');
                                            }, 200);

                                       };
    var btnDocEntregaEnvase          = document.getElementById("imprimeDocEntregaEnvase");
    btnDocEntregaEnvase.onclick      = function(){
                                           bloquearFacturacion();
                                           setTimeout(function(){
                                            imprimirDocEntregaEnvase();
                                           }, 200);
                                       };
    var btnDocEntregaLiquido         = document.getElementById("imprimeDocEntrega");
     btnDocEntregaLiquido.onclick    = function(){
                                          bloquearFacturacion();
                                          setTimeout(function(){
                                            imprimirDocEntrega();
                                          }, 200);
                                       };

}

function imprimirDocEntrega() {
    var Subtotal   = 0.00;
    var Iva		   = 0.00;
    var TotalFinal = 0.00;
    var Detalle    = new Array();
    var Encabezado = new Array();
    var imprEncabezadoFactura = new Array();
    var factDatosCliente = buscadatosCliente(clienteenuso);

    for ( k = 0; k < pedidos.length; k++) {
        lineapedido = pedidos[k][1].split("|");
        if (pedidos[k][0][0] == clienteenuso) {
            if (pedidos[k][0][6] != "1D") {
                if (!confirmaInventario(pedidos[k][0][1], lineapedido[2])) {
                    navigator.notification.alert('No puede continuar, valide cantidades o productos!',null,'ERROR','Aceptar');
                    break;
                }
                 var codigoProducto      = pedidos[k][0][1];
                 var descripcionProducto = pedidos[k][0][2];
                 var cajas			     = pedidos[k][1].split("|")[0];
                 var botellas		     = pedidos[k][1].split("|")[1];
                 var precioxBotella      = Number(pedidos[k][1].split("|")[3] / pedidos[k][1].split("|")[2]).toFixed(4);
                 var total				 = Number(pedidos[k][1].split("|")[3]).toFixed(2);
                 Detalle.push([codigoProducto, descripcionProducto, cajas, botellas, precioxBotella, total ]);

                 Subtotal   = (Number(Subtotal) + Number(lineapedido[3])).toFixed(2);
                 Iva        = (Number(Iva) + Number(lineapedido[5])).toFixed(2);

            }

        }
    }
    if (Detalle.length != 0) {

        var codigoCliente   = buscadatosCliente(clienteenuso)[0];
        var nombreCliente   = buscadatosCliente(clienteenuso)[1];
        var RUCCliente      = buscadatosCliente(clienteenuso)[3];
        var fecha		    = formatofecha(fechasistema());
        var codigoPedido    = "";
        var hora		    = horasistema();
        TotalFinal			= formatoDinero((Number(Iva) + Number(Subtotal)).toFixed(2)).toString();
        Subtotal            = formatoDinero(Subtotal).toString();
        Iva					= formatoDinero(Iva).toString();

        Encabezado = [codigoCliente, nombreCliente, RUCCliente, fecha, codigoPedido, ruta, hora, Subtotal, Iva, TotalFinal ];
        dataDocEntrega(Detalle, Encabezado);
    } else {
       navigator.notification.alert('Debe de ingresar al menos una linea para imprimir!',null,'Error','Aceptar');
       desbloquearFacturacion();
    }

}

function imprimirDocEntregaEnvase() {
    var Subtotal   = 0.00;
    var Iva		   = 0.00;
    var TotalFinal = 0.00;
    var Detalle    = new Array();
    var Encabezado = new Array();
    var imprEncabezadoFactura = new Array();
    var factDatosCliente = buscadatosCliente(clienteenuso);

    for ( k = 0; k < pedidos.length; k++) {
        lineapedido = pedidos[k][1].split("|");
        if (pedidos[k][0][0] == clienteenuso) {
            if (pedidos[k][0][6] == "1D") {

                 var codigoProducto      = pedidos[k][0][1];
                 var descripcionProducto = pedidos[k][0][2];
                 var cajas			     = pedidos[k][1].split("|")[0];
                 var botellas		     = pedidos[k][1].split("|")[1];
                 var precioxBotella      = Number(pedidos[k][1].split("|")[3] / pedidos[k][1].split("|")[2]).toFixed(4);
                 var total				 = Number(pedidos[k][1].split("|")[3]).toFixed(2);
                 Detalle.push([codigoProducto, descripcionProducto, cajas, botellas, precioxBotella, total ]);

                 Subtotal   = (Number(Subtotal) + Number(lineapedido[3])).toFixed(2);
                 Iva        = (Number(Iva) + Number(lineapedido[5])).toFixed(2);

            }

        }
    }
    if (Detalle.length != 0) {

        var codigoCliente   = buscadatosCliente(clienteenuso)[0];
        var nombreCliente   = buscadatosCliente(clienteenuso)[1];
        var RUCCliente      = buscadatosCliente(clienteenuso)[3];
        var fecha		    = formatofecha(fechasistema());
        var codigoPedido    = "";
        var hora		    = horasistema();
        TotalFinal			= formatoDinero((Number(Iva) + Number(Subtotal)).toFixed(2)).toString();
        Subtotal            = formatoDinero(Subtotal).toString();
        Iva					= formatoDinero(Iva).toString();

        Encabezado = [codigoCliente, nombreCliente, RUCCliente, fecha, codigoPedido, ruta, hora, Subtotal, Iva, TotalFinal ];
        dataDocEntrega(Detalle, Encabezado);
    } else {
       navigator.notification.alert('Debe de ingresar al menos una linea para imprimir!',null,'Error','Aceptar');
       desbloquearFacturacion();
    }

}

function ObtenerPorcentajeCentralizacion(codigoCliente) {
    var PorcentajeCentralizacion = "";
    for (var j = 0; j < listaclientes.length; j++) {
        var tmpcliente = listaclientes[j].split("|");
        if (tmpcliente[0] == codigoCliente) {
            PorcentajeCentralizacion = tmpcliente[21];
            break;
        }
    }
    return PorcentajeCentralizacion;
}

function dataDocEntrega(detalle, encabezado) {
  var DocEntrega 			= {};
  DocEntrega.tipoBoucher 	= "DOCENTREGA";
  DocEntrega.tipoImpresion  = "DOCENTREGA";
  DocEntrega.impresoraEnUso	= nombreImpresoraConectada;
  DocEntrega.codigoCliente 	= encabezado[0];
  DocEntrega.cliente 		= encabezado[1];
  DocEntrega.rucCliente 	= encabezado[2];
  DocEntrega.fecha 			= encabezado[3];
  DocEntrega.pedido 		= encabezado[4];
  DocEntrega.ruta 			= encabezado[5];
  DocEntrega.hora 			= encabezado[6];
  DocEntrega.subTotal 		= encabezado[7];
  DocEntrega.IVA 			= encabezado[8];
  DocEntrega.total			= encabezado[9];


  var detalleLineas = new Array();

	$.each(detalle, function (indice, valor) {
		detalleLineas[indice] = {
			codigoProducto: valor[0],
			producto:       valor[1],
			CAJ: 	        valor[2],
			BOT:            valor[3],
			PBOT:           valor[4],
			total:          valor[5]
		};
	});

	DocEntrega.detalle = detalleLineas;
	ejecutarImpresionFactura(DocEntrega, false, function(){
	    desbloquearFacturacion();
	}, function(){
	    desbloquearFacturacion();
	});
	console.log(JSON.stringify(DocEntrega));
}


function MuestraDocEntrega(){
    if ( !tieneFacturas("PROD") ){
    	// Si el cliente actual no tiene Facturas, mostramos botón "Imprimir documento de Entrega"....
    	$("#imprimeDocEntrega").show();
    }
    if (!tieneFacturas("ENV")) {
        $("#imprimeDocEntregaEnvase").show();
    }
}

function validarExisteFacturaArreglo(codigo){
	var existe = false;
	$(facturas).each(function(i,item){
		if(item[1].split("|")[8]==codigo){
			existe = true;
		}
	});
	return existe;
}
