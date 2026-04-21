import { INTELLIGENCE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const intelligenceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalizedRecommendations: builder.query({
      query: () => `${INTELLIGENCE_URL}/recommendations`,
      keepUnusedDataFor: 60,
    }),
    getSubscriptionPlan: builder.query({
      query: () => `${INTELLIGENCE_URL}/subscription-plan`,
      keepUnusedDataFor: 60,
    }),
    getPricingInsight: builder.query({
      query: (productId) => `${INTELLIGENCE_URL}/products/${productId}/pricing-insight`,
      keepUnusedDataFor: 60,
    }),
    getIntelligenceDashboard: builder.query({
      query: () => `${INTELLIGENCE_URL}/dashboard`,
      keepUnusedDataFor: 30,
    }),
    runPricingEngine: builder.mutation({
      query: (payload = { persistPrice: true }) => ({
        url: `${INTELLIGENCE_URL}/pricing/run`,
        method: "POST",
        body: payload,
      }),
    }),
    conciergeChat: builder.mutation({
      query: (payload) => ({
        url: `${INTELLIGENCE_URL}/concierge`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useConciergeChatMutation,
  useGetIntelligenceDashboardQuery,
  useGetPersonalizedRecommendationsQuery,
  useGetPricingInsightQuery,
  useGetSubscriptionPlanQuery,
  useRunPricingEngineMutation,
} = intelligenceApiSlice;
