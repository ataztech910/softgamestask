import { Container, Texture, Sprite, loader, Text,BaseTexture, Rectangle } from 'pixi.js';
export default class Tool{
    elementsCount: number; 
    texture: string;
    containers:Array<Container> = [];
    private minCardWidth: number = 32;
    private minCardHeight: number = 32;
    private minCardX: number = -2;
    private minCardY: number = -2;
    private containerSize: number = 45;
    private possibleWords: Array<string> = ['Funny', 'Scary', 'Moody', 'Normal', 'Yahoo', 'Not matter', 'Use your imagination']
    private possibleX: Array<number> = [0, 61, 116];
    private possibleY: Array<number> = [0, 72, 165];
    constructor(texture: string, elementsCount: number){
        this.elementsCount = elementsCount;
        this.texture = texture;
    }
    load() {
        this.initContainers();
        this.drawTools();
    }
    initContainers() {
        for (let i = 0; i < 3; i++) {
            this.containers[i] = new Container();
        }
    }
    timer(currentTime: number){
        const time = currentTime === 128 ? true: false;
        return time;
    }
    drawTools(ticker: number = 128) {
        if (this.timer(ticker)){
            let delta = 0;
            [0,1,2].forEach(element => {
                this.containers[element].y = 100 + delta;
                this.containers[element].removeChildren();
                const currentElement = this.generateRandomIndex(1);
                switch (currentElement){
                    case 0: 
                        this.generateIcon(this.generateRandomIndex(this.possibleX.length), this.generateRandomIndex(this.possibleY.length), element);
                    break;
                    default:
                        this.generateText(this.generateRandomIndex(this.possibleWords.length - 1), element);    
                }
                delta += 100;
            });
        }
    }

    generateRandomIndex(limit: number){
        return Math.floor(Math.random() * (limit + 1));
    }

    generateIcon(x: number, y: number, containerIndex: number){
        const card = new Sprite(this.doFramefromTile(this.texture + 'smiles.png', this.possibleX[x], this.possibleY[y], this.containerSize, this.containerSize));
        card.width = this.minCardWidth;
        card.height = this.minCardHeight;
        card.anchor.set(this.minCardX, this.minCardY );
        this.containers[containerIndex].addChild(card);
    }

    generateText(index, containerIndex){
        const fontSize = this.generateRandomIndex(40);
        const text = new Text(this.possibleWords[index], { fontFamily: 'Arial', fontSize: fontSize >10  ? fontSize : 24, fill: 0xff1010, align: 'left' });
        text.x = 100;
        text.y = 70;
        this.containers[containerIndex].addChild(text);
    }

    doFramefromTile(source: string | Texture, x: number, y: number, width: number, height: number){
        let texture, imageFrame;
        const base = BaseTexture.fromImage(loader.resources[source.toString()].url);
        imageFrame = new Rectangle(x, y, width, height);
        texture = new Texture(base, imageFrame);
        return texture;
    }
}