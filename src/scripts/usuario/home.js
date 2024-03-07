import { handleUsuarioHeader, userRouteProtection } from "../render.js";
import {
  handleCategoryFilters,
  handlePriceRange,
  handleUFSelector,
} from "./render.js";

userRouteProtection("closed");
handleUsuarioHeader();

handleUFSelector();
handlePriceRange();
handleCategoryFilters();
