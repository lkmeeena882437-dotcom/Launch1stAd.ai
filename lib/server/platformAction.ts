export type PlatformActionInput = {
  provider: string;
  requestId: string;
  payload: unknown;
};

export type PlatformActionResult = {
  ok: boolean;
  status: "missing_setup" | "sent" | "failed";
  message: string;
  response?: unknown;
};

export async function sendPlatformAction(input: PlatformActionInput): Promise<PlatformActionResult> {
  const endpoint = input.provider === "google" ? process.env.CONNECTOR_B_ENDPOINT : process.env.CONNECTOR_A_ENDPOINT;
  const secret = process.env.CONNECTOR_SHARED_SECRET;

  if (!endpoint || !secret) {
    return {
      ok: false,
      status: "missing_setup",
      message: "Connector setup missing. Add connector endpoint and shared secret in deployment settings."
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-connector-secret": secret
      },
      body: JSON.stringify(input)
    });
    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.ok ? "sent" : "failed",
      message: response.ok ? "Request sent to connector." : "Connector returned an error.",
      response: data
    };
  } catch (error) {
    return {
      ok: false,
      status: "failed",
      message: error instanceof Error ? error.message : "Connector request failed."
    };
  }
}
