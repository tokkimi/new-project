import test from "node:test";
import assert from "node:assert/strict";
import { checkoutInput, subscriptionLineItem } from "../src/lib/subscription-plans";

test("checkout charges EUR 1.99 monthly or EUR 9.90 yearly, never monthly for annual", () => {
  assert.deepEqual(subscriptionLineItem("monthly", "prod_haru"), { quantity: 1, price_data: { currency: "eur", product: "prod_haru", unit_amount: 199, recurring: { interval: "month" }, tax_behavior: "inclusive" } });
  const yearly = subscriptionLineItem("annual", "prod_haru");
  assert.equal(yearly.price_data.unit_amount, 990);
  assert.equal(yearly.price_data.recurring.interval, "year");
  assert.equal(yearly.price_data.currency, "eur");
});
test("checkout rejects manipulated amounts, foreign locale paths, and invalid plans", () => {
  for (const input of [{plan:"annual",locale:"fr",amount:1},{plan:"lifetime",locale:"fr"},{plan:"annual",locale:"../../evil"},null]) assert.equal(checkoutInput.safeParse(input).success,false);
  assert.equal(checkoutInput.safeParse({plan:"annual",locale:"ko"}).success,true);
});
