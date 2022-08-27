import fs from "fs";
import { resolve } from "path";

export default function getFiles<T>(path: string, extension = ".js"): T[] {
    const result: T[] = [];

    const files = fs.readdirSync(path, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) return [...result, ...getFiles<T>(`${path}/${file.name}`, extension)];
        else if (file.isFile() && file.name.endsWith(extension)) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            let data = require(resolve(path, file.name));

            if (data.default) data = data.default;

            result.push(data);
        }
    }

    return result;
}
