import { registerEnumType } from "@nestjs/graphql";

export enum Status{
    empty = 'EMPTY',
    partial = 'PARTIAL',
    full = "FULL"
}

registerEnumType(Status, {
    name: 'Status', // this will be the name of the enum in the GraphQL schema
  });