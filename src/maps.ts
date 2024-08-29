import { collisionsLevel1, collisionsLevel1Enemy } from "./data/collitions";
import Coin from "./entities/coin";
import Sprite from "./entities/sprite/sprite";
import Troll from "./entities/troll";
import Yeti from "./entities/yeti";
import Level from "./levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "./utils/utils";

const parsedCollisionsL1 = parse2D(collisionsLevel1);
const collisionBlocksL1 = createObjectsFrom2D(parsedCollisionsL1);

const collisionsForEnemyL1 = parse2D(collisionsLevel1Enemy);
const collisionsBlcoksForEnemyL1 = createObjectsFrom2D(collisionsForEnemyL1);

const troll = new Troll({
    position: {
        x: 300,
        y: 200,
    },
    collisionBlocks: collisionsBlcoksForEnemyL1,
    framerate: 6,
    animationsNumber: 4,
});

const yeti = new Yeti({
    position: {
        x: 400,
        y: 150,
    },
    collisionBlocks: collisionsBlcoksForEnemyL1,
    framerate: 6,
    animationsNumber: 4,
});

const coin = new Coin({
    position: {
        x: 400,
        y: 200,
    },
    id: 1,
    collisionBlocks: [],
    framerate: 5,
    animationsNumber: 1,
});

const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./src/assets/test_map3.png",
});

const level1 = new Level({
    collisionBlocksPlayer: collisionBlocksL1,
    collisionBlocksEntities: collisionsBlcoksForEnemyL1,
    backgroundImage,
    playerPosition: {
        x: 100,
        y: 100,
    },
    rightLevel: new Level({
        collisionBlocksPlayer: collisionBlocksL1,
        collisionBlocksEntities: collisionsBlcoksForEnemyL1,
        backgroundImage,
        playerPosition: {
            x: 100,
            y: 100,
        },
        entities: [troll, coin, yeti],
    }),
    entities: [troll, coin, yeti],
});

export { level1 };
