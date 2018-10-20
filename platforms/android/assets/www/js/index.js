            //Variables y funciones Globales...
			var cargoImpresora = false;

			//Define logs: Archivos de salida...
             var LogCreacionArchivos=new StringBuilder();

            // Define logs de errores: Impresión de Documentos [Factura Liquido, Factura Envase, Recibo, Recibo Envase]
            var LogErroresImpresionDocumentos = "";

			//Define lista de archivos de salida...
            var listaArchivosSalida=[
                 {'nombre':'findedia','isObligatorio':true,'archivoTemporal':'u.txt'},
                 {'nombre':'abonos','isObligatorio':false,'archivoTemporal':'oo.txt'},
                 {'nombre':'docsimpresos','isObligatorio':false,'archivoTemporal':'v.txt'},
                 {'nombre':'devolucionenvases','isObligatorio':false,'archivoTemporal':'qq.txt'},
                 {'nombre':'devoluciones','isObligatorio':false,'archivoTemporal':'x.txt'},
                 {'nombre':'cambios','isObligatorio':false,'archivoTemporal':'y.txt'},
                 {'nombre':'motivosnovta','isObligatorio':false,'archivoTemporal':'n.txt'},
                 {'nombre':'DST_LOG_ERRORES','isObligatorio':false,'archivoTemporal':'errores.txt'},
                 {'nombre':'backup_facturas','isObligatorio':false,'archivoTemporal':'q.txt'},
                 {'nombre':'facturas','isObligatorio':false,'archivoTemporal':''},
            ];

			//Define el ambiente a utilizar...
            var esAmbienteProduccion=false;

            //Define la versión en uso...
            var version="A-2018.04.05";

            //ruta a servidores de Piloto, conexiones internas...
            var servidorWS_RedInterna_Piloto='http://190.212.139.237:90/DIST/OperacionesFDC';
            var servidorFTP_RedInterna_Piloto='isaws05.nsel-clnsa.com.ni';
            var usuarioFTP_RedInterna_Piloto='ISAWS05\\FTP_Distribucion';
            var passFTP_RedInterna_Piloto='f79.d1$7R1BU';

           //ruta a servidores de Piloto, conexiones externas...
            var servidorWS_Internet_Piloto='http://190.212.139.237:90/DIST/OperacionesFDC';
            var servidorFTP_Internet_Piloto='190.212.139.237';
            var usuarioFTP_Internet_Piloto='ISAWS05\\FTP_Distribucion';
            var passFTP_Internet_Piloto='f79.d1$7R1BU';

           //ruta a servidores de Produccion, conexiones internas...
            var servidorWS_RedInterna_Produccion='https://192.168.134.32:92/DIST/OperacionesFDC';
            var servidorFTP_RedInterna_Produccion='piloto.nsel-clnsa.com.ni';
            var usuarioFTP_RedInterna_Produccion='ISAWS02\\FTP_Distribucion';
            var passFTP_RedInterna_Produccion='iW8qYFeK';

           //ruta a servidores de Produccion, conexiones externas...
            var servidorWS_Internet_Produccion='https://190.212.139.230/DIST/OperacionesFDC';
            var servidorFTP_Internet_Produccion='190.212.139.230';
            var usuarioFTP_Internet_Produccion='ISAWS02\\FTP_Distribucion';
            var passFTP_Internet_Produccion='iW8qYFeK';

			//Guarda el nombre de impresora conectada...
			var nombreImpresoraConectada='';

            //Define lista de errores...
            var logErrores=[];

            //Define cantidad de errores...
            var errorFacturacion=[];


			//Muestra impresora conectada...
			function muestraImpresoraConectada(){
				$("#impresoraConectada").html("Impresora actual: "+nombreImpresoraConectada+". MAC: "+dirImpresora);
			}

			//Arma lista de dispositivos Bluetooth...
            function listarImpresoras(){

                $("#selectImpresora").html("");
                navigator.notification.activityStart("Buscando impresoras...", "Por favor espere");

                ImpresoraBixolonSPPR300ySPPR310.buscar((devices)=>{

                    var lista = devices.map((device)=>{

                                     var id    = device.MAC + "_" + device.Nombre;
                                     var texto = device.Nombre + "(" + device.MAC + ")";

                                      $('#selectImpresora').append($('<option>', {
                                            value: id,
                                            text : texto
                                      }));

                                });

                    navigator.notification.activityStop();
                    $('#selectImpresora').selectmenu('enable');
                    $('#selectImpresora').selectmenu('refresh');

                });

            }

            // Muestra la pantalla de configuración de Bluetooth del Sistema Operativo
