import { handleColaboradorHeader, supplierRouteProtection } from "../render.js";
import { handleCep, handleFileDrop, handleLabels, handleModalClick, handleSuplierForm } from "./render.js";


supplierRouteProtection("open");
handleColaboradorHeader();
handleLabels(); 
handleFileDrop();
handleSuplierForm();
handleCep();
handleModalClick();