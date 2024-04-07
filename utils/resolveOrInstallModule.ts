
import resolve from "resolve/sync";
import { ChildProcess, spawn } from "child_process";

export const resolveOrInstallModule = (name, directory): string => {
    try {
        const module = resolve(name, { basedir: directory });
        if (module) return module;
    } catch {
        spawn('npm', ['install', name], { cwd: directory });
    }

    return resolveOrInstallModule(name, directory);
}