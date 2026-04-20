import express from "express";
import {
  getAdminIntelligenceDashboard,
  getPersonalizedMatches,
  getPricingInsight,
  getSubscriptionPlan,
  runPricingEngine,
} from "../controllers/intelligenceController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/recommendations", authenticate, getPersonalizedMatches);
router.get("/subscription-plan", authenticate, getSubscriptionPlan);
router.get("/products/:id/pricing-insight", getPricingInsight);
router.get("/dashboard", authenticate, authorizeAdmin, getAdminIntelligenceDashboard);
router.post("/pricing/run", authenticate, authorizeAdmin, runPricingEngine);

export default router;
