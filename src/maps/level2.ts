import { level2Collisions, level2CollisionsEnemy } from "../data/collitions";
import Coin from "../entities/coin";
import Sprite from "../entities/sprite/sprite";
import Troll from "../entities/troll";
import Level from "../levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "../utils/utils";
import { createRight as createLevel1 } from "./level1";
import { createLevel as createBottomLevel } from "./level3";
import { createLevel as createRightLevel } from "./level4";

const parsedCollisions = parse2D(level2Collisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions);

const parsedCollisionsEnemy = parse2D(level2CollisionsEnemy);
const collisionBlocksEnemy = createObjectsFrom2D(parsedCollisionsEnemy);

const coin = new Coin({
    id: 92001,
    position: {
        x: 700,
        y: 225,
    },
});

const troll = new Troll({
    position: {
        x: 500,
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
        imageSrc: "./src/assets/levels/level2.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll],
        playerPosition: {
            x: 40,
            y: 280,
        },
        leftLevel: createLevel1,
        bottomLevel: createBottomLevel,
        rightLevel: createRightLevel,
    });
};

const createBottom = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/level2.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll],
        playerPosition: {
            x: 700,
            y: 650,
        },
        leftLevel: createLevel1,
        bottomLevel: createBottomLevel,
        rightLevel: createRightLevel,
    });
};

const createRight = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/level2.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll],
        playerPosition: {
            x: 950,
            y: 550,
        },
        leftLevel: createLevel1,
        bottomLevel: createBottomLevel,
        rightLevel: createRightLevel,
    });
};

export { createLevel, createBottom, createRight };
