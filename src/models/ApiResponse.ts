export default class ApiResponse {
  status: StatusCodes;
  payload: object;

  constructor(payload: object = { msg: "Success" }, _statusCode: StatusCodes = 200) {
    this.status = _statusCode;
    this.payload = payload;
  }

  static withLocalize(msgHU: string, msgEN: string, status: StatusCodes = 400) {
    return new ApiResponse({ msgHU, msgEN }, status);
  }
}

export type StatusCodes = 200 | 400 | 404 | 500;
