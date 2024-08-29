import Entity from "../../entities/entity";

class Level {
    private collisionBlocksPlayer;

    private collisionBlocksEntities;

    private backgroundImage;

    private playerPosition;

    private entities;

    private levelMap;

    constructor({
        collisionBlocksPlayer,
        collisionBlocksEntities,
        backgroundImage,
        playerPosition,
        entities,
        rightLevel = null,
        leftLevel = null,
        topLevel = null,
        bottomtLevel = null,
    }: any) {
        this.collisionBlocksPlayer = collisionBlocksPlayer;
        this.collisionBlocksEntities = collisionBlocksEntities;
        this.backgroundImage = backgroundImage;
        this.playerPosition = playerPosition;
        this.entities = entities;

        this.levelMap = {
            "level-change-bottom": bottomtLevel,
            "level-change-right": rightLevel,
            "level-change-left": leftLevel,
            "level-change-top": topLevel,
        };
    }

    public getCollisionBlocksPlayer() {
        return this.collisionBlocksPlayer;
    }

    public getCollisionBlocksEntities() {
        return this.collisionBlocksEntities;
    }

    public getBackgroundImage() {
        return this.backgroundImage;
    }

    public getPlayerPosition() {
        return this.playerPosition;
    }

    public getEntities(): Entity[] {
        return this.entities;
    }

    public getLevelMap(): any {
        return this.levelMap;
    }
}

export default Level;
