import BaseError from "./BaseError";
import { ErrorType } from "./errors";
import { StatusCode } from "./errors";

export default class BadRequest extends BaseError {
  constructor(message) {
    super(ErrorType.METHOD_NOT_ALLOWED, StatusCode.METHOD_NOT_ALLOWED, message);
  }
}
