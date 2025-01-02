import { IResult } from "./IResult";

export interface ICandidate{
  firstName: string,
  lastName: string,
  email?: string,
  mobile?: string,
  aadhar: string,
  result?: string,
  answers?: Array<any>,
  marks?: number,
  jobRole: string,
  tpUser: string
  createdAt: string
}
