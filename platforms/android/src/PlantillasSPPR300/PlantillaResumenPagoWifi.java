package PlantillasSPPR300;

import android.util.Log;

public class PlantillaResumenPagoWifi {

	private String tituloMinuta = "N/D", 
					minutaNumero = "N/D", 
					fecha = "N/D", 
					ruta = "N/D", 
					hora = "N/D",
					totalEfectivoNIO = "N/D", 
					totalChequeNIO = "N/D", 
					totalTarjetaNIO = "N/D",
					totalMinutaNIO = "N/D",
							totalMinutaBACNIO = "N/D", 
							totalMinutaBDFNIO = "N/D",
							totalMinutaBANPRONIO = "N/D",
							totalMinutaLAFISENIO = "N/D",
							totalMinutaCITINIO = "N/D",
							totalMinutaPROCREDITNIO = "N/D",
							totalMinutaBCENTRALNIO = "N/D",
							
					totalEfectivoUS = "N/D", 
					totalChequeUS = "N/D",
					totalTarjetaUS = "N/D",
					totalMinutaUS = "N/D",
							totalMinutaBACUS = "N/D", 
							totalMinutaBDFUS = "N/D",
							totalMinutaBANPROUS = "N/D",
							totalMinutaLAFISEUS = "N/D",
							totalMinutaCITIUS = "N/D",
							totalMinutaPROCREDITUS = "N/D",
							totalMinutaBCENTRALUS = "N/D";
	
	private StringBuilder minutaDeposito;

	public PlantillaResumenPagoWifi() {

	}
	
