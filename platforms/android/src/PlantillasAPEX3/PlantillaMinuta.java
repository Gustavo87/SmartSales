package PlantillasAPEX3;

import android.util.Log;

public class PlantillaMinuta {

	private String tituloMinuta = "N/D", minutaNumero = "N/D", fecha = "N/D", ruta = "N/D", hora = "N/D",
			totalEfectivoNIO = "N/D", totalChequeNIO = "N/D", totalEfectivoUS = "N/D", totalChequeUS = "N/D",
			banco = "";
		
	
	/**
	 * @param banco the banco to set
	 */
	public void setBanco(String banco) {
		this.banco = banco;
	}

	private StringBuilder minutaDeposito;

	public PlantillaMinuta() {

	}
	
	public String getMinutaDeposito() {
		minutaDeposito = new StringBuilder();

		minutaDeposito.append("J4");
		minutaDeposito.append("           U1" + tituloMinuta + " # " + minutaNumero + "U0\n");
		minutaDeposito.append("                     U1" + banco  + "U0");
		minutaDeposito.append("J8");
		minutaDeposito.append("U1FechaU0   :    " + fecha + "            U1HoraU0: " + hora + "\n");
		minutaDeposito.append("U1RutaU0    :    " + ruta);
		minutaDeposito.append("J8");
		minutaDeposito.append("U1UUC O R D O B A S - "+banco+"UuU0                   \n");
		minutaDeposito.append("U1Total Efectivo C$U0 :   " + completarEspaciosIzq(totalEfectivoNIO, 16) + "\n");
		minutaDeposito.append("U1Total Cheques  C$U0 :   " + completarEspaciosIzq(totalChequeNIO, 16));
		minutaDeposito.append("J4");
		minutaDeposito.append("U1UUD O L A R E S - "+banco+"UuU0                   \n");
		minutaDeposito.append("U1Total Efectivo US$U0:   " + completarEspaciosIzq(totalEfectivoUS, 16) + "\n");
		minutaDeposito.append("U1Total Cheques  US$U0:   " + completarEspaciosIzq(totalChequeUS, 16));
		minutaDeposito.append("J8 J8 J2");
		minutaDeposito.append("               ____________________________\n");
		minutaDeposito.append("                   Firma del Depositante");
		minutaDeposito.append("J4");
		minutaDeposito.append("Z1<" + minutaNumero);
		minutaDeposito.append("J8 J8 J8 J2");
		
		Log.i("RECIBOS", minutaDeposito.toString());
		
		return minutaDeposito.toString();
	}
	
	/**
	 * 
	 * @return
	 */
	public String getResumenDia() {
		minutaDeposito = new StringBuilder();

		minutaDeposito.append("J4");
		minutaDeposito.append("           U1" + tituloMinuta +"U0 \n");
		minutaDeposito.append("                    "+fecha+"\n");
		minutaDeposito.append("J8");
		minutaDeposito.append("U1FechaU0   :    " + fecha + "            U1HoraU0: " + hora + "\n");
		minutaDeposito.append("U1RutaU0    :    " + ruta);
		minutaDeposito.append("J8");
		minutaDeposito.append("U1UUC O R D O B A SUuU0                   \n");
		minutaDeposito.append("U1Total Efectivo C$U0 :   " + completarEspaciosIzq(totalEfectivoNIO, 16) + "\n");
		minutaDeposito.append("U1Total Cheques  C$U0 :   " + completarEspaciosIzq(totalChequeNIO, 16));
		minutaDeposito.append("J4");
		minutaDeposito.append("U1UUD O L A R E SUuU0                   \n");
		minutaDeposito.append("U1Total Efectivo US$U0:   " + completarEspaciosIzq(totalEfectivoUS, 16) + "\n");
		minutaDeposito.append("U1Total Cheques  US$U0:   " + completarEspaciosIzq(totalChequeUS, 16));
		minutaDeposito.append("J8 J8 J2");
		minutaDeposito.append("Nota: Este documento No reemplaza la minuta de deposito!!");
		minutaDeposito.append("J8 J8 J8 J2");
		
		Log.i("RECIBOS", minutaDeposito.toString());
		
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