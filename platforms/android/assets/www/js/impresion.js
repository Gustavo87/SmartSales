var g_socketid = -1;
var dispositivo = "APEX3";
var ImpresoraEnUso = false;
var id = "00001101-0000-1000-8000-00805f9b34fb";
var direccionFisica = "00:12:F3:17:D9:67";//"00:12:F3:15:7D:0B";
var conexion = false;

var dirImpresora="";//"00:12:F3:17:D9:67";//"00:12:F3:15:7D:0B";
var uidDisp= "00001101-0000-1000-8000-00805f9b34fb";

var Facturacion = {
  tipoBoucher: null,
  tipoImpresion: null,
  tituloFactura: null,
  codigoCliente: null,
  factNumero: null,
  numeroFactura: null,
  cliente: null,
  ruta: null,
  fecha: null,
  fechaFact: null,
  hora: null,
  pedido: null,
  tipoFacturacion: null,
  subTotal: null,
  IVA: null,
  total: null,
  montoOriginal: null,
  saldo: null,
  copias: null,
  rucCliente: null,
  detalleFactura: [],
  facturaManual:null
};

var MinutaDeposito = {
  tipoBoucher: null,
  tituloMinuta: null,
  numeroMinuta: null,
  fecha: null,
  hora: null,
  ruta: null,
  totalEfectivoNIO: null,
  totalChequesNIO: null,
  totalEfectivoUS: null,
  totalChequesUS: null,
  banco: null
};

var ResumenPago = {
  tipoBoucher: null,
  tituloMinuta: null,
  numeroMinuta: null,
  fecha: null,
  hora: null,
  ruta: null,
  totalEfectivoNIO: null,
  totalChequeNIO: null,
  totalTarjetaNIO : null,
  totalMinutaNIO : null,
  	totalMinutaBACNIO : null,
	totalMinutaBDFNIO : null,
	totalMinutaBANPRONIO : null,
	totalMinutaLAFISENIO : null,
	totalMinutaCITINIO : null,
	totalMinutaPROCREDITNIO : null,
	totalMinutaBCENTRALNIO : null,
  totalEfectivoUS: null,
  totalChequeUS: null,
  totalMinutaUS : null,
	totalMinutaBACUS : null,
	totalMinutaBDFUS : null,
	totalMinutaBANPROUS : null,
	totalMinutaLAFISEUS : null,
	totalMinutaCITIUS : null,
	totalMinutaPROCREDITUS : null,
	totalMinutaBCENTRALUS :null
};

var Inventario = {
  tipoBoucher: null,
  tituloInventario: null,
  ruta: null,
  hora: null,
  fecha: null,
  detalleInventario: []
};

var Recibo = {
  tipoBoucher: null,
  tipoImpresion: null,
  tituloRecibo: null,
  reciboNumero: null,
  codigoCliente: null,
  cliente: null,
  ruta: null,
  fechaRecibo: null,
  hora: null,
  facturaNumero: null,
  montoOriginal: null,
  saldo: null,
  fechaFactura: null,
  detalleRecibo: [],
  abono: null,
  nuevoSaldo: null,
  copias: null
}

//Data de Prueba...

var InventarioABordo = {
  tipoBoucher: "INVENTARIO",
  tituloInventario: "INVENTARIO A BORDO",
  ruta: "T01",
  hora: "12:27pm",
  fecha: "03/10/12",
  detalleInventario: [
    {
      codigoProducto: "830NI0718G",
      nombreProducto: "FDC Extra Lite 12x750ml Exonerada",
      caja: "10",
      botella: "10"
    },
    {
      codigoProducto: "830NI0718F",
      nombreProducto: "FDC Extra Lite 12x750ml",
      caja: "3",
      botella: "12"
    },
    {
      codigoProducto: "830NI0718I",
      nombreProducto: "FDC Extra Lite 24x375ml",
      caja: "2",
      botella: "8"
    }
  ]
};

var Minuta = {
  tipoBoucher: "MINUTA",
  tituloMinuta: "MINUTA DE DEPOSITO",
  numeroMinuta: "T30121003",
  fecha: "02/10/12",
  hora: "09:44pm",
  ruta: "T30",
  totalEfectivoNIO: "C$1,234.00",
  totalChequesNIO: "C$3,245.00",
  totalEfectivoUS: "U$1,234.00",
  totalChequesUS: "U$3,245.00"
}

