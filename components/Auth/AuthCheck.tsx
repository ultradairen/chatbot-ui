import { useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import Home from "./Home";
import { getGraphClient } from "./Graph";
import { AccountInfo } from "@azure/msal-browser";
import { UserInfo } from "@/types/userinfo"
import { NIL } from "uuid";
import { OpenAIModelID } from "@/types/openai";

interface AuthCheckProps {
  serverSideApiKeyIsSet: boolean;
  defaultModelId: OpenAIModelID;
  serverSidePluginKeysSet: boolean;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  serverSideApiKeyIsSet,
  defaultModelId,
  serverSidePluginKeysSet,
}) => {
  const { accounts } = useMsal();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const graphClient = await getGraphClient();
      const account = accounts[0];
      const userInfo = await graphClient
        .api(`/users/${account.username}`)
        .select("department,companyName,jobTitle")
        .get();
      setUserInfo(userInfo);
    };
    if (accounts.length > 0) {
      fetchUserInfo();
    }
  }, [accounts]);

  return accounts.length > 0 && userInfo ? (
    <Home account={accounts[0]} userInfo={userInfo} serverSideApiKeyIsSet={serverSideApiKeyIsSet} defaultModelId={defaultModelId} serverSidePluginKeysSet={serverSidePluginKeysSet}/>
  ) : (
    <SignIn />
  );
};

export default AuthCheck;
