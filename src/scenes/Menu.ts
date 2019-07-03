import { Container, Texture, Sprite } from 'pixi.js';
import MenuObject from '../components/menuobject';
export default class Menu {
    menu: Array<MenuObject>;
    container = new Container();
    currentMenu: string;
    regularColor = 0x808F85;
    selectedColor = 0xF2E9DC;
    constructor(menu: Array<MenuObject>, currentMenu: string){
        this.menu = menu;
        this.currentMenu = currentMenu;
        this.drawMenu();
    }
    drawMenu() {
        let i = 0;
        this.menu.forEach( element =>{
            let text = new PIXI.Text(element.title, { fontFamily: 'Arial', fontSize: 18, fill: element.state !== this.currentMenu ? this.regularColor : this.selectedColor, align: 'center' });    
            text.x = 17+i;
            text.y = 40;
            text.buttonMode = true;
            text.interactive = true;
            text.on('pointerdown', () => { element.changeState(element.state); });
            this.container.addChild(text);
            i+=110;
        });
    }
}   