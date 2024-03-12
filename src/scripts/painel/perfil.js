import { handleColaboradorHeader, supplierRouteProtection } from "../render.js";
import { renderProfile } from "./render.js";

supplierRouteProtection('closed');
handleColaboradorHeader();
renderProfile();