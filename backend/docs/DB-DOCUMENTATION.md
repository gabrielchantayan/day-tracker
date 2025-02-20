# Database Documentation

<details><summary><code><b>days</b></code> <code>Contains the data for each inputted day</code></summary>

#### Days

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The user's email address |
| date | true | number | The number of days since the epoch |
| data | true | object | The data for the user's day. This will vary depending on what the user had filled out and what the user's structure is |
| data_version | true | number | The version of the data. Current: 2 |
</details>

<details><summary><code><b>prefill</b></code> <code>Every single item that the user has entered in their tracker.</code></summary>

#### Prefill

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The user's email address |
| data | true | object | Each category's prefilled values. This will vary depending on what the user had filled out and what the user's structure is. |
</details>

<details><summary><code><b>structure</b></code> <code>The user's structures</code></summary>

#### Structure

##### Fields

| Name | Required | Data Type | Description |
|---|---|---|---|
| user | true | string | The user's email address |
| structure | true | array[{ name: STRING, fields: [ { name: STRING, type: STRING } ] }] | The structure of the user's data. |
</details>

