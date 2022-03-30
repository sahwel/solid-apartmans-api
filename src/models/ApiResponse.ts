export default class ApiResponse {
  status: number;
  payload: object;

  constructor(payload: object = {msg: "Success"}, _statusCode: number = 200) {
    this.status = _statusCode;
    this.payload = payload;
  }
}
