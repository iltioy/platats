import Coin from "./entities/coin";
import Player from "./entities/player";
import Level from "./levels/collisions/level";

interface GameTypes {
    level: Level;
}

class Game {
    private currentLevel;

    private keys;

    private player;

    constructor({ level }: GameTypes) {
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

        this.keys = {
            w: {
                pressed: false,
            },
            a: {
                pressed: false,
            },
            d: {
                pressed: false,
            },
        };

        this.currentLevel = level;
    }

    public render(c: CanvasRenderingContext2D) {
        // currentLevel.collisionBlocksPlayer.forEach((block) => {
        //     block.draw();
        // });
        this.handleLevelChange();
        this.currentLevel.getBackgroundImage().draw(c);

        this.player.setVelocityX(0);
        if (this.keys.d.pressed) {
            this.player.setVelocityX(5);
        } else if (this.keys.a.pressed) {
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

    setupEventListenders() {
        window.addEventListener("keydown", (event) => {
            console.log(event);
            switch (event.key) {
                case "w":
                    if (this.player.getVelocity().y === 0) {
                        this.player.changeAnimation("jump");
                        this.player.setVelocityY(-24);
                    }
                    break;
                case "a":
                    this.keys.a.pressed = true;
                    this.player.changeAnimation("run");
                    break;
                case "d":
                    this.keys.d.pressed = true;
                    this.player.changeAnimation("run");
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            console.log(event);
            switch (event.key) {
                case "a":
                    this.keys.a.pressed = false;
                    this.player.changeAnimation("idle");
                    break;
                case "d":
                    this.keys.d.pressed = false;
                    break;
            }
        });
    }
}

export default Game;