var Factura = {
  tipoBoucher: "FACTURACION",
  tipoImpresion: "ORIGINAL",
  tituloFactura: "FACTURA",
  codigoCliente: "9915158",
  factNumero: "J0310000032904",
  numeroFactura: "A05-09273",
  cliente: "MARINA DE GUACALITO SA",
  ruta: "A05",
  fecha: "13/09/2014",
  fechaFact: null,
  hora: "09:34",
  pedido: "",
  tipoFacturacion: "CREDITO",
  subTotal: "22,699.46",
  IVA: "3,404.92",
  total: "26,104.38",
  montoOriginal: null,
  saldo: null,
  copias: "1",
  detalleFactura: [
    {
      codigoProducto: "830NI0227L",
      producto: "FDC Centenario 18 12x750ml",
      CAJ: "2",
      BOT: "0",
      PBOT: "743.6771",
      total: "17848.25",
      motivoCambio: null
    },
    {
      codigoProducto: "830NI0710I",
      producto: "FDC Extra Lite 24x200ml",
      CAJ: "2",
      BOT: "0",
      PBOT: "34.3269",
      total: "1647.69",
      motivoCambio: null
    },
    {
      codigoProducto: "830NI0732L",
      producto: "FDC Extra Lite 12x1000ml",
      CAJ: "2",
      BOT: "0",
      PBOT: "133.4800",
      total: "3203.52",
      motivoCambio: null
    }
  ]
};

var FacturaCambio = {
  tipoBoucher: "FACTURACION",
  tipoImpresion: "ORIGINAL",
  tituloFactura: "CAMBIO",
  codigoCliente: "8810101",
  factNumero: null,
  numeroFactura: "ZZ1-QP1-0987654321",
  cliente: "CLIENTE DE PRUEBA 5",
  ruta: "T05",
  fecha: "01/10/12",
  fechaFact: null,
  hora: "05:06pm",
  pedido: "P08-54321",
  tipoFacturacion: null,
  subTotal: "C$9,304.00",
  IVA: "C$1,234.00",
  total: "C$10,789.00",
  montoOriginal: null,
  saldo: null,
  copias: "1",
  detalleFactura: [
    {
      codigoProducto: "830NI0718I",
      producto: "FDC Extra Lite 24x375ml",
      CAJ: "3",
      BOT: "12",
      PBOT: null,
      total: null,
      motivoCambio: "Daños"
    },
    {
      codigoProducto: "830NI0718F",
      producto: "FDC Extra Lite 12x750ml",
      CAJ: "2",
      BOT: "8",
      PBOT: null,
      total: null,
      motivoCambio: "Picos"
    },
    {
      codigoProducto: "830NI0718G",
      producto: "FDC Extra Lite 12x750ml Exonerada",
      CAJ: "1",
      BOT: "6",
      PBOT: null,
      total: null,
      motivoCambio: "Retiros"
    }
  ]
};

var FacturaDevolucion = {
  tipoBoucher: "FACTURACION",
  tipoImpresion: "ORIGINAL",
  tituloFactura: "DEVOLUCION",
  codigoCliente: "8810101",
  factNumero: "CD1-P01-1234567890",
  numeroFactura: "ZZ1-QP1-0987654321",
  cliente: "CLIENTE DE PRUEBA 10",
  ruta: "T05",
  fecha: "01/10/12",
  fechaFact: "01/10/12",
  hora: "05:06pm",
  pedido: "P08-54321",
  tipoFacturacion: null,
  subTotal: "C$9,304.00",
  IVA: "C$1,234.00",
  total: "C$10,789.00",
  montoOriginal: "C$ 1,235.00",
  saldo: "C$ 2,548.87",
  copias: "1",
  detalleFactura: [
    {
      codigoProducto: "830NI0718I",
      producto: "FDC Extra Lite 24x375ml",
      CAJ: "3",
      BOT: "12",
      PBOT: null,
      total: null,
      motivoCambio: "Daños"
    },
    {
      codigoProducto: "830NI0718F",
      producto: "FDC Extra Lite 12x750ml",
      CAJ: "2",
      BOT: "8",
      PBOT: null,
      total: null,
      motivoCambio: "Picos"
    },
    {
      codigoProducto: "830NI0718G",
      producto: "FDC Extra Lite 12x750ml Exonerada",
      CAJ: "1",
      BOT: "6",
      PBOT: null,
      total: null,
      motivoCambio: "Retiros"
    }
  ]
};

var ReciboPago = {
  tipoBoucher: "RECIBO",
  tipoImpresion: "ORIGINAL",
  tituloRecibo: "RECIBO DE PAGO",
  reciboNumero: "CD1-E01-RP1234567",
  codigoCliente: "9912345",
  cliente: "Nombre del Cliente",
  ruta: "123",
  fechaRecibo: "05/10/12",
  hora: "12:09pm",
  facturaNumero: "CD1-E01-123456789",
  montoOriginal: "C$ 12,3052.23",
  saldo: "C$ 9,653.35",
  fechaFactura: "03/10/12",
  detalleRecibo: [
      {
	      tipo: "Efectivo C$",
	      monto: "100.00",
	      banco: "",
	      referencia: ""
      },
      {
	      tipo: "Cheque C$",
	      monto: "1,000.00",
	      banco: "BANPRO",
	      referencia: "ABC1234"
      },
      {
	      tipo: "Efectivo US$\n(9999.99*23.85)",
	      monto: "238,499.76",
	      banco: "",
	      referencia: ""
      },
      {
	      tipo: "Cheque US$\n(100.00*23.85)",
	      monto: "2,385.00",
	      banco: "PROCREDIT",
	      referencia: "ABC5678"
      }
  ],
  abono: "C$ 4,621.85",
  nuevoSaldo: "C$ 5,031.50",
  copias: "1"
}

