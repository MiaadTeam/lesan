import { InterfaceDeclaration, PropertySignature } from "../../../../deps.ts";

/**
 * @function
 * finds all props of an interface includes  extends and ....
 */
export function findAllPropsOfInterface(
  myInterface: InterfaceDeclaration
): PropertySignature[] {
  return <PropertySignature[]>myInterface
    .getSymbolOrThrow()
    .getDeclarations()[0]
    .getType()
    .getProperties()
    .map((prop) => prop.getDeclarations()[0]);
}
