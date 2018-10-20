//var version="A-2016.06.02B";

var d = new Date();
var curr_date = (d.getDate()).toString();
var curr_month = (d.getMonth() + 1).toString();
var curr_year = (d.getFullYear()).toString();
var curr_hour = (d.getHours()).toString();
var curr_min = (d.getMinutes()).toString();
var contadorArchivos;

var dias = new Array("Clientes temporales", "Lunes Semana 1", "Martes Semana 1", "Miercoles Semana 1", "Jueves Semana 1", "Viernes Semana 1", "Sabado Semana 1", "Domingo Semana 1", 
											"Lunes Semana 2", "Martes Semana 2", "Miercoles Semana 2", "Jueves Semana 2", "Viernes Semana 2", "Sabado Semana 2", "Domingo Semana 2" );
var motivosCambios = new Array("Deterioro", "Picos", "Retiro", "Otros");
var marcaEnvases = new Array("FDC", "RP");


var Nombre_Metodos = ["ObtenerDocumentosPendientes","ObtenerSKUSPCOR","ObtenerAsignacionImpresora","ObtenerPreciosEnvase","ObtenerFacturaSiguiente","ObtenerReciboSiguiente","ObtenerTasaCambio","ObtenerCargaInicialRuta","ObtenerClientes","ObtenerTipoPagos","Obtener_Bancos","ObtenerBancosPorRuta"]
var Nombre_Archivo_bajados = ["docspendientes.txt","productos.txt","impresora.txt", "precioenvases.txt","correlativo.txt","correlativoabono.txt","tipocambio.txt","cargainicial.txt","clientes.txt","Tipo_Pago","bancos","bancosxruta"]



var servidor = "C:/autoventa/";//"http://127.0.0.1/~estuardomorales/SER/entrega/";
var local = "file:///mnt/sdcard/autoventa/";

var ruta;
var listaclientes;
var llavefecha;
var fecha;
var tipoCambio;
var correlativo;
var correlativoabono;

var clienteenuso = "";
var facturaenuso = "";
var fechafacturaenuso = "";
var montofacturaenuso = "";
var saldofacturaenuso = "";
var tipofacturaenuso = "";

var productoenuso = "";
var numpedido = "";
var numcambio = "";
var numdevolucion = "";

var productos = new Array();
var docspendientes = new Array();
var nuevosdocspendientes = new Array();
var precioenvases = new Array();
var abonos = new Array();
var bancos = new Array();
var pedidos = new Array();
var cambios = new Array();
var motivosnoventa = new Array();
var devolucionenvases = new Array();
var devoluciones = new Array();
var facturas = new Array();
var confirmapedidos = new Array();
var datosclientetmp = new Array();
var archivosGrabados = new Array();
var finaldia = new Array();
var docsimpresos = new Array();
var facturasimpresas = new Array();
var devolucionesRuta = new Array();
var cambiosRuta = new Array();
var abonosRealizados = new Array();
var inventario = new Array();
var devolucionenvasesRuta = new Array();

var envasespedidos = 0.0;
var envasesdevueltos = 0.0;
var saldoenvases = 0.0;
var lineaspedido = 0;

var totalAbonosEfectivosCordobas = 0;
var totalAbonosEfectivosDolares = 0;
var totalAbonosCkCordobas = 0;
var totalAbonosCkDolares = 0;

var abonoMontoInicial = 0;
var abonoSaldoActual = 0;
var abonoMonto = 0;
var abonoNuevoSaldo = 0;
var montoAbonos = 0;

var kilometrajei = 0;
var kFinal = 0;
var diaTrabajo = d.getDay();


var clienteContado = 0;
var limiteExcedido = 0;
var limiteExcedidoEnv = 0;
var saldoEnUso = 0.0;

var pagoBloqueado = 0;
var porcAprobado = 0.25;


var clienteCorporativo = "";


//Nuevas Variables 
var tipos_de_pago = new Array()
var ProcesandoAbono= false;


//Varible para manejar los numero de las facturas manual
var FCLiquido="";
var FCEnvase="";
var cadena_cero="000000";

/*Funcion para escribir archivo....*/
function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            //readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}


function reiniciaTodo() {
	LogErroresImpresionDocumentos = "";
	logErrores=[];
	ruta = "";
	listaclientes = "";
	llavefecha = "";
	fecha = "";
	tipoCambio = "";
	correlativo = "";
	correlativoabono = "";
	clienteenuso = "";
	facturaenuso = "";
	fechafacturaenuso = "";
	montofacturaenuso = "";
	saldofacturaenuso = "";
	productoenuso = "";
	numpedido = "";
	numcambio = "";
	numdevolucion = "";
	productos = new Array();
	docspendientes = new Array();
	nuevosdocspendientes = new Array();
	precioenvases = new Array();
	abonos = new Array();
	bancos = new Array();
	pedidos = new Array();
	cambios = new Array();
	motivosnoventa = new Array();
	devolucionenvases = new Array();
	devoluciones = new Array();
	facturas = new Array();
	confirmapedidos = new Array();
	datosclientetmp = new Array();
	archivosGrabados = new Array();
	finaldia = new Array();
	docsimpresos = new Array();
	facturasimpresas = new Array();
	devolucionesRuta = new Array();
	cambiosRuta = new Array();
	abonosRealizados = new Array();
	inventario = new Array();
	envasespedidos = 0.0;
	envasesdevueltos = 0.0;
	saldoenvases = 0.0;
	lineaspedido = 0;
	totalAbonosEfectivosCordobas = 0;
	totalAbonosEfectivosDolares = 0;
	totalAbonosCkCordobas = 0;
	totalAbonosCkDolares = 0;
	abonoMontoInicial = 0;
	abonoSaldoActual = 0;
	abonoMonto = 0;
	abonoNuevoSaldo = 0;
	kilometrajei = 0;
	kFinal = 0;
	diaTrabajo = 0;
	pagoBloqueado = 0;
	devolucionenvasesRuta = new Array();
}


function finalizaTodo() {
	ruta = "";
	listaclientes = "";
	llavefecha = "";
	fecha = "";
	tipoCambio = "";
	correlativo = "";
	correlativoabono = "";
	clienteenuso = "";
	facturaenuso = "";
	fechafacturaenuso = "";
	montofacturaenuso = "";
	saldofacturaenuso = "";
	productoenuso = "";
	numpedido = "";
	numcambio = "";
	numdevolucion = "";
	productos = new Array();
	docspendientes = new Array();
	nuevosdocspendientes = new Array();
	precioenvases = new Array();
	abonos = new Array();
	bancos = new Array();
	pedidos = new Array();
	//cambios = new Array();
	//motivosnoventa = new Array();
	//devolucionenvases = new Array();
	//devoluciones = new Array();
	//facturas = new Array();
	confirmapedidos = new Array();
	datosclientetmp = new Array();
	//archivosGrabados = new Array();
	finaldia = new Array();
	docsimpresos = new Array();
	facturasimpresas = new Array();
	devolucionesRuta = new Array();
	cambiosRuta = new Array();
	//abonosRealizados = new Array();
	inventario = new Array();
	envasespedidos = 0.0;
	envasesdevueltos = 0.0;
	saldoenvases = 0.0;
	lineaspedido = 0;
	totalAbonosEfectivosCordobas = 0;
	totalAbonosEfectivosDolares = 0;
	totalAbonosCkCordobas = 0;
	totalAbonosCkDolares = 0;
	abonoMontoInicial = 0;
	abonoSaldoActual = 0;
	abonoMonto = 0;
	abonoNuevoSaldo = 0;
	kilometrajei = 0;
	kFinal = 0;
	diaTrabajo = 0;
	pagoBloqueado = 0;

    //Al Finalizar el dia borramos la tabla de facturas y limpiamos el archivo generado para le backup
   db_smart_sales.metodos.limpiar_tabla("facturas")
   grabatmp("facturas_web_sql", new Array());

}

function onBackKeyDown() {

}
/*
function grabartodo() {
    navigator.notification.activityStart("Grabando datos", "Por favor espere...");
    iniciaGrabado=calculatstamp();
    grabaArchivo("backup_facturas", facturas);

    //Obtiene las lineas de la facturas de la base de datos local
    Crear_archivo_factura("facturas")

    
    //Graba log de errores...
    grabaArchivo("DST_LOG_ERRORES", logErrores);
    

    
    //Graba log de errores...
    grabaArchivo("DST_LOG_ERRORES", logErrores);


    grabaArchivo("motivosnovta", motivosnoventa);
    grabaArchivo("devolucionenvases", devolucionenvasesRuta);
    grabaArchivo("devoluciones", devolucionesRuta);
    grabaArchivo("cambios", cambiosRuta);

    grabaArchivo("abonos", abonosRealizados);
    grabaArchivo("findedia", finaldia);
    grabaArchivo("docsimpresos", docsimpresos);

    navigator.notification.activityStop();
}
//*/
function persistenciaInicial(){
	grabatmp("2", listaclientes);
	grabatmp("f", productos);
}

function persistenciaSistema() {
    navigator.notification.activityStart("Grabando Datos", "Por favor espere...");
    grabatmp("1", ruta);
   	
   	//grabatmp("2", listaclientes);
    //grabar log de errores...
    grabatmp("errores", logErrores);
    
    //grabar log de errores...
    grabatmp("errores", logErrores);
    grabatmp("erroresimpresion", LogErroresImpresionDocumentos);
    
    grabatmp("3", llavefecha);
    grabatmp("4", fecha);
    grabatmp("5", tipoCambio);
    grabatmp("6", correlativo);
    
    grabaArchivoBajado("correlativo.txt",correlativo);

    grabatmp("7", clienteenuso);
    grabatmp("8", facturaenuso);
    grabatmp("9", fechafacturaenuso);
    grabatmp("0", montofacturaenuso);
    grabatmp("a", saldofacturaenuso);
    grabatmp("b", productoenuso);
    grabatmp("c", numpedido);
    grabatmp("d", numcambio);
    grabatmp("e", numdevolucion);

    //grabatmp("f", productos);
    grabatmp("g", docspendientes);
    grabatmp("h", nuevosdocspendientes);
    grabatmp("i", precioenvases);
    grabatmp("j", abonos);
    grabatmp("k", bancos);
    grabatmp("l", pedidos);
    grabatmp("m", cambios);
    grabatmp("n", motivosnoventa);
    grabatmp("o", devolucionenvases);
    grabatmp("p", devoluciones);
    grabatmp("q", facturas);
    grabatmp("r", confirmapedidos);
    grabatmp("s", datosclientetmp);
    grabatmp("t", archivosGrabados);
    grabatmp("u", finaldia);
    grabatmp("v", docsimpresos);
    grabatmp("w", facturasimpresas);
    grabatmp("x", devolucionesRuta);
    grabatmp("y", cambiosRuta);

    grabatmp("z", envasespedidos);
    grabatmp("aa", envasesdevueltos);
    grabatmp("bb", saldoenvases);
    grabatmp("cc", lineaspedido);

    grabatmp("dd", totalAbonosEfectivosCordobas);
    grabatmp("ee", totalAbonosEfectivosDolares);
    grabatmp("ff", totalAbonosCkCordobas);
    grabatmp("gg", totalAbonosCkDolares);

    grabatmp("hh", abonoMontoInicial);
    grabatmp("ii", abonoSaldoActual);
    grabatmp("jj", abonoMonto);
    grabatmp("kk", abonoNuevoSaldo);

    grabatmp("ll", kilometrajei);
    grabatmp("mm", kFinal);
    grabatmp("nn", diaTrabajo);
    grabatmp("oo", abonosRealizados);
    grabatmp("pp", inventario);
    grabatmp("qq", devolucionenvasesRuta);
    grabatmp("rr", correlativoabono);
    
    grabaArchivoBajado("correlativoabono.txt",correlativoabono);
    
    
    /*Para manejo de limite de Credito*/
    grabatmp("ss", clienteContado);
    grabatmp("tt", limiteExcedido);
    grabatmp("uu", limiteExcedidoEnv);
    grabatmp("vv", saldoEnUso);
    grabatmp("ww", pagoBloqueado);
    
    grabatmp("xx", clienteCorporativo);
    

    
    navigator.notification.activityStop();

}

function recuperaDatosSOS(){
	console.log("=====  SOS INICIADO ========");
	
	navigator.notification.activityStart("SOS Recuperando Datos", "Por favor espere...");
	 ruta = 'A05';
	 llavefecha = "20131104";
	 kilometrajei = 1;
	 facturas = leetmp("q");
	 abonosRealizados = leetmp("oo");
     inventario = leetmp("pp");
     motivosnoventa = leetmp("n");
     devolucionenvasesRuta = leetmp("qq");
     cambiosRuta = leetmp("y");
	 docsimpresos = leetmp("v");	
	 
	navigator.notification.activityStop(); 
	
	console.log("Termino la Lectura de los DAtos");
}

/*
function recuperaDatos(Flag) {
    navigator.notification.activityStart("Recuperando Datos", "Por favor espere...");

    
    //recupera el log de errores...
    logErrores=leetmp("errores");
    

    //recupera el log de errores...
    logErrores=leetmp("errores");

    ruta = leetmp("1");
    listaclientes = leetmp("2");
    llavefecha = leetmp("3");
    fecha = leetmp("4");
    tipoCambio = leetmp("5");
    correlativo = leetmp("6");

    clienteenuso = leetmp("7");
    facturaenuso = leetmp("8");
    fechafacturaenuso = leetmp("9");
    montofacturaenuso = leetmp("0");
    saldofacturaenuso = leetmp("a");
    productoenuso = leetmp("b");
    numpedido = leetmp("c");
    numcambio = leetmp("d");
    numdevolucion = leetmp("e");

    productos = leetmp("f");
    docspendientes = leetmp("g");
    nuevosdocspendientes = leetmp("h");
    precioenvases = leetmp("i");
    abonos = leetmp("j");
    bancos = leetmp("k");
    pedidos = leetmp("l");
    cambios = leetmp("m");
    motivosnoventa = leetmp("n");
    devolucionenvases = leetmp("o");
    devoluciones = leetmp("p");
    facturas = leetmp("q");
    confirmapedidos = leetmp("r");
    datosclientetmp = leetmp("s");
    archivosGrabados = leetmp("t");
    finaldia = leetmp("u");
    docsimpresos = leetmp("v");
    facturasimpresas = leetmp("w");
    devolucionesRuta = leetmp("x");
    cambiosRuta = leetmp("y");

    envasespedidos = leetmp("z");
    envasesdevueltos = leetmp("aa");
    saldoenvases = leetmp("bb");
    lineaspedido = leetmp("cc");

    totalAbonosEfectivosCordobas = leetmp("dd");
    totalAbonosEfectivosDolares = leetmp("ee");
    totalAbonosCkCordobas = leetmp("ff");
    totalAbonosCkDolares = leetmp("gg");

    abonoMontoInicial = leetmp("hh");
    abonoSaldoActual = leetmp("ii");
    abonoMonto = leetmp("jj");
    abonoNuevoSaldo = leetmp("kk");

    kilometrajei = leetmp("ll");
    kFinal = leetmp("mm");
    diaTrabajo = leetmp("nn");
    abonosRealizados = leetmp("oo");
    inventario = leetmp("pp");
    devolucionenvasesRuta = leetmp("qq");
    correlativoabono = leetmp("rr");
    
    //Leemos las variables para Limite de Credito Excedido
    clienteContado = leetmp("ss");
    limiteExcedido = leetmp("tt");
    limiteExcedidoEnv = leetmp("uu");
    saldoEnUso = leetmp("vv");
    pagoBloqueado = leetmp("ww");
    
	clienteCorporativo = leetmp("xx");

   //leebancos();

    localStorage.setItem("Estado", "Corriendo");

    $("#numeroderuta").html(ruta);
    $("#contieneTC").html("TC:" + tipoCambio);
    $("#btnIniciodia").addClass('ui-disabled');

    //Recupera los datos en el archivo generado con web sql solamente cuando acciona el boton de recuperar informacion
    if (Flag){
        var data= leetmp("facturas_web_sql")
        if(data.length > 0){
            db_smart_sales.metodos.limpiar_tabla("facturas")
        }
        for (var i = 0; i < data.length; i++) {
            var datos = data[i]
             db_smart_sales.metodos.insertar_factura(datos.ID_Cliente,datos.SKU,datos.Descripcion,datos.Conteo,datos.Precio_Unitario,datos.Precio_Envase,datos.Familia,datos.Exento,datos.Linea_Pedido)
        }
    }
    
    navigator.notification.activityStop();

    verClientes();
     
    if(pagoBloqueado == 1)
    {
    	var cliente = buscadatosCliente(clienteenuso);
    	
    	if(cliente[2] == 'CONTADO')
	    {
	    	var posicion = obtenerPosicionCliente(clienteenuso);    	
	    	if(posicion != -1)
	    	{
	    		cargainfocliente(posicion);
                cargadocscliente(clienteenuso);
                $("#btnInfoClientePagos").hide();
	    	}
	    }else
	    {
	    	pagoBloqueado = 0;
	    }
    	 
    	
    }
}
//*/

function recuperaDatos(Flag) {
    navigator.notification.activityStart("Recuperando Datos", "Por favor espere...");
    var directorio="/mnt/sdcard/autoventa/tmp/";
    var lecturaficheros=  $.when(lecturaFicherosTxt(directorio,"0.txt")
    		,lecturaFicherosTxt(directorio,"1.txt")
    		,lecturaFicherosTxt(directorio,"2.txt")
    		,lecturaFicherosTxt(directorio,"3.txt")
    		,lecturaFicherosTxt(directorio,"4.txt")
    		,lecturaFicherosTxt(directorio,"5.txt")
    		,lecturaFicherosTxt(directorio,"6.txt")
    		,lecturaFicherosTxt(directorio,"7.txt")
    		,lecturaFicherosTxt(directorio,"8.txt")
    		,lecturaFicherosTxt(directorio,"9.txt")
    		,lecturaFicherosTxt(directorio,"a.txt")
			,lecturaFicherosTxt(directorio,"b.txt")
			,lecturaFicherosTxt(directorio,"c.txt")
			,lecturaFicherosTxt(directorio,"d.txt")
			,lecturaFicherosTxt(directorio,"e.txt")
			,lecturaFicherosTxt(directorio,"f.txt")
			,lecturaFicherosTxt(directorio,"g.txt")
			,lecturaFicherosTxt(directorio,"h.txt")
			,lecturaFicherosTxt(directorio,"i.txt")
			,lecturaFicherosTxt(directorio,"j.txt")
			,lecturaFicherosTxt(directorio,"k.txt")
			,lecturaFicherosTxt(directorio,"l.txt")
			,lecturaFicherosTxt(directorio,"m.txt")
			,lecturaFicherosTxt(directorio,"n.txt")
			,lecturaFicherosTxt(directorio,"o.txt")
			,lecturaFicherosTxt(directorio,"p.txt")
			,lecturaFicherosTxt(directorio,"q.txt")
			,lecturaFicherosTxt(directorio,"r.txt")
			,lecturaFicherosTxt(directorio,"s.txt")
			,lecturaFicherosTxt(directorio,"t.txt")
			,lecturaFicherosTxt(directorio,"u.txt")
			,lecturaFicherosTxt(directorio,"v.txt")
			,lecturaFicherosTxt(directorio,"w.txt")
			,lecturaFicherosTxt(directorio,"x.txt")
			,lecturaFicherosTxt(directorio,"y.txt")
			,lecturaFicherosTxt(directorio,"z.txt")
			,lecturaFicherosTxt(directorio,"aa.txt")
			,lecturaFicherosTxt(directorio,"bb.txt")
			,lecturaFicherosTxt(directorio,"cc.txt")
			,lecturaFicherosTxt(directorio,"dd.txt")
			,lecturaFicherosTxt(directorio,"ee.txt")
			,lecturaFicherosTxt(directorio,"ff.txt")
			,lecturaFicherosTxt(directorio,"gg.txt")
			,lecturaFicherosTxt(directorio,"hh.txt")
			,lecturaFicherosTxt(directorio,"ii.txt")
			,lecturaFicherosTxt(directorio,"jj.txt")
			,lecturaFicherosTxt(directorio,"kk.txt")
			,lecturaFicherosTxt(directorio,"ll.txt")
			,lecturaFicherosTxt(directorio,"mm.txt")
			,lecturaFicherosTxt(directorio,"nn.txt")
			,lecturaFicherosTxt(directorio,"oo.txt")
			,lecturaFicherosTxt(directorio,"pp.txt")
			,lecturaFicherosTxt(directorio,"qq.txt")
			,lecturaFicherosTxt(directorio,"rr.txt")
			,lecturaFicherosTxt(directorio,"ss.txt")
			,lecturaFicherosTxt(directorio,"tt.txt")
			,lecturaFicherosTxt(directorio,"uu.txt")
			,lecturaFicherosTxt(directorio,"vv.txt")
			,lecturaFicherosTxt(directorio,"ww.txt")
			,lecturaFicherosTxt(directorio,"xx.txt")
			,lecturaFicherosTxt(directorio,"erroresimpresion.txt")
			,lecturaFicherosTxt("/mnt/sdcard/autoventa/","impresora.txt")
            );

    lecturaficheros.done(function(){
		console.log('Exito');
		localStorage.setItem("Estado", "Corriendo");
		$("#numeroderuta").html(ruta);
	    $("#contieneTC").html("TC:" + tipoCambio);
	    $("#btnIniciodia").addClass('ui-disabled');

	    //Define impresora...
        var ContenidoArchivoImpresora=dirImpresora;
        dirImpresora = ContenidoArchivoImpresora.split("_")[0];
        nombreImpresoraConectada = ContenidoArchivoImpresora.split("_")[1];
        if( typeof dirImpresora === 'undefined'){
            alert('No hay datos de impresora: MAC!');
         }else{
             if( typeof nombreImpresoraConectada==='undefined'){
                 nombreImpresoraConectada='N/D';
                 muestraImpresoraConectada();
             }else{
                 muestraImpresoraConectada();
             }
         }
	    //Recupera los datos en el archivo generado con web sql solamente cuando acciona el boton de recuperar informacion
	    if (Flag){
	    	lecturaFicherosTxt(directorio,"facturas_web_sql.txt");
	    }

	    navigator.notification.activityStop();
	    verClientes();

	    if(pagoBloqueado == 1)
	    {
	        var cliente = buscadatosCliente(clienteenuso);
	        if(cliente[2] == 'CONTADO')
	        {
	            var posicion = obtenerPosicionCliente(clienteenuso);
	            if(posicion != -1)
	            {
	                cargainfocliente(posicion);
                    cargadocscliente(clienteenuso);
                    $("#btnInfoClientePagos").hide();
	            }
	        }else
	        {
	            pagoBloqueado = 0;
	        }
	    }
	});

    lecturaficheros.fail(function(){});
}

function recuperaDatosExterno() {
    navigator.notification.activityStart("Recuperando Datos Externos", "Por favor espere...");

    ruta = leetmp2("1");
    listaclientes = leetmp2("2");
    llavefecha = leetmp2("3");
    fecha = leetmp2("4");
    tipoCambio = leetmp2("5");
    correlativo = leetmp2("6");

    clienteenuso = leetmp2("7");
    facturaenuso = leetmp2("8");
    fechafacturaenuso = leetmp2("9");
    montofacturaenuso = leetmp2("0");
    saldofacturaenuso = leetmp2("a");
    productoenuso = leetmp2("b");
    numpedido = leetmp2("c");
    numcambio = leetmp2("d");
    numdevolucion = leetmp2("e");

    productos = leetmp2("f");
    docspendientes = leetmp2("g");
    nuevosdocspendientes = leetmp2("h");
    precioenvases = leetmp2("i");
    abonos = leetmp2("j");
    bancos = leetmp2("k");
    pedidos = leetmp2("l");
    cambios = leetmp2("m");
    motivosnoventa = leetmp2("n");
    devolucionenvases = leetmp2("o");
    devoluciones = leetmp2("p");
    facturas = leetmp2("q");
    confirmapedidos = leetmp2("r");
    datosclientetmp = leetmp2("s");
    archivosGrabados = leetmp2("t");
    finaldia = leetmp2("u");
    docsimpresos = leetmp2("v");
    facturasimpresas = leetmp2("w");
    devolucionesRuta = leetmp2("x");
    cambiosRuta = leetmp2("y");

    envasespedidos = leetmp2("z");
    envasesdevueltos = leetmp2("aa");
    saldoenvases = leetmp2("bb");
    lineaspedido = leetmp2("cc");

    totalAbonosEfectivosCordobas = leetmp2("dd");
    totalAbonosEfectivosDolares = leetmp2("ee");
    totalAbonosCkCordobas = leetmp2("ff");
    totalAbonosCkDolares = leetmp2("gg");

    abonoMontoInicial = leetmp2("hh");
    abonoSaldoActual = leetmp2("ii");
    abonoMonto = leetmp2("jj");
    abonoNuevoSaldo = leetmp2("kk");

    kilometrajei = leetmp2("ll");
    kFinal = leetmp2("mm");
    diaTrabajo = leetmp2("nn");
    abonosRealizados = leetmp2("oo");
    inventario = leetmp2("pp");
    devolucionenvasesRuta = leetmp2("qq");
    correlativoabono = leetmp2("rr");

/*Leemos las variables para Limite de Credito Excedido*/
    clienteContado = leetmp("ss");
    limiteExcedido = leetmp("tt");
    limiteExcedidoEnv = leetmp("uu");
    saldoEnUso = leetmp("vv");
    pagoBloqueado = leetmp("ww");
    clienteCorporativo = leetmp("xx");
    
    //leebancos();

    localStorage.setItem("Estado", "Corriendo");

    $("#numeroderuta").html(ruta);
    $("#contieneTC").html("TC:" + tipoCambio);
    $("#btnIniciodia").addClass('ui-disabled');

    navigator.notification.activityStop();
    verClientes();
}

function grabaArchivo(arch, cont) {
    if (cont.length > 0) {
        var path = "/mnt/sdcard/autoventa/salida/" + ruta + "_" + arch + "_" + llavefecha + ".txt";
        var pathPlugin="/autoventa/salida/" + ruta + "_" + arch + "_" + llavefecha + ".txt"
        //var path2 = "/mnt/sdcard/external_sd/SER/salida/"+llavefecha+"/" + ruta + "_" + arch + "_" + iniciaGrabado + ".txt";
        
        var temp2;

        var tmp;

     //   var writer = new FileWriter(path);
     //   var writer2 = new FileWriter(path2);
        
        var sb = new StringBuilder();

        for ( i = 0; i < cont.length; i++) {

            if (i == cont.length - 1) {

                if (arch == "pedidos" || arch == "devoluciones" || arch == "cambios" || arch == "backup_facturas") {
                    tmp = (cont[i].toString());
                    sb.append(tmp.replace(/\,/gi, "|"));
                } else {
                    sb.append(cont[i]);
                }

            } else {
                if (arch == "pedidos" || arch == "devoluciones" || arch == "cambios" || arch == "backup_facturas") {
                    tmp = (cont[i].toString());
                    sb.append(tmp.replace(/\,/gi, "|") + "\n");
                } else {
                    sb.append(cont[i] + "\n");
                }
            }

        }
        tmpremoto = "" + ruta + "_" + arch + "_" + llavefecha + ".txt";
        var tmpArchivos = new Array(path, tmpremoto);
        // console.log(archivosGrabados);
        archivosGrabados.push(tmpArchivos);

        temporal = "\nCHECKSUM:" + MD5(sb.toString());
        sb.append(temporal);
        temp2 = sb.toString();
    //  writer.write(temp2, false);
        /*Graba con Plugin*/
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

            console.log('file system open: ' + fs.name);
            fs.root.getFile(pathPlugin, { create: true, exclusive: false }, function (fileEntry) {

                console.log("fileEntry is file?" + fileEntry.isFile.toString());
                // fileEntry.name == 'someFile.txt'
                //fileEntry.fullPath == '/mnt/sdcard/autoventa/someFile.txt'
                writeFile(fileEntry, temp2);

            }, function(error){console.log(error);});

        }, function(){console.log("error");});

    }
}

function Crear_archivo_factura(nombre_archivo){

       var sb = new StringBuilder();
       var path = "/mnt/sdcard/autoventa/salida/" + ruta + "_" + nombre_archivo + "_" + llavefecha + ".txt";
       var pathPlugin="/autoventa/salida/" + ruta + "_" + nombre_archivo + "_" + llavefecha + ".txt";
       var  tmpremoto = "" + ruta + "_" + nombre_archivo + "_" + llavefecha + ".txt";

         //Valida si hubo errores...
         if(logErrores.length>0){
                //alert('No se enviara archivo de facturas');
               return;
         }
         else{
            //alert('Archivo de facturas generado con exito');
         }


        db_smart_sales.metodos.Obtener_Datos_Facturas(function (item) {
                for (var i = 0; i < item.rows.length; i++) {
                    if(i == item.rows.length -1){
                        sb.append(item.rows.item(i).ID_Cliente +"|"+ item.rows.item(i).SKU +"|"+ item.rows.item(i).Descripcion 
                        +"|"+ item.rows.item(i).Conteo +"|"+ item.rows.item(i).Precio_Unitario +"|"+ item.rows.item(i).Precio_Envase.toFixed(4) 
                        +"|"+ item.rows.item(i).Familia  +"|"+ item.rows.item(i).Exento  +"|"+ item.rows.item(i).Linea_Pedido);
                    }else{
                        sb.append(item.rows.item(i).ID_Cliente +"|"+ item.rows.item(i).SKU +"|"+ item.rows.item(i).Descripcion 
                        +"|"+ item.rows.item(i).Conteo +"|"+ item.rows.item(i).Precio_Unitario +"|"+ item.rows.item(i).Precio_Envase.toFixed(4) 
                        +"|"+ item.rows.item(i).Familia  +"|"+ item.rows.item(i).Exento  +"|"+ item.rows.item(i).Linea_Pedido  + "\n");
                    }
           
                }
                if(item.rows.length > 0 ){
        //          var writer = new FileWriter(path);
                    //var pathPlugin="/autoventa/salida/" + ruta + "_" + nombre_archivo + "_" + llavefecha + ".txt";
                    var tmpArchivos = new Array(path, tmpremoto);
                    archivosGrabados.push(tmpArchivos);

                    var temporal = "\nCHECKSUM:" + MD5(sb.toString());
                    sb.append(temporal);
                    var temp2 = sb.toString();
        //          writer.write(temp2, false);
                    //Graba con Plugin...
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

                        console.log('file system open: ' + fs.name);
                        fs.root.getFile(pathPlugin, { create: true, exclusive: false }, function (fileEntry) {

                            console.log("fileEntry is file?" + fileEntry.isFile.toString());
                            // fileEntry.name == 'someFile.txt'
                            //fileEntry.fullPath == '/mnt/sdcard/autoventa/someFile.txt'
                            writeFile(fileEntry, temp2);

                        }, function(error){console.log(error);});

                    }, function(){console.log("error");});
                }
        })
}

// load csv este lo baja de un servidor aqui tenemos que dirigrlo a un
// archivo
// en el sd

function leetmp(archivo) {
   try {
        var reqServer;
        var errMessage;
        var csvtext;
        var ubicacion;
        reqServer = "file:///mnt/sdcard/autoventa/tmp/" + archivo + ".txt";
        var request = new XMLHttpRequest();
        request.open("GET", reqServer, false);
        request.send();
        csvtext = request.responseText;
    } catch (ex) {
        return null;
    }
    return JSON.parse(csvtext);
    
 //  return JSON.parse(localStorage.getItem(archivo));
}

function leetmp2(archivo) {
    try {
        var reqServer;
        var errMessage;
        var csvtext;
        var ubicacion;
        reqServer = "file:///mnt/sdcard/external_sd/SER/tmp/" + archivo + ".txt";
        var request = new XMLHttpRequest();
        request.open("GET", reqServer, false);
        request.send();
        csvtext = request.responseText;
    } catch (ex) {
        return null;
    }
    return JSON.parse(csvtext);
}

/*
function getcsv(archivo) {
    try {
        var reqServer;
        var errMessage;
        var csvtext;
        var ubicacion;
        var plataforma = navigator.platform;
        if (plataforma.search("nux") != -1) {
            ubicacion = local;
        } else {
            ubicacion = servidor;
        }
        ;
        reqServer = ubicacion + archivo;
        var request = new XMLHttpRequest();
        request.open("GET", reqServer, false);
        request.send();
        csvtext = request.responseText;
    } catch (ex) {
        alert("Failed to get data from the server. Please check your data connection and try again. Error Code : " + ex);
        return null;
    }
    if (csvtext.length == 0) {
        return new Array();
    } else {
        return csvtext.split("\n");
    }
}
//*/



function grabatmp(archivo, cont) {
 // var path = "/mnt/sdcard/autoventa/tmp/" + archivo + ".txt";
    var path = "/autoventa/tmp/" + archivo + ".txt";
    var temp2;
  //  var writer2 = new FileWriter("/mnt/sdcard/external_sd/SER/tmp/" + archivo + ".txt");
  //  var writer = new FileWriter(path);
    temp2 = JSON.stringify(cont);

    //Graba archivo con plugin...
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile(path, { create: true, exclusive: false }, function (fileEntry) {

            console.log("fileEntry is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            //fileEntry.fullPath == '/mnt/sdcard/autoventa/someFile.txt'
            writeFile(fileEntry, temp2);

        }, function(error){console.log(error);});

    }, function(){console.log("error");});

  // 	writer.write(temp2, false);
    //localStorage.setItem(archivo,temp2);
  //  writer2.write(temp2, false);
}

