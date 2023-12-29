# Null Action (Debug)

A null action configures rules without associating them with any actions and can be used exclusively for rule debugging.

## Configure Rules

1. Click **Data Integration** from the left menu, and find **Do Nothing (debug)** under the Debug category. Click to enter the New rule page and enter the following rule-matching SQL statement in **SQL Editor**.

   ```sql
   SELECT
       payload.msg as msg
   FROM
       "t/#"
   WHERE
       msg = 'hello'
   ```

2. Click the **Enable Test** toggle switch below the **SQL Editor** and enter the following test data:

   - **Topic**: t/a

   - **Payload**:

     ```json
     {
       "msg": "hello"
     }
     ```

3. Click **Test**, and check the output result. If set correctly, the test output should receive complete JSON data like the following:

   If the test output matches the expectation, you can proceed to the next steps.

   > Note: If the test cannot pass, check if the SQL is compliant.
   
   ```json
   {
     "msg": "hello"
   }
   ```

4. Click **Create Rule** and return to the rule list. You can see a rule that does not contain any actions.

## Test

You are recommended to use [MQTTX](https://mqttx.app/) to simulate data reporting, and you can also use any other client to complete it.

1. Use the MQTTX to connect to the deployment and send messages to the t/a topic with the following content.

   ```json
   {
     "msg": "hello"
   }
   ```

2. Check the runtime data in the console. Click on the rule ID in the rule list, and you can see the statistics of the null action rule on the runtime statistics page.
