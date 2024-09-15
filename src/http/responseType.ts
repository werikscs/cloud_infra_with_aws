import { HttpStatusCodes } from './httpStatusCodesEnum'

export type Response = {
  status: (status: HttpStatusCodes) => {
    json: (data: any) => void
  }
}
