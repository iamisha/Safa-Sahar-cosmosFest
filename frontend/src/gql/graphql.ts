/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CreateCustomerInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
};

export type CreateDriverInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
};

export type CreateDustbinInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  status: Status;
};

export type CreateMailInput = {
  html_content?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  text_content: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Driver = {
  __typename?: 'Driver';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Dustbin = {
  __typename?: 'Dustbin';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  status: Status;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetCustomerType = {
  __typename?: 'GetCustomerType';
  count?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<Customer>>;
};

export type GetDriverType = {
  __typename?: 'GetDriverType';
  count?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<Driver>>;
};

export type GetDustbinType = {
  __typename?: 'GetDustbinType';
  count?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<Dustbin>>;
};

export type GetManyInput = {
  /** count or data or all, default = data */
  dataType?: InputMaybe<Scalars['String']['input']>;
  /** {key: "ASC" or "DESC" or "asc" or "desc" or 1 or -1} or {key: {direction: "ASC" or "DESC" or "asc" or "desc", nulls: "first" or "last" or "FIRST" or "LAST"}}} */
  order?: InputMaybe<Scalars['JSON']['input']>;
  pagination?: InputMaybe<IPagination>;
  where?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetOneInput = {
  where: Scalars['JSON']['input'];
};

export type GetUserType = {
  __typename?: 'GetUserType';
  count?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<User>>;
};

export type IPagination = {
  /** Started from 0 */
  page: Scalars['Int']['input'];
  /** Size of page */
  size: Scalars['Int']['input'];
};

export type JwtWithUser = {
  __typename?: 'JwtWithUser';
  jwt: Scalars['String']['output'];
  user: User;
};

export type Mail = {
  __typename?: 'Mail';
  createdAt: Scalars['DateTime']['output'];
  html_content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  text_content: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  SignUp: User;
  createCustomer: Customer;
  createDriver: Driver;
  createDustbin: Dustbin;
  createMail: Mail;
  createManyCustomer: Array<Customer>;
  createManyDriver: Array<Driver>;
  createManyDustbin: Array<Dustbin>;
  createManyUsers: Array<User>;
  createUser: User;
  deleteCustomer: Customer;
  deleteDriver: Driver;
  deleteDustbin: Dustbin;
  deleteMail: Mail;
  deleteUser: Scalars['JSON']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  requestOtpVerify: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signIn: JwtWithUser;
  updateCustomer: Customer;
  updateDriver: Driver;
  updateDriverProfile: Customer;
  updateDustbin: Dustbin;
  updateMail: Mail;
  updateMe: User;
  updateUser: User;
  verifyEmail: Scalars['Boolean']['output'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateDriverArgs = {
  input: CreateDriverInput;
};


export type MutationCreateDustbinArgs = {
  input: CreateDustbinInput;
};


export type MutationCreateMailArgs = {
  input: CreateMailInput;
};


export type MutationCreateManyCustomerArgs = {
  input: Array<CreateCustomerInput>;
};


export type MutationCreateManyDriverArgs = {
  input: Array<CreateDriverInput>;
};


export type MutationCreateManyDustbinArgs = {
  input: Array<CreateDustbinInput>;
};


export type MutationCreateManyUsersArgs = {
  input: Array<CreateUserInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteDriverArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteDustbinArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteMailArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  accessToken: Scalars['String']['input'];
};


export type MutationRequestOtpVerifyArgs = {
  email: Scalars['String']['input'];
  otpType: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUpdateCustomerArgs = {
  id: Scalars['Float']['input'];
  input: UpdateCustomerInput;
};


export type MutationUpdateDriverArgs = {
  id: Scalars['Float']['input'];
  input: UpdateDriverInput;
};


export type MutationUpdateDriverProfileArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateDustbinArgs = {
  id: Scalars['Float']['input'];
  input: UpdateDustbinInput;
};


export type MutationUpdateMailArgs = {
  id: Scalars['Float']['input'];
  input: UpdateMailInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float']['input'];
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String']['input'];
  otpCode: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getManyCustomers: GetCustomerType;
  getManyDrivers: GetDriverType;
  getManyDustbins: GetDustbinType;
  getManyUsers: GetUserType;
  getMe: User;
  getOneCustomer: Customer;
  getOneDriver: Driver;
  getOneDustbin: Dustbin;
  getOneUser: User;
};


export type QueryGetManyCustomersArgs = {
  input?: InputMaybe<GetManyInput>;
};


export type QueryGetManyDriversArgs = {
  input?: InputMaybe<GetManyInput>;
};


export type QueryGetManyDustbinsArgs = {
  input?: InputMaybe<GetManyInput>;
};


export type QueryGetManyUsersArgs = {
  input?: InputMaybe<GetManyInput>;
};


export type QueryGetOneCustomerArgs = {
  input: GetOneInput;
};


export type QueryGetOneDriverArgs = {
  input: GetOneInput;
};


export type QueryGetOneDustbinArgs = {
  input: GetOneInput;
};


export type QueryGetOneUserArgs = {
  input: GetOneInput;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export enum Status {
  Empty = 'empty',
  Full = 'full',
  Partial = 'partial'
}

export type UpdateCustomerInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
};

export type UpdateDriverInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
};

export type UpdateDustbinInput = {
  latitude: Scalars['String']['input'];
  longitude: Scalars['String']['input'];
  status: Status;
};

export type UpdateMailInput = {
  html_content?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  text_content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: { __typename?: 'User', id: string } };


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;