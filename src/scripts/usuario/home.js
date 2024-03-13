import { handleUsuarioHeader, userRouteProtection } from "../render.js";
import {
  handleCategoryFilters,
  handleSearchButtons,
  handlePriceRange,
  handleUFSelector,
  renderPartnerList,
  handleFilterDisplay,
} from "./render.js";

userRouteProtection("closed");
handleUsuarioHeader();

handleUFSelector();
handlePriceRange();
handleCategoryFilters();
renderPartnerList();
handleSearchButtons();
handleFilterDisplay();