export class Client {
	public actionInvocationEndpointClient: ActionInvocationEndpointClient;

	constructor(actionInvocationEndpointClient: ActionInvocationEndpointClient) {
		this.actionInvocationEndpointClient = actionInvocationEndpointClient;
	}

	private async sendActionInvocationRequest(method: string, argumentsJSONObject: object): Promise<object> {
		const bodyJSON = JSON.stringify({
			method: method,
			arguments: argumentsJSONObject
		});

		const resultJSON = await this.actionInvocationEndpointClient.sendActionInvocationEndpointRequest(bodyJSON);

		const resultJSONObject = await JSON.parse(resultJSON);
		if (typeof resultJSONObject !== "object" || resultJSONObject === null) {
			throw new Error("Expected result JSON to be an object");
		}

		return resultJSONObject;
	}

	public async createSignup(emailAddress: string): Promise<CreateSignupActionResult> {
		const argumentsJSONObject: object = {
			email_address: emailAddress
		};

		const resultJSONObject = await this.sendActionInvocationRequest("create_signup", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("signup" in resultJSONObject) ||
			typeof resultJSONObject.signup !== "object" ||
			resultJSONObject.signup === null
		) {
			throw new Error("Invalid or missing 'signup' field");
		}
		const signup = mapJSONObjectToSignup(resultJSONObject.signup);

		if (!("signup_token" in resultJSONObject) || typeof resultJSONObject.signup_token !== "string") {
			throw new Error("Invalid or missing 'signup_token' field");
		}
		const signupToken = resultJSONObject.signup_token;

		const result: CreateSignupActionSuccessResult = {
			ok: true,
			actionInvocationId,
			signup,
			signupToken
		};
		return result;
	}

