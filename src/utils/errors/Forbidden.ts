import BaseError from "./BaseError";
import { ErrorType } from "./errors";
import { StatusCode } from "./errors";

export default class BadRequest extends BaseError {
  constructor(message) {
    super(ErrorType.FORBIDDEN, StatusCode.FORBIDDEN, message);
  }
}
