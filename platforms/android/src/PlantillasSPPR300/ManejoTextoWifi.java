package PlantillasSPPR300;

public class ManejoTextoWifi {

	private final static int CARACTERES = 64; //48
	
	/**
	 * Rellena los espacios necesarios para alinear los item
	 * 
	 * @param item
	 * @param espacios
	 * @return
	 */
	public static String completarEspaciosIzq(String item, int espacios) {
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
	
	public static String completarEspaciosDer(String item, int espacios) {
		String itemN = item;
		String post = ".";

		if (item.length() < espacios) {
			for (int i = 0; i < espacios - item.length(); i++) {
				post += " ";
			}

			itemN = itemN + post.substring(1);
		}

		return itemN;
	}
	
	/**
	 * Centramos el texto horizontalmente en la hoja
	 * @param texto
	 * @return
	 */
	public static String centrarTexto( String texto){
		String text ="";
		int espacios = 0;
		
		if (texto.length() < CARACTERES) {
			espacios = (int)(CARACTERES - texto.length())/2;
			
			for (int i = 0; i < espacios; i++) {
				text += " ";
			}
			
		}
		
		return text + texto;
	}
}
