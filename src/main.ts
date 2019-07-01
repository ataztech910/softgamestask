import { Application, ApplicationOptions } from 'pixi.js';
import CardsAnimation from './scenes/CardsAnimation';
import Menu from './scenes/Menu';
import GameConfiguration from './components/game.configuration';
new class Main {
 
    app: Application;

    settings: ApplicationOptions = {
        backgroundColor: 0x595959,
        antialias: true
    };

    gamesSettings = {
        stageOne:{
            cardCount: 144
        }
    };
    private currentState: string = 'cardgame';
    private configuration: GameConfiguration = new GameConfiguration(
        '/assets',
        [
            {
                title: 'Card Game',
                state: 'cardgame',
                changeState: () => this.changeMenuState('cardgame')    
            },
            {
                title: 'Tool Game',
                state: 'toolgame',
                changeState: () => this.changeMenuState('toolgame')
            }
        ]
    );

    constructor() {
        this.app = new Application(window.innerWidth, 2000, this.settings);
        document.body.appendChild(this.app.view);
        this.changeMenuState(this.currentState);
    }
    changeMenuState(context){
        this.setState(context);
        switch (this.currentState) {
            case 'cardgame':
                this.cardGameStart();
                break;
            case 'toolgame':
                this.toolGameStart();
                break;
            default: return null;
        }
    }
    generateMenu(){
        let menu = new Menu(this.configuration.menu, this.currentState);
        this.app.stage.addChild(menu.container);
    }
    setState(state){
        this.currentState = state;
    }
    toolGameStart() {
        this.clearStage();
        console.log('tool Game');
    }
    clearStage(){
        this.app.stage.removeChildren();
        this.generateMenu();
    }
    cardGameStart(){
        this.clearStage();
        const cardsContainer = new CardsAnimation(this.configuration.cardsUrl + '/cards/', this.gamesSettings.stageOne.cardCount);
        cardsContainer.load();
        this.app.stage.addChild(cardsContainer.container);
        let i = 0;
        let text = new PIXI.Text('fps', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'left' });
        this.app.stage.addChild(text);
        this.app.ticker.add(() => {
            text.text = 'FPS: ' + this.app.ticker.FPS.toString();
            if (i < cardsContainer.count && cardsContainer.container.children[i].x === cardsContainer.maxPosition) {
                i++;
            } else if (i === cardsContainer.count) {
                this.app.ticker.stop();
            }
            else cardsContainer.move(cardsContainer.container.children[i]);
        });
    }
}