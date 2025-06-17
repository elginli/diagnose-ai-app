import { httpRouter } from "convex/server";
import { WebhookEvent} from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const http = httpRouter()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret){
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || ! svix_signature || !svix_timestamp){
            return new Response("no svix headers found", {
                status: 400,
            });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id" : svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
        } catch (err) {
            console.error("Error verifying webhook:", err);
            return new Response("Error occurred", {status: 400});
        }

        const eventType = evt.type;
        if (eventType === "user.created") {
            const {id, first_name, last_name, image_url, email_addresses} = evt.data;

            const email =email_addresses[0].email_address;

            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try{
                await ctx.runMutation(api.users.syncUser, {
                    email,
                    name,
                    image: image_url,
                    clerkId: id
                })   
            } catch (err){
                console.log("error creating user: error");
                return new Response("Error creating user", {status: 500});
            }
        }

        if (eventType === "user.updated"){
            const {id, first_name, last_name, image_url, email_addresses} = evt.data;
            const email =email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();
            
            try{
                await ctx.runMutation(api.users.updateUser, {
                    email,
                    name,
                    image: image_url,
                    clerkId: id
                });   
            } catch (error) {
                console.log("error updating user: error");
                return new Response("Error creating user", {status: 500});
            }
        }

        return new Response("Webhooks processed successfully", { status: 200});
    }),

    
});

// validate and fix workout plan to ensure it has proper numeric types
function validateMedicalPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    medications: plan.medication.map((medication: any) => ({
      day: medication.day,
      routines: medication.routines.map((routine: any) => ({
        name: routine.name,
        duration: typeof routine.duration === "string"
          ? routine.duration
          : typeof routine.duration === "number"
          ? `${routine.duration} min`
          : "5 min",
        description: typeof routine.description === "string"
          ? routine.description
          : "No description provided",
      })),
    })),
  };
  return validatedPlan;
}

http.route({
    path: "/vapi/generate-program",
    method:"POST",
    handler:  httpAction(async (ctx, request) => {
        try {
            const payload = await request.json();

            const{
                user_id,
                age,
                height,
                weight,
                symptoms,
                conditions,
            } = payload

            //use google gemini

            console.log("payload is here:", payload);

            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-001",
                generationConfig: {
                    temperature: 0.4,
                    topP: 0.9,
                    responseMimeType: "application/json",
                },
            })

            const medicalPrompt = `You are an experienced, board-certified medical doctor responsible for generating a personalized medication plan.
            Patient details:
            - Age: ${age}
            - Height: ${height}
            - Weight: ${weight}
            - Symptoms: ${symptoms} (List all symptoms clearly)
            - Known Injuries or Conditions (if any): ${conditions}

            Your objective:
            - Design a safe and effective medical treatment schedule tailored to the patient's physical characteristics and reported symptoms.
            - Avoid prescribing excessive medications or multiple interventions on the same or consecutive days unless clinically necessary.
            - Ensure the medication is common and can be retrieved from common drug stores.
            - Ensure that the plan respects reasonable rest intervals and avoids harmful drug interactions or overload.
            - The medication or routine should clearly align with the symptoms provided (e.g., "fatigue" might lead to iron supplementation, not painkillers).
            - Be conservative for sensitive groups (e.g., elderly or underweight) and aggressive for acute, high-risk symptoms if age and weight allow.

            CRITICAL SCHEMA INSTRUCTIONS:
            - Your ouput MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
            - ALWAYS return a valid JSON object with ONLY the structure defined below.
            - Fields like "duration" must be realistic and specific (e.g., "5 min", "20 min").
            - "description" must briefly state **why** the action is included (e.g., “to relieve nasal congestion” or “reduces inflammation and pain”).
            - NEVER use vague durations (e.g., “as needed”, “to failure”).
            - NEVER include extra text, explanations, or metadata outside the JSON.
            - DO NOT hallucinate drug names. Use generic names or actions (e.g., “ibuprofen”, “apply warm compress”, “oral hydration salts”).
            - NEVER add extra fields not shown in the example below

            Return a JSON object with this EXACT structure:
        
            {
            "schedule": ["Monday", "Wednesday", "Friday"],
            "medication": [
                {
                "day": "Monday",
                "routines": [
                    {
                    "name": "Exercise Name",
                    "duration": "15 min",
                    "description": "brief purpose of this medication or routine"
                    }
                ]
                }
            ]
            }
            DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            const medicalResult = await model.generateContent(medicalPrompt)
            const medicalPlanText = medicalResult.response.text();

            //validate the input coming from AI
            let prescriptionPlan = JSON.parse(medicalPlanText)
            prescriptionPlan = validateMedicalPlan(prescriptionPlan)

            //save to database
            const planId = await ctx.runMutation(api.plans.createPlan, {
                userId: user_id,
                isActive: true,
                prescriptionPlan,
                name: `${symptoms} Plan - ${new Date().toLocaleDateString()}`
            })

            return new Response(
                JSON.stringify({
                    success: true,
                    data: {
                        planId,
                        prescriptionPlan,
                    },
                }),
                {
                status: 200,
                headers: { "Content-Type": "application/json" },
                }
            );

        } catch (error) {
            console.error("Error generating fitness plan:", error);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: error instanceof Error ? error.message : String(error),
                }),
                {
                status: 500,
                headers: { "Content-Type": "application/json" },
                }
            )
        };
    })
});

export default http;