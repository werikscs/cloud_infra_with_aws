import { PrismaClient } from '@prisma/client'
import { IDbConnection } from './IDbConnection'

export class UsuarioRepository {
  private dbConnection: IDbConnection<PrismaClient>

  constructor(dbConnection: IDbConnection<PrismaClient>) {
    this.dbConnection = dbConnection
  }

  async findAll(): Promise<any> {
    const dbClient = this.dbConnection.getDbClient()
    await this.dbConnection.connect()
    const users = await dbClient.user.findMany()
    await this.dbConnection.disconnect()
    return users
  }

  async save(userData: any): Promise<any> {
    const dbClient = this.dbConnection.getDbClient()
    await this.dbConnection.connect()
    const user = await dbClient.user.create({
      data: userData,
    })
    await this.dbConnection.disconnect()
    return user
  }

  async find(email: string): Promise<any> {
    const dbClient = this.dbConnection.getDbClient()
    await this.dbConnection.connect()
    const user = await dbClient.user.findUniqueOrThrow({
      where: { email },
    })
    await this.dbConnection.disconnect()
    return user
  }

  async findByUserId(userId: string): Promise<any> {
    const dbClient = this.dbConnection.getDbClient()
    await this.dbConnection.connect()
    const user = await dbClient.user.findUniqueOrThrow({
      where: { userId },
    })
    await this.dbConnection.disconnect()
    return user
  }
}
