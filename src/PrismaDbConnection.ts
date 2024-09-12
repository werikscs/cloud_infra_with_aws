import { PrismaClient } from '@prisma/client'

// static class to manage the connection to the database
export class PrismaDbConnection {
  private static prismaClient: PrismaClient

  private static getPrismaClient(): void {
    if (!this.prismaClient) {
      this.prismaClient = new PrismaClient()
    }
  }

  static async connect(): Promise<void> {
    this.getPrismaClient()
    await this.prismaClient.$connect()
  }

  static async disconnect(): Promise<void> {
    this.getPrismaClient()
    await this.prismaClient.$disconnect()
  }

  static async getClient(): Promise<PrismaClient> {
    this.getPrismaClient()
    return this.prismaClient
  }
}
