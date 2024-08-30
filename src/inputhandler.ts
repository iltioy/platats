import Player from "./entities/player";
import Game from "./game";

class InputHandler {
    public keys;

    constructor() {
        this.keys = {
            w: {
                pressed: false,
            },
            a: {
                pressed: false,
            },
            d: {
                pressed: false,
            },
        };
    }

    public setupPlayerListenders(player: Player) {
        window.addEventListener("keydown", (event) => {
            console.log(event);
            switch (event.key) {
                case "w":
                    if (player.getVelocity().y === 0) {
                        player.changeAnimation("jump");
                        player.setVelocityY(-24);
                    }
                    break;
                case "a":
                    this.keys.a.pressed = true;
                    player.changeAnimation("run");
                    break;
                case "d":
                    this.keys.d.pressed = true;
                    player.changeAnimation("run");
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            console.log(event);
            switch (event.key) {
                case "a":
                    this.keys.a.pressed = false;
                    player.changeAnimation("idle");
                    break;
                case "d":
                    this.keys.d.pressed = false;
                    break;
            }
        });
    }

    public setupGameListeners(game: Game) {
        window.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "Enter":
                    game.handleContinue();
                    break;
                case "Space":
                    game.handleContinue();
                    break;
                case "Escape":
                    game.handleBack();
                    break;
            }
        });
    }
}

export default InputHandler;
