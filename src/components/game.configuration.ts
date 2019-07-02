import Menu from "../scenes/Menu";
import MenuObject from "./menuobject";

export default class GameConfiguration{
    assetsUrl: string;
    menu: Array<MenuObject>;
    constructor(cardsUrl: string, menu: Array<MenuObject>){
        this.assetsUrl = cardsUrl;
        this.menu = menu;
    }
}