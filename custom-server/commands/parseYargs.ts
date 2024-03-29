
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import packageJson from "../../package.json"
import { ArgumentsCamelCase } from 'yargs';



export const parseYargs = () => {

    const argv = yargs(hideBin(process.argv))
        .scriptName(packageJson.name)
        .command('new', `Creates a new workspace and an initial Kix application.`)
        .help('help').argv;
    // .usage('For more details please visit ' + packageJson.homepage) 

    if (argv instanceof Promise) {
        return argv
    }

    return new Promise<ArgumentsCamelCase>((resolve) => resolve(argv))
}