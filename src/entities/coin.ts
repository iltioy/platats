import Entity from "./entity";

class Coin extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc = "./src/assets/coin/moneta.png",
        framerate,
        animationsNumber,
        id,
        gravity = 0,
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
                y: 0,
            },
            hitboxSettings: {
                offsetX: 10,
                offsetY: 6,
                width: 40,
                height: 55,
            },
            type: "coin",
            id,
        });

        this.frameBuffer = 20;
    }

    protected changeAnimation(type: string): void {}
}

export default Coin;
