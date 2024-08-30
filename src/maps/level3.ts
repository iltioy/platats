import { level3Collisions, level3CollisionsEnemy } from "../data/collitions";
import Coin from "../entities/coin";
import Sprite from "../entities/sprite/sprite";
import Troll from "../entities/troll";
import Yeti from "../entities/yeti";
import Level from "../levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "../utils/utils";
import { createBottom } from "./level2";

const parsedCollisions = parse2D(level3Collisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions);

const parsedCollisionsEnemy = parse2D(level3CollisionsEnemy);
const collisionBlocksEnemy = createObjectsFrom2D(parsedCollisionsEnemy);

const coin = new Coin({
    id: 93001,
    position: {
        x: 750,
        y: 325,
    },
});

const troll = new Troll({
    position: {
        x: 100,
        y: 500,
    },
    collisionBlocks: collisionBlocksEnemy,
    framerate: 6,
    animationsNumber: 4,
});

const yeti = new Yeti({
    position: {
        x: 700,
        y: 500,
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
        imageSrc: "./src/assets/levels/level3.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll, yeti],
        playerPosition: {
            x: 700,
            y: 10,
        },
        topLevel: createBottom,
    });
};

export { createLevel };
