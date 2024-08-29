import Game from "./game";
import Level from "./levels/collisions/level";

const startGame = (level1: Level) => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const c = canvas.getContext("2d");

    canvas.height = 768;
    canvas.width = 1088;

    let currentLevel = level1;

    const game = new Game({
        level: currentLevel,
    });

    const animate = () => {
        if (!c) return;

        requestAnimationFrame(animate);

        game.render(c);
    };

    game.setupEventListenders();

    animate();
};

export { startGame };
