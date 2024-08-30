import Entity from "./entity";

abstract class Enemy extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc,
        framerate,
        animationsNumber,
        frameBuffer,
        velocity,
        hitboxSettings,
        gravity = 1,
    }: any) {
        super({
            position,
            collisionBlocks,
            imageSrc,
            framerate,
            animationsNumber,
            gravity,
            type: "enemy",
            velocity,
            frameBuffer,
            hitboxSettings,
        });
    }

    protected onCollideHorizontally({ direction = "", block = null }) {
        super.onCollideHorizontally({ direction, block });

        if (!direction) return;
        if (direction === "right") {
            this.velocity.x = -1;
            this.changeAnimation("runLeft");
        } else if (direction === "left") {
            this.velocity.x = 1;
            this.changeAnimation("runRight");
        }
    }

    protected onCollideVertically({ block }: any) {
        super.onCollideVertically({ block });
    }

    protected abstract changeAnimation(type: string): void;
}

export default Enemy;
