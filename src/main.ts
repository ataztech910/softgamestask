import { Application, ApplicationOptions, loader, Text } from 'pixi.js';
import CardsAnimation from './scenes/CardsAnimation';
import Menu from './scenes/Menu';
import GameConfiguration from './components/game.configuration';
import Tool from './scenes/ToolAnimation';
import Flames from './scenes/Flames';
new class Main {
 
    app: Application;

    settings: ApplicationOptions = {
        backgroundColor: 0x595959,
        antialias: true
    };

    gamesSettings = {
        stageOne:{
            cardCount: 144,
            stateName: 'cardgame'
        },
        stageTwo:{
            elementsCount: 3,
            stateName: 'toolgame'
        },
        stageThree:{
            stateName: 'flames'
        }
    };
    
    private currentState: string = this.gamesSettings.stageOne.stateName;
    private configuration: GameConfiguration = new GameConfiguration(
        '/assets',
        [
            {
                title: 'Card Game',
                state: this.gamesSettings.stageOne.stateName,
                changeState: () => this.changeMenuState(this.gamesSettings.stageOne.stateName)    
            },
            {
                title: 'Tool Game',
                state: this.gamesSettings.stageTwo.stateName,
                changeState: () => this.changeMenuState(this.gamesSettings.stageTwo.stateName)
            },
            {
                title: 'Flames',
                state: this.gamesSettings.stageThree.stateName,
                changeState: () => this.changeMenuState(this.gamesSettings.stageThree.stateName)
            }
        ]
    );

    constructor() {
        this.app = new Application(window.innerWidth, 2000, this.settings);
        this.load();
        this.app.renderer.plugins.interaction.autoPreventDefault = false;
        this.app.renderer.view.style.touchAction = 'auto';
        document.body.appendChild(this.app.view);
        this.changeMenuState(this.currentState);
    }
    load(){
        loader
            .add([
                this.configuration.assetsUrl + '/smiles/' + 'smiles.png'
        ]);
    }
    changeMenuState(context: string){
        this.setState(context);
        switch (this.currentState) {
            case this.gamesSettings.stageOne.stateName:
                this.cardGameStart();
                break;
            case this.gamesSettings.stageTwo.stateName:
                this.toolGameStart();
                break;
            case this.gamesSettings.stageThree.stateName:
                this.flameParticles();
                break;
            default: return null;
        }
    }
    generateMenu(){
        let menu = new Menu(this.configuration.menu, this.currentState);
        this.app.stage.addChild(menu.container);
    }
    setState(state: string){
        this.currentState = state;
    }
    toolGameStart() {
        this.clearStage();
        const toolContainer = new Tool(this.configuration.assetsUrl + '/smiles/',this.gamesSettings.stageTwo.elementsCount);
        toolContainer.load();
        this.app.stage.addChild(toolContainer.containers[0]);
        this.app.stage.addChild(toolContainer.containers[1]);
        this.app.stage.addChild(toolContainer.containers[2]);
        
        let currentTicker = 128;
        this.app.ticker.add(() => {
            toolContainer.drawTools(currentTicker);
            currentTicker --;
            if (currentTicker == 0) currentTicker = 128;
        });
        console.log('tool Game');
    }
    flameParticles(){
        this.clearStage();
        const flames = new Flames();
        let app = this.app;
        flames.fx.loadBundleFiles(flames.rfxBundleSettings, flames.rfxSpritesheet, null, null).then(function (data) {
            var content = flames.container;
            app.stage.addChild(content);
            var emitter = flames.fx.getParticleEmitter('fire-arc');
            emitter.init(content, true, 1.5);
            app.ticker.add(function () {
                flames.fx.update();
            });
        }).catch(function (err) {
            console.log('Error', err);
        });
        console.log('flames');
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