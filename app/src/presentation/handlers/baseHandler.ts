export class BaseHandler {

  protected body?: any;
  protected pathParameters?: any;
  protected queryStringParameters?: any;

  constructor(event: any) {
    this.body = JSON.parse(event.body);
    this.pathParameters = event.pathParameters;
    this.queryStringParameters = event.queryStringParameters;
  }
}