// formatodinero2fgrab
function formatoDinero(num) {
    var p = Number(num).toFixed(2).split(".");
    return "" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

// quitar espacios

function quitartodo(numero) {
    var temp = numero.toString();
    var sinespacios = temp.replace(" ", "");
    var sinsuma = sinespacios.replace("+", "");
    var sinnegativos = sinsuma.replace("-", "");
    var sinpunto = sinnegativos.replace(".", "");
    var sinasterisco = sinpunto.replace("*", "");
    var sinparentesis = sinasterisco.replace(")", "").replace("(", "");
    return sinparentesis;
}

// formatodinero1
Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep) {
    var n = this, c = isNaN(decimals) ? 2 : Math.abs(decimals), d = decimal_sep || '.', t = ( typeof thousands_sep === 'undefined') ? ',' : thousands_sep, sign = (n < 0) ? '-' : '', i = parseInt( n = Math.abs(n).toFixed(c)) + '', j = (( j = i.length) > 3) ? j % 3 : 0;
    return sign + ( j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + ( c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

// handleCsv
String.prototype.splitCSV = function(sep) {
    for (var foo = this.split( sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
        if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
            if (( tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
            } else if (x) {
                foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
            } else
                foo = foo.shift().split(sep).concat(foo);
        } else
            foo[x].replace(/""/g, '"');
    }
    return foo;
};

// logica sistema

// logica ventas/ pantallas
function iniciaSistema() {
    // console.log("inicia sistema");
    // borraDirectorio("/mnt/sdcard/autoventa/");
    // borraDirectorio("/mnt/sdcard/autoventa/salida/");
    // creaDirectorio("/mnt/sdcard/autoventa/tmp/");
    // console.log("creo directorios");

    $.mobile.changePage("#page5");
}



function kInicial() {
    generarFecha();
    fecha = curr_date + "/" + curr_month + "/" + curr_year;
    llavefecha = curr_year + "" + curr_month + "" + curr_date;
    temp = $('#kinicial').val();
    kilometraje = aNumero(temp);
    if (kilometraje == 0) {
        window.alert("Debe ingresar\nun kilometraje válido")
    } else {


        if(parseFloat(kilometraje)<0 || parseFloat(kilometraje)>9999999){
            window.alert("Debe ingresar\nun kilometraje válido");
            return;
        }

        if (kilometrajei == 0) {
            //cargaprecioEnvases();
            // //console.log(precioenvases);
            //ruta = getcsv("ruta.txt")[0];

        	lecturaFicherosTxt("/mnt/sdcard/autoventa/","precioenvases.txt");
			lecturaFicherosTxt("/mnt/sdcard/autoventa/","ruta.txt").done(function(){
				$("#numeroderuta").html(ruta);
	    	});

            lecturaFicherosTxt("/mnt/sdcard/autoventa/","impresora.txt").done(function(){
                var ContenidoArchivoImpresora=dirImpresora;
                dirImpresora = ContenidoArchivoImpresora.split("_")[0];
                nombreImpresoraConectada = ContenidoArchivoImpresora.split("_")[1];
                if( typeof dirImpresora === 'undefined'){
                    alert('No hay datos de impresora: MAC!');
                }else{
                    if( typeof nombreImpresoraConectada==='undefined'){
                        nombreImpresoraConectada='N/D';
                        muestraImpresoraConectada();
                    }else{
                        muestraImpresoraConectada();
                    }
                }
            });

            kilometrajei = kilometraje;
            x = document.getElementsByClassName("encabezado");
            $(x).html(dias[diaTrabajo]);
            $('#kinicial').val("");
            bajaClientes();
           // $("#numeroderuta").html(ruta);
        } else {
            alert("No puede volver a ingresar kilometraje");
            $.mobile.changePage("#page1");
        }
    }
}

/*
function cargaprecioEnvases() {
    tmp = getcsv("precioenvases.txt");
    for ( i = 0; i < tmp.length; i++) {
        linea = tmp[i].split("|");
        precioenvases.push(linea[1]);
        // console.log(linea[1]);
    }

}
//*/

function calculatotalventas(modo) {
    var temp = 0;
    for ( i = 0; i < facturas.length; i++) {
        linea = facturas[i][1].split("|");
        switch(Number(modo)) {
            case 1:
                if (facturas[i][0][6] != "1D") {
                    temp = Number(temp) + Number(linea[4]);
                }
                break;
            case 2:
                if (facturas[i][0][6] == "1D") {
                    temp = Number(temp) + Number(linea[4]);
                }
                break;

        }
    }
    return formatoDinero(temp);
}

function calculatotaldepositos() {

    totalAbonosCordobas = 0;
    totalAbonosMnCordobas = 0;
    cuentaMinutas = 0;

    for ( i = 0; i < abonosRealizados.length; i++) {
        var tmpabono = abonosRealizados[i].split("|");
        switch (Number(tmpabono[2])) {
            case 1:
                totalAbonosCordobas += Number(tmpabono[4]);
                break;
            case 2:
                totalAbonosCordobas += Number(tmpabono[4]);
                break;
            case 3:
                totalAbonosCordobas += Number(tmpabono[4]);
                break;
            case 4:
                totalAbonosCordobas += Number(tmpabono[4]);
                break;
            case 5:
                totalAbonosMnCordobas += Number(tmpabono[4]);
                cuentaMinutas++;
                break;

        }

    }

    return tmpAbonosrealizados = new Array(totalAbonosCordobas, totalAbonosMnCordobas, cuentaMinutas);
}

function findedia() {
    temp = $('#kFinal').val();
    kFinal = Number(aNumero(temp));
    if (kFinal != 0) {

        if(parseFloat(kFinal)<0 || parseFloat(kFinal)>9999999){
            window.alert("Debe ingresar\nun kilometraje válido");
            return;
        }

        $("#btnfindedia").addClass('ui-disabled');
        localStorage.setItem("Estado", "Cerrado");
        localStorage.removeItem("Directorios");
        var noventas = Number(motivosnoventa.length);
        var efectivos = Number(confirmapedidos.length);
        var visitados = Number(noventas + efectivos);
        var kmrecorrido = kFinal - kilometrajei;
        var codigotabla;
        var totalventasProd = calculatotalventas(1);
        var totalventasEnv = calculatotalventas(2);
        var linea = "";

        var codigotabla = "<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n"
        codigotabla += "<tr><th width=\"85%\">Concepto</th><th width=\"15%\">Cantidad</th>";
        codigotabla += "</tr><tr><td>Negocios visitados</td><td>" + visitados + "</td>";
        codigotabla += "</tr><tr><td>Negocios efectivos</td><td>" + efectivos + "</td>";
        codigotabla += "</tr><tr><td>No venta</td><td>" + noventas + "</td></tr>";
        codigotabla += "<tr><td>Monto ventas producto</td><td align=\"right\">C$" + totalventasProd + "</td></tr>";
        codigotabla += "<tr><td>Monto ventas envases</td><td align=\"right\">C$" + totalventasEnv + "</td></tr>";
        codigotabla += "<tr><td>Kilometraje recorrido</td><td>" + kmrecorrido + "Km</td></tr>";
        codigotabla += "</table></small><br>";
        var tmptotalAbonos = calculatotaldepositos();

        $('#tblfindia').html(codigotabla);
        linea += fechasistema() + "|" + ruta + "|" + visitados + "|" + efectivos + "|" + noventas + "|" + totalventasProd + "|" + tmptotalAbonos[1] + "|" + tmptotalAbonos[0] + "|" + kilometrajei + "|" + kFinal + "|" + kmrecorrido;
        finaldia.push(linea);
        grabartodo();
        cantArchEnviados = 0;
        errorEnvio = 0;
        intentosEnvio = 0;

       /*
       finalizaTodo();
	   persistenciaSistema();
	   //*/
    }

}

function findediaDevolucionEnvases() {
    var sumaenvases = 0;
    var detalledevolucion;
    codigotabla = "<small><table fontborder=\"1\"  style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
    codigotabla += "<tr>\n";
    codigotabla += "<th width=\"50%\" align=\"left\"><small>Producto</small><\/th>\n";
    codigotabla += "<th width=\"20%\">Marca<\/th>\n";
    codigotabla += "<th width=\"30%\">Cant<\/th>\n";
    codigotabla += "<\/tr>\n";

    var cant200fdc = 0;
    var cant375fdc = 0;
    var cant750fdc = 0;
    var cant1000fdc = 0;
    var cant1750fdc = 0;

    var cant200rp = 0;
    var cant375rp = 0;
    var cant750rp = 0;
    var cant1000rp = 0;
    var cant1750rp = 0;

    for ( i = 0; i < devolucionenvasesRuta.length; i++) {
        var dev = devolucionenvasesRuta[i].split("|");
        if (dev[6] == 0) {

            cant200fdc = Number(cant200fdc + dev[1]);
            cant375fdc = Number(cant375fdc + dev[2]);
            cant750fdc = Number(cant750fdc + dev[3]);
            cant1000fdc = Number(cant1000fdc + dev[4]);
            cant1750fdc = Number(cant1750fdc + dev[5]);
            sumaenvases = Number(sumaenvases + dev[7]);

        } else {

            cant200rp = Number(cant200rp + dev[1]);
            cant375rp = Number(cant375rp + dev[2]);
            cant750rp = Number(cant750rp + dev[3]);
            cant1000rp = Number(cant1000rp + dev[4]);
            cant1750rp = Number(cant1750rp + dev[5]);
            sumaenvases = Number(sumaenvases + dev[7]);

        }
    }

    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 200ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">FDC<\/td>";
    codigotabla += "<td align=\"center\">" + cant200fdc + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 375ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">FDC<\/td>";
    codigotabla += "<td align=\"center\">" + cant375fdc + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 750ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">FDC<\/td>";
    codigotabla += "<td align=\"center\">" + cant750fdc + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 1000ML<\/u><\/small><\/td>";
    codigotabla += "<td align=\"center\">FDC<\/td>";
    codigotabla += "<td align=\"center\">" + cant1000fdc + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 1750ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">FDC<\/td>";
    codigotabla += "<td align=\"center\">" + cant1750fdc + "<\/td>";
    codigotabla += "<\/tr>";

    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 200ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">RP<\/td>";
    codigotabla += "<td align=\"center\">" + cant200rp + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 375ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">RP<\/td>";
    codigotabla += "<td align=\"center\">" + cant375rp + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 750ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">RP<\/td>";
    codigotabla += "<td align=\"center\">" + cant750rp + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 1000ML<\/u><\/small><\/td>";
    codigotabla += "<td align=\"center\">RP<\/td>";
    codigotabla += "<td align=\"center\">" + cant1000rp + "<\/td>";
    codigotabla += "<\/tr>";
    codigotabla += "<tr><td align=\"left\"><small>";
    codigotabla += "<u>Envase 1750ML<\/small><\/u><\/td>";
    codigotabla += "<td align=\"center\">RP<\/td>";
    codigotabla += "<td align=\"center\">" + cant1750rp + "<\/td>";
    codigotabla += "<\/tr>";

    envasesdevueltos = sumaenvases;
    codigotabla += "<\/table><\/small>";
    codigotabla += "Envase devuelto:C$" + formatoDinero(Number(envasesdevueltos));
    $('#tblenvasesfindia').html(codigotabla);

}

function imprimeCierredia() {
	
	imprimeInventarioabordo();
	alert("IMPRIMIENDO INVENTARIO ABORDO");
	$("#btnfindedia").removeClass('ui-disabled');
}


function cambioDia() {
    diaTrabajo = $("#cambiaDia").val();
    x = document.getElementsByClassName("encabezado");
    $(x).html(dias[diaTrabajo]);
    persistenciaSistema();
    verClientes();
}

var lecturaFicherosTxt=function (directorio,fichero){
	var deferred=$.Deferred();
	LeerArchivoPlugin.leer(
		function(archivo){
      		console.log("Leido el archivo "+fichero);
		    switch(fichero){
          	case 'clientes.txt':
          		listaclientes = archivo.split("\n");
          	break;
          	case 'erroresimpresion.txt':
          	    LogErroresImpresionDocumentos = JSON.parse(archivo);
          	break;
          	case 'docspendientes.txt':
				docspendientes = archivo.split("\n");
          	break;
          	case 'productos.txt':
          		productos = archivo.split("\n");
          		var sqliteString = "";
          		db_smart_sales.metodos.limpiar_tabla("Productos");
                // Insertamos los productos de forma masiva en la tabla SQLite Productos
                db_smart_sales.metodos.insertar_productos();


          	break;
          	case 'cargainicial.txt':
          		inventario = archivo.split("\n");
          		db_smart_sales.metodos.limpiar_tabla("Inventario");
                // Insertamos el inventario de forma masiva en la tabla SQLite Inventario
                db_smart_sales.metodos.insertar_inventario();
          	break;
          	case 'devolucionenvases.txt':
          		devolucionenvases = archivo.split("\n");
          	break;
          	case 'correlativo.txt':
          		correlativo = archivo;
          	break;
          	case 'correlativoabono.txt':
          		correlativoabono = archivo;
          	break;
          	case 'impresora.txt':
          		dirPrinter = archivo;
          		dirImpresora=archivo;
          	break;
          	case 'tipocambio.txt':
          		tipoCambio = Number(archivo);

          	break;
          	case 'pedidos.txt':
          	var arregtmp = archivo.split("\n");
				for( i = 0; i < arregtmp.length; i++) {
					tmp1 = arregtmp[i].split("|");
					tmp2 = tmp1.splice(0, 8);
					tmp3 = tmp1.join("|");
					tmppedido = new Array(tmp2, tmp3);
					pedidos.push(tmppedido);
				}
          	break;
          	case 'devoluciones.txt':
          	var arregtmp = archivo.split("\n");
				if(arregtmp.length != 0) {
					for( i = 0; i < arregtmp.length; i++) {
						tmp1 = arregtmp[i].split("|");
						tmp2 = tmp1.splice(0, 8);
						tmp3 = tmp1.join("|");
						tmpdev = new Array(tmp2, tmp3);
						devoluciones.push(tmpdev);
					}
				} else {
				devoluciones = new Array();
				}
          	break;
          	case 'cambios.txt':
          	var arregtmp = archivo.split("\n");
				if(arregtmp.length != 0) {
					for( i = 0; i < arregtmp.length; i++) {
							tmp1 = arregtmp[i].split("|");
							tmp2 = tmp1.splice(0, 8);
							tmp3 = tmp1.join("|");
							tmpdev = new Array(tmp2, tmp3);
							cambios.push(tmpdev);
						}
				} else {
					cambios = new Array();
				}
          	break;
          	case 'precioenvases.txt':
          		tmp = archivo.split("\n");
				for( i = 0; i < tmp.length; i++) {
					linea = tmp[i].split("|");
					precioenvases.push(linea[1]);
				}
          	break;
          	case 'ruta.txt':
          		ruta = archivo;
          	break;
          	case '1.txt':
          		ruta=JSON.parse(archivo);
          	break;
          	case '2.txt':
          		listaclientes=JSON.parse(archivo);
            break;
          	case '3.txt':
          		llavefecha=JSON.parse(archivo);
            break;
          	case '4.txt':
          		fecha=JSON.parse(archivo);
            break;
            case '5.txt':
            	tipoCambio=JSON.parse(archivo);
            break;
            case '6.txt':
            	correlativo=JSON.parse(archivo);
            break;
            case '7.txt':
            	clienteenuso=JSON.parse(archivo);
            break;
            case '8.txt':
            	facturaenuso=JSON.parse(archivo);
            break;
            case '9.txt':
            	fechafacturaenuso=JSON.parse(archivo);
            break;
            case '0.txt':
            	montofacturaenuso=JSON.parse(archivo);
            break;
            case 'a.txt':
            	saldofacturaenuso=JSON.parse(archivo);
            break;
            case 'b.txt':
            	productoenuso=JSON.parse(archivo);
            break;
            case 'c.txt':
            	numpedido=JSON.parse(archivo);
            break;
            case 'd.txt':
            	numcambio=JSON.parse(archivo);
            break;
            case 'e.txt':
            	numdevolucion=JSON.parse(archivo);
            break;
            case 'f.txt':
            	productos=JSON.parse(archivo);
            break;
            case 'g.txt':
            	docspendientes=JSON.parse(archivo);
            break;
            case 'h.txt':
            	nuevosdocspendientes=JSON.parse(archivo);
            break;
            case 'i.txt':
            	precioenvases=JSON.parse(archivo);
            break;
            case 'j.txt':
            	abonos=JSON.parse(archivo);
            break;
            case 'k.txt':
            	bancos=JSON.parse(archivo);
            break;
            case 'l.txt':
            	pedidos=JSON.parse(archivo);
            break;
            case 'm.txt':
            	cambios=JSON.parse(archivo);
            break;
            case 'n.txt':
            	motivosnoventa=JSON.parse(archivo);
            break;
            case 'o.txt':
            	devolucionenvases=JSON.parse(archivo);
            break;
            case 'p.txt':
            	devoluciones=JSON.parse(archivo);
            break;
            case 'q.txt':
            	facturas=JSON.parse(archivo);
            break;
            case 'r.txt':
            	confirmapedidos=JSON.parse(archivo);
            break;
            case 's.txt':
            	datosclientetmp=JSON.parse(archivo);
            break;
            case 't.txt':
            	archivosGrabados=JSON.parse(archivo);
            break;
            case 'u.txt':
            	finaldia=JSON.parse(archivo);
            break;
            case 'v.txt':
            	docsimpresos=JSON.parse(archivo);
            break;
            case 'w.txt':
            	facturasimpresas=JSON.parse(archivo);
            break;
            case 'x.txt':
            	devolucionesRuta=JSON.parse(archivo);
            break;
            case 'y.txt':
            	cambiosRuta=JSON.parse(archivo);
            break;
            case 'z.txt':
            	envasespedidos=JSON.parse(archivo);
            break;
            case 'aa.txt':
            	envasesdevueltos=JSON.parse(archivo);
            break;
            case 'bb.txt':
            	saldoenvases=JSON.parse(archivo);
            break;
            case 'cc.txt':
            	lineaspedido=JSON.parse(archivo);
            break;
            case 'dd.txt':
            	totalAbonosEfectivosCordobas=JSON.parse(archivo);
            break;
            case 'ee.txt':
            	totalAbonosEfectivosDolares=JSON.parse(archivo);
            break;
            case 'ff.txt':
            	totalAbonosCkCordobas=JSON.parse(archivo);
            break;
            case 'gg.txt':
            	totalAbonosCkDolares=JSON.parse(archivo);
            break;
            case 'hh.txt':
            	abonoMontoInicial=JSON.parse(archivo);
            break;
            case 'ii.txt':
            	abonoSaldoActual=JSON.parse(archivo);
            break;
            case 'jj.txt':
            	abonoMonto=JSON.parse(archivo);
            break;
            case 'kk.txt':
            	abonoNuevoSaldo=JSON.parse(archivo);
            break;
            case 'll.txt':
            	kilometrajei=JSON.parse(archivo);
            break;
            case 'mm.txt':
            	kFinal=JSON.parse(archivo);
            break;
            case 'nn.txt':
            	diaTrabajo=JSON.parse(archivo);
            break;
            case 'oo.txt':
            	abonosRealizados=JSON.parse(archivo);
            break;
            case 'pp.txt':
            	inventario=JSON.parse(archivo);
            break;
            case 'qq.txt':
            	devolucionenvasesRuta=JSON.parse(archivo);
            break;
            case 'rr.txt':
            	correlativoabono=JSON.parse(archivo);
            break;
            case 'ss.txt':
            	clienteContado=JSON.parse(archivo);
            break;
            case 'tt.txt':
            	limiteExcedido=JSON.parse(archivo);
            break;
            case 'uu.txt':
            	limiteExcedidoEnv=JSON.parse(archivo);
            break;
            case 'vv.txt':
            	saldoEnUso=JSON.parse(archivo);
            break;
            case 'ww.txt':
            	pagoBloqueado=JSON.parse(archivo);
            break;
            case 'xx.txt':
            	clienteCorporativo=JSON.parse(archivo);
            break;
            case 'facturas_web_sql.txt':
            	var data=JSON.parse(archivo);
                if(data.length > 0){
                    db_smart_sales.metodos.limpiar_tabla("facturas");
              }
              for (var i = 0; i < data.length; i++) {
                  var datos = data[i]
                  db_smart_sales.metodos.insertar_factura(datos.ID_Cliente,datos.SKU,datos.Descripcion,datos.Conteo,datos.Precio_Unitario,datos.Precio_Envase,datos.Familia,datos.Exento,datos.Linea_Pedido)
             }
            break;
          }
          //switch...
		  deferred.resolve();
		},
		function(error){
			console.log(error);
			alert(error);
			deferred.reject();
		}
		,directorio,fichero);
	return deferred.promise();
};

/*
function bajaClientes() {
    navigator.notification.activityStart("Cargando Datos", "Por favor espere...");
    localStorage.setItem("Estado", "Corriendo");
    listaclientes = getcsv("clientes.txt");
    bancos = getcsv("bancos.txt");
    docspendientes = getcsv("docspendientes.txt");
    productos = getcsv("productos.txt");
    inventario = getcsv("cargainicial.txt");
    // devolucionenvases = getcsv("devolucionenvases.txt");
    correlativo = Number(getcsv("correlativo.txt")[0]);
    correlativoabono = Number(getcsv("correlativoabono.txt")[0]);
    
    leebancos();
    leetipocambio();
    // leepedidos();
    // leedevoluciones();
    //leecambios();
    $("#btnIniciodia").addClass('ui-disabled');
    navigator.notification.activityStop();
    
    persistenciaInicial();
    persistenciaSistema();
    verClientes();
}
//*/

function bajaClientes() {
	console.time('Velocidad en bajaClientes');
	navigator.notification.activityStart("Cargando Datos", "Por favor espere...");
	localStorage.setItem("Estado", "Corriendo");
	var directorio="/mnt/sdcard/autoventa/";
	var lecturaficheros=  $.when(lecturaFicherosTxt(directorio,"clientes.txt")
		                        ,lecturaFicherosTxt(directorio,"docspendientes.txt")
		                        ,lecturaFicherosTxt(directorio,"productos.txt")
		                        ,lecturaFicherosTxt(directorio,"cargainicial.txt")
		                        ,lecturaFicherosTxt(directorio,"correlativo.txt")
		                        ,lecturaFicherosTxt(directorio,"correlativoabono.txt")
		                        ,lecturaFicherosTxt(directorio,"tipocambio.txt")
		                        );

	 lecturaficheros.done(function(){
	 console.log('Exito');
	   leebancos();
	   $("#contieneTC").html("TC:" + tipoCambio);
       $("#btnIniciodia").addClass('ui-disabled');
       navigator.notification.activityStop();
       persistenciaInicial();
       persistenciaSistema();
      verClientes();

	 });

	 lecturaficheros.fail(function(){});
	 console.timeEnd('Velocidad en bajaClientes');
}

function borraDirectorios() {
    if (localStorage.getItem("Directorios") == "creados") {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, BorrarDirectorios, null);

        function BorrarDirectorios(fileSystem) {
            var entry = fileSystem.root;
            entry.getDirectory("autoventa", {
                create : false,
                exclusive : false
            }, success, fail);

            function success(carpeta) {
                carpeta.removeRecursively(success, fail);
                function success(parent) {
                    localStorage.removeItem("Directorios");
                    console.log("Remove Recursively Succeeded");
                }

                function fail(error) {
                }

            }

            function fail(error) {
            }

        }

    } else
        console.log("carpetas no existen");

}

function preparaDirectorios() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, CrearDirectorios, null);
    var tmpFecha =curr_year + "" + curr_month + "" + curr_date;

    function CrearDirectorios(fileSystem) {
        var entry = fileSystem.root;
        if (localStorage.getItem("Directorios") != "creados") {

            entry.getDirectory("autoventa", {
                create : true,
                exclusive : false
            }, directorioNoexiste, directorioNoexiste);

            function directorioNoexiste(dir) {
                entry.getDirectory("autoventa", {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);

                entry.getDirectory("autoventa/tmp", {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);

                entry.getDirectory("autoventa/salida", {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);

                entry.getDirectory("external_sd/SER", {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);

                entry.getDirectory("external_sd/SER/tmp", {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);
                
                entry.getDirectory("external_sd/SER/salida/"+tmpFecha, {
                    create : true,
                    exclusive : false
                }, onGetDirectorySuccess, onGetDirectoryFail);


                function onGetDirectorySuccess(dir) {
                    console.log("Se creo el directorio " + dir.name);
                }

                function onGetDirectoryFail(error) {
                    console.log("Error creando directorio " + error.code);
                }

            }

        }
        localStorage.setItem("Directorios", "creados");
    }

}

function estacorriendo() {
    if (recuperarSistema) {
        recuperaDatos(false);
        recuperarSistema = false;
        
    } else {
        preparaDirectorios();
        console.log("Todo bien");
    }
}
//Funcion modifica para leer de la tabla de bancos
//2016.02.01 por mroque
function leebancos() {

    /****** Codigo Anterior******
    var codigoselec = "";
    for ( i = 0; i < bancos.length; i++) {
        tmpbco = bancos[i].split("|");
        codigoselec += "<option value=\"" + tmpbco[0] + "\">" + tmpbco[1] + "</option>";
    }
    $("#selecBanco").html(codigoselec);*/

    //Nuevo codigo
    db_smart_sales.metodos.Obtener_Bancos(function (item) {
        var lista_banco=""
        for (var i = 0; i < item.rows.length; i++) {

                lista_banco += "<option value='"+ item.rows.item(i).CODIGO + "'>"+ item.rows.item(i).BANCO  + "</option>"
            }
        $("#selecBanco").html(lista_banco)
    })
}

/*
function leetipocambio() {
    tipoCambio = Number(getcsv("tipocambio.txt"));
    $("#contieneTC").html("TC:" + tipoCambio);
}
//*/

/*
function leepedidos() {
    var arregtmp = getcsv("pedidos.txt");
    for ( i = 0; i < arregtmp.length; i++) {
        tmp1 = arregtmp[i].split("|");
        tmp2 = tmp1.splice(0, 8);
        tmp3 = tmp1.join("|");
        tmppedido = new Array(tmp2, tmp3);
        // console.log(tmppedido);
        pedidos.push(tmppedido);
    }

}
//*/

/*
function leedevoluciones() {
    var arregtmp = getcsv("devoluciones.txt");
    if (arregtmp.length !=0){
    for ( i = 0; i < arregtmp.length; i++) {
        tmp1 = arregtmp[i].split("|");
        tmp2 = tmp1.splice(0, 8);
        tmp3 = tmp1.join("|");
        tmpdev = new Array(tmp2, tmp3);
        //console.log(tmpdev);
        devoluciones.push(tmpdev);
    }}else{
        cambios=new Array();
    }

}
//*/

/*
function leecambios() {
    var arregtmp = getcsv("cambios.txt");
    if (arregtmp.length !=0){
    for ( i = 0; i < arregtmp.length; i++) {
        tmp1 = arregtmp[i].split("|");
        tmp2 = tmp1.splice(0, 8);
        tmp3 = tmp1.join("|");
        tmpdev = new Array(tmp2, tmp3);
        //console.log(tmpdev);
        cambios.push(tmpdev);
    }
    }else{
        cambios=new Array();
    }

}
//*/

function verClientes() {
    var contador = 0;
    var tmp;
    var codigolista = new StringBuilder();
    codigolista.append("<ul data-filter=\"true\" data-filter-placeholder = \"Filtrar clientes\" id=\"lstclientes\" data-inset=\"true\" data-role=\"listview\" data-split-theme=\"a\" data-divider-theme=\"b\" data-split-icon=\"arrow-r\">\n");
    codigolista.append("<li data-role=\"list-divider\" role=\"heading\">Clientes<\/li>\n");

    if (listaclientes.length != 0) {
        for ( i = 0; i < listaclientes.length; i++) {
            cliente = listaclientes[i].split("|");
            if (cliente[17] == diaTrabajo) {
                contador++;
                dirtemporal = cliente[6] + " " + cliente[7];
               
               codigolista.append("<li id=" + cliente[0] + " data-theme=\"c\">" + "\n");
                codigolista.append("<a style=\"width:70%\" href=\"#\">");
                
                codigolista.append("<p style='float:left; display:block; padding-right:5px; '>");
                codigolista.append("<img src='../img/"+(cliente[14]=="00"?"contado": (cliente[14]=="01"?"contado_cobro":"credito") )+".png' width='32' height='32'>");
                codigolista.append("<\/p>");
                 
                codigolista.append("<p style=\"white-space:normal; vertical-align: top; display:inline-block;\">"); 
                codigolista.append("<b>" + cliente[0] + "</b><br><small>" + cliente[18] + " <\/small>" + cliente[1] + "<\/p>\n");
                codigolista.append("<p><small>" + cliente[2] + "<br></p><p style=\"white-space:pre-wrap;width:60%\">");
                codigolista.append("<small>" + dirtemporal + "<\/small>");
                codigolista.append("<\/small><\/p>\n");
                codigolista.append("<\/a><a onClick=\"cargainfocliente(" + i + ")\;\" data-transition=\"none\"><\/a>");
                codigolista.append("<\/li>\n");
            }
        }

        codigolista.append("<\/ul>\n");
        tmp = codigolista.toString();
        $('#contienelistaclientes').html(tmp);
        $('#page7').page();
        $('#contienelistaclientes').find('#lstclientes').listview();
        actualizaIconos();
        codigolista = null;
        $.mobile.changePage('#page7');
    }
}

function preparaclientetmp() {
    //listaproductos();
    tablapedido();

    for ( i = 0; i < datosclientetmp.length; i++) {
        tmp = datosclientetmp[i].split("|");
        if (tmp[0] == clienteenuso) {
            $('#nombretmp').val(tmp[1]);
            $('#negociotmp').val(tmp[2]);
            $('#direcciontmp').val(tmp[3]);
            $('#departamentotmp').val(tmp[4]);
            $('#municipiotmp').val(tmp[5]);
            $('#barriotmp').val(tmp[6]);
            $('#telefonotmp').val(tmp[7]);
            datosclientetmp.splice(i, 1);
            break;
        }
    }
    $('#page16').page();
    $.mobile.changePage('#page16');

}

function pedidoclientetmp() {
    nombretmp = $('#nombretmp').val();
    negociotmp = $('#negociotmp').val();
    direcciontmp = $('#direcciontmp').val();
    departamentotmp = $('#departamentotmp').val();
    municipiotmp = $('#municipiotmp').val();
    barriotmp = $('#barriotmp').val();
    telefonotmp = $('#telefonotmp').val();
    linea = "" + clienteenuso + "|" + nombretmp + "|" + negociotmp + "|" + direcciontmp + "|" + departamentotmp + "|" + municipiotmp + "|" + barriotmp + "|" + telefonotmp;
    datosclientetmp.push(linea);
    $('#nombretmp').val("");
    $('#negociotmp').val("");
    $('#direcciontmp').val("");
    $('#departamentotmp').val("");
    $('#municipiotmp').val("");
    $('#barriotmp').val("");
    $('#telefonotmp').val("");
    persistenciaSistema();
    $('#page4').page();
    $.mobile.changePage('#page4');
}

function cargainfocliente(numero) {
    envasespedido = 0;
    envasesdevueltos = 0;
    lineaspedido = 0;
    abonoMontoInicial = 0;
    abonoSaldoActual = 0;
    abonoMonto = 0;
    abonoNuevoSaldo = 0;
    facturaenuso = "";
    numpedido = "";
    
    cliente = listaclientes[numero].split("|");
    
    clienteenuso = cliente[0]; //Aqui toma el valor del Cliente al entrar a la información del cliente;
    
    clienteCorporativo = cliente[20];
    
    if (!cliente[17]) {
        preparaclientetmp();
    } else {
        codigoinfo1 = new StringBuilder("<small><B>C\ódigo:</B> " + cliente[0] + "<br>\n");
        codigoinfo1.append("<B>Nombre:</B> " + cliente[1] + "<br>\n");
        codigoinfo1.append("<B>Negocio:</B> " + cliente[2] + "<br>\n");
        //CAMBIAMOS "Perfil del Negocio" POR "RUC #" 07-03-2013
        codigoinfo1.append("<B>RUC #:</B> " + cliente[3] + "<br>\n");
        codigoinfo1.append("<B>Canal:</B> " + cliente[4] + "<br>\n");
        codigoinfo1.append("<B>Tipo de Negocio:</B> " + cliente[5] + "<\/small>\n");
        codigoinfo2 = new StringBuilder("<small><B>Direcci\ón L1:</B>" + cliente[6] + "<br>\n");
        codigoinfo2.append("<B>Direcci\ón L2:</B>" + cliente[7] + "<br>\n");
        codigoinfo2.append("<B>Barrio:</B> " + cliente[8] + "<br>\n");
        codigoinfo2.append("<B>Municipio:</B> " + cliente[9] + "<br>\n");
        codigoinfo2.append("<B>Departamento:</B> " + cliente[10] + "<br>\n");
        codigoinfo2.append("<B>Tel\éfono:</B> " + cliente[11] + "<br>\n");
        codigoinfo2.append("<B>Georeferenciaci\ón:</B> " + cliente[12] + "<br>\n");
        codigoinfo2.append("<B>Limite de cr\édito:</B> " + cliente[13] + "<br>\n");
        codigoinfo2.append("<B>Días cr\édito:</B> " + cliente[14] + "<br>\n");
        codigoinfo2.append("<B>Ruta de venta:</B> " + cliente[15] + "<br>\n");
        codigoinfo2.append("<B>Ruta de entrega:</B> " + cliente[16] + "<br>\n");
        codigoinfo2.append("<B>Día de visita:</B> " + dias[cliente[17]] + "<br>\n");
        codigoinfo2.append("<B>Secuencia:</B> " + cliente[18] + "<br>\n");
        codigoinfo2.append("<B>Regi\ón de ventas:</B> " + cliente[19] + "<\/small>\n");
        $('#infocliente1').html(codigoinfo1.toString());
        $('#infocliente2').html(codigoinfo2.toString());
        //listaproductos();
        $('#cantDocsCliente').html(cuentaDocsCliente());
        $('#cantcambiosCliente').html(cuentacambCliente());
        $('#page6').page();
        $('#pedidoEncabezado').html("");
        tablapedido();
        $.mobile.changePage('#page6');
        // persistenciaSistema();
        
        //Aqui debemos meter la bandera de Saldo Excedido
       
       obtenerSaldoActual();
    }
}

/*
 * Cuenta los documentos pendientes del cliente en uso
 */
function cuentaDocsCliente() {

    var contador = 0;
   

    if (docspendientes.length != 0) {
        for ( i = 0; i < docspendientes.length; i++) {
            docto = docspendientes[i].split("|");
            if (docto[1] == clienteenuso && docto[4] > 0) {
                contador++;
			}
        }
    }
    return contador;
}

function cuentacambCliente() {
    var respuesta = "No";
    if (cambios.length != 0) {
        for ( i = 0; i < cambios.length; i++) {
		try{
	            var camb = cambios[i].split("|");
	            if (camb[2] == clienteenuso) {
	                respuesta = "Si";
	                break;
	            }
        	}
        	catch(err)
        	{
        		//error
        	}
        }
    }
    return respuesta;
}

function escondeTodo(lista) {
    x = document.getElementsByClassName(lista);
    for ( i = 0; i <= x.length; i++) {
        $(x[i]).trigger('collapse')
    }
}

function actualizaDocpendientes(tmpclienteenuso, tmpfacturaenuso, tmpsaldofacturaenuso, tmp) {
	for(var jj = 0; jj < docspendientes.length; jj++) {
		var tmpdocpend = docspendientes[jj].split("|");
		if(tmpdocpend[1] == tmpclienteenuso && tmpdocpend[0] == tmpfacturaenuso) {
			var nuevosaldodoc = Number(tmpsaldofacturaenuso - tmp).toFixed(2);
			var nuevalinea = tmpdocpend[0] + "|" + tmpdocpend[1] + "|" + tmpdocpend[2] + "|" + tmpdocpend[3] + "|" + nuevosaldodoc + "|"+ tmpdocpend[5]+ "|"+ tmpdocpend[6];
			docspendientes.splice(jj, 1);
			docspendientes.unshift(nuevalinea);			
			break;
		}

	}

}

function marcaDocpagados() {
    for (var zz = 0; zz < docspendientes.length; zz++) {
        var tmpdocpend = docspendientes[zz].split("|");
        if (tmpdocpend[4] == 0) {
            var infocliente = buscadatosCliente(tmpdocpend[1]);
            if (infocliente[2] == "CONTADO") {
                cambiarIconoCliente(infocliente[0], "icono-preventa");

            }
        }

    }

}

function tieneSaldopendiente() {
    var tiene = false;
    console.log(JSON.stringify(docspendientes));
    for (var z = 0; z < docspendientes.length; z++) {
        var tmpdocpend = docspendientes[z].split("|");
        console.log(tmpdocpend);
        if (tmpdocpend[4] >= 1) {
            var infocliente = buscadatosCliente(tmpdocpend[1]);
            if (infocliente[2] == "CONTADO") {
                tiene = true;
                break;
            }
        }

    }
    return tiene;
}

function marcaDocpendientes() {
    marcaDocpagados();
    for (var z = 0; z < docspendientes.length; z++) {
        var tmpdocpend = docspendientes[z].split("|");
        if (tmpdocpend[4] > 0) {
            var infocliente = buscadatosCliente(tmpdocpend[1]);
            if (infocliente[2] == "CONTADO") {
                cambiarIconoCliente(infocliente[0], "icono-no-pago");

            }
        }

    }

}

function cargadocscliente(cliente) {
    facturaenuso = "";
    var contador = 0;
    $('#abonoEncabezado').html("Factura:<br>Monto:<br>Saldo:<br>Fecha:");
    var codigolista = "<ul id=\"docsclientes\" data-inset=\"true\" data-role=\"listview\" data-split-theme=\"a\" data-divider-theme=\"b\" data-split-icon=\"arrow-r\">" + "\n";
    codigolista = codigolista + "<li data-role=\"list-divider\" role=\"heading\">Documentos Pendientes<\/li>" + "\n";

	var granTotal = 0;
	var contadoActivo = 0;
	
	var estiloVencido = "";

    //Sacamos la lista de tipo de pagos almacenados en las tabla **Tipo_Pago
    //2016.02.01 por mroque

    db_smart_sales.metodos.Obtener_Datos_Tipo_Pago(1,'',function (item) {
        var lista_tipo_pago=""
        for (var i = 0; i < item.rows.length; i++) {
                lista_tipo_pago += "<option value='"+item.rows.item(i).CODIGO + "' >"+ item.rows.item(i).DESCRIPCION  + "</option>"
            }

        $("#tipoAbono").html(lista_tipo_pago)
        $('#tipoAbono').selectmenu('refresh'); 
        $( "#tipoAbono" ).change(function() {}).change();
    })


    leebancos()


    if (docspendientes.length != 0) {
        for ( i = 0; i < docspendientes.length; i++) {
            docto = docspendientes[i].split("|");
            if (docto[1] == cliente && docto[4] >= 0) {
                contador++;
                fechadoc = docto[2];                
                
                //Verificamos si hay deuda de contado con fecha actual
				if(fechasistema() == docto[2] && docto[5] ==1 )
				{
					contadoActivo += Number(docto[4]);	
					estiloVencido = "class='saldoVencido'";	
				}else
				{
					estiloVencido = "";
				}
				
				//estiloVencido = "class=\"saldoVencido\"";	
                
                codigolista = codigolista + "<li data-theme=\"c\">" + "\n";
                codigolista = codigolista + "<a href=\"#\" > <h5> <span "+estiloVencido+" >" + docto[0] + "<\/span><\/h5>" + "\n <p><strong>";
                
                if(typeof docto[6]  != "undefined"){ codigolista = codigolista + "N° Ref:"+ docto[6] + "<br>\n"}
                
                codigolista = codigolista + "Fecha: " + docto[2].substring(6)+"/"+docto[2].substring(4,6)+"/"+docto[2].substring(0,4) 
                						  + "<br>Monto: C$" + formatoDinero(Number(docto[3])) + "<br>\n";
                codigolista = codigolista + "Saldo: C$" + formatoDinero(Number(docto[4])) + "<br>\n"
                						  + "Tipo: "+(docto[5]==1?"CONTADO":"CREDITO")+"<\/strong><\/p>\n";
                codigolista = codigolista + "<p class=\"ui-li-aside\"><strong>" + contador + "<\/strong><\/p><\/a>\n";
                codigolista = codigolista + "<a onClick=\"cargaFactura(" + i + ")\;\" data-transition=\"none\">\n";
                codigolista = codigolista + "<\/a>\n";
                codigolista = codigolista + "<\/li>\n";
            
				granTotal += Number(docto[4]);
				
            }
        }
        
        if(contadoActivo>0)
        {
        	codigolista = codigolista + "<li data-theme=\"c\"><H6><b> <span class='saldoVencido'>" + "Pago Pendiente:<\/span></b> C$<span id='spnPagoPendiente'>"+formatoDinero(contadoActivo)+"</span></H6></li>\n";
        	pagoBloqueado = 1;
        	$("#btnInfoClientePagos").hide();                  
           
        }else
        {
        	pagoBloqueado = 0;
        	$("#btnInfoClientePagos").show();
        }
        
         grabatmp("ww", pagoBloqueado);
        
        codigolista = codigolista + "<li data-theme=\"c\"><H5><b>Deuda Total:</b> C$<span id='spnDeudaTotal'>"+formatoDinero(granTotal)+"</span></H5></li>\n";
        

        codigolista = codigolista + "<\/ul>\n";
        $("#contienelistadocs").html(codigolista);
        $('#page12').page();
        $("#contienelistadocs").find(":jqmData(role=listview)").listview();
    }
    docto = null;
    //tablaAbonos();
    $('#tblAbonos').html("");
    $('#totalAbono').html("");
    $.mobile.changePage('#page12');
    $("#btnImprimirPago").hide();
}

//Actualizado..
function cargaFactura(pos) {

	docto = docspendientes[pos].split("|");
	// console.log(docto);
	facturaenuso = docto[0];
	fechafacturaenuso = docto[2].toString();
	montofacturaenuso = docto[3].toString();
	saldofacturaenuso = docto[4].toString();
	tipofacturaenuso = (docto[5]==1?"CONTADO":"CREDITO");

	texto = "Factura: " + docto[0] + "<br>";
	texto += "Monto: " + formatoDinero(Number(docto[3])) + "<br>";
	texto += "Saldo: " + formatoDinero(Number(docto[4])) + "<br>";
	texto += "Fecha: " + fechafacturaenuso.substring(6, 8) + "/" + fechafacturaenuso.substring(4, 6) + "/" + fechafacturaenuso.substring(0, 4)+"<br>";
	texto += "Tipo: " + (docto[5]==1?"CONTADO":"CREDITO"); //Agregamos el tipo de Documento, 2014-08-31
	
	$('#abonoEncabezado').html(texto);
	$('#page12').page();

    //$("#btnImprimirPago").hide();

	tablaAbonos();
	$.mobile.changePage('#page12');
}

function listaproductos() {
    console.log("*** METODOLOGIA VIEJA LISTAR PRODUCTOS *** ");
    codigolista = "<ul data-filter=\"true\" data-filter-placeholder=\"Filtrar productos\" data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";

    codigolistafdc = codigolista;
    codigolistarp = codigolista;
    codigolistaae = codigolista;
    codigolistavk = codigolista;
    codigolistaenv = codigolista;
    codigolistaotros = codigolista;
    
    var spanExistencia = "";
    for ( i = 0; i < productos.length; i++) {
        producto = productos[i].split("|");

		var hayUnidades = retornaExistenciaInventario(producto[1]);
		
		if(hayUnidades >0)
		{
			spanExistencia = "<span class='existencia'>Existencia: </span><span class='hayUnidades existencia' >"+hayUnidades+" unidades</span>";
		}else
		{
			spanExistencia = "<span class='existencia' >Existencia: </span><span class='saldoVencido existencia' >"+hayUnidades+" unidades</span>";
		}
		

        if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
            codigolistafdc += "<li data-theme=\"c\">\n";
            codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<br> "+spanExistencia +"<\/a>\n";
            codigolistafdc += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistafdc += "<\/li>\n";
            
        }else if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
            codigolistarp += "<li data-theme=\"c\">\n";
            codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<br> "+spanExistencia + "<\/a>\n";
            codigolistarp += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistarp += "<\/li>\n";
            
        }else if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
            codigolistaae += "<li data-theme=\"c\">\n";
            codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<br> "+spanExistencia + "<\/a>\n";
            codigolistaae += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistaae += "<\/li>\n";
            
        }else if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
            codigolistavk += "<li data-theme=\"c\">\n";
            codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<br> "+spanExistencia + "<\/a>\n";
            codigolistavk += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistavk += "<\/li>\n";
            
        }else if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
            codigolistaenv += "<li data-theme=\"c\">\n";
            codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
            codigolistaenv += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistaenv += "<\/li>\n";
            
        }else if (producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
            codigolistaotros += "<li data-theme=\"c\">\n";
            codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<br> "+spanExistencia + "<\/a>\n";
            codigolistaotros += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
            codigolistaotros += "<\/li>\n";
            
        }

    }

    codigolistafdc += "<\/ul>\n";
    codigolistarp += "<\/ul>\n";
    codigolistaae += "<\/ul>\n";
    codigolistavk += "<\/ul>\n";
    codigolistaenv += "<\/ul>\n";
    codigolistaotros += "<\/ul>\n";

    $('#listafdcpedido').html(codigolistafdc);
    $('#listarppedido').html(codigolistarp);
    $('#listaaepedido').html(codigolistaae);
    $('#listavkpedido').html(codigolistavk);
    $('#listaenvpedido').html(codigolistaenv);
    $('#listaotrospedido').html(codigolistaotros);

    $('#page4').page();

    $('#listafdcpedido').find(":jqmData(role=listview)").listview();
    $('#listarppedido').find(":jqmData(role=listview)").listview();
    $('#listaaepedido').find(":jqmData(role=listview)").listview();
    $('#listavkpedido').find(":jqmData(role=listview)").listview();
    $('#listaenvpedido').find(":jqmData(role=listview)").listview();
    $('#listaotrospedido').find(":jqmData(role=listview)").listview();
}

function listaproductosCambios() {
//    codigolista = "<ul data-filter=\"true\"  data-filter-placeholder=\"Filtrar productos\" data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";
//
//    codigolistafdc = codigolista;
//    codigolistarp = codigolista;
//    codigolistaae = codigolista;
//    codigolistavk = codigolista;
//    codigolistaenv = codigolista;
//    codigolistaotros = codigolista;
//
//    for ( i = 0; i < productos.length; i++) {
//        producto = productos[i].split("|");
//
//        if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
//            codigolistafdc += "<li data-theme=\"c\">\n";
//            codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistafdc += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistafdc += "<\/li>\n"
//        }
//
//        if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
//            codigolistarp += "<li data-theme=\"c\">\n";
//            codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistarp += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistarp += "<\/li>\n"
//        }
//
//        if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
//            codigolistaae += "<li data-theme=\"c\">\n";
//            codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistaae += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistaae += "<\/li>\n"
//        }
//
//        if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
//            codigolistavk += "<li data-theme=\"c\">\n";
//            codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistavk += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistavk += "<\/li>\n"
//        }
//
//        if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
//            codigolistaenv += "<li data-theme=\"c\">\n";
//            codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistaenv += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistaenv += "<\/li>\n"
//        }
//
//        if (producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
//            codigolistaotros += "<li data-theme=\"c\">\n";
//            codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//            codigolistaotros += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
//            codigolistaotros += "<\/li>\n"
//        }
//
//    }
//
//    codigolistafdc += "<\/ul>\n";
//    codigolistarp += "<\/ul>\n";
//    codigolistaae += "<\/ul>\n";
//    codigolistavk += "<\/ul>\n";
//    codigolistaenv += "<\/ul>\n";
//    codigolistaotros += "<\/ul>\n";
//
//    codigolistafdc += "<\/ul>\n"
//    codigolistarp += "<\/ul>\n"
//    codigolistaae += "<\/ul>\n"
//    codigolistavk += "<\/ul>\n"
//    codigolistaenv += "<\/ul>\n"
//    codigolistaotros += "<\/ul>\n"
//
//    $('#listafdccambio').html(codigolistafdc);
//    $('#listarpcambio').html(codigolistarp);
//    $('#listaaecambio').html(codigolistaae);
//    $('#listavkcambio').html(codigolistavk);
//    $('#listaenvcambio').html(codigolistaenv);
//    $('#listaotroscambio').html(codigolistaotros);

    $('#page18').page();

//    $('#listafdccambio').find(":jqmData(role=listview)").listview();
//    $('#listarpcambio').find(":jqmData(role=listview)").listview();
//    $('#listaaecambio').find(":jqmData(role=listview)").listview();
//    $('#listavkcambio').find(":jqmData(role=listview)").listview();
//    $('#listaenvcambio').find(":jqmData(role=listview)").listview();
//    $('#listaotroscambio').find(":jqmData(role=listview)").listview();
    tablacambios();
    $.mobile.changePage("#page18");
}

function listaproductosDevoluciones() {
    if (facturaenuso != "") {

        texto = "<p>Factura:" + facturaenuso + "<br>";
        texto += "Código: <br>";
        texto += "Descripción: <\/p>";

        $('#devolucionEncabezado').html(texto);

//        codigolista = "<ul data-filter=\"true\" data-filter-placeholder=\"Filtrar productos\"data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";
//
//        codigolistafdc = codigolista;
//        codigolistarp = codigolista;
//        codigolistaae = codigolista;
//        codigolistavk = codigolista;
//        codigolistaenv = codigolista;
//        codigolistaotros = codigolista;
//
//        for ( i = 0; i < productos.length; i++) {
//            producto = productos[i].split("|");
//
//            if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
//                codigolistafdc += "<li data-theme=\"c\">\n";
//                codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistafdc += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistafdc += "<\/li>\n";
//
//            } else if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
//                codigolistarp += "<li data-theme=\"c\">\n";
//                codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistarp += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistarp += "<\/li>\n";
//
//            } else if (producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
//                codigolistaae += "<li data-theme=\"c\">\n";
//                codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistaae += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistaae += "<\/li>\n";
//
//            }else if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
//                codigolistavk += "<li data-theme=\"c\">\n";
//                codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistavk += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistavk += "<\/li>\n";
//
//            }else if (producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
//                codigolistaenv += "<li data-theme=\"c\">\n";
//                codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistaenv += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistaenv += "<\/li>\n";
//
//            }else if (producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
//                codigolistaotros += "<li data-theme=\"c\">\n";
//                codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
//                codigolistaotros += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
//                codigolistaotros += "<\/li>\n";
//            }
//
//        }
//
//        codigolistafdc += "<\/ul>\n";
//        codigolistarp += "<\/ul>\n";
//        codigolistaae += "<\/ul>\n";
//        codigolistavk += "<\/ul>\n";
//        codigolistaenv += "<\/ul>\n";
//        codigolistaotros += "<\/ul>\n";
//
//        codigolistafdc += "<\/ul>\n"
//        codigolistarp += "<\/ul>\n"
//        codigolistaae += "<\/ul>\n"
//        codigolistavk += "<\/ul>\n"
//        codigolistaenv += "<\/ul>\n"
//        codigolistaotros += "<\/ul>\n"
//
//        $('#listafdcdevolucion').html(codigolistafdc);
//        $('#listarpdevolucion').html(codigolistarp);
//        $('#listaaedevolucion').html(codigolistaae);
//        $('#listavkdevolucion').html(codigolistavk);
//        $('#listaenvdevolucion').html(codigolistaenv);
//        $('#listaotrosdevolucion').html(codigolistaotros);

        $('#page9').page();

//        $('#listafdcdevolucion').find(":jqmData(role=listview)").listview();
//        $('#listarpdevolucion').find(":jqmData(role=listview)").listview();
//        $('#listaaedevolucion').find(":jqmData(role=listview)").listview();
//        $('#listavkdevolucion').find(":jqmData(role=listview)").listview();
//        $('#listaenvdevolucion').find(":jqmData(role=listview)").listview();
//        $('#listaotrosdevolucion').find(":jqmData(role=listview)").listview();

        tabladevolucion();
        $.mobile.changePage("#page9");
    } else {
        window.alert("Seleccione una factura");
    }
}

//function encabezadoPedido(pos) {
//    producto = productos[pos].split("|");
//    texto = "Código: " + producto[1] + "<br>";
//    texto = texto + "Descripción: " + producto[2];
//    productoenuso = producto;
//
//    $('#div-cajas').html("");
//
//    $('#div-cajas').html("<input type=\"number\" data-mini=\"true\" name=\"pedidocajas\" id=\"pedidocajas\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");
//
//    $('#div-unidades').html("");
//
//    $('#div-unidades').html("<input type=\"number\" data-mini=\"true\" name=\"pedidounidades\" id=\"pedidounidades\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");
//    $('#pedidocajas').focus();
//
//    // $('#pedidocajas').val("");
//
//    // $('#pedidocajas').attr('disabled', false);
//    // $('#pedidocajas').focus();
//
//    // $('#pedidounidades').val("");
//
//    //	$('#pedidounidades').attr('disabled', false);
//    $('#pedidoEncabezado').html(texto);
//    $.mobile.changePage("#page4");
//
//}

function encabezadoPedido(codigoProducto) {

	db_smart_sales.metodos.buscarProductoxCodigo(codigoProducto, function(item){

		texto = "Código: " + item.rows.item(0).codigoProducto + "<br>";
        texto = texto + "Descripción: " + item.rows.item(0).descripcionProducto;
		productoenuso = [
			item.rows.item(0).clienteCorporativo,
			item.rows.item(0).codigoProducto,
			item.rows.item(0).descripcionProducto,
			item.rows.item(0).unidadesxCaja.toString(),
			item.rows.item(0).precioProducto.toString(),
			item.rows.item(0).info1.toString(),
			item.rows.item(0).familia,
			item.rows.item(0).info2.toString(),
		];

		$('#div-cajas').html("");
		$('#div-cajas').html("<input type=\"number\" data-mini=\"true\" name=\"pedidocajas\" id=\"pedidocajas\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");
		$('#div-unidades').html("");
		$('#div-unidades').html("<input type=\"number\" data-mini=\"true\" name=\"pedidounidades\" id=\"pedidounidades\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");
		$('#pedidocajas').focus();

		$('#pedidoEncabezado').html(texto);
		$(window).scrollTop(0);

	});
}

//function encabezadoCambios(pos) {
//    producto = productos[pos].split("|");
//    texto = "Código: " + producto[1] + "<br>";
//    texto = texto + "Descripción: " + producto[2];
//    productoenuso = producto;
//    $('#cambiocajas').val("");
//    $('#cambiocajas').focus();
//    $('#cambiounidades').val("");
//    $('#cambiomotivo').val("0");
//    $('#cambioEncabezado').html(texto);
//}

function encabezadoCambios(codigoProducto) {

	db_smart_sales.metodos.buscarProductoxCodigo(codigoProducto, function(item){

		texto = "Código: " + item.rows.item(0).codigoProducto + "<br>";
        texto = texto + "Descripción: " + item.rows.item(0).descripcionProducto;
		productoenuso = [
			item.rows.item(0).clienteCorporativo,
			item.rows.item(0).codigoProducto,
			item.rows.item(0).descripcionProducto,
			item.rows.item(0).unidadesxCaja.toString(),
			item.rows.item(0).precioProducto.toString(),
			item.rows.item(0).info1.toString(),
			item.rows.item(0).familia,
			item.rows.item(0).info2.toString(),
		];

		$('#cambiocajas').val("");
		$('#cambiocajas').focus();
		$('#cambiounidades').val("");
		$('#cambiomotivo').val("0");
		$('#cambioEncabezado').html(texto);

		$(window).scrollTop(0);

	});
}

//function encabezadoDevoluciones(pos) {
//    producto = productos[pos].split("|");
//    texto = "Factura:" + facturaenuso + "<br>";
//    texto += "Código: " + producto[1] + "<br>";
//    texto += "Descripción: " + producto[2];
//    productoenuso = producto;
//    $('#devolucioncajas').val("");
//    $('#devolucioncajas').focus();
//    $('#devolucionunidades').val("");
//    $('#devolucionEncabezado').html(texto);
//}

function encabezadoDevoluciones(codigoProducto) {

	db_smart_sales.metodos.buscarProductoxCodigo(codigoProducto, function(item){

		texto = "Factura:" + facturaenuso + "<br>";
		texto += "Código: " + item.rows.item(0).codigoProducto + "<br>";
		texto += "Descripción: " + item.rows.item(0).descripcionProducto;

		productoenuso = [
			item.rows.item(0).clienteCorporativo,
			item.rows.item(0).codigoProducto,
			item.rows.item(0).descripcionProducto,
			item.rows.item(0).unidadesxCaja.toString(),
			item.rows.item(0).precioProducto.toString(),
			item.rows.item(0).info1.toString(),
			item.rows.item(0).familia,
			item.rows.item(0).info2.toString(),
		];

		$('#devolucioncajas').val("");
		$('#devolucioncajas').focus();
		$('#devolucionunidades').val("");
		$('#devolucionEncabezado').html(texto);

		$(window).scrollTop(0);

	});
}

function grabaLineacambio() {
    cajas = aNumero(Number(document.getElementById("cambiocajas").value));
    unidades = aNumero(Number(document.getElementById("cambiounidades").value));
    if ((cajas == 0 && unidades == 0) || (cajas < 0 || unidades < 0)) {
        window.alert("Validar cantidades");
    } else {
        total = ((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[4]);
        numcambio = ruta + "-CMB-" + clienteenuso;
        motivoCambio = document.getElementById("cambiomotivo").value;
        $('#cambiocajas').val("");
        $('#cambiounidades').val("");
        $('#cambiomotivo').val("0");
        texto = "<p>C\ódigo:<br>";
        texto = texto + "Descripci\ón:<\/p>";
        $('#cambioEncabezado').html(texto);
        totalunidades = (Number(cajas) * productoenuso[3]) + Number(unidades);
        lineacambios = cajas + "|" + unidades + "|" + totalunidades + "|" + motivoCambio + "|" + fechasistema() + "|" + numcambio;
        
          //REVISAR ESTO:::
        /**
         * Asignamos un objeto temporal del Producto para intercambiar el cod cliente en vez del cod Corporativo
         */
        var productoPedido = productoenuso;
        productoPedido[0] = clienteenuso;
        temp = new Array(productoPedido, lineacambios);
        
        //temp = new Array(productoenuso, lineacambios);
        cambios.push(temp);
        
        
        
        tablacambios();

    }
}

function grabaLineadevoluciones() {
    cajas = aNumero(Number(document.getElementById("devolucioncajas").value));
    unidades = aNumero(Number(document.getElementById("devolucionunidades").value));
    if ((cajas == 0 && unidades == 0) || (cajas < 0 || unidades < 0)) {
        window.alert("Validar cantidades");
    } else {
        total = ((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[4]);
        numdevolucion = ruta + "-DEV-" + clienteenuso;
        $('#devolucioncajas').val("");
        $('#devolucionunidades').val("");
        totalunidades = (Number(cajas) * Number(productoenuso[3])) + Number(unidades);
        lineadevolucion = cajas + "|" + unidades + "|" + totalunidades + "|" + facturaenuso + "|" + fechasistema() + "|" + numdevolucion;
       
        var productoPedido = productoenuso;
        productoPedido[0] = clienteenuso;
        temp = new Array(productoPedido, lineadevolucion);
        
       
        //temp = new Array(productoenuso, lineadevolucion);
        devoluciones.push(temp);
       
        tabladevolucion();
    }
}

function grabaLineapedido() {
    var ahora = new Date();
    var procede = false;
    cajas = aNumero(Number(document.getElementById("pedidocajas").value));
    unidades = aNumero(Number(document.getElementById("pedidounidades").value));
    if ((cajas == 0 && unidades == 0) || (cajas < 0 || unidades < 0)) {
        window.alert("Validar cantidades");
    } else {
        totalunidades = (Number(cajas) * Number(productoenuso[3]));
        totalunidades += Number(unidades);
        if (productoenuso[6] == "1D") {
            procede = true;
        } else {
            var sumaCantidades = 0;
            var codigoProducto = productoenuso[1];
            $('#tblpedido > small > table > tbody tr').each(function(i,item){
               if($(item).attr('data-codigoProducto') == codigoProducto){
                   sumaCantidades += Number($(item).attr('data-totalunidades'));
               }
            });
            procede = confirmaInventario(productoenuso[1], (totalunidades + sumaCantidades) );
        }
        if (procede) {
            total = Number(totalunidades * Number(productoenuso[4])).toFixed(2);
            if (productoenuso[7] == 0) {
                iva = Number(total - (total / 1.15)).toFixed(2);
            } else {
                iva = 0;
            }
            envasespedido = Number(((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[5])).toFixed(2);
            $('#pedidocajas').val("");
            $('#pedidounidades').val("");
            envasespedidos = envasespedidos + parseFloat(envasespedido);
            totalunidades = (cajas * productoenuso[3]) + Number(unidades);
            lineapedido = cajas + "|" + unidades + "|" + totalunidades + "|" + Number(total - iva).toFixed(2) + "|" + total + "|" + iva + "|" + envasespedido + "|" + numpedido;
        	var productoPedido = productoenuso;
        	productoPedido[0] = clienteenuso;

        	var temp = new Array(productoPedido, lineapedido);
            pedidos.push(temp);

			//Hace que los pedidos persistan...
			persistenciaSistema();

            tablapedido();
        } else {
            window.alert("No puede continuar con la facturación, valide cantidades o productos!");
        }
    }
}

function confirmaEntrega() {
    var encontrado = false;
   /* for ( i = 0; i < confirmapedidos.length; i++) {
        temp = confirmapedidos[i].split("|");
        if (clienteenuso == temp[1]) {
            encontrado = true;
            // window.alert("Este cliente ya tiene\npedidos
            // confirmados\nmodif\íque el existente")
            marcaDocpendientes();
            cargadocscliente(clienteenuso);
            break;
        }
    }
    if (lineaspedido == 0) {
        window.alert("La factura debe contener al menos una linea");
    } else {*/
        if (tieneFacturas("PROD") || tieneFacturas("ENV") ) {
            linea = fecha + "|" + clienteenuso + "|" + ruta + clienteenuso + fechasistema();
            confirmapedidos.push(linea);
            escondeTodo("listapedidocollapse");
            texto = "Código:<br>";
            texto = texto + "Descripción:";
            $('#pedidoEncabezado').html(texto);
            
            window.alert("Entrega grabada");
            
            cambiarIconoCliente(clienteenuso, "icono-preventa");
            // $.mobile.changePage('#page7');
            lineaspedido = 0;
            persistenciaSistema();
            $('#cantDocsCliente').html(cuentaDocsCliente());
            marcaDocpendientes();
            
            cargadocscliente(clienteenuso);
            
            obtenerSaldoActual();
            
        }else
        {
        	navigator.notification.alert('Debe realizar la facturación antes de confirmarla!!', 
	            null, // callback
	            'Confirmación de Entrega', // title
	            'Continuar' // buttonName
	         );
        }
    //}
    
    $("#btnAtras").show();
}

 function tablapedido() {
 	var detsubtotal = 0;
 	var dettotal = 0;
 	var detiva = 0;
 	var detenvases = 0;
 	var envdetsubtotal = 0;
 	var envdetiva = 0;
 	var envdettotal = 0;

 	codigotabla = "<small><table fontborder=\"1\"  style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
 	codigotabla += "<tr>\n";
 	codigotabla += "<th width=\"50%\" align=\"left\"><small>Producto</small><\/th>\n";
 	codigotabla += "<th width=\"10%\">Cj<\/th>\n";
 	codigotabla += "<th width=\"15%\">Un<\/th>\n";
 	codigotabla += "<th width=\"10%\">P.Botella<\/th>\n";
 	codigotabla += "<th width=\"15%\" align=\"right\">Total C$<\/th>\n";
 	codigotabla += "<\/tr>\n";
 	codigotablaenvases = codigotabla;

 	for( i = 0; i < pedidos.length; i++) {
 		lineapedido = pedidos[i][1].split("|");
 		if(pedidos[i][0][0] == clienteenuso) {
 			if(pedidos[i][0][6] != "1D") {
 				detsubtotal = (Number(detsubtotal) + Number(lineapedido[3])).toFixed(2);
 				detiva = (Number(detiva) + Number(lineapedido[5])).toFixed(2);
 				dettotal = (Number(detiva) + Number(detsubtotal)).toFixed(2);
 				detenvases = (Number(detenvases) + Number(lineapedido[6])).toFixed(2);
 				codigotabla += "<tr data-codigoProducto='" + pedidos[i][0][1] + "' data-totalUnidades='" + lineapedido[2] + "'><td align=\"left\"><small>";
 				codigotabla += "<u><a onClick=\"modificalineapedido(" + i + ");\">" + pedidos[i][0][1] + "<br>" + pedidos[i][0][2] + "<\/a><\/small><\/u><\/td>";

 				codigotabla += "<td align=\"center\">" + lineapedido[0] + "<\/td>";
 				codigotabla += "<td align=\"center\">" + lineapedido[1] + "<\/td>";
 				codigotabla += "<td align=\"center\"><small>" + Number(lineapedido[3] / lineapedido[2]).toMoney(4) + "<\/small><\/td>";
 				codigotabla += "<td align=\"right\">" + formatoDinero(Number(lineapedido[3])) + "<\/td>";
 				codigotabla += "<\/tr>";



 			} else {
 				envdetsubtotal = (Number(envdetsubtotal) + Number(lineapedido[3])).toFixed(2);
 				envdetiva = (Number(envdetiva) + Number(lineapedido[5])).toFixed(2);
 				envdettotal = (Number(envdetiva) + Number(envdetsubtotal)).toFixed(2);
 				codigotablaenvases += "<tr><td align=\"left\"><small>";
 				codigotablaenvases += "<u><a onClick=\"modificalineapedido(" + i + ");\"" + pedidos[i][0][1] + "<br>" + pedidos[i][0][2] + "<\/a><\/small><\/u><\/td>";
 				codigotablaenvases += "<td align=\"center\">" + lineapedido[0] + "<\/td>";
 				codigotablaenvases += "<td align=\"center\">" + lineapedido[1] + "<\/td>";
 				codigotablaenvases += "<td align=\"center\"><small>" + Number(lineapedido[3] / lineapedido[2]).toMoney(4) + "<\/small><\/td>";
 				codigotablaenvases += "<td align=\"right\">" + formatoDinero(Number(lineapedido[3])) + "<\/td>";
 				codigotablaenvases += "<\/tr>";
 			}
 		}
 	}

 	codigotabla += "<\/table><\/small>";
 	codigotablaenvases += "<\/table><\/small>";

 	$('#tblpedido').html(codigotabla);
 	$('#tblpedidoenvases').html(codigotablaenvases);
 	codigodetallepedido = "<small>Sub total:C$" + formatoDinero(Number(detsubtotal)) + "<br>";
 	codigodetallepedido += "IVA:C$" + formatoDinero(Number(detiva)) + "<br>";
 	codigodetallepedido += "Total:C$" + formatoDinero(Number(dettotal)) + "<\/small>";
 	codigodetallepedidoenvases = "<small><small>Sub total:C$" + formatoDinero(Number(envdetsubtotal)) + "<br>";
 	codigodetallepedidoenvases += "IVA:C$" + formatoDinero(Number(envdetiva)) + "<br>";
 	codigodetallepedidoenvases += "Total:C$" + formatoDinero(Number(envdettotal)) + "<\/small><\/small>";

 	$('#detpedido').html(codigodetallepedido);
 	$('#detpedidoenvases').html(codigodetallepedidoenvases);
 	lineaspedido = i;
 	envasespedidos = detenvases;
 	envasesdevueltos = envasesdevueltosCliente();
 	detalleenvases = new Array(envasespedidos, envasesdevueltos, Number(envasespedidos - envasesdevueltos));
 	$('#detenvases').html(detallepedidoenvases(detalleenvases));
     var clienteActual = buscadatosCliente(clienteenuso);
     obtenerSaldoActual();
 }
	
function tablacambios() {
    codigotabla = "<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
    codigotabla += "<tr>\n";
    codigotabla += "<th width=\"50%\" align=\"left\"><small>Producto</small><\/th>\n";
    codigotabla += "<th width=\"10%\">Cj<\/th>\n";
    codigotabla += "<th width=\"15%\">Un<\/th>\n";
    codigotabla += "<th width=\"10%\">Motivo<\/th>\n";
    codigotabla += "<\/tr>\n";

    for ( i = 0; i < cambios.length; i++) {
        lineacambio = cambios[i][1].split("|");
        if (cambios[i][0][0] == clienteenuso) {
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificalineacambio(" + i + ");\">" + cambios[i][0][1] + " " + cambios[i][0][2] + "<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + lineacambio[0] + "<\/td>";
            codigotabla += "<td align=\"center\">" + lineacambio[1] + "<\/td>";
            codigotabla += "<td align=\"center\"><small>" + motivosCambios[lineacambio[3]] + "<\/small><\/td>";
            codigotabla += "<\/tr>";

        }
    }
    codigotabla += "<\/table><\/small>";
    $('#tblcambio').html(codigotabla);
}

function tabladevolucion() {
    codigotabla = "<small><table fontborder=\"1\"  style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
    codigotabla += "<tr>\n";
    codigotabla += "<th width=\"60%\" align=\"left\"><small>Producto</small><\/th>\n";
    codigotabla += "<th width=\"20%\">Cj<\/th>\n";
    codigotabla += "<th width=\"20%\">Un<\/th>\n";
    codigotabla += "<\/tr>\n";

    for ( i = 0; i < devoluciones.length; i++) {
        lineadevolucion = devoluciones[i][1].split("|");
        if (devoluciones[i][0][0] == clienteenuso) {
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificalineadevoluciones(" + i + ");\"" + devoluciones[i][0][1] + "<br>" + devoluciones[i][0][2] + "<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + lineadevolucion[0] + "<\/td>";
            codigotabla += "<td align=\"center\">" + lineadevolucion[1] + "<\/td>";
            codigotabla += "<\/tr>";

        }
    }
    codigotabla += "<\/table><\/small>";
    $('#tbldevolucion').html(codigotabla);
}

function detallepedidoenvases(detalleenvases) {
    var codigodetalleenvases = "<small><strong>Envases</strong><br>";
    codigodetalleenvases += "En pedido:C$" + formatoDinero(Number(detalleenvases[0])) + "<br>";
    codigodetalleenvases += "Devuelto:C$" + formatoDinero(Number(detalleenvases[1])) + "<br>";
    codigodetalleenvases += "Saldo:C$" + formatoDinero(Number(detalleenvases[2])) + "</small>";
    return (codigodetalleenvases);
}

function modificalineapedido(pos) {
    var linea = pedidos[pos][1].split("|");
    productoenuso = pedidos[pos][0];
    numpedido = linea[7];
    tmpconteo = pedidos[pos][0][3];
    texto = "<p>C\ódigo: " + productoenuso[1] + "<br>";
    texto = texto + "Descripci\ón: " + productoenuso[2] + "<\/p>";
    $('#pedidoEncabezado').html(texto);
    $('#pedidocajas').val(linea[0]);
    $('#pedidocajas').focus();
    $('#pedidounidades').val(linea[1]);
    pedidos.splice(pos, 1);

	//Hace que los pedidos persistan...
	persistenciaSistema();

    tablapedido();
    $.mobile.changePage("#page4");
}


function modificalineacambio(pos) {
    var linea = cambios[pos][1].split("|");
    productoenuso = cambios[pos][0];
    numcambio = linea[5];
    texto = "<p>C\ódigo: " + productoenuso[1] + "<br>";
    texto = texto + "Descripci\ón: " + productoenuso[2] + "<\/p>";
    $('#cambioEncabezado').html(texto);
    $('#cambiocajas').val(linea[0]);
    $('#cambiocajas').focus();
    $('#cambiounidades').val(linea[1]);
    $('#cambiomotivo').val(linea[3]);
    cambios.splice(pos, 1);
    tablacambios();
    $.mobile.changePage("#page18");
}

function modificalineadevoluciones(pos) {
    linea = devoluciones[pos][1].split("|");
    productoenuso = devoluciones[pos][0];
    facturaenuso = linea[3];
    numdevolucion = linea[5];
    texto = "<p>Factura:" + facturaenuso + "<br>";
    texto += "C\ódigo: " + productoenuso[1] + "<br>";
    texto = texto + "Descripci\ón: " + productoenuso[2] + "<\/p>";
    $('#devolucionEncabezado').html(texto);
    $('#devolucioncajas').val(linea[0]);
    $('#devolucioncajas').focus();
    $('#devolucionunidades').val(linea[1]);
    devoluciones.splice(pos, 1);
    tabladevolucion();
    window.location = "#page9";
}

function grabaNoVenta() {
    var encontrado = false;
    for ( i = 0; i < motivosnoventa.length; i++) {
        temp = motivosnoventa[i].split("|");
        if (temp[1] == clienteenuso) {
            encontrado = true;
            window.alert("Ya fue ingresado un\nmotivo de no venta");
            break;
        }
    }

    if (!encontrado) {
        x = $('input:radio[name=motivoNoventa]:checked').val();
        x = (isNaN(x) ? "0" : x);
        noventa = fechasistema() + "|" + clienteenuso + "|" + x;
        motivosnoventa.push(noventa);
        persistenciaSistema();
        cambiarIconoCliente(clienteenuso, "icono-no-venta");
        $.mobile.changePage("#page7");
    }
    //persistenciaSistema();
    $('input:radio[name=motivoNoventa]:checked').attr("checked", false).checkboxradio("refresh");
}

function quitaNoVenta() {
    var encontrado = false;
    for ( i = 0; i < motivosnoventa.length; i++) {
        temp = motivosnoventa[i].split("|");
        if (temp[1] == clienteenuso) {
            motivosnoventa.splice(i, 1);
            encontrado = true;
            window.alert("Motivo eliminado");
            $.mobile.changePage("#page6");
            persistenciaSistema();
            break;
        }
    }
    if (!encontrado) {
        window.alert("Cliente no tiene \nmotivo de no venta")
    }
    $('input:radio[name=motivoNoventa]:checked').attr("checked", false).checkboxradio("refresh");
}

// FUNCIONES PARA LA CARGA DE LA TABLA DE LAS DEVOLUCIONES DE ENVASES

function grabaDevolucionenvases() {
    var familia = document.getElementById("famEnvases").value;
    var cant200 = document.getElementById("cant200").value;
    var cant375 = document.getElementById("cant375").value;
    var cant750 = document.getElementById("cant750").value;
    var cant1000 = document.getElementById("cant1000").value;
    var cant1750 = document.getElementById("cant1750").value;

    if ((familia == 1 || familia == 0) && (isFinite(cant200) && isFinite(cant375) && isFinite(cant750) && isFinite(cant1000) && isFinite(cant1750))) {
        var devueltos = Number(cant200 * precioenvases[0]) + Number(cant375 * precioenvases[1]) + Number(cant750 * precioenvases[2]) + Number(cant1000 * precioenvases[3]) + Number(cant1750 * precioenvases[4]);
        var linea = clienteenuso + "|" + Number(cant200) + "|" + Number(cant375) + "|" + Number(cant750) + "|" + Number(cant1000) + "|" + Number(cant1750) + "|" + familia + "|" + Number(devueltos).toFixed(2) + "|" + fechasistema() + "|" + ruta + "-" + clienteenuso + "-" + fechasistema();
        temp1 = linea.split("|");
        var encontrado = false;
        for ( i = 0; i < devolucionenvases.length; i++) {
            temp = devolucionenvases[i].split("|");
            if ((temp1[0] == temp[0] && temp1[6] == temp[6])) {
                encontrado = true;
                break;
            }
        }
        if (encontrado) {
            window.alert("No puede grabar\nesta devolucion\nmodifique la existente!")
        } else {
            devolucionenvases.push(linea);
            $('#cant200').val("");
            $('#cant375').val("");
            $('#cant750').val("");
            $('#cant1000').val("");
            $('#cant1750').val("");
            $('#famEnvases').val("0");
            tabladevEnvases();

        }
    } else {
        window.alert("Debe seleccionar una familia valida / Revise las cantidades");
    }
}



function envasesdevueltosCliente() {
    var sumaenvases = 0;
    for (var z = 0; z < devolucionenvases.length; z++) {
        dev = devolucionenvases[z].split("|");
        if (dev[0] == clienteenuso) {
            sumaenvases += Number(dev[7]);
        }
    }
    return sumaenvases;
}

function pagDevEnvases() {
    tabladevEnvases();
    $.mobile.changePage('#page3');
}

function tabladevEnvases() {
    var sumaenvases = 0;
    var detalledevolucion;
    codigotabla = "<small><table fontborder=\"1\"  style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
    codigotabla += "<tr>\n";
    codigotabla += "<th width=\"50%\" align=\"left\"><small>Producto</small><\/th>\n";
    codigotabla += "<th width=\"20%\">Marca<\/th>\n";
    codigotabla += "<th width=\"30%\">Cant<\/th>\n";
    codigotabla += "<\/tr>\n";

    for ( i = 0; i < devolucionenvases.length; i++) {
        dev = devolucionenvases[i].split("|");
        if (dev[0] == clienteenuso) {
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificaDevolucionenvases(" + i + ");\">Envase 200ML<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + marcaEnvases[dev[6]] + "<\/td>";
            codigotabla += "<td align=\"center\">" + dev[1] + "<\/td>";
            codigotabla += "<\/tr>";
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificaDevolucionenvases(" + i + ");\">Envase 375ML<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + marcaEnvases[dev[6]] + "<\/td>";
            codigotabla += "<td align=\"center\">" + dev[2] + "<\/td>";
            codigotabla += "<\/tr>";
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificaDevolucionenvases(" + i + ");\">Envase 750ML<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + marcaEnvases[dev[6]] + "<\/td>";
            codigotabla += "<td align=\"center\">" + dev[3] + "<\/td>";
            codigotabla += "<\/tr>";
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificaDevolucionenvases(" + i + ");\">Envase 1000ML<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + marcaEnvases[dev[6]] + "<\/td>";
            codigotabla += "<td align=\"center\">" + dev[4] + "<\/td>";
            codigotabla += "<\/tr>";
            codigotabla += "<tr><td align=\"left\"><small>";
            codigotabla += "<u><a onClick=\"modificaDevolucionenvases(" + i + ");\">Envase 1750ML<\/a><\/small><\/u><\/td>";
            codigotabla += "<td align=\"center\">" + marcaEnvases[dev[6]] + "<\/td>";
            codigotabla += "<td align=\"center\">" + dev[5] + "<\/td>";
            codigotabla += "<\/tr>";
            sumaenvases += Number(dev[7]);
        }
    }
    envasesdevueltos = sumaenvases;
    codigotabla += "<\/table><\/small>";
    detalledevolucion = "Envase devuelto:C$" + formatoDinero(Number(envasesdevueltos));
    detalleenvases = new Array(envasespedidos, envasesdevueltos, Number(envasespedidos - envasesdevueltos));
    $('#detenvases').html(detallepedidoenvases(detalleenvases));
    $('#devEnvasesDevueltos').html(detalledevolucion);
    $('#tbldevenvases').html(codigotabla);

}

function modificaDevolucionenvases(pos) {
    var temp = devolucionenvases[pos].split("|");
    $("#famEnvases").val(temp[6]);
    $("#cant200").val(temp[1]);
    $("#cant375").val(temp[2]);
    $("#cant750").val(temp[3]);
    $("#cant1000").val(temp[4]);
    $("#cant1750").val(temp[5]);
    $("#cant200").focus();
    devolucionenvases.splice(pos, 1);
    tabladevEnvases();
    $("#famEnvases").selectmenu("refresh", true);
}

function aNumero(numero) {
    temporal = quitartodo(numero);
    if (isNaN(Number(temporal) / 1)) {
        return 0;
    } else {
        return temporal;
    }

}

function soloNumeros(evt) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = evt.keyCode ? evt.keyCode : evt.which;
    return (key <= 40 || (key >= 48 && key <= 57));
}

function actualizaIconos() {
    var temp1;
    var temp2;

    for ( i = 0; i < motivosnoventa.length; i++) {
        temp1 = motivosnoventa[i].split("|");
        cambiarIconoCliente(temp1[1], "icono-no-venta");
    }

    for ( i = 0; i < confirmapedidos.length; i++) {
        temp2 = confirmapedidos[i].split("|");
        cambiarIconoCliente(temp2[1], "icono-preventa");
    }
    marcaDocpendientes();
    $('#page7').page();
}

function cambioProductos() {
    var completadescarga = true;
    if (!tieneFacturas("CMB")) {
        for ( i = 0; i < cambios.length; i++) {
            lineacambios = cambios[i][1].split("|");
            if (cambios[i][0][0] == clienteenuso) {
                if (!confirmaInventario(cambios[i][0][1], lineacambios[2])) {
                    completadescarga = false;
                    window.alert("No puede continuar con los cambios, valide cantidades o productos!");
                    break;

                }else
		            {
		            		descargaInventario(cambios[i][0][1], lineacambios[2]);
						
		            }

            }

        }
        
       

        if (completadescarga) {
            imprimeCambio();
        }
    } else {
        window.alert("Este cliente ya posee cambio de producto!");
        reimprimeCambio("CMB", "COPIA");
    }
}


 /*

 1-Si tiene facturas, REIMPRESION
 2-Si no tiene facturas,
 	1-Si    tiene facturas en WEBSQL,    IMPRESION con los datos de WEBSQL
 	2-Si no tiene facturas en WEBSQL,    registrar en WEBSQL, IMPRESION con datos en memoria

 */
 function facturaProducto() {


     // Por seguridad, para prevenir bloqueo del botón de facturar
     window.setTimeout(LigarEventosFacturar(),10000);


     $("#imprimeDocEntrega").addClass('hide');
     ocultarProductosEncontrados();
     var completadescarga = true;
     if ( !tieneFacturas("PROD") ){
	db_smart_sales.metodos.ExisteFacturaProductoWSQL(clienteenuso,
						function(resultado){
							var existeFactura = resultado.rows.length > 0;
							if(existeFactura){

                                var confirma_factura= window.confirm("Esta seguro que desea imprimir la facturar al cliente "+ clienteenuso +"?");

                                if(confirma_factura){

                                // Tiene factura en WebSQL
								// Transformamos el objeto a un array, para poder usar map y reduce
								var filas      = $.map(resultado.rows,(value,index)=>{return [value]});
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
								// Armamos la cabecera de la factura
								var original     = "ORIGINAL";
								var factura      = "FACTURA";
								var cliente      = clienteenuso;
								var dato3        = buscadatosCliente(clienteenuso)[3];
								var codFac       = resultado.rows.item(0).Linea_Pedido.split("|")[8];
								var nombcl       = buscadatosCliente(clienteenuso)[1];
								var rut          = ruta;
								var fech         = formatofecha(resultado.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[0]);
								var nulo1        = null;
								var hora     	 = resultado.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[1];
								var factNumPedid = (resultado.rows.item(0).Linea_Pedido.split("|")[7] != "") ? resultado.rows.item(0).Linea_Pedido.split("|")[7] : numpedido;
								var tipocli  	 = buscadatosCliente(clienteenuso)[2];
								var subtotalfac  = subtotal;
								var ivafac       = iva;
								var total        = Number(subtotalfac) + Number(ivafac);
								var nulo2        = null;
								var nulo3        = null;
								var FCLIQ        = resultado.rows.item(0).Linea_Pedido.split("|")[11];


								var EncabezadoFactura = [original,
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

								// Registramos los log de impresion
								var docimp = ruta + "|FACTURA|ORIGINAL|" + codFac + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
								var facimp = EncabezadoFactura.join("|") + "|PROD";
								// Damos la orden de impresion de la factura
								dataFacturacion(EncabezadoFactura, detalleFactura, 0,docimp,facimp);

                                }
                                LigarEventosFacturar();

							}
							else{
								// No tiene factura en WEBSQL
                                //Acumula Monto de pedidos...
                                var TotalPedidos=0;
                                for ( i = 0; i < pedidos.length; i++) {
                                    lineapedido = pedidos[i][1].split("|");
                                    if (pedidos[i][0][0] == clienteenuso) {
                                        if (pedidos[i][0][6] != "1D") {

                                            if (!confirmaInventario(pedidos[i][0][1], lineapedido[2])) {
                                                completadescarga = false;
                                                //window.alert("No puede continuar con la facturación, valide cantidades o productos!");
                                                LigarEventosFacturar();
                                                navigator.notification.alert('No puede continuar con la facturación, valide cantidades o productos!',
                                                null, // callback
                                                'ERROR', // title
                                                'Aceptar' // buttonName
                                                );

                                                break;
                                            }
                                            //Suma los Montos de los pedidos...
                                            if(esValido(lineapedido[4])){
                                                TotalPedidos+=Number(lineapedido[4]);
                                            }
                                            else{
                                                completadescarga = false;
                                                LigarEventosFacturar();
                                                navigator.notification.alert('No puede continuar con la facturación, monto producto invalido!',
                                                null, // callback
                                                'ERROR', // title
                                                'Aceptar' // buttonName
                                                );
                                                return;
                                            }
                                        }
                                    }
                                }
                                if (completadescarga) {
                                     var confirma_factura= window.confirm("Esta seguro que desea facturar al cliente "+ clienteenuso +"?");
                                     if(confirma_factura){
                                     var clienteActual = buscadatosCliente(clienteenuso);
                                      if(clienteActual[2] != 'CONTADO'){
                                        //Si es cliente de credito....
                                               var saldoCli=CalcularSaldoCliente();
                                               saldoCli.done(function(saldo){
                                                    console.log("Saldo calculado "+saldo);
                                                    console.log("Saldo en Uso "+ saldoEnUso);
                                                    if(saldo-TotalPedidos<0){
                                                        limiteExcedido=1;
                                                        LigarEventosFacturar();
                                                        navigator.notification.alert('Esta factura excede el crédito disponible.\nSaldo Actual: C$'+formatoDinero(saldo),
                                                       null, // callback
                                                       'Crédito Excedido', // title
                                                       'Aceptar' // buttonName
                                                       );

                                                       $("#imprimeDocEntrega").removeClass('hide');

                                                    }
                                                    else{
                                                        limiteExcedido=0;
                                                        facturalineas();
                                                    }
                                               });
                                               saldoCli.fail(function(mensajeError){
                                                   LigarEventosFacturar();
                                                   alert(mensajeError);
                                                });
                                      }
                                      else{
                                         //Si es cliente de contado...
                                         limiteExcedido=0;
                                         facturalineas();
                                      }
                                     }
                                     LigarEventosFacturar();
                                }
                                LigarEventosFacturar();
							}
						},function(){
							LigarEventosFacturar();
							console.log("Error de WebSQL");
						});
 	//Si ya tiene factura reimprime
 	 } else {

         navigator.notification.alert('Este cliente ya posee factura de producto!',
 	            null, // callback
 	            'Reimpresión', // title
 	            'Aceptar' // buttonName
 	            );

         reimprimeFactura("PROD", "REIMPRESION");
     }

 }


function BuscarNumeroFacturaManual(TipoFactura){
    var cadena =""
     for (var x = 0;x < facturasimpresas.length; x++) {
        var tmpEncfacturas = facturasimpresas[x].split("|");
       if (tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[18] == TipoFactura) {
           cadena = tmpEncfacturas[17];
        }
    }
    return cadena
}
function formatofecha(fechasnformato) {
    var tmpfechaformato = fechasnformato.substring(6, 8) + "/" + fechasnformato.substring(4, 6) + "/" + fechasnformato.substring(0, 4);
    return tmpfechaformato;
}

function calculatstamp() {
    var facfecha = new Date();
    var dia = (facfecha.getDate()).toString();
    var mes = (facfecha.getMonth() + 1).toString();
    var anio = (facfecha.getFullYear()).toString();
    var hora = (facfecha.getHours()).toString();
    var minutos = (facfecha.getMinutes()).toString();

    if (hora.length == 1) {
        hora = "0" + hora;
    }
    if (minutos.length == 1) {
        minutos = "0" + minutos;
    }
    if (dia.length == 1) {
        dia = "0" + dia;
    }
    if (mes.length == 1) {
        mes = "0" + mes;
    }

    var stamp = anio + mes + dia + hora + minutos;
    return stamp;
}

function horasistema() {
    var facfecha = new Date();
    var hora = (facfecha.getHours()).toString();
    var minutos = (facfecha.getMinutes()).toString();
    if (hora.length == 1) {
        hora = "0" + hora;
    }
    if (minutos.length == 1) {
        minutos = "0" + minutos;
    }
    lahora = hora + ":" + minutos;
    return lahora;
}

/*actualizamos la fecha actual*/
function fechasistema() {
    var facfecha = new Date();
    var dia = (facfecha.getDate()).toString();
    var mes = (facfecha.getMonth() + 1).toString();
    var anio = (facfecha.getFullYear()).toString();

    if (mes.length == 1) {
        mes = "0" + mes;
    }

    if (dia.length == 1) {
        dia = "0" + dia;
    }
    var lafecha = "" + anio + mes + dia;
    return lafecha;
}

function buscadatosProducto(codigoCliente, codigoProd) {
    var lineaprod = false;
    for ( j = 0; j < productos.length; j++) {
        lineaprod = productos[j].split("|");
        if (lineaprod[0] == clienteCorporativo && lineaprod[1] == codigoProd) {
            return lineaprod;
            break;
        }
    }
}

function buscadatosCliente(codigoCliente) {
    var datoscliente = new Array();
    for (var j = 0; j < listaclientes.length; j++) {
        var tmpcliente = listaclientes[j].split("|");
        if (tmpcliente[0] == codigoCliente) {
            if(tmpcliente[14] == "00" || tmpcliente[14] == "01") {
                condicion = "CONTADO";
            } else {
                condicion = "CREDITO";
            }
            datoscliente = [tmpcliente[0], tmpcliente[1], condicion, tmpcliente[3], tmpcliente[13]];
            break;
        }
    }
    return datoscliente;
}

function creacorrelativo(tmpnumero) {
    var tmp = "";
    numero = tmpnumero.toString();
    if (numero.length == 1) {
        tmp += "0000" + numero;
    }
    if (numero.length == 2) {
        tmp += "000" + numero;
    }
    if (numero.length == 3) {
        tmp += "00" + numero;
    }
    if (numero.length == 4) {
        tmp += "0" + numero;
    }
    if (numero.length == 5) {
        tmp += numero;
    }
    if (numero.length > 5) {
        tmp += numero;
    }
    return tmp;
}

function imprimeCambio() {
    var numcambio = "";
    var hora = horasistema();
    var posicion;

    var cambioDetalle = new Array();

    for (var z = 0; z < cambios.length; z++) {
        posicion = z;
        lineacambio = cambios[z][1].split("|");
        productoenuso = cambios[z][0];
        numcambio = lineacambio[5];
        if (productoenuso[0] == clienteenuso) {
            cambiosRuta.push(cambios[z]);
            cambioDetalle.push([productoenuso[1], productoenuso[2], lineacambio[0], lineacambio[1], null, null, motivosCambios[lineacambio[3]]]);

        }

    }

    var factDatosCliente = buscadatosCliente(clienteenuso);
    //Se agrea una posicion mas para verificar el tipo de factura en la posicion 18
    var imprEncabezadoCambio = ["ORIGINAL", "CAMBIO", clienteenuso, factDatosCliente[3], numcambio, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, null, null, null, null, null, null, null,null];
    facturasimpresas.push(imprEncabezadoCambio.join("|") + "|CMB");

    docsimpresos.push(ruta + "|CAMBIO|ORIGINAL|" + numcambio + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
    window.alert("Cambio impreso!");
    persistenciaSistema();
    dataFacturacion(imprEncabezadoCambio, cambioDetalle, 0);

}

function procesaDevolucion() {
    if (!tieneFacturas("DEV")) {
        imprimeDevolucion();
    } else {
        window.alert("A este cliente ya posee devolucion!");
        reimprimeDevolucion("DEV", "COPIA");
    }

}

function imprimeDevolucion() {
    var numdevolucion = "";
    var hora = horasistema();
    var posicion;

    /* Var Encabezado Factura */
    var factNumPedido;
    var factSubtotal = 0.00;
    var factIva = 0.00;
    var factTotal = 0.00;

    var devolDetalle = new Array();
    var imprEncabezadoDevol = new Array();

    for ( j = 0; j < devoluciones.length; j++) {
        posicion = j;
        lineadevolucion = devoluciones[j][1].split("|");
        if (devoluciones[j][0][0] == clienteenuso) {
            numdevolucion = ruta + fechasistema() + "-DEV-" + clienteenuso;
            tmplinea = lineadevolucion.join("|");
            tmplinea += "|" + numdevolucion + "|" + fechasistema() + " " + hora;
            sku = devoluciones[posicion][0];
            devoluciontmp = new Array(sku, tmplinea);
            devolucionesRuta.push(devoluciontmp);

            devolDetalle.push([sku[1], sku[2], lineadevolucion[0], lineadevolucion[1], null, null, null]);

        }

    }

    var factDatosCliente = buscadatosCliente(clienteenuso);

    /*
     * 0= TipoImpresion 1= Titulo 2= codigoCliente 3= No.Devolucion 4=
     * No. Factura 5= nombre Cliente 6= ruta 7= fecha 8=
     * fechaFacturaDevo 9= hora 10= pedido 11= TipoFact 12= subtotal 13=
     * IVA 14= Total
     */
    //Se agrega una posicion mas para ubicar el tipo de factura en la posicin 18
    imprEncabezadoDevol = ["ORIGINAL", "DEVOLUCION", clienteenuso, facturaenuso, numdevolucion, factDatosCliente[1], ruta, formatofecha(fecha), formatofecha(fechafacturaenuso), hora, null, null, null, null, null, formatoDinero(montofacturaenuso), formatoDinero(saldofacturaenuso),null];
    facturasimpresas.push(imprEncabezadoDevol.join("|") + "|DEV");

    docsimpresos.push(ruta + "|DEVOLUCION|ORIGINAL|" + numdevolucion + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
    window.alert("Devolucion impresa!");
    persistenciaSistema();
    dataFacturacion(imprEncabezadoDevol, devolDetalle, 0);

}

/**
 * Actualizado: 07-01-2014
 * @autor: cgarcia
 * cambios: * Bloqueo de Saldo
 * 			* Mejora en Rendimiento
 * 			* 
 * * Actualizado: 22-06-2015
 * @autor: cgarcia
 * cambios: * Bloqueo de Saldo
 * 			* Mejora en Rendimiento
 * 			* 
 */
function facturalineas() {

    //Parche para correlativo no numerico...
    if(isNaN(Number(correlativo))){
        LigarEventosFacturar();
        alert("Ocurrio un error, por favor, intente facturar nuevamente. Si el problema continua cierra y vuelva a abrir la aplicación");
        return;
    }

    var numfactura = "";
    var hora = horasistema();
    var posicion;

    //Cargar nuevamente el correlativo
    var tmpcorrelativo = creacorrelativo(correlativo);
    /* Var Encabezado Factura */
    var factNumPedido;
    var factSubtotal = 0.00;
    var factIva = 0.00;
    var factTotal = 0.00;

    var factDetalle = new Array();
    var imprEncabezadoFactura = new Array();
	var factDatosCliente = buscadatosCliente(clienteenuso);

    for ( j = 0; j < pedidos.length; j++) {
        posicion = j;
        lineapedido = pedidos[j][1].split("|");
        if (pedidos[j][0][0] == clienteenuso) {
            if (pedidos[j][0][6] != "1D") {
                if (descargaInventario(pedidos[j][0][1], lineapedido[2])) {
                    numfactura = ruta + "-" + tmpcorrelativo;
                   var tmplinea = lineapedido.join("|");
                    tmplinea += "|" + numfactura + "|" + fechasistema() + " " + hora;
                    //Agregamos el tipo de factura a la linea de las 
                    tmplinea += "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");
                    
                    //Si el codigo de referencia manual no es vacio se agrega a la linea
                    if(FCLiquido != ""){ tmplinea += "|"+  FCLiquido }

                    //Se asigna el en el objeto temporal (sku)  el codigo de cliente en uso. 
                    //Agregada por Mroque 12/01/2016
                    var sku = pedidos[j][0];
                    sku[0] = clienteenuso
                    var facturatmp = new Array(sku, tmplinea);
                    facturas.push(facturatmp);
                    /*
                    //Callback de exito para WebSQL Insert Factura...
                    var ExitoCallback=function(){
                    	logErrores.push('Inserción exitosa...');
                    	errorFacturacion.push(0);
                    };*/
                    //Se inserta a la tabla de factura de web sql 

                    ////facturatmp[0][0]
                    /*
                    if(facturatmp[0][1]=='830NI0418I'|| facturatmp[0][1]=='830NI0418IEX'){
                    	db_smart_sales.metodos.insertar_factura('A',facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],function(){},2);
                    }else{
                    	db_smart_sales.metodos.insertar_factura(facturatmp[0][0],facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],function(){},2);
                    }*/
                    //facturatmp[0][0]
                    db_smart_sales.metodos.insertar_factura(facturatmp[0][0],facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],function(){},2);

                    //Define callback de exito y numero de intentos...
                    //facturatmp[0][0]
                   // db_smart_sales.metodos.insertar_factura(facturatmp[0][0],facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],ExitoCallback,3);

                    
                    factNumPedido = (lineapedido[7] != "") ? lineapedido[7] : numpedido;
                    console.log("** SUBTOTAL **: "+lineapedido[3]);
                    factSubtotal = (Number(factSubtotal) + Number(lineapedido[3])).toFixed(2);
                    console.log("** Factura IVA ** "+lineapedido[5]);
                    factIva = (Number(factIva) + Number(lineapedido[5])).toFixed(2);
                    factTotal = (Number(factIva) + Number(factSubtotal)).toFixed(2);

                   // factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);

					factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], Number(lineapedido[3] / lineapedido[2]).toFixed(4), Number(lineapedido[3]).toFixed(2), null]);

					//console.log("pedido: "+[sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);

                }

            }

        }

    }

    
	//Revision 2015-06-22
	/**
	 * Tomamos el valor de la variable imprEncabezadoFactura: factDatosCliente[0] por clienteenuso
	 */

    //imprEncabezadoFactura = ["ORIGINAL", "FACTURA", factDatosCliente[0], factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null];
    imprEncabezadoFactura = ["ORIGINAL", "FACTURA", clienteenuso, factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null, FCLiquido];
    
    var tmpDocpendiente = "" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + factTotal + "|" + factTotal + "|" + (factDatosCliente[2] == "CONTADO"?"1":"0")+ "|" + factTotal;

    if(FCLiquido != ""){ tmpDocpendiente += "|"+  FCLiquido}
    
    if (factDetalle.length != 0) {
        
        //Se crea el archivo de respaldo de la tabla de factura de web sql
        db_smart_sales.metodos.succes_factura_insertada("facturas_web_sql")

        //Se incrementa el numero de correlativo y se guarda autamitcamente. cambio realizado por MR 08/01/2016
        correlativo++;
        grabatmp("6", correlativo);


//        docsimpresos.push(ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
//
//        facturasimpresas.push(imprEncabezadoFactura.join("|") + "|PROD");


		//Permite abonarle a una factura del dia.
		docspendientes.unshift(tmpDocpendiente);

        if (factDatosCliente[2] == "CONTADO") {
            
                 navigator.notification.alert('Si no cancela esta factura en su totalidad le será generado un faltante, el monto a cancelar es: C$' + formatoDinero(factTotal), 
						null, // callback
						numfactura, // title
						'Aceptar' // buttonName
						);
            
            //**QUITAR ESTO
            //Aqui nos damos cuenta que la factura es de contado.
            $("#btnInfoClientePagos").hide();
            pagoBloqueado = 1;
            
          
            
            
        }

       	  $("#btnAtras").hide();	
        
        //..Persistencia
         persistenciaSistema();        
        
         console.log("Encabezado de Factura: "+imprEncabezadoFactura);
         console.log("Detalle de Factura: "+factDetalle);
        //Imprimimos Factura...

        var docimp = ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
        var facimp = imprEncabezadoFactura.join("|") + "|PROD";
        console.log("EncabezadoFAC");
        console.log(imprEncabezadoFactura);
        console.log("DetalleFAC");
        console.log(factDetalle);
        dataFacturacion(imprEncabezadoFactura, factDetalle, 0,docimp,facimp);
        
       /*         
       //Alerta de Facturacion Exitosa
        navigator.notification.alert('Facturado con Exito!', 
						null, // callback
						numfactura, // title
						'Aceptar' // buttonName
						);
        */
        
        //ACtualizamos indicadores.
        marcaDocpendientes();
        imprEncabezadoFactura = null;
        factDetalle = null;
        obtenerSaldoActual();
        
        
        
        
    } else {
       LigarEventosFacturar();
       navigator.notification.alert('Debe de ingresar al menos una linea para facturar!',
						null, // callback
						'Error', // title
						'Aceptar' // buttonName
						);
    }

}

function facturaEnvases() {

    // Por seguridad, para prevenir bloqueo del botón de facturar
    window.setTimeout(LigarEventosFacturar(),10000);


    $("#imprimeDocEntregaEnvase").addClass('hide');

    //Parche para correlativo no numerico...
    if(isNaN(Number(correlativo))){
        LigarEventosFacturar();
        alert("Ocurrio un error, por favor, intente facturar nuevamente. Si el problema continua cierra y vuelva a abrir la aplicación");
        return;
    }

    var numfactura = "";
    var hora = horasistema();
    var posicion;
    var tmpcorrelativo = creacorrelativo(correlativo);
    var factNumPedido;
    var factSubtotal = 0;
    var factIva = 0;
    var factTotal = 0;

    var factDetalle = new Array();
    var imprEncabezadoFactura = new Array();

	var factDatosCliente = buscadatosCliente(clienteenuso);

     if (!tieneFacturas("ENV")) {
	db_smart_sales.metodos.ExisteFacturaEnvaseWSQL(clienteenuso,
						function(resultado){
							var existeFactura = resultado.rows.length > 0;
							if(existeFactura){

                                var confirma_factura= window.confirm("Esta seguro que desea imprimir la facturar al cliente "+ clienteenuso +"?");

                                if(confirma_factura){

								// Transformamos el objeto a un array, para poder usar map y reduce
								var filas      = $.map(resultado.rows,(value,index)=>{return [value]});
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
								// Armamos la cabecera de la factura
								var original     = "ORIGINAL";
								var factura      = "FACTURA";
								var cliente      = clienteenuso;
								var dato3        = buscadatosCliente(clienteenuso)[3];
								var codFac       = resultado.rows.item(0).Linea_Pedido.split("|")[8];
								var nombcl       = buscadatosCliente(clienteenuso)[1];
								var rut          = ruta;
								var fech         = formatofecha(resultado.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[0]);
								var nulo1        = null;
								var hora     	 = resultado.rows.item(0).Linea_Pedido.split("|")[9].split(" ")[1];
								var factNumPedid = (resultado.rows.item(0).Linea_Pedido.split("|")[7] != "") ? resultado.rows.item(0).Linea_Pedido.split("|")[7] : numpedido;
								var tipocli  	 = buscadatosCliente(clienteenuso)[2];
								var subtotalfac  = subtotal;
								var ivafac       = iva;
								var total        = Number(subtotalfac) + Number(ivafac);
								var nulo2        = null;
								var nulo3        = null;
								var FCLIQ        = resultado.rows.item(0).Linea_Pedido.split("|")[11];


								var EncabezadoFactura = [original,
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

								// Registramos los log de impresion
								var docimp = ruta + "|FACTURA|ORIGINAL|" + codFac + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
								var facimp = EncabezadoFactura.join("|") + "|ENV";

								 

								// Damos la orden de impresion de la factura
								dataFacturacion(EncabezadoFactura, detalleFactura, 0,docimp,facimp);

                                }
                                LigarEventosFacturar();
                                 

							}
							else{
								// No tiene facturas en WEBSQL
                                   var confirma_factura= window.confirm("Esta seguro que desea facturar al cliente "+ clienteenuso +"?");
                                    if(confirma_factura){

                                        //Acumula Monto de pedidos...
                                        var TotalPedidos=0;

                                        //Itera en pedidos...
                                        for ( j = 0; j < pedidos.length; j++) {
                                            lineapedido = pedidos[j][1].split("|");
                                            if (pedidos[j][0][0] == clienteenuso) {
                                                if (pedidos[j][0][6] == "1D") {
                                                    //Suma los Montos de los pedidos...
                                                    if(esValido(lineapedido[4])){
                                                        TotalPedidos+=Number(lineapedido[4]);
                                                    }
                                                    else{
                                                        completadescarga = false;
                                                        LigarEventosFacturar();
                                                        navigator.notification.alert('No puede continuar con la facturación, monto producto invalido!',
                                                        null, // callback
                                                        'ERROR', // title
                                                        'Aceptar' // buttonName
                                                        );
                                                         
                                                        return;
                                                    }
                                                }
                                            }
                                        }

                                        console.log('Pedido '+TotalPedidos);

                                        var clienteActual = buscadatosCliente(clienteenuso);

                                         if(clienteActual[2] != 'CONTADO'){
                                            //Si es cliente de credito....
                                                    var saldoCli=CalcularSaldoCliente();

                                                    saldoCli.done(function(saldo){

                                                        console.log("Saldo calculado "+saldo);
                                                        console.log("Saldo en Uso "+ saldoEnUso);

                                                        if(saldo-TotalPedidos<0){

                                                            limiteExcedidoEnv=1;
                                                            LigarEventosFacturar();
                                                            navigator.notification.alert('Esta factura excede el crédito disponible.\nSaldo Actual: C$'+formatoDinero(saldo),
                                                                null, // callback
                                                                'Crédito Excedido', // title
                                                                'Aceptar' // buttonName
                                                            );
                                                             
                                                            $("#imprimeDocEntregaEnvase").removeClass('hide');

                                                        }
                                                        else{

                                                            limiteExcedidoEnv=0;
                                                            /******************/
                                                            for ( j = 0; j < pedidos.length; j++) {
                                                                posicion = j;
                                                                lineapedido = pedidos[j][1].split("|");
                                                                if (pedidos[j][0][0] == clienteenuso) {
                                                                    if (pedidos[j][0][6] == "1D") {
                                                                        lineapedido[7]="";
                                                                        numfactura = ruta + "-" + tmpcorrelativo;
                                                                        var tmplinea = lineapedido.join("|");
                                                                        console.log("Hora Sistema: " + horasistema());
                                                                        tmplinea += "|" + numfactura + "|" + fechasistema() + " " + horasistema();
                                                                        //Agregamos el tipo de factura a la linea de las facturas
                                                                        tmplinea += "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");

                                                                        if(FCEnvase != ""){
                                                                            tmplinea += "|"+  FCEnvase;
                                                                        }

                                                                        //Se asignan el en el objeto temporal (sku) el codigo de cliente en uso.
                                                                        //Agregada por Mroque 12/01/2016
                                                                       var sku = pedidos[j][0];
                                                                        sku[0]= clienteenuso

                                                                        var facturatmp = new Array(sku, tmplinea);
                                                                        facturas.push(facturatmp);

                                                                        //Se inserta a la tabla de factura
                                                                        db_smart_sales.metodos.insertar_factura(facturatmp[0][0],facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],function(){},2);


                                                                        factNumPedido = (lineapedido[7] != "") ? lineapedido[7] : numpedido;
                                                                        factSubtotal += Number(lineapedido[3]);
                                                                        factTotal += Number(lineapedido[4]);
                                                                        factIva += Number(lineapedido[5]);

                                                                        factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);
                                                                    }

                                                                }

                                                        }

                                                        imprEncabezadoFactura = ["ORIGINAL", "FACTURA", clienteenuso, factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, horasistema(), factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null, FCEnvase];
                                                        var tmpDocpendiente = "" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + Number(factTotal).toFixed(2) + "|" + Number(factTotal).toFixed(2) + "|" + (factDatosCliente[2] == "CONTADO"?"1":"0")+ "|" + Number(factTotal).toFixed(2);
                                                         if(FCEnvase != ""){ tmpDocpendiente += "|"+  FCEnvase }

                                                        if (factDetalle.length != 0) {


                                                                //Se crea el archivo de respaldo de la tabla de factura de web sql
                                                                    db_smart_sales.metodos.succes_factura_insertada("facturas_web_sql")

                                                                 //Se incrementa el numero de correlativo y se guarda autamitcamente. cambio realizado por MR 08/01/2016
                                                                    correlativo++;
                                                                    grabatmp("6", correlativo);

                    //                                            docsimpresos.push(ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
                    //                                            facturasimpresas.push(imprEncabezadoFactura.join("|") + "|ENV");



                                                                docspendientes.unshift(tmpDocpendiente);
                                                                if (factDatosCliente[2] == "CONTADO") {

                                                                    window.alert("Si no cancela esta factura en su totalidad le sera generado un faltante, el monto a cancelar es: " + formatoDinero(factTotal));

                                                                     //**QUITAR ESTO
                                                                    //Aqui nos damos cuenta que la factura es de contado.
                                                                    $("#btnInfoClientePagos").hide();
                                                                    pagoBloqueado = 1;


                                                                }

                                                                $("#btnAtras").hide();

                                                                persistenciaSistema();

                                                                var docimp = ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
                                                                var facimp = imprEncabezadoFactura.join("|") + "|ENV";

                                                                 

                                                                dataFacturacion(imprEncabezadoFactura, factDetalle, 0,docimp,facimp);

                                                                 navigator.notification.alert('Facturado con Exito!',
                                                                            null, // callback
                                                                            numfactura, // title
                                                                            'Aceptar' // buttonName
                                                                            );

                                                                marcaDocpendientes();
                                                                imprEncabezadoFactura = null;
                                                                factDetalle = null;

                                                                obtenerSaldoActual();

                                                                } else {
                                                                 
                                                                LigarEventosFacturar();
                                                                window.alert("Debe de ingresar al menos una linea para facturar");
                                                            }

                                                            /*****************/
                                                        }

                                                    });

                                                    saldoCli.fail(function(mensajeError){
                                                        LigarEventosFacturar();
                                                        alert(mensajeError);

                                                    });
                                         }//fin IF cliente de credito...
                                         else{
                                             //Si es cliente de contado...
                                                limiteExcedidoEnv=0;
                                                /******************/
                                                for ( j = 0; j < pedidos.length; j++) {
                                                    posicion = j;
                                                    lineapedido = pedidos[j][1].split("|");
                                                    if (pedidos[j][0][0] == clienteenuso) {
                                                        if (pedidos[j][0][6] == "1D") {
                                                            lineapedido[7]="";
                                                            numfactura = ruta + "-" + tmpcorrelativo;
                                                            var tmplinea = lineapedido.join("|");
                                                            console.log("Hora Sistema: " + horasistema());
                                                            tmplinea += "|" + numfactura + "|" + fechasistema() + " " + horasistema();
                                                            //Agregamos el tipo de factura a la linea de las facturas
                                                            tmplinea += "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");

                                                            if(FCEnvase != ""){
                                                                tmplinea += "|"+  FCEnvase;
                                                            }

                                                            //Se asignan el en el objeto temporal (sku) el codigo de cliente en uso.
                                                            //Agregada por Mroque 12/01/2016
                                                           var sku = pedidos[j][0];
                                                            sku[0]= clienteenuso

                                                            var facturatmp = new Array(sku, tmplinea);
                                                            facturas.push(facturatmp);

                                                            //Se inserta a la tabla de factura
                                                            db_smart_sales.metodos.insertar_factura(facturatmp[0][0],facturatmp[0][1],facturatmp[0][2],facturatmp[0][3],facturatmp[0][4],facturatmp[0][5],facturatmp[0][6],facturatmp[0][7],facturatmp[1],function(){},2);


                                                            factNumPedido = (lineapedido[7] != "") ? lineapedido[7] : numpedido;
                                                            factSubtotal += Number(lineapedido[3]);
                                                            factTotal += Number(lineapedido[4]);
                                                            factIva += Number(lineapedido[5]);

                                                            factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);
                                                        }

                                                    }

                                            }

                                            imprEncabezadoFactura = ["ORIGINAL", "FACTURA", clienteenuso, factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, horasistema(), factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null, FCEnvase];
                                            var tmpDocpendiente = "" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + Number(factTotal).toFixed(2) + "|" + Number(factTotal).toFixed(2) + "|" + (factDatosCliente[2] == "CONTADO"?"1":"0")+ "|" + Number(factTotal).toFixed(2);
                                             if(FCEnvase != ""){ tmpDocpendiente += "|"+  FCEnvase }

                                            if (factDetalle.length != 0) {


                                                    //Se crea el archivo de respaldo de la tabla de factura de web sql
                                                        db_smart_sales.metodos.succes_factura_insertada("facturas_web_sql")

                                                     //Se incrementa el numero de correlativo y se guarda autamitcamente. cambio realizado por MR 08/01/2016
                                                        correlativo++;
                                                        grabatmp("6", correlativo);

                    //								docsimpresos.push(ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
                    //								facturasimpresas.push(imprEncabezadoFactura.join("|") + "|ENV");



                                                    docspendientes.unshift(tmpDocpendiente);
                                                    if (factDatosCliente[2] == "CONTADO") {

                                                        window.alert("Si no cancela esta factura en su totalidad le sera generado un faltante, el monto a cancelar es: " + formatoDinero(factTotal));

                                                         //**QUITAR ESTO
                                                        //Aqui nos damos cuenta que la factura es de contado.
                                                        $("#btnInfoClientePagos").hide();
                                                        pagoBloqueado = 1;


                                                    }

                                                    $("#btnAtras").hide();

                                                    persistenciaSistema();

                                                    var docimp = ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
                                                    var facimp = imprEncabezadoFactura.join("|") + "|ENV";

                                                     

                                                    dataFacturacion(imprEncabezadoFactura, factDetalle, 0,docimp,facimp);

                                                     navigator.notification.alert('Facturado con Exito!',
                                                                null, // callback
                                                                numfactura, // title
                                                                'Aceptar' // buttonName
                                                                );

                                                    marcaDocpendientes();
                                                    imprEncabezadoFactura = null;
                                                    factDetalle = null;

                                                    obtenerSaldoActual();

                                                    } else {
                                                     
                                                    LigarEventosFacturar();
                                                    window.alert("Debe de ingresar al menos una linea para facturar");
                                                }

                                                /*****************/
                                         }//fin IF cliente de contado...



                                    }
                                    LigarEventosFacturar();
                                     

							}
						},function(){
							LigarEventosFacturar();
							console.log("Error de WebSQL");
							 
						});
    } else {



        navigator.notification.alert('Este cliente ya posee factura de envases!',
	            null, // callback
	            'Reimpresión', // title
	            'Aceptar' // buttonName
	            );
        reimprimeFactura("ENV", "REIMPRESION");

    }

}