function activarBluetooth () {
	BluetoothPlugin.disable(
			function () {
				console.log("Se ha deshabilitado satisfactoriamente el Bluetooth.");

				BluetoothPlugin.enable(
					function () {
						console.log("Se ha habilitado satisfactoriamente el Bluetooth.");

						BluetoothPlugin.discoverDevices(
							function (devices) {
								console.log("Se han descubiertos los dispositivos con Bluetooth.");
								var nombre, direccFis;

								$.each(devices, function (indice, dispositivo) {
									console.log("El nombre es: " + dispositivo.name + " y la direccion fisica es: " + dispositivo.address);
									if (dispositivo.name == "APEX3") {
										nombre = dispositivo.name;
										direccFis = dispositivo.address;
									}
								});

								if (nombre == "APEX3") {
									BluetoothPlugin.getUUIDs(
										function (uuids) {
											console.log(uuids[0]);

											BluetoothPlugin.connect(
												function (sockedID) {
													console.log("El objeto Factura contiene:\n" + Factura.toString());
													console.log("El sockedID es: " + sockedID);
													g_socketid = sockedID;
												},
												function (error) {
													alert("Error: " + error + "\nHubo un error al conectarse con el dispositivo. Reinicie el equipo de impresión.");
												},
												direccFis,
												uuids[0]
											);
										}, function (error) {
											alert("Error: " + error + "\nHubo error al obtener el uuids");
										},
										direccFis
									)
								} else {
									alert("No se ha encontrado ningun dispositivo de impresion porfavor revise si esta encendida la impresora.");
								}
							},
							function (error) {
								console.log("Hubo un error al escanear los dispositivos con Bluetooth.");
								alert("Error:\n" + error + "\nHubo un error al escanear los dispositivos con Bluetooth.");
							}
						);
					},
					function (error) {
						console.log("Hubo un error al habilitar el Bluetooth.");
						alert("Error:\n" + error + "\nHubo un error al habilitar el Bluetooth.");
					}
				);
			},
			function (error) {
				console.log("Hubo un error al deshabilitar el Bluetooth.");
				alert("Error:\n" + error + "\nHubo un error al deshabilitar el Bluetooth.");
			}
		);
}


//function dataDocEntrega(detalle, encabezado) {
//  var DocEntrega 			= {};
//  DocEntrega.tipoBoucher 	= "DOCENTREGA";
//  DocEntrega.impresoraEnUso	= nombreImpresoraConectada;
//  DocEntrega.codigoCliente 	= encabezado[0];
//  DocEntrega.cliente 		= encabezado[1];
//  DocEntrega.rucCliente 	= encabezado[2];
//  DocEntrega.fecha 			= encabezado[3];
//  DocEntrega.pedido 		= encabezado[4];
//  DocEntrega.ruta 			= encabezado[5];
//  DocEntrega.hora 			= encabezado[6];
//  DocEntrega.subTotal 		= encabezado[7];
//  DocEntrega.IVA 			= encabezado[8];
//  DocEntrega.total			= encabezado[9];
//
//
//  var detalleLineas = new Array();
//
//	$.each(detalle, function (indice, valor) {
//		detalleLineas[indice] = {
//			codigoProducto: valor[0],
//			producto:       valor[1],
//			CAJ: 	        valor[2],
//			BOT:            valor[3],
//			PBOT:           valor[4],
//			total:          valor[5]
//		};
//	});
//
//	DocEntrega.detalle = detalleLineas;
//	ejecutarImpresion(DocEntrega);
//	console.log(JSON.stringify(DocEntrega));
//}




