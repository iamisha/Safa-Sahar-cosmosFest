"use client";
import React, { useState } from "react";
import * as Components from "./Components";
import { useMutation } from "@tanstack/react-query";
import { graphql } from "../../gql";
import { request, gql } from 'graphql-request';


interface SignUpInput {
  username: string;
  email: string;
  password: string;
  phone: string;
}
interface SignInInput {
  email: string;
  password: string;
}

const SignUpMutationDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    SignUp(input: $input) {
      id
    }
  }
`;

const SignInMutationDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
    jwt
    user {
      username
    }
  }
  }
`;


const Page: React.FC = () => {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const mutation = useMutation<unknown, Error, SignUpInput, unknown>({
    mutationFn: (input: SignUpInput) => request('http://localhost:5000/graphql', SignUpMutationDocument, { input })
  });

  const signInMutation = useMutation<unknown, Error, SignInInput, unknown>({
    mutationFn: (input: SignInInput) => request('http://localhost:5000/graphql', SignInMutationDocument, { input }),
    onSuccess: (data) => {
      // Store the user in local storage
      localStorage.setItem('user', JSON.stringify(data));
      // localStorage.setItem('jwt', JSON.stringify(data.jwt));
  
      // Redirect to the home page
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Sign-in error:', error);
    },
  });

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({
      email: email,
      phone: phone,
      password: password,
      username: username
    });
    
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    signInMutation.mutate({
      email: email,
      password: password,
    });
  }




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <Components.Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <Components.Input type='number' placeholder='Phone no.' onChange={(e) => setPhone(e.target.value)}/>
            <Components.Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <Components.Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <Components.Anchor href="#" >
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={() => toggle(true)} >Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Start your journey with Safa Sahar
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Page;
