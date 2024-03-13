import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { renderHistory } from "./render.js";

partnerRouteProtection('closed');
handleParceiroHeader();
renderHistory();