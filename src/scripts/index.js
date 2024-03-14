import { handleCategoryFilters, handleFilterDisplay, handlePriceRange, handleSearchButtons, handleUFSelector, renderIndexCategories, renderPartnerList } from "./indexSearchRender.js";
import { handleIndexHeader, handleMobileDrag } from "./render.js";

handleIndexHeader();
renderIndexCategories();

handleUFSelector();
handlePriceRange();
handleCategoryFilters();
renderPartnerList();
handleSearchButtons();
handleFilterDisplay();
handleMobileDrag("#index__image__section");