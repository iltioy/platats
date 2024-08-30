import Sprite from "../entities/sprite/sprite";
import Level from "../levels/collisions/level";
const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./src/assets/levels/level4.png",
});

const createFinish = () => {
    return new Level({
        backgroundImage,
        collisionBlocksPlayer: [],
        collisionBlocksEntities: [],
        entities: [],
        type: "finish",
    });
};

export { createFinish };