function dataFacturacion(encabezadoFact, detalleFact, copiasFact, docsimpresos, facturasimpresas) {
  /** Arreglo encabezados **/
  // encabezadoFactura = ["ORIGINAL", "tituloFactura", "codigoCliente", null, "numeroFactura", "cliente", "ruta", "fecha", null, "hora", "pedido", "tipoFacturacion", "subTotal", "IVA", "total", null, null];
  // encabezadoCambio = ["ORIGINAL", "tituloFactura", "codigoCliente", null, "numeroFactura", "cliente", "ruta", "fecha", null, "hora", null, null, null, null, null, null, null];
  // encabezadoDevolucion = ["ORIGINAL", "tituloFactura", "codigoCliente", "factNumero", "numeroFactura", "cliente", "ruta", "fecha", "fechaFact", "hora", null, null, null, null, null, null, null];

  /** Arreglo detalle **/
  // detalleFactura = [["codigoProducto", "producto", "CAJ", "BOT", "PBOT", "total", null]]
  // detalleCambio = [["codigoProducto", "producto", "CAJ", "BOT", null, null, "motivoCambio"]]
  // detalleDevolucion = [["codigoProducto", "producto", "CAJ", "BOT", null, null, null]]

 /*encabezadoFact = ["ORIGINAL", "FACTURA", "9915158",
 					"J0310000032904", "A05-09273", "MARINA DE GUACALITO SA", "A05",
 					"13/09/2014", null, "09:34", "", "CREDITO",
 					"22,699.46", "3,404.92", "26,104.38", null, null];

 detalleFact = [["830NI0227L","FDC Centenario 18 12x750ml","2","0","743.6771","17848.25",null],
 				["830NI0710I","FDC Extra Lite 24x200ml","2","0","34.3269","1647.69",null],
 				["830NI0732L","FDC Extra Lite 12x1000ml","2","0","133.4800","3203.52",null]];

*/

/*
 encabezadoFact = ["ORIGINAL", "FACTURA", "9918631", "J0310000001740", "T06-16030", "TELEFONIA CELULAR DE NICARAGUA", "T06", "31/12/2014", null, "09:18", "P06-9918631-20141230", "CREDITO", "20,233.42", "3,035.01", "23,268.43", null, null];
 detalleFact = [["830NI0432L","FDC Gran Reserva 12x1000ml","0","50","228.8242","11441.21",null],
 				       ["830NI0432LEX","FDC Gran Reserva 12x1000ml Promocion","0","60","146.5368","8792.21",null]];
*/


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
  Facturacion.docsimpresos = docsimpresos;
  Facturacion.facturasimpresas = facturasimpresas;
  Facturacion.porcentajeCentralizacion = Number(ObtenerPorcentajeCentralizacion(encabezadoFact[2]));

  Facturacion.copias = copiasFact;

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

	ejecutarImpresion(Facturacion);



	console.log(JSON.stringify(Facturacion));
}

function dataMinuta(datosMinuta) {
  MinutaDeposito.tipoBoucher = "MINUTA";
  MinutaDeposito.impresoraEnUso=nombreImpresoraConectada;
  MinutaDeposito.tituloMinuta = datosMinuta[0];
  MinutaDeposito.numeroMinuta = datosMinuta[1];
  MinutaDeposito.fecha = datosMinuta[2];
  MinutaDeposito.hora = datosMinuta[3];
  MinutaDeposito.ruta = datosMinuta[4];
  MinutaDeposito.totalEfectivoNIO = datosMinuta[5];
  MinutaDeposito.totalChequesNIO = datosMinuta[6];
  MinutaDeposito.totalEfectivoUS = datosMinuta[7];
  MinutaDeposito.totalChequesUS = datosMinuta[8];
  MinutaDeposito.banco = datosMinuta[9];

  ejecutarImpresion(MinutaDeposito);

  console.log(JSON.stringify(MinutaDeposito));
}

function dataMinutaResumen(datosMinuta) {

  MinutaDeposito.tipoBoucher = "RESUMEN_DIA";
  MinutaDeposito.impresoraEnUso=nombreImpresoraConectada;
  MinutaDeposito.tituloMinuta = datosMinuta[0];
  MinutaDeposito.numeroMinuta = datosMinuta[1];
  MinutaDeposito.fecha = datosMinuta[2];
  MinutaDeposito.hora = datosMinuta[3];
  MinutaDeposito.ruta = datosMinuta[4];
  MinutaDeposito.totalEfectivoNIO = datosMinuta[5];
  MinutaDeposito.totalChequesNIO = datosMinuta[6];
  MinutaDeposito.totalEfectivoUS = datosMinuta[7];
  MinutaDeposito.totalChequesUS = datosMinuta[8];

  ejecutarImpresion(MinutaDeposito);

  console.log(JSON.stringify(MinutaDeposito));
}


function dataMinutaResumenPago(datosResumen) {
  ResumenPago.tipoBoucher = "RESUMEN_PAGO";
  ResumenPago.impresoraEnUso=nombreImpresoraConectada;
  ResumenPago.tituloMinuta = datosResumen[0];
  ResumenPago.numeroMinuta = datosResumen[1];
  ResumenPago.fecha = datosResumen[2];
  ResumenPago.hora = datosResumen[3];
  ResumenPago.ruta = datosResumen[4];

  	ResumenPago.totalEfectivoNIO = datosResumen[5];
	ResumenPago.totalChequeNIO = datosResumen[6];
	ResumenPago.totalTarjetaNIO = datosResumen[7];
  //Se agrega el tipo de pago 8
  //Realziado por mroque 2016.02.05
  ResumenPago.totalTarjetaUS=datosResumen[26]

	ResumenPago.totalMinutaNIO = datosResumen[8];
		ResumenPago.totalMinutaBACNIO = datosResumen[9];
		ResumenPago.totalMinutaBDFNIO = datosResumen[10];
		ResumenPago.totalMinutaBANPRONIO = datosResumen[11];
		ResumenPago.totalMinutaLAFISENIO = datosResumen[12];
		ResumenPago.totalMinutaCITINIO = datosResumen[13];
		ResumenPago.totalMinutaPROCREDITNIO = datosResumen[14];
		ResumenPago.totalMinutaBCENTRALNIO = datosResumen[15];
	ResumenPago.totalEfectivoUS = datosResumen[16];
	ResumenPago.totalChequeUS = datosResumen[17];
	ResumenPago.totalMinutaUS = datosResumen[18];
		ResumenPago.totalMinutaBACUS = datosResumen[19];
		ResumenPago.totalMinutaBDFUS = datosResumen[20];
		ResumenPago.totalMinutaBANPROUS = datosResumen[21];
		ResumenPago.totalMinutaLAFISEUS = datosResumen[22];
		ResumenPago.totalMinutaCITIUS = datosResumen[23];
		ResumenPago.totalMinutaPROCREDITUS = datosResumen[24];
		ResumenPago.totalMinutaBCENTRALUS = datosResumen[25];

  ejecutarImpresion(ResumenPago);

  console.log(JSON.stringify(ResumenPago));
}

