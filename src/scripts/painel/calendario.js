import { handleColaboradorHeader, supplierRouteProtection } from "../render.js";
import { handleCalendar } from "./render.js";

supplierRouteProtection('closed');
handleColaboradorHeader();
handleCalendar();