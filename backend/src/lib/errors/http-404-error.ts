import { BaseError } from './base-error';
import { HttpStatusCode } from '../../enums/http-status-codes';

export class HTTP404Error extends BaseError {
  constructor(description = 'Not found') {
    super(HttpStatusCode.NOT_FOUND, description);
  }
}
