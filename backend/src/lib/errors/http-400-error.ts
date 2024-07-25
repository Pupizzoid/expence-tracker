import { BaseError } from './base-error';
import { HttpStatusCode } from '../../enums/http-status-codes';

export class HTTP400Error extends BaseError {
  constructor(description = 'Bad request') {
    super(HttpStatusCode.BAD_REQUEST, description);
  }
}
