import { defineComponent, defineSchema, defineTable } from "convex/server";
import { v } from 'convex/values'

export default defineSchema({

    users:defineTable({
        name:v.string(),
        email:v.string(),
        image:v.optional(v.string()),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    plans: defineTable({
        userId: v.id("users"),
        name: v.string(),
        prescriptionPlan: v.object({
            schedule: v.array(v.string()),
            medication: v.array(v.object({
                day: v.string(),
                routines: v.array(v.object({
                    name: v.string(),
                    duration: v.optional(v.string()),
                    description: v.optional(v.string()),

                }))
            })),
        }),
        isActive: v.boolean(),
    })
        .index("by_user_id", ["userId"])
        .index("by_active", ["isActive"]),
});