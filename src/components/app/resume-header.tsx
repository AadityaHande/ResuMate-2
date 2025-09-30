import { type ExtractResumeDataOutput } from "@/ai/flows/extract-resume-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import CopyButton from "./copy-button";

interface ResumeHeaderProps {
  personalDetails: ExtractResumeDataOutput["personalDetails"];
  summary: string;
}

const ResumeHeader = ({ personalDetails, summary }: ResumeHeaderProps) => {
  const initials =
    personalDetails?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "??";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 text-3xl">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">
              {personalDetails?.name || "Candidate"}
            </CardTitle>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-muted-foreground">
              {personalDetails?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{personalDetails.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">AI-Generated Summary</h3>
            <p className="text-muted-foreground mt-1 italic">
              {summary}
            </p>
          </div>
          <CopyButton textToCopy={summary} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeHeader;
