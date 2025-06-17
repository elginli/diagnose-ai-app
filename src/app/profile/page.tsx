"use client"

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import {api} from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoFitnessPlan from "@/components/NoFitnessPlan";
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { TabsList, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { BriefcaseMedical, CalendarIcon} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;
 
  return (
    <section className="realtive z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user}/>

      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-8">
          {/* plan selector */}
          <div className="relative backdrop:-blur-sm border border-border p-6">
            <CornerElements />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Your</span>{" "}
                <span className="text-foreground">Diagnosis Plans</span>
              </h2>
              <div className="font-mono text-xs text-muted-foreground">
                TOTAL: {allPlans.length}
              </div>
            </div>
          <div className="flex flex-wrap gap-2">
              {allPlans.map((plan) => (
                <Button
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`text-foreground border hover:text-white ${
                    selectedPlanId === plan._id
                      ? "bg-primary/20 text-primary border-primary"
                      : "bg-transparent border-border hover:border-primary/50"
                  }`}
                >
                  {plan.name}
                  {plan.isActive && (
                    <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Plan details */}
          {currentPlan && (
            <div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
              <CornerElements />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold">
                  PLAN: <span className="text-primary">{currentPlan.name}</span>
                </h3>
              </div>
              <Tabs defaultValue="medical" className="w-full">
                <TabsList className="mb-6 w-full bg-cyber-terminal-bg border border-border rounded-full overflow-hidden">
                  <TabsTrigger
                    value="medical"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition rounded-full"
                  >
                    <BriefcaseMedical className="h-5 w-5 text-primary" />
                    Medical Plan
                  </TabsTrigger>
                </TabsList>

                <TabsContent value = "medical">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        SCHEDULE: {currentPlan.prescriptionPlan.schedule.join(", ")}
                      </span>
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.prescriptionPlan.medications.map((medicationDay, index) => (
                        <AccordionItem
                          key={index}
                          value={medicationDay.day}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                            <div className="flex justify-between w-full items-center">
                              <span className="text-primary">{medicationDay.day}</span>
                              <div className="text-xs text-muted-foreground">
                                {medicationDay.routines.length} ACTIONS
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4">
                            <div className="space-y-3 mt-2">
                              {medicationDay.routines.map((routine, routineIndex) => (
                                <div
                                  key={routineIndex}
                                  className="border border-border rounded p-3 bg-background/50"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">
                                      {routine.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                        {routine.name}
                                      </div>
                                      <div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                        {routine.duration} 
                                      </div>
                                    </div>
                                  </div>
                                  {routine.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {routine.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      ): (
        <NoFitnessPlan />
      )}
    </section>
  )
}

export default ProfilePage
