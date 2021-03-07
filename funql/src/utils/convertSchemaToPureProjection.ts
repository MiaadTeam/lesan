import { Project } from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
const project = new Project();
project.addSourceFilesAtPaths("../**/*.ts");
const sourceFile = project.getSourceFile("city.ts");
console.log(sourceFile);
