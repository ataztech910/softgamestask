import { FX } from 'revolt-fx';
import { Container} from 'pixi.js';
export default class Flames{
    rfxBundleSettings: string = 'assets/fire/fire-bundle.json';
    rfxSpritesheet: string = 'assets/fire/revoltfx-spritesheet.json';
    fx: FX;
    maxX = window.innerWidth;
    maxY = window.innerHeight;
    container = new Container();
    constructor(){
        this.fx = new FX();             
    }
}