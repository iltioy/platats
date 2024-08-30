import Entity from "../../entities/entity";

class Level {
    private collisionBlocksPlayer;

    private collisionBlocksEntities;

    private backgroundImage;

    private playerPosition;

    private entities;

    private levelMap;

    private type;

    constructor({
        collisionBlocksPlayer,
        collisionBlocksEntities,
        backgroundImage,
        playerPosition,
        entities,
        rightLevel = null,
        leftLevel = null,
        topLevel = null,
        bottomLevel = null,
        type = "none",
    }: any) {
        this.collisionBlocksPlayer = collisionBlocksPlayer;
        this.collisionBlocksEntities = collisionBlocksEntities;
        this.backgroundImage = backgroundImage;
        this.playerPosition = playerPosition;
        this.entities = entities;
        this.type = type;

        this.levelMap = {
            "level-change-bottom": bottomLevel,
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

    public getType() {
        return this.type;
    }
}

export default Level;
