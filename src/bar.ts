import Sprite from "./entities/sprite/sprite";

class Bar extends Sprite {
    private type;

    constructor({ position, imageSrc, type, framerate = 1 }: any) {
        super({
            position,
            imageSrc,
            framerate,
        });

        this.type = type;
        this.frameBuffer = 100000000000;
    }

    draw(c: CanvasRenderingContext2D, data: number) {
        super.draw(c);

        if (this.type === "heart") {
            c.fillStyle = "red";
            c.font = "bold 67px Courier";
            c.fillText(String(data), 50, 95);
        }

        if (this.type === "coin") {
            c.fillStyle = "yellow";
            c.font = "bold 67px Courier";
            c.fillText(String(data), 210, 95);
        }
    }
}

export default Bar;