function dataInventarioABordo(encabezadoInv, detalleInv) {
  Inventario.tipoBoucher = "INVENTARIO";
  //Define el tipo impresora a utilizar...
  Inventario.impresoraEnUso=nombreImpresoraConectada;
  Inventario.tituloInventario = encabezadoInv[0];
  Inventario.ruta = encabezadoInv[1];
  Inventario.hora = encabezadoInv[2];
  Inventario.fecha = encabezadoInv[3];

  var detalleLineasInventario = new Array();
  var contar=0;
  $.each(detalleInv, function (indice, valor) {
	  detalleLineasInventario[indice] = {
      codigoProducto: valor[0],
      nombreProducto: valor[1],
      caja: valor[2],
      botella: valor[3]
    };
	contar++;
	console.log('Contar '+contar);
  });

  Inventario.detalleInventario = detalleLineasInventario;

  ejecutarImpresion(Inventario);

  console.log(JSON.stringify(Inventario));
}

function dataRecibo(datosRecibo, detalleRecibo, copiasRecibo,docsimpresos,facturasimpresas,cli,fac,sal,sum,abonosRealizados,DevEnvRuta) {
  /** Arreglo encabezados **/
  //encabezadoRecibo = ["tipoImpresion", "tituloRecibo", "reciboNumero", "codigoCliente", "cliente", "ruta", "fechaRecibo", "hora", "facturaNumero", "fechaFactura", "montoOriginal", "saldo", "abono", "nuevoSaldo"];
  //encabezadoReciboEnvase = ["tipoImpresion", "tituloRecibo", "reciboNumero", "codigoCliente", cliente, "ruta", "fechaRecibo", "hora", null, null, null, "saldo", null, null];

  /** Arreglo detalle **/
  //detalleRecibo = [["tipo", "monto", "banco, "referencia"]];

  Recibo.tipoBoucher = "RECIBO";
  Recibo.impresoraEnUso=nombreImpresoraConectada;
  Recibo.tipoImpresion = datosRecibo[0];		//tipoImpresion Esto es si se va imprimir Original o Reimpresion o Copias.
  Recibo.tituloRecibo = datosRecibo[1];			//tituloRecibo Titulo del recibo ejemplo Recibo de Pago, etc.
  Recibo.reciboNumero = datosRecibo[2];			//reciboNumero Este es el numero del recibo.
  Recibo.codigoCliente = datosRecibo[3];		//codigoCliente Codigo del cliente.
  Recibo.cliente = datosRecibo[4];				//cliente Nombre del cliente.
  Recibo.ruta = datosRecibo[5];					//ruta.
  Recibo.fechaRecibo = datosRecibo[6];			//fechaRecibo Fecha del recibo
  Recibo.hora = datosRecibo[7];					//hora
  Recibo.facturaNumero = datosRecibo[8];		//facturaNumero Numero de la Factura.
  Recibo.fechaFactura = datosRecibo[9];			//fechaFactura Fecha de la Factura.
  Recibo.montoOriginal = datosRecibo[10];		//montoOriginal
  Recibo.saldo = datosRecibo[11];				//saldo
  Recibo.abono = datosRecibo[12];				//abono
  Recibo.nuevoSaldo = datosRecibo[13];			//nuevoSaldo
  Recibo.noCopia=0;								//Numero de Copias
  Recibo.copias = copiasRecibo;
  Recibo.docsimpresos = docsimpresos;
  Recibo.facturasimpresas = facturasimpresas;
  Recibo.clienteenuso = cli;
  Recibo.facturaenuso = fac;
  Recibo.saldofacturaenuso = sal;
  Recibo.sumaAbono = sum;
  Recibo.abonosRealizados = abonosRealizados;
  Recibo.DevEnvRuta = DevEnvRuta;

  var detalleLineasRecibo = new Array();

  if (datosRecibo[1] == "RECIBO DE ENVASES") {
	  Recibo.tipoBoucher = "RECIBO_ENVASES";
	  detalleLineasRecibo = detalleRecibo;
  } else {
	  $.each(detalleRecibo, function (indice, valor) {
		  detalleLineasRecibo[indice] = {
		    tipo: valor[0],							//tipo Esto significa que tipo de pago es Cheque, Efectivo ya sea en dolar o cordobas.
		    monto: valor[1],						//monto La cantidad que corresponde.
		    banco: valor[2],						//banco El banco.
		    referencia: valor[3]					//referencia Es el numero del cheque o numero de boleta etc.
	      };
	  });
  }

  Recibo.detalleRecibo = detalleLineasRecibo;

  ejecutarImpresion(Recibo);

  //console.log(JSON.stringify(Recibo));
}


