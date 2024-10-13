export interface IDbConnection<DbClient> {
  connect(): Promise<void>
  disconnect(): Promise<void>
  getDbClient(): DbClient
}
