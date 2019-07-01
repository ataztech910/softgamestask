import Menu from "../scenes/Menu";
import MenuObject from "./menuobject";

export default class GameConfiguration{
    cardsUrl: string;
    menu: Array<MenuObject>;
    constructor(cardsUrl: string, menu: Array<MenuObject>){
        this.cardsUrl = cardsUrl;
        this.menu = menu;
    }
}