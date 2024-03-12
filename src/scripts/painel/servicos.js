import { handleColaboradorHeader, supplierRouteProtection } from "../render.js";
import { renderServices } from "./render.js";

supplierRouteProtection('closed');
handleColaboradorHeader();
renderServices();