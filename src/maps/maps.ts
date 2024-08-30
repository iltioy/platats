import Player from "../entities/player";
import Level from "../levels/collisions/level";
import { createLevel as createStarterLevel } from "./starterLevel";

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
