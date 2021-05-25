import {
  InterfaceDeclaration,
  PropertySignature,
  log,
} from "../../../../deps.ts";

/**
 * @function
 * finds all props of an interface includes  extends and ....
 */
export function findAllPropsOfInterface(
  myInterface: InterfaceDeclaration
): PropertySignature[] {
  try {
    return <PropertySignature[]>myInterface
      .getSymbolOrThrow()
      .getDeclarations()[0]
      .getType()
      .getProperties()
      .map((prop) => prop.getDeclarations()[0]);
  } catch (error) {
    log.error(
      `we can not find props of interface: ${myInterface.getName()}. please check it`
    );
    return [];
  }
}