//"00001101-0000-1000-8000-00805f9b34fb";
//"00:12:F3:15:7D:0B";
function activarBluetooth () {

	BluetoothPlugin.enable(
	  function() {
	   console.log( 'BlueTooth Encendido!' );


		   BluetoothPlugin.disconnect(
					function () {
						console.log("Se ha desconectado el Bluetooth satisfactoriamente.");
					},
					function (error) {
						console.log("Error: " + error + "\nNo se ha podido desconectar el dispositivo.");
					},
					g_socketid
				);



	   BluetoothPlugin.connect(
	    function(socketId) {
	      g_socketid = socketId;
	      console.log( 'Socket-id: ' + g_socketid );
	      conexion = true;
	      muestraImpresoraConectada();
	    },
	    function(error)
	    {
	     alert( 'Error al conectarse al Bluetooth: ' + error );
	     conexion = false;
	    },
	    dirImpresora, uidDisp
	   );

	  }, function()
	  {
	   alert( 'Error al encender el Bluetooth');
	  }
	 );
	}

function LigarEventosFacturar(){

//    var btnEnvase = document.getElementById("facturaEnvase");
//    btnEnvase.onclick = function(){
//        console.log(55555);
//        var btnEnvase = document.getElementById("facturaEnvase");
//        btnEnvase.onclick = null;
//        facturaEnvases();
//    };
//
//    var btnLiquido = document.getElementById("facturaProducto");
//    btnLiquido.onclick = function(){
//        var btnLiquido = document.getElementById("facturaProducto");
//        btnLiquido.onclick = null;
//        facturaProducto();
//    };

}

