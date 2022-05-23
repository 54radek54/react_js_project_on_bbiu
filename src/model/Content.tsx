import {Course} from "./Course";

export interface Content{
    content:Course[]
    totalElements: number,
    totalPages: number,
    size: number,
}