# API Documentation



---

#### AUTH

<details>
<summary><code>POST</code> <code><b>/api/auth/generate-otp</b></code> <code>Generates an OTP for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | email | true | string | Email address | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The OTP is successfully sent | {"timestamp":"number"} | auth.otp.sent | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/resend-otp</b></code> <code>Resends an OTP for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | email | true | string | Email address | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The OTP is successfully resent | null | auth.otp.resend | 
> | otp-not-found | false | The OTP is not found | null | error.otp.not-found | 
> | otp-expired | false | The OTP is expired | null | error.otp.expired | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/verify-otp</b></code> <code>Verifies an OTP for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | email | true | string | Email address | 
> | code | true | string | One-time password | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The OTP is successfully verified | null | auth.otp.verified | 
> | otp-not-found | false | There is no OTP for the specified user | null | error.otp.not-found | 
> | otp-expired | false | The OTP is expired | null | error.otp.expired | 
> | otp-invalid | false | The OTP is invalid | null | error.otp.invalid | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/validate-token</b></code> <code>Validates a token for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | email | true | string | Email address | 
> | token | true | string | User's token | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The token is successfully validated | null | auth.token.validated | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 
> | token-not-found | false | The user does not have a token in the database<br />(This should never happen) | null | error.auth.token.not-found | 
> | token-invalid | false | The given token does not match the user's token in the database | null | error.auth.token.invalid | 
> | token-expired | false | The token is expired | null | error.auth.token.expired | 
> | field-missing | false | A required field is missing | null | error.api.field.missing | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/grant-user-new-token</b></code> <code>Grants a user a new token</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | user | true | string | User | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The user's new token is successfully granted | null | auth.token.granted | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/grant-user-token</b></code> <code>Grants a user their token if it exists. If not, it creates a new token</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | user | true | string | User | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The user's token is successfully granted | null | auth.token.granted | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/revoke-user-token</b></code> <code>Revokes a user's token. Used for global logout</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | user | true | string | User | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The user's token is successfully revoked | null | auth.token.revoked | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 

</details>



---

#### DATA

<details>
<summary><code>POST</code> <code><b>/api/data/update_data</b></code> <code>Updates data</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | user | true | string | User | 
> | date | true | string | Date | 
> | data | true | object | Data | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|

</details>

<details>
<summary><code>POST</code> <code><b>/api/data/get_data</b></code> <code>Gets data</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|
> | user | true | string | User | 
> | token | true | string | Token | 
> | date | true | string | Date | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|

</details>



---

#### TEST

<details>
<summary><code>POST</code> <code><b>/api/test/test</b></code> <code>Test API</code></summary>

##### Parameters
> | Name | Required | Data Type | Description |
> |---|---|---|---|


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|

</details>