function tieneFacturas(tipoFactura) {
    var tienerespuesta = false;
    var tmpEncfacturas;
    var tmpEncabezado;

    for ( zzz = 0; zzz < facturasimpresas.length; zzz++) {
        var tmpEncfacturas = facturasimpresas[zzz].split("|");
        if (tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[18] == tipoFactura) {
            tienerespuesta = true;
            break;
        }
    }
    return tienerespuesta;
}

function tieneAbonos() {
    var abnRespuesta = false;
    var tmpEncabonos;

    for ( z = 0; z < facturasimpresas.length; z++) {
        var tmpEncabonos = facturasimpresas[z].split("|");
        //		console.log(tmpEncabonos);
        if (tmpEncabonos[3] == clienteenuso && tmpEncabonos[14] == "REC" && tmpEncabonos[8] == facturaenuso) {
            abnRespuesta = true;
            console.log("encontro");
            break;
        }
    }
    return abnRespuesta;
}

function buscaCorrelativoabono() {
    var abnCorrelativo = "";
    var tmpEncabonos;

    for ( z = 0; z < facturasimpresas.length; z++) {
        var tmpEncabonos = facturasimpresas[z].split("|");
        if (tmpEncabonos[3] == clienteenuso && tmpEncabonos[14] == "REC" && tmpEncabonos[8] == facturaenuso) {
            abnCorrelativo = tmpEncabonos[2];
            console.log("encontro");
            break;
        }
    }
    return abnCorrelativo;
}

