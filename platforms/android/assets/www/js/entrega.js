var version="T-2014.09.08_T";

var d = new Date();
var curr_date = (d.getDate()).toString();
var curr_month = (d.getMonth() + 1).toString();
var curr_year = (d.getFullYear()).toString();
var curr_hour = (d.getHours()).toString();
var curr_min = (d.getMinutes()).toString();
var contadorArchivos;

var dias = new Array("Ruta de entrega", "Documentos Pendientes");
var diasVisita = new Array("Clientes temporales", "Lunes Semana 1", "Martes Semana 1", "Miercoles Semana 1", "Jueves Semana 1", "Viernes Semana 1", "Sabado Semana 1", "Domingo Semana 1", "Lunes Semana 2", "Martes Semana 2", "Miercoles Semana 2", "Jueves Semana 2", "Viernes Semana 2", "Sabado Semana 2", "Domingo Semana 2" );
var motivosCambios = new Array("Daño", "Picos", "Retiro", "Otros");
var marcaEnvases = new Array("FDC", "RP");

var servidor = "http://127.0.0.1/~estuardomorales/SER/entrega/";
var local = "file:///mnt/sdcard/entrega/";


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
var diaTrabajo = 0;

var clienteContado = 0;
var limiteExcedido = 0;
var limiteExcedidoEnv = 0;
var saldoEnUso = 0.0;
var pagoBloqueado = 0;
var porcAprobado = 0.25;


var clienteCorporativo = "";


function reiniciaTodo() {
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
	tipofacturaenuso = "";
	
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
	tipofacturaenuso = "";
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
}

function onBackKeyDown() {

}

function grabartodo() {
	navigator.notification.activityStart("Grabando datos", "Por favor espere...");
	iniciaGrabado = calculatstamp();
	grabaArchivo("facturas", facturas);

	grabaArchivo("motivosnovta", motivosnoventa);
	grabaArchivo("devolucionenvases", devolucionenvasesRuta);
	grabaArchivo("devoluciones", devolucionesRuta);
	grabaArchivo("cambios", cambiosRuta);

	grabaArchivo("abonos", abonosRealizados);
	grabaArchivo("findedia", finaldia);
	grabaArchivo("docsimpresos", docsimpresos);

	navigator.notification.activityStop();

}


function persistenciaInicial(){
	grabatmp("2", listaclientes);
	grabatmp("f", productos);
}

