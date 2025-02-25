# API Documentation



---

#### ACCOUNT

<details>
<summary><code>POST</code> <code><b>/api/account/register</b></code> <code>Registers a new account</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 
> | form_info | true | object | Form info |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The account is successfully registered | {"token":"string","email":"string (Account's email address)","name":"string (First + Last name)"} | account.registered | 
> | account-already-exists | false | The account already exists | null | error.account.already-exists | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/account/login</b></code> <code>Logs in an account</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 
> | otp | true | string | One-time password |  | 
> | reset_token | false | boolean | Reset the user's token upon login? | false | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The account is successfully logged in | {"token":"string","email":"string (Account's email address)","name":"string (First + Last name)"} | account.logged-in | 
> | account-not-found | false | The specified account is not found in the database | null | error.account.not-found | 
> | account-disabled | false | The specified account is disabled | null | error.account.disabled | 

</details>



---

#### AUTH

<details>
<summary><code>POST</code> <code><b>/api/auth/generate-otp</b></code> <code>Generates an OTP for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The OTP is successfully sent | {"timestamp":"number"} | auth.otp.sent | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/resend-otp</b></code> <code>Resends an OTP for a specified user</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 


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
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 
> | code | true | string | One-time password |  | 


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
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | email | true | string | Email address |  | 
> | token | true | string | User's token |  | 


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
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | User |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The user's new token is successfully granted | null | auth.token.granted | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/grant-user-token</b></code> <code>Grants a user their token if it exists. If not, it creates a new token</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | User |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The user's token is successfully granted | null | auth.token.granted | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/auth/revoke-user-token</b></code> <code>Revokes a user's token. Used for global logout</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | User |  | 


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
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | date | true | number | The number of days since the epoch |  | 
> | data | true | object | Data |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The data is successfully updated | null | data.updated | 
> | could-not-update | false | The data could not be updated | null | error.data.could-not-update | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/data/get_data</b></code> <code>Gets data</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 
> | date | true | number | The number of days since the epoch |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The data is successfully found | "The data for the specified date" | data.found | 
> | not-found | false | The data is not found | null | error.data.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/data/get_prefill</b></code> <code>Gets prefill</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 
> | date | true | number | The number of days since the epoch |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The data is successfully found | "Prefill data" | prefill.found | 
> | not-found | false | The data is not found | null | error.prefill.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/data/download_csv</b></code> <code>Downloads a CSV file containing the user's data for the specified date range</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 
> | date_range | true | object { from: date, to: date } | A range of date objects. |  | 
> | all_time | false | boolean | If the data should be downloaded for all time instead of a specific date range.<br />If this value is specified, the `date_range` parameter is ignored. | false | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | Pulled the data successfully | "A CSV file containing the user's data for the specified date range" | data.found | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 
> | token-invalid | false | The given token does not match the user's token in the database | null | error.auth.token.invalid | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/data/get_summary</b></code> <code>Gets a summary of the user's data for the specified date range</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 
> | date_range | true | object { from: date, to: date } | A range of date objects. |  | 
> | all_time | false | boolean | If the data should be downloaded for all time instead of a specific date range.<br />If this value is specified, the `date_range` parameter is ignored. | false | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | Pulled the data successfully | "A CSV file containing the user's data for the specified date range" | data.found | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 
> | token-invalid | false | The given token does not match the user's token in the database | null | error.auth.token.invalid | 

</details>



---

#### STRUCTURE

<details>
<summary><code>POST</code> <code><b>/api/structure/get_structure</b></code> <code>Gets structure</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The structure is successfully found | "Structure object" | structure.found | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 
> | structure-not-found | false | Could not find a structure for the specified user. The default structure is to be used. | null | error.structure.not-found | 

</details>

<details>
<summary><code>POST</code> <code><b>/api/structure/update_structure</b></code> <code>Updates structure</code></summary>

##### Parameters
> | Name | Required | Data Type | Description | Default Value | 
> |---|---|---|---|---|
> | user | true | string | The user's email address |  | 
> | token | true | string | The user's token |  | 
> | structure | true | object | The new structure |  | 


##### Responses

> | Name | Success | Description | Data | Message | 
> |---|---|---|---|---|
> | success | true | The structure is successfully updated | null | structure.updated | 
> | user-not-found | false | The specified user is not found in the database | null | error.auth.user.not-found | 
> | could-not-update | false | Could not update the structure | null | error.structure.could-not-update | 

</details>

