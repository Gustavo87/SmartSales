package PlantillasSPPR300;


import org.json.JSONArray;
import org.json.JSONObject;

import static PlantillasSPPR300.ManejoTextoWifi.completarEspaciosDer;
import static PlantillasSPPR300.ManejoTextoWifi.completarEspaciosIzq;

public class PlantillaDOCENTREGA {

    String codigoCliente;
    String cliente;
    String rucCliente;
    String fecha;
    String pedido;
    String ruta;
    String hora;
    String subTotal;
    String IVA;
    String total;
    private JSONArray detalle = null;

    public String getCodigoCliente() {
        return codigoCliente;
    }

    public void setCodigoCliente(String codigoCliente) {
        this.codigoCliente = codigoCliente;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getRucCliente() {
        return rucCliente;
    }

    public void setRucCliente(String rucCliente) {
        this.rucCliente = rucCliente;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getPedido() {
        return pedido;
    }

    public void setPedido(String pedido) {
        this.pedido = pedido;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(String subTotal) {
        this.subTotal = subTotal;
    }

    public String getIVA() {
        return IVA;
    }

    public void setIVA(String IVA) {
        this.IVA = IVA;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public JSONArray getDetalle() {
        return detalle;
    }

    public void setDetalle(JSONArray detalle) {
        this.detalle = detalle;
    }

    private StringBuilder documento;

    public String getDocEntrega() {
        documento = new StringBuilder();
        documento.append(construirDocumento());
        return documento.toString();
    }

    public String construirDocumento(){

        StringBuilder documentoObj = new StringBuilder();

        documentoObj.append("\n");


        documentoObj.append(ManejoTextoWifi.centrarTexto("------------- Proforma -------------")+"\n\n");

        documentoObj.append("Codigo    : " + codigoCliente + completarEspaciosIzq("Ruta: "+ ruta, 25) + "\n");
        documentoObj.append("Cliente   : " + cliente + "\n");
        documentoObj.append("RUC #     : " + rucCliente + "\n");
        documentoObj.append("Fecha     : " + fecha + completarEspaciosIzq("Hora: "+ hora,24) + "\n");
        documentoObj.append("Pedido  # : " + pedido + "\n");
        documentoObj.append("\n\n");

        documentoObj.append("PRODUCTO        CJ      UND        P.UND             TOTAL");

        documentoObj.append("\n\n");
        documentoObj.append(this.generarDetalle());
        documentoObj.append("\n");
        documentoObj.append("                                SUBTOTAL C$   "+ completarEspaciosIzq(subTotal, 13) + "\n");
        documentoObj.append("                                   I.V.A C$   "+ completarEspaciosIzq(IVA, 13) + "\n");
        documentoObj.append("                                   TOTAL C$   "+ completarEspaciosIzq(total, 13));
        documentoObj.append("\n\n\n" + "Nota: Este documento no es valido como factura");
        documentoObj.append("\n\n\n\n");
        documentoObj.append("\n\n\n");

        return documentoObj.toString();

    }

    public String generarDetalle() {
        String linea = "";
        String detalleDoc = "";
        JSONObject jsonObj = null;
        String codProd, prod, caj, bot, pbot, tot;

        if (this.detalle != null) {
            for (int i = 0; i < detalle.length(); i++){
                jsonObj = detalle.optJSONObject(i);

                codProd = jsonObj.optString("codigoProducto");
                prod = jsonObj.optString("producto");
                caj = jsonObj.optString("CAJ");
                bot = jsonObj.optString("BOT");
                pbot = jsonObj.optString("PBOT");
                tot = jsonObj.optString("total");

                if (codProd != "null" && prod != "null" && caj != "null" && bot != "null" && pbot != "null" && tot != "null") {
                    linea = completarEspaciosDer(codProd, 13) + " " + prod + "\n"
                            + "         "
                            + completarEspaciosIzq(caj, 9) + "   "
                            + completarEspaciosIzq(bot, 5) + " "
                            + completarEspaciosIzq(pbot, 15) + " "
                            + completarEspaciosIzq(tot, 17) + "\n";

                    detalleDoc += linea;
                }
            }
            return detalleDoc;
        } else {
            return "             DETALLE DE PRODUCTOS N/D\n";
        }

    }

}
