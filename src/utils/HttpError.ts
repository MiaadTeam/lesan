// errors.ts
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;

    // Maintains proper stack trace (only works in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toResponse(): Response {
    return new Response(
      JSON.stringify({ error: this.message }),
      {
        status: this.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
