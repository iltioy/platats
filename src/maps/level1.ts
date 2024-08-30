import { level1Collisions, level1CollisionsEnemy } from "../data/collitions";
import Coin from "../entities/coin";
import Sprite from "../entities/sprite/sprite";
import Troll from "../entities/troll";
import Level from "../levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "../utils/utils";
import { createLevelRight as createStarterLevel } from "./starterLevel";
import { createLevel as createLevel2 } from "./level2";

const parsedCollisions = parse2D(level1Collisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions);

const parsedCollisionsEnemy = parse2D(level1CollisionsEnemy);
const collisionBlocksEnemy = createObjectsFrom2D(parsedCollisionsEnemy);

const coin = new Coin({
    id: 91001,
    position: {
        x: 200,
        y: 125,
    },
});

const troll = new Troll({
    position: {
        x: 300,
        y: 200,
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
        imageSrc: "./src/assets/levels/level1.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll],
        playerPosition: {
            x: 0,
            y: 500,
        },
        leftLevel: createStarterLevel,
        rightLevel: createLevel2,
    });
};

const createRight = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/level1.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocksEnemy,
        entities: [coin, troll],
        playerPosition: {
            x: 950,
            y: 220,
        },
        leftLevel: createStarterLevel,
        rightLevel: createLevel2,
    });
};

export { createLevel, createRight };