	public async getSignup(signupToken: string): Promise<GetSignupActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_signup", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("signup" in resultJSONObject) ||
			typeof resultJSONObject.signup !== "object" ||
			resultJSONObject.signup === null
		) {
			throw new Error("Invalid or missing 'signup' field");
		}
		const signup = mapJSONObjectToSignup(resultJSONObject.signup);

		const result: GetSignupActionSuccessResult = {
			ok: true,
			actionInvocationId,
			signup
		};
		return result;
	}

	public async deleteSignup(signupToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("delete_signup", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async resendSignupEmailAddressVerificationCode(signupToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"resend_signup_email_address_verification_code",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async verifySignupEmailAddressVerificationCode(
		signupToken: string,
		emailAddressVerificationCode: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken,
			email_address_verification_code: emailAddressVerificationCode
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_signup_email_address_verification_code",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeSignup(signupToken: string): Promise<CompleteSignupActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("complete_signup_token", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("session" in resultJSONObject) ||
			typeof resultJSONObject.session !== "object" ||
			resultJSONObject.session === null
		) {
			throw new Error("Invalid or missing 'session' field");
		}
		const session = mapJSONObjectToSession(resultJSONObject.session);

		if (!("session_token" in resultJSONObject) || typeof resultJSONObject.session_token !== "string") {
			throw new Error("Invalid or missing 'session_token' field");
		}
		const sessionToken = resultJSONObject.session_token;

		const result: CompleteSignupActionSuccessResult = {
			ok: true,
			actionInvocationId,
			session,
			sessionToken
		};
		return result;
	}

	public async createSignin(emailAddress: string): Promise<CreateSigninActionResult> {
		const argumentsJSONObject: object = {
			email_address: emailAddress
		};

		const resultJSONObject = await this.sendActionInvocationRequest("create_signin", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("signin" in resultJSONObject) ||
			typeof resultJSONObject.signin !== "object" ||
			resultJSONObject.signin === null
		) {
			throw new Error("Invalid or missing 'signin' field");
		}
		const signin = mapJSONObjectToSignin(resultJSONObject.signin);

		if (!("signin_token" in resultJSONObject) || typeof resultJSONObject.signin_token !== "string") {
			throw new Error("Invalid or missing 'signin_token' field");
		}
		const signinToken = resultJSONObject.signin_token;

		const result: CreateSigninActionSuccessResult = {
			ok: true,
			actionInvocationId,
			signin,
			signinToken
		};
		return result;
	}

	public async getSignin(signinToken: string): Promise<GetSigninActionResult> {
		const argumentsJSONObject: object = {
			signin_token: signinToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_signin", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("signin" in resultJSONObject) ||
			typeof resultJSONObject.signin !== "object" ||
			resultJSONObject.signin === null
		) {
			throw new Error("Invalid or missing 'signin' field");
		}
		const signin = mapJSONObjectToSignin(resultJSONObject.signin);

		const result: GetSigninActionSuccessResult = {
			ok: true,
			actionInvocationId,
			signin
		};
		return result;
	}

	public async deleteSignin(signinToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			signin_token: signinToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("delete_signin", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async verifySigninUserPassword(signupToken: string, password: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			signup_token: signupToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest("verify_signin_user_password", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeSignin(signinToken: string): Promise<CompleteSigninActionResult> {
		const argumentsJSONObject: object = {
			signin_token: signinToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("complete_signin_token", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("session" in resultJSONObject) ||
			typeof resultJSONObject.session !== "object" ||
			resultJSONObject.session === null
		) {
			throw new Error("Invalid or missing 'session' field");
		}
		const session = mapJSONObjectToSession(resultJSONObject.session);

		if (!("session_token" in resultJSONObject) || typeof resultJSONObject.session_token !== "string") {
			throw new Error("Invalid or missing 'session_token' field");
		}
		const sessionToken = resultJSONObject.session_token;

		const result: CompleteSigninActionSuccessResult = {
			ok: true,
			actionInvocationId,
			session,
			sessionToken
		};
		return result;
	}

	public async getSession(sessionToken: string): Promise<GetSessionActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_session", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("session" in resultJSONObject) ||
			typeof resultJSONObject.session !== "object" ||
			resultJSONObject.session === null
		) {
			throw new Error("Invalid or missing 'session' field");
		}
		const session = mapJSONObjectToSession(resultJSONObject.session);

		const result: GetSessionActionSuccessResult = {
			ok: true,
			actionInvocationId,
			session
		};
		return result;
	}

	public async deleteSession(sessionToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("delete_session", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async deleteAllSessions(sessionToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("delete_all_sessions", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async createUserEmailAddressUpdate(
		sessionToken: string,
		newEmailAddress: string
	): Promise<CreateUserEmailAddressUpdateActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			new_email_address: newEmailAddress
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"create_user_email_address_update",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_email_address_update" in resultJSONObject) ||
			typeof resultJSONObject.user_email_address_update !== "object" ||
			resultJSONObject.user_email_address_update === null
		) {
			throw new Error("Invalid or missing 'user_email_address_update' field");
		}
		const userEmailAddressUpdate = mapJSONObjectToUserEmailAddressUpdate(resultJSONObject.user_email_address_update);

		if (
			!("user_email_address_update_token" in resultJSONObject) ||
			typeof resultJSONObject.user_email_address_update_token !== "string"
		) {
			throw new Error("Invalid or missing 'user_email_address_update_token' field");
		}
		const userEmailAddressUpdateToken = resultJSONObject.user_email_address_update_token;

		const result: CreateUserEmailAddressUpdateActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userEmailAddressUpdate,
			userEmailAddressUpdateToken
		};
		return result;
	}

	public async getUserEmailAddressUpdate(
		sessionToken: string,
		userEmailAddressUpdateToken: string
	): Promise<GetUserEmailAddressUpdateActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_email_address_update: userEmailAddressUpdateToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"get_user_email_address_update",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_email_address_update" in resultJSONObject) ||
			typeof resultJSONObject.user_email_address_update !== "object" ||
			resultJSONObject.user_email_address_update === null
		) {
			throw new Error("Invalid or missing 'user_email_address_update' field");
		}
		const userEmailAddressUpdate = mapJSONObjectToUserEmailAddressUpdate(resultJSONObject.user_email_address_update);

		const result: GetUserEmailAddressUpdateActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userEmailAddressUpdate
		};
		return result;
	}

	public async resendUserEmailAddressUpdateEmailAddressVerificationCode(
		sessionToken: string,
		userEmailAddressUpdateToken: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_email_address_update: userEmailAddressUpdateToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"resend_user_email_address_update_email_address_verification_code",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async verifyUserEmailAddressUpdateEmailAddressVerificationCode(
		sessionToken: string,
		userEmailAddressUpdateToken: string,
		emailAddressVerificationCode: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_email_address_update: userEmailAddressUpdateToken,
			email_address_verification_code: emailAddressVerificationCode
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_user_email_address_update_email_address_verification_code",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async verifyUserEmailAddressUpdateUserPassword(
		sessionToken: string,
		userEmailAddressUpdateToken: string,
		password: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_email_address_update: userEmailAddressUpdateToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_user_email_address_update_user_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeUserEmailAddressUpdate(
		sessionToken: string,
		userEmailAddressUpdateToken: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_email_address_update: userEmailAddressUpdateToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"complete_user_email_address_update",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async createUserPasswordUpdate(sessionToken: string): Promise<CreateUserPasswordUpdateActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("create_user_password_update", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_password_update" in resultJSONObject) ||
			typeof resultJSONObject.user_password_update !== "object" ||
			resultJSONObject.user_password_update === null
		) {
			throw new Error("Invalid or missing 'user_password_update' field");
		}
		const userPasswordUpdate = mapJSONObjectToUserPasswordUpdate(resultJSONObject.user_password_update);

		if (
			!("user_password_update_token" in resultJSONObject) ||
			typeof resultJSONObject.user_password_update_token !== "string"
		) {
			throw new Error("Invalid or missing 'user_password_update_token' field");
		}
		const userPasswordUpdateToken = resultJSONObject.user_password_update_token;

		const result: CreateUserPasswordUpdateActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userPasswordUpdate,
			userPasswordUpdateToken
		};
		return result;
	}

	public async getUserPasswordUpdate(
		sessionToken: string,
		userPasswordUpdateToken: string
	): Promise<GetUserPasswordUpdateActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_password_update: userPasswordUpdateToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_user_password_update", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_password_update" in resultJSONObject) ||
			typeof resultJSONObject.user_password_update !== "object" ||
			resultJSONObject.user_password_update === null
		) {
			throw new Error("Invalid or missing 'user_password_update' field");
		}
		const userPasswordUpdate = mapJSONObjectToUserPasswordUpdate(resultJSONObject.user_password_update);

		const result: GetUserPasswordUpdateActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userPasswordUpdate
		};
		return result;
	}

	public async verifyUserPasswordUpdateUserPassword(
		sessionToken: string,
		userPasswordUpdateToken: string,
		password: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_password_update: userPasswordUpdateToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_user_password_update_user_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async setUserPasswordUpdateNewPassword(
		sessionToken: string,
		userPasswordUpdateToken: string,
		password: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_password_update: userPasswordUpdateToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"set_user_password_update_new_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeUserPasswordUpdate(
		sessionToken: string,
		userPasswordUpdateToken: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_password_update: userPasswordUpdateToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"complete_user_password_update",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async createUserDeletion(sessionToken: string): Promise<CreateUserDeletionActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("create_user_user_deletion", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_user_deletion" in resultJSONObject) ||
			typeof resultJSONObject.user_user_deletion !== "object" ||
			resultJSONObject.user_user_deletion === null
		) {
			throw new Error("Invalid or missing 'user_user_deletion' field");
		}
		const userDeletion = mapJSONObjectToUserDeletion(resultJSONObject.user_user_deletion);

		if (
			!("user_user_deletion_token" in resultJSONObject) ||
			typeof resultJSONObject.user_user_deletion_token !== "string"
		) {
			throw new Error("Invalid or missing 'user_user_deletion_token' field");
		}
		const userDeletionToken = resultJSONObject.user_user_deletion_token;

		const result: CreateUserDeletionActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userDeletion,
			userDeletionToken
		};
		return result;
	}

	public async getUserDeletion(sessionToken: string, userDeletionToken: string): Promise<GetUserDeletionActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_user_deletion: userDeletionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_user_user_deletion", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_user_deletion" in resultJSONObject) ||
			typeof resultJSONObject.user_user_deletion !== "object" ||
			resultJSONObject.user_user_deletion === null
		) {
			throw new Error("Invalid or missing 'user_user_deletion' field");
		}
		const userDeletion = mapJSONObjectToUserDeletion(resultJSONObject.user_user_deletion);

		const result: GetUserDeletionActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userDeletion
		};
		return result;
	}

	public async verifyUserDeletionUserPassword(
		sessionToken: string,
		userDeletionToken: string,
		password: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_user_deletion: userDeletionToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_user_user_deletion_user_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeUserDeletion(sessionToken: string, userDeletionToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			session_token: sessionToken,
			user_user_deletion: userDeletionToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("complete_user_user_deletion", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async createUserPasswordReset(emailAddress: string): Promise<CreateUserPasswordResetActionResult> {
		const argumentsJSONObject: object = {
			email_address: emailAddress
		};

		const resultJSONObject = await this.sendActionInvocationRequest("create_user_password_reset", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("user_password_reset" in resultJSONObject) ||
			typeof resultJSONObject.user_password_reset !== "object" ||
			resultJSONObject.user_password_reset === null
		) {
			throw new Error("Invalid or missing 'user_password_reset' field");
		}
		const userPasswordReset = mapJSONObjectToUserPasswordReset(resultJSONObject.user_password_reset);

		if (
			!("user_password_reset_token" in resultJSONObject) ||
			typeof resultJSONObject.user_password_reset_token !== "string"
		) {
			throw new Error("Invalid or missing 'user_password_reset_token' field");
		}
		const userPasswordResetToken = resultJSONObject.user_password_reset_token;

		const result: CreateUserPasswordResetActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userPasswordReset,
			userPasswordResetToken
		};
		return result;
	}

	public async getUserPasswordReset(userPasswordResetToken: string): Promise<GetUserPasswordResetActionResult> {
		const argumentsJSONObject: object = {
			user_password_reset_token: userPasswordResetToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("get_user_password_reset", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("userPasswordReset" in resultJSONObject) ||
			typeof resultJSONObject.userPasswordReset !== "object" ||
			resultJSONObject.userPasswordReset === null
		) {
			throw new Error("Invalid or missing 'userPasswordReset' field");
		}
		const userPasswordReset = mapJSONObjectToUserPasswordReset(resultJSONObject.userPasswordReset);

		const result: GetUserPasswordResetActionSuccessResult = {
			ok: true,
			actionInvocationId,
			userPasswordReset
		};
		return result;
	}

	public async deleteUserPasswordReset(userPasswordResetToken: string): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			user_password_reset_token: userPasswordResetToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest("delete_user_password_reset", argumentsJSONObject);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async verifyUserPasswordResetTemporaryPassword(
		userPasswordResetToken: string,
		temporaryPassword: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			user_password_reset_token: userPasswordResetToken,
			temporary_password: temporaryPassword
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"verify_user_password_reset_temporary_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async setUserPasswordResetNewPassword(
		userPasswordResetToken: string,
		password: string
	): Promise<ActionResult> {
		const argumentsJSONObject: object = {
			user_password_reset_token: userPasswordResetToken,
			password: password
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"set_user_password_reset_new_password",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		const result: ActionResult = {
			ok: true,
			actionInvocationId
		};
		return result;
	}

	public async completeUserPasswordReset(
		userPasswordResetToken: string
	): Promise<CompleteUserPasswordResetActionResult> {
		const argumentsJSONObject: object = {
			user_password_reset_token: userPasswordResetToken
		};

		const resultJSONObject = await this.sendActionInvocationRequest(
			"complete_user_password_reset_token",
			argumentsJSONObject
		);

		const resultOk = getOkFromActionResultJSONObject(resultJSONObject);
		const actionInvocationId = getActionInvocationIdFromActionResultJSONObject(resultJSONObject);

		if (!resultOk) {
			const errorCode = getErrorCodeFromActionErrorResultJSONObject(resultJSONObject);

			const result: ActionErrorResult = {
				ok: false,
				actionInvocationId: actionInvocationId,
				errorCode: errorCode
			};
			return result;
		}

		if (
			!("session" in resultJSONObject) ||
			typeof resultJSONObject.session !== "object" ||
			resultJSONObject.session === null
		) {
			throw new Error("Invalid or missing 'session' field");
		}
		const session = mapJSONObjectToSession(resultJSONObject.session);

		if (!("session_token" in resultJSONObject) || typeof resultJSONObject.session_token !== "string") {
			throw new Error("Invalid or missing 'session_token' field");
		}
		const sessionToken = resultJSONObject.session_token;

		const result: CompleteUserPasswordResetActionSuccessResult = {
			ok: true,
			actionInvocationId,
			session,
			sessionToken
		};
		return result;
	}
}

function getOkFromActionResultJSONObject(resultJSONObject: object): boolean {
	if (!("ok" in resultJSONObject) || typeof resultJSONObject.ok !== "boolean") {
		throw new Error("Invalid or missing 'ok' field in result JSON object");
	}
	return resultJSONObject.ok;
}

function getActionInvocationIdFromActionResultJSONObject(resultJSONObject: object): string {
	if (!("action_invocation_id" in resultJSONObject) || typeof resultJSONObject.action_invocation_id !== "string") {
		throw new Error("Invalid or missing 'action_invocation_id' field");
	}
	return resultJSONObject.action_invocation_id;
}

function getErrorCodeFromActionErrorResultJSONObject(resultJSONObject: object): string {
	if (!("error_code" in resultJSONObject) || typeof resultJSONObject.error_code !== "string") {
		throw new Error("Invalid or missing 'error_code' field");
	}
	return resultJSONObject.error_code;
}

export type ActionResult = ActionSuccessResult | ActionErrorResult;

export interface ActionSuccessResult {
	ok: true;
	actionInvocationId: string;
}

export interface ActionErrorResult {
	ok: false;
	actionInvocationId: string;
	errorCode: string;
}

export type CreateSignupActionResult = CreateSignupActionSuccessResult | ActionErrorResult;

export interface CreateSignupActionSuccessResult extends ActionSuccessResult {
	signup: Signup;
	signupToken: string;
}

export type GetSignupActionResult = GetSignupActionSuccessResult | ActionErrorResult;

export interface GetSignupActionSuccessResult extends ActionSuccessResult {
	signup: Signup;
}

export type CompleteSignupActionResult = CompleteSignupActionSuccessResult | ActionErrorResult;

interface CompleteSignupActionSuccessResult extends ActionSuccessResult {
	session: Session;
	sessionToken: string;
}

type CreateSigninActionResult = CreateSigninActionSuccessResult | ActionErrorResult;

interface CreateSigninActionSuccessResult extends ActionSuccessResult {
	signin: Signin;
	signinToken: string;
}

type GetSigninActionResult = GetSigninActionSuccessResult | ActionErrorResult;

export interface GetSigninActionSuccessResult extends ActionSuccessResult {
	signin: Signin;
}

export type CompleteSigninActionResult = CompleteSigninActionSuccessResult | ActionErrorResult;

export interface CompleteSigninActionSuccessResult extends ActionSuccessResult {
	session: Session;
	sessionToken: string;
}

export type GetSessionActionResult = GetSessionActionSuccessResult | ActionErrorResult;

export interface GetSessionActionSuccessResult extends ActionSuccessResult {
	session: Session;
}

export type CreateUserEmailAddressUpdateActionResult = CreateUserEmailAddressUpdateActionSuccessResult | ActionErrorResult;

export interface CreateUserEmailAddressUpdateActionSuccessResult extends ActionSuccessResult {
	userEmailAddressUpdate: UserEmailAddressUpdate;
	userEmailAddressUpdateToken: string;
}

export type GetUserEmailAddressUpdateActionResult = GetUserEmailAddressUpdateActionSuccessResult | ActionErrorResult;

export interface GetUserEmailAddressUpdateActionSuccessResult extends ActionSuccessResult {
	userEmailAddressUpdate: UserEmailAddressUpdate;
}

export type CreateUserPasswordUpdateActionResult = CreateUserPasswordUpdateActionSuccessResult | ActionErrorResult;

export interface CreateUserPasswordUpdateActionSuccessResult extends ActionSuccessResult {
	userPasswordUpdate: UserPasswordUpdate;
	userPasswordUpdateToken: string;
}

export type GetUserPasswordUpdateActionResult = GetUserPasswordUpdateActionSuccessResult | ActionErrorResult;

export interface GetUserPasswordUpdateActionSuccessResult extends ActionSuccessResult {
	userPasswordUpdate: UserPasswordUpdate;
}

export type CreateUserDeletionActionResult = CreateUserDeletionActionSuccessResult | ActionErrorResult;

export interface CreateUserDeletionActionSuccessResult extends ActionSuccessResult {
	userDeletion: UserDeletion;
	userDeletionToken: string;
}

export type GetUserDeletionActionResult = GetUserDeletionActionSuccessResult | ActionErrorResult;

export interface GetUserDeletionActionSuccessResult extends ActionSuccessResult {
	userDeletion: UserDeletion;
}

export type CreateUserPasswordResetActionResult = CreateUserPasswordResetActionSuccessResult | ActionErrorResult;

export interface CreateUserPasswordResetActionSuccessResult extends ActionSuccessResult {
	userPasswordReset: UserPasswordReset;
	userPasswordResetToken: string;
}

export type GetUserPasswordResetActionResult = GetUserPasswordResetActionSuccessResult | ActionErrorResult;

export interface GetUserPasswordResetActionSuccessResult extends ActionSuccessResult {
	userPasswordReset: UserPasswordReset;
}

export type CompleteUserPasswordResetActionResult = CompleteUserPasswordResetActionSuccessResult | ActionErrorResult;

export interface CompleteUserPasswordResetActionSuccessResult extends ActionSuccessResult {
	session: Session;
	sessionToken: string;
}

export interface ActionInvocationEndpointClient {
	sendActionInvocationEndpointRequest(body: string): Promise<string>;
}

export interface Signup {
	id: string;
	emailAddress: string;
	emailAddressVerified: boolean;
	passwordSet: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToSignup(jsonObject: unknown): Signup {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("email_address" in jsonObject) || typeof jsonObject.email_address !== "string") {
		throw new Error("Invalid or missing 'email_address' field");
	}
	const emailAddress = jsonObject.email_address;

	if (!("email_address_verified" in jsonObject) || typeof jsonObject.email_address_verified !== "boolean") {
		throw new Error("Invalid or missing 'email_address_verified' field");
	}
	const emailAddressVerified = jsonObject.email_address_verified;

	if (!("password_set" in jsonObject) || typeof jsonObject.password_set !== "boolean") {
		throw new Error("Invalid or missing 'password_set' field");
	}
	const passwordSet = jsonObject.password_set;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const signup: Signup = {
		id,
		emailAddress,
		emailAddressVerified,
		passwordSet,
		createdAt,
		expiresAt
	};

	return signup;
}

export interface Signin {
	id: string;
	userId: string;
	userFirstFactorVerified: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToSignin(jsonObject: unknown): Signin {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'unregistered_user_id' field");
	}
	const userId = jsonObject.user_id;

	if (!("user_first_factor_verified" in jsonObject) || typeof jsonObject.user_first_factor_verified !== "boolean") {
		throw new Error("Invalid or missing 'user_password_set' field");
	}
	const userFirstFactorVerified = jsonObject.user_first_factor_verified;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const signin: Signin = {
		id,
		userId,
		userFirstFactorVerified,
		createdAt,
		expiresAt
	};

	return signin;
}

export interface Session {
	id: string;
	userId: string;
	createdAt: Date;
	expiresAt: Date | null;
}

function mapJSONObjectToSession(jsonObject: unknown): Session {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'user_id' field");
	}
	const userId = jsonObject.user_id;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	let expiresAt: Date | null;
	if (
		"expires_at" in jsonObject &&
		typeof jsonObject.expires_at === "number" &&
		Number.isInteger(jsonObject.expires_at) &&
		jsonObject.expires_at > 0
	) {
		expiresAt = new Date(jsonObject.expires_at * 1000);
	} else if ("expires_at" in jsonObject && jsonObject.expires_at === null) {
		expiresAt = null;
	} else {
		throw new Error("Invalid or missing expires_at field");
	}

	const session: Session = {
		id,
		userId,
		createdAt,
		expiresAt
	};

	return session;
}

export interface UserEmailAddressUpdate {
	id: string;
	userId: string;
	sessionId: string;
	newEmailAddress: string;
	newEmailAddressVerified: boolean;
	userIdentityVerified: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToUserEmailAddressUpdate(jsonObject: unknown): UserEmailAddressUpdate {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'user_id' field");
	}
	const userId = jsonObject.user_id;

	if (!("session_id" in jsonObject) || typeof jsonObject.session_id !== "string") {
		throw new Error("Invalid or missing 'session_id' field");
	}
	const sessionId = jsonObject.session_id;

	if (!("new_email_address" in jsonObject) || typeof jsonObject.new_email_address !== "string") {
		throw new Error("Invalid or missing 'new_email_address' field");
	}
	const newEmailAddress = jsonObject.new_email_address;

	if (!("new_email_address_verified" in jsonObject) || typeof jsonObject.new_email_address_verified !== "boolean") {
		throw new Error("Invalid or missing 'new_email_address_verified' field");
	}
	const newEmailAddressVerified = jsonObject.new_email_address_verified;

	if (!("user_identity_verified" in jsonObject) || typeof jsonObject.user_identity_verified !== "boolean") {
		throw new Error("Invalid or missing 'user_identity_verified' field");
	}
	const userIdentityVerified = jsonObject.user_identity_verified;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const userEmailAddressUpdate: UserEmailAddressUpdate = {
		id,
		userId,
		sessionId,
		newEmailAddress,
		newEmailAddressVerified,
		userIdentityVerified,
		createdAt,
		expiresAt
	};

	return userEmailAddressUpdate;
}

export interface UserPasswordUpdate {
	id: string;
	userId: string;
	sessionId: string;
	userIdentityVerified: boolean;
	newPasswordSet: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToUserPasswordUpdate(jsonObject: unknown): UserPasswordUpdate {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'user_id' field");
	}
	const userId = jsonObject.user_id;

	if (!("session_id" in jsonObject) || typeof jsonObject.session_id !== "string") {
		throw new Error("Invalid or missing 'session_id' field");
	}
	const sessionId = jsonObject.session_id;

	if (!("new_password_set" in jsonObject) || typeof jsonObject.new_password_set !== "boolean") {
		throw new Error("Invalid or missing 'new_password_set' field");
	}
	const newPasswordSet = jsonObject.new_password_set;

	if (!("user_identity_verified" in jsonObject) || typeof jsonObject.user_identity_verified !== "boolean") {
		throw new Error("Invalid or missing 'user_identity_verified' field");
	}
	const userIdentityVerified = jsonObject.user_identity_verified;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const userPasswordUpdate: UserPasswordUpdate = {
		id,
		userId,
		sessionId,
		newPasswordSet,
		userIdentityVerified,
		createdAt,
		expiresAt
	};

	return userPasswordUpdate;
}

export interface UserDeletion {
	id: string;
	userId: string;
	sessionId: string;
	userIdentityVerified: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToUserDeletion(jsonObject: unknown): UserDeletion {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'user_id' field");
	}
	const userId = jsonObject.user_id;

	if (!("session_id" in jsonObject) || typeof jsonObject.session_id !== "string") {
		throw new Error("Invalid or missing 'session_id' field");
	}
	const sessionId = jsonObject.session_id;

	if (!("user_identity_verified" in jsonObject) || typeof jsonObject.user_identity_verified !== "boolean") {
		throw new Error("Invalid or missing 'user_identity_verified' field");
	}
	const userIdentityVerified = jsonObject.user_identity_verified;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const userDeletion: UserDeletion = {
		id,
		userId,
		sessionId,
		userIdentityVerified,
		createdAt,
		expiresAt
	};

	return userDeletion;
}

export interface UserPasswordReset {
	id: string;
	userId: string;
	userFirstFactorVerified: boolean;
	newPasswordSet: boolean;
	createdAt: Date;
	expiresAt: Date;
}

function mapJSONObjectToUserPasswordReset(jsonObject: unknown): UserPasswordReset {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		throw new Error("invalid json object");
	}

	if (!("id" in jsonObject) || typeof jsonObject.id !== "string") {
		throw new Error("Invalid or missing 'id' field");
	}
	const id = jsonObject.id;

	if (!("user_id" in jsonObject) || typeof jsonObject.user_id !== "string") {
		throw new Error("Invalid or missing 'user_id' field");
	}
	const userId = jsonObject.user_id;

	if (!("new_password_set" in jsonObject) || typeof jsonObject.new_password_set !== "boolean") {
		throw new Error("Invalid or missing 'new_password_set' field");
	}
	const newPasswordSet = jsonObject.new_password_set;

	if (!("user_first_factor_verified" in jsonObject) || typeof jsonObject.user_first_factor_verified !== "boolean") {
		throw new Error("Invalid or missing 'user_first_factor_verified' field");
	}
	const userFirstFactorVerified = jsonObject.user_first_factor_verified;

	if (
		!("created_at" in jsonObject) ||
		typeof jsonObject.created_at !== "number" ||
		!Number.isInteger(jsonObject.created_at) ||
		jsonObject.created_at < 0
	) {
		throw new Error("Invalid or missing 'created_at' field");
	}
	const createdAt = new Date(jsonObject.created_at * 1000);

	if (
		!("expires_at" in jsonObject) ||
		typeof jsonObject.expires_at !== "number" ||
		!Number.isInteger(jsonObject.expires_at) ||
		jsonObject.expires_at < 0
	) {
		throw new Error("Invalid or missing 'expires_at' field");
	}
	const expiresAt = new Date(jsonObject.expires_at * 1000);

	const userPasswordUpdate: UserPasswordReset = {
		id,
		userId,
		userFirstFactorVerified,
		newPasswordSet,
		createdAt,
		expiresAt
	};

	return userPasswordUpdate;
}
