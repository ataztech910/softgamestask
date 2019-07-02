import { Application, ApplicationOptions, loader, Text } from 'pixi.js';
import CardsAnimation from './scenes/CardsAnimation';
import Menu from './scenes/Menu';
import GameConfiguration from './components/game.configuration';
import Tool from './scenes/ToolAnimation';
new class Main {
 
    app: Application;

    settings: ApplicationOptions = {
        backgroundColor: 0x595959,
        antialias: true
    };

    gamesSettings = {
        stageOne:{
            cardCount: 144
        },
        stageTwo:{
            elementsCount: 3
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
        //----------
        //TODO Organize this into extended method
        loader
            .add([
                this.configuration.assetsUrl+ '/smiles/' + 'smiles.png'
            ]);
        //-------------------    
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
        const toolContainer = new Tool(this.configuration.assetsUrl + '/smiles/',this.gamesSettings.stageTwo.elementsCount);
        toolContainer.load();
        this.app.stage.addChild(toolContainer.containers[0]);
        this.app.stage.addChild(toolContainer.containers[1]);
        this.app.stage.addChild(toolContainer.containers[2]);
        
        // setInterval(()=>{
        //     toolContainer.drawTools()
        // },2000);
        let currentTicker = 128;
        this.app.ticker.add(() => {
            toolContainer.drawTools(currentTicker);
            currentTicker--;
            if (currentTicker == 0) currentTicker = 128;
        });
        
        console.log('tool Game');
    }
    clearStage(){
        this.app.stage.removeChildren();
        this.generateMenu();
    }
    cardGameStart(){
        this.clearStage();
        const cardsContainer = new CardsAnimation(this.configuration.assetsUrl + '/cards/', this.gamesSettings.stageOne.cardCount);
        cardsContainer.load();
        this.app.stage.addChild(cardsContainer.container);
        let i = 0;
        let text = new Text('fps', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'left' });
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