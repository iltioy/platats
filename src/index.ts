import Sprite from "./entities/sprite/sprite";
import Game from "./game";
import Level from "./levels/collisions/level";
import { createDefaultLevel } from "./maps/maps";

const startGame = (level1: Level) => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const c = canvas.getContext("2d");

    canvas.height = 768;
    canvas.width = 1088;

    let currentLevel = createDefaultLevel();

    let startSceneSprite = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/start.jpg",
    });

    let deathSceneSprite = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/died.jpg",
    });

    let game = new Game({
        level: currentLevel,
        startSceneSprite,
        deathSceneSprite,
    });

    const animate = () => {
        if (!c) return;

        requestAnimationFrame(animate);

        if (game.getRestart()) {
            game = new Game({
                level: createDefaultLevel(),
                startSceneSprite,
                deathSceneSprite,
            });
        }

        game.render(c);
    };

    animate();
};

export { startGame };
