import { MenuController } from "./controllers/MenuController.js";
import { MapsController } from "./controllers/MapsController.js";

const menu_c = new MenuController();

const mapsController = new MapsController(1); // TODO: check the given value
window.mapsController = mapsController;
mapsController.init();