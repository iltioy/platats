import Player from "../entities/player";
import Level from "../levels/collisions/level";
import { createLevel as createStarterLevel } from "./starterLevel";

// const troll = new Troll({
//     position: {
//         x: 300,
//         y: 200,
//     },
//     collisionBlocks: collisionsBlcoksForEnemyL1,
//     framerate: 6,
//     animationsNumber: 4,
// });

// const yeti = new Yeti({
//     position: {
//         x: 400,
//         y: 150,
//     },
//     collisionBlocks: collisionsBlcoksForEnemyL1,
//     framerate: 6,
//     animationsNumber: 4,
// });

// const coin = new Coin({
//     position: {
//         x: 400,
//         y: 200,
//     },
//     id: 1,
//     collisionBlocks: [],
//     framerate: 5,
//     animationsNumber: 1,
// });

// const createDefaultLevel = () => {
//     return new Level({
//         collisionBlocksPlayer: collisionBlocksL1,
//         collisionBlocksEntities: collisionsBlcoksForEnemyL1,
//         backgroundImage,
//         playerPosition: {
//             x: 100,
//             y: 100,
//         },
//         rightLevel: new Level({
//             collisionBlocksPlayer: collisionBlocksL1,
//             collisionBlocksEntities: collisionsBlcoksForEnemyL1,
//             backgroundImage,
//             playerPosition: {
//                 x: 100,
//                 y: 100,
//             },
//             entities: [troll, coin, yeti],
//         }),
//         entities: [troll, coin, yeti],
//     });
// };

const createDefaultPlayer = (level: Level) => {
    return new Player({
        position: {
            x: level.getPlayerPosition().x,
            y: level.getPlayerPosition().y,
        },
        collisionBlocks: level.getCollisionBlocksPlayer(),
        framerate: 7,
        animationsNumber: 6,
        gravity: 0.8,
    });
};

const createDefaultLevel = () => {
    return createStarterLevel();
};

const level1 = createDefaultLevel();

export { level1, createDefaultLevel, createDefaultPlayer };
