// infra/db/PrismaDbConnection.ts
import { PrismaClient } from '@prisma/client'
import { IDbConnection } from './IDbConnection'

export class PrismaDbConnection implements IDbConnection<PrismaClient> {
  private static prismaDbConnection: PrismaDbConnection

  private prismaClient: PrismaClient

  private constructor() {
    this.prismaClient = new PrismaClient()
  }

  async connect(): Promise<void> {
    await this.prismaClient.$connect()
  }

  async disconnect(): Promise<void> {
    await this.prismaClient.$disconnect()
  }

  getDbClient(): PrismaClient {
    return this.prismaClient
  }

  static getPrismaDbConnection(): IDbConnection<PrismaClient> {
    if (!PrismaDbConnection.prismaDbConnection) {
      PrismaDbConnection.prismaDbConnection = new PrismaDbConnection()
    }
    return PrismaDbConnection.prismaDbConnection
  }
}
