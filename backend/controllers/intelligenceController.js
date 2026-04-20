import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { refreshDynamicPricing, upsertDailySignal } from "../services/pricingEngineService.js";
import { getPersonalizedRecommendations } from "../services/recommendationService.js";
import {
  getSmartSubscriptionPlan,
  getSubscriptionQueueSnapshot,
} from "../services/subscriptionService.js";

const getPersonalizedMatches = asyncHandler(async (req, res) => {
  const recommendations = await getPersonalizedRecommendations(req.user, 6);

  res.json({
    source: recommendations[0]?.source || "node-fallback",
    recommendations: recommendations.map((entry) => ({
      ...entry.product.toObject(),
      recommendationScore: entry.score,
      recommendationReasons: entry.reasons,
      recommendationSource: entry.source,
    })),
  });
});

const trackProductView = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.analytics.totalViews += 1;
  product.analytics.lastViewedAt = new Date();
  upsertDailySignal(product, { views: 1 });
  await product.save();

  res.status(200).json({ message: "View tracked" });
});

const getPricingInsight = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product.pricing?.lastRecommendation || {});
});

const getSubscriptionPlan = asyncHandler(async (req, res) => {
  const plan = await getSmartSubscriptionPlan(req.user._id);
  res.json(plan);
});

const runPricingEngine = asyncHandler(async (req, res) => {
  const persistPrice = Boolean(req.body?.persistPrice ?? true);
  const results = await refreshDynamicPricing({ persistPrice });

  res.json({
    updated: results.length,
    results,
  });
});

const getAdminIntelligenceDashboard = asyncHandler(async (req, res) => {
  const pricingCandidates = await Product.find({
    "pricing.lastRecommendation.generatedAt": { $exists: true },
  })
    .sort({ "pricing.lastRecommendation.generatedAt": -1 })
    .limit(8);
  const queueSnapshot = await getSubscriptionQueueSnapshot();

  res.json({
    pricingCandidates: pricingCandidates.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      recommendation: product.pricing.lastRecommendation,
      flashSaleEndsAt: product.pricing.flashSaleEndsAt,
    })),
    subscriptionQueue: queueSnapshot,
    summary: {
      activeFlashSales: pricingCandidates.filter((product) => product.pricing.flashSaleEndsAt)
        .length,
      pendingSubscriptionReminders: queueSnapshot.length,
    },
  });
});

export {
  getAdminIntelligenceDashboard,
  getPersonalizedMatches,
  getPricingInsight,
  getSubscriptionPlan,
  runPricingEngine,
  trackProductView,
};
