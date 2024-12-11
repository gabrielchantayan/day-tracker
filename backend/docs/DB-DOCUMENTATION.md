# Database Documentation

<details><summary><code><b>cooldowns</b></code> <code>Cooldowns for users</code></summary>

#### Cooldowns

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The user's email address |
| cooldown_type | true | string | The type of cooldown |
| cooldown | true | number | The time when the cooldown will expire |
</details>

<details><summary><code><b>otp</b></code> <code>One-time passwords for users</code></summary>

#### One-time passwords

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The user's email address |
| otp | true | string | The one-time password |
| expiry | true | number | The time when the OTP will expire<br />Default: 15 minutes |
</details>

<details><summary><code><b>campaigns</b></code> <code>Campaigns for users</code></summary>

#### Campaigns

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | bson.ObjectId | The user's ID |
| title | true | string | The title of the campaign. By default, this is the name of the job being searched. |
| sources | true | string[] | The sources of the campaign |
| salary-min | true | number | The minimum salary to be searched |
| salary-max | true | number | The maximum salary to be searched |
| location | true | [ string, boolean ][] | The locations to be searched.<br /> [ 0: city, 1: remote ] |
</details>

<details><summary><code><b>external-accounts</b></code> <code>User's accounts for external job boards</code></summary>

#### External accounts

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The email account associated with the internal user account |
| provider | true | string | The provider |
| username | true | string | The user's username or email address |
| password | true | string | A PGP-encrypted password |
</details>

<details><summary><code><b>users</b></code> <code>Users</code></summary>

#### Users

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| first_name | true | string | The user's first name |
| last_name | true | string | The user's last name |
| account_email | true | string | The email address the user uses to sign in |
| email | true | string | The user's email address used on the resume |
| phone | true | string | The user's phone number |
| plan | true | string | The user's plan |
| created_at | true | timestamp | The time when the user was created |
| updated_at | true | timestamp | The time when the user was updated |
| last_login_at | true | timestamp | The time when the user last logged in |
| status | true | string | The user's status<br />[ active, inactive, banned ] |
| resume | true | object | The user's resume |
</details>

