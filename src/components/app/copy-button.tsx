"use client";

import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CopyButtonProps extends ButtonProps {
  textToCopy: string;
  toastMessage?: string;
}

const CopyButton = ({ textToCopy, className, toastMessage, children, ...props }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    if (toastMessage) {
        toast({ title: toastMessage });
    }
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  if (children) {
    return (
       <Button
        variant="outline"
        onClick={copyToClipboard}
        className={cn(className)}
        {...props}
      >
        {hasCopied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
        {children}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      aria-label="Copy to clipboard"
      {...props}
    >
      {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
    </Button>
  );
};

export default CopyButton;
