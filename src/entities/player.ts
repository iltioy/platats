import CollisionBlock from "../levels/collisions/collisionBlock";
import Entity from "./entity";

class Player extends Entity {
    private lives;

    private coinsCount;

    private pickedCoins: any[];

    private collidedLevelChange: any[];

    private defaultCollisionBlocks;

    private levelChangeTypes;

    protected isInvinsible;

    constructor({
        position,
        collisionBlocks,
        imageSrc = "./src/assets/player/player.png",
        framerate,
        animationsNumber,
        gravity = 1,
    }: any) {
        super({
            position,
            collisionBlocks,
            imageSrc,
            framerate,
            animationsNumber,
            gravity,
            velocity: {
                x: 0,
                y: 1,
            },
            hitboxSettings: {
                offsetX: 58,
                offsetY: 34,
                width: 52,
                height: 82,
            },
            type: "player",
        });

        this.lives = 3;
        this.isInvinsible = false;
        this.coinsCount = 0;
        this.pickedCoins = [];

        this.collidedLevelChange = [];

        this.defaultCollisionBlocks = collisionBlocks;

        this.levelChangeTypes = [
            "level-change-bottom",
            "level-change-right",
            "level-change-left",
            "level-change-top",
        ];
    }

    public changeAnimation(type: string) {
        if (type === "idle" && this.velocity.y === 0 && this.velocity.x === 0) {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 0;
            } else {
                this.currentAnimation = 3;
            }
        } else if (type === "idle" && this.velocity.x !== 0) {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 1;
            } else {
                this.currentAnimation = 4;
            }
        }

        if (type === "run") {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 1;
            } else {
                this.currentAnimation = 4;
            }
        }

        if (type === "jump") {
            this.frameBuffer = 5;

            if (this.direction === "right") {
                this.currentAnimation = 2;
            } else {
                this.currentAnimation = 5;
            }
        }
    }

    public updateLevelEntities(entities: Entity[] = []) {
        if (this.isInvinsible) {
            this.collisionBlocks = this.defaultCollisionBlocks;
            return;
        }

        let newCollisions = [];
        // console.log(entities);

        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];

            let hitbox = entity.getHitbox();

            newCollisions.push(
                new CollisionBlock({
                    position: {
                        x: hitbox.position.x,
                        y: hitbox.position.y,
                    },
                    width: hitbox.width,
                    height: hitbox.height,
                    type: entity.getType(),
                    id: entity.getId(),
                })
            );
        }

        // console.log(newCollisions);

        this.collisionBlocks = [
            ...this.defaultCollisionBlocks,
            ...newCollisions,
        ];
    }

    protected onCollideVertically({ block }: any) {
        // console.log(this.isAvlive);
        super.onCollideVertically({ block });

        if (!block) return;

        if (block.type === "block") {
            this.changeAnimation("idle");
        }

        if (
            (block.type === "enemy" || block.type === "lava") &&
            !this.isInvinsible
        ) {
            this.handleLifeDrop();
        }

        if (block.type === "coin") {
            this.handleCoinPickUp(block.id);
        }

        if (this.levelChangeTypes.includes(block.type)) {
            this.collidedLevelChange.push(block.type);
        }

        console.log(this.lives);
    }

    protected onCollideHorizontally({ direction, block }: any) {
        super.onCollideHorizontally({ direction, block });

        if (!block) return;

        if (
            (block.type === "enemy" || block.type === "lava") &&
            !this.isInvinsible
        ) {
            this.handleLifeDrop();
        }

        if (block.type === "coin") {
            this.handleCoinPickUp(block.id);
        }

        if (this.levelChangeTypes.includes(block.type)) {
            this.collidedLevelChange.push(block.type);
        }
    }

    private handleLifeDrop() {
        // if (this.lives <= 0) return;

        this.isInvinsible = true;
        this.isAlfaBlinkEnabled = true;
        this.lives--;
        this.updateLevelEntities();

        setTimeout(() => {
            this.isInvinsible = false;
            this.isAlfaBlinkEnabled = false;
            this.globalAlfa = 1.0;
            this.updateLevelEntities();
        }, 3000);
    }

    private handleCoinPickUp(coinId: number) {
        if (this.pickedCoins.includes(coinId)) {
            return;
        }
        this.coinsCount++;
        this.pickedCoins.push(coinId);
        console.log(this.pickedCoins);
    }

    getPickedCoins() {
        return this.pickedCoins;
    }

    getCollidedLevelChange() {
        return this.collidedLevelChange;
    }

    setPosition(position: any) {
        this.position = position;
    }

    setDefaultCollisionBlocks(blocks: any) {
        this.defaultCollisionBlocks = blocks;
    }

    setCollidedLevelChange(collided: any) {
        this.collidedLevelChange = collided;
    }
}

export default Player;
