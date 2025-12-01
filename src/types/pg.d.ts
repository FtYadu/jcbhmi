declare module "pg" {
  export class Pool {
    constructor(options: any);
    query: (
      queryText: string,
      values?: any[],
    ) => Promise<{ rows: any[] }>;
    end?: () => Promise<void>;
  }
}
