import { parseYargs } from "./parseYargs";
import { runCommands } from "./runCommands";

export const readCommandsAndRun = async () => {
    const argv = await parseYargs()

    runCommands(argv);
}