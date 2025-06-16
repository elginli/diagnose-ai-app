import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPlan = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        prescriptionPlan: v.object({
            schedule: v.array(v.string()),
            medications: v.array(v.object({
                day: v.string(),
                routines: v.array(v.object({
                    name: v.string(),
                    duration: v.string(),
                    description: v.string(),

                }))
            })),
        }),
        isActive: v.boolean(),
    },

    handler: async(ctx, args) => {
        const activePlans = await ctx.db
            .query("plans")
            .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();

        for (const plan of activePlans) {
        await ctx.db.patch(plan._id, { isActive: false });
        }

        const planId = await ctx.db.insert("plans", args);

        return planId;
    },
});

export const getUserPlans = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const plans = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return plans;
  },
});

