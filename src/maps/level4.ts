import { level4Collisions, level4CollisionsEnemy } from "../data/collitions";
import Coin from "../entities/coin";
import Sprite from "../entities/sprite/sprite";
import Troll from "../entities/troll";
import Yeti from "../entities/yeti";
import Level from "../levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "../utils/utils";
import { createFinish } from "./finish";
import { createRight } from "./level2";

const parsedCollisions = parse2D(level4Collisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions);

const parsedCollisionsEnemy = parse2D(level4CollisionsEnemy);
const collisionBlocksEnemy = createObjectsFrom2D(parsedCollisionsEnemy);

const coin = new Coin({
    id: 94001,
    position: {
        x: 150,
        y: 125,
    },
});

const troll = new Troll({
    position: {
        x: 200,
        y: 500,
    },
    collisionBlocks: collisionBlocksEnemy,
    framerate: 6,
    animationsNumber: 4,
});

const yeti = new Yeti({
    position: {
        x: 500,
        y: 250,
    },
    collisionBlocks: collisionBlocksEnemy,
    framerate: 6,
    animationsNumber: 4,
});

const createLevel = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/level4.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll, yeti],
        playerPosition: {
            x: 50,
            y: 650,
        },
        leftLevel: createRight,
        rightLevel: createFinish,
    });
};

export { createLevel };
