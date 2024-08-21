export class HTTPError extends Error {
    status: any;
    constructor(response: { statusText: string | undefined; status: any; }) {
      super(response.statusText);
      this.status = response.status;
    }
}