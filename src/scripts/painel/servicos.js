import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { renderServices } from "./render.js";

partnerRouteProtection('closed');
handleParceiroHeader();
renderServices();