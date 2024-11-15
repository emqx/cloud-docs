# Pricing

The pricing metrics for Shadow Service include memory, invocation, and traffic.

## Memory

Shadow Service offers 3 sizes of memory and is billed according to the hours of running at different unit rates. Charges are billed hourly and can be viewed in `Billing` - `Charges by Service` with the billing type `Shadow Service`.

<table>
   <tr>
      <th>Specification</th>
      <th>Pricing</th>
   </tr>
   <tr>
      <td>1 GB</td>
      <td>0.08 USD per hour</td>
   </tr>
   <tr>
      <td>2 GB</td>
      <td>0.15 USD per hour </td>
   </tr>
   <tr>
      <td>4 GB</td>
      <td>0.30 USD per hour</td>
   </tr>
</table>


## Invocation

The invocation includes every message published from the device or client, and every API call. 

- The unit rate is **0.04 USD per 10,000 requests**.
- When each 10,000 calls have been invoked, the charges are billed at that exact hour, which can be viewed in `Billing` - `Charges by Service` with the billing type `Shadow Service`.
- At the end of each month, all unbilled invocations under 10,000 will be billed at unit rate. At the beginning of the following month, the invocation will be counted from 0.
- If the service has been deleted, any unbilled invocation will not be billed.


## Traffic

The invocation will generate traffic, including the messages that the device or client publish or subscribe, as well as the API calls from the application. Traffic will be attributed as part of the traffic of deployment and will be shared using the free monthly traffic. The excess traffic will be billed at $0.15/GB.


## Billing Example

<table>
   <tr>
      <th>Scenario</th>
      <th>Specification / Pricing</th>
      <th>Invocation</th>
      <th>Traffic</th>
      <th>Charge</th>
   </tr>
   <tr>
      <td>1GB, 30 days</td>
      <td>1GB | $ 0.08 per hour</td>
      <td>1,005,000 </td>
      <td>10GB (In Free Traffic)</td>
      <td>$ 61.64  = 0.08 * 24 * 30 + 101 * 0.04 + 0</td>
   </tr>
   <tr>
      <td>2GB, 30 days</td>
      <td>2GB | $ 0.15 per hour</td>
      <td>15,000,000 </td>
      <td>150 GB（Excess Traffic: 50 GB）
      </td>
      <td>$ 175.5 = 0.15 * 24 * 30 + 1500 * 0.04 + 50 * 0.15</td>
   </tr>
   <tr>
      <td>1GB 10 days</td>
      <td>1GB | $ 0.08 per hour</td>
      <td>56,000</td>
      <td>0.5 GB (In Free Traffic)</td>
      <td>$ 19.4 = 0.08 * 24 * 10 + 5 * 0.04 + 0</td>
   </tr>
</table>

::: tip
The billing examples are for reference only.
:::

