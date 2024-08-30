import { starterLevelCollisions } from "../data/collitions";
import Coin from "../entities/coin";
import Sprite from "../entities/sprite/sprite";
import Level from "../levels/collisions/level";
import { createObjectsFrom2D, parse2D } from "../utils/utils";
import { createLevel as createLevel1 } from "./level1";

const parsedCollisions = parse2D(starterLevelCollisions);
const collisionBlocks = createObjectsFrom2D(parsedCollisions);

const coin = new Coin({
    id: 90001,
    position: {
        x: 500,
        y: 170,
    },
});

const createLevel = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/starter.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocks,
        entities: [coin],
        playerPosition: {
            x: 100,
            y: 100,
        },
        rightLevel: createLevel1,
    });
};

const createLevelRight = () => {
    const backgroundImage = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: "./src/assets/levels/starter.png",
    });

    return new Level({
        backgroundImage,
        collisionBlocksPlayer: collisionBlocks,
        collisionBlocksEntities: collisionBlocks,
        entities: [coin],
        playerPosition: {
            x: 950,
            y: 500,
        },
        rightLevel: createLevel1,
    });
};

export { createLevel, createLevelRight };