function imprimirDocumento(fact){

    console.log(fact);

    if( ImpresoraEnUso == false ){

	 BluetoothPlugin.write(
	   function(plantilla){

	   // Ocultamos el botón de facturación, si es el original
	    if(fact.tipoBoucher=="FACTURACION"  && fact.noCopia==0 && fact.tituloFactura=="FACTURA" ){
            $("#facturaProducto").hide();
            $("#facturaEnvase").hide();
	    }

	    if(fact.tipoBoucher=="RECIBO_ENVASES"){

	        $("#DevolucionEnvase").hide();
	    }

        console.log(plantilla);

		if(fact.impresoraEnUso=="SPP-R300" || fact.impresoraEnUso=="SPP-R310" ){

            ImpresoraEnUso = true;
            navigator.notification.activityStart("Imprimiendo documento", "Por favor espere que termine el proceso de impresión");

            //Llamar plugin...

			ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
			function(){

                 LigarEventosFacturar();

                 console.log("CALLBACK DE EXITO");

                 // Si es un documento que no utiliza copia
                 if(fact.tipoBoucher!="FACTURACION" && fact.tipoBoucher!="RECIBO" && fact.tipoBoucher!="RECIBO_ENVASES"){

                    ImpresoraEnUso = false;
                    navigator.notification.activityStop();

                 }

                 if(fact.tipoBoucher=="FACTURACION" && fact.tituloFactura=="CAMBIO"){
                    ImpresoraEnUso = false;
                    navigator.notification.activityStop();
                 }

                if(fact.tipoBoucher=="FACTURACION" && fact.tituloFactura=="DEVOLUCION"){
                    ImpresoraEnUso = false;
                    navigator.notification.activityStop();
                 }


				/***************** FACTURAS *******************/
				if(fact.tipoBoucher=="FACTURACION" && fact.tipoImpresion=="ORIGINAL" && fact.tituloFactura=="FACTURA"){
					// Exito Imprimiendo Factura Original
					// Marcamos la impresion de Factura como exitosa
					facturasimpresas.push(fact.facturasimpresas);
					docsimpresos.push(fact.docsimpresos);
					// Vamos a imprimir la copia 1 de Factura
					plantilla = plantilla.replace("-------------ORIGINAL-------------","-------------COPIA # 1-------------");
					alert("Impresa Factura Original. Imprimir Copia 1?");
					ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
					function(){
						// Exito imprimiendo Copia 1 de Factura
						plantilla = plantilla.replace("-------------COPIA # 1-------------","-------------COPIA # 2-------------");
						alert("Impresa Factura Original. Imprimir Copia 2?");
						ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
						function(){
						     alert("Impresión de facturas exitosa");
						     ImpresoraEnUso = false;
						     navigator.notification.activityStop();
							//Exito imprimiendo Copia 2 de Factura
							// Mostramos el boton de imprimir factura
							$("#facturaProducto").show();
							 $("#facturaEnvase").show();

						},
						function(error){
							//Error imprimiendo Copia 2 de Factura
							ImpresoraEnUso = false;
							navigator.notification.activityStop();
							alert(error);
							// Mostramos el boton de imprimir factura
							$("#facturaProducto").show();
							 $("#facturaEnvase").show();
                            // Registramos en el Log de error
                            var Documento = fact.tipoBoucher;
                            var Tipo = "Copia #02 ";
                            var IDFact = fact.numeroFactura;
                            var ErrorDeta = error;
                            var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
                            var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
                            LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
                            persistenciaSistema();
						}
						);

					},
					function(error){
						// Error imprimiendo Copia 1 de Factura
						ImpresoraEnUso = false;
						navigator.notification.activityStop();
						alert(error);
						// Mostramos el boton de imprimir factura
						$("#facturaProducto").show();
						 $("#facturaEnvase").show();
						// Registramos en el Log de error
                        var Documento = fact.tipoBoucher;
                        var Tipo = "Copia #01 ";
                        var IDFact = fact.numeroFactura;
                        var ErrorDeta = error;
                        var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
                        var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
                        LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
                        persistenciaSistema();
					}
					);

				}
				/***************** ABONOS/RECIBOS *******************/
				if(fact.tipoBoucher=="RECIBO" && fact.tipoImpresion=="ORIGINAL"  ){
					// Exito Imprimiendo Recibo  Original
					// Marcamos la impresion de Recibo como exitosa
					facturasimpresas.push(fact.facturasimpresas);
					docsimpresos.push(fact.docsimpresos);
					// Actualizamos los documentos pendientes
					var cli = fact.clienteenuso;
					var fac = fact.facturaenuso;
					var sal = fact.saldofacturaenuso;
					var sum = fact.sumaAbono;
					actualizaDocpendientes(cli, fac, sal, sum);
					// Cargamos los documentos del cliente
                    cargadocscliente(cli);
					// Alertamos que el pago se aplico
					var tmpcorrelativoabono = ruta + "-" + creacorrelativo(correlativoabono);
					navigator.notification.alert('C$'+formatoDinero(Number(sum).toFixed(2))+ ' abonado a factura: '+fac, // message
                                null, // callback
                                'Pago '+tmpcorrelativoabono+' guardado!!', // title
                                'Aceptar' // buttonName
                            );
					// Actualizamos los iconos del cliente
					actualizaIconos();
					// Resetea la factura en uso
					facturaenuso = "";
					// Limpia los abonos en la UI
					$('#totalAbono').html("");
					// Arma tabla de pedidos
					tablapedido();
					// Incrementa el correlativo de abono
					correlativoabono++;
					// Grabamos los abonos realizados
//					abonosRealizados.push(fact.abonosRealizados);
                    abonosRealizados = abonosRealizados.concat(fact.abonosRealizados);
					// Vamos a imprimir la copia 1 del Recibo
					plantilla = plantilla.replace("-------------ORIGINAL-------------","-------------COPIA # 1-------------");
					alert("Impreso Recibo Original. Imprimir Copia 1?");
					ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
					function(){
						// Exito imprimiendo copia 1 de Recibo
						plantilla = plantilla.replace("-------------COPIA # 1-------------","-------------COPIA # 2-------------");
						alert("Impreso Recibo Original. Imprimir Copia 2?");
						ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
						function(){
							// Exito imprimiendo copia 2 de Recibo
							ImpresoraEnUso = false;
							navigator.notification.activityStop();
						},
						function(error){
							// Error imprimiendo copia 2 de Recibo
							ImpresoraEnUso = false;
							navigator.notification.activityStop();
							alert(error);
                            // Registramos en el Log de error
                            var Documento = fact.tipoBoucher;
                            var Tipo = "Copia #02 ";
                            var IDFact = fact.reciboNumero;
                            var ErrorDeta = error;
                            var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
                            var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
                            LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
                            persistenciaSistema();
						}
						);
					},
					function(error){
						// Error imprimiendo copia 1 de Recibo
						ImpresoraEnUso = false;
						navigator.notification.activityStop();
						alert(error);
						// Registramos en el Log de error
                        var Documento = fact.tipoBoucher;
                        var Tipo = "Copia #01 ";
                        var IDFact = fact.reciboNumero;
                        var ErrorDeta = error;
                        var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
                        var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
                        LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
                        persistenciaSistema();

					}
					);

				}
				/*************************** RECIBOS DE ENVASES ************************/
				if(fact.tipoBoucher=="RECIBO_ENVASES" && fact.tipoImpresion=="ORIGINAL" ){

					// Exito Imprimiendo Recibo de Envase Original
					// Marcamos la impresion de Recibo de Envase como exitosa
					facturasimpresas.push(fact.facturasimpresas);
					docsimpresos.push(fact.docsimpresos);
					// Registramos en el arreglo devolucionenvasesRuta
//					devolucionenvasesRuta = fact.DevEnvRuta;
                    devolucionenvasesRuta = devolucionenvasesRuta.concat(fact.DevEnvRuta);
					// Vamos a imprimir la copia 1 del Recibo de Envase
					plantilla = plantilla.replace("-------------ORIGINAL-------------","-------------COPIA # 1-------------");
					alert("Impreso Recibo Original. Imprimir Copia 1?");
					ImpresoraBixolonSPPR300ySPPR310.imprimir(dirImpresora,plantilla,nombreImpresoraConectada,
						function(){

							// Exito imprimiendo copia 1 de Recibo de Envase
							ImpresoraEnUso = false;
                            navigator.notification.activityStop();
							$("#DevolucionEnvase").show();

						},
						function(error){
						   // Error imprimiendo copia 1 de Recibo de Envase
						   ImpresoraEnUso = false;
						   navigator.notification.activityStop();
						   $("#DevolucionEnvase").show();
						   alert(error);
                            // Registramos en el Log de error
                            var Documento = fact.tipoBoucher;
                            var Tipo = "Copia #01 ";
                            var IDFact = fact.reciboNumero;
                            var ErrorDeta = error;
                            var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
                            var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
                            LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
                            persistenciaSistema();

						}
					);


				}

				/*********************** REIMPRESIONES ***************************/
                if(fact.tipoBoucher=="FACTURACION" && ( fact.tipoImpresion=="REIMPRESION" || fact.tipoImpresion=="COPIA" ) ){

					setTimeout(function(){

						 $("#facturaProducto").show();
						  $("#facturaEnvase").show();

					}, 4000);

//                    docsimpresos.push(fact.docsimpresos);
                    ImpresoraEnUso = false;
                    navigator.notification.activityStop();

                }
				if(fact.tipoBoucher=="RECIBO" && fact.tipoImpresion=="COPIA" ){

				    var tmpcorrelativoabono = buscaCorrelativoabono();
				    docsimpresos.push(ruta + "|RECIBO|COPIA|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
				    ImpresoraEnUso = false;
				    navigator.notification.activityStop();

				}
				if(fact.tipoBoucher=="RECIBO_ENVASES" && fact.tipoImpresion=="COPIA" ){
                    console.log("ReciboEnvases Copia");
				    docsimpresos.push(fact.docsimpresos);
				    ImpresoraEnUso = false;
				    navigator.notification.activityStop();
					setTimeout(function(){

                        $("#DevolucionEnvase").show();

					}, 4000);

				}


				persistenciaSistema();

			},
			function(error){

			    console.log(" **CALLBACK DE ERROR** ");

                LigarEventosFacturar();

			    ImpresoraEnUso = false;
			    navigator.notification.activityStop();

				// ERROR IMPRIMIENDO
				alert(error);

				/*****************  FACTURAS *******************/
				if(fact.tipoBoucher=="FACTURACION"){
					// Mostramos el boton de imprimir factura
					$("#facturaProducto").show();
					 $("#facturaEnvase").show();
				    // Registramos en el Log de error
				    var Documento = fact.tipoBoucher;
				    var Tipo = fact.tipoImpresion;
				    var IDFact = fact.numeroFactura;
				    var ErrorDeta = error;
				    var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
				    var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
				    LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
				    persistenciaSistema();

				}
				else if(fact.tipoBoucher=="RECIBO" || fact.tipoBoucher=="RECIBO_ENVASES"){
				    $("#DevolucionEnvase").show();
				    // Registramos en el Log de error
				    var Documento = fact.tipoBoucher;
				    var Tipo = fact.tipoImpresion;
				    var IDFact = fact.reciboNumero;
				    var ErrorDeta = error;
				    var FechaHora = formatofecha(fechasistema()) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" +new Date().getSeconds();
				    var lineaError = Documento + " " + Tipo + " " + IDFact + " " + FechaHora + " " + ErrorDeta;
				    LogErroresImpresionDocumentos = LogErroresImpresionDocumentos + lineaError + "*";
				    persistenciaSistema();
				}


			}
			);


		}

	   }, function(error) {

	    LigarEventosFacturar();
	    alert( 'Problemas al imprimir, por favor reinicie su Impresora!');
	    console.log(error);
	    conexion = false;
	   },
	   g_socketid,
	 fact);

    }
    else{
        LigarEventosFacturar();
        alert("En este momento la impresora está en uso, favor espere unos segundos y vuelva a intentar");
    }
}

		function ejecutarImpresion(fact) {

            if(fact.impresoraEnUso=="SPP-R300" || fact.impresoraEnUso=="SPP-R310" ){
                        imprimirDocumento(fact);
            }
            else{
               		   BluetoothPlugin.disconnect(
               					function () {
               						console.log("Se ha desconectado la impresora.");
               					},
               					function (error) {
               						console.log("Error: " + error + "\nNo se ha podido desconectar la impresora");
               					},
               					g_socketid
               				);
               	   BluetoothPlugin.connect(
               	    function(socketId) {
               	      g_socketid = socketId;
               	      console.log( 'Conexion a impresora Socket-id: ' + g_socketid );
               	      imprimirDocumento(fact);
               	    },
               	    function(error)
               	    {
               	     alert( 'Error al conectarse a la impresora: ' + error );
               	     conexion = false;
               	    },
               	    dirImpresora, uidDisp
               	   );
            }
    	}