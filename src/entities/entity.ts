import Sprite from "./sprite/sprite";

abstract class Entity extends Sprite {
    protected position;

    protected gravity;

    protected direction;

    protected hitboxSettings;

    protected velocity;

    protected type;

    protected hitbox: any;

    protected collisionBlocks;

    private id;

    constructor({
        position,
        collisionBlocks,
        imageSrc,
        framerate,
        animationsNumber,
        velocity,
        hitboxSettings,
        type = "none",
        frameBuffer = 5,
        gravity = 1,
        id = null,
    }: any) {
        super({ imageSrc, framerate, animationsNumber, frameBuffer });
        this.position = position;
        this.gravity = gravity;
        this.direction = "right";
        this.hitboxSettings = hitboxSettings;
        this.velocity = velocity;
        this.type = type;
        this.hitbox = null;
        this.id = id;

        this.collisionBlocks = collisionBlocks;
    }

    public update(c: CanvasRenderingContext2D | null) {
        this.position.x += this.velocity.x;

        if (this.velocity.x > 0) {
            this.direction = "right";
        } else if (this.velocity.x < 0) {
            this.direction = "left";
        }

        this.updateHitbox();
        this.checkForHorizontalCollisions();

        this.applyGravity();

        this.updateHitbox();

        this.checkForVerticalCollisions();

        /** see hitbox */
        // if (c) {
        //     c.fillStyle = "rgba(255,0,0,0.5)";
        //     c.fillRect(
        //         this.hitbox.position.x,
        //         this.hitbox.position.y,
        //         this.hitbox.width,
        //         this.hitbox.height
        //     );
        // }
    }

    private updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + this.hitboxSettings.offsetX,
                y: this.position.y + this.hitboxSettings.offsetY,
            },
            width: this.hitboxSettings.width,
            height: this.hitboxSettings.height,
        };
    }

    private applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    private checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < -0) {
                    this.onCollideHorizontally({
                        direction: "left",
                        block: collisionBlock,
                    });
                    break;
                }

                if (this.velocity.x > 0) {
                    this.onCollideHorizontally({
                        direction: "right",
                        block: collisionBlock,
                    });
                    break;
                }

                this.onCollideHorizontally({ block: collisionBlock });
            }
        }
    }

    private checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                this.onCollideVertically({ block: collisionBlock });
            }
        }
    }

    protected onCollideHorizontally({
        direction = "",
        block: collisionBlock,
    }: any) {
        if (!collisionBlock) return;

        if (collisionBlock.type === "block") {
            if (this.velocity.x < -0) {
                const offset = this.hitbox.position.x - this.position.x;
                this.position.x =
                    collisionBlock.position.x +
                    collisionBlock.width -
                    offset +
                    0.01;
            }

            if (this.velocity.x > 0) {
                const offset =
                    this.hitbox.position.x -
                    this.position.x +
                    this.hitbox.width;
                this.position.x = collisionBlock.position.x - offset - 0.01;
            }
        }
    }

    protected onCollideVertically({ block: collisionBlock }: any) {
        if (!collisionBlock) return;

        if (collisionBlock.type === "block") {
            if (this.velocity.y < 0) {
                this.velocity.y = 0;
                const offset = this.hitbox.position.y - this.position.y;
                this.position.y =
                    collisionBlock.position.y +
                    collisionBlock.height -
                    offset +
                    0.01;
            }

            if (this.velocity.y > 0) {
                this.velocity.y = 0;
                const offset =
                    this.hitbox.position.y -
                    this.position.y +
                    this.hitbox.height;
                this.position.y = collisionBlock.position.y - offset - 0.01;
            }
        }
    }

    protected abstract changeAnimation(type: string): void;

    public setVelocityX(value: number) {
        this.velocity.x = value;
    }

    public setVelocityY(value: number) {
        this.velocity.y = value;
    }

    public getVelocity() {
        return this.velocity;
    }

    public getHitbox() {
        return this.hitbox;
    }

    public getId() {
        return this.id;
    }

    public getType() {
        return this.type;
    }
}

export default Entity;
