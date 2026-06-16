declare module "pg" {
  export class Pool {
    constructor(options: unknown);
    query: (
      queryText: string,
      values?: unknown[],
    ) => Promise<{ rows: Record<string, unknown>[] }>;
    end?: () => Promise<void>;
  }
}
