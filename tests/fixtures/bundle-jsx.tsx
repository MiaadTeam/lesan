// JSX/React component for bundler testing
import React from "react";

export interface GreetingProps {
  name: string;
  message?: string;
}

export function Greeting({ name, message = "Hello" }: GreetingProps) {
  return (
    <div className="greeting">
      <h1>{message}, {name}!</h1>
      <p>Welcome to the Lesan framework.</p>
    </div>
  );
}

export const App = () => {
  return (
    <div className="app">
      <Greeting name="World" />
      <Greeting name="Developer" message="Hi" />
    </div>
  );
};
