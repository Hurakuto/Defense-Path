import { MenuController } from "./controllers/MenuController"
import { Path } from "./models/Path";

const menu_c = new MenuController();

const path = new Path()

path.drawPath(path.map1);
