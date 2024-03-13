import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { handleCalendar } from "./render.js";

partnerRouteProtection('closed');
handleParceiroHeader();
handleCalendar();