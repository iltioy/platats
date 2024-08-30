import Bar from "./bar";
import Coin from "./entities/coin";
import Player from "./entities/player";
import Sprite from "./entities/sprite/sprite";
import InputHandler from "./inputhandler";
// import CollisionBlock from "./levels/collisions/collisionBlock";
import Level from "./levels/collisions/level";
import { createDefaultLevel, createDefaultPlayer } from "./maps";

interface GameTypes {
    level: Level;
    startSceneSprite: Sprite;
    deathSceneSprite: Sprite;
}

class Game {
    private currentLevel;

    private isRestart;

    private player;

    private inputHandler;

    private startSceneSprite;

    private deathSceneSprite;

    private scene;

    private healthBar;

    private coinBar;

    constructor({ level, startSceneSprite, deathSceneSprite }: GameTypes) {
        this.player = new Player({
            position: {
                x: level.getPlayerPosition().x,
                y: level.getPlayerPosition().y,
            },
            collisionBlocks: level.getCollisionBlocksPlayer(),
            framerate: 7,
            animationsNumber: 6,
            gravity: 0.8,
        });

        this.inputHandler = new InputHandler();
        this.inputHandler.setupPlayerListenders(this.player);
        this.inputHandler.setupGameListeners(this);

        this.currentLevel = level;

        this.isRestart = false;

        this.scene = "start";

        this.startSceneSprite = startSceneSprite;

        this.deathSceneSprite = deathSceneSprite;

        this.healthBar = new Bar({
            position: {
                x: 100,
                y: 40,
            },
            imageSrc: "./src/assets/heart.png",
            type: "heart",
        });

        this.coinBar = new Bar({
            position: {
                x: 260,
                y: 40,
            },
            imageSrc: "./src/assets/coin/moneta.png",
            framerate: 5,
            type: "coin",
        });
    }

    public render(c: CanvasRenderingContext2D) {
        if (this.scene === "start") {
            this.renderStartScreenScene(c);
        } else if (this.scene === "main") {
            this.renderMainScene(c);
        } else if (this.scene === "died") {
            this.renderDieScene(c);
        }
    }

    private renderStartScreenScene(c: CanvasRenderingContext2D) {
        this.startSceneSprite.draw(c);
    }

    private renderDieScene(c: CanvasRenderingContext2D) {
        this.deathSceneSprite.draw(c);
    }

    private renderMainScene(c: CanvasRenderingContext2D) {
        this.handleLevelChange();
        this.currentLevel.getBackgroundImage().draw(c);

        this.player.setVelocityX(0);
        if (this.inputHandler.keys.d.pressed) {
            this.player.setVelocityX(5);
        } else if (this.inputHandler.keys.a.pressed) {
            this.player.setVelocityX(-5);
        }

        for (let i = 0; i < this.currentLevel.getEntities().length; i++) {
            let entity = this.currentLevel.getEntities()[i];

            if (entity instanceof Coin) {
                if (!this.player.getPickedCoins().includes(entity.getId())) {
                    entity.update(c);
                    entity.draw(c);
                }
                continue;
            }
            entity.draw(c);
            entity.update(c);
        }

        this.player.updateLevelEntities(this.currentLevel.getEntities());
        this.player.draw(c);
        this.player.update(c);

        if (this.player.getLives() <= 0) {
            this.scene = "died";
        }

        this.healthBar.draw(c, this.player.getLives());
        this.coinBar.draw(c, this.player.getCoinsNumber());
    }

    public handleContinue() {
        if (this.scene === "start") {
            this.scene = "main";
        } else if (this.scene === "died") {
            this.isRestart = true;
        }
    }

    public handleBack() {
        if (this.scene === "died") {
            this.scene = "main";
            this.currentLevel = createDefaultLevel();
            this.player = createDefaultPlayer(this.currentLevel);
            this.isRestart = true;
        }
    }

    handleLevelChange() {
        if (this.player.getCollidedLevelChange().length !== 0) {
            console.log("sdfsdf");

            let level: string = this.player.getCollidedLevelChange()[0];
            console.log(level);

            if (
                this.currentLevel &&
                this.currentLevel.getLevelMap() &&
                this.currentLevel.getLevelMap()[level]
            ) {
                console.log("veve");

                this.currentLevel = this.currentLevel.getLevelMap()[level];
                console.log("CURE", this.currentLevel);

                this.player.setPosition(this.currentLevel.getPlayerPosition());
                this.player.setDefaultCollisionBlocks(
                    this.currentLevel.getCollisionBlocksPlayer()
                );
            }

            this.player.setCollidedLevelChange([]);
        }
    }

    public getRestart() {
        return this.isRestart;
    }
}

export default Game;