function reimprimeFactura(tipoFactura, tipoImpresion) {
    respuesta = false;
    var tmpEncfacturas;
    var tmpEncabezado;
    var tmpdetalleFact = new Array();
    for ( i = 0; i < facturasimpresas.length; i++) {
        tmpEncfacturas = facturasimpresas[i].split("|");
        
        if (tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[18] == tipoFactura) {
            respuesta = true;
            tmpEncfacturas.pop();
            tmpEncfacturas.splice(0, 1);
            tmpEncabezado = tmpEncfacturas;
            tmpEncabezado.unshift(tipoImpresion);
            for ( j = 0; j < facturas.length; j++) {
                tmplineafactura = facturas[j][1].split("|");
                if (facturas[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
                    tmplineaFact = [facturas[j][0][1], facturas[j][0][2], tmplineafactura[0], tmplineafactura[1], Number(tmplineafactura[3] / tmplineafactura[2]).toFixed(4), tmplineafactura[3]];
					
                     console.log("Linea: "+facturas[j][0]);
					 console.log("TMP: "+tmplineaFact);
                     
					
                    tmpdetalleFact.push(tmplineaFact);

                }

            }
        }
    }
    if (respuesta) {
    	var datoClienteRUC = buscadatosCliente(clienteenuso);
		tmpEncabezado[3] = datoClienteRUC[3];
		var docimpr = ruta + "|FACTURA|" + tipoImpresion + "|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
        dataFacturacion(tmpEncabezado, tmpdetalleFact, 1,docimpr);
//        docsimpresos.push(ruta + "|FACTURA|" + tipoImpresion + "|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
        console.log(docsimpresos);

    }
    LigarEventosFacturar();
    tmpEncabezado = null;
    tmpdetalleFact = null;
}

function reimprimeCambio(tipoFactura, tipoImpresion) {
    var Rrespuesta = false;
    var tmpEncfacturas;
    var tmpEncabezado;
    var tmpdetalleFact = new Array();
    for ( ii = 0; ii < facturasimpresas.length; ii++) {
        tmpEncfacturas = facturasimpresas[ii].split("|");
        if (tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[18] == tipoFactura) {
            Rrespuesta = true;
            tmpEncfacturas.pop();
            tmpEncfacturas.splice(0, 1);
            tmpEncabezado = tmpEncfacturas;
            tmpEncabezado.unshift(tipoImpresion);
            for ( j = 0; j < cambiosRuta.length; j++) {
                lineacambio = cambiosRuta[j][1].split("|");
                if (cambiosRuta[j][0][0] == clienteenuso && lineacambio[5] == tmpEncabezado[4]) {
                    tmplineaFact = ([cambiosRuta[j][0][1], cambiosRuta[j][0][2], lineacambio[0], lineacambio[1], null, null, motivosCambios[lineacambio[3]]]);
                    tmpdetalleFact.push(tmplineaFact);

                }

            }
        }
    }
    if (Rrespuesta) {
        dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
        docsimpresos.push(ruta + "|CAMBIO|COPIA|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
    }
    tmpEncabezado = null;
    tmpdetalleFact = null;
}

function reimprimeDevolucion(tipoFactura, tipoImpresion) {
    respuesta = false;
    var tmpEncfacturas;
    var tmpEncabezado;
    var tmpdetalleFact = new Array();
    for ( i = 0; i < facturasimpresas.length; i++) {
        tmpEncfacturas = facturasimpresas[i].split("|");
        if (tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[18] == tipoFactura) {
            respuesta = true;
            tmpEncfacturas.pop();
            tmpEncfacturas.splice(0, 1);
            tmpEncabezado = tmpEncfacturas;
            tmpEncabezado.unshift(tipoImpresion);
            for ( j = 0; j < devolucionesRuta.length; j++) {
                tmplineafactura = devolucionesRuta[j][1].split("|");
                if (devolucionesRuta[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
                    tmplineaFact = [devolucionesRuta[j][0][1], devolucionesRuta[j][0][2], tmplineafactura[0], tmplineafactura[1], devolucionesRuta[j][0][4], tmplineafactura[4]];
                    tmpdetalleFact.push(tmplineaFact);

                }

            }
        }
    }
    if (respuesta) {
        dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
        docsimpresos.push(ruta + "|DEVOLUCION|" + tipoImpresion + "|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
        console.log(docsimpresos);
    }
    tmpEncabezado = null;
    tmpdetalleFact = null;
}

function imprimeDevolucionesdia() {
	
	//window.alert("IMPRIME DEVOLUCIONES DE DIA");
	
    var tipoFactura = "DEV";
    var tipoImpresion = "COPIA";

    for ( i = 0; i < facturasimpresas.length; i++) {
        var tmpEncfacturas;
        var tmpEncabezado;
        var tmpdetalleFact = new Array();
        respuesta = false;
        tmpEncfacturas = facturasimpresas[i].split("|");
        if (tmpEncfacturas[17] == tipoFactura) {
            respuesta = true;
            tmpEncfacturas.pop();
            tmpEncfacturas.splice(0, 1);
            tmpEncabezado = tmpEncfacturas;
            tmpEncabezado.unshift(tipoImpresion);
            for ( j = 0; j < devolucionesRuta.length; j++) {
                tmplineafactura = devolucionesRuta[j][1].split("|");
                if (devolucionesRuta[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
                    tmplineaFact = [devolucionesRuta[j][0][1], devolucionesRuta[j][0][2], tmplineafactura[0], tmplineafactura[1], devolucionesRuta[j][0][4], tmplineafactura[4]];
                    tmpdetalleFact.push(tmplineaFact);
                }
            }
        }
        if (respuesta) {
            dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);

        }
        tmpEncabezado = null;
        tmpdetalleFact = null;
    }
    docsimpresos.push(ruta + "|DEVOLUCIONES FIN DE DIA|ORIGINAL|||" + fechasistema() + "|" + horasistema());

}

function detalleCambiosimpresion() {
    var vacio = false;
    var tmpdetallecambiosimpresion = new Array();

    for ( i0 = 0; i0 < cambios.length; i0++) {
        if ( typeof cambios[i0][1] === "undefined") {
            vacio = true;
        } else {
            lineacambio = cambios[i0][1].split("|");
            tmpdetallecambiosimpresion.push([/*(i0 == 0 ? "CAMBIOS\n" : "") + */ cambios[i0][0][1], cambios[i0][0][2] + "\n" + motivosCambios[lineacambio[3]], lineacambio[0], lineacambio[1]]);
        }

    }
    if (!vacio) {
        return tmpdetallecambiosimpresion;
    } else {
        return null;
    }
}

function imprimeInventarioabordo() {

	db_smart_sales.metodos.ObtenerInventario(function(item){

		var detalleInvabordo = new Array();
		var encabezadoInvabordo = new Array("INVENTARIO ABORDO", ruta, horasistema(), formatofecha(fechasistema()));

		for (var i = 0; i < item.rows.length; i++) {

		var codigoProducto 		= item.rows.item(i).codigoProducto;
		var descripcionProducto = item.rows.item(i).descripcionProducto;
		var unidades			= item.rows.item(i).unidades;
		var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;

        var invcajas = Number(unidades / unidadesxCaja).toString();
        var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
        var invunidades;
        if (isNaN(tmpinvunidades)) {
            invunidades = 0;
        } else {
            invunidades = tmpinvunidades;
        }
        tmplineaimpresion = new Array(codigoProducto, descripcionProducto, invcajas.split(".")[0], invunidades);
        detalleInvabordo.push(tmplineaimpresion);

		}

	var cant200fdc = 0;
    var cant375fdc = 0;
    var cant750fdc = 0;
    var cant1000fdc = 0;
    var cant1750fdc = 0;

    var cant200rp = 0;
    var cant375rp = 0;
    var cant750rp = 0;
    var cant1000rp = 0;
    var cant1750rp = 0;

    for ( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
        var dev = devolucionenvasesRuta[ii].split("|");
        if (dev[6] == 0) {

            cant200fdc = Number(cant200fdc + Number(dev[1]));
            cant375fdc = Number(cant375fdc + Number(dev[2]));
            cant750fdc = Number(cant750fdc + Number(dev[3]));
            cant1000fdc = Number(cant1000fdc + Number(dev[4]));
            cant1750fdc = Number(cant1750fdc + Number(dev[5]));

        } else {

            cant200rp = Number(cant200rp + Number(dev[1]));
            cant375rp = Number(cant375rp + Number(dev[2]));
            cant750rp = Number(cant750rp + Number(dev[3]));
            cant1000rp = Number(cant1000rp + Number(dev[4]));
            cant1750rp = Number(cant1750rp + Number(dev[5]));

        }
    }

    tmplineaimpresion = new Array("-------- DETALLE DE ENVASES (unidades)--------\nFDC", "ENVASE 200ml", 0, cant200fdc);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("FDC", "ENVASE 375ml", 0, cant375fdc);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("FDC", "ENVASE 750ml", 0, cant750fdc);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("FDC", "ENVASE 1000ml", 0, cant1000fdc);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("FDC", "ENVASE 1750ml", 0, cant1750fdc);
    detalleInvabordo.push(tmplineaimpresion);

    tmplineaimpresion = new Array("RP", "ENVASE 200ml", 0, cant200rp);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("RP", "ENVASE 375ml", 0, cant375rp);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("RP", "ENVASE 750ml", 0, cant750rp);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("RP", "ENVASE 1000ml", 0, cant1000rp);
    detalleInvabordo.push(tmplineaimpresion);
    tmplineaimpresion = new Array("RP", "ENVASE 1750ml", 0, cant1750rp);
    detalleInvabordo.push(tmplineaimpresion);

   //IMPRESION DE CAMBIOS
   //tmplineaimpresion = new Array("CAMBIOS", "DETALLE DE CAMBIOS", 0, 0);
   //detalleInvabordo.push(tmplineaimpresion);

   var cambiosArchivo = detalleCambiosimpresion();

    if(cambiosArchivo != null)
    {
    	for ( j = 0; j < cambiosArchivo.length; j++) {
    		if(j==0){
    			tmplineaimpresion = new Array("---------- DETALLE DE CAMBIOS ----------\n"+cambiosArchivo[j][0],cambiosArchivo[j][1] ,cambiosArchivo[j][2], cambiosArchivo[j][3]);
   				detalleInvabordo.push(tmplineaimpresion);
    		}else
    		{
    			tmplineaimpresion = new Array(cambiosArchivo[j][0],cambiosArchivo[j][1] ,cambiosArchivo[j][2], cambiosArchivo[j][3]);
   				detalleInvabordo.push(tmplineaimpresion);
    		}

    	}

    }

	console.log(detalleCambiosimpresion());
	/**/


   // var detalleInvabordo2 = detalleInvabordo;

    dataInventarioABordo(encabezadoInvabordo, detalleInvabordo);
    docsimpresos.push(ruta + "|INVENTARIO|REIMPRESION|||" + fechasistema() + "|" + horasistema());

	});

//    var detalleInvabordo = new Array();
//    var encabezadoInvabordo = new Array("INVENTARIO ABORDO", ruta, horasistema(), formatofecha(fechasistema()));
//    inventario.sort();
//    console.log("TAM ");
//    console.log(inventario.length);
//    for ( i = 0; i < inventario.length; i++) {
//        tmpinv = inventario[i].split("|");
//        var invcajas = Number(tmpinv[4] / tmpinv[5]).toString();
//        var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * tmpinv[5], 1);
//        var invunidades;
//        if (isNaN(tmpinvunidades)) {
//            invunidades = 0;
//        } else {
//            invunidades = tmpinvunidades;
//        }
//        tmplineaimpresion = new Array(tmpinv[2], tmpinv[3], invcajas.split(".")[0], invunidades);
//        detalleInvabordo.push(tmplineaimpresion);
//
//    }
//
//    var cant200fdc = 0;
//    var cant375fdc = 0;
//    var cant750fdc = 0;
//    var cant1000fdc = 0;
//    var cant1750fdc = 0;
//
//    var cant200rp = 0;
//    var cant375rp = 0;
//    var cant750rp = 0;
//    var cant1000rp = 0;
//    var cant1750rp = 0;
//
//    for ( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
//        var dev = devolucionenvasesRuta[ii].split("|");
//        if (dev[6] == 0) {
//
//            cant200fdc = Number(cant200fdc + Number(dev[1]));
//            cant375fdc = Number(cant375fdc + Number(dev[2]));
//            cant750fdc = Number(cant750fdc + Number(dev[3]));
//            cant1000fdc = Number(cant1000fdc + Number(dev[4]));
//            cant1750fdc = Number(cant1750fdc + Number(dev[5]));
//
//        } else {
//
//            cant200rp = Number(cant200rp + Number(dev[1]));
//            cant375rp = Number(cant375rp + Number(dev[2]));
//            cant750rp = Number(cant750rp + Number(dev[3]));
//            cant1000rp = Number(cant1000rp + Number(dev[4]));
//            cant1750rp = Number(cant1750rp + Number(dev[5]));
//
//        }
//    }
//
//    tmplineaimpresion = new Array("-------- DETALLE DE ENVASES (unidades)--------\nFDC", "ENVASE 200ml", 0, cant200fdc);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("FDC", "ENVASE 375ml", 0, cant375fdc);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("FDC", "ENVASE 750ml", 0, cant750fdc);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("FDC", "ENVASE 1000ml", 0, cant1000fdc);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("FDC", "ENVASE 1750ml", 0, cant1750fdc);
//    detalleInvabordo.push(tmplineaimpresion);
//
//    tmplineaimpresion = new Array("RP", "ENVASE 200ml", 0, cant200rp);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("RP", "ENVASE 375ml", 0, cant375rp);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("RP", "ENVASE 750ml", 0, cant750rp);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("RP", "ENVASE 1000ml", 0, cant1000rp);
//    detalleInvabordo.push(tmplineaimpresion);
//    tmplineaimpresion = new Array("RP", "ENVASE 1750ml", 0, cant1750rp);
//    detalleInvabordo.push(tmplineaimpresion);
//
//   //IMPRESION DE CAMBIOS
//   //tmplineaimpresion = new Array("CAMBIOS", "DETALLE DE CAMBIOS", 0, 0);
//   //detalleInvabordo.push(tmplineaimpresion);
//
//   var cambiosArchivo = detalleCambiosimpresion();
//
//    if(cambiosArchivo != null)
//    {
//    	for ( j = 0; j < cambiosArchivo.length; j++) {
//    		if(j==0){
//    			tmplineaimpresion = new Array("---------- DETALLE DE CAMBIOS ----------\n"+cambiosArchivo[j][0],cambiosArchivo[j][1] ,cambiosArchivo[j][2], cambiosArchivo[j][3]);
//   				detalleInvabordo.push(tmplineaimpresion);
//    		}else
//    		{
//    			tmplineaimpresion = new Array(cambiosArchivo[j][0],cambiosArchivo[j][1] ,cambiosArchivo[j][2], cambiosArchivo[j][3]);
//   				detalleInvabordo.push(tmplineaimpresion);
//    		}
//
//    	}
//
//    }
//
//	console.log(detalleCambiosimpresion());
//	/**/
//
//
//   // var detalleInvabordo2 = detalleInvabordo;
//
//    dataInventarioABordo(encabezadoInvabordo, detalleInvabordo);
//    docsimpresos.push(ruta + "|INVENTARIO|REIMPRESION|||" + fechasistema() + "|" + horasistema());
}

//function inventarioAbordo() {
//
//	db_smart_sales.metodos.ObtenerInventario(function(item){
//
//		var codigotabla = new StringBuilder();
//		codigotabla.append("<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n");
//		codigotabla.append("<tr>\n");
//		codigotabla.append("<th width=\"20%\" align=\"left\">Código<\/th>\n");
//		codigotabla.append("<th width=\"60%\" align=\"center\">Descripción<\/th>\n");
//		codigotabla.append("<th width=\"10%\" align=\"right\">Cj<\/th>\n");
//		codigotabla.append("<th width=\"10%\" align=\"right\">Un<\/th>\n");
//		codigotabla.append("<\/tr>\n");
//
//		for (var i = 0; i < item.rows.length; i++) {
//
//		var codigoProducto 		= item.rows.item(i).codigoProducto;
//		var descripcionProducto = item.rows.item(i).descripcionProducto;
//		var unidades			= item.rows.item(i).unidades;
//		var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;
//
//		var invcajas = Number(unidades / unidadesxCaja).toString();
//        var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
//        var invunidades;
//        if (isNaN(tmpinvunidades)) {
//            invunidades = 0;
//        } else {
//            invunidades = tmpinvunidades;
//        }
//
//        codigotabla.append("<tr><td align=\"left\">");
//        codigotabla.append(codigoProducto + "<\/td>");
//        codigotabla.append("<td align=\"left\"><small>" + descripcionProducto + "</small><\/td>");
//        codigotabla.append("<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>");
//        codigotabla.append("<td align=\"right\">" + invunidades + "<\/td>");
//        codigotabla.append("<\/tr>");
//
//        }
//
//		    var cant200fdc = 0;
//			var cant375fdc = 0;
//			var cant750fdc = 0;
//			var cant1000fdc = 0;
//			var cant1750fdc = 0;
//
//			var cant200rp = 0;
//			var cant375rp = 0;
//			var cant750rp = 0;
//			var cant1000rp = 0;
//			var cant1750rp = 0;
//
//			for ( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
//				var dev = devolucionenvasesRuta[ii].split("|");
//				if (dev[6] == 0) {
//
//					cant200fdc = Number(cant200fdc + Number(dev[1]));
//					cant375fdc = Number(cant375fdc + Number(dev[2]));
//					cant750fdc = Number(cant750fdc + Number(dev[3]));
//					cant1000fdc = Number(cant1000fdc + Number(dev[4]));
//					cant1750fdc = Number(cant1750fdc + Number(dev[5]));
//
//				} else {
//
//					cant200rp = Number(cant200rp + Number(dev[1]));
//					cant375rp = Number(cant375rp + Number(dev[2]));
//					cant750rp = Number(cant750rp + Number(dev[3]));
//					cant1000rp = Number(cant1000rp + Number(dev[4]));
//					cant1750rp = Number(cant1750rp + Number(dev[5]));
//
//				}
//			}
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant200fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant375fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant750fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1000fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1750fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant200rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant375rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant750rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1000rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1750rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<\/table><\/small>");
//			$('#tblInventario').html(codigotabla.toString());
//			$.mobile.changePage("#page19");
//	});
//}


//// Inventario a bordo carga bajo demanda
//function inventarioAbordo() {
//
//		window.onscroll = function() {
//		console.log("FIN de Pagina");
//		var scrollHeight, totalHeight;
//		scrollHeight = document.body.scrollHeight;
//		totalHeight = window.scrollY + window.innerHeight;
//
//		if(totalHeight >= scrollHeight)
//		{
//			var idUltimo = $("#cuerpoInventario tr:last-child").attr("id").split("_")[1];
//			db_smart_sales.metodos.ObtenerInventarioPantalla(idUltimo, function(item){
//
//				if( item.rows.length == 0 ){
//
//					window.onscroll = "";
//
//				}
//
//				for (var i = 0; i < item.rows.length; i++) {
//
//				var codigoProducto 		= item.rows.item(i).codigoProducto;
//				var descripcionProducto = item.rows.item(i).descripcionProducto;
//				var unidades			= item.rows.item(i).unidades;
//				var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;
//				var rowid				= item.rows.item(i).rowid;
//
//				var invcajas = Number(unidades / unidadesxCaja).toString();
//				var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
//				var invunidades;
//				if (isNaN(tmpinvunidades)) {
//					invunidades = 0;
//				} else {
//					invunidades = tmpinvunidades;
//				}
//
//				var stringfila = "<tr id='Inventario_" + rowid + "'><td align=\"left\">";
//				stringfila     = stringfila + codigoProducto + "<\/td>";
//				stringfila     = stringfila + "<td align=\"left\"><small>" + descripcionProducto + "</small><\/td>";
//				stringfila     = stringfila + "<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>";
//				stringfila     = stringfila + "<td align=\"right\">" + invunidades + "<\/td>";
//				stringfila     = stringfila + "<\/tr>";
//
//				$("#cuerpoInventario").append(stringfila);
//
//
//				}
//
//			});
//
//		}
//	}
//
//	db_smart_sales.metodos.ObtenerInventarioPantalla(-1,function(item){
//
//		var codigotabla = new StringBuilder();
//		codigotabla.append("<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n");
//		codigotabla.append("<tbody id='cuerpoInventario'>\n");
//		codigotabla.append("<tr>\n");
//		codigotabla.append("<th width=\"20%\" align=\"left\">Código<\/th>\n");
//		codigotabla.append("<th width=\"60%\" align=\"center\">Descripción<\/th>\n");
//		codigotabla.append("<th width=\"10%\" align=\"right\">Cj<\/th>\n");
//		codigotabla.append("<th width=\"10%\" align=\"right\">Un<\/th>\n");
//		codigotabla.append("<\/tr>\n");
//
//		for (var i = 0; i < item.rows.length; i++) {
//
//		var codigoProducto 		= item.rows.item(i).codigoProducto;
//		var descripcionProducto = item.rows.item(i).descripcionProducto;
//		var unidades			= item.rows.item(i).unidades;
//		var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;
//		var rowid				= item.rows.item(i).rowid;
//
//		var invcajas = Number(unidades / unidadesxCaja).toString();
//        var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
//        var invunidades;
//        if (isNaN(tmpinvunidades)) {
//            invunidades = 0;
//        } else {
//            invunidades = tmpinvunidades;
//        }
//
//        codigotabla.append("<tr id='Inventario_" + rowid + "'><td align=\"left\">");
//        codigotabla.append(codigoProducto + "<\/td>");
//        codigotabla.append("<td align=\"left\"><small>" + descripcionProducto + "</small><\/td>");
//        codigotabla.append("<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>");
//        codigotabla.append("<td align=\"right\">" + invunidades + "<\/td>");
//        codigotabla.append("<\/tr>");
//
//        }
//		codigotabla.append("</tbody>\n");
//
//		    var cant200fdc = 0;
//			var cant375fdc = 0;
//			var cant750fdc = 0;
//			var cant1000fdc = 0;
//			var cant1750fdc = 0;
//
//			var cant200rp = 0;
//			var cant375rp = 0;
//			var cant750rp = 0;
//			var cant1000rp = 0;
//			var cant1750rp = 0;
//
//			for ( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
//				var dev = devolucionenvasesRuta[ii].split("|");
//				if (dev[6] == 0) {
//
//					cant200fdc = Number(cant200fdc + Number(dev[1]));
//					cant375fdc = Number(cant375fdc + Number(dev[2]));
//					cant750fdc = Number(cant750fdc + Number(dev[3]));
//					cant1000fdc = Number(cant1000fdc + Number(dev[4]));
//					cant1750fdc = Number(cant1750fdc + Number(dev[5]));
//
//				} else {
//
//					cant200rp = Number(cant200rp + Number(dev[1]));
//					cant375rp = Number(cant375rp + Number(dev[2]));
//					cant750rp = Number(cant750rp + Number(dev[3]));
//					cant1000rp = Number(cant1000rp + Number(dev[4]));
//					cant1750rp = Number(cant1750rp + Number(dev[5]));
//
//				}
//			}
//			codigotabla.append("<tbody id='pieInventario'>");
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant200fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant375fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant750fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1000fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("FDC<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1750fdc + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant200rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant375rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant750rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1000rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//
//			codigotabla.append("<tr><td align=\"left\">");
//			codigotabla.append("RP<\/td>");
//			codigotabla.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
//			codigotabla.append("<td align=\"right\">" + "<\/td>");
//			codigotabla.append("<td align=\"right\">" + cant1750rp + "<\/td>");
//			codigotabla.append("<\/tr>");
//			codigotabla.append("</tbody>");
//			codigotabla.append("<\/table><\/small>");
//			$('#tblInventario').html(codigotabla.toString());
//			$.mobile.changePage("#page19");
//	});
//}

// Inventario a bordo carga bajo demanda
function inventarioAbordo() {

		$("#page19 > div.ui-header.ui-bar-a > a").on("click",function(){

		    console.log('Quitamos evento scroll');
		    window.onscroll = "";

		 });

		window.onscroll = function() {
		console.log("FIN de Pagina");
		console.log('Pone evento scroll');
		var scrollHeight, totalHeight;
		scrollHeight = document.body.scrollHeight;
		totalHeight = window.scrollY + window.innerHeight;

        $("#cargandoInventario").removeClass("hide");

		if(totalHeight >= scrollHeight)
		{
			$("#cargandoInventario").addClass("hide");
			var idUltimo = $("#cuerpoInventario tr:last-child").attr("id").split("_")[1];
			db_smart_sales.metodos.ObtenerInventarioPantalla(idUltimo, function(item){

				if( item.rows.length == 0 ){

                    console.log('Quitamos evento scroll');
					window.onscroll = "";
					// Aqui ponemos el detalle de los envases....
								var cant200fdc = 0;
					var cant375fdc = 0;
					var cant750fdc = 0;
					var cant1000fdc = 0;
					var cant1750fdc = 0;

					var cant200rp = 0;
					var cant375rp = 0;
					var cant750rp = 0;
					var cant1000rp = 0;
					var cant1750rp = 0;

					for ( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
						var dev = devolucionenvasesRuta[ii].split("|");
						if (dev[6] == 0) {

							cant200fdc = Number(cant200fdc + Number(dev[1]));
							cant375fdc = Number(cant375fdc + Number(dev[2]));
							cant750fdc = Number(cant750fdc + Number(dev[3]));
							cant1000fdc = Number(cant1000fdc + Number(dev[4]));
							cant1750fdc = Number(cant1750fdc + Number(dev[5]));

						} else {

							cant200rp = Number(cant200rp + Number(dev[1]));
							cant375rp = Number(cant375rp + Number(dev[2]));
							cant750rp = Number(cant750rp + Number(dev[3]));
							cant1000rp = Number(cant1000rp + Number(dev[4]));
							cant1750rp = Number(cant1750rp + Number(dev[5]));

						}
					}

					var envasesBody = new StringBuilder();

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("FDC<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant200fdc + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("FDC<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant375fdc + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("FDC<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant750fdc + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("FDC<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant1000fdc + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("FDC<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant1750fdc + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("RP<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 200ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant200rp + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("RP<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 375ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant375rp + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("RP<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 750ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant750rp + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("RP<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 1000ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant1000rp + "<\/td>");
					envasesBody.append("<\/tr>");

					envasesBody.append("<tr><td align=\"left\">");
					envasesBody.append("RP<\/td>");
					envasesBody.append("<td align=\"left\"><small>" + "ENVASE 1750ml" + "</small><\/td>");
					envasesBody.append("<td align=\"right\">" + "<\/td>");
					envasesBody.append("<td align=\"right\">" + cant1750rp + "<\/td>");
					envasesBody.append("<\/tr>");

					$('#pieInventario').html(envasesBody.toString());


				}

				for (var i = 0; i < item.rows.length; i++) {

				var codigoProducto 		= item.rows.item(i).codigoProducto;
				var descripcionProducto = item.rows.item(i).descripcionProducto;
				var unidades			= item.rows.item(i).unidades;
				var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;
				var rowid				= item.rows.item(i).rowid;

				var invcajas = Number(unidades / unidadesxCaja).toString();
				var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
				var invunidades;
				if (isNaN(tmpinvunidades)) {
					invunidades = 0;
				} else {
					invunidades = tmpinvunidades;
				}

				var stringfila = "<tr id='Inventario_" + rowid + "'><td align=\"left\">";
				stringfila     = stringfila + codigoProducto + "<\/td>";
				stringfila     = stringfila + "<td align=\"left\"><small>" + descripcionProducto + "</small><\/td>";
				stringfila     = stringfila + "<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>";
				stringfila     = stringfila + "<td align=\"right\">" + invunidades + "<\/td>";
				stringfila     = stringfila + "<\/tr>";

				$("#cuerpoInventario").append(stringfila);


				}

			});

		}
	}

	db_smart_sales.metodos.ObtenerInventarioPantalla(-1,function(item){

		var codigotabla = new StringBuilder();
		codigotabla.append("<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n");
		codigotabla.append("<tbody id='cuerpoInventario'>\n");
		codigotabla.append("<tr>\n");
		codigotabla.append("<th width=\"20%\" align=\"left\">Código<\/th>\n");
		codigotabla.append("<th width=\"60%\" align=\"center\">Descripción<\/th>\n");
		codigotabla.append("<th width=\"10%\" align=\"right\">Cj<\/th>\n");
		codigotabla.append("<th width=\"10%\" align=\"right\">Un<\/th>\n");
		codigotabla.append("<\/tr>\n");

		for (var i = 0; i < item.rows.length; i++) {

		var codigoProducto 		= item.rows.item(i).codigoProducto;
		var descripcionProducto = item.rows.item(i).descripcionProducto;
		var unidades			= item.rows.item(i).unidades;
		var unidadesxCaja   	= item.rows.item(i).unidadesxCaja;
		var rowid				= item.rows.item(i).rowid;

		var invcajas = Number(unidades / unidadesxCaja).toString();
        var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * unidadesxCaja, 1);
        var invunidades;
        if (isNaN(tmpinvunidades)) {
            invunidades = 0;
        } else {
            invunidades = tmpinvunidades;
        }

        codigotabla.append("<tr id='Inventario_" + rowid + "'><td align=\"left\">");
        codigotabla.append(codigoProducto + "<\/td>");
        codigotabla.append("<td align=\"left\"><small>" + descripcionProducto + "</small><\/td>");
        codigotabla.append("<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>");
        codigotabla.append("<td align=\"right\">" + invunidades + "<\/td>");
        codigotabla.append("<\/tr>");

        }
		codigotabla.append("</tbody>\n");

		codigotabla.append("<tbody id='pieInventario'>");
		codigotabla.append("</tbody>");

		codigotabla.append("<\/table><\/small>");
		$('#tblInventario').html(codigotabla.toString());
		$.mobile.changePage("#page19");
	});
}

function descargaInventario(sku, cantidad) {
    var encontrado = false;
    
    for ( zz = 0; zz < inventario.length; zz++) {
        var tmpInv = inventario[zz].split("|");
        var tmp1 = tmpInv[2];
        if (tmp1.toUpperCase() == sku) {
            encontrado = true;
            if (cantidad <= Number(tmpInv[4])) {
            
                var nuevaCantidad = Number(tmpInv[4] - cantidad);
                var tmplinea = tmpInv[0] + "|" + tmpInv[1] + "|" + tmpInv[2] + "|" + tmpInv[3] + "|" + nuevaCantidad + "|" + tmpInv[5];
                inventario.splice(zz, 1, tmplinea);
                // Actualiza inventario en la tabla SQLite Inventario
                db_smart_sales.metodos.actualizarInventario(sku, nuevaCantidad);
                return true;

            } else {
                // window.alert("No posee suficiente inventario, su
                // inventario
                // es: " + tmpInv[4] + " unidades.");
                return false;
            }
        }
    }
    if (!encontrado) {
        // window.alert("El producto " + sku + " no fue cargado en su
        // inventario
        // inicial");
        return false;
    }

}

function confirmaInventario(sku, cantidad) {
    var encontrado = false;
    for ( j = 0; j < inventario.length; j++) {
       try{
       	
	        var tmpInv = inventario[j].split("|");
	        var tmp1 = tmpInv[2].toString();
	        if (tmp1.toUpperCase() == sku) {
	            encontrado = true;
	            if (cantidad <= Number(tmpInv[4])) {
	                // var nuevaCantidad = Number(tmpInv[4] - cantidad);
	                // var tmplinea = tmpInv[0] + "|" + tmpInv[1] + "|" +
	                // tmpInv[2]
	                // + "|" + tmpInv[3] + "|" + nuevaCantidad + "|" +
	                // tmpInv[5];
	                // inventario.splice(i, 1, tmplinea);
	                return true;
	
	            } else {
	                
	               navigator.notification.alert("Producto [" + tmpInv[3] + "] no posee suficiente inventario, su inventario es: " + tmpInv[4] + " unidades.", 
		            null, // callback
		            "Inventario Insuficiente", // title
		            'Aceptar' // buttonName
		    		); 
	               
	                return false;
	            }
	        }
        }catch(err){
			//No se Cargo Inventario abordo
		}
    }//End For
    
    if (!encontrado) {
        var tmpprod = buscadatosProducto(clienteenuso, sku);
              
        		navigator.notification.alert("El producto [" + tmpprod[2] + "] no fue cargado en su inventario inicial", 
	            null, // callback
	            tmpprod[1], // title
	            'Aceptar' // buttonName
	    		); 
	    
        return false;
    }

}

/**
 * Retorna la Existencia de un Sku.
 */
function retornaExistenciaInventario(sku){
	var existencia = 0;
	
	var encontrado = false;
    for ( j = 0; j < inventario.length; j++) {
       try{
       	
	        var tmpInv = inventario[j].split("|");
	        var tmp1 = tmpInv[2].toString();
	        
	        if (tmp1.toUpperCase() == sku) {
	           encontrado = true;
	           existencia = Number(tmpInv[4]);
	           	           
	        }
        }catch(err){
			//No se Cargo Inventario abordo
			existencia = 0;
		}
    }//End For
    
    return existencia;
} 

function grabaAbono() {
	var lineatmp = "";
	var montoAbono = Number($('#montoAbono').val()).toFixed(2);
	var refAbono = $('#refAbono').val();
	var tipoAbono = $('#tipoAbono').val();
	var bancoAbono = $('#selecBanco').val();
	var subtotal = 0;
	var TCusado = 0;
	var abonoCdb = 0;
	var abonoUSD = 0;
    var pago_efectivo=false

	var errorDatos = false;

	if(montoAbono == 0 || facturaenuso == "" || !isFinite(montoAbono)) {
		
		navigator.notification.alert('Valide cantidades y/o seleccione un documento!', 
	            null, // callback
	            'Datos incompletos', // title
	            'Aceptar' // buttonName
	    ); 
	} else {

        db_smart_sales.metodos.Obtener_Datos_Tipo_Pago(3, parseFloat(tipoAbono) ,function (rows) {
            if(rows.rows.item(0).MONEDA.toUpperCase().trim()=="COR"){
                abonoCdb = Number(montoAbono * 1).toFixed(2);
                TCusado = 1;

            }
            else{
                    abonoUSD = montoAbono;
                    abonoCdb = Number(montoAbono * tipoCambio).toFixed(2);
                    TCusado = tipoCambio;
            }

            if(rows.rows.item(0).SELECCIONAR_BANCO == 0){

                    bancoAbono = "";
                    refAbono = "";  
                    errorDatos = false;
                    pago_efectivo= true

            }
            else{
                    if(refAbono == "" || refAbono == "0")
                       {
                        errorDatos = true;
                        navigator.notification.alert('Por favor introduzca un número de referencia válido!', 
                        null, // callback
                        'Datos incompletos', // title
                        'Aceptar' // buttonName
                        ); 
                    }else
                    {
                        errorDatos = false;
                    }
            }

                    if (errorDatos != true) {
                    //Nuevas lineas de codigo para determinar los bancos de deposito y bancos de BPSC
                    //2016.02.01 por mroque
                    db_smart_sales.metodos.Obtener_Bancos_Por_Tipo_Pago(parseFloat(tipoAbono), bancoAbono, pago_efectivo, function (item) {
                         if (item.rows.length > 0 ){
                                lineatmp += clienteenuso + "|";
                                lineatmp += facturaenuso + "|";
                                lineatmp += tipoAbono + "|";
                                lineatmp += montoAbono + "|";
                                lineatmp += abonoCdb + "|";
                                lineatmp += abonoUSD + "|";
                                lineatmp += TCusado + "|";
                                lineatmp += bancoAbono + "|";
                                lineatmp += refAbono + "|";
                                lineatmp += fechasistema() + "|";
                                //Descripcion del banco SMART SALES
                                lineatmp += (pago_efectivo ? "": $('#selecBanco > option').eq(bancoAbono - 1).text().trim()) + "|";
                                lineatmp += item.rows.item(0).Banco_Deposito + "|";
                                lineatmp += item.rows.item(0).Banco_Deposito_Bpsc;
                                abonos.push(lineatmp);
                                
                                $('#montoAbono').val(0);
                                $('#tipoAbono').val(1);
                                $('#selecBanco').val(1);
                                $('#refAbono').val("");
                                tablaAbonos();
                                $('#tipoAbono').selectmenu('refresh');
                                $('#selecBanco').selectmenu('refresh');
                                $('#page12').page();

                         }else{
                             navigator.notification.alert('No hay datos de ralación de banco para este tipo de pago!', 
                                null, // callback
                                'No hay datos de banco', // title
                                'Aceptar' // buttonName
                            ); 
                         }
                    })
                    
                }else
                {
                    
                }
        })

		/*if(tipoAbono == "1" || tipoAbono == "3" || tipoAbono == "5" || tipoAbono == "7") {
		
		} else {
			abonoUSD = montoAbono;
			abonoCdb = Number(montoAbono * tipoCambio).toFixed(2);
			TCusado = tipoCambio;
		}

		if(tipoAbono == "1" || tipoAbono == "2") {
			bancoAbono = "";
			refAbono = "";	
			errorDatos = false;
            pago_efectivo= true
				
		}else
		{
			if(refAbono == "" || refAbono == "0")
			{
				errorDatos = true;
				navigator.notification.alert('Por favor introduzca un número de referencia válido!', 
	            null, // callback
	            'Datos incompletos', // title
	            'Aceptar' // buttonName
	            ); 
			}else
			{
				errorDatos = false;
			}
		}*/
		
		
	}

}

function modificaAbono(pos) {
	var tmpabono = abonos[pos].split("|");
	$('#montoAbono').val(tmpabono[3]);
	$('#tipoAbono').val(tmpabono[2]);
	if(tmpabono[2] == 1) {
		$('#selecBanco').val(1);
	} else {
		$('#selecBanco').val(tmpabono[7]);
	}
	$('#refAbono').val(tmpabono[8]);
	$('#montoAbono').focus();
	abonos.splice(pos, 1);
	$('#selecBanco').selectmenu('refresh');
	$('#tipoAbono').selectmenu('refresh');
	tablaAbonos();

}

function tablaAbonos() {
	var abonoMontoInicial = 0;
	var abonoSaldoActual = 0;
	var abonoMonto = 0;
	abonoNuevoSaldo = 0;
	var txttipoAbono = "";
	var sumaAbono = 0;
	var codigotabla = new StringBuilder();
	var textoabono = "";
	var txtBanco = "";



	codigotabla.append("<small><table fontborder=\"1\"  style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n");
	codigotabla.append("<thead ><tr>\n");
	codigotabla.append("<th width=\"40%\" align=\"left\">Tipo<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Monto<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Banco<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Referencia<\/th>\n");
	codigotabla.append("<\/tr><thead>\n");
    codigotabla.append("<tbody></tbody> <\/table><\/small>");
    $("#tblAbonos").html(codigotabla.toString())


	if(docto) {
		for(var i = 0; i < abonos.length; i++) {
			var tmpabono = abonos[i].split("|");
            console.log("clienteenuso "+ clienteenuso)
            console.log("temp "+ tmpabono[0])

			if(tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {

				$("#btnImprimirPago").show();

                    //Se optiene de la tabal Tipo_Pago la descripcion y se valida si la modena es dolar para realizar su conversion a cordoba 
                    //Agregada 2016.02.03 por mroque
                    db_smart_sales.metodos.Obtener_moneda_por_tipo_pago(Number(tmpabono[2]), tmpabono, i ,function (item , abono_, indice) {
                        
                        txttipoAbono = item.rows.item(0).DESCRIPCION
                        if( item.rows.item(0).MONEDA.toUpperCase().trim() !='COR'){
                            txttipoAbono += " \n(" + formatoDinero(abono_[3]) + "*" + Number(abono_[6]).toFixed(4) + ")"
                        }   
                        if(Number(abono_[2])==1 || Number(abono_[2])==2){
                            abono_[8] = "";
                        }


                        //Se asignal la descripcion del banco de smart sales que lleva el pedido 
                        txtBanco=abono_[10]

                        var tr_abono=  new StringBuilder();
                        tr_abono.append("<tr><td align=\"left\"><small>");
                        tr_abono.append("<u><a onClick=\"modificaAbono(" + indice + ");\">" + txttipoAbono + "<\/a><\/small><\/u><\/td>");
                        tr_abono.append("<td align=\"right\">" + formatoDinero(Number(abono_[4])) + "<\/td>");
                        tr_abono.append("<td align=\"right\">" + txtBanco + "<\/td>");
                        tr_abono.append("<td align=\"right\"><small>" + abono_[8] + "<\/small><\/td>");
                        tr_abono.append("<\/tr>");
                        
                        $("#tblAbonos table tbody").append(tr_abono.toString());
                    })

                       /* switch (Number(tmpabono[2])) {

        					case 1:
        						txttipoAbono = $('#tipoAbono option').eq(0).text();
        						txtBanco = "";
        						tmpabono[8] = "";

        						break;
        					case 2:
        						txttipoAbono = $('#tipoAbono option').eq(1).text() +" (" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
        						txtBanco = "";
        						tmpabono[8] = "";
        						break;
        					case 3:
        						txttipoAbono = $('#tipoAbono option').eq(2).text()
        						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];


        						break;
        					case 4:
        						txttipoAbono =  $('#tipoAbono option').eq(3).text() + " (" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
        						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];


        						break;
        					case 5:
        						txttipoAbono =  $('#tipoAbono option').eq(4).text()
        						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
        						break;
        						
        					case 6:
        		                 txttipoAbono =  $('#tipoAbono option').eq(5).text() + "\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
        		                 txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
        		                  break;
        		                  
        		            case 7:
        		            	txttipoAbono =  $('#tipoAbono option').eq(6).text() 
        						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
                            
                            case 8:
                                txttipoAbono =  $('#tipoAbono option').eq(7).text() + "\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
                                txtBanco = bancos[tmpabono[7] - 1].split("|")[1];    
        		            
        		            break;
				        }*/


				
				sumaAbono = Number(sumaAbono) + Number(tmpabono[4]);

			}else
            {      	
            		
 		   		//$("#btnImprimirPago").hide();
            }

		}

	if(docto[4]>0){
			if(!tieneAbonos()) {				
				abonoNuevoSaldo = Number(Number(docto[4] - sumaAbono)).toFixed(2);
			}else{
				abonoNuevoSaldo = Number(docto[4]).toFixed(2);
			}			
	}
	
		console.log(abonoNuevoSaldo);
		textoabono = "<small><p align=\"right\">Abono total: C$" + formatoDinero(Number(sumaAbono)) + "<br>";
		textoabono += "Nuevo saldo: C$" + formatoDinero(Number(abonoNuevoSaldo)) + "</p></small>";

	
		$('#totalAbono').html(textoabono);
		$('#selecBanco').selectmenu('refresh');
        $( "#tipoAbono" ).change(function() {}).change();

	}
}

function cambiarIconoCliente(idCliente, clase) {
    // Removemos el estilo del contenedor del boton
    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().addClass('contenedor-icono');

    // Esto remueve el icono con la Flechita
    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().children('span:first').children('span:first').nextAll().removeClass('ui-icon-arrow-r');

    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().children('span:first').children('span:first').nextAll().removeClass('icono-no-pago');

    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().children('span:first').children('span:first').nextAll().removeClass('icono-preventa');

    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().children('span:first').children('span:first').nextAll().removeClass('icono-no-venta');

    // Aqui tendriamos que agregar la Clase 'icono-preventa',
    // 'icono-no-venta'
    $('#' + idCliente).children('a').children('span.ui-btn-inner').children('span:first').nextAll().children('span:first').children('span:first').nextAll().addClass(clase);
}

function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

StringBuilder.prototype.append = function(value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function() {
    this.strings.length = 1;
}

StringBuilder.prototype.toString = function() {
    return this.strings.join("");
}
/* ======================================================================================== */
/*
* ========================== METODOS DE SUBIDA Y BAJADA DE DATOS
* =========================
*/
/* ======================================================================================== */
/**
 * Maneja la utilizacion del Login para Bajada y Subida de Datos
 *
 * @author cgarcia
 */
function paginaLogin(evento) {
    $('#loginPage').page();
    $('#txtUsuario').val('');
    $('#txtPass').val('');
    
    if (evento == "envio") {
        $("#btnAceptarAutenticacion .ui-btn-text").text("Enviar");
    } else {
        $("#btnAceptarAutenticacion .ui-btn-text").text("Recibir");
    }
    $('#btnAceptarAutenticacion').button();
    $.mobile.changePage('#loginPage');

}

/**
 * Envia la peticion de Envio o Recepcion de los Datos
 *
 * @author cgarcia
 */
function autenticarUsuario(accion) {
    var rutaN = $('#txtUsuario').val();
    var contrasena = $('#txtPass').val();
    
    rutaN = rutaN.toUpperCase();
     
    rutaN = rutaN.trim();
    rutaN = rutaN.replace(" ","");

    if ($("#btnAceptarAutenticacion .ui-btn-text").text() == 'Enviar') {
        alert("ENVIO INICIADO \nUsuario: " + rutaN + " Contraseña: " + contrasena);

    } else {
        if (rutaN != "" && contrasena != "") {
        	
        	//if(rutaN.substr(0,1) == 'A' || rutaN.substr(0,1) == 'V'  )
             //{
             	sincronizarRecepcionDatos(rutaN.toUpperCase(), generarToken(contrasena));
             //}
             //else
             /*{
             	navigator.notification.alert('Debe utilizar una ruta de Autoventa!!', 
	            null, // callback
	            'Ruta Equivocada', // title
	            'Aceptar' // buttonName
	            ); 
             }*/
            
            
        } else {
            alert("Debe escribir el Número de Ruta y su Contraseña");
        }

    }
}

/**
 * Genera el token encriptado a partir del Password y la Fecha
 *
 * @author cgarcia
 */
function generarFecha() {
    if (curr_month.length == 1) {
        curr_month = "0" + curr_month;
    }

    if (curr_date.length == 1) {
        curr_date = "0" + curr_date;
    }

}

function generarToken(pass) {
    var token = "";
    if (curr_month.length == 1) {
        curr_month = "0" + curr_month;
    }

    if (curr_date.length == 1) {
        curr_date = "0" + curr_date;
    }

    token = curr_year + "" + curr_month + "" + curr_date;

    return MD5(pass + token);
}

/**
 * Recibe todos los datos y guarda la informacion en la ruta
 * especifica..
 *
 * @author cgarcia
 */
function sincronizarRecepcionDatos(rutaN, token) {
    
    
    
    if (checkConnection() == 'No network connection') {
        alert("No esta Conectado a una Red!");
    } else {
        var tipoConexion = $("#cambiaServerBajar option:selected").val();

        //Reiniciamos las variables de manejo de error, sincronizacion bloqueada. 
 		intentosRecibidos = 0;
		cantArchRecibidos = 0;
		errorRecibidos = 0;
		bloqRecibidos = 0;
		passErrorRecibidos = 0; 
		noDatosRecibidos=0;
		MetodosNuevosRecibidos=0;

		if(parseInt(tipoConexion) == 1) {		
			if(esAmbienteProduccion===true){				
				servidorWS = servidorWS_RedInterna_Produccion;
				usuarioFTP = usuarioFTP_RedInterna_Produccion;
				passFTP = passFTP_RedInterna_Produccion;
				servidorFTP = servidorFTP_RedInterna_Produccion;				
			}else{
				servidorWS = servidorWS_RedInterna_Piloto;
				usuarioFTP = usuarioFTP_RedInterna_Piloto;
			    passFTP = passFTP_RedInterna_Piloto;
			    servidorFTP = servidorFTP_RedInterna_Piloto;
			}
			console.log('conexión interna');	
		}
		else {	
			if(esAmbienteProduccion===true){
				servidorWS = servidorWS_Internet_Produccion;
				usuarioFTP = usuarioFTP_Internet_Produccion;
				passFTP = passFTP_Internet_Produccion;
				servidorFTP = servidorFTP_Internet_Produccion;	
			}else{	
				servidorWS = servidorWS_Internet_Piloto;
				usuarioFTP = usuarioFTP_Internet_Piloto;
				passFTP = passFTP_Internet_Piloto;
				servidorFTP = servidorFTP_Internet_Piloto;	
			}
			console.log('conexión externa');
		}


        obtenerDatosServidor(rutaN,token)
        
        //Reinicia los valores del array Esto se mantiene de la version enviada por cgarcia
        reiniciaTodo();

        //Limpiamos la tabla de factura
        db_smart_sales.metodos.limpiar_tabla("facturas");
        grabatmp("facturas_web_sql", new Array());

        //Almacena el codigo de la ruta
        grabaArchivoBajado(naRuta, rutaN);
        //Deshabilita el boton de inicio del dia
        $("#btnIniciodia").addClass('ui-disabled');
        //Nos regresa a la pagina inicial
        $.mobile.changePage('#page1');



    }
}

/**
 * Obtiene los datos del Servidor ObtenerClientesPreventa - Datos de los
 * Clientes de la Ruta ObtenerSKUPreventa - Productos
 * ObtenerDocumentosPendientesPreventa - Documentos Pendientes
 *
 * @author cgarcia
 */

 var intentosRecibidos = 0;
 
//Cantidad de archivos recibidos
 var cantArchRecibidos = 0;
 //Varible para indicar la cantidad de errores
 var errorRecibidos = 0;
 //Variable para indicar cuando hay un bloque
 var bloqRecibidos = 0;
 //Variable para indicar que no hay acceso
 var passErrorRecibidos = 0; 
 //Varible para indicar que no hay datos
 var noDatosRecibidos=0;
 //Unicamente para los metodos nuevos
 var MetodosNuevosRecibidos=0;

function AgregarSaldoReal(datosRecibidos){

  var Arreglo_DocPendientes=datosRecibidos.split("\n");
  var datosModificados="";

  for(i=0;i<Arreglo_DocPendientes.length;i++){
		var Saldo=Arreglo_DocPendientes[i].split("|")[4];
		var lineaOriginal=Arreglo_DocPendientes[i].split("|");
		var lineaNueva=lineaOriginal[0] + "|" + lineaOriginal[1] + "|" + lineaOriginal[2] + "|" + lineaOriginal[3] + "|" + lineaOriginal[4] + "|"+ lineaOriginal[5] + "|"+ Saldo;
		Arreglo_DocPendientes.splice(i, 1);
		Arreglo_DocPendientes.unshift(lineaNueva);

 }

 datosModificados=Arreglo_DocPendientes.join("\n");

 return datosModificados;
}

function obtenerDatosServidor(ruta, token){

    //intentosRecibidos++;
    var sql= (intentosRecibidos > 8 ? true : false)
    var metodo= Nombre_Metodos[intentosRecibidos];
    var arregvacio = new Array();
    //Activamos el aler solamente cuando es el primer metodo.
    if(intentosRecibidos == 0)
    {
        navigator.notification.activityStart("Descargando Datos...", "Por favor espere");
    }

    var parametroPrueba = " ";

//    if( ( metodo == "ObtenerSKUSPCOR"  || metodo == "ObtenerCargaInicialRuta" ) && esAmbienteProduccion == false ){
//        parametroPrueba = "&prueba=1";
//    }

    $.ajax({
          method: "GET",
          timeout:60000,
          url:servidorWS + "?op=" +  metodo + "&ruta=" + ruta + "&tok=" + token + "&devid=" + device.model + "_" + device.uuid + "&version=" + version + "&tstamp=" + calculatstamp() + parametroPrueba
        }).done(function(data) {
            console.log("EXITO obtenerDatosServidor!!");
            console.log(data);
            var datosRetorno = data.toString().replace(/\r\n/gi, "\n");
            console.log("Servidor: "+servidorWS + "?op=" +  metodo + "&ruta=" + ruta + "&tok=" + token + "&devid=" + device.model + "_" + device.uuid + "&version=" + version + "&tstamp=" + calculatstamp());
            if(metodo=="ObtenerDocumentosPendientes"){

                console.log('Agregando Saldos a Docs. Pendientes...');
                console.log(datosRetorno);
                datosRetorno=AgregarSaldoReal(datosRetorno);
                console.log(datosRetorno);
            }

            //Prueba que las validaciones funcionen correctamente...
                 /*
                 if(esMetodoObligatorio(metodo)){
                    datosRetorno="NO DATOS";
                 }
                 //*/
                 /*
                 if(metodo=='ObtenerFacturaSiguiente' || metodo=='ObtenerReciboSiguiente'){
                    datosRetorno='zzz';
                 }
                 //*/

            var arrayDatos = datosRetorno.split("\n");
                if(datosRetorno.match("SINCRONIZACION NO PERMITIDA")!=null)
                {
                    bloqRecibidos++;
                    //Muestra el bloqueo solamente cuando en el primer metodo que retorte este tipo de error
                    if(bloqRecibidos==1)
                    {
                        navigator.notification.activityStop();
                        navigator.notification.alert('NO ha realizado envío de información, debe completar el procedimiento o contactarse con el encargado de Sistemas!!', // message
                        null, // callback
                        'SINCRONIZACION BLOQUEADA', // title
                        'Aceptar' // buttonName
                        );
                        
                        $('#btnIniciodia').addClass('ui-disabled');
                    }
                }else if(datosRetorno.match("SIN ACCESO")!=null) {
                        passErrorRecibidos++;
                        if(passErrorRecibidos==1){
                                navigator.notification.activityStop();
                                navigator.notification.alert('Usuario o Contraseña Erroneas, Por favor verfique y vuelva a intentar', // message
                                null, // callback
                                'ERROR', // title
                                'Aceptar' // buttonName
                                );
                                navigator.vibrate(2500);
                            }
                        $('#btnIniciodia').addClass('ui-disabled');
                }else{
                    if(datosRetorno.match("NO DATOS")!=null) {

                        //Valida metodos obligatorios...
                        ///*
                        if(esMetodoObligatorio(metodo)){
                           alert('El metodo' + metodo + ' es obligatorio para poder iniciar el dia, favor contactarse con el encargado de Sistemas');
                           return;
                        }
                        //*/
                        noDatosRecibidos++;
                        navigator.notification.activityStop();
                        if(sql){
                       
                            navigator.notification.alert('No hay datos para el metodo: '+ metodo +' favor contactarse con el encargado de Sistemas!!', // message
                            null, // callback
                            'No hay Datos', // title
                            'Aceptar' // buttonName
                            );
                            $('#btnIniciodia').addClass('ui-disabled');
                            $('#btnRutaDia').addClass('ui-disabled');

                        }
                        else{
                            navigator.notification.alert('No hay datos para el metodo: '+ metodo , // message
                            null, // callback
                            'No hay Datos', // title
                            'Aceptar' // buttonName
                            );
                            grabaArchivoBajado(Nombre_Archivo_bajados[intentosRecibidos], arregvacio);
                        }
                        navigator.vibrate(2500);

                    }
                    else{
                        if(sql){
                            if (data.length == 0 ){

                                //Valida metodos obligatorios...
                                ///*
                                if(esMetodoObligatorio(metodo)){
                                   alert('El metodo' + metodo + 'es obligatorio para poder inicar el dia, favor contactarse con el encargado de Sistemas');
                                   return;
                                }
                                //*/

                                navigator.notification.activityStop();
                                navigator.notification.alert('No hay datos para el metodo '+ metodo + ' favor contactarse con el encargado de Sistemas!!', // message
                                    null, // callback
                                    'No hay Datos', // title
                                    'Aceptar' // buttonName
                                );
                                navigator.vibrate(2500);
                                $('#btnIniciodia').addClass('ui-disabled');
                                $('#btnRutaDia').addClass('ui-disabled');
                            }else{
                                var data_json= data;
                                MetodosNuevosRecibidos++;

                                console.log("Metodo sql " + Nombre_Archivo_bajados[intentosRecibidos]+" Tamanio "+ data_json.length);
                                switch (Nombre_Archivo_bajados[intentosRecibidos]) {
                                    case 'Tipo_Pago':
                                            db_smart_sales.metodos.limpiar_tabla("Tipo_Pago")
                                            for (var i = 0; i < data_json.length; i++) {
                                                db_smart_sales.metodos.insertar_Tipo_Pago(data_json[i].CODIGO,data_json[i].DESCRIPCION, data_json[i].MONEDA, data_json[i].SELECCIONAR_BANCO, data_json[i].SE_DEPOSITA)
                                            }
                                            break;
                                    case 'bancos':
                                             db_smart_sales.metodos.limpiar_tabla("Bancos")
                                            for (var i = 0; i < data_json.length; i++) {
                                                db_smart_sales.metodos.insertar_bancos(data_json[i].CODIGO, data_json[i].BANCO)
                                            }
                                            break;    
                                    case 'bancosxruta':
                                            db_smart_sales.metodos.limpiar_tabla("BancosxRuta")
                                            for (var i = 0; i < data_json.length; i++) {
                                                db_smart_sales.metodos.insertar_Bancos_X_Ruta(data_json[i].RUTA,data_json[i].TIPO_PAGO, data_json[i].MONEDA, data_json[i].CODIGO_BANCO,data_json[i].BANCO,data_json[i].BANCO_DEPOSITO,data_json[i].BANCO_DEPOSITO_BPCS, data_json[i].ORIGEN) 
                                            }
                                            break;
                                    }   
                            }
                        }
                        else{
                            //Valida que lo devuelto por los metodos sea entero...
                            ///*
                            if(metodo=='ObtenerFacturaSiguiente' || metodo=='ObtenerReciboSiguiente'){
                              if( isNaN(Number(datosRetorno)) ||  datosRetorno.trim().length == 0  ){
                                alert('El metodo' + metodo + ' es obligatorio para poder iniciar el dia y actualmente está retornando un valor invalido '+datosRetorno+', favor sincronize nuevamente o contactarse con el encargado de Sistemas');
                                return;
                              }
                            }
                            //*/
                            cantArchRecibidos++;
                            grabaArchivoBajado(Nombre_Archivo_bajados[intentosRecibidos], datosRetorno);
                        }
                    }
                    if(bloqRecibidos==0 && passErrorRecibidos==0 && errorRecibidos==0 && + (cantArchRecibidos + noDatosRecibidos)== 9  && MetodosNuevosRecibidos==3 ){
                            $('#btnIniciodia').removeClass('ui-disabled');
                            $("#btnRutaDia").removeClass('ui-disabled');
                            navigator.notification.activityStop();
                            navigator.notification.alert('Todos los datos ya fueron Cargados.\n\nYa puede Iniciar Dia!!', // message
                            null, // callback
                            'Bajada de Datos Correctamente!', // title
                            'Aceptar' // buttonName
                            );
                            navigator.vibrate(2500);
                     }
                

                     intentosRecibidos ++
                     if(intentosRecibidos < 12){
                        obtenerDatosServidor(ruta, token)
                     }

                }
        }).fail(function() {
            console.log("FALLO obtenerDatosServidor!!");
            errorRecibidos++;
            console.log(servidorWS + "?op=" +  metodo + "&ruta=" + ruta + "&tok=" + token + "&devid=" + device.model + "_" + device.uuid + "&version=" + version + "&tstamp=" + calculatstamp());
            navigator.notification.activityStop();
            navigator.notification.alert('No Hubo Respuesta del Servidor. '+
                        'Verifique si esta indicando el Tipo de Conexión correcta ó '+
                        'Comuniquese con el Encargado de Sistemas! Metodo Error '+ metodo, // message
                null, // callback
                'SERVIDOR NO RESPONDE..', // title
                'Aceptar' // buttonName
                );  
                navigator.vibrate(2500);
                $('#btnIniciodia').addClass('ui-disabled');
                $('#btnRutaDia').addClass('ui-disabled');
        });
}

function esMetodoObligatorio(metodo){
    if(metodo=='ObtenerClientes'){
      return true;
    }
    if(metodo=='ObtenerSKUSPCOR'){
          return true;
    }
    if(metodo=='ObtenerCargaInicialRuta'){
          return true;
    }
    if(metodo=='ObtenerFacturaSiguiente'){
          return true;
    }
    if(metodo=='ObtenerReciboSiguiente'){
          return true;
    }
    if(metodo=='ObtenerAsignacionImpresora'){
          return true;
    }
    if(metodo=='ObtenerPedidosPorRuta'){
          return true;
    }
    return false;
}

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}


function Error_sicronizar(metodo){

    navigator.notification.alert('No Hubo Respuesta del Servidor. '+
                            'Verifique si esta indicando el Tipo de Conexión correcta ó '+
                            'Comuniquese con el Encargado de Sistemas! Metodo Error '+ metodo, // message
                    null, // callback
                    'SERVIDOR NO RESPONDE..', // title
                    'Aceptar' // buttonName
                    );  
                    navigator.vibrate(2500);
}


/**
 * Asignamos a los controladores de descarga si los datos fueron bajados
 * con exito o no.
 *
 * @author cgarcia
 */
function indicarResultadoSincro(operacion, indicador) {
    if (operacion == "ObtenerSKUS") {
        exitoProductos = indicador;
    }

    if (operacion == "ObtenerClientes") {
        exitoClientes = indicador;
    }
}

/**
 * Escribe los datos proporcionados por WS a un archivo de texto
 * ObtenerClientesPreventa
 *
 * @author cgarcia
 */
function grabaArchivoBajado(archivo, data) {
    var path = "/autoventa/" + archivo;
    console.log('* Creando archivo:'+path);
    var writer = new FileWriter(path);
    writer.write(data, false);
    //Graba con Plugin...
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile(path, { create: true, exclusive: false }, function (fileEntry) {

            console.log("fileEntry is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            //fileEntry.fullPath == '/mnt/sdcard/autoventa/someFile.txt'
            writeFile(fileEntry, data);

        }, function(error){console.log(error);});

    }, function(){console.log("error");});
}

/**
 * Metodo para subir los archivos al FTP
 *
 * @author cgarcia
 */
function sincronizarEnvioDatos() {

    if (checkConnection() == 'No network connection') {
        alert("No esta conectado a una Red!");
    } else {

        cantArchEnviados = 0;
        errorEnvio = 0;
        intentosEnvio = 0;
        var tipoConexion = $("#cambiaServer option:selected").val();

		if(parseInt(tipoConexion) == 1) {		
			if(esAmbienteProduccion===true){				
				servidorWS = servidorWS_RedInterna_Produccion;
				usuarioFTP = usuarioFTP_RedInterna_Produccion;
				passFTP = passFTP_RedInterna_Produccion;
				servidorFTP = servidorFTP_RedInterna_Produccion;				
			}else{
				servidorWS = servidorWS_RedInterna_Piloto;
				usuarioFTP = usuarioFTP_RedInterna_Piloto;
			    passFTP = passFTP_RedInterna_Piloto;
			    servidorFTP = servidorFTP_RedInterna_Piloto;
			}
			console.log('conexión interna');	
		}
		else {	
			if(esAmbienteProduccion===true){
				servidorWS = servidorWS_Internet_Produccion;
				usuarioFTP = usuarioFTP_Internet_Produccion;
				passFTP = passFTP_Internet_Produccion;
				servidorFTP = servidorFTP_Internet_Produccion;	
			}else{	
				servidorWS = servidorWS_Internet_Piloto;
				usuarioFTP = usuarioFTP_Internet_Piloto;
				passFTP = passFTP_Internet_Piloto;
				servidorFTP = servidorFTP_Internet_Piloto;	
			}
			console.log('conexión externa');
		}

        if (archivosGrabados.length > 0) {


            var HaySolo2Archivos = archivosGrabados.length == 2;
            var PrimerArchivoEsLog  = archivosGrabados[0][1].toString().indexOf("DST_LOGSALIDA") > -1;
            var SegundoArchivoEsLog = archivosGrabados[1][1].toString().indexOf("DST_LOGERRORESIMPRESION") > -1;

            var NoEnviarDatos= HaySolo2Archivos && PrimerArchivoEsLog && SegundoArchivoEsLog;

            // Si solamente se creó el archivo de logs, no mandamos nada al FTP
            if(NoEnviarDatos){
                alert("No hay documentos para enviar");
                return;
            }

            contadorArchivos = archivosGrabados.length;
            for (var i = 0; i < archivosGrabados.length; i++) {
                var alineatmp = archivosGrabados[i];
                var alocal = alineatmp[0].toString();
                var aremoto = alineatmp[1].toString();

                if(aremoto.indexOf("backup") > -1){
                    aremoto="Facturas_Backup/"+ aremoto
                }
                subirArchivoFTP(alocal, aremoto, contadorArchivos);

            }
        }
    }
}

/**
 *
 */
var cantArchEnviados = 0;
var errorEnvio = 0;
var intentosEnvio = 0;

function subirArchivoFTP(local, remoto, cantArchivos) {
    var mensajeEnvio = "Todos los Archivos fueron enviados con éxito!!";
    intentosEnvio++;

    if (intentosEnvio == 1) {
        navigator.notification.activityStart("Enviando datos", "Por favor espere...");
    }

    var win = function() {
        navigator.notification.activityStop();
        cantArchEnviados++;

        if (cantArchEnviados == cantArchivos) {
            navigator.notification.alert(mensajeEnvio, // message
            null, // callback
            'ENVIO EXITOSO', // title
            'Aceptar' // buttonName
            );
        }

        //alert("Archivo " + remoto + " ha sido enviado exitosamente!");
        //contadorArchivos--;
    }
    var fail = function(error) {
        navigator.notification.activityStop();
        errorEnvio++;

        if (errorEnvio == 1) {

            navigator.notification.alert('NO se pudo enviar la información, Por favor intentelo de nuevo!! ERROR: '+error, //'Archivo ' + remoto + ' no ha sido enviado, debe intentar de nuevo', // message
            null, // callback
            'ERROR ENVIANDO DATOS', // title
            'Aceptar' // buttonName
            );
        }
    }
    var archivoftp = local;
    var servidorftp = "ftp://" + usuarioFTP + ":" + passFTP + "@" + servidorFTP + "/" + remoto + ";type=i";
    console.log("FTP ");
    console.log("Archivo: "+archivoftp+" "+servidorftp);
    FTPPlugin.put(archivoftp, servidorftp, win, fail);
}

/**
 * Verifica el estado de la conexion a datos del Equipo
 *
 * @author cgarcia
 */
function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    return states[networkState];
}


/* Servidor Produccion */
var servidorWS = "";


var naClientes = "clientes.txt";
var naBancos = "bancos.txt";
var naDocsPendientes = "docspendientes.txt";
var naProductos = "productos.txt";
var naCargaInicial = "cargainicial.txt";
var naTipoCambio = "tipocambio.txt";
var naCorrelativo = "correlativo.txt";
var naCorrelativoabono = "correlativoabono.txt";
var naEnvases = "precioenvases.txt";
var naImpresora = "impresora.txt";
var naPedidos = "pedidos.txt";
var naDevoluciones = "devoluciones.txt";
var naCambios = "cambios.txt";
var naDevolucionEnvases = "devolucionenvases.txt";
var naRuta = "ruta.txt";
var rutaArchivoBajado = "/mnt/sdcard/autoventa/";

/* Variables para FTP */

var usuarioFTP = "";
var passFTP = "";
var servidorFTP = "";


// funciones de entrega

function tieneReciboenvases() {
    var respuesta = false;
    for ( ii = 0; ii < facturasimpresas.length; ii++) {
        var dev = facturasimpresas[ii].split("|");
        if (dev[3] == clienteenuso && dev[14] == "RECENV") {
            respuesta = true;
            break;
        }
    }
    return respuesta;
}


function imprimeReciboenvases() {

    var ClienteActualNoTieneDevoluciones = true;
    for ( i = 0; i < devolucionenvases.length; i++) {
            devolucionActual = devolucionenvases[i].split("|");
            if ( devolucionActual[0] == clienteenuso ) {
                ClienteActualNoTieneDevoluciones = false;
                break;
            }
        }

    if(ClienteActualNoTieneDevoluciones){

           navigator.notification.alert("Debe guardar la devolucion antes de imprimir.",
           null,
           "Error",
           'Aceptar'
           );
          return;

    }

    if (!tieneReciboenvases()) {
        var montodevolucionrecibo = 0;

        var cant200fdc = 0;
        var cant375fdc = 0;
        var cant750fdc = 0;
        var cant1000fdc = 0;
        var cant1750fdc = 0;

        var cant200rp = 0;
        var cant375rp = 0;
        var cant750rp = 0;
        var cant1000rp = 0;
        var cant1750rp = 0;

        var DevEnvRuta =[];

        for ( i = 0; i < devolucionenvases.length; i++) {
            var dev = devolucionenvases[i].split("|");
            if (dev[0] == clienteenuso) {
                DevEnvRuta.push(devolucionenvases[i]);
                if (dev[6] == 0) {

                    cant200fdc = Number(cant200fdc) + Number(dev[1]);
                    cant375fdc = Number(cant375fdc) + Number(dev[2]);
                    cant750fdc = Number(cant750fdc) + Number(dev[3]);
                    cant1000fdc = Number(cant1000fdc) + Number(dev[4]);
                    cant1750fdc = Number(cant1750fdc) + Number(dev[5]);
                    //montodevolucionrecibo = Number(montodevolucionrecibo) + Number(dev[7]).toFixed(2);
					
					montodevolucionrecibo += Number(dev[7]);

                } else {

                    cant200rp = Number(cant200rp) + Number(dev[1]);
                    cant375rp = Number(cant375rp) + Number(dev[2]);
                    cant750rp = Number(cant750rp) + Number(dev[3]);
                    cant1000rp = Number(cant1000rp) + Number(dev[4]);
                    cant1750rp = Number(cant1750rp) + Number(dev[5]);
                    //montodevolucionrecibo = Number(montodevolucionrecibo) + Number(dev[7]).toFixed(2);
					
					montodevolucionrecibo += Number(dev[7]);
                }
            }

        }

        var devEnvasedetalle = [cant200fdc, cant375fdc, cant750fdc, cant1000fdc, cant1750fdc, cant200rp, cant375rp, cant750rp, cant1000rp, cant1750rp];

        var tmpcliente = buscadatosCliente(clienteenuso);
        
        var reciboEncabezado = ["ORIGINAL", "RECIBO DE ENVASES", ruta + "ENV" + clienteenuso, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), null, null, null, formatoDinero(montodevolucionrecibo), null, null];
//        facturasimpresas.push(reciboEncabezado.join("|") + "|RECENV");
//        docsimpresos.push(ruta + "|RECIBOENVASES|ORIGINAL|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
       
        persistenciaSistema();
        var docimp = ruta + "|RECIBOENVASES|ORIGINAL|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
        var facimp = reciboEncabezado.join("|") + "|RECENV";
        dataRecibo(reciboEncabezado, devEnvasedetalle, 1,docimp,facimp,"","","","","",DevEnvRuta);
        window.alert("Devolucion de envases impresa");
    } else {
        var montodevolucionrecibo = 0;

        var cant200fdc = 0;
        var cant375fdc = 0;
        var cant750fdc = 0;
        var cant1000fdc = 0;
        var cant1750fdc = 0;

        var cant200rp = 0;
        var cant375rp = 0;
        var cant750rp = 0;
        var cant1000rp = 0;
        var cant1750rp = 0;

        for ( i = 0; i < devolucionenvasesRuta.length; i++) {
            var dev = devolucionenvasesRuta[i].split("|");
            if (dev[0] == clienteenuso) {
                if (dev[6] == 0) {

                    cant200fdc = Number(cant200fdc) + Number(dev[1]);
                    cant375fdc = Number(cant375fdc) + Number(dev[2]);
                    cant750fdc = Number(cant750fdc) + Number(dev[3]);
                    cant1000fdc = Number(cant1000fdc) + Number(dev[4]);
                    cant1750fdc = Number(cant1750fdc) + Number(dev[5]);
                    //montodevolucionrecibo = Number(montodevolucionrecibo) + Number(dev[7]).toFixed(2);
					montodevolucionrecibo += Number(dev[7]);

                } else {

                    cant200rp = Number(cant200rp) + Number(dev[1]);
                    cant375rp = Number(cant375rp) + Number(dev[2]);
                    cant750rp = Number(cant750rp) + Number(dev[3]);
                    cant1000rp = Number(cant1000rp) + Number(dev[4]);
                    cant1750rp = Number(cant1750rp) + Number(dev[5]);
                    //montodevolucionrecibo = Number(montodevolucionrecibo) + Number(dev[7]).toFixed(2);
					montodevolucionrecibo += Number(dev[7]);
                }
            }

        }

        var devEnvasedetalle = [cant200fdc, cant375fdc, cant750fdc, cant1000fdc, cant1750fdc, cant200rp, cant375rp, cant750rp, cant1000rp, cant1750rp];

        var tmpcliente = buscadatosCliente(clienteenuso);

        var reciboEncabezado = ["COPIA", "RECIBO DE ENVASES", ruta + "ENV" + clienteenuso, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), null, null, null, formatoDinero(montodevolucionrecibo), null, null];

//        docsimpresos.push(ruta + "|RECIBOENVASES|COPIA|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
        window.alert("Cliente ya posee devolucion de envases, reimprimiendo");
        persistenciaSistema();
        var docimp = ruta + "|RECIBOENVASES|COPIA|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
        dataRecibo(reciboEncabezado, devEnvasedetalle, 1,docimp);

    }
}


function imprimeAbono() {

    //Parche para correlativo no numerico...
    if(isNaN(Number(correlativoabono))){
        alert("Ocurrio un error, por favor, intente abonar nuevamente. Si el problema continua cierra y vuelva a abrir la aplicación");
        return;
    }

    var sumaAbono = 0;
    var reciboEncabezado = new Array();
    var reciboDetalle = new Array();
    var txttipoAbono = "";
    var textoabono = "";
    var txtBanco = "";

    var AbonosRealizados_=[];
    
    if (facturaenuso == "") {
        window.alert("Debe seleccionar un documento valido");
    } else {
        if (!tieneAbonos()) {
            if (abonoNuevoSaldo >= 0 && abonoNuevoSaldo != saldofacturaenuso) {
                var tmpcliente = buscadatosCliente(clienteenuso);
                
                //if (abonoNuevoSaldo != 0 && tmpcliente[2] == "CONTADO") {
                if (abonoNuevoSaldo != 0 && tipofacturaenuso == "CONTADO") {
                   // window.alert("Este Documento es de contado, debe cancelar la factura en su totalidad...");
                    
                     navigator.notification.alert("Esta factura fue emitida de CONTADO, por lo que deberá cancelarla en su totalidad!", // message
			            null, // callback
			            "Pago Incompleto", // title
			            'Aceptar' // buttonName
			            );
                    
                } else {
                    if(!ProcesandoAbono){
                        ProcesandoAbono = true
                        var tmpcorrelativoabono = ruta + "-" + creacorrelativo(correlativoabono);
                        var abonos_factura = []
                        for ( var ii = 0; ii < abonos.length; ii++) {
                            var tmpabono = abonos[ii].split("|");
                            if (tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {
                                //Se unicamanete para seleccionar los abonos de determinada factura
                                abonos_factura.push(abonos[ii])

                            }
                        }
                    for ( var i = 0; i < abonos_factura.length; i++) {
                        //Se optiene de la tabal Tipo_Pago la descripcion y se valida si la modena es dolar para realizar su conversion a cordoba 
                            //Agregada 2016.02.03 por mroque
                            var tmp=abonos_factura[i].split("|")
                            db_smart_sales.metodos.Obtener_moneda_por_tipo_pago(Number(tmp[2]), tmp, i , function (item,_abono, indice) {

                                txttipoAbono = item.rows.item(0).DESCRIPCION
                                if( item.rows.item(0).MONEDA.toUpperCase().trim() !='COR'){
                                    txttipoAbono += "\n(" + formatoDinero(_abono[3]) + "*" + Number(_abono[6]).toFixed(4) + ")"
                                } 

                                if(item.rows.item(0).SELECCIONAR_BANCO==0){
                                    _abono[8] = "";
                                }
                                //Se asignal la descripcion del banco de smart sales que lleva el pedido 
                                txtBanco=_abono[10]
                                sumaAbono = Number(sumaAbono) + Number(_abono[4]);
                                reciboDetalle.push([txttipoAbono, formatoDinero(Number(_abono[4])), txtBanco, _abono[8]]);

                                var abono_temporal=_abono;

//                                abonosRealizados.push(abono_temporal[0] + "|"+ abono_temporal[1] + "|" + abono_temporal[2] +"|" + abono_temporal[3] + "|" + abono_temporal[4] +"|"+ abono_temporal[5]+ "|"+ abono_temporal[6] +"|"+ abono_temporal[7] +"|"+ abono_temporal[8] + "|" + abono_temporal[9] + "|" + tmpcorrelativoabono + "|" + (ruta + llavefecha.substring(2, llavefecha.length))+ "|" + abono_temporal[10] + "|" + abono_temporal[11] + "|" + abono_temporal[12]);
//                                var AbonosRealizados_ = abono_temporal[0] + "|"+ abono_temporal[1] + "|" + abono_temporal[2] +"|" + abono_temporal[3] + "|" + abono_temporal[4] +"|"+ abono_temporal[5]+ "|"+ abono_temporal[6] +"|"+ abono_temporal[7] +"|"+ abono_temporal[8] + "|" + abono_temporal[9] + "|" + tmpcorrelativoabono + "|" + (ruta + llavefecha.substring(2, llavefecha.length))+ "|" + abono_temporal[10] + "|" + abono_temporal[11] + "|" + abono_temporal[12];
                                  AbonosRealizados_.push(abono_temporal[0] + "|"+ abono_temporal[1] + "|" + abono_temporal[2] +"|" + abono_temporal[3] + "|" + abono_temporal[4] +"|"+ abono_temporal[5]+ "|"+ abono_temporal[6] +"|"+ abono_temporal[7] +"|"+ abono_temporal[8] + "|" + abono_temporal[9] + "|" + tmpcorrelativoabono + "|" + (ruta + llavefecha.substring(2, llavefecha.length))+ "|" + abono_temporal[10] + "|" + abono_temporal[11] + "|" + abono_temporal[12]);

                                if(indice ==(abonos_factura.length-1)) {

                                     reciboEncabezado = ["ORIGINAL", "RECIBO DE PAGO", tmpcorrelativoabono, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), facturaenuso, formatofecha(fechafacturaenuso), formatoDinero(montofacturaenuso), formatoDinero(saldofacturaenuso), formatoDinero(Number(sumaAbono).toFixed(2)), formatoDinero(Number(saldofacturaenuso - sumaAbono).toFixed(2))];
//                                        facturasimpresas.push(reciboEncabezado.join("|") + "|REC");
//                                        docsimpresos.push(ruta + "|RECIBO|ORIGINAL|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
                                        
//                                        correlativoabono++;
                                        
                                        //window.alert("Pago guardado...");
                                        
//                                        actualizaDocpendientes(clienteenuso, facturaenuso, saldofacturaenuso, sumaAbono);
                                       
                                        persistenciaSistema();

                                        var docimp = ruta + "|RECIBO|ORIGINAL|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema();
                                        var facimp = reciboEncabezado.join("|") + "|REC";
                                        var cli = clienteenuso;
                                        var fac = facturaenuso;
                                        var sal = saldofacturaenuso;
                                        var sum = sumaAbono;
                                        dataRecibo(reciboEncabezado, reciboDetalle, 2,docimp,facimp,cli,fac,sal,sum,AbonosRealizados_);
                                        
                                        //window.alert("Pago guardado...");
//                                        navigator.notification.alert('C$'+formatoDinero(Number(sumaAbono).toFixed(2))+ ' abonado a factura: '+facturaenuso, // message
//                                            null, // callback
//                                            'Pago '+tmpcorrelativoabono+' guardado!!', // title
//                                            'Aceptar' // buttonName
//                                            );
                                        
//                                        actualizaIconos();
//                                        cargadocscliente(clienteenuso);
//                                        facturaenuso = "";
//                                        $('#totalAbono').html("");
                                        ProcesandoAbono= false;
                                        
                                       /* if(pagoBloqueado == 0)
                                        {
                                            $("#btnInfoClientePagos").show();
                                            pagoBloqueado = 0;
                                            grabatmp("ww", pagoBloqueado);
                                            
                                        }*/ 
                                        //cargadocscliente(clienteenuso);
                                    //obtenerSaldoActual();
//                                    tablapedido();
                                }

                            })
                       }
                    }
                }
            } else {
                window.alert("El monto de los abonos no es valido, favor revise las cantidades");
                tablaAbonos();
            }
        } else {
        	//FACTURA YA POSEE PAGO.. REIMPRESION
            var tmpcorrelativoabono = buscaCorrelativoabono();
            var tmpcliente = buscadatosCliente(clienteenuso);
            var abonos_factura = []
            for (var ii = 0; ii < abonosRealizados.length; ii++) {
                var tmpabono = abonosRealizados[ii].split("|");
                if (tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {
                    
                    abonos_factura.push(abonosRealizados[ii])

                    }
                }

                for ( var i = 0; i < abonos_factura.length; i++) {
                //Se optiene de la tabal Tipo_Pago la descripcion y se valida si la modena es dolar para realizar su conversion a cordoba 
                //Agregada 2016.02.03 por mroque
                        var tmp=abonos_factura[i].split("|")
                        db_smart_sales.metodos.Obtener_moneda_por_tipo_pago(Number(tmp[2]), tmp, i , function (item,_abono, indice) {

                                txttipoAbono = item.rows.item(0).DESCRIPCION
                                if( item.rows.item(0).MONEDA.toUpperCase().trim() !='COR'){
                                    txttipoAbono += "\n(" + formatoDinero(_abono[3]) + "*" + Number(_abono[6]).toFixed(4) + ")"
                                }   
                                if(item.rows.item(0).SELECCIONAR_BANCO==0){
                                    _abono[8] = "";
                                }

                                //Se asignal la descripcion del banco de smart sales que lleva el pedido 
                                txtBanco=_abono[12]

                                sumaAbono = Number(sumaAbono) + Number(_abono[4]);
                                reciboDetalle.push([txttipoAbono, formatoDinero(Number(_abono[4])), txtBanco, _abono[8]]);

                                if(indice  == (abonos_factura.length-1)) {
                                    
                                    reciboEncabezado = ["COPIA", "RECIBO DE PAGO", tmpcorrelativoabono, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), facturaenuso, formatofecha(fechafacturaenuso), formatoDinero(montofacturaenuso), formatoDinero(Number(Number(saldofacturaenuso) + Number(sumaAbono))), formatoDinero(Number(sumaAbono).toFixed(2)),  formatoDinero(saldofacturaenuso)];
//                                    docsimpresos.push(ruta + "|RECIBO|COPIA|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
                                    dataRecibo(reciboEncabezado, reciboDetalle, 1);
                                   // window.alert("Recibo ya fue guardado, reimprimiendo...");
                                    navigator.notification.alert('Reimprimiendo recibo numero: '+tmpcorrelativoabono, // message
                                        null, // callback
                                        'Factura ya posee Pago', // title
                                        'Aceptar' // buttonName
                                        );
                                    
                                    facturaenuso = "";
                                    tablaAbonos();
                                    
                                     if(pagoBloqueado == 1)
                                     {
                                                $("#btnInfoClientePagos").show();
                                                pagoBloqueado = 0;
                                                grabatmp("ww", pagoBloqueado);
                                                
                                     }

                                    cargadocscliente(clienteenuso);
                                    //obtenerSaldoActual();
                                    tablapedido();

                                }
                        })
                }

                    

                    /*switch (Number(tmpabono[2])) {
                        case 1:
                            txttipoAbono = "Efectivo C$";
                            txtBanco = "";
                            tmpabono[8] = "";
                            break;
                        case 2:
                            txttipoAbono = "Efectivo US$\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
                            txtBanco = "";
                            tmpabono[8] = "";
                            break;
                        case 3:
                            txttipoAbono = "Cheque C$";
                            txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
                            break;
                        case 4:
                            txttipoAbono = "Cheque US$\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
                            txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
                            break;
                        case 5:
                            txttipoAbono = "Deposito C$";
                            break;
                            
                          case 6:
		                        txttipoAbono = "Deposito US$\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
		                        txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		                        break;
                        //Nueva linea agregada el 04/01/2016 por mroque
                        //Para el tipo de pago 7
                        case 7:
                                txttipoAbono = "Tarjeta Credito/\nDebito C$";
                                txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
                             break;
                    }*/


                
        }
    

    }
}

function imprimeminuta(bancoMinuta) {
	if(tieneSaldopendiente()) {
		window.alert("Imprimiendo minuta, se le genarara un faltante!\nAun posee documentos pendientes");
	}
	totalAbonosEfectivosCordobas = 0;
	totalAbonosEfectivosDolares = 0;
	totalAbonosCkCordobas = 0;
	totalAbonosCkDolares = 0;

        for( i = 0; i < abonosRealizados.length; i++) {
        var tmpabono = abonosRealizados[i].split("|");
        switch (Number(tmpabono[2])) {
            case 1:
                totalAbonosEfectivosCordobas += Number(tmpabono[4]);
                break;
            case 2:
                totalAbonosEfectivosDolares += Number(tmpabono[5]);
                break;
            case 3:
                totalAbonosCkCordobas += Number(tmpabono[4]);
                break;
            case 4:
                totalAbonosCkDolares += Number(tmpabono[5]);
                break;

        }

    }
    imprDatosMinuta = ["MINUTA DE DEPOSITO", ruta + llavefecha.substring(2, llavefecha.length), formatofecha(fechasistema()), horasistema(), ruta, formatoDinero(totalAbonosEfectivosCordobas), formatoDinero(totalAbonosCkCordobas), formatoDinero(totalAbonosEfectivosDolares), formatoDinero(totalAbonosCkDolares), bancoMinuta];
    
    docsimpresos.push(ruta + "|MINUTA|ORIGINAL|" + ruta + llavefecha.substring(2, llavefecha.length) + "||" + fechasistema() + "|" + horasistema());
    
    dataMinuta(imprDatosMinuta);

    $("#btnRutaDia").addClass('ui-disabled');
    
    
   // imprimeResumenPago();
	
}



function imprimeResumenPago() {
    
	var totalEfectivoNIO = 0; 
	var totalChequeNIO = 0; 
	var totalTarjetaNIO = 0;
	var totalMinutaNIO = 0;
    var totalTajetaUS=0
	
		var totalMinutaBACNIO = 0; 
		var totalMinutaBDFNIO = 0;
		var totalMinutaBANPRONIO = 0;
		var totalMinutaLAFISENIO = 0;
		var totalMinutaCITINIO = 0;
		var totalMinutaPROCREDITNIO = 0;
		var totalMinutaBCENTRALNIO = 0;
							
	var totalEfectivoUS = 0; 
	var totalChequeUS = 0;
	var totalMinutaUS = 0;
		var totalMinutaBACUS = 0; 
		var totalMinutaBDFUS = 0;
		var totalMinutaBANPROUS = 0;
		var totalMinutaLAFISEUS = 0;
		var totalMinutaCITIUS = 0;
		var totalMinutaPROCREDITUS = 0;
		var totalMinutaBCENTRALUS = 0;

    for ( i = 0; i < abonosRealizados.length; i++) {
        
        
        var tmpabono = abonosRealizados[i].split("|");
        if(fechasistema() ==  tmpabono[9] )
	    {    console.log("fecha: "+tmpabono[9]);
	        switch (Number(tmpabono[2])) {
	            case 1:
	                totalEfectivoNIO += Number(tmpabono[4]);
	                break;
	            case 2:
	                totalEfectivoUS += Number(tmpabono[5]);
	                break;
	            case 3:
	                totalChequeNIO += Number(tmpabono[4]);
	                break;
	            case 4:
	                totalChequeUS += Number(tmpabono[5]);
	                break;
	            case 5:
	                totalMinutaNIO += Number(tmpabono[4]);
	               	
		               	var banco = Number(tmpabono[7]);
		               	switch(banco){
		               		case 1:
		               			totalMinutaBACNIO += Number(tmpabono[4]);
		               		break;
		               			
		               		case 2:
		               			totalMinutaBDFNIO += Number(tmpabono[4]);
		               		break;
		               			
		               		case 3:
		               			totalMinutaBANPRONIO += Number(tmpabono[4]);
		               		break;
		               			
		               		case 4:
		               			totalMinutaLAFISENIO += Number(tmpabono[4]);
		               		break;
		               			
		               		case 5:
		               			totalMinutaCITINIO += Number(tmpabono[4]);
		               		break;
		               			
		               		case 6:
		               			totalMinutaPROCREDITNIO += Number(tmpabono[4]);
		               		break;
		               		
		               		case 7:
		               			totalMinutaBCENTRALNIO += Number(tmpabono[4]);
		               		break;
		               	}	
	                
	                
	                break;
	                
	            case 6:
	                totalMinutaUS += Number(tmpabono[5]);
	                
	                var banco = Number(tmpabono[7]);
		               	switch(banco){
		               		case 1:
		               			totalMinutaBACUS += Number(tmpabono[5]);
		               		break;
		               			
		               		case 2:
		               			totalMinutaBDFUS += Number(tmpabono[5]);
		               		break;
		               			
		               		case 3:
		               			totalMinutaBANPROUS += Number(tmpabono[5]);
		               		break;
		               			
		               		case 4:
		               			totalMinutaLAFISEUS += Number(tmpabono[5]);
		               		break;
		               			
		               		case 5:
		               			totalMinutaCITIUS += Number(tmpabono[5]);
		               		break;
		               			
		               		case 6:
		               			totalMinutaPROCREDITUS += Number(tmpabono[5]);
		               		break;
		               		
		               		case 7:
		               			totalMinutaBCENTRALUS += Number(tmpabono[5]);
		               		break;
		               	}	
	                
	                break;
	            case 7:
	                totalTarjetaNIO += Number(tmpabono[4]);
	                break;
                    //Se agrega tipo de pago tarjeta Dolar
                    //2016.02.05 por mroque
                case 8:
                    totalTajetaUS += Number(tmpabono[5]);
                    break; 
	
	        }
	     }

    }
    
   // var imprDatosResumen = ["R E S U M E N  D E  P A G O S", ruta + llavefecha.substring(2, llavefecha.length), formatofecha(fechasistema()), horasistema(), ruta, formatoDinero(totalAbonosEfectivosCordobas), formatoDinero(totalAbonosCkCordobas), formatoDinero(totalAbonosEfectivosDolares), formatoDinero(totalAbonosCkDolares)];
    
    var imprDatosResumen = ["R E S U M E N  D E  P A G O S", ruta + llavefecha.substring(2, llavefecha.length), formatofecha(fechasistema()), horasistema(), ruta, 
		formatoDinero(totalEfectivoNIO), formatoDinero(totalChequeNIO), formatoDinero(totalTarjetaNIO), formatoDinero(totalMinutaNIO),	
			formatoDinero(totalMinutaBACNIO), formatoDinero(totalMinutaBDFNIO),	formatoDinero(totalMinutaBANPRONIO), formatoDinero(totalMinutaLAFISENIO), formatoDinero(totalMinutaCITINIO),
			formatoDinero(totalMinutaPROCREDITNIO), formatoDinero(totalMinutaBCENTRALNIO), 			
		formatoDinero(totalEfectivoUS), formatoDinero(totalChequeUS), formatoDinero(totalMinutaUS), 
			formatoDinero(totalMinutaBACUS), formatoDinero(totalMinutaBDFUS), formatoDinero(totalMinutaBANPROUS), formatoDinero(totalMinutaLAFISEUS), formatoDinero(totalMinutaCITIUS),
			formatoDinero(totalMinutaPROCREDITUS), formatoDinero(totalMinutaBCENTRALUS), formatoDinero(totalTajetaUS) ];
    
    docsimpresos.push(ruta + "|RESUMEN_PAGO|ORIGINAL|"+ruta + llavefecha.substring(2, llavefecha.length)+"||" + fechasistema() + "|" + horasistema());
    dataMinutaResumenPago(imprDatosResumen);
    
    console.log(imprDatosResumen);

   // $("#btnRutaDia").addClass('ui-disabled');
 
 	

}


//imprimos resumen del dia
function imprimeResumenDia() {
    
    totalAbonosEfectivosCordobas = 0;
    totalAbonosEfectivosDolares = 0;
    totalAbonosCkCordobas = 0;
    totalAbonosCkDolares = 0;

    for ( i = 0; i < abonosRealizados.length; i++) {        
        
        var tmpabono = abonosRealizados[i].split("|");
        if(fechasistema() ==  tmpabono[9] )
	    {    console.log("fecha: "+tmpabono[9]);
	        switch (Number(tmpabono[2])) {
	            case 1:
	                totalAbonosEfectivosCordobas += Number(tmpabono[4]);
	                break;
	            case 2:
	                totalAbonosEfectivosDolares += Number(tmpabono[5]);
	                break;
	            case 3:
	                totalAbonosCkCordobas += Number(tmpabono[4]);
	                break;
	            case 4:
	                totalAbonosCkDolares += Number(tmpabono[5]);
	                break;
	
	        }
	     }

    }

    imprDatosMinuta = ["R E S U M E N  D E L  D I A", ruta + llavefecha.substring(2, llavefecha.length), formatofecha(fechasistema()), horasistema(), ruta, formatoDinero(totalAbonosEfectivosCordobas), formatoDinero(totalAbonosCkCordobas), formatoDinero(totalAbonosEfectivosDolares), formatoDinero(totalAbonosCkDolares)];
    docsimpresos.push(ruta + "|RESUMEN_DIA|ORIGINAL|"+ruta + llavefecha.substring(2, llavefecha.length)+"||" + fechasistema() + "|" + horasistema());
    dataMinutaResumen(imprDatosMinuta);

   // $("#btnRutaDia").addClass('ui-disabled');

}



//Verifica el limite de credito antes de abrir la ventana de levantamiento de pedido
function ingresarFactura(){	

	var clienteActual = buscadatosCliente(clienteenuso);
	
    //Limpeamos las variables de numero de referencia por cliente
        
    /*Si se ha generado factura para el cliente en uso, realizamos la busqueda del codigo 
    de referencia en los documentos impresos */
    
    FCLiquido=BuscarNumeroFacturaManual('PROD');
    FCEnvase=BuscarNumeroFacturaManual('ENV');

    $('#rfliquido > label').text((FCLiquido=="")?"N/D":FCLiquido);
    $('#rfenvase > label').text((FCEnvase=="")?"N/D":FCEnvase);
    
    
    
    $('.btn_ref_liquido  span.ui-btn-text').text("Agregar número de referencia");
    $('.btn_ref_envase span.ui-btn-text').text("Agregar número de referencia")
    
	if(Number(clienteActual[4]) > 0)
	{
		
		//Verificamos que el saldo este bien o que tenga factura
		if(saldoEnUso < 0 && !tieneFacturas("PROD"))
		{
			
			navigator.notification.alert('Este cliente ha excedido su limite de crédito!!, Debe abonar a su cuenta para poder facturar!!',
	            null, // callback
	            'Limite Excedido', // title
	            'Aceptar' // buttonName
	            );
	            
	            //Quitar para DESactivar Validación
	            $.mobile.changePage('#page4');
	            
		}else
		{
			$.mobile.changePage('#page4');
		}
	}else{
		$.mobile.changePage('#page4');
	}

	// Se deja en la parte inferior por el tema de renderizado
	if ( !tieneFacturas("PROD") ){
    	// Si el cliente actual no tiene Facturas, mostramos botón "Imprimir documento de Entrega"....
    	$("#imprimeDocEntrega").show();
    }else{
    	// Si el cliente actual tiene Facturas, no mostramos botón "Imprimir documento de Entrega"....
    	$("#imprimeDocEntrega").hide();

    }

    if (!tieneFacturas("ENV")) {
        $("#imprimeDocEntregaEnvase").show();
    }else{
        $("#imprimeDocEntregaEnvase").hide();
    }



}

/**
 * Actualizado: 2014.01.08
 * @autor: CGarcia
 * Comentarios: * Aqui se calcula el Saldo disponible del cliente en base a su deuda.
 * 				* Se verifica si el cliente aplica al 25% por encima de su limite de credito.(Ya no aplica)
 * 
 * Eliminamos el criterio de facturas de Casa Pellas sin incluir.
 * @Fecha: 2015-06-22
 */
function obtenerSaldoActual(){	
	
	var saldoActual = 0.0;
	saldoEnUso = 0.0;
	
	var clienteActual = buscadatosCliente(clienteenuso);
	
	//Verificamos el limite de Crédito.
	if(Number(clienteActual[4]) > 0)
	{ 
		if (docspendientes.length != 0) {
	        for ( i = 0; i < docspendientes.length; i++) {
		            docto = docspendientes[i].split("|");
		            if (docto[1] == clienteenuso && docto[4] > 0) {
		            	
		            	
		            	//Buscamos el caracter "-" en la numeracion, si no lo encuentra es una factura de Casa Pellas
		            	//var pos = docto[0].indexOf('-');     // posicion = -1
		            	
		            	//No encontro el caracter
		            	//if(pos == -1)
		            	//{
		            		//alert("Factura: "+docto[0]+" es de CASA PELLAS por "+docto[3]);
		            		
		            	//}else{
		            		//Si encontro el caracter		     
		            		
		            		/*		            		
		            		* Eliminamos el criterio de facturas de Casa Pellas sin incluir.
		            		* @Fecha: 2015-06-22		            		* 
		            		* */       		
							saldoActual = saldoActual + Number(docto[4]);							
		            	//}
		            	
		            }
		     }
		}
	    
	   //alert("Saldo Actual: "+saldoActual+" Limite: " + Number(clienteActual[4]) );
	   saldoEnUso = Number(clienteActual[4]) - saldoActual;	   
	   
	   //Limite excedido..
	   if(saldoEnUso < 0 ){
	   		$("#spanLimiteCredito").html("Limite de Crédito Excedido por C$"+(formatoDinero( (saldoEnUso * -1))));
	        $("#spanLimiteCredito").removeClass("limite_correcto");	   
	        $("#spanLimiteCredito").removeClass("limite_adicional");	         
	            	
	   }else
	   { //Limite permitido	   		   	
	   		//$("#spanLimiteCredito").hide();
	   		
	   		var porcUsado = ( saldoActual / Number(clienteActual[4]) ) * 100;	   		
	   		
	   		//Utiliza limite adicional
	   		//if(porcUsado <= 90)
	   		if(false)
	   		{
	   			// ((Saldo = limiteCredito * 25%) + LimiteCredito ) - SaldodeFacturas;
	   			saldoEnUso = ( (Number(clienteActual[4]) * porcAprobado ) + Number(clienteActual[4]) ) - saldoActual;	   			
	   			
	   			$("#spanLimiteCredito").html("Monto Máximo: C$"+(formatoDinero( saldoEnUso)));
	   			$("#spanLimiteCredito").addClass("limite_adicional");
	   			
	   			
	   		}else{
	   			$("#spanLimiteCredito").addClass("limite_correcto");
	   			$("#spanLimiteCredito").html("Crédito disponible: C$"+(formatoDinero( saldoEnUso)));
	   		}
	   		
	   		//alert("Credito Disponible: "+saldoEnUso);
	   			         
	   }
		 
		$("#spanLimiteCredito").show(); 
		//alert("Saldo Actual: " + saldoEnUso);
	
	}else{
		$("#spanLimiteCredito").hide();  
	}
}


function abreinfoClientePagado(){
	
	obtenerSaldoActual();
	$.mobile.changePage('#page6');
	
}


/**
 * Nos retorna la posicion del Cliente en la Lista de Clientes
 * @author: cgarcia
 */
function obtenerPosicionCliente(codCliente){
	var posicion = -1;
	
	
    for (var i = 0; i < listaclientes.length; i++) {
        var tmpcliente = listaclientes[i].split("|");
        if (tmpcliente[0] == codCliente) {
           posicion = i;
        }
    }
    
    return posicion;
}


function grabaDatosAbonos()
{
	
	navigator.notification.activityStart("Grabando Datos", "Por favor espere...");
	grabatmp("j", abonos);
    grabatmp("v", docsimpresos);
    grabatmp("hh", abonoMontoInicial);
    grabatmp("ii", abonoSaldoActual);
    grabatmp("jj", abonoMonto);
    grabatmp("kk", abonoNuevoSaldo);
	grabatmp("oo", abonosRealizados);
    grabatmp("rr", correlativoabono);
    navigator.notification.activityStop();
	
}

/*Atras en la informacion del cliente*/
function atras(){
	
	navigator.app.backHistory();
}

/*Para Reimprimir un documento Manualmente*/
function reimpresionManual(){
		    
    var encabezadoFactura = ["ORIGINAL", "FACTURA", "9918631", "J0310000001740", "T06-16030", "TELEFONIA CELULAR DE NICARAGUA", "T06", "31/12/2014", null, "09:18", "P06-9918631-20141230", "CREDITO", "20,233.42", "3,035.01", "23,268.43", null, null];
    var detalleFact = [["830NI0432L","FDC Gran Reserva 12x1000ml","0","50","228.82.42","11441.21",null],
 				       ["830NI0732LEX","FDC Extra Lite 12x1000ml Promocion","0","60","146.5368","8792.21",null]];
 				
 	dataFacturacion(encabezadoFactura, detalleFact, 1);   
}



function impresoras(){
	//listarImpresoras();
 	$('#page100').page();
    $.mobile.changePage('#page100');
 }

/*
function impresoras(){
	
	//dirPrinter = getcsv("impresora.txt")[0];
	//$("#inputPrinter").val(dirPrinter);

	//listarImpresoras();
 	$('#page100').page();
    $.mobile.changePage('#page100');
	
	
 }*/
 
 function guardarPrinter(){

	 var seleccion=$('#selectImpresora').val();
	 dirPrinter=seleccion.split("_")[0];
	 dirImpresora=seleccion.split("_")[0];
	 nombreImpresoraConectada=seleccion.split("_")[1];
	 navigator.notification.alert('Impresora '+nombreImpresoraConectada+' guardada con exito!!',
	            null, // callback
	            'Configuración Impresora', // title
	            'Aceptar' // buttonName
	            );
	 
	 grabaArchivoBajado("impresora.txt",dirPrinter+'_'+nombreImpresoraConectada);
	// activarBluetooth();
	muestraImpresoraConectada();
	 
	 /*
 	dirPrinter = $("#inputPrinter").val();
 	
 	if(dirPrinter!=""){
 		grabaArchivoBajado("impresora.txt",dirPrinter);
 		
 		navigator.notification.alert('Impresora guardada con exito!!',
	            null, // callback
	            'Configuración Impresora', // title
	            'Aceptar' // buttonName
	            );
 		
 		
 	}else{
 		navigator.notification.alert('Debe ingresar un dato correcto!!',
	            null, // callback
	            'Error', // title
	            'Aceptar' // buttonName
	            );
 	}
 	
 	dirPrinter = getcsv("impresora.txt")[0];
 	*/
 }
 

 
 
//Funcionalidad para agregar el numero de referencia para la factura manual
//2016.05.31  por mroque
 function AgregarFacturaManual(esliquido){
     var valor="";
     
     if(esliquido && FCLiquido.length > 0){
         valor= FCLiquido.substring(3, FCLiquido.length);
     }else if(FCEnvase.length > 0){
         valor= FCEnvase.substring(3, FCEnvase.length);
     }
     
     //Valida si al cliente ya se le ha facturado
     if(!tieneFacturas((esliquido)?"PROD":"ENV")){
          var nFactura = prompt("Agregar número de refencia", valor );
            if(nFactura){
                if(nFactura.length > 6 || isNaN(nFactura)){
                navigator.notification.alert('Ingrese un número de refencia valido',
                        null, 
                        'Error', 
                        'Aceptar'
                        );
                }else{

                    if(esliquido){
                            //Si es vacio no se agrega referencia, se rellena con 0 de no ser de 6 digitos
                            FCLiquido=(nFactura.length==0)? "": ("FM-" + ((nFactura.length < 6) ? (cadena_cero.substring(0, cadena_cero.length - nFactura.length) + nFactura) : nFactura))
                            $('#rfliquido > label').text((nFactura.length==0)? "N/D":FCLiquido);
                            $('.btn_ref_liquido span.ui-btn-text').text((nFactura.length==0)? "Agregar número de referencia":"Editar número de referencia");
                            
                    }
                    else{
                            FCEnvase=(nFactura.length==0)? "": ("FM-" + ((nFactura.length < 6) ? (cadena_cero.substring(0, cadena_cero.length - nFactura.length) + nFactura) : nFactura))
                            $('#rfenvase > label').text((nFactura.length==0)? "N/D":FCEnvase);
                            $('.btn_ref_envase span.ui-btn-text').text((nFactura.length==0)? "Agregar número de referencia":"Editar número de referencia");          
                        }
                    }
            }
     }
     else{
        navigator.notification.alert('Este cliente ya posee factura, por lo cual no es posible modificar el número de referencia',
            null, 
            'Cliente Facturado', 
            'Aceptar'
            );
     }
 }
 
 
/********************************************************************************************************************************/
 //Verificar si hay facturas de contado...
 function HayFacturasContado(){

 	//Define promesa...
 	var deferred=$.Deferred();

 	var hayfacturas=false;

 	db_smart_sales.metodos.Obtener_Datos_Facturas(function (item) {

 		for (var i = 0; i < item.rows.length; i++) {
 			if(item.rows.item(i).Linea_Pedido.split("|")[10]=='1'){
 				hayfacturas=true;
 				break;
 			}
 		}
 		if(item.rows.length > 0 ){
 			//Si hay facturas...

 			//Promesa exitosa...
 			deferred.resolve(hayfacturas);
 		}
 		else{
 			//Si no hay facturas...

 			console.log('No hay datos WebSQL de facturas...');

            //Graba Log...
            LogCreacionArchivos.append('No hay datos WebSQL de facturas...\n');

 			//Promesa falla...
 			deferred.reject('No se encontraron facturas registradas. Favor verifique y trate nuevamente');
 		}
 	},
 	function(){
 		//Callback de error WebSQL...

 		//Promesa falla...
 		deferred.reject('Ocurrio un error al tratar de obtener las facturas. Favor trate nuevamente en caso de persistir, cierre y vuelva a abrir la aplicación');
 		}
 	);

 	//return hayfacturas

 	//Retorna promesa...
 	return deferred.promise();

 }

 //Escoge la variable global a leer...
 function EscogervariableGlobal(archivo){
 	var contenido=[];
 		switch(archivo) {
 			case 'backup_facturas':
 				contenido=facturas;
 				break;
 			case 'DST_LOG_ERRORES':
 				contenido=logErrores;
 				break;
 			case 'motivosnovta':
 				contenido=motivosnoventa;
 				break;
 			case 'devolucionenvases':
 				contenido=devolucionenvasesRuta;
 				break;
 			case 'devoluciones':
 				contenido=devolucionesRuta;
 				break;
 			case 'cambios':
 				contenido=cambiosRuta;
 				break;
 			case 'abonos':
 				contenido=abonosRealizados;
 				break;
 			case 'findedia':
 				contenido=finaldia;
 				break;
 			case 'docsimpresos':
 				contenido=docsimpresos;
 				break;
 			case 'facturas':
 				//Este archivo se lee con WebSQL...
 				break;
 			default:

 			    //Graba Log...
                LogCreacionArchivos.append('Error: Archivo invalido:'+archivo+'\n');

 				console.log('Error: Archivo invalido');
 	}
 	return contenido;
 }

 //Obtiene contenido a grabar en archivo...
 function ObtenerContenidoArchivoSalida(archivo,archivoTemporal){

 	//Define promesa...
 	var deferred=$.Deferred();

 	var salida={};
 	salida.tam=0;
 	salida.cont="";
 	salida.path="/mnt/sdcard/autoventa/salida/" + ruta + "_" + archivo + "_" + llavefecha + ".txt";
 	salida.tmpremoto="" + ruta + "_" + archivo + "_" + llavefecha + ".txt";
     var tmp;
 	var temporal;
     var sb = new StringBuilder();
 	var contenido="";
 	var isWebSQL=false;

 	console.log('Obteniendo contenido de archivo '+archivo);

 	//Graba Log...
    LogCreacionArchivos.append('Obteniendo contenido de archivo '+archivo+'\n');

 	//Escoge variable global a leer...
 	contenido=EscogervariableGlobal(archivo);

 	if(archivo=='facturas'){
 		isWebSQL=true;
 	}
 	else{
 		isWebSQL=false;
 	}

 	if(isWebSQL){

 		console.log('\t\tTomando contenido por Websql...');

 		//Graba Log...
        LogCreacionArchivos.append('\t\tTomando contenido por Websql...\n');

 		if(logErrores.length>0){
 			//Promesa falla...
 			deferred.reject('No se pudo generar el archivo de facturas, favor con el apoyo de soporte subir el archivo de respaldo');
 		}
 		else{

 			db_smart_sales.metodos.Obtener_Datos_Facturas(function (item) {

 						for (var i = 0; i < item.rows.length; i++) {
 							if(i == item.rows.length -1){
 								sb.append(item.rows.item(i).ID_Cliente +"|"+ item.rows.item(i).SKU +"|"+ item.rows.item(i).Descripcion
 								+"|"+ item.rows.item(i).Conteo +"|"+ item.rows.item(i).Precio_Unitario +"|"+ item.rows.item(i).Precio_Envase.toFixed(4)
 								+"|"+ item.rows.item(i).Familia  +"|"+ item.rows.item(i).Exento  +"|"+ item.rows.item(i).Linea_Pedido);
 							}else{
 								sb.append(item.rows.item(i).ID_Cliente +"|"+ item.rows.item(i).SKU +"|"+ item.rows.item(i).Descripcion
 								+"|"+ item.rows.item(i).Conteo +"|"+ item.rows.item(i).Precio_Unitario +"|"+ item.rows.item(i).Precio_Envase.toFixed(4)
 								+"|"+ item.rows.item(i).Familia  +"|"+ item.rows.item(i).Exento  +"|"+ item.rows.item(i).Linea_Pedido  + "\n");
 							}

 						}
 						if(item.rows.length > 0 ){
 							var temporal = "\nCHECKSUM:" + MD5(sb.toString());
 							sb.append(temporal);
 							salida.tam=item.rows.length;
 							salida.cont = sb.toString();
 							//Promesa exitosa...
 							deferred.resolve(salida);
 						}
 						else{

 						    console.log('No hay datos WebSQL de facturas...');

 						    //Graba Log...
                            LogCreacionArchivos.append('No hay datos WebSQL de facturas...\n');

                            if(facturas.length>0){
                               //Se generó el archivo de backup_facturas...

                               //Promesa falla...
                               deferred.reject('Hubo problemas en generar la factura desde la base de datos, sin embargo se generó el archivo a partir del respaldo');

                            }
                            else{
                               //No se generó el archivo de backup_facturas...

                               //Promesa falla...
                               deferred.reject('No se encontraron facturas registradas. Favor verifique y trate nuevamente');

                            }

 						}
 			},
 			function(){
 				//Callback de error WebSQL...

 				//Promesa falla...
 				deferred.reject('Ocurrio un error al tratar de obtener las facturas. Favor trate nuevamente en caso de persistir, cierre y vuelva a abrir la aplicación');
 			}
 			);
 		}

 	}
 	else{

 		if(contenido.length > 0){
 			//Si variable global no está vacía...

 				//Arma contenido de archivo de salida...
 				sb=ArmarContenidoArchivoSalida(contenido,archivo);

 				salida.tam=contenido.length;
 				salida.cont= sb.toString();

 				//Promesa exitosa...
 				deferred.resolve(salida);
 			}
 			else{
 			//Si la variable global está vacía...

 				//Setea variable global con contenido de archivo temporal...
 				 var directorio="/mnt/sdcard/autoventa/tmp/";
 				var lecturafichero= lecturaFicherosTxt(directorio,archivoTemporal);
 				lecturafichero.done(function(){
 		            //Lectura de archivo temporal exitosa...

                     console.log('Contenido para archivo de salida '+archivo+' recuperado de archivo temporal '+ archivoTemporal);

 				     //Graba Log...
                     LogCreacionArchivos.append('Contenido para archivo de salida '+archivo+' recuperado de archivo temporal '+ archivoTemporal+'\n');

 					//Obtiene contenido de variable global asociada a archivo...
 					contenido=EscogervariableGlobal(archivo);

 					if(contenido.length > 0){
 						//Si variable global no está vacía...

 						console.log('Archivo temporal con datos');

 						//Graba Log...
                        LogCreacionArchivos.append('Archivo temporal con datos'+'\n');

 						//Arma contenido de archivo de salida...
 						sb=ArmarContenidoArchivoSalida(contenido,archivo);
 						salida.tam=contenido.length;
 						salida.cont= sb.toString();

 						//Promesa exitosa...
 						deferred.resolve(salida);
 					}
 					else{
 						//Si variable global esta vacia...

 						console.log('Archivo temporal vacío');

 						//Graba Log...
                        LogCreacionArchivos.append('Archivo temporal vacío'+'\n');

 						//Promesa falla...
 						deferred.reject('No se pudo recuperar el valor del archivo '+ archivo+ ' y el archivo de respaldo se encuentra vacío. Favor verifique y contactese con soporte');
 					}


 				});
 				lecturafichero.fail(function(){

 					//Graba Log...
                    LogCreacionArchivos.append('Fallo recuperación de archivo temporal '+archivoTemporal+'\n');

 					console.log('Fallo recuperación de archivo temporal '+archivoTemporal);

 					//Promesa falla...
 					deferred.reject('No se pudo recuperar el valor del archivo '+ archivo+ ' desde los backup. Favor vuelva a realizar el proceso si el problema persiste contactese con soporte');
 				});

 			}
 	}

 	//Retorna promesa...
 	return deferred.promise();
 }

 //Arma contenido Archivo de salida...
 function ArmarContenidoArchivoSalida(contenido,archivo){
 	var sb = new StringBuilder();
 	for ( i = 0; i < contenido.length; i++) {
 		if (i == contenido.length - 1) {
 			if (archivo == "pedidos" || archivo == "devoluciones" || archivo == "cambios" || archivo == "backup_facturas") {
 				tmp = (contenido[i].toString());
 				sb.append(tmp.replace(/\,/gi, "|"));
 			}else {
 				sb.append(contenido[i]);
 				}
 		}
 		else{
 				if (archivo == "pedidos" || archivo == "devoluciones" || archivo == "cambios" || archivo == "backup_facturas") {
 					tmp = (contenido[i].toString());
 					sb.append(tmp.replace(/\,/gi, "|") + "\n");
 				} else {
 					sb.append(contenido[i] + "\n");
 				}
 			}
 	}
 	temporal = "\nCHECKSUM:" + MD5(sb.toString());
 	sb.append(temporal);
 	return sb;
 }

//Graba archivo...
    function CrearArchivoSalida(RUTA__,DATOS__){
		//Define promesa...
		var deferred=$.Deferred();

		//Graba Log...
        LogCreacionArchivos.append('\tCREANDO archivo de salida'+RUTA__+'...'+'\n');

		console.log('\tCREANDO archivo de salida'+RUTA__+'...');

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
									function (fs) {
									fs.root.getFile(
									RUTA__,
									{ create: true, exclusive: false },
									function (fileEntry) {
										fileEntry.createWriter(function (fileWriter) {
											fileWriter.onwriteend = function() {

												//Graba Log...
                                                LogCreacionArchivos.append("GRABANDO "+RUTA__ +" ..."+'\n');

												console.log("GRABANDO "+RUTA__ +" ...");

												//Promesa exitosa...
												deferred.resolve();
											};
											fileWriter.onerror = function (e) {

												//Graba Log...
                                                LogCreacionArchivos.append("ERROR AL ESCRIBIR: " + e.toString()+'\n');

												console.log("ERROR AL ESCRIBIR: " + e.toString());


												//Promesa falla...
												deferred.reject();
											};
											fileWriter.write(DATOS__);
										});
									},
									function(error){

										//Graba Log...
                                        LogCreacionArchivos.append("ERROR AL TRATAR DE OBTENER MEMORIA: "+error+'\n');

										console.log("ERROR AL TRATAR DE OBTENER MEMORIA: "+error);

										//Promesa falla...
										deferred.reject();
										}
									);
									},
									function(error){

										//Graba Log...
                                        LogCreacionArchivos.append("NO SE PUDO CREAR EL ARCHIVO: "+error+'\n');

										console.log("NO SE PUDO CREAR EL ARCHIVO: "+error);

										//Promesa falla...
										deferred.reject();
									}
								);
		//Retorna promesa...
		return deferred.promise();
	}

 //Intenta grabar archivo...
 var GrabarArchivo=function GrabarArchivo(indice){

 	//Obtiene el contenido a grabar en archivo...
 	var ContenidoArchivoSalida=ObtenerContenidoArchivoSalida(listaArchivosSalida[indice].nombre,listaArchivosSalida[indice].archivoTemporal);
 	ContenidoArchivoSalida.then(function(salida){

 		//Intenta grabar archivo...
 		var escribir_archivo=CrearArchivoSalida(
 		"/autoventa/salida/"+salida.tmpremoto,
 		salida.cont);

 		//Grabación exitosa...
 		escribir_archivo.then(function(){

 			//Guarda archivo en log...
 			var tmpArchivos = new Array(salida.path,salida.tmpremoto);
 			archivosGrabados.push(tmpArchivos);

 			//Graba Log...
            LogCreacionArchivos.append('grabado archivo '+salida.tmpremoto+'\n');

 			console.log('grabado archivo '+salida.tmpremoto);

 			indice=indice+1;

 			//Archivo actual no es el ultimo archivo...
 			if(indice<listaArchivosSalida.length){

 				//Grabamos siguiente archivo...
 				GrabarArchivo(indice);
 			}
 			else{

 				//Archivo actual es el ultimo archivo...

 				//Graba Log...
                LogCreacionArchivos.append('..::Se completo la creacion de los archivos de salida::..'+'\n');

 				console.log('..::Se completo la creacion de los archivos de salida::..');

 				//Detiene loader...
 				navigator.notification.activityStop();

 				persistenciaSistema();

                localStorage.setItem("Estado", "Cerrado");
                localStorage.removeItem("Directorios");

                //Graba archivo de logs de salida...
                LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");

                //Graba archivo de logs de impresión de documentos
                grabarLogImpresion();

                //Resetea variable de logs de salida...
                LogCreacionArchivos=new StringBuilder();

                finalizaTodo();
 			}

 		});

 		//Grabación fallo...
 		escribir_archivo.fail(function(msjerror){

 			//Graba Log...
            LogCreacionArchivos.append('..::No se pudo completar la creacion de los archivos de salida::..'+'\n');
 			LogCreacionArchivos.append('Error: No se pudo grabar el archivo: '+listaArchivosSalida[indice].nombre+'\n');

 			console.log('..::No se pudo completar la creacion de los archivos de salida::..');
 			console.log( 'Error: No se pudo grabar el archivo: '+listaArchivosSalida[indice].nombre);

 			alert(msjerror);

 			//Graba Log...
            LogCreacionArchivos.append('ALERTA:'+msjerror+'\n');

 			//alert('Error: No se pudo grabar el archivo: '+listaArchivosSalida[indice].nombre+ ',favor vuelva a intentar guardar');

 			//Detiene loader...
 			navigator.notification.activityStop();

            //Desbloquea botón de guardar para volver a intentar generar los archivos de salida....
            $("#btnfindedia").removeClass('ui-disabled');

            //Graba archivo de logs de salida...
            LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");

             //Graba archivo de logs de impresión de documentos
             grabarLogImpresion();


 		});
 	});
 	ContenidoArchivoSalida.fail(function(msjerror){

 		//Archivo no es obligatorio...
 		if(listaArchivosSalida[indice].isObligatorio==false){
 			indice=indice+1;

 			//Archivo actual no es el ultimo archivo...
 			if(indice<listaArchivosSalida.length){

 				//Grabamos siguiente archivo...
 				GrabarArchivo(indice);
 			}
 			else{

 				//Archivo actual es el ultimo archivo...

 				//Graba Log...
                LogCreacionArchivos.append('..::Se completo la creacion de los archivos de salida::..'+'\n');

 				console.log('..::Se completo la creacion de los archivos de salida::..');

 				//Detiene loader...
 				navigator.notification.activityStop();

                persistenciaSistema();

                localStorage.setItem("Estado", "Cerrado");
                localStorage.removeItem("Directorios");

                //Graba archivo de logs de salida...
                LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");

                //Graba archivo de logs de impresión de documentos
                grabarLogImpresion();

                //Resetea variable de logs de salida...
                LogCreacionArchivos=new StringBuilder();

                finalizaTodo();
 			}

 		}
 		else            {

 			//Archivo es obligatorio...

 			//Graba Log...
             LogCreacionArchivos.append('..::No se pudo completar la creacion de los archivos de salida::..'+'\n');
 			 LogCreacionArchivos.append('Error: No hay contenido a grabar en el archivo '+listaArchivosSalida[indice].nombre+'\n');

 			console.log('..::No se pudo completar la creacion de los archivos de salida::..');
 			console.log('Error: No hay contenido a grabar en el archivo '+listaArchivosSalida[indice].nombre);

 			alert(msjerror);

            //Graba Log...
            LogCreacionArchivos.append('ALERTA:'+msjerror+'\n');

 			//Detiene loader...
 			navigator.notification.activityStop();

 			//Desbloquea botón de guardar para volver a intentar generar los archivos de salida....
            $("#btnfindedia").removeClass('ui-disabled');

            //Graba archivo de logs de salida...
            LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");

            //Graba archivo de logs de impresión de documentos
            grabarLogImpresion();

 		}
 	});


 }

 //Graba archivos de salida...
 function grabartodo() {

 	var indice=0;

// 	var hayFacturas=HayFacturasContado();

// 	hayFacturas.then(function(hayFacturasContado){

 		//Define si debe ir o no archivo de salida: abonos...
// 		listaArchivosSalida[0].isObligatorio=hayFacturasContado;

 		//Graba Log...
//        LogCreacionArchivos.append('Generar archivo de abonos '+hayFacturasContado+'\n');

// 		console.log('Generar archivo de abonos '+hayFacturasContado);

 		//Graba Log...
 		LogCreacionArchivos.append(":: INTENTO ::"+"\n\n");
        LogCreacionArchivos.append("...Grabando archivos de salida..."+"\n");

// 		console.log("...Grabando archivos de salida...");
        navigator.notification.activityStart("Grabando datos", "Por favor espere...");

 		//Empieza a grabar...
 		GrabarArchivo(indice);

// 	});

// 	hayFacturas.fail(function(msjerror){
// 		//Si no hay facturas en WebSQL...
//
//        if(facturas.length>0){
//        //Hay facturas en arreglo global facturas...
//
//        //Define si debe ir o no archivo de salida: abonos...
//        listaArchivosSalida[0].isObligatorio=HayFacturasContadoArray();
//
//        //Graba Log...
//        LogCreacionArchivos.append('Generar archivo de abonos '+HayFacturasContadoArray()+'\n');
//
//        console.log('Generar archivo de abonos '+HayFacturasContadoArray());
//
//        //Graba Log...
//        LogCreacionArchivos.append(":: INTENTO ::"+"\n\n");
//        LogCreacionArchivos.append("...Grabando archivos de salida..."+"\n");
//
//        console.log("...Grabando archivos de salida...");
//        navigator.notification.activityStart("Grabando datos", "Por favor espere...");
//
//        //Empieza a grabar...
//        GrabarArchivo(indice);
//
//        }
//        else{
//        //No hay facturas en arreglo global facturas...
//
//        //Setea variable global con contenido de archivo temporal...
//        var directorio="/mnt/sdcard/autoventa/tmp/";
//        var archivoTemporal=listaArchivosSalida[listaArchivosSalida.length-2].archivoTemporal;
//        var lecturafichero= lecturaFicherosTxt(directorio,archivoTemporal);
//
//        lecturafichero.done(function(){
//            //Lectura de archivo temporal exitosa...
//
//            if(facturas.length>0){
//              //Hay facturas...
//
//              //Define si debe ir o no archivo de salida: abonos...
//              listaArchivosSalida[0].isObligatorio=HayFacturasContadoArray();
//
//              //Graba Log...
//              LogCreacionArchivos.append('Generar archivo de abonos '+HayFacturasContadoArray()+'\n');
//
//              console.log('Generar archivo de abonos '+HayFacturasContadoArray());
//
//              //Graba Log...
//              LogCreacionArchivos.append(":: INTENTO ::"+"\n\n");
//              LogCreacionArchivos.append("...Grabando archivos de salida..."+"\n");
//
//              console.log("...Grabando archivos de salida...");
//              navigator.notification.activityStart("Grabando datos", "Por favor espere...");
//
//              //Empieza a grabar...
//              GrabarArchivo(indice);
//
//            }
//            else{
//              //No hay facturas
//
//              alert('No hay facturas registradas. Favor verifique y trate nuevamente');
//
//              //Graba Log...
//              LogCreacionArchivos.append('No hay facturas registradas. Favor verifique y trate nuevamente'+'\n');
//
//              console.log('No hay facturas registradas. Favor verifique y trate nuevamente');
//
//              //Desbloquea botón de guardar para volver a intentar generar los archivos de salida....
//              $("#btnfindedia").removeClass('ui-disabled');
//
//              //Graba archivo de logs de salida...
//              LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");
//
//              //Resetea variable de logs de salida...
//              //LogCreacionArchivos=new StringBuilder();
//            }
//
//        });
//
//        lecturafichero.fail(function(){
//            //Lectura de archivo temporal falló...
//
//            alert(msjerror);
//
//            //Graba Log...
//            LogCreacionArchivos.append(msjerror+'\n');
//
//            console.log(msjerror);
//
//            //Desbloquea botón de guardar para volver a intentar generar los archivos de salida....
//            $("#btnfindedia").removeClass('ui-disabled');
//
//            //Graba archivo de logs de salida...
//            LogsFichero(LogCreacionArchivos,"DST_LOGSALIDA");
//
//            //Resetea variable de logs de salida...
//            //LogCreacionArchivos=new StringBuilder();
//
//         });
//
//        }
//
// 	});

 }


 //Verificar si hay facturas de contado: busqueda en array...
 function HayFacturasContadoArray(){
 	var hayfacturas=false;
 	for(i=0;i<facturas.length;i++){
 		if(facturas[0][1].split("|")[10]=='1'){
 			hayfacturas=true;
 			return hayfacturas;
 		}
 	}
 	return hayfacturas;
 }

 //Graba logs de archivos de salida a fichero de texto en directorio: /salida
 function LogsFichero(logs,fichero){

    //Define nombre de archivo...
    var path="/mnt/sdcard/autoventa/salida/" + ruta + "_" + fichero + "_" + llavefecha + ".txt";
    var tmpremoto="" + ruta + "_" + fichero + "_" + llavefecha + ".txt";

    //Genera CHECKSUM...
    var CHECKSUM = "\nCHECKSUM:" + MD5(logs.toString()+"\n");

    //Genera contenido a grabar en archivo de logs...
    var contenidolog=logs.toString()+''+CHECKSUM;

    //Intenta grabar archivo de logs...
    var escribir_archivo=CrearArchivoSalida("/autoventa/salida/"+tmpremoto,contenidolog);

    //Grabación exitosa...
    escribir_archivo.then(function(){

        //Guarda archivo en log...
     	var tmpArchivos = new Array(path,tmpremoto);
     	archivosGrabados.push(tmpArchivos);

     	console.log("Archivo con los logs de salida creado con exito");
    });

    //Grabación fallo...
    escribir_archivo.fail(function(){

        console.log("No se pudo crear el archivo con los logs de salida");
    });
 }

 /********************************************************************************************************************************/
 function CalcularSaldoCliente(){

  	//Define promesa...
  	var deferred=$.Deferred();

  	var LimiteCredito=0;
 	var TotalDocPendientes=0;
 	var TotalAbonos=0;

 	var Saldo=0;


 	//Total Documentos Pendientes...
 	for (var i = 0; i < docspendientes.length; i++) {

 		if(docspendientes[i].split("|")[1]!=undefined){

 			if(clienteenuso==docspendientes[i].split("|")[1].trim()){
 				if(esValido(docspendientes[i].split("|")[6])){
 					//El dato es valido...
 					TotalDocPendientes+=Number(docspendientes[i].split("|")[6]);
 				}
 						else{
 							//El dato no es valido...
 							var mensajeError='Ocurrio un problema leyendo doc pendientes';
 							//Promesa falla...
 							deferred.reject(mensajeError);
 						}
 					}
 				}

 			}

 			//Total de Abonos...
 			for (var i = 0; i < abonosRealizados.length; i++) {

 				if(abonosRealizados[i].split("|")[0]!=undefined){
 					if(clienteenuso==abonosRealizados[i].split("|")[0].trim()){
 						if(esValido(abonosRealizados[i].split("|")[4])){
 							TotalAbonos+=Number(abonosRealizados[i].split("|")[4]);
 						}
 						else{
 							//El dato no es valido...
 							var mensajeError='Ocurrio un problema leyendo abonos';
 							//Promesa falla...
 							deferred.reject(mensajeError);
 						}
 					}
 				}

 			}

 			//Toma Limite de credito...
 			if(esValido(buscadatosCliente(clienteenuso)[4])){
 				LimiteCredito=Number(buscadatosCliente(clienteenuso)[4]);
 			}
 			else{
 				//El dato no es valido...
 				var mensajeError='Ocurrio un problema leyendo limite de credito';
 				//Promesa falla...
 				deferred.reject(mensajeError);
 			}


 			//Calcula saldo de cliente...
 			Saldo=LimiteCredito-TotalDocPendientes+TotalAbonos;

 			//Promesa exitosa...
 			deferred.resolve(Saldo);


  	//Retorna promesa...
  	return deferred.promise();

  }


 function esValido(dato){
 	 return !isNaN(Number(dato));
 }


function grabarLogImpresion(){

	var LOGERRORIMPRESIONSTRINGBUILDER = new StringBuilder();
    var LOGERRORIMPRESIONARRAY = [];
    LOGERRORIMPRESIONARRAY = LogErroresImpresionDocumentos.split("*");
    LOGERRORIMPRESIONARRAY.map((x=>{ LOGERRORIMPRESIONSTRINGBUILDER.append(x + "\n"); }));
    LogsFichero(LOGERRORIMPRESIONSTRINGBUILDER,"DST_LOGERRORESIMPRESION");

}

//---------------------------------------
//---------------------------------------




