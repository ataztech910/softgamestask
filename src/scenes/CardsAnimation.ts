import { Container, Texture, Sprite  } from 'pixi.js';
export default class CardsAnimation{
    texture: string;
    count: number;
    container = new Container();
    maxCards: number = 51;
    maxPosition: number = 200;
    animationTime: number = 2;
    constructor(texture: string, count: number){
        this.texture = texture;
        this.count = count;
    }
    load(){
        this.drawCards();
    }
    drawCards(){
        let texture = null;
        let index = 0;
        for (let i = 1; i <= this.count; i++) {
            if (index === this.count) index = 0;
            index++;
            if (index > this.maxCards) {
                index = index - this.maxCards;
            }
            texture = Texture.from(this.texture + index+'.jpg');
            const card = new Sprite(texture);
            card.width = 100;
            card.height = 150;
            card.anchor.set(-0.15, -0.6);
            card.y = i  * 10;
            this.container.addChild(card);
        }
    }
    move(element){
        element.position.x += this.animationTime;
    }
}
