import { handleParceiroHeader, partnerRouteProtection } from "../render.js";
import { handleCep, handleFileDrop, handleLabels, handleModalClick, handlePartnerForm } from "./render.js";


partnerRouteProtection("open");
handleParceiroHeader();
handleLabels(); 
handleFileDrop();
handlePartnerForm();
handleCep();
handleModalClick();