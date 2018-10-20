package PlantillasSPPR300;

import android.util.Log;

public class PlantillaMinutaWifi {

	private String tituloMinuta = "N/D", minutaNumero = "N/D", fecha = "N/D", ruta = "N/D", hora = "N/D",
			totalEfectivoNIO = "N/D", totalChequeNIO = "N/D", totalEfectivoUS = "N/D", totalChequeUS = "N/D",banco="";
	
	/**
	 * @param banco the banco to set
	 */
	public void setBanco(String banco) {
		this.banco = banco;
	}
	
	private StringBuilder minutaDeposito;

	public PlantillaMinutaWifi() {

	}
		
	
	public String getMinutaDeposito() {
		minutaDeposito = new StringBuilder();

		minutaDeposito.append("\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(tituloMinuta + " # " + minutaNumero));
		//minutaDeposito.append("\n\n");
		minutaDeposito.append("\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(banco));
		minutaDeposito.append("\n");
		
		minutaDeposito.append("Fecha   :    " + fecha + "         Hora : " + hora + "\n");		
		minutaDeposito.append("Ruta    :    " + ruta);
		
		minutaDeposito.append("\n\n");
		
		minutaDeposito.append("C O R D O B A S - "+banco+"\n");
		
		minutaDeposito.append("Total Efectivo C$ :   " + completarEspaciosIzq(totalEfectivoNIO, 16) + "\n");
		minutaDeposito.append("Total Cheques  C$ :   " + completarEspaciosIzq(totalChequeNIO, 16));
		
		minutaDeposito.append("\n\n");
		minutaDeposito.append("D O L A R E S - "+banco+"\n");
		minutaDeposito.append("Total Efectivo US$:   " + completarEspaciosIzq(totalEfectivoUS, 16) + "\n");
		minutaDeposito.append("Total Cheques  US$:   " + completarEspaciosIzq(totalChequeUS, 16));
		
		
		minutaDeposito.append("\n\n\n");

		minutaDeposito.append(ManejoTextoWifi.centrarTexto("____________________________")+"\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto("Firma del Depositante")+"\n");
		minutaDeposito.append("\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(minutaNumero));
		minutaDeposito.append("\n\n\n");
		//minutaDeposito.append("{123456 \n\n\n");
		
		Log.i("RECIBOS", minutaDeposito.toString());
		
		return minutaDeposito.toString();
	}
	
	/**
	 * 
	 * @return
	 */
	public String getResumenDia() {
		minutaDeposito = new StringBuilder();

		minutaDeposito.append("\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(tituloMinuta)+"\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(fecha)+"\n");
		minutaDeposito.append("\n\n");
		
		minutaDeposito.append("Fecha   :    " + fecha + "         Hora : " + hora + "\n");		
		minutaDeposito.append("Ruta    :    " + ruta);
		
		minutaDeposito.append("\n\n");
		
		minutaDeposito.append("C O R D O B A S\n");
		
		minutaDeposito.append("Total Efectivo C$ :   " + completarEspaciosIzq(totalEfectivoNIO, 16) + "\n");
		minutaDeposito.append("Total Cheques  C$ :   " + completarEspaciosIzq(totalChequeNIO, 16));
		
		minutaDeposito.append("\n\n");
		minutaDeposito.append("D O L A R E S\n");
		minutaDeposito.append("Total Efectivo US$:   " + completarEspaciosIzq(totalEfectivoUS, 16) + "\n");
		minutaDeposito.append("Total Cheques  US$:   " + completarEspaciosIzq(totalChequeUS, 16));
			
		minutaDeposito.append("\n\n\n");		
		
		minutaDeposito.append("Nota: Este documento No reemplaza la minuta de deposito!!");
		minutaDeposito.append("\n\n\n");	
				
		
		return minutaDeposito.toString();
	}
	
	public void setTituloMinuta(String tituloMinuta) {
		this.tituloMinuta = tituloMinuta;
	}

	public void setMinutaNumero(String minutaNumero) {
		this.minutaNumero = minutaNumero;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public void setTotalEfectivoNIO(String totalEfectivoNIO) {
		this.totalEfectivoNIO = totalEfectivoNIO;
	}

	public void setTotalChequeNIO(String totalChequeNIO) {
		this.totalChequeNIO = totalChequeNIO;
	}

	public void setTotalEfectivoUS(String totalEfectivoUS) {
		this.totalEfectivoUS = totalEfectivoUS;
	}

	public void setTotalChequeUS(String totalChequeUS) {
		this.totalChequeUS = totalChequeUS;
	}

	/**
	 * Rellena los espacios necesarios para alinear los item
	 * 
	 * @param item
	 * @param espacios
	 * @return
	 */
	private String completarEspaciosIzq(String item, int espacios) {
		String itemN = item;
		String pre = ".";

		if (item.length() < espacios) {
			for (int i = 0; i < espacios - item.length(); i++) {
				pre += " ";
			}

			itemN = pre.substring(1) + itemN;
		}

		return itemN;
	}
	
}