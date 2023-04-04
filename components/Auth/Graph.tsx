// graphClient.tsx
import { Client } from "@microsoft/microsoft-graph-client";
import { InteractionRequiredAuthError, PublicClientApplication, AccountInfo } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URL as string,
  },
};

const publicClientApplication = new PublicClientApplication(msalConfig);

async function getGraphClient(): Promise<Client> {
  const account: AccountInfo | undefined = publicClientApplication.getAllAccounts()[0];

  if (!account) {
    throw new Error("User not logged in");
  }

  const tokenRequest = {
    scopes: ["User.Read"],
    account: account,
  };

  try {
    const response = await publicClientApplication.acquireTokenSilent(tokenRequest);

    const graphClient = Client.init({
      authProvider: function (done) {
        done(null, response.accessToken);
      },
    });

    return graphClient;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await publicClientApplication.acquireTokenPopup(tokenRequest);
      return await getGraphClient();
    } else {
      throw error;
    }
  }
}

export { getGraphClient };