function persistenciaSistema() {
	navigator.notification.activityStart("Grabando Datos", "Por favor espere...");
	grabatmp("1", ruta);
	
	//grabatmp("2", listaclientes);
	
	grabatmp("3", llavefecha);
	grabatmp("4", fecha);
	grabatmp("5", tipoCambio);
	grabatmp("6", correlativo);
	
	//Grabamos el correlativo en la ubicacion inicial
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
	
	//Grabamos correlativoAbono
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




function recuperaDatos() {
    navigator.notification.activityStart("Recuperando Datos", "Por favor espere...");

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
    
    /*Leemos las variables para Limite de Credito Excedido*/
    clienteContado = leetmp("ss");
    limiteExcedido = leetmp("tt");
    limiteExcedidoEnv = leetmp("uu");
    saldoEnUso = leetmp("vv");
    pagoBloqueado = leetmp("ww");
    clienteCorporativo = leetmp("xx");

    leebancos();

    localStorage.setItem("Estado", "Corriendo");

    $("#numeroderuta").html(ruta);
    $("#contieneTC").html("TC:" + tipoCambio);
    $("#btnIniciodia").addClass('ui-disabled');

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

function recuperaDatosExterno() {
	navigator.notification.activityStart("Recuperando Datos", "Por favor espere...");
	
	
	console.log("Lee 1");
	
	ruta = leetmp2("1");
	listaclientes = leetmp2("2");
	llavefecha = leetmp2("3");
	fecha = leetmp2("4");
	tipoCambio = leetmp2("5");
	
	console.log("Lee 5");
	
	correlativo = leetmp2("6");
	clienteenuso = leetmp2("7");
	facturaenuso = leetmp2("8");
	fechafacturaenuso = leetmp2("9");
	montofacturaenuso = leetmp2("0");
	saldofacturaenuso = leetmp2("a");
	productoenuso = leetmp2("b");
	
	console.log("Lee b");
	
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
	
	console.log("Lee l");
	
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
	
	console.log("Lee w");
	
	devolucionesRuta = leetmp2("x");
	cambiosRuta = leetmp2("y");
	envasespedidos = leetmp2("z");
	envasesdevueltos = leetmp2("aa");
	saldoenvases = leetmp2("bb");
	lineaspedido = leetmp2("cc");
	
	console.log("Lee cc");
	
	totalAbonosEfectivosCordobas = leetmp2("dd");
	totalAbonosEfectivosDolares = leetmp2("ee");
	totalAbonosCkCordobas = leetmp2("ff");
	totalAbonosCkDolares = leetmp2("gg");
	abonoMontoInicial = leetmp2("hh");
	abonoSaldoActual = leetmp2("ii");
	abonoMonto = leetmp2("jj");
	abonoNuevoSaldo = leetmp2("kk");
	
	console.log("Lee kk");
	
	
	kilometrajei = leetmp2("ll");
	kFinal = leetmp2("mm");
	diaTrabajo = leetmp2("nn");
	abonosRealizados = leetmp2("oo");
	inventario = leetmp2("pp");
	devolucionenvasesRuta = leetmp2("qq");
	correlativoabono = leetmp2("rr");

	console.log("Lee rr");
	clienteCorporativo = leetmp("xx");
/*Leemos las variables para Limite de Credito Excedido*/
    /**clienteContado = leetmp("ss");
    limiteExcedido = leetmp("tt");
    limiteExcedidoEnv = leetmp("uu");
    saldoEnUso = leetmp("vv");
    pagoBloqueado = leetmp("ww");*/
	
	leebancos();

	localStorage.setItem("Estado", "Corriendo");

	$("#numeroderuta").html(ruta);
	$("#contieneTC").html("TC:" + tipoCambio);
	$("#btnIniciodia").addClass('ui-disabled');

	navigator.notification.activityStop();
	verClientes();
}

function grabaArchivo(arch, cont) {
	if(cont.length > 0) {
		var path = "/mnt/sdcard/entrega/salida/" + ruta + "_" + arch + "_" + llavefecha + ".txt";
		var path2 = "/mnt/sdcard/external_sd/SER/salida/" + llavefecha + "/" + ruta + "_" + arch + "_" + iniciaGrabado + ".txt";

		var temp2;

		var tmp;

		var writer = new FileWriter(path);
		var writer2 = new FileWriter(path2);

		var sb = new StringBuilder();

		for( i = 0; i < cont.length; i++) {

			if(i == cont.length - 1) {

				if(arch == "pedidos" || arch == "devoluciones" || arch == "cambios" || arch == "facturas") {
					tmp = (cont[i].toString());
					sb.append(tmp.replace(/\,/gi, "|"));
				} else {
					sb.append(cont[i]);
				}

			} else {
				if(arch == "pedidos" || arch == "devoluciones" || arch == "cambios" || arch == "facturas") {
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
		writer.write(temp2, false);

	}
}

// load csv este lo baja de un servidor aqui tenemos que dirigrlo a un archivo
// en el sd

function leetmp(archivo) {  
	try {
		var reqServer;
		var errMessage;
		var csvtext;
		var ubicacion;
		reqServer = "file:///mnt/sdcard/entrega/tmp/" + archivo + ".txt";
		var request = new XMLHttpRequest();
		request.open("GET", reqServer, false);
		request.send();
		csvtext = request.responseText;
	} catch (ex) {
		//return null;
		alert("Archivo: "+archivo+"  Error: "+ex.message);
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

function getcsv(archivo) {
	try {
		var reqServer;
		var errMessage;
		var csvtext;
		var ubicacion;
		var plataforma = navigator.platform;
		if(plataforma.search("nux") != -1) {
			ubicacion = local;
		} else {
			ubicacion = servidor;
		}
		reqServer = ubicacion + archivo;
		var request = new XMLHttpRequest();
		request.open("GET", reqServer, false);
		request.send();
		csvtext = request.responseText;
	} catch (ex) {
		alert("Failed to get data from the server. Please check your data connection and try again. Error Code : " + ex);
		return null;
	}

	if(csvtext.length == 0) {
		return new Array();
	} else {
		return csvtext.split("\n");
	}

}

function grabatmp(archivo, cont) {
	var path = "/mnt/sdcard/entrega/tmp/" + archivo + ".txt";
	var temp2;
	var writer2 = new FileWriter("/mnt/sdcard/external_sd/SER/tmp/" + archivo + ".txt");
	var writer = new FileWriter(path);
	temp2 = JSON.stringify(cont);
	writer.write(temp2, false);
	//localStorage.setItem(archivo,temp2);
	writer2.write(temp2, false);
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
}
// handleCsv

String.prototype.splitCSV = function(sep) {
	for(var foo = this.split( sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
		if(foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
			if(( tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
				foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
			} else if(x) {
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

	$.mobile.changePage("#page5");
}

function kInicial() {
	generarFecha();
	fecha = curr_date + "/" + curr_month + "/" + curr_year;
	llavefecha = curr_year + "" + curr_month + "" + curr_date;
	temp = $('#kinicial').val();
	kilometraje = aNumero(temp);
	if(kilometraje == 0) {
		window.alert("Debe ingresar\nun kilometraje válido")
	} else {
		if(kilometrajei == 0) {
			cargaprecioEnvases();
			// //console.log(precioenvases);
			ruta = getcsv("ruta.txt")[0];
			kilometrajei = kilometraje;
			x = document.getElementsByClassName("encabezado");
			$(x).html(dias[diaTrabajo]);
			$('#kinicial').val("");
			bajaClientes();
			$("#numeroderuta").html(ruta);
		} else {
			alert("No puede volver a ingresar kilometraje");
			$.mobile.changePage("#page1");
		}
	}
}

function cargaprecioEnvases() {
	tmp = getcsv("precioenvases.txt");
	for( i = 0; i < tmp.length; i++) {
		linea = tmp[i].split("|");
		precioenvases.push(linea[1]);
		//console.log(linea[1]);
	}

}

function calculatotalventas(modo) {
	var temp = 0;
	for( i = 0; i < facturas.length; i++) {
		linea = facturas[i][1].split("|");
		switch(Number(modo)) {
			case 1:
				if(facturas[i][0][6] != "1D") {
					temp = Number(temp) + Number(linea[4]);
				}
				break;
			case 2:
				if(facturas[i][0][6] == "1D") {
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

	for( i = 0; i < abonosRealizados.length; i++) {
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
	if(kFinal != 0) {
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
		var tmptotalAbonos = calculatotaldepositos();

		var codigotabla = "<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n"
		codigotabla += "<tr><th width=\"85%\">Concepto</th><th width=\"15%\">Cantidad</th>";
		codigotabla += "</tr><tr><td>Negocios visitados</td><td>" + visitados + "</td>";
		codigotabla += "</tr><tr><td>Negocios efectivos</td><td>" + efectivos + "</td>";
		codigotabla += "</tr><tr><td>No venta</td><td>" + noventas + "</td></tr>";
		codigotabla += "<tr><td>Monto ventas producto</td><td align=\"right\">C$" + totalventasProd + "</td></tr>";
		codigotabla += "<tr><td>Monto ventas envases</td><td align=\"right\">C$" + totalventasEnv + "</td></tr>";
		codigotabla += "<tr><td>Kilometraje recorrido</td><td>" + kmrecorrido + "Km</td></tr>";
		codigotabla += "</table></small><br>";

		$('#tblfindia').html(codigotabla);
		linea += fechasistema() + "|" + ruta + "|" + visitados + "|" + efectivos + "|" + noventas + "|" + totalventasProd + "|" + tmptotalAbonos[1] + "|" + tmptotalAbonos[0] + "|" + kilometrajei + "|" + kFinal + "|" + kmrecorrido;
		finaldia.push(linea);
		grabartodo();
		cantArchEnviados = 0;
		errorEnvio = 0;
		intentosEnvio = 0;

		finalizaTodo();
		persistenciaSistema();

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

	for( i = 0; i < devolucionenvasesRuta.length; i++) {
		var dev = devolucionenvasesRuta[i].split("|");
		if(dev[6] == 0) {
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
	$('#encabezado').html(dias[diaTrabajo]);
	persistenciaSistema();
	verClientes();
}

function bajaClientes() {
	navigator.notification.activityStart("Cargando Datos", "Por favor espere...");
	localStorage.setItem("Estado", "Corriendo");
	listaclientes = getcsv("clientes.txt");
	bancos = getcsv("bancos.txt");
	docspendientes = getcsv("docspendientes.txt");
	productos = getcsv("productos.txt");
	inventario = getcsv("cargainicial.txt");
	devolucionenvases = getcsv("devolucionenvases.txt");
	correlativo = Number(getcsv("correlativo.txt")[0]);
	correlativoabono = Number(getcsv("correlativoabono.txt")[0]);
	leebancos();
	leetipocambio();
	leepedidos();
	leedevoluciones();
	leecambios();
	$("#btnIniciodia").addClass('ui-disabled');
	navigator.notification.activityStop();
	

	persistenciaInicial();
    persistenciaSistema();
    verClientes();
}

function borraDirectorios() {
	if(localStorage.getItem("Directorios") == "creados") {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, BorrarDirectorios, null);

		function BorrarDirectorios(fileSystem) {
			var entry = fileSystem.root;
			entry.getDirectory("entrega", {
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

function borraDirectorios2() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, BorrarDirectorios, null);

	function BorrarDirectorios(fileSystem) {
		var entry = fileSystem.root;

		entry.getDirectory("entrega", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("external_sd/SER", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("external_sd", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Android", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Bluetooth", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Download", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("download", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("preventa", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("autoventa", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("DCIM", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Image", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Music", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("Video", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("sdcard", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("external_sd", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("/mnt", {
			create : false,
			exclusive : false
		}, success, fail);

		entry.getDirectory("bluetooth", {
			create : false,
			exclusive : false
		}, success, fail);

		function success(carpeta) {
			carpeta.removeRecursively(success, fail);

			function success(parent) {
				console.log("borrado" + carpeta);
			}

			function fail(error) {
				console.log("fallo borrar" + error);
			}

		}

		function fail(error) {
			console.log("fallo carpeta" + error);
		}


		localStorage.setItem("Directorios", "creados");

	}

}

function preparaDirectorios() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, CrearDirectorios, CrearDirectorios);
	var tmpFecha = curr_year + "" + curr_month + "" + curr_date;

	function CrearDirectorios(fileSystem) {
		var entry = fileSystem.root;
		if(localStorage.getItem("Directorios") != "creados") {

			entry.getDirectory("entrega", {
				create : true,
				exclusive : false
			}, directorioNoexiste, directorioNoexiste);

			function directorioNoexiste(dir) {
				entry.getDirectory("entrega", {
					create : true,
					exclusive : false
				}, onGetDirectorySuccess, onGetDirectoryFail);

				entry.getDirectory("entrega/tmp", {
					create : true,
					exclusive : false
				}, onGetDirectorySuccess, onGetDirectoryFail);

				entry.getDirectory("entrega/salida", {
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

				entry.getDirectory("external_sd/SER/salida/" + tmpFecha, {
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
        recuperaDatos();

        
        recuperarSistema = false;
        
    } else {
        preparaDirectorios();
        console.log("Todo bien");
    }
}

function leebancos() {
	var codigoselec = "";
	for( i = 0; i < bancos.length; i++) {
		tmpbco = bancos[i].split("|");
		codigoselec += "<option value=\"" + tmpbco[0] + "\">" + tmpbco[1] + "</option>";
	}
	$("#selecBanco").html(codigoselec);
}

function leetipocambio() {
	tipoCambio = Number(getcsv("tipocambio.txt"));
	$("#contieneTC").html("TC:" + tipoCambio);
}

function leepedidos() {
	var arregtmp = getcsv("pedidos.txt");
	for( i = 0; i < arregtmp.length; i++) {
		tmp1 = arregtmp[i].split("|");
		tmp2 = tmp1.splice(0, 8);
		tmp3 = tmp1.join("|");
		tmppedido = new Array(tmp2, tmp3);
		//console.log(tmppedido);
		pedidos.push(tmppedido);
	}

}

function leedevoluciones() {
	var arregtmp = getcsv("devoluciones.txt");
	if(arregtmp.length != 0) {
		for( i = 0; i < arregtmp.length; i++) {
			tmp1 = arregtmp[i].split("|");
			tmp2 = tmp1.splice(0, 8);
			tmp3 = tmp1.join("|");
			tmpdev = new Array(tmp2, tmp3);
			//console.log(tmpdev);
			devoluciones.push(tmpdev);
		}
	} else {
		cambios = new Array();
	}

}

function leecambios() {
	var arregtmp = getcsv("cambios.txt");
	if(arregtmp.length != 0) {
		for( i = 0; i < arregtmp.length; i++) {
			tmp1 = arregtmp[i].split("|");
			tmp2 = tmp1.splice(0, 8);
			tmp3 = tmp1.join("|");
			tmpdev = new Array(tmp2, tmp3);
			//console.log(tmpdev);
			cambios.push(tmpdev);
		}
	} else {
		cambios = new Array();
	}

}

function verClientes() {
	
	var contador = 0;
	var tmp;
	var codigolista = new StringBuilder();
	codigolista.append("<ul data-filter=\"true\" data-filter-placeholder = \"Filtrar clientes\" id=\"lstclientes\" data-inset=\"true\" data-role=\"listview\" data-split-theme=\"a\" data-divider-theme=\"b\" data-split-icon=\"arrow-r\">\n");
	codigolista.append("<li data-role=\"list-divider\" role=\"heading\">Clientes<\/li>\n");

	if(listaclientes.length != 0) {
		for( i = 0; i < listaclientes.length; i++) {
			cliente = listaclientes[i].split("|");
			if(((cliente[20] != diaTrabajo) || (cliente[21] != diaTrabajo) || (cliente[22] != diaTrabajo)) || (cliente[23] == diaTrabajo)) {
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
		
		
		//console.log(tmp);
		
		$('#contienelistaclientes').html(tmp);
		$('#page7').page();
		$('#contienelistaclientes').find('#lstclientes').listview();
		actualizaIconos();
		codigolista = null;
		$.mobile.changePage('#page7');
	}
}

function preparaclientetmp() {
	listaproductos();
	tablapedido();

	for( i = 0; i < datosclientetmp.length; i++) {
		tmp = datosclientetmp[i].split("|");
		if(tmp[0] == clienteenuso) {
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
	$.mobile.changePage('#page4', "reloadPage");
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
	clienteenuso = cliente[0];
	facturaenuso = "";
	
	clienteCorporativo = cliente[24];
	
	
	if(!cliente[17]) {
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
        codigoinfo2.append("<B>Día de visita:</B> " + diasVisita[cliente[17]] + "<br>\n");
        codigoinfo2.append("<B>Secuencia:</B> " + cliente[18] + "<br>\n");
        codigoinfo2.append("<B>Regi\ón de ventas:</B> " + cliente[19] + "<\/small>\n");
        $('#infocliente1').html(codigoinfo1.toString());
        $('#infocliente2').html(codigoinfo2.toString());
        listaproductos();
        $('#cantDocsCliente').html(cuentaDocsCliente());
        $('#cantcambiosCliente').html(cuentacambCliente());
        $('#page6').page();
        $('#pedidoEncabezado').html("");
        tablapedido();
        $.mobile.changePage('#page6');
        // persistenciaSistema();
		
		 obtenerSaldoActual();
	}
}

/*
 * Cuenta los documentos pendientes del cliente en uso
 */
 function cuentaDocsCliente() {

	var contador = 0;


	if(docspendientes.length != 0) {
		for( i = 0; i < docspendientes.length; i++) {
			docto = docspendientes[i].split("|");
			if(docto[1] == clienteenuso && docto[4] > 0) {
				contador++;

			}


		}
	}
	
	
	return contador;
}

function cuentacambCliente() {
	var respuesta = "No";
	if(cambios.length != 0) {
		for( i = 0; i < cambios.length; i++) {
			if(cambios[i][0][0] == clienteenuso) {
				respuesta = "Si";
				break;
			}
		}
	}
	return respuesta;
}

function escondeTodo(lista) {
	x = document.getElementsByClassName(lista);
	for( i = 0; i <= x.length; i++) {
		$(x[i]).trigger('collapse')
	}
}

function actualizaDocpendientes(tmpclienteenuso, tmpfacturaenuso, tmpsaldofacturaenuso, tmp) {
	for(var jj = 0; jj < docspendientes.length; jj++) {
		var tmpdocpend = docspendientes[jj].split("|");
		if(tmpdocpend[1] == tmpclienteenuso && tmpdocpend[0] == tmpfacturaenuso) {
			var nuevosaldodoc = Number(tmpsaldofacturaenuso - tmp).toFixed(2);
			var nuevalinea = tmpdocpend[0] + "|" + tmpdocpend[1] + "|" + tmpdocpend[2] + "|" + tmpdocpend[3] + "|" + nuevosaldodoc + "|"+ tmpdocpend[5];
			docspendientes.splice(jj, 1);
			docspendientes.unshift(nuevalinea);			
			break;
		}

	}

}

function marcaDocpagados() {
	for(var zz = 0; zz < docspendientes.length; zz++) {
		var tmpdocpend = docspendientes[zz].split("|");
		if(tmpdocpend[4] == 0) {
			var infocliente = buscadatosCliente(tmpdocpend[1]);
			if(infocliente[2] == "CONTADO") {
				cambiarIconoCliente(infocliente[0], "icono-preventa");

			}
		}

	}

}

function tieneSaldopendiente() {
	var tiene = false;
	console.log(JSON.stringify(docspendientes));
	for(var z = 0; z < docspendientes.length; z++) {
		var tmpdocpend = docspendientes[z].split("|");
		console.log(tmpdocpend);
		if(tmpdocpend[4] >= 1) {
			var infocliente = buscadatosCliente(tmpdocpend[1]);
			if(infocliente[2] == "CONTADO") {
				tiene = true;
				break;
			}
		}

	}
	return tiene;
}

function marcaDocpendientes() {
	marcaDocpagados();
	for(var z = 0; z < docspendientes.length; z++) {
		var tmpdocpend = docspendientes[z].split("|");
		if(tmpdocpend[4] > 0) {
			var infocliente = buscadatosCliente(tmpdocpend[1]);
			if(infocliente[2] == "CONTADO") {
				cambiarIconoCliente(infocliente[0], "icono-no-pago");

			}
		}

	}

}

function cargadocscliente(cliente) {
    facturaenuso = "";
    var contador = 0;
    $('#abonoEncabezado').html("Factura:<br>Monto:<br>Saldo:<br>Fecha:");
    var codigolista = "<ul  data-filter=\"true\" data-filter-placeholder=\"Filtrar Documentos\" id=\"docsclientes\" data-inset=\"true\" data-role=\"listview\" data-split-theme=\"a\" data-divider-theme=\"b\" data-split-icon=\"arrow-r\">" + "\n";
    codigolista = codigolista + "<li data-role=\"list-divider\" role=\"heading\">Documentos Pendientes<\/li>" + "\n";

	var granTotal = 0;
	var contadoActivo = 0;
	
	var estiloVencido = "";

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
                codigolista = codigolista + "<a href=\"#\" > <h5> <span "+estiloVencido+" >" + docto[0] + "<\/span><\/h5>" + "\n";
                codigolista = codigolista + "<p><strong>Fecha: " + docto[2].substring(6)+"/"+docto[2].substring(4,6)+"/"+docto[2].substring(0,4) 
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
    
    $("#btnImprimirPago").hide();
    
    $.mobile.changePage('#page12');
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
	
	/*Quitar esto*/
	$('#tipoAbono').val("5");
	$('#selecBanco').val("1");
	$('#montoAbono').val(Number(docto[4]));
	$('#refAbono').val("000661160");
	
	/**/
	
	$('#abonoEncabezado').html(texto);
	$('#page12').page();

	


 $("#btnImprimirPago").hide();

	tablaAbonos();


	$.mobile.changePage('#page12');

}

function listaproductos() {
	codigolista = "<ul data-filter=\"true\" data-filter-placeholder=\"Filtrar productos\" data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";
	codigolistafdc = codigolista;
	codigolistarp = codigolista;
	codigolistaae = codigolista;
	codigolistavk = codigolista;
	codigolistaenv = codigolista;
	codigolistaotros = codigolista;

	for( i = 0; i < productos.length; i++) {
		producto = productos[i].split("|");

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
			codigolistafdc += "<li data-theme=\"c\">\n";
			codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistafdc += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistafdc += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
			codigolistarp += "<li data-theme=\"c\">\n";
			codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistarp += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistarp += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
			codigolistaae += "<li data-theme=\"c\">\n";
			codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaae += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistaae += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
			codigolistavk += "<li data-theme=\"c\">\n";
			codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistavk += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistavk += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
			codigolistaenv += "<li data-theme=\"c\">\n";
			codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaenv += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistaenv += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
			codigolistaotros += "<li data-theme=\"c\">\n";
			codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaotros += "<a onClick=\"encabezadoPedido(" + i + ");\"><\/a>";
			codigolistaotros += "<\/li>\n"
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
	codigolista = "<ul data-filter=\"true\"  data-filter-placeholder=\"Filtrar productos\"  data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";
	codigolistafdc = codigolista;
	codigolistarp = codigolista;
	codigolistaae = codigolista;
	codigolistavk = codigolista;
	codigolistaenv = codigolista;
	codigolistaotros = codigolista;

	for( i = 0; i < productos.length; i++) {
		producto = productos[i].split("|");

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
			codigolistafdc += "<li data-theme=\"c\">\n";
			codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistafdc += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistafdc += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
			codigolistarp += "<li data-theme=\"c\">\n";
			codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistarp += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistarp += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
			codigolistaae += "<li data-theme=\"c\">\n";
			codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaae += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistaae += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
			codigolistavk += "<li data-theme=\"c\">\n";
			codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistavk += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistavk += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
			codigolistaenv += "<li data-theme=\"c\">\n";
			codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaenv += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistaenv += "<\/li>\n"
		}

		if(producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
			codigolistaotros += "<li data-theme=\"c\">\n";
			codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
			codigolistaotros += "<a onClick=\"encabezadoCambios(" + i + ");\"><\/a>";
			codigolistaotros += "<\/li>\n"
		}

	}
	codigolistafdc += "<\/ul>\n";
	codigolistarp += "<\/ul>\n";
	codigolistaae += "<\/ul>\n";
	codigolistavk += "<\/ul>\n";
	codigolistaenv += "<\/ul>\n";
	codigolistaotros += "<\/ul>\n";
	codigolistafdc += "<\/ul>\n"
	codigolistarp += "<\/ul>\n"
	codigolistaae += "<\/ul>\n"
	codigolistavk += "<\/ul>\n"
	codigolistaenv += "<\/ul>\n"
	codigolistaotros += "<\/ul>\n"

	$('#listafdccambio').html(codigolistafdc);
	$('#listarpcambio').html(codigolistarp);
	$('#listaaecambio').html(codigolistaae);
	$('#listavkcambio').html(codigolistavk);
	$('#listaenvcambio').html(codigolistaenv);
	$('#listaotroscambio').html(codigolistaotros);

	$('#page18').page();

	$('#listafdccambio').find(":jqmData(role=listview)").listview();
	$('#listarpcambio').find(":jqmData(role=listview)").listview();
	$('#listaaecambio').find(":jqmData(role=listview)").listview();
	$('#listavkcambio').find(":jqmData(role=listview)").listview();
	$('#listaenvcambio').find(":jqmData(role=listview)").listview();
	$('#listaotroscambio').find(":jqmData(role=listview)").listview();
	tablacambios();
	window.location = "#page18";
}

function listaproductosDevoluciones() {
	if(facturaenuso != "") {
		texto = "<p>Factura:" + facturaenuso + "<br>";
		texto += "Código: <br>";
		texto += "Descripción: <\/p>";

		$('#devolucionEncabezado').html(texto);
		codigolista = "<ul data-filter=\"true\" data-filter-placeholder=\"Filtrar productos\"data-inset=\"false\" data-role=\"listview\" data-theme=\"c\" data-divider-theme=\"b\">\n";
		codigolistafdc = codigolista;
		codigolistarp = codigolista;
		codigolistaae = codigolista;
		codigolistavk = codigolista;
		codigolistaenv = codigolista;
		codigolistaotros = codigolista;

		for( i = 0; i < productos.length; i++) {
			producto = productos[i].split("|");

			if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "FH" || producto[6].toUpperCase() == "FK" || producto[6].toUpperCase() == "FM" || producto[6].toUpperCase() == "FA" || producto[6].toUpperCase() == "FDC")) {
				codigolistafdc += "<li data-theme=\"c\">\n";
				codigolistafdc += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistafdc += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistafdc += "<\/li>\n"
			}

			if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "RP" || producto[6].toUpperCase() == "PE" || producto[6].toUpperCase() == "PA" || producto[6].toUpperCase() == "PL" || producto[6].toUpperCase() == "PO")) {
				codigolistarp += "<li data-theme=\"c\">\n";
				codigolistarp += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistarp += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistarp += "<\/li>\n"
			}

			if(producto[0] == clienteCorporativo && (producto[6].toUpperCase() == "AA" || producto[6].toUpperCase() == "AC")) {
				codigolistaae += "<li data-theme=\"c\">\n";
				codigolistaae += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistaae += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistaae += "<\/li>\n"
			}

			if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "FV") {
				codigolistavk += "<li data-theme=\"c\">\n";
				codigolistavk += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistavk += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistavk += "<\/li>\n"
			}

			if(producto[0] == clienteCorporativo && producto[6].toUpperCase() == "1D") {
				codigolistaenv += "<li data-theme=\"c\">\n";
				codigolistaenv += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistaenv += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistaenv += "<\/li>\n"
			}

			if(producto[0] == clienteCorporativo /*&& producto[6].toUpperCase() == "HA"*/) {
				codigolistaotros += "<li data-theme=\"c\">\n";
				codigolistaotros += "<a href=\"#\" style=\"white-space:pre-wrap;width:70%\">" + producto[1] + "<br>" + producto[2] + "<\/a>\n";
				codigolistaotros += "<a onClick=\"encabezadoDevoluciones(" + i + ");\"><\/a>";
				codigolistaotros += "<\/li>\n"
			}

		}
		codigolistafdc += "<\/ul>\n";
		codigolistarp += "<\/ul>\n";
		codigolistaae += "<\/ul>\n";
		codigolistavk += "<\/ul>\n";
		codigolistaenv += "<\/ul>\n";
		codigolistaotros += "<\/ul>\n";
		codigolistafdc += "<\/ul>\n"
		codigolistarp += "<\/ul>\n"
		codigolistaae += "<\/ul>\n"
		codigolistavk += "<\/ul>\n"
		codigolistaenv += "<\/ul>\n"
		codigolistaotros += "<\/ul>\n"

		$('#listafdcdevolucion').html(codigolistafdc);
		$('#listarpdevolucion').html(codigolistarp);
		$('#listaaedevolucion').html(codigolistaae);
		$('#listavkdevolucion').html(codigolistavk);
		$('#listaenvdevolucion').html(codigolistaenv);
		$('#listaotrosdevolucion').html(codigolistaotros);

		$('#page9').page();

		$('#listafdcdevolucion').find(":jqmData(role=listview)").listview();
		$('#listarpdevolucion').find(":jqmData(role=listview)").listview();
		$('#listaaedevolucion').find(":jqmData(role=listview)").listview();
		$('#listavkdevolucion').find(":jqmData(role=listview)").listview();
		$('#listaenvdevolucion').find(":jqmData(role=listview)").listview();
		$('#listaotrosdevolucion').find(":jqmData(role=listview)").listview();

		tabladevolucion();
		window.location = "#page9";
	} else {
		window.alert("Seleccione una factura");
	}
}

function encabezadoPedido(pos) {
	producto = productos[pos].split("|");
	texto = "Código: " + producto[1] + "<br>";
	texto = texto + "Descripción: " + producto[2];
	productoenuso = producto;

	$('#div-cajas').html("");

	$('#div-cajas').html("<input type=\"number\" data-mini=\"true\" name=\"pedidocajas\" id=\"pedidocajas\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");

	$('#div-unidades').html("");

	$('#div-unidades').html("<input type=\"number\" data-mini=\"true\" name=\"pedidounidades\" id=\"pedidounidades\" value=\"\" class=\"ui-input-text ui-body-b ui-corner-all ui-shadow-inset ui-mini\" />");
	$('#pedidocajas').focus();

	// $('#pedidocajas').val("");

	//$('#pedidocajas').attr('disabled', false);
	// $('#pedidocajas').focus();

	// $('#pedidounidades').val("");

	//$('#pedidounidades').attr('disabled', false);
	$('#pedidoEncabezado').html(texto);
	$.mobile.changePage("#page4");

}

function encabezadoCambios(pos) {
	producto = productos[pos].split("|");
	texto = "Código: " + producto[1] + "<br>";
	texto = texto + "Descripción: " + producto[2];
	productoenuso = producto;
	$('#cambiocajas').val("");
	$('#cambiocajas').focus();
	$('#cambiounidades').val("");
	$('#cambiomotivo').val("0");
	$('#cambioEncabezado').html(texto);
}

function encabezadoDevoluciones(pos) {
	producto = productos[pos].split("|");
	texto = "Factura:" + facturaenuso + "<br>";
	texto += "Código: " + producto[1] + "<br>";
	texto += "Descripción: " + producto[2];
	productoenuso = producto;
	$('#devolucioncajas').val("");
	$('#devolucioncajas').focus();
	$('#devolucionunidades').val("");
	$('#devolucionEncabezado').html(texto);
}

function grabaLineacambio() {
	cajas = aNumero(Number(document.getElementById("cambiocajas").value));
	unidades = aNumero(Number(document.getElementById("cambiounidades").value));
	if((cajas == 0 && unidades == 0) || (cajas < 0 || unidades < 0)) {
		window.alert("Validar cantidades");
	} else {
		total = ((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[4]);
		motivoCambio = document.getElementById("cambiomotivo").value;
		$('#cambiocajas').val("");
		$('#cambiounidades').val("");
		$('#cambiomotivo').val("0");
		if(numcambio == "") {
			numcambio = ruta + "-" + clienteenuso + "-" + fechasistema();
		}
		totalunidades = (Number(cajas) * productoenuso[3]) + Number(unidades);
		lineacambios = cajas + "|" + unidades + "|" + totalunidades + "|" + motivoCambio + "|" + fechasistema() + "|" + numcambio;
		
		
		//temp = new Array(productoenuso, lineacambios);
		
		
		   var productoPedido = productoenuso;
        	productoPedido[0] = clienteenuso;
        	temp = new Array(productoPedido, lineacambios);
            
            
            cambios.push(temp);
		
		tablacambios();
	}

}

function grabaLineadevoluciones() {
	cajas = aNumero(Number(document.getElementById("devolucioncajas").value));
	unidades = aNumero(Number(document.getElementById("devolucionunidades").value));

	if((cajas == 0 && unidades == 0) || (cajas < 0 || unidades < 0)) {

		window.alert("Validar cantidades");

	} else {
		total = ((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[4]);
		$('#devolucioncajas').val("");
		$('#devolucionunidades').val("");
		if(numdevolucion == "") {
			numdevolucion = ruta + "-" + clienteenuso + "-" + fechasistema();
		}
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
	cajas = aNumero(Number(document.getElementById("pedidocajas").value));
	unidades = aNumero(Number(document.getElementById("pedidounidades").value));
	if((cajas < 0 || unidades < 0)) {
		
		window.alert("Validar cantidades");
		
	} else if(cajas == 0 && unidades == 0)
	 {
	 	cambiaColorpantalla("b");
	 	tablapedido();
	 	$('#pedidocajas').val("");
		$('#pedidounidades').val("");	
	 	$('#pedidoEncabezado').html(""); 	
	 }else
	 {
		cambiaColorpantalla("b");
		totalunidades = (Number(cajas) * Number(productoenuso[3]));
		totalunidades += Number(unidades);
		total = Number(totalunidades * Number(productoenuso[4])).toFixed(2);
		if(productoenuso[7] == 0) {
			iva = Number(total - (total / 1.15)).toFixed(2);
		} else {
			iva = 0;
		}
		envasespedido = Number(((Number(cajas) * Number(productoenuso[3])) + Number(unidades)) * Number(productoenuso[5])).toFixed(2);
		$('#pedidocajas').val("");
		$('#pedidounidades').val("");
		$('#pedidoEncabezado').html("");
		envasespedidos = envasespedidos + parseFloat(envasespedido);
		totalunidades = (cajas * productoenuso[3]) + Number(unidades);
		lineapedido = cajas + "|" + unidades + "|" + totalunidades + "|" + Number(total - iva) + "|" + total + "|" + iva + "|" + envasespedido + "|" + numpedido;
		
	 /**
         * Asignamos un objeto temporal del Producto para intercambiar el cod cliente en vez del cod Corporativo
         */
        	var productoPedido = productoenuso;
        	productoPedido[0] = clienteenuso;
        	temp = new Array(productoPedido, lineapedido);
            
            
            pedidos.push(temp);
		
		tablapedido();
		
	}
}

function confirmaEntrega() {
	var encontrado = false;
	cambiaColorpantalla("b");
	var temp;
	
		
	if(tieneFacturas("PROD") || tieneFacturas("ENV")  ) {
			
			linea = formatofecha(fechasistema()) + "|" + clienteenuso + "|" + ruta + clienteenuso + fechasistema();
			confirmapedidos.push(linea);
			escondeTodo("listapedidocollapse");
			texto = "Código:<br>";
			texto = texto + "Descripción:";
			$('#pedidoEncabezado').html(texto);
			
			//window.alert("Entrega grabada");
			
			navigator.notification.alert('Entrega fue grabada!!', 
	            null, // callback
	            'Confirmación de Entrega', // title
	            'Continuar' // buttonName
	         ); 
			
			cambiarIconoCliente(clienteenuso, "icono-preventa");
			// $.mobile.changePage('#page7');
			lineaspedido = 0;
			persistenciaSistema();
			$('#cantDocsCliente').html(cuentaDocsCliente());
			marcaDocpendientes();
			cargadocscliente(clienteenuso);
			
		}else
		{
			navigator.notification.alert('Debe realizar la facturación antes de confirmarla!!', 
	            null, // callback
	            'Confirmación de Entrega', // title
	            'Continuar' // buttonName
	         );
		}

	
	 marcaDocpendientes();	
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
				codigotabla += "<tr><td align=\"left\"><small>";
				codigotabla += "<u><a onClick=\"modificalineapedido(" + i + ");\"" + pedidos[i][0][1] + "<br>" + pedidos[i][0][2] + "<\/a><\/small><\/u><\/td>";

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
    //alert(clienteActual)
    
   obtenerSaldoActual();
    
   if(clienteActual[2] != 'CONTADO')
	 {
	 	//alert("Saldo en Uso:"+saldoEnUso+ " Deduda: "+dettotal);
	    if( (saldoEnUso - dettotal) < 0)
	    {
	    	//alert("Saldo Excede el Limite de Credito!! (Producto) "+(saldoEnUso - dettotal));
	    	limiteExcedido = 1;
	    }else{
	    	//alert("Limite de Credito bien!! (Producto) "+(saldoEnUso - dettotal));
	    	limiteExcedido = 0;
	    }
	    
	    
	    if( (saldoEnUso - envdettotal) < 0)
	    {
	    	//alert("Saldo Excede el Limite de Credito!! (envase)"+(saldoEnUso - envdettotal));
	    	limiteExcedidoEnv = 1;
	    }else{
	    	//alert("Limite de Credito bien!! (envase) "+(saldoEnUso - envdettotal));
	    	limiteExcedidoEnv = 0;
	    }
    }else
    {
    	limiteExcedido = 0;
    	limiteExcedidoEnv = 0;
    }
    
    //Desbloqueamos el limite de credito para Cuentas Clave
	//limiteExcedido = 0;
	//limiteExcedidoEnv = 0;

}

function tablacambios() {
	codigotabla = "<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n";
	codigotabla += "<tr>\n";
	codigotabla += "<th width=\"50%\" align=\"left\"><small>Producto</small><\/th>\n";
	codigotabla += "<th width=\"10%\">Cj<\/th>\n";
	codigotabla += "<th width=\"15%\">Un<\/th>\n";
	codigotabla += "<th width=\"10%\">Motivo<\/th>\n";
	codigotabla += "<\/tr>\n";

	for( i = 0; i < cambios.length; i++) {
		lineacambio = cambios[i][1].split("|");
		if(cambios[i][0][0] == clienteenuso) {
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

	for( i = 0; i < devoluciones.length; i++) {
		lineadevolucion = devoluciones[i][1].split("|");
		if(devoluciones[i][0][0] == clienteenuso) {
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

function cambiaColorpantalla(theme) {
	$.mobile.activePage.find('.ui-btn').removeClass('ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e').addClass('ui-btn-up-' + theme).attr('data-theme', theme);

	// $.mobile.activePage.find('.ui-header, .ui-footer')
	//                    .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
	//                    .addClass('ui-bar-' + theme)
	//                    .attr('data-theme', theme);

	$.mobile.activePage.removeClass('ui-body-b ui-body-c ui-body-d ui-body-e').addClass('ui-body-' + theme).attr('data-theme', theme);
}

function modificalineapedido(pos) {
	var linea = pedidos[pos][1].split("|");
	var yaFacturo = false;
	productoenuso = pedidos[pos][0];

	if(productoenuso[6] == "1D") {
		yaFacturo = tieneFacturas("ENV");
	} else {
		yaFacturo = tieneFacturas("PROD");
	}

	if(yaFacturo) {
		window.alert("Factura ya fue impresa no puede modificar el pedido!");
	} else {
		numpedido = linea[7];
		tmpconteo = pedidos[pos][0][3];
		var texto = "<p>C\ódigo: " + productoenuso[1] + "<br>";
		texto = texto + "Descripci\ón: " + productoenuso[2] + "<\/p>";
		$('#pedidoEncabezado').html(texto);

		$('#div-cajas').html("");
		$('#div-cajas').html(" <input type=\"text\" data-role=\"spinbox\" name=\"pedidocajas\" id=\"pedidocajas\" value=\"" + linea[0] + "\" min=\"0\" max=\"" + linea[0] + "\"  initmax=\"" + linea[0] + "\"  cantunid=\"" + tmpconteo + "\" readonly=\"readonly\" />");
		$('#pedidocajas').spinbox();

		$('#div-unidades').html("");
		$('#div-unidades').html("<input type=\"text\" data-role=\"spinbox\" name=\"pedidounidades\" id=\"pedidounidades\" value=\"" + linea[1] + "\" min=\"0\" max=\"" + linea[1] + "\" initmax=\"" + linea[1] + "\"  cantunid=\"" + tmpconteo + "\" readonly=\"readonly\" />");
		$('#pedidounidades').spinbox();

		cambiaColorpantalla("e");
		pedidos.splice(pos, 1);
		tablapedido();
		$("#page4").page();
		window.location = "#page4";
	}
}

function modificalineacambio(pos) {
	/*var linea = cambios[pos][1].split("|");
	productoenuso = cambios[pos][0];
	numcambio = linea[5];
	texto = "<p>C\ódigo: " + productoenuso[1] + "<br>";
	texto = texto + "Descripci\ón: " + productoenuso[2] + "<\/p>";
	$('#cambioEncabezado').html(texto);

	$('#cambioCajasspin').html("");
	$('#cambioCajasspin').html(" <input type=\"text\" data-role=\"spinbox\" name=\"cambiocajas\" id=\"cambiocajas\" value=\"" + linea[0] + "\" min=\"0\" max=\"" + linea[0] + "\"  initmax=\"" + linea[0] + "\"  cantunid=\"" + tmpconteo + "\" readonly=\"readonly\" />");
	$('#cambiocajas').spinbox();

	$('#cambioUnidadesspin').html("");
	$('#cambioUnidadesspin').html("<input type=\"text\" data-role=\"spinbox\" name=\"cambiounidades\" id=\"cambiounidades\" value=\"" + linea[1] + "\" min=\"0\" max=\"" + linea[1] + "\" initmax=\"" + linea[1] + "\"  cantunid=\"" + tmpconteo + "\" readonly=\"readonly\" />");
	$('#pedidounidades').spinbox();
	$('#cambiomotivo').val(linea[3]);
	cambios.splice(pos, 1);
	tablacambios();
	window.location = "#page18";*/
	
	
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
	for( i = 0; i < motivosnoventa.length; i++) {
		temp = motivosnoventa[i].split("|");
		if(temp[1] == clienteenuso) {
			encontrado = true;
			window.alert("Ya fue ingresado un\nmotivo de no venta");
			break;
		}
	}

	if(!encontrado) {
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
	for( i = 0; i < motivosnoventa.length; i++) {
		temp = motivosnoventa[i].split("|");
		if(temp[1] == clienteenuso) {
			motivosnoventa.splice(i, 1);
			encontrado = true;
			window.alert("Motivo eliminado");
			document.location = "#page6";
			persistenciaSistema();
			break;
		}
	}
	if(!encontrado) {
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
	if((familia == 1 || familia == 0) && (isFinite(cant200) && isFinite(cant375) && isFinite(cant750) && isFinite(cant1000) && isFinite(cant1750))) {
		var devueltos = Number(cant200 * precioenvases[0]) + Number(cant375 * precioenvases[1]) + Number(cant750 * precioenvases[2]) + Number(cant1000 * precioenvases[3]) + Number(cant1750 * precioenvases[4]);
		var linea = clienteenuso + "|" + Number(cant200) + "|" + Number(cant375) + "|" + Number(cant750) + "|" + Number(cant1000) + "|" + Number(cant1750) + "|" + familia + "|" + Number(devueltos).toFixed(2) + "|" + fechasistema() + "|" + ruta + "-" + clienteenuso + "-" + fechasistema();
		temp1 = linea.split("|");
		var encontrado = false;
		for( i = 0; i < devolucionenvases.length; i++) {
			temp = devolucionenvases[i].split("|");
			if((temp1[0] == temp[0] && temp1[6] == temp[6])) {
				encontrado = true;
				break;
			}
		}
		if(encontrado) {
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
	for(var z = 0; z < devolucionenvases.length; z++) {
		dev = devolucionenvases[z].split("|");
		if(dev[0] == clienteenuso) {
			sumaenvases += Number(dev[7]);
		}
	}
	return sumaenvases;
}

function pagDevEnvases() {
	tabladevEnvases();
	$.mobile.changePage('#page3', "reloadPage");
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

	for( i = 0; i < devolucionenvases.length; i++) {
		dev = devolucionenvases[i].split("|");
		if(dev[0] == clienteenuso) {
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
	if(isNaN(Number(temporal) / 1)) {
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
	//marcaDocpendientes();
	for( i = 0; i < motivosnoventa.length; i++) {
		temp1 = motivosnoventa[i].split("|");
		cambiarIconoCliente(temp1[1], "icono-no-venta");
	}

	for( i = 0; i < confirmapedidos.length; i++) {
		temp2 = confirmapedidos[i].split("|");
		cambiarIconoCliente(temp2[1], "icono-preventa");
	}
	marcaDocpendientes()
	$('#page7').page();
}

/**
 * No imprimia los cambios y no realizaba la resta del mismo
 */

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

/**
 * Actualizado: 07-01-2014
 * @autor: CGarcia
 * Comentarios: * Cambios para habilitar bloqueo de facturacion excedida.
 */
function facturaProducto() {
    var completadescarga = true;
    
    if (!tieneFacturas("PROD")) {
       //Verificamos Limite de credito para poder Facturar      
	     //Para no tomar en cuenta limite de credito
	     //limiteExcedido = 0;
	      if(limiteExcedido == 0)
	       { //Aqui ira codigo cuando no este excedido el limite
		        for ( i = 0; i < pedidos.length; i++) {
		            lineapedido = pedidos[i][1].split("|");
		            if (pedidos[i][0][0] == clienteenuso) {
		                if (pedidos[i][0][6] != "1D") {
		
						console.log("Linea Pedido: "+lineapedido);
		
		
		                    if (!confirmaInventario(pedidos[i][0][1], lineapedido[2])) {
		                        completadescarga = false;
		                        //window.alert("No puede continuar con la facturación, valide cantidades o productos!");
		                        navigator.notification.alert('No puede continuar con la facturación, valide cantidades o productos!', 
					            null, // callback
					            'ERROR', // title
					            'Aceptar' // buttonName
					            );
					            
		                        break;
		                    }
		
		                }
		
		            }
		
		        }	
		        if (completadescarga) {
		            facturalineas();
		        } 
	   
	    
		    }//Fin Limite Excedido
		     else
		     {
			      navigator.notification.alert('Esta factura excede el crédito disponible.\nSaldo Actual: C$'+formatoDinero(saldoEnUso), 
				   null, // callback
				   'Crédito Excedido', // title
				   'Aceptar' // buttonName
				   );  
		       	
		       }
	//FIN IF Posee Factura
	 } else {
        //window.alert("Este cliente ya posee factura de producto!");
        navigator.notification.alert('Este cliente ya posee factura de producto!', 
	            null, // callback
	            'Reimpresión', // title
	            'Aceptar' // buttonName
	            );
	            
        reimprimeFactura("PROD", "REIMPRESION");
    }

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

	if(hora.length == 1) {
		hora = "0" + hora;
	}
	if(minutos.length == 1) {
		minutos = "0" + minutos;
	}
	if(dia.length == 1) {
		dia = "0" + dia;
	}
	if(mes.length == 1) {
		mes = "0" + mes;
	}

	var stamp = anio + mes + dia + hora + minutos;
	return stamp;
}

function horasistema() {
	var facfecha = new Date();
	var hora = (facfecha.getHours()).toString();
	var minutos = (facfecha.getMinutes()).toString();
	if(hora.length == 1) {
		hora = "0" + hora;
	}
	if(minutos.length == 1) {
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
	for( j = 0; j < productos.length; j++) {
		lineaprod = productos[j].split("|");
		if(lineaprod[0] == codigoCliente && lineaprod[1] == codigoProd) {
			return lineaprod;
			break;
		}
	}
}

/**
 * ACtualizado para que tome en cuenta los clientes con Cobro
 */
function buscadatosCliente(codigoCliente) {
	var datoscliente = new Array();
	for(var j = 0; j < listaclientes.length; j++) {
		var tmpcliente = listaclientes[j].split("|");
		if(tmpcliente[0] == codigoCliente) {
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
	if(numero.length == 1) {
		tmp += "0000" + numero;
	}
	if(numero.length == 2) {
		tmp += "000" + numero;
	}
	if(numero.length == 3) {
		tmp += "00" + numero;
	}
	if(numero.length == 4) {
		tmp += "0" + numero;
	}
	if(numero.length == 5) {
		tmp += numero;
	}
	if(numero.length > 5) {
		tmp += numero;
	}
	return tmp;
}

function imprimeCambio() {
	var numcambio = "";
	var hora = horasistema();
	var posicion;

	var cambioDetalle = new Array();

	for(var z = 0; z < cambios.length; z++) {
		posicion = z;
		lineacambio = cambios[z][1].split("|");
		productoenuso = cambios[z][0];
		numcambio = lineacambio[5];
		if(productoenuso[0] == clienteenuso) {
			cambiosRuta.push(cambios[z]);
			cambioDetalle.push([productoenuso[1], productoenuso[2], lineacambio[0], lineacambio[1], null, null, motivosCambios[lineacambio[3]]]);

		}

	}

	var factDatosCliente = buscadatosCliente(clienteenuso);
	docsimpresos.push(ruta + "|CAMBIO|ORIGINAL|" + numcambio + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());

	//se cambia variable  factDatosCliente[0] por clienteenuso
	var imprEncabezadoCambio = ["ORIGINAL", "CAMBIO", clienteenuso, factDatosCliente[3], numcambio, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, null, null, null, null, null, null, null];
	facturasimpresas.push(imprEncabezadoCambio.join("|") + "|CMB");
	dataFacturacion(imprEncabezadoCambio, cambioDetalle, 0);
	//docsimpresos.push(imprEncabezadoCambio.join("|") + "|" + horasistema());

	window.alert("Cambio impreso!");
	persistenciaSistema();

}

function procesaDevolucion() {
	if(!tieneFacturas("DEV")) {
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

	/*Var Encabezado Factura*/
	var factNumPedido;
	var factSubtotal = 0.00;
	var factIva = 0.00;
	var factTotal = 0.00;

	var devolDetalle = new Array();
	var imprEncabezadoDevol = new Array();

	for( j = 0; j < devoluciones.length; j++) {
		posicion = j;
		lineadevolucion = devoluciones[j][1].split("|");
		if(devoluciones[j][0][0] == clienteenuso) {
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
	docsimpresos.push(ruta + "|DEVOLUCION|ORIGINAL|" + numdevolucion + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
		//se cambia variable  factDatosCliente[0] por clienteenuso
	imprEncabezadoDevol = ["ORIGINAL", "DEVOLUCION", clienteenuso, facturaenuso, numdevolucion, factDatosCliente[1], ruta, formatofecha(fecha), formatofecha(fechafacturaenuso), hora, null, null, null, null, null, formatoDinero(montofacturaenuso), formatoDinero(saldofacturaenuso)];
	facturasimpresas.push(imprEncabezadoDevol.join("|") + "|DEV");

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
 */
function facturalineas() {
    var numfactura = "";
    var hora = horasistema();
    var posicion;
    var tmpcorrelativo = creacorrelativo(correlativo);

    /* Var Encabezado Factura */
    var factNumPedido;
    var factSubtotal = 0.00;
    var factIva = 0.00;
    var factTotal = 0.00;

    var factDetalle = new Array();
    var imprEncabezadoFactura = new Array();

	//Movemos esta instruccion
	var factDatosCliente = buscadatosCliente(clienteenuso);

    for ( j = 0; j < pedidos.length; j++) {
        posicion = j;
        lineapedido = pedidos[j][1].split("|");
        if (pedidos[j][0][0] == clienteenuso) {
            if (pedidos[j][0][6] != "1D") {

                if (descargaInventario(pedidos[j][0][1], lineapedido[2])) {
                    numfactura = ruta + "-" + tmpcorrelativo;
                    tmplinea = lineapedido.join("|");
                    tmplinea += "|" + numfactura + "|" + fechasistema() + " " + hora;
                    //Agregamos el tipo de factura a la linea de las facturas
                    tmplinea += "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");
                    
                    sku = pedidos[posicion][0];
                    facturatmp = new Array(sku, tmplinea);
                    
                    //INGRESA LA FACTURA
                    facturas.push(facturatmp);
                    //console.log("fact: "+facturatmp);
                    //alert("fact: "+facturatmp);

                    factNumPedido = (lineapedido[7] != "") ? lineapedido[7] : numpedido;
                    factSubtotal = (Number(factSubtotal) + Number(lineapedido[3])).toFixed(2);
                    factIva = (Number(factIva) + Number(lineapedido[5])).toFixed(2);
                    factTotal = (Number(factIva) + Number(factSubtotal)).toFixed(2);

                   // factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);

					factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], Number(lineapedido[3] / lineapedido[2]).toFixed(4), Number(lineapedido[3]).toFixed(2), null]);

					//console.log("pedido: "+[sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);

                }

            }

        }

    }

      	//Revision 2016-05-01
							/**
								 * Tomamos el valor de la variable imprEncabezadoFactura: factDatosCliente[0] por clienteenuso
							*/


    imprEncabezadoFactura = ["ORIGINAL", "FACTURA", clienteenuso, factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null];
    
    var tmpDocpendiente = "" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + factTotal + "|" + factTotal + "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");

    if (factDetalle.length != 0) {
        docsimpresos.push(ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());

        facturasimpresas.push(imprEncabezadoFactura.join("|") + "|PROD");

        correlativo++;

		//Permite abonarle a una factura del dia.
		docspendientes.unshift(tmpDocpendiente);

        if (factDatosCliente[2] == "CONTADO") {
            
                 navigator.notification.alert('Si no cancela esta factura en su totalidad le será generado un faltante, el monto a cancelar es: C$' + formatoDinero(factTotal), 
						null, // callback
						numfactura, // title
						'Aceptar' // buttonName
						);
            
            
            //Aqui nos damos cuenta que la factura es de contado.
            $("#btnInfoClientePagos").hide();
            pagoBloqueado = 1;
        }

       	 $("#btnAtras").hide();
        
        //..Persistencia
         persistenciaSistema();        
        
        //Imprimimos Factura...
        dataFacturacion(imprEncabezadoFactura, factDetalle, 0);
                
       //Alerta de Facturacion Exitosa
        navigator.notification.alert('Facturado con Exito!', 
						null, // callback
						numfactura, // title
						'Aceptar' // buttonName
						);
        
        //ACtualizamos indicadores.
        marcaDocpendientes();
        imprEncabezadoFactura = null;
        factDetalle = null;
        obtenerSaldoActual();
        
        
        
        
    } else {
       navigator.notification.alert('Debe de ingresar al menos una linea para facturar!', 
						null, // callback
						'Error', // title
						'Aceptar' // buttonName
						);
    }

}

function facturaEnvases() {
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
        if(limiteExcedidoEnv == 0)
       {
       	       
		        for ( j = 0; j < pedidos.length; j++) {
		            posicion = j;
		            lineapedido = pedidos[j][1].split("|");
		            if (pedidos[j][0][0] == clienteenuso) {
		                if (pedidos[j][0][6] == "1D") {
		                    lineapedido[7]="";
		                    numfactura = ruta + "-" + tmpcorrelativo;
		                    tmplinea = lineapedido.join("|");
		                    tmplinea += "|" + numfactura + "|" + fechasistema() + " " + hora;
		                    //Agregamos el tipo de factura a la linea de las facturas
                    		tmplinea += "|" + (factDatosCliente[2] == "CONTADO"?"1":"0");
		                    
		                    sku = pedidos[posicion][0];
		                    facturatmp = new Array(sku, tmplinea);
		                    facturas.push(facturatmp);
		
		                    factNumPedido = (lineapedido[7] != "") ? lineapedido[7] : numpedido;
		                    factSubtotal += Number(lineapedido[3]);
		                    factTotal += Number(lineapedido[4]);
		                    factIva += Number(lineapedido[5]);
		
		                    factDetalle.push([sku[1], sku[2], lineapedido[0], lineapedido[1], (sku[7] == 0 ? Number(sku[4]).toFixed(2) : Number(sku[4] / 1.15).toFixed(2)), Number(lineapedido[3]).toFixed(2), null]);
		                }
		
		            }
		
		        }
		
		                  	//Revision 2016-05-01
							/**
								 * Tomamos el valor de la variable imprEncabezadoFactura: factDatosCliente[0] por clienteenuso
							*/

		        imprEncabezadoFactura = ["ORIGINAL", "FACTURA", clienteenuso, factDatosCliente[3], numfactura, factDatosCliente[1], ruta, formatofecha(fechasistema()), null, hora, factNumPedido, factDatosCliente[2], formatoDinero(factSubtotal).toString(), formatoDinero(factIva).toString(), formatoDinero(Number(factSubtotal) + Number(factIva)).toString(), null, null ];
		       
		        var tmpDocpendiente = "" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + Number(factTotal).toFixed(2) + "|" + Number(factTotal).toFixed(2) + "|" + (factDatosCliente[2] == "CONTADO"?"1":"0"); 
		       
		        if (factDetalle.length != 0) {
			            docsimpresos.push(ruta + "|FACTURA|ORIGINAL|" + numfactura + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
			            facturasimpresas.push(imprEncabezadoFactura.join("|") + "|ENV");
			
			            correlativo++;
			
						docspendientes.unshift(tmpDocpendiente);
			            if (factDatosCliente[2] == "CONTADO") {
			                
			                window.alert("Si no cancela esta factura en su totalidad le sera generado un faltante, el monto a cancelar es: " + formatoDinero(factTotal));
			                //Aqui nos damos cuenta que la factura es de contado.
            					$("#btnInfoClientePagos").hide();
            					pagoBloqueado = 1;
			            }
			
			            $("#btnAtras").hide();
			           
			            persistenciaSistema();
			                       
			            dataFacturacion(imprEncabezadoFactura, factDetalle, 0);
			            
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
			            window.alert("Debe de ingresar al menos una linea para facturar");
			        }
		            
		            
           }else{
           	 navigator.notification.alert('Esta factura excede el crédito disponible.\nSaldo Actual: C$'+formatoDinero(saldoEnUso), 
	            null, // callback
	            'Crédito Excedido', // title
	            'Aceptar' // buttonName
	            );  
           	
           }
            
        /**/
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

	for( zzz = 0; zzz < facturasimpresas.length; zzz++) {
		var tmpEncfacturas = facturasimpresas[zzz].split("|");
		if(tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[17] == tipoFactura) {
			tienerespuesta = true;
			break;
		}
	}
	return tienerespuesta;
}

function tieneAbonos() {
	var abnRespuesta = false;
	var tmpEncabonos;

	for( z = 0; z < facturasimpresas.length; z++) {
		var tmpEncabonos = facturasimpresas[z].split("|");
		//		console.log(tmpEncabonos);
		if(tmpEncabonos[3] == clienteenuso && tmpEncabonos[14] == "REC" && tmpEncabonos[8] == facturaenuso) {
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

	for( z = 0; z < facturasimpresas.length; z++) {
		var tmpEncabonos = facturasimpresas[z].split("|");
		if(tmpEncabonos[3] == clienteenuso && tmpEncabonos[14] == "REC" && tmpEncabonos[8] == facturaenuso) {
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
	for( i = 0; i < facturasimpresas.length; i++) {
		tmpEncfacturas = facturasimpresas[i].split("|");
		if(tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[17] == tipoFactura) {
			respuesta = true;
			tmpEncfacturas.pop();
			tmpEncfacturas.splice(0, 1);
			tmpEncabezado = tmpEncfacturas;
			tmpEncabezado.unshift(tipoImpresion);
			for( j = 0; j < facturas.length; j++) {
				tmplineafactura = facturas[j][1].split("|");
				if(facturas[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
									
					tmplineaFact = [facturas[j][0][1], facturas[j][0][2], tmplineafactura[0], tmplineafactura[1], Number(tmplineafactura[3] / tmplineafactura[2]).toFixed(4), tmplineafactura[3]];
					
					 console.log("Linea: "+facturas[j][0]);
					 console.log("TMP: "+tmplineaFact);
					
                    tmpdetalleFact.push(tmplineaFact);


				}

			}
		}
	}
	if(respuesta) {
		dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
		//docsimpresos.push(tmpEncabezado.join("|") + "|" + horasistema());
		docsimpresos.push(ruta + "|FACTURA|" + tipoImpresion + "|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
		console.log(docsimpresos);

	}
	tmpEncabezado = null;
	tmpdetalleFact = null;
}

function reimprimeCambio(tipoFactura, tipoImpresion) {
	var Rrespuesta = false;
	var tmpEncfacturas;
	var tmpEncabezado;
	var tmpdetalleFact = new Array();
	for( ii = 0; ii < facturasimpresas.length; ii++) {
		tmpEncfacturas = facturasimpresas[ii].split("|");
		if(tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[17] == tipoFactura) {
			Rrespuesta = true;
			tmpEncfacturas.pop();
			tmpEncfacturas.splice(0, 1);
			tmpEncabezado = tmpEncfacturas;
			tmpEncabezado.unshift(tipoImpresion);
			for( j = 0; j < cambiosRuta.length; j++) {
				lineacambio = cambiosRuta[j][1].split("|");
				if(cambiosRuta[j][0][0] == clienteenuso && lineacambio[5] == tmpEncabezado[4]) {
					tmplineaFact = ([cambiosRuta[j][0][1], cambiosRuta[j][0][2], lineacambio[0], lineacambio[1], null, null, motivosCambios[lineacambio[3]]]);
					tmpdetalleFact.push(tmplineaFact);

				}

			}
		}
	}
	if(Rrespuesta) {
		dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
		//docsimpresos.push(tmpEncabezado.join("|") + "|" + horasistema());
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
	for( i = 0; i < facturasimpresas.length; i++) {
		tmpEncfacturas = facturasimpresas[i].split("|");
		if(tmpEncfacturas[2] == clienteenuso && tmpEncfacturas[17] == tipoFactura) {
			respuesta = true;
			tmpEncfacturas.pop();
			tmpEncfacturas.splice(0, 1);
			tmpEncabezado = tmpEncfacturas;
			tmpEncabezado.unshift(tipoImpresion);
			for( j = 0; j < devolucionesRuta.length; j++) {
				tmplineafactura = devolucionesRuta[j][1].split("|");
				if(devolucionesRuta[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
					tmplineaFact = [devolucionesRuta[j][0][1], devolucionesRuta[j][0][2], tmplineafactura[0], tmplineafactura[1], devolucionesRuta[j][0][4], tmplineafactura[4]];
					tmpdetalleFact.push(tmplineaFact);

				}

			}
		}
	}
	if(respuesta) {
		dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
		//docsimpresos.push(tmpEncabezado.join("|") + "|" + horasistema());
		docsimpresos.push(ruta + "|DEVOLUCION|" + tipoImpresion + "|" + tmpEncabezado[4] + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
		console.log(docsimpresos);
	}
	tmpEncabezado = null;
	tmpdetalleFact = null;
}

function imprimeDevolucionesdia() {
	var tipoFactura = "DEV";
	var tipoImpresion = "COPIA";

	for( i = 0; i < facturasimpresas.length; i++) {
		var tmpEncfacturas;
		var tmpEncabezado;
		var tmpdetalleFact = new Array();
		respuesta = false;
		tmpEncfacturas = facturasimpresas[i].split("|");
		if(tmpEncfacturas[17] == tipoFactura) {
			respuesta = true;
			tmpEncfacturas.pop();
			tmpEncfacturas.splice(0, 1);
			tmpEncabezado = tmpEncfacturas;
			tmpEncabezado.unshift(tipoImpresion);
			for( j = 0; j < devolucionesRuta.length; j++) {
				tmplineafactura = devolucionesRuta[j][1].split("|");
				if(devolucionesRuta[j][0][0] == clienteenuso && tmplineafactura[8] == tmpEncabezado[4]) {
					tmplineaFact = [devolucionesRuta[j][0][1], devolucionesRuta[j][0][2], tmplineafactura[0], tmplineafactura[1], devolucionesRuta[j][0][4], tmplineafactura[4]];
					tmpdetalleFact.push(tmplineaFact);

				}

			}
		}
		if(respuesta) {
			dataFacturacion(tmpEncabezado, tmpdetalleFact, 1);
			//docsimpresos.push(tmpEncabezado.join("|") + "|" + horasistema());
		}
		tmpEncabezado = null;
		tmpdetalleFact = null;
	}
	docsimpresos.push(ruta + "|DEVOLUCIONES FIN DE DIA|ORIGINAL|||" + fechasistema() + "|" + horasistema());

}

function detalleCambiosimpresion() {
	var vacio = false;
	var tmpdetallecambiosimpresion = new Array();

	console.log(cambios);
	for( i0 = 0; i0 < cambiosRuta.length; i0++) {
		if( typeof cambiosRuta[i0] === "undefined") {
			vacio = true;
		} else {
			lineacambio = cambiosRuta[i0][1].split("|");
			tmpdetallecambiosimpresion.push([/*(i0 == 0 ? "CAMBIOS\n" : "") +*/ cambiosRuta[i0][0][1], cambiosRuta[i0][0][2] + "\n" + motivosCambios[lineacambio[3]], lineacambio[0], lineacambio[1]]);
		}

	}
	if(!vacio) {
		return tmpdetallecambiosimpresion;
	} else {
		return null;
	}
}

function imprimeInventarioabordo() {
	var detalleInvabordo = new Array();
	var encabezadoInvabordo = new Array("INVENTARIO ABORDO", ruta, horasistema(), formatofecha(fechasistema()));
	inventario.sort();
	for( i = 0; i < inventario.length; i++) {
		tmpinv = inventario[i].split("|");
		var invcajas = Number(tmpinv[4] / tmpinv[5]).toString();
		var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * tmpinv[5], 1);
		var invunidades;
		if(isNaN(tmpinvunidades)) {
			invunidades = 0;
		} else {
			invunidades = tmpinvunidades;
		}
		tmplineaimpresion = new Array(tmpinv[2], tmpinv[3], invcajas.split(".")[0], invunidades);
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

	for( ii = 0; ii < devolucionenvasesRuta.length; ii++) {
		var dev = devolucionenvasesRuta[ii].split("|");
		if(dev[6] == 0) {
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
	tmplineaimpresion = new Array("---------- DETALLE DE ENVASES ----------\nFDC", "ENVASE 200ml", 0, cant200fdc);
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

	//var Cambiosimpresion = detalleCambiosimpresion();
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

	var detalleInvabordo2 = detalleInvabordo;
	dataInventarioABordo(encabezadoInvabordo, detalleInvabordo2);
	//dataInventarioABordo(encabezadoInvabordo, detalleInvabordo2);
	//docsimpresos.push(encabezadoInvabordo.join("|") + "|" + horasistema());
	docsimpresos.push(ruta + "|INVENTARIO|REIMPRESION|||" + fechasistema() + "|" + horasistema());
}

function inventarioAbordo() {
	/*
	 var codigotabla = new StringBuilder();
	 codigotabla.append("<small><table fontborder=\"1\" style=\"background-color:#FFFFFF; border-radius: 10px; -webkit-border-radius: 10px\" width=\"100%\" cellpadding=\"3\" cellspacing=\"3\">\n");
	 codigotabla.append("<tr>\n");
	 codigotabla.append("<th width=\"20%\" align=\"left\">Código<\/th>\n");
	 codigotabla.append("<th width=\"60%\" align=\"center\">Descripción<\/th>\n");
	 codigotabla.append("<th width=\"10%\" align=\"right\">Cj<\/th>\n");
	 codigotabla.append("<th width=\"10%\" align=\"right\">Un<\/th>\n");
	 codigotabla.append("<\/tr>\n");

	 for ( i = 0; i < inventario.length; i++) {
	 tmpinv = inventario[i].split("|");
	 var invcajas = Number(tmpinv[4] / tmpinv[5]).toString();
	 //console.log(invcajas);
	 var tmpinvunidades = Math.round(Number("0." + invcajas.split(".")[1]) * tmpinv[5], 1);
	 var invunidades;
	 if (isNaN(tmpinvunidades)) {
	 invunidades = 0;
	 } else {
	 invunidades = tmpinvunidades;
	 }

	 codigotabla.append("<tr><td align=\"left\">");
	 codigotabla.append(tmpinv[2] + "<\/td>");
	 codigotabla.append("<td align=\"left\"><small>" + tmpinv[3] + "</small><\/td>");
	 codigotabla.append("<td align=\"right\">" + invcajas.split(".")[0] + "<\/td>");
	 codigotabla.append("<td align=\"right\">" + invunidades + "<\/td>");
	 codigotabla.append("<\/tr>");
	 }

	 codigotabla.append("<\/table><\/small>");
	 $('#tblInventario').html(codigotabla.toString());
	 */
	$.mobile.changePage('#page19', "reloadPage");
}

function descargaInventario(sku, cantidad) {
	var encontrado = false;
	for( zz = 0; zz < inventario.length; zz++) {
		var tmpInv = inventario[zz].split("|");
		var tmp1 = tmpInv[2];
		if(tmp1.toUpperCase() == sku) {
			encontrado = true;
			if(cantidad <= Number(tmpInv[4])) {
				var nuevaCantidad = Number(tmpInv[4] - cantidad);
				var tmplinea = tmpInv[0] + "|" + tmpInv[1] + "|" + tmpInv[2] + "|" + tmpInv[3] + "|" + nuevaCantidad + "|" + tmpInv[5];
				inventario.splice(zz, 1, tmplinea);
				return true;

			} else {
				//window.alert("No posee suficiente inventario, su inventario es: " + tmpInv[4] + " unidades.");
				return false;
			}
		}
	}
	if(!encontrado) {
		//	window.alert("El producto " + sku + " no fue cargado en su inventario inicial");
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
	                window.alert("Producto " + tmpInv[3] + " no posee suficiente inventario, su inventario es: " + tmpInv[4] + " unidades.");
	                return false;
	            }
	        }
        }catch(err){
			//No se Cargo Inventario abordo
		}
    }//End For
    
    if (!encontrado) {
       
        var tmpprod = buscadatosProducto(clienteCorporativo, sku);
        window.alert("El producto " + tmpprod[2] + " no fue cargado en su inventario inicial");
        return false;
    }

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

	var errorDatos = false;

	if(montoAbono == 0 || facturaenuso == "" || !isFinite(montoAbono)) {
		
		navigator.notification.alert('Valide cantidades y/o seleccione un documento!', 
	            null, // callback
	            'Datos incompletos', // title
	            'Aceptar' // buttonName
	    ); 
	} else {

		if(tipoAbono == "1" || tipoAbono == "3" || tipoAbono == "5" || tipoAbono == "7") {
			abonoCdb = Number(montoAbono * 1).toFixed(2);
			TCusado = 1;
		} else {
			abonoUSD = montoAbono;
			abonoCdb = Number(montoAbono * tipoCambio).toFixed(2);
			TCusado = tipoCambio;
		}

		if(tipoAbono == "1" || tipoAbono == "2") {
			bancoAbono = "";
			refAbono = "";	
				
			errorDatos = false;
				
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
		}
		
		if (errorDatos != true) {
			lineatmp += clienteenuso + "|";
			lineatmp += facturaenuso + "|";
			lineatmp += tipoAbono + "|";
			lineatmp += montoAbono + "|";
			lineatmp += abonoCdb + "|";
			lineatmp += abonoUSD + "|";
			lineatmp += TCusado + "|";
			lineatmp += bancoAbono + "|";
			lineatmp += refAbono + "|";
			lineatmp += fechasistema();
	
			abonos.push(lineatmp);
	
			$('#montoAbono').val(0);
			$('#tipoAbono').val(1);
			$('#selecBanco').val(1);
			$('#refAbono').val("");
	
			tablaAbonos();
			$('#tipoAbono').selectmenu('refresh');
			$('#selecBanco').selectmenu('refresh');
			$('#page12').page();
		}else
		{
			
		}
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
	codigotabla.append("<tr>\n");
	codigotabla.append("<th width=\"40%\" align=\"left\">Tipo<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Monto<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Banco<\/th>\n");
	codigotabla.append("<th width=\"20%\" align=\"right\">Referencia<\/th>\n");
	codigotabla.append("<\/tr>\n");

	if(docto) {
		for( i = 0; i < abonos.length; i++) {
			var tmpabono = abonos[i].split("|");
			if(tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {

				$("#btnImprimirPago").show();

				switch (Number(tmpabono[2])) {

					case 1:
						txttipoAbono = "Efectivo C$";

						txtBanco = "";
						tmpabono[8] = "";

						break;
					case 2:
						txttipoAbono = "Efectivo US$ (" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";

						txtBanco = "";
						tmpabono[8] = "";


						break;
					case 3:
						txttipoAbono = "Cheque C$";
						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];


						break;
					case 4:
						txttipoAbono = "Cheque US$ (" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];


						break;
					case 5:
						txttipoAbono = "Deposito C$";
						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
						break;
						
					case 6:
		                 txttipoAbono = "Deposito US$\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
		                 txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		                  break;
		                  
		            case 7:
		            	txttipoAbono = "Tarjeta Credito/Debito C$";
						txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		            
		            break;
				}


				codigotabla.append("<tr><td align=\"left\"><small>");
				codigotabla.append("<u><a onClick=\"modificaAbono(" + i + ");\">" + txttipoAbono + "<\/a><\/small><\/u><\/td>");
				codigotabla.append("<td align=\"right\">" + formatoDinero(Number(tmpabono[4])) + "<\/td>");
				codigotabla.append("<td align=\"right\">" + txtBanco + "<\/td>");
				codigotabla.append("<td align=\"right\"><small>" + tmpabono[8] + "<\/small><\/td>");
				codigotabla.append("<\/tr>");
				sumaAbono = Number(sumaAbono) + Number(tmpabono[4]);


			}else
            {      	
            		
 		   		$("#btnImprimirPago").hide();
            }

		}
		if(docto[4]>0)
		{
			if(!tieneAbonos()) {				
				abonoNuevoSaldo = Number(Number(docto[4] - sumaAbono)).toFixed(2);
			}else{
				abonoNuevoSaldo = Number(docto[4]).toFixed(2);
			}			


		}
	
		console.log(abonoNuevoSaldo);
		textoabono = "<small><p align=\"right\">Abono total: C$" + formatoDinero(Number(sumaAbono)) + "<br>";
		textoabono += "Nuevo saldo: C$" + formatoDinero(Number(abonoNuevoSaldo)) + "</p></small>";

		codigotabla.append("<\/table><\/small>");
		$('#totalAbono').html(textoabono);
		$('#tblAbonos').html(codigotabla.toString());
		$('#selecBanco').selectmenu('refresh');
		$('#page12').page();

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
	if(value) {
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
	if(evento == "envio") {
		$("#btnAceptarAutenticacion .ui-btn-text").text("Enviar");
	} else {
		$("#btnAceptarAutenticacion .ui-btn-text").text("Recibir");
	}
	$('#btnAceptarAutenticacion').button();
	$.mobile.changePage('#loginPage', "reloadPage");

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
        	
        	if(rutaN.substr(0,1) == 'T')
             {
             	sincronizarRecepcionDatos(rutaN.toUpperCase(), generarToken(contrasena));
             }
             else
             {
             	navigator.notification.alert('Debe utilizar una ruta de Entrega!!', 
	            null, // callback
	            'Ruta Equivocada', // title
	            'Aceptar' // buttonName
	            ); 
             }
            
            
        } else {
            alert("Debe escribir el Número de Ruta y su Contraseña");
        }

    }
}

/**
 * Genera el token encriptado a partir del Password y la Fecha
 * @author cgarcia
 */
function generarFecha() {
	if(curr_month.length == 1) {
		curr_month = "0" + curr_month;
	}

	if(curr_date.length == 1) {
		curr_date = "0" + curr_date;
	}

}

function generarToken(pass) {
	var token = "";
	if(curr_month.length == 1) {
		curr_month = "0" + curr_month;
	}

	if(curr_date.length == 1) {
		curr_date = "0" + curr_date;
	}
	token = curr_year + "" + curr_month + "" + curr_date;

	return MD5(pass + token);
}

/**
 * Recibe todos los datos y guarda la informacion en la ruta especifica..
 *
 * @author cgarcia
 */
function sincronizarRecepcionDatos(rutaN, token) {
	if(checkConnection() == 'No network connection') {
		alert("No esta Conectado a una Red!");
	} else {
		intentosRecibidos = 0;
		cantArchRecibidos = 0;
		errorRecibidos = 0;
		bloqRecibidos = 0;
		passErrorRecibidos = 0;
		noDatosRecibidos = 0;

		var tipoConexion = $("#cambiaServerBajar option:selected").val();

		//alert("Conexion: " + tipoConexion);

		if(parseInt(tipoConexion) == 1) {
			
			 //servidorWS = "https://192.168.134.32:92/DIST/OperacionesFDC";
            servidorWS="http://isaws05:90/DIST/OperacionesFDC"
            /**
			//Servidor de Prueba
			servidorWS = "http://192.168.134.32:2013/DIST/OperacionesFDC.ashx";
			*/
            
			usuarioFTP = "ISAWS02\\FTP_Distribucion";
			passFTP = "iW8qYFeK";
			servidorftp="192.168.134.35"
			//servidorFTP = "piloto.nsel-clnsa.com.ni";
			//alert("Red Interna");
		} else {
			//servidorWS = "https://190.212.139.230/DIST/OperacionesFDC";
			servidorWS="http://isaws05:90/DIST/OperacionesFDC"

			usuarioFTP = "ISAWS02\\FTP_Distribucion";
			passFTP = "iW8qYFeK";
			servidorftp="192.168.134.35"
			//servidorFTP = "190.212.139.230";
			//alert("INTERNET PUBLICO");
		}

		console.log("token:" + token)

		//Se cambia metodo ObtenerSKUS por ObtenerSKUSPCOR, debido a cambio en WS por Edwin Pereira, 2014.06.08
		obtenerDatosServidor("ObtenerSKUSPCOR", rutaN, token, "Bajando datos de Productos!", "No hay datos de Productos!", naProductos);
		obtenerDatosServidor("ObtenerDocumentosPendientes", rutaN, token, "Bajando documentos pendientes!", "No hay documentos pendientes!", naDocsPendientes);
		obtenerDatosServidor("ObtenerPedidosPorRuta", rutaN, token, "Bajando Pedidos!", "No hay Pedidos", naPedidos);
		obtenerDatosServidor("ObtenerAsignacionImpresora", rutaN, token, "Configurando Impresora!", "No hay datos de Impresora!", naImpresora);
		obtenerDatosServidor("ObtenerBancos", rutaN, token, "Bajando datos de bancos!", "No hay datos de bancos!", naBancos);
		obtenerDatosServidor("ObtenerRetornosPorRuta", rutaN, token, "Bajando Devolucion Envases!", "No hay Devolucion Envases!", naDevolucionEnvases);
		obtenerDatosServidor("ObtenerCambiosPorRuta", rutaN, token, "Bajando Datos de Cambios!", "No hay Cambios!", naCambios);
		obtenerDatosServidor("ObtenerDevolucionesPorRuta", rutaN, token, "Bajando Datos de Devoluciones!", "No hay Devoluciones!", naDevoluciones);
		obtenerDatosServidor("ObtenerPreciosEnvase", rutaN, token, "Bajando precios envases!", "No hay precios envases", naEnvases);
		obtenerDatosServidor("ObtenerFacturaSiguiente", rutaN, token, "Bajando datos de Correlativo!", "No hay datos de Correlativo", naCorrelativo);
		obtenerDatosServidor("ObtenerReciboSiguiente", rutaN, token, "Bajando datos de abonos!", "No hay datos de abonos", naCorrelativoabono);
		obtenerDatosServidor("ObtenerTasaCambio", rutaN, token, "Bajando datos de Tipo de Cambio!", "No hay datos de Tipo Cambio", naTipoCambio);
		obtenerDatosServidor("ObtenerCargaInicialRuta", rutaN, token, "Bajando datos de Carga Inicial!", "No hay datos de Carga Inicial!", naCargaInicial);
		obtenerDatosServidor("ObtenerClientesEntrega", rutaN, token, "Bajando datos de Clientes!", "No hay datos de Clientes!", naClientes);

		$("#numeroderuta").html(rutaN);
		grabaArchivoBajado(naRuta, rutaN);

		reiniciaTodo();
		$("#btnIniciodia").removeClass('ui-disabled');
		$.mobile.changePage('#page1', "reloadPage");
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
var cantArchRecibidos = 0;
var errorRecibidos = 0;
var bloqRecibidos = 0;
var passErrorRecibidos = 0;
var noDatosRecibidos = 0;


function obtenerDatosServidor(operacion, ruta, token, mensajeCarga, mensajeNoData, archivo) {
	
	intentosRecibidos++;
	
	
	if(intentosRecibidos == 1)
	{
		navigator.notification.activityStart("Descargando Datos...", "Por favor espere");
	}
	
	
	var xmlhttp = new XMLHttpRequest();
	var exito = false;
	var arregvacio = new Array();

	xmlhttp.onreadystatechange = function() {
		// Si hay resultados.
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200 && errorRecibidos==0) {
			
			var datosRetorno = xmlhttp.responseText.replace(/\r\n/gi, "\n");
			var arrayDatos = datosRetorno.split("\n");

			console.log("METODO: " + operacion);  
			console.log(" * Tamaño de los DATOS: " + datosRetorno.length);
			console.log(" * DATOS: " + datosRetorno);
			
			if(datosRetorno.length > 0 && passErrorRecibidos ==0 && bloqRecibidos ==0 ) {
				//console.log(" * PRIMERA LINEA: " + arrayDatos[0]);
				if(arrayDatos[0] == "SINCRONIZACION NO PERMITIDA") 
				{
					
					bloqRecibidos++;
					
					if(bloqRecibidos=1)
					{
						navigator.notification.activityStop();
						navigator.notification.alert('NO ha realizado envío de información, debe completar el procedimiento o contactarse con el encargado de Sistemas!!', // message
						null, // callback
						'SINCRONIZACION BLOQUEADA', // title
						'Aceptar' // buttonName
						);
						
						$('#btnIniciodia').addClass('ui-disabled');
						//$("#btnfindedia").addClass('ui-disabled');						
					}				
					
					
				} else {
					if(arrayDatos[0] == "SIN ACCESO") {
						passErrorRecibidos++;
						
						if(passErrorRecibidos=1)
							{
								navigator.notification.activityStop();
								navigator.notification.alert('Usuario o Contraseña Erroneas, Por favor verfique y vuelva a intentar', // message
								null, // callback
								'ERROR', // title
								'Aceptar' // buttonName
								);
								navigator.notification.vibrate(2500);
								
							}
							
						
					} else {
						if(arrayDatos[0] == "NO DATOS") {
						noDatosRecibidos++;
							
						if(!bloqRecibidos>0)
							{	
								grabaArchivoBajado(archivo, arregvacio);
								//navigator.notification.activityStop();
								indicarResultadoSincro(operacion, false);
								//alert(mensajeNoData);
								
								if( (noDatosRecibidos+cantArchRecibidos) ==  10)
								{
									navigator.notification.activityStop();
									navigator.notification.alert('Todos los datos ya fueron Cargados, Ya puede Iniciar Dia!!', // message
									null, // callback
									'Bajada de Datos Correctamente!', // title
									'Aceptar' // buttonName
									);
									navigator.notification.vibrate(2500);
									
								}
								
							}	
						} else {
							
							cantArchRecibidos++;
							
							if(!bloqRecibidos>0)
							{
								grabaArchivoBajado(archivo, datosRetorno);
								
								indicarResultadoSincro(operacion, true);
								
								//navigator.notification.activityStop();
								$('#btnIniciodia').removeClass('ui-disabled');
								$("#btnfindedia").removeClass('ui-disabled');
								
								if( (noDatosRecibidos+cantArchRecibidos) ==  10)
								{
									navigator.notification.activityStop();
									navigator.notification.alert('Todos los datos ya fueron Cargados.\n\nYa puede Iniciar Dia!!', // message
									null, // callback
									'Bajada de Datos Correctamente!', // title
									'Aceptar' // buttonName
									);
									navigator.notification.vibrate(2500);
								}
							}
						}
					}
				}
			}

		} else if((xmlhttp.readyState == 4 && xmlhttp.status == 0) || (xmlhttp.readyState == 4 && xmlhttp.status == 500)) {
			
			//console.log("ERROR: "+errorRecibidos);	
			navigator.notification.activityStop();
			indicarResultadoSincro(operacion, false);
				
			if(errorRecibidos==0)
			{
				
				if(xmlhttp.status == 500)
				{
					var datosRetorno = xmlhttp.responseText.replace(/\r\n/gi, "\n");
					var arrayDatos = datosRetorno.split("\n");
					
					//alert("Resultado "+operacion+" :"+datosRetorno);
					
					if( datosRetorno == "SINCRONIZACION NO PERMITIDA")
					{
						navigator.notification.activityStop();
							navigator.notification.alert('NO ha realizado envío de información, debe completar el procedimiento o contactarse con el encargado de Sistemas!!', // message
							null, // callback
							'SINCRONIZACION BLOQUEADA', // title
							'Aceptar' // buttonName
							);
							
							$('#btnIniciodia').addClass('ui-disabled');
							
							navigator.notification.vibrate(2500);
					}
				
				}else 
				{
										
					navigator.notification.alert('No Hubo Respuesta del Servidor. '+
							'Verifique si esta indicando el Tipo de Conexión correcta ó '+
							'Comuniquese con el Encargado de Sistemas!', // message
					null, // callback
					'SERVIDOR NO RESPONDE..', // title
					'Aceptar' // buttonName
					);	
					navigator.notification.vibrate(2500);
				}
			
			
			
			
			}
			errorRecibidos++;
		
		}

	};
	//console.log("Open.===: " + servidorWS + "?op=" + operacion + "&ruta=" + ruta + "&tok=" + token);
	xmlhttp.open("GET", servidorWS + "?op=" + operacion + "&ruta=" + ruta + "&tok=" + token + "&devid=" + device.name + "_" + device.uuid + "&version=" + version + "&tstamp=" + calculatstamp(), true);
	////console.log("Send.");
	xmlhttp.send();
	////console.log("Sent.");
}

/**
 *	Asignamos a los controladores de descarga si los datos fueron bajados
 * con exito o no.
 * @author cgarcia
 */
function indicarResultadoSincro(operacion, indicador) {
	if(operacion == "ObtenerSKUS") {
		exitoProductos = indicador;
	}

	if(operacion == "ObtenerClientes") {
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
	var path = rutaArchivoBajado + archivo;
	var writer = new FileWriter(path);
	writer.write(data, false);
}

/**
 * Metodo para subir los archivos al FTP
 *
 * @author cgarcia
 */
function sincronizarEnvioDatos() {

	if(checkConnection() == 'No network connection') {
		alert("No esta conectado a una Red!");
	} else {
		cantArchEnviados = 0;
		errorEnvio = 0;
		intentosEnvio = 0;
		var tipoConexion = $("#cambiaServer option:selected").val();

		// alert("Conexion: " + tipoConexion);
;
			//alert("INTERNET PUBLICO");
		if(parseInt(tipoConexion) == 1) {
			//servidorWS = "https://192.168.134.32/DIST/OperacionesFDC.ashx";
			usuarioFTP = "ISAWS02\\FTP_Distribucion";
			passFTP = "iW8qYFeK";
			servidorFTP = "piloto.nsel-clnsa.com.ni";
			//alert("Red Interna");
		} else {
			//servidorWS = "https://190.212.139.236/DIST/OperacionesFDC.ashx";
			usuarioFTP = "ISAWS02\\FTP_Distribucion";
			passFTP = "iW8qYFeK";
			servidorFTP = "190.212.139.230"
		}

		console.log("Cantidad Archivos Guardados: " + archivosGrabados.length);

		if(archivosGrabados.length > 0) {
			contadorArchivos = archivosGrabados.length;
			for( i = 0; i < archivosGrabados.length; i++) {
				var alineatmp = archivosGrabados[i];
				var alocal = alineatmp[0].toString();
				var aremoto = alineatmp[1].toString();
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

	if(intentosEnvio == 1) {
		navigator.notification.activityStart("Enviando datos", "Por favor espere...");
	}

	var win = function() {
		navigator.notification.activityStop();
		cantArchEnviados++;

		if(cantArchEnviados == cantArchivos) {
			navigator.notification.alert(mensajeEnvio, // message
			null, // callback
			'ENVIO EXITOSO', // title
			'Aceptar' // buttonName
			);
		}

		//alert("Archivo " + remoto + " ha sido enviado exitosamente!");
		//contadorArchivos--;
	}
	var fail = function() {
		navigator.notification.activityStop();
		errorEnvio++;

		if(errorEnvio == 1) {

			navigator.notification.alert('NO se pudo enviar la información, Por favor intentelo de nuevo!!', //'Archivo ' + remoto + ' no ha sido enviado, debe intentar de nuevo', // message
			null, // callback
			'ERROR ENVIANDO DATOS', // title
			'Aceptar' // buttonName
			);
		}
	}
	var archivoftp = local;
	var servidorftp = "ftp://" + usuarioFTP + ":" + passFTP + "@" + servidorFTP + "/" + remoto + ";type=i";
	window.plugins.ftpclient.put(archivoftp, servidorftp, win, fail);
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

/* Variables para los Servicios */
//var servidorWS = "https://190.212.139.236/DIST/OperacionesFDC.ashx";
//"https://192.168.134.32/DIST/OperacionesFDC.ashx";

var servidorWS = "https://192.168.134.32:92/DIST/OperacionesFDC";

var naClientes = "clientes.txt";
var naBancos = "bancos.txt";
var naImpresora = "impresora.txt";
var naDocsPendientes = "docspendientes.txt";
var naProductos = "productos.txt";
var naCargaInicial = "cargainicial.txt";
var naTipoCambio = "tipocambio.txt";
var naCorrelativo = "correlativo.txt";
var naCorrelativoabono = "correlativoabono.txt";
var naEnvases = "precioenvases.txt";
var naPedidos = "pedidos.txt";
var naDevoluciones = "devoluciones.txt";
var naCambios = "cambios.txt";
var naDevolucionEnvases = "devolucionenvases.txt";
var naRuta = "ruta.txt";
var rutaArchivoBajado = "/mnt/sdcard/entrega/";

/* Variables para FTP */
var usuarioFTP = "ISAWS02\\FTP_Distribucion";
var passFTP = "iW8qYFeK";
var servidorFTP = "piloto.nsel-clnsa.com.ni";

//funciones de entrega

function tieneReciboenvases() {
	var respuesta = false;
	for( ii = 0; ii < facturasimpresas.length; ii++) {
		var dev = facturasimpresas[ii].split("|");
		if(dev[3] == clienteenuso && dev[14] == "RECENV") {
			respuesta = true;
			break;
		}
	}
	return respuesta;
}

function imprimeReciboenvases() {
	if(!tieneReciboenvases()) {
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

		for( i = 0; i < devolucionenvases.length; i++) {
			var dev = devolucionenvases[i].split("|");
			if(dev[0] == clienteenuso) {
				devolucionenvasesRuta.push(devolucionenvases[i]);
				if(dev[6] == 0) {
					cant200fdc = Number(cant200fdc) + Number(dev[1]);
					cant375fdc = Number(cant375fdc) + Number(dev[2]);
					cant750fdc = Number(cant750fdc) + Number(dev[3]);
					cant1000fdc = Number(cant1000fdc) + Number(dev[4]);
					cant1750fdc = Number(cant1750fdc) + Number(dev[5]);
					montodevolucionrecibo = Number(montodevolucionrecibo + dev[7]).toFixed(2);

				} else {
					cant200rp = Number(cant200rp) + Number(dev[1]);
					cant375rp = Number(cant375rp) + Number(dev[2]);
					cant750rp = Number(cant750rp) + Number(dev[3]);
					cant1000rp = Number(cant1000rp) + Number(dev[4]);
					cant1750rp = Number(cant1750rp) + Number(dev[5]);
					montodevolucionrecibo = Number(montodevolucionrecibo + dev[7]).toFixed(2);

				}
			}

		}

		var devEnvasedetalle = [cant200fdc, cant375fdc, cant750fdc, cant1000fdc, cant1750fdc, cant200rp, cant375rp, cant750rp, cant1000rp, cant1750rp];

		var tmpcliente = buscadatosCliente(clienteenuso);

		var reciboEncabezado = ["ORIGINAL", "RECIBO DE ENVASES", ruta + "ENV" + clienteenuso, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), null, null, null, montodevolucionrecibo, null, null];
		facturasimpresas.push(reciboEncabezado.join("|") + "|RECENV");
		docsimpresos.push(ruta + "|RECIBOENVASES|ORIGINAL|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
		window.alert("Devolucion de envases impresa");
		persistenciaSistema();
		dataRecibo(reciboEncabezado, devEnvasedetalle, 0);
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

		for( i = 0; i < devolucionenvasesRuta.length; i++) {
			var dev = devolucionenvasesRuta[i].split("|");
			if(dev[0] == clienteenuso) {
				if(dev[6] == 0) {
					cant200fdc = Number(cant200fdc) + Number(dev[1]);
					cant375fdc = Number(cant375fdc) + Number(dev[2]);
					cant750fdc = Number(cant750fdc) + Number(dev[3]);
					cant1000fdc = Number(cant1000fdc) + Number(dev[4]);
					cant1750fdc = Number(cant1750fdc) + Number(dev[5]);
					montodevolucionrecibo = Number(montodevolucionrecibo + dev[7]).toFixed(2);

				} else {
					cant200rp = Number(cant200rp) + Number(dev[1]);
					cant375rp = Number(cant375rp) + Number(dev[2]);
					cant750rp = Number(cant750rp) + Number(dev[3]);
					cant1000rp = Number(cant1000rp) + Number(dev[4]);
					cant1750rp = Number(cant1750rp) + Number(dev[5]);
					montodevolucionrecibo = Number(montodevolucionrecibo + dev[7]).toFixed(2);

				}
			}

		}

		var devEnvasedetalle = [cant200fdc, cant375fdc, cant750fdc, cant1000fdc, cant1750fdc, cant200rp, cant375rp, cant750rp, cant1000rp, cant1750rp];

		var tmpcliente = buscadatosCliente(clienteenuso);

		var reciboEncabezado = ["COPIA", "RECIBO DE ENVASES", ruta + "ENV" + clienteenuso, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), null, null, null, montodevolucionrecibo, null, null];

		docsimpresos.push(ruta + "|RECIBOENVASES|COPIA|" + ruta + "ENV" + clienteenuso + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
		window.alert("Cliente ya posee devolucion de envases, reimprimiendo");
		persistenciaSistema();
		dataRecibo(reciboEncabezado, devEnvasedetalle, 1);

	}
}


function imprimeAbono() {
    var sumaAbono = 0;
    var reciboEncabezado = new Array();
    var reciboDetalle = new Array();
    var txttipoAbono = "";
    var textoabono = "";
    var txtBanco = "";
    
    if (facturaenuso == "") {
        window.alert("Debe seleccionar un documento valido");
    } else {
        if (!tieneAbonos()) {
            console.log("No tiene");
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
                    var tmpcorrelativoabono = ruta + "-" + creacorrelativo(correlativoabono);
                    for ( ii = 0; ii < abonos.length; ii++) {
                        var tmpabono = abonos[ii].split("|");
                        if (tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {

                            switch (Number(tmpabono[2])) {
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
                                    txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
                                    break;
                                
                                case 6:
			                        txttipoAbono = "Deposito US$\n(" + formatoDinero(tmpabono[3]) + "*" + Number(tmpabono[6]).toFixed(4) + ")";
			                        txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		                        break;
		                        
		                        case 7:
			                        txttipoAbono = "Tarjeta Credito/\nDebito C$";
			                        txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		                        break;
		                        
		                        
                            }
                            sumaAbono = Number(sumaAbono) + Number(tmpabono[4]);

                            reciboDetalle.push([txttipoAbono, formatoDinero(Number(tmpabono[4])), txtBanco, tmpabono[8]]);
                            abonosRealizados.push(abonos[ii] + "|" + tmpcorrelativoabono + "|" + ruta + llavefecha.substring(2, llavefecha.length));
                        }
                    }

                    reciboEncabezado = ["ORIGINAL", "RECIBO DE PAGO", tmpcorrelativoabono, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), facturaenuso, formatofecha(fechafacturaenuso), formatoDinero(montofacturaenuso), formatoDinero(saldofacturaenuso), formatoDinero(Number(sumaAbono).toFixed(2)), formatoDinero(Number(saldofacturaenuso - sumaAbono).toFixed(2))];
                    facturasimpresas.push(reciboEncabezado.join("|") + "|REC");
                    docsimpresos.push(ruta + "|RECIBO|ORIGINAL|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
                    correlativoabono++;
                    
                    //window.alert("Pago guardado...");
                    actualizaDocpendientes(clienteenuso, facturaenuso, saldofacturaenuso, sumaAbono);
                    
                    persistenciaSistema();
                    
                    dataRecibo(reciboEncabezado, reciboDetalle, 2);
                    
                    //window.alert("Pago guardado...");
                    navigator.notification.alert('C$'+formatoDinero(Number(sumaAbono).toFixed(2))+ ' abonado a factura: '+facturaenuso, // message
			            null, // callback
			            'Pago '+tmpcorrelativoabono+' guardado!!', // title
			            'Aceptar' // buttonName
			            );
                    
                    actualizaIconos();
                    
                    cargadocscliente(clienteenuso);
                    
                    facturaenuso = "";
                    
                    $('#totalAbono').html("");
                    
                    
                   /* if(pagoBloqueado == 0)
                    {
                    	$("#btnInfoClientePagos").show();
                    	pagoBloqueado = 0;
                    	grabatmp("ww", pagoBloqueado);
                    	
                    }*/ 
                    
                    
                    ++
                }
            } else {
                window.alert("El monto de los abonos no es valido, favor revise las cantidades");
                tablaAbonos();
            }
        } else {
        	//FACTURA YA POSEE PAGO.. REIMPRESION
            var tmpcorrelativoabono = buscaCorrelativoabono();
            var tmpcliente = buscadatosCliente(clienteenuso);
            for ( ii = 0; ii < abonosRealizados.length; ii++) {
                var tmpabono = abonosRealizados[ii].split("|");
                if (tmpabono[0] == clienteenuso && tmpabono[1] == facturaenuso) {

                    switch (Number(tmpabono[2])) {
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
		                case 7:
			                        txttipoAbono = "Tarjeta Credito/\nDebito C$";
			                        txtBanco = bancos[tmpabono[7] - 1].split("|")[1];
		                     break;

                    }
                    sumaAbono = Number(sumaAbono) + Number(tmpabono[4]);

                    reciboDetalle.push([txttipoAbono, formatoDinero(Number(tmpabono[4])), txtBanco, tmpabono[8]]);

                }
            }
            reciboEncabezado = ["COPIA", "RECIBO DE PAGO", tmpcorrelativoabono, clienteenuso, tmpcliente[1], ruta, formatofecha(fechasistema()), horasistema(), facturaenuso, formatofecha(fechafacturaenuso), formatoDinero(montofacturaenuso), formatoDinero(Number(Number(saldofacturaenuso) + Number(sumaAbono))), formatoDinero(Number(sumaAbono).toFixed(2)),  formatoDinero(saldofacturaenuso)];
            docsimpresos.push(ruta + "|RECIBO|COPIA|" + tmpcorrelativoabono + "|" + clienteenuso + "|" + fechasistema() + "|" + horasistema());
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
        }
        cargadocscliente(clienteenuso);
        //obtenerSaldoActual();
        tablapedido();

    }
}

function imprimeminuta() {
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
	imprDatosMinuta = ["MINUTA DE DEPOSITO", ruta + llavefecha.substring(2, llavefecha.length), formatofecha(fechasistema()), horasistema(), ruta, formatoDinero(totalAbonosEfectivosCordobas), formatoDinero(totalAbonosCkCordobas), formatoDinero(totalAbonosEfectivosDolares), formatoDinero(totalAbonosCkDolares)];
	docsimpresos.push(ruta + "|MINUTA|ORIGINAL|" + ruta + llavefecha.substring(2, llavefecha.length) + "||" + fechasistema() + "|" + horasistema());
	dataMinuta(imprDatosMinuta);

	$("#btnRutaDia").addClass('ui-disabled');
	
	
	imprimeResumenPago();
}

function imprimeResumenPago() {
    
	var totalEfectivoNIO = 0; 
	var totalChequeNIO = 0; 
	var totalTarjetaNIO = 0;
	var totalMinutaNIO = 0;
	
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
			formatoDinero(totalMinutaPROCREDITUS), formatoDinero(totalMinutaBCENTRALUS) ];
    
    docsimpresos.push(ruta + "|RESUMEN_PAGO|ORIGINAL|"+ruta + llavefecha.substring(2, llavefecha.length)+"||" + fechasistema() + "|" + horasistema());
    dataMinutaResumenPago(imprDatosResumen);
    
    console.log(imprDatosResumen);

   // $("#btnRutaDia").addClass('ui-disabled');
 
 	

}


//Verifica el limite de credito antes de abrir la ventana de levantamiento de pedido
function ingresarFactura(){	
var clienteActual = buscadatosCliente(clienteenuso);
	
	if(Number(clienteActual[4]) > 0)
	{
		
		//Verificamos que el saldo este bien o que tenga factura
		if(saldoEnUso < 0 && !tieneFacturas("PROD") )
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
}
/**
 * Actualizado: 2014.01.08
 * @autor: CGarcia
 * Comentarios: * Aqui se calcula el Saldo disponible del cliente en base a su deuda.
 * 				* Se verifica si el cliente aplica al 25% por encima de su limite de credito.
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
		            	var pos = docto[0].indexOf('-');     // posicion = -1
		            	
		            	//No encontro el caracter
		            	if(pos == -1)
		            	{
		            		//alert("Factura: "+docto[0]+" es de CASA PELLAS por "+docto[3]);
		            		
		            	}else{
		            		//Si encontro el caracter		            		
							saldoActual = saldoActual + Number(docto[4]);							
		            	}
		            	
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
	   		     
	   }
		 
		$("#spanLimiteCredito").show(); 
		//alert("Saldo Actual: " + saldoEnUso);
	
	}else{
		$("#spanLimiteCredito").hide();  
	}
	
	
	/*Banderas para manejar el limite excedido de los clientes*/
	/*var clienteActual = buscadatosCliente(clienteenuso);
	if(clienteActual[2] != 'CONTADO')
	 {
	    if( (saldoEnUso - dettotal) < 0)
	    {
	    	//alert("Saldo Excede el Limite de Credito!! (Producto) "+(saldoEnUso - dettotal));
	    	limiteExcedido = 1;
	    }else{
	    	//alert("Limite de Credito bien!! (Producto) "+(saldoEnUso - dettotal));
	    	limiteExcedido = 0;
	    }
	    
	    
	    if( (saldoEnUso - envdettotal) < 0)
	    {
	    	//alert("Saldo Excede el Limite de Credito!! (envase)"+(saldoEnUso - envdettotal));
	    	limiteExcedidoEnv = 1;
	    }else{
	    	//alert("Limite de Credito bien!! (envase) "+(saldoEnUso - envdettotal));
	    	limiteExcedidoEnv = 0;
	    }
    }else
    {
    	limiteExcedido = 0;
    	limiteExcedidoEnv = 0;
    }*/
	
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

function iniciarOperaciones(){
	$("#divCargando").hide(); 
}

/*GeoPosicionamiento*/
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function tomarPosicion(){
	navigator.geolocation.getCurrentPosition(onSuccess, onError,  {enableHighAccuracy:true, timeout: 100000});
};