import { createProject } from "./createProject";
import { ArgumentsCamelCase } from 'yargs';

export const runCommands = async (argv: ArgumentsCamelCase<{}>) => {
    // console.log("🚀 --> runCommands --> argv:", argv);

    switch (argv._[0]) {
        case "new":
            // if (await selfIfCanUpdate(argv)) {
            // const argvAppName = argv._[1];
            // createTemplate(argvAppName ? String(argvAppName) : undefined);
            // }
            createProject();
            break;
        default:
        // spawn(`npm exec --call "${yargsToWebpackEnv("npm run", argv)}"`, {
        //     shell: true,
        //     cwd: runDirectory,
        //     stdio: "inherit",
        // }).on("error", log.error);
    }


}