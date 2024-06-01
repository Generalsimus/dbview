import resolve from "resolve/sync";
import { ChildProcess, spawn } from "child_process";

export const resolveOrInstallModule = (name, directory): Promise<string> => {
  try {
    const module = resolve(name, { basedir: directory });
    if (module) return module;
  } catch (e) {
    return new Promise<string>((resolve, reject) => {
      spawn(`npm install ${name}`, [], {
        cwd: directory,
        shell: true,
        stdio: "inherit",
      })
        .on("error", reject)
        .on("close", () => {
          resolve(resolveOrInstallModule(name, directory));
        });
    });
  }

  return resolveOrInstallModule(name, directory);
};
