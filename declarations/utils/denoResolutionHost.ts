import { ResolutionHostFactory, ts } from "../../deps.ts";

export const denoResolutionHost: ResolutionHostFactory = (
  moduleResolutionHost,
  getCompilerOptions
) => {
  return {
    resolveModuleNames: (moduleNames, containingFile) => {
      const compilerOptions = getCompilerOptions();
      const resolvedModules: ts.ResolvedModule[] = [];

      for (const moduleName of moduleNames.map(removeTsExtension)) {
        const result = ts.resolveModuleName(
          moduleName,
          containingFile,
          compilerOptions,
          moduleResolutionHost
        );
        resolvedModules.push(result.resolvedModule!);
      }

      return resolvedModules;
    },
  };

  function removeTsExtension(moduleName: string) {
    if (
      moduleName.slice(-3).toLowerCase() === ".ts" &&
      !moduleName.startsWith("http")
    ) {
      return moduleName.slice(0, -3);
    }
    return moduleName;
  }
};
