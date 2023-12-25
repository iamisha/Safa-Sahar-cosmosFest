import { registerEnumType } from "@nestjs/graphql";

export enum State{
    idle = 'IDLE',
    busy = "BUSY"
}


registerEnumType(State, {
    name: 'State', // this will be the name of the enum in the GraphQL schema
  });