	public String getMinutaDeposito() {
		minutaDeposito = new StringBuilder();

		minutaDeposito.append("\n");
		minutaDeposito.append("           " + tituloMinuta + " # " + minutaNumero + "");
		minutaDeposito.append("\n\n");
		minutaDeposito.append("Fecha   :    " + fecha + "            Hora: " + hora + "\n");
		minutaDeposito.append("Ruta    :    " + ruta);
		minutaDeposito.append("\n\n");
		minutaDeposito.append("C O R D O B A S                   \n");
		minutaDeposito.append("Total Efectivo C$ :   " + completarEspaciosIzq(totalEfectivoNIO, 16) + "\n");
		minutaDeposito.append("Total Cheques  C$ :   " + completarEspaciosIzq(totalChequeNIO, 16));
		minutaDeposito.append("\n");
		minutaDeposito.append("D O L A R E S                   \n");
		minutaDeposito.append("Total Efectivo US$:   " + completarEspaciosIzq(totalEfectivoUS, 16) + "\n");
		minutaDeposito.append("Total Cheques  US$:   " + completarEspaciosIzq(totalChequeUS, 16));
		minutaDeposito.append("\n\n \n\n ");
		minutaDeposito.append("               ____________________________\n");
		minutaDeposito.append("                   Firma del Depositante");
		minutaDeposito.append("\n");
		minutaDeposito.append("Z1<" + minutaNumero);
		minutaDeposito.append("\n\n \n\n \n\n ");
		
		Log.i("RECIBOS", minutaDeposito.toString());
		
		return minutaDeposito.toString();
	}
	
	
	public String getResumenPago() {
		minutaDeposito = new StringBuilder();

		/*fecha = "13/09/2014";
		ruta = "T06";
		*/
		
		minutaDeposito.append("\n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(tituloMinuta) + " \n");
		minutaDeposito.append(ManejoTextoWifi.centrarTexto(minutaNumero)+"\n");
		minutaDeposito.append("\n\n");
		minutaDeposito.append("Fecha   :    " + fecha + "          Hora: " + hora + "\n");
		minutaDeposito.append("Ruta    :    " + ruta);
		minutaDeposito.append("\n\n");
		minutaDeposito.append("C O R D O B A S                   \n");
		minutaDeposito.append("Total Efectivo           C$ :  " + completarEspaciosIzq(totalEfectivoNIO, 10) + "\n");
		minutaDeposito.append("Total Cheques            C$ :  " + completarEspaciosIzq(totalChequeNIO, 10)+ "\n");
		minutaDeposito.append("Tarjeta  Credito/Debito  C$ :  " + completarEspaciosIzq(totalTarjetaNIO, 10)+ "\n");
		minutaDeposito.append("Minuta Deposito          C$ :  " + completarEspaciosIzq(totalMinutaNIO, 10)+ "\n");
		
		minutaDeposito.append(" - BAC            C$:   " + completarEspaciosIzq(totalMinutaBACNIO, 5)+ "\n");
		minutaDeposito.append(" - BDF            C$:   " + completarEspaciosIzq(totalMinutaBDFNIO, 5)+ "\n");
		minutaDeposito.append(" - BANPRO         C$:   " + completarEspaciosIzq(totalMinutaBANPRONIO, 5)+ "\n");
		minutaDeposito.append(" - LAFISE         C$:   " + completarEspaciosIzq(totalMinutaLAFISENIO, 5)+ "\n");
		minutaDeposito.append(" - CITI           C$:   " + completarEspaciosIzq(totalMinutaCITINIO, 5)+ "\n");
		minutaDeposito.append(" - PROCREDIT      C$:   " + completarEspaciosIzq(totalMinutaPROCREDITNIO, 5)+ "\n");
		minutaDeposito.append(" - BANCO CENTRAL  C$:   " + completarEspaciosIzq(totalMinutaBCENTRALNIO, 5)+ "\n");
		
		minutaDeposito.append("\n");
		minutaDeposito.append("D O L A R E S                   \n");
		minutaDeposito.append("Total Efectivo          US$ :  " + completarEspaciosIzq(totalEfectivoUS, 10) + "\n");
		minutaDeposito.append("Total Cheques           US$ :  " + completarEspaciosIzq(totalChequeUS, 10)+ "\n");
		minutaDeposito.append("Tarjeta  Credito/Debito US$:   " + completarEspaciosIzq(totalTarjetaUS, 10)+ "\n");
		minutaDeposito.append("Minuta Deposito         US$ :  " + completarEspaciosIzq(totalMinutaUS, 10)+ "\n");
		
		minutaDeposito.append(" - BAC           US$:   " + completarEspaciosIzq(totalMinutaBACUS, 5)+ "\n");
		minutaDeposito.append(" - BDF           US$:   " + completarEspaciosIzq(totalMinutaBDFUS, 5)+ "\n");
		minutaDeposito.append(" - BANPRO        US$:   " + completarEspaciosIzq(totalMinutaBANPROUS, 5)+ "\n");
		minutaDeposito.append(" - LAFISE        US$:   " + completarEspaciosIzq(totalMinutaLAFISEUS, 5)+ "\n");
		minutaDeposito.append(" - CITI          US$:   " + completarEspaciosIzq(totalMinutaCITIUS, 5)+ "\n");
		minutaDeposito.append(" - PROCREDIT     US$:   " + completarEspaciosIzq(totalMinutaPROCREDITUS, 5)+ "\n");
		minutaDeposito.append(" - BANCO CENTRAL US$:   " + completarEspaciosIzq(totalMinutaBCENTRALUS, 5));
		
		minutaDeposito.append("\n\n ");	
		minutaDeposito.append("\n");
		minutaDeposito.append("Nota: Este documento No reemplaza la minuta de deposito!!");
		minutaDeposito.append("\n\n\n");
		
		//Log.i("RECIBOS", minutaDeposito.toString());
		
		return minutaDeposito.toString();
	}
	
	
	
	
	/**
	 * @return the totalTarjetaNIO
	 */
	public String getTotalTarjetaNIO() {
		return totalTarjetaNIO;
	}

	/**
	 * @param totalTarjetaNIO the totalTarjetaNIO to set
	 */
	public void setTotalTarjetaNIO(String totalTarjetaNIO) {
		this.totalTarjetaNIO = totalTarjetaNIO;
	}

	public void setTotalTarjetaUS(String totalTarjetaUS) {
		this.totalTarjetaUS = totalTarjetaUS;
	}
	
	/**
	 * @return the totalMinutaNIO
	 */
	public String getTotalMinutaNIO() {
		return totalMinutaNIO;
	}

	/**
	 * @param totalMinutaNIO the totalMinutaNIO to set
	 */
	public void setTotalMinutaNIO(String totalMinutaNIO) {
		this.totalMinutaNIO = totalMinutaNIO;
	}

	/**
	 * @return the totalMinutaBACNIO
	 */
	public String getTotalMinutaBACNIO() {
		return totalMinutaBACNIO;
	}

	/**
	 * @param totalMinutaBACNIO the totalMinutaBACNIO to set
	 */
	public void setTotalMinutaBACNIO(String totalMinutaBACNIO) {
		this.totalMinutaBACNIO = totalMinutaBACNIO;
	}

	/**
	 * @return the totalMinutaBDFNIO
	 */
	public String getTotalMinutaBDFNIO() {
		return totalMinutaBDFNIO;
	}

	/**
	 * @param totalMinutaBDFNIO the totalMinutaBDFNIO to set
	 */
	public void setTotalMinutaBDFNIO(String totalMinutaBDFNIO) {
		this.totalMinutaBDFNIO = totalMinutaBDFNIO;
	}

	/**
	 * @return the totalMinutaBANPRONIO
	 */
	public String getTotalMinutaBANPRONIO() {
		return totalMinutaBANPRONIO;
	}

	/**
	 * @param totalMinutaBANPRONIO the totalMinutaBANPRONIO to set
	 */
	public void setTotalMinutaBANPRONIO(String totalMinutaBANPRONIO) {
		this.totalMinutaBANPRONIO = totalMinutaBANPRONIO;
	}

	/**
	 * @return the totalMinutaLAFISENIO
	 */
	public String getTotalMinutaLAFISENIO() {
		return totalMinutaLAFISENIO;
	}

	/**
	 * @param totalMinutaLAFISENIO the totalMinutaLAFISENIO to set
	 */
	public void setTotalMinutaLAFISENIO(String totalMinutaLAFISENIO) {
		this.totalMinutaLAFISENIO = totalMinutaLAFISENIO;
	}

	/**
	 * @return the totalMinutaCITINIO
	 */
	public String getTotalMinutaCITINIO() {
		return totalMinutaCITINIO;
	}

	/**
	 * @param totalMinutaCITINIO the totalMinutaCITINIO to set
	 */
	public void setTotalMinutaCITINIO(String totalMinutaCITINIO) {
		this.totalMinutaCITINIO = totalMinutaCITINIO;
	}

	/**
	 * @return the totalMinutaPROCREDITNIO
	 */
	public String getTotalMinutaPROCREDITNIO() {
		return totalMinutaPROCREDITNIO;
	}

	/**
	 * @param totalMinutaPROCREDITNIO the totalMinutaPROCREDITNIO to set
	 */
	public void setTotalMinutaPROCREDITNIO(String totalMinutaPROCREDITNIO) {
		this.totalMinutaPROCREDITNIO = totalMinutaPROCREDITNIO;
	}

	/**
	 * @return the totalMinutaBCENTRALNIO
	 */
	public String getTotalMinutaBCENTRALNIO() {
		return totalMinutaBCENTRALNIO;
	}

	/**
	 * @param totalMinutaBCENTRALNIO the totalMinutaBCENTRALNIO to set
	 */
	public void setTotalMinutaBCENTRALNIO(String totalMinutaBCENTRALNIO) {
		this.totalMinutaBCENTRALNIO = totalMinutaBCENTRALNIO;
	}

	/**
	 * @return the totalMinutaUS
	 */
	public String getTotalMinutaUS() {
		return totalMinutaUS;
	}

	/**
	 * @param totalMinutaUS the totalMinutaUS to set
	 */
	public void setTotalMinutaUS(String totalMinutaUS) {
		this.totalMinutaUS = totalMinutaUS;
	}

	/**
	 * @return the totalMinutaBACUS
	 */
	public String getTotalMinutaBACUS() {
		return totalMinutaBACUS;
	}

	/**
	 * @param totalMinutaBACUS the totalMinutaBACUS to set
	 */
	public void setTotalMinutaBACUS(String totalMinutaBACUS) {
		this.totalMinutaBACUS = totalMinutaBACUS;
	}

	/**
	 * @return the totalMinutaBDFUS
	 */
	public String getTotalMinutaBDFUS() {
		return totalMinutaBDFUS;
	}

	/**
	 * @param totalMinutaBDFUS the totalMinutaBDFUS to set
	 */
	public void setTotalMinutaBDFUS(String totalMinutaBDFUS) {
		this.totalMinutaBDFUS = totalMinutaBDFUS;
	}

	/**
	 * @return the totalMinutaBANPROUS
	 */
	public String getTotalMinutaBANPROUS() {
		return totalMinutaBANPROUS;
	}

	/**
	 * @param totalMinutaBANPROUS the totalMinutaBANPROUS to set
	 */
	public void setTotalMinutaBANPROUS(String totalMinutaBANPROUS) {
		this.totalMinutaBANPROUS = totalMinutaBANPROUS;
	}

	/**
	 * @return the totalMinutaLAFISEUS
	 */
	public String getTotalMinutaLAFISEUS() {
		return totalMinutaLAFISEUS;
	}

	/**
	 * @param totalMinutaLAFISEUS the totalMinutaLAFISEUS to set
	 */
	public void setTotalMinutaLAFISEUS(String totalMinutaLAFISEUS) {
		this.totalMinutaLAFISEUS = totalMinutaLAFISEUS;
	}

	/**
	 * @return the totalMinutaCITIUS
	 */
	public String getTotalMinutaCITIUS() {
		return totalMinutaCITIUS;
	}

	/**
	 * @param totalMinutaCITIUS the totalMinutaCITIUS to set
	 */
	public void setTotalMinutaCITIUS(String totalMinutaCITIUS) {
		this.totalMinutaCITIUS = totalMinutaCITIUS;
	}

	/**
	 * @return the totalMinutaPROCREDITUS
	 */
	public String getTotalMinutaPROCREDITUS() {
		return totalMinutaPROCREDITUS;
	}

	/**
	 * @param totalMinutaPROCREDITUS the totalMinutaPROCREDITUS to set
	 */
	public void setTotalMinutaPROCREDITUS(String totalMinutaPROCREDITUS) {
		this.totalMinutaPROCREDITUS = totalMinutaPROCREDITUS;
	}

	/**
	 * @return the totalMinutaBCENTRALUS
	 */
	public String getTotalMinutaBCENTRALUS() {
		return totalMinutaBCENTRALUS;
	}

	/**
	 * @param totalMinutaBCENTRALUS the totalMinutaBCENTRALUS to set
	 */
	public void setTotalMinutaBCENTRALUS(String totalMinutaBCENTRALUS) {
		this.totalMinutaBCENTRALUS = totalMinutaBCENTRALUS;
	}

	/**
	 * @return the tituloMinuta
	 */
	public String getTituloMinuta() {
		return tituloMinuta;
	}

	/**
	 * @return the minutaNumero
	 */
	public String getMinutaNumero() {
		return minutaNumero;
	}

	/**
	 * @return the fecha
	 */
	public String getFecha() {
		return fecha;
	}

	/**
	 * @return the ruta
	 */
	public String getRuta() {
		return ruta;
	}

	/**
	 * @return the hora
	 */
	public String getHora() {
		return hora;
	}

	/**
	 * @return the totalEfectivoNIO
	 */
	public String getTotalEfectivoNIO() {
		return totalEfectivoNIO;
	}

	/**
	 * @return the totalChequeNIO
	 */
	public String getTotalChequeNIO() {
		return totalChequeNIO;
	}

	/**
	 * @return the totalEfectivoUS
	 */
	public String getTotalEfectivoUS() {
		return totalEfectivoUS;
	}

	/**
	 * @return the totalChequeUS
	 */
	public String getTotalChequeUS() {
		return totalChequeUS;
	}

	/**
	 * @param minutaDeposito the minutaDeposito to set
	 */
	public void setMinutaDeposito(StringBuilder minutaDeposito) {
		this.minutaDeposito = minutaDeposito;
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