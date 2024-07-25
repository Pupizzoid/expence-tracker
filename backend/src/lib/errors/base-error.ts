import { HttpStatusCode } from '../../enums/http-status-codes';

export class BaseError extends Error {
  public readonly message: string;
  public readonly httpCode: HttpStatusCode;

  constructor(httpCode: HttpStatusCode, message: string) {
    super(message);
    this.message = message;
    this.httpCode = httpCode;
  }
}
