import { handleUsuarioHeader, userRouteProtection } from "../render.js";
import {
  handleCategoryFilters,
  handleSearchButtons,
  handlePriceRange,
  handleUFSelector,
  renderSupplierList,
} from "./render.js";

userRouteProtection("closed");
handleUsuarioHeader();

handleUFSelector();
handlePriceRange();
handleCategoryFilters();
renderSupplierList();
handleSearchButtons();
