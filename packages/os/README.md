# @dreamdesk/os

The OS layer for [DreamDesk](https://github.com/stonedem0/dreamdesk-ui): what
makes a desktop of windows behave like an operating system. Files and
folders, a recycle bin, processes with windows, file types, app state that
survives a reload, and a DOS prompt.

It holds no UI of its own: pair it with
[`dreamdesk-ui`](https://www.npmjs.com/package/dreamdesk-ui) for the windows,
or use it with anything. Everything works on its own; `OSProvider` is
optional.

> 0.x: the API is still settling and may change between minor versions.

```bash
npm install @dreamdesk/os
```

React 18 or later is a peer dependency (for the hooks).

## Files: `VirtualFS` and `RecycleBin`

```ts
import { VirtualFS, RecycleBin } from "@dreamdesk/os";

const fs = new VirtualFS();
fs.mkdir("/documents");
fs.writeFile("/documents/readme.txt", "hello");
fs.ls("/documents");                 // [{ kind: "file", name: "readme.txt", … }]

// Deleting the Windows 98 way: into C:\RECYCLED, restorable
const bin = new RecycleBin(fs);
const item = bin.recycle("/documents/readme.txt");
bin.restore(item.id);                // back where it was

// Save and load (e.g. localStorage)
localStorage.setItem("files", fs.serialize());
fs.deserialize(localStorage.getItem("files")!);
```

`useFSVersion(fs)` re-renders a React component when the files change.

## Windows and apps: `ProcessManager`

```ts
import { ProcessManager, useProcesses } from "@dreamdesk/os";

const pm = new ProcessManager();
pm.spawn("explorer", { pid: "explorer", title: "Explorer", position: { x: 40, y: 30 } });
pm.spawn("explorer", { pid: "explorer" });   // already running: brought to the front
pm.move("explorer", { x: 100, y: 60 });
pm.stackOrder();                              // pids, back to front

localStorage.setItem("windows", pm.serialize());
pm.restore(localStorage.getItem("windows")!); // ids, titles, positions, stacking
```

`useProcesses(pm)` re-renders with the running processes.

## App state across reloads: `useProcessState`

Like `useState`, kept per window; forget it when the window closes.

```tsx
const [folder, setFolder] = useProcessState("explorer", "folder", () => "/documents",
  (saved) => (typeof saved === "string" ? saved : undefined));
```

`forgetProcessState(pid)`, `forgetAllProcessState()`.

## Opening files by type

```ts
import { appsForFile } from "@dreamdesk/os";

const apps = { browser: { extensions: ["url"] }, notepad: { extensions: ["txt", "md"] } };
appsForFile(apps, "/desktop/site.url");  // ["browser"]
```

## The DOS prompt: `executeCommand`

A DOS shell over a `VirtualFS`: `DIR`, `CD`, `TYPE`, `MD`, `RD`, `DEL`, `REN`,
`COPY`, `MOVE` (with wildcards), `START`, `ECHO`, `CLS`, `VER`, `DATE`, `TIME`,
`HELP`, `EXIT`; `C:\` paths, case-insensitive names, DOS's own messages.

```ts
import { executeCommand, dosPrompt } from "@dreamdesk/os";

let cwd = "/";
const result = executeCommand("cd documents", { fs, cwd });
if (result.newCwd) cwd = result.newCwd;
dosPrompt(cwd);                                   // "C:\documents>"
executeCommand("dir *.txt", { fs, cwd }).lines;   // what DIR prints
```

`open` (for `START`) and `readOnly` (paths that can't be changed) are optional.

## License

MIT
