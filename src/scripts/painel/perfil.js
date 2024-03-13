import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { renderProfile } from "./render.js";

partnerRouteProtection('closed');
handleParceiroHeader();
renderProfile();