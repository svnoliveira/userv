import { handleColaboradorHeader, supplierRouteProtection } from "../render.js";
import { renderHistory } from "./render.js";

supplierRouteProtection('closed');
handleColaboradorHeader();
renderHistory();