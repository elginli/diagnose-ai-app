import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AppleIcon,
  ShieldIcon,
  Stethoscope,
  Syringe,
  FileText,
} from "lucide-react";
import { USER_PROGRAMS } from "@/constants";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative">
      <div className="container mx-auto max-w-6xl px-4">
        {/* HEADER */}
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg overflow-hidden mb-16">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">Medical Gallery</span>
            </div>
            <div className="text-sm text-muted-foreground">Featured Cases</div>
          </div>

          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">AI-Generated </span>
              <span className="text-primary">Medical Plans</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Explore personalized recovery and treatment plans our AI assistant generated for patients
            </p>
            <div className="flex items-center justify-center gap-16 mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl text-primary">500+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">CASES</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-primary">3min</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">DIAGNOSIS TIME</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-primary">100%</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">PERSONALIZED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-card/90 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm text-primary">PATIENT.{program.id}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {program.diagnosed_conditions[0]}
                </div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-border">
                    <img
                      src={program.profilePic}
                      alt={`${program.first_name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">
                      {program.first_name}
                      <span className="text-primary">.med</span>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <FileText className="h-4 w-4" />
                      {program.age}y • {program.symptoms.length} symptoms
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-primary/10 rounded border border-primary/20 text-sm text-primary flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    {program.medical_goal}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Syringe className="h-4 w-4" />
                    {program.current_medications.length} meds
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{program.treatment_plan.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {program.treatment_plan.weekly_schedule[0].focus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-secondary/10 text-secondary mt-0.5">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{program.diet_plan.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {program.diet_plan.macros.protein} protein • {program.diet_plan.daily_calories}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">AI Health Protocols</h3>
                      <p className="text-sm text-muted-foreground mt-1">Monitoring enabled</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    <span className="text-primary">&gt; </span>
                    {program.treatment_plan.description.substring(0, 120)}...
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            >
              Generate Your Plan
              <Stethoscope className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-muted-foreground mt-4">
            Join 500+ users with AI-personalized medical recovery plans
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;