//            function VerDispositivosBluetooth(){
//
//                ImpresoraBixolon.configuracion();
//
//            }

            //Define lista de errores...
            var logErrores=[];

            function HayErrores(){
            	//Imprime errores...
            	alert(logErrores);
            }

		//Seleccionar BANCO de la minuta de deposita segun la configuracion que tenga la ruta para el tipo de pago 1
		//Agregado por MROQUE el 2016/02/08
            function Minuta_Deposito_Banco(){
            	db_smart_sales.metodos.Obtener_Banco_Deposito(function (item) {
            		if( item.rows.length == 0){
            			alert("La ruta no tiene configurado banco de deposito");
            		}
            		else{
            			var banco_txt= item.rows.item(0).Banco.trim()
						var cadena_espaciada = banco_txt.split("")
						var url="../img/"+ banco_txt +".png"
						if (banco_txt.toUpperCase() =="BAC"){url= "../img/"+ banco_txt +".gif"}

						var html_imagen="<img src='"+ url +"' class=img_banco width='89' height='34'> Minuta "+ banco_txt
						$('#banco_deposito').attr("onclick","imprimeminuta('"+ cadena_espaciada.join(" ") +"')")


						//imprimeResumenPago
						$('#banco_deposito').html(html_imagen)
            		}
				}, function(error){
					var conf= confirm("Ocurrio un error al obtener el Banco de Desposito. Desea volver a consultar el banco?");
					if(conf){ Minuta_Deposito_Banco() }
				})
            }

            //Movidas de cordova-1.8.0.js...
            var recuperarSistema=false;
            var crearDirectorios=true;

            var ejecutarBusqueda = function (elementoActual){
                var query = $.trim($("#" + elementoActual).val().toUpperCase());
                var familia;

//                if( $("#" + elementoActual).hasClass('FDC-buscar') ){
//                familia = " in ('FH','FK','FM','FA','FDC') ";
//                }
//                if( $("#" + elementoActual).hasClass('RP-buscar') ){
//                familia = "in ('RP','PE','PA','PL','PO') ";
//                }
//                if( $("#" + elementoActual).hasClass('Aguardientes-buscar') ){
//                familia = " in ('AA','AC') ";
//                }
//                if( $("#" + elementoActual).hasClass('Vodka-buscar') ){
//                familia = " in ('FV') ";
//                }
//                if( $("#" + elementoActual).hasClass('Otros-buscar') ){
//                familia = " not in ('FH','FK','FM','FA','FDC','RP','PE','PA','PL','PO','AA','AC','FV','1D') ";
//                }
//                if( $("#" + elementoActual).hasClass('Envases-buscar') ){
//                familia = " in ('1D') ";
//                }

                var cantidadRegistros = "";

                if( $("#" + elementoActual).attr("id").split("-")[0] != 'todos' ){
                    familia = " = '" + $("#" + elementoActual).attr("id").split("-")[0] + "'";
                }else{
                    familia = " like '%'";
                    cantidadRegistros = " limit 20 ";
                }


                db_smart_sales.metodos.obtenerProductos(familia, clienteCorporativo, query, cantidadRegistros, function (item) {

                    lista = [];
                    var codigo;
                    var descripcion;
                    var existencias;

                    if(item.rows.length == 0){
                           $("#" + elementoActual).siblings('.productos-encontrados').html("<div>No se encontraron productos</div>");
                           $("#" + elementoActual).siblings('.productos-encontrados').css("display","block");
                    }
                    else{
                          var esPedido     = elementoActual.search(/pedido/i) >= 0;
                          var esCambio     = elementoActual.search(/cambio/i) >= 0;
                          var esDevolucion = elementoActual.search(/devolucion/i) >= 0;

                          var boton = '<span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="arrow-r" data-iconpos="notext" data-theme="b" title="" class="ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></span>';
                                for (var i = 0; i < item.rows.length; i++) {
                                        codigo       = item.rows.item(i).codigoProducto;
                                        descripcion  = item.rows.item(i).descripcionProducto;
                                        existencias  = item.rows.item(i).unidades;
                                        esEnvase     = item.rows.item(i).familia == '1D';
                                        if( esEnvase || esCambio || esDevolucion ){
                                            existencias = "";
                                        }
                                        else{

                                            if(existencias != 0){
                                               existencias = "<span class='existencia'>Existencia: </span><span class='hayUnidades existencia' >"+ existencias +" unidades</span>";
                                            }
                                            else{
                                                existencias = "<span class='existencia' >Existencia: </span><span class='saldoVencido existencia' >"+ existencias +" unidades</span>";
                                            }

                                        }

                                        var evento = "";
                                        if( esPedido ){
                                            evento = 'onClick = "encabezadoPedido(\'' + codigo +'\');"';
                                        }
                                        if( esCambio ){
                                            evento = 'onClick = "encabezadoCambios(\'' + codigo +'\');"';
                                        }
                                        if(esDevolucion){
                                            evento = 'onClick = "encabezadoDevoluciones(\'' + codigo +'\');"';
                                        }

                                        lista.push('<li ' + evento + '><h1>' + codigo + '</h1><h1>' + descripcion + '</h1>' + existencias + '</li>');
                                    }

                                $("#" + elementoActual).siblings('.productos-encontrados').html(lista.join(''));
                                $("#" + elementoActual).siblings('.productos-encontrados').css("display","block");
                    }

                });
            }

            var buscarProducto = function () {
                    console.log("keyup...");
                    var elementoActual = $(this).attr("id");
                    ejecutarBusqueda(elementoActual);

            };

            var app = {
                initialize: function() {
                    this.bindEvents();
                },
                bindEvents: function() {
                    document.addEventListener('deviceready', this.onDeviceReady, false);

                    //Código de cordova-1.8.0.js...
                    if((localStorage.getItem("Estado"))=="Corriendo"){
                        recuperarSistema=true;
                     }
                },
                onDeviceReady: function() {

                db_smart_sales.metodos.crear_db();

                window.setTimeout(function(){
                    db_smart_sales.metodos.crear_db();
                },3000);


//                    // Ligar evento al botón facturar envases
//                    var btnEnvase = document.getElementById("facturaEnvase");
//                    btnEnvase.onclick = function(){
//                        var btnEnvase = document.getElementById("facturaEnvase");
//                        btnEnvase.onclick = null;
//                        facturaEnvases();
//                    };
//
//                    // Ligar evento al botón facturar productos
//                    var btnLiquido = document.getElementById("facturaProducto");
//                    btnLiquido.onclick = function(){
//                        var btnLiquido = document.getElementById("facturaProducto");
//                        btnLiquido.onclick = null;
//                        facturaProducto();
//                    };

                    desbloquearFacturacion();

                    //Muestra ambiente en pantalla...
                    if(esAmbienteProduccion===false){
                        $('#ambiente').html('Piloto ');
                    }
                    else{
                        $('#ambiente').html('');
                    }

                 //Muestra la versión en uso en pantalla...
                 $('#NumeroVersion').html(version);
                estacorriendo();

			document.addEventListener("backbutton", onBackKeyDown, false);

                /*
                if(!cargoImpresora){
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
                                    cargoImpresora=true;
                              }
                            }
                        });
                    }
                    //*/
                /*
                if(!cargoImpresora){
                     dirImpresora = getcsv("impresora.txt")[0].split("_")[0];
                     nombreImpresoraConectada=getcsv("impresora.txt")[0].split("_")[1];
                     if( typeof dirImpresora === 'undefined'){
                        alert('No hay datos de impresora: MAC!');
                     }else{
                         if( typeof nombreImpresoraConectada==='undefined'){
                                 nombreImpresoraConectada='N/D';
                                 muestraImpresoraConectada();
                          }else{
                          //        activarBluetooth();
                                  muestraImpresoraConectada();
                                  cargoImpresora=true;
                          }
                        }
                    }
                    //*/

			//Se medifica para validar el banco asociado al tipo de pago
			//2016.02.01 por mroque
			//$('#selecBanco').selectmenu('disable');
                    $("#tipoAbono").bind("change", function(event, ui) {
                        var tipoAbono = $("#tipoAbono").val();
                        db_smart_sales.metodos.Obtener_Datos_Tipo_Pago(3,tipoAbono ,function (item) {
                            /*
                            if(item.rows.item(0).SELECCIONAR_BANCO == 0){
                                //$('#selecBanco').val(item.rows.item(0).Codigo_Banco)
                                $('#selecBanco').selectmenu('disable');
                                $('#selecBanco').selectmenu('refresh');
                            }
                            else{*/
                                $('#selecBanco').selectmenu('enable');
                                $('#selecBanco').selectmenu('refresh');
                        //	}
                        })
                    });

                    // Valida que inputs de kilometraje no superen 7 digitos
                    $(".km_ingresado").on("input",function(){

                    console.log("Evento input Kilometraje!!");

                    if (this.value.length > this.maxLength){

                        this.value = this.value.slice(0, this.maxLength);

                    }

                    });



                    armarGruposFamiliasUI();

                }
            };

            function ocultarProductosEncontrados(){

                $(".producto-buscar").val("");
                $(".productos-encontrados").css("display","none");

            }
            function ConfigurarBuscadorProductos(){
                      // Ocultamos los contenedores de Productos en la pantalla de facturacion
                      $(".productos-encontrados").css("display","none");
                      $(".producto-buscar").on("keyup",buscarProducto);
                      $(".producto-buscar").on("click",function (e) { console.log("click..."); e.stopPropagation(); });
                      $(".producto-buscar").on("focus",function(){
                        console.log("focus...");
                        var elementoActual = $(this).attr("id");
                        var tamanio        = $("#" + elementoActual).val().length;
                        if(tamanio>=1){
                            $("#" + elementoActual).siblings('.productos-encontrados').css("display","block");
                        }
                      });
                      $(".producto-buscar").on('paste', function () {
                        var element = this;
                        setTimeout(function () {
                          var elementoActual = $(element).attr("id");
                          ejecutarBusqueda(elementoActual);
                        }, 100);
                      });


                    $(".listapedidocollapse").on("click",function(){
                       $(this).find("input").keyup();;
                    });

            }

            function armarGruposFamiliasUI(){

                db_smart_sales.metodos.obtenerGruposyFamilias(function(item){

                    if(item.rows.length > 0 ){
                        // Llenamos el data
                        var codigoGrupoAnterior = item.rows.item(0).codigoGrupo;
                        var listaGrupos = [];
                        listaGrupos.push({
                            'codigoGrupo'      : item.rows.item(0).codigoGrupo,
                            'descripcionGrupo' : item.rows.item(0).descripcionGrupo,
                            'listaFamilias'    : []
                        });
                        for (var i = 0; i < item.rows.length; i++) {

                            if(codigoGrupoAnterior == item.rows.item(i).codigoGrupo ){
                                // Insertamos familia a ese grupo
                                listaGrupos[listaGrupos.length - 1].listaFamilias.push({
                                    'codigoFamilia'      : item.rows.item(i).codigoFamilia,
                                    'descripcionFamilia' : item.rows.item(i).descripcionFamilia
                                });
                            }
                            else{
                                // Insertamos otro grupo
                                listaGrupos.push({
                                    'codigoGrupo'      : item.rows.item(i).codigoGrupo,
                                    'descripcionGrupo' : item.rows.item(i).descripcionGrupo,
                                    'listaFamilias'    : []
                                });
                                listaGrupos[listaGrupos.length - 1].listaFamilias.push({
                                    'codigoFamilia'      : item.rows.item(i).codigoFamilia,
                                    'descripcionFamilia' : item.rows.item(i).descripcionFamilia
                                });
                            }
                            // Actualizamos grupo anterior
                            codigoGrupoAnterior = item.rows.item(i).codigoGrupo;

                        }
                        console.log(listaGrupos);
                        // Armamos la UI
                        var htmlGruposPedidos      = "";
                        var htmlGruposCambios      = "";
                        var htmlGruposDevoluciones = "";
                        $(listaGrupos).each(function(i,item){
                            // Armamos los Pedidos
                            htmlGruposPedidos += "<br>";
                            htmlGruposPedidos += "<div data-role='collapsible' class='listapedidocollapse' data-theme='a'>";
                            htmlGruposPedidos += "     <h6>" + item.descripcionGrupo + "</h6>  ";
                            htmlGruposPedidos += "         <div data-role='collapsible-set'>   ";
                            $(item.listaFamilias).each(function(i,elemento){
                                htmlGruposPedidos += "         <div data-role='collapsible' class='listapedidocollapse' >  ";
                                htmlGruposPedidos += "             <h6>" + elemento.descripcionFamilia + "</h6>   ";
                                htmlGruposPedidos += "             <p id='lista" + elemento.codigoFamilia + "pedido'>";
                                htmlGruposPedidos += "             <div class='buscador-productos'>";
                                htmlGruposPedidos += "                 <input id='" + elemento.codigoFamilia + "-buscar-pedido' class='" + elemento.codigoFamilia + "-buscar producto-buscar' type='text' placeholder='Filtrar  " + elemento.descripcionFamilia + "'/>";
                                htmlGruposPedidos += "                 <ul class='productos-encontrados'></ul>  ";
                                htmlGruposPedidos += "             </div>  ";
                                htmlGruposPedidos += "             </p>  ";
                                htmlGruposPedidos += "         </div>  ";
                            });
                            htmlGruposPedidos += "         </div>   ";
                            htmlGruposPedidos += "</div>   ";
                            // Armamos los Cambios
                            htmlGruposCambios += "<br>";
                            htmlGruposCambios += "<div data-role='collapsible' class='listapedidocollapse' data-theme='a'>";
                            htmlGruposCambios += "     <h6>" + item.descripcionGrupo + "</h6>  ";
                            htmlGruposCambios += "         <div data-role='collapsible-set'>   ";
                            $(item.listaFamilias).each(function(i,elemento){
                                htmlGruposCambios += "         <div data-role='collapsible' class='listapedidocollapse' >  ";
                                htmlGruposCambios += "             <h6>" + elemento.descripcionFamilia + "</h6>   ";
                                htmlGruposCambios += "             <p id='lista" + elemento.codigoFamilia + "cambio'>";
                                htmlGruposCambios += "             <div class='buscador-productos'>";
                                htmlGruposCambios += "                 <input id='" + elemento.codigoFamilia + "-buscar-cambio' class='" + elemento.codigoFamilia + "-buscar producto-buscar' type='text' placeholder='Filtrar  " + elemento.descripcionFamilia + "'/>";
                                htmlGruposCambios += "                 <ul class='productos-encontrados'></ul>  ";
                                htmlGruposCambios += "             </div>  ";
                                htmlGruposCambios += "             </p>  ";
                                htmlGruposCambios += "         </div>  ";
                            });
                            htmlGruposCambios += "         </div>   ";
                            htmlGruposCambios += "</div>   ";
                            // Armamos las Devoluciones
                            htmlGruposDevoluciones += "<br>";
                            htmlGruposDevoluciones += "<div data-role='collapsible' class='listapedidocollapse' data-theme='a'>";
                            htmlGruposDevoluciones += "     <h6>" + item.descripcionGrupo + "</h6>  ";
                            htmlGruposDevoluciones += "         <div data-role='collapsible-set'>   ";
                            $(item.listaFamilias).each(function(i,elemento){
                                htmlGruposDevoluciones += "         <div data-role='collapsible' class='listapedidocollapse' >  ";
                                htmlGruposDevoluciones += "             <h6>" + elemento.descripcionFamilia + "</h6>   ";
                                htmlGruposDevoluciones += "             <p id='lista" + elemento.codigoFamilia + "devolucion'>";
                                htmlGruposDevoluciones += "             <div class='buscador-productos'>";
                                htmlGruposDevoluciones += "                 <input id='" + elemento.codigoFamilia + "-buscar-devolucion' class='" + elemento.codigoFamilia + "-buscar producto-buscar' type='text' placeholder='Filtrar  " + elemento.descripcionFamilia + "'/>";
                                htmlGruposDevoluciones += "                 <ul class='productos-encontrados'></ul>  ";
                                htmlGruposDevoluciones += "             </div>  ";
                                htmlGruposDevoluciones += "             </p>  ";
                                htmlGruposDevoluciones += "         </div>  ";
                            });
                            htmlGruposDevoluciones += "         </div>   ";
                            htmlGruposDevoluciones += "</div>   ";

                        });
                        $('#contenedorGruposPedidos').html(htmlGruposPedidos);
                        $('#contenedorGruposCambios').html(htmlGruposCambios);
                        $('#contenedorGruposDevoluciones').html(htmlGruposDevoluciones);
                        ConfigurarBuscadorProductos();
                    }else{
                        alert('No hay grupos de productos definidos');
                    }


                });

            }

            app.initialize();

