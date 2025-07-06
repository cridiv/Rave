import React from "react";
import SignIn from "./SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Rave - Personalized AI Learning Roadmaps",
  description:
    "Sign in to Rave to create and manage your personalized AI learning journeys",
};

export default function SignInPage() {
  return <SignIn />;
}
