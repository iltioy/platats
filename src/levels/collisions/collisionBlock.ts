class CollisionBlock {
    public position;

    public width;

    public height;

    public type;

    public id;

    constructor({
        position,
        type = "block",
        width = 64,
        height = 64,
        id = null,
    }: any) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.type = type;
        this.id = id;
    }

    draw(c: CanvasRenderingContext2D) {
        c.fillStyle = "rgba(255, 0, 0, 0.25)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default CollisionBlock;
