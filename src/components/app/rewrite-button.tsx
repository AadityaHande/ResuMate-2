"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { WandSparkles, LoaderCircle, AlertTriangle, Sparkles, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { rewriteSectionAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import CopyButton from "./copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface RewriteButtonProps extends ButtonProps {
  textToRewrite: string;
  context?: string;
}

const RewriteButton = ({
  textToRewrite,
  context,
  className,
  ...props
}: RewriteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRewrite = async () => {
    setIsLoading(true);
    setError(null);
    setRewrittenText(null);

    try {
      const result = await rewriteSectionAction(textToRewrite, context);
      if (result.error) {
        throw new Error(result.error);
      }
      setRewrittenText(result.rewrittenText);
    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setIsOpen(true);
    handleRewrite();
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Reset state on close
    setTimeout(() => {
        setIsLoading(false);
        setError(null);
        setRewrittenText(null);
    }, 300); // delay to allow for fade-out animation
  }

  return (
    <>
      <Button
        onClick={openDialog}
        className={cn("text-primary", className)}
        {...props}
      >
        <WandSparkles className="mr-2 h-4 w-4" />
        Rewrite with AI
      </Button>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <WandSparkles className="text-primary" />
                AI-Powered Rewrite
            </DialogTitle>
            <DialogDescription>
              Our AI has rewritten your text for impact and clarity. Compare the versions below.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-muted/50">
                <LoaderCircle className="w-10 h-10 mb-4 animate-spin text-primary" />
                <h3 className="text-lg font-semibold">Rewriting in progress...</h3>
                <p className="text-muted-foreground">Our AI is polishing your resume.</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold">Rewrite Failed</h3>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {rewrittenText && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Original</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                            {textToRewrite}
                        </CardContent>
                    </Card>
                     <Card className="border-primary/50 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary"/>
                                Rewritten Version
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm whitespace-pre-wrap font-mono">
                            {rewrittenText}
                        </CardContent>
                    </Card>
                </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between w-full flex-row-reverse">
            {rewrittenText && (
                 <CopyButton textToCopy={rewrittenText} className="text-foreground">
                    <Check className="mr-2" />
                    Copy Rewritten Text
                </CopyButton>
            )}
            <Button variant="outline" onClick={closeDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RewriteButton;
