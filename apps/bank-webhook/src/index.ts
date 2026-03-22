import express from "express";
import cors from "cors";

import { HdfcWebhookAdapter } from "./adapters/hdfc-webhook-adapter";
import { WebhookRepository } from "./repositories/webhook-repository";
import { WebhookProcessor } from "./services/webhook-processor";
import { HdfcSignatureStrategy } from "./strategies/signature-strategy";

const webhookSecret = process.env.WEBHOOK_SIGNING_SECRET;
if (!webhookSecret) {
  throw new Error(
    "WEBHOOK_SIGNING_SECRET is required for bank-webhook service",
  );
}
const configuredMaxAge = Number(process.env.WEBHOOK_MAX_PROCESSING_AGE_MINUTES);
const maxProcessingAgeMinutes =
  Number.isFinite(configuredMaxAge) && configuredMaxAge > 0
    ? configuredMaxAge
    : 30;

const adapter = new HdfcWebhookAdapter();
const processor = new WebhookProcessor(
  new WebhookRepository(),
  new HdfcSignatureStrategy(webhookSecret),
  maxProcessingAgeMinutes,
);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/testing", async (_req, res) => {
  res.status(200).json({ msg: "Testing Endpoint" });
});

app.post("/hdfcWebhook", async (req, res) => {
  const adapted = adapter.adapt(req);
  if (!adapted.ok) {
    return res.status(400).json({ message: "Invalid webhook payload" });
  }

  const result = await processor.process(adapted.value);

  if (!result.ok) {
    switch (result.error) {
      case "INVALID_SIGNATURE":
        return res.status(401).json({ message: "Invalid webhook signature" });
      case "NOT_FOUND":
        return res
          .status(404)
          .json({ message: "On-ramp transaction not found" });
      case "EXPIRED":
        return res
          .status(410)
          .json({ message: "On-ramp transaction expired and marked failed" });
      case "INVALID_STATE":
        return res
          .status(409)
          .json({ message: "On-ramp transaction not in processing state" });
      case "PAYLOAD_MISMATCH":
        return res
          .status(422)
          .json({ message: "Webhook payload does not match transaction" });
      default:
        return res
          .status(500)
          .json({ message: "Error while processing webhook" });
    }
  }

  return res.json({ message: result.value.message });
});

const port = Number(process.env.BANK_WEBHOOK_PORT ?? 3003);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
