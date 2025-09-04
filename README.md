# @faroe/client

A JavaScript client for Faroe servers.

## Overview

```ts
import * as faroe_client from "@faroe/client";

const actionInvocationEndpointClient = new ActionInvocationEndpointClient();

const client = new faroe_client.Client(actionInvocationEndpointClient);

const result = await client.createSignup(emailAddress);
if (!result.ok) {
	console.log(result.actionInvocationId, result.signup, result.signupToken);
} else {
	console.log(result.actionInvocationId, result.errorCode);
}
```

## Installation

```
npm install @faroe/client
```

## API reference

### ActionInvocationEndpointClient

```ts
interface ActionInvocationEndpointClient {
	// Sends a request to an action invocation endpoint with the request body.
	// Returns the string body of a 200 response.
	// An error is thrown if a 200 response could be received (after one or several attempts).
	sendActionInvocationEndpointRequest(body: string): Promise<string>;
}
```

### Client

```ts
function constructor(endpoint: string, actionInvocationEndpointClient: ActionInvocationEndpointClient);
```

A method is available for each action. For example, `Client.getSession()` is mapped to the `get_session` action.

Methods mapped to actions return an `ActionResult`, some extending the `ActionSuccessResult` type with additional fields.

```ts
type ActionResult = ActionSuccessResult | ActionErrorResult;

interface ActionSuccessResult {
	ok: true;
	actionInvocationId: string;
}

interface ActionErrorResult {
	ok: false;
	actionInvocationId: string;
	errorCode: string;
}
```

Action values are deserialized to JS values as such:

- int32: number
- int64: bigint
- string: string
- bytes: Uint8Array
- boolean: boolean
- timestamp: Date
- object: object
- list: array
- null: null
