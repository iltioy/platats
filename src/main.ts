import { startGame } from ".";
import { level1 } from "./maps";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas></canvas>
`;

startGame(level1);
