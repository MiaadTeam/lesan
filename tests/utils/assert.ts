import * as assertNode from "node:assert/strict";

export function assert(condition: any, msg?: string): asserts condition {
  assertNode.ok(condition, msg);
}

export function assertEquals(actual: any, expected: any, msg?: string) {
  assertNode.deepEqual(actual, expected, msg);
}

export function assertExists(actual: any, msg?: string) {
  assertNode.notEqual(actual, null, msg);
  assertNode.notEqual(actual, undefined, msg);
}

export async function assertRejects(
  fn: () => Promise<any>,
  errorClassOrMsg?: any,
  msgIncludes?: string,
  msg?: string,
): Promise<any> {
  let errorClass: any = undefined;
  let expectedMsgIncludes: string | undefined = undefined;
  let customMsg: string | undefined = undefined;

  if (typeof errorClassOrMsg === "string") {
    customMsg = errorClassOrMsg;
  } else if (errorClassOrMsg !== undefined) {
    errorClass = errorClassOrMsg;
    expectedMsgIncludes = msgIncludes;
    customMsg = msg;
  }

  let caughtError: any;
  let didReject = false;

  try {
    await fn();
  } catch (e) {
    caughtError = e;
    didReject = true;
  }

  if (!didReject) {
    throw new assertNode.AssertionError({
      message: customMsg || "Expected function to throw/reject",
    });
  }

  if (errorClass) {
    if (!(caughtError instanceof errorClass)) {
      throw new assertNode.AssertionError({
        message: customMsg ||
          `Expected error to be instance of ${errorClass.name}, but got ${caughtError?.constructor?.name}`,
        actual: caughtError,
        expected: errorClass,
      });
    }
  }

  if (expectedMsgIncludes !== undefined) {
    const errorMessage = caughtError instanceof Error
      ? caughtError.message
      : String(caughtError);
    if (!errorMessage.includes(expectedMsgIncludes)) {
      throw new assertNode.AssertionError({
        message: customMsg ||
          `Expected error message to include "${expectedMsgIncludes}", but got "${errorMessage}"`,
        actual: errorMessage,
        expected: expectedMsgIncludes,
      });
    }
  }

  return caughtError;
}

export function assertStringIncludes(
  actual: string,
  expected: string,
  msg?: string,
) {
  assertNode.ok(
    actual.includes(expected),
    msg || `Expected string "${actual}" to include "${expected}"`,
  );
}
