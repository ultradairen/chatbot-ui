import { useMsal } from "@azure/msal-react";
import React from "react";

const SignInButton: React.FC = () => {
  const { instance } = useMsal();

  const handleSignIn = () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };
    instance.loginRedirect(loginRequest);
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded inline-block mx-2 my-4 transition duration-300"
      onClick={handleSignIn}
    >
      <img
        className="h-5 mr-2 inline align-middle"
        src="/MicrosoftLogo.png"
        alt="Microsoft Logo"
      />
      サインイン
    </button>
  );
};

export default SignInButton;
