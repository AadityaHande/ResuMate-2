import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

// In a real app, this would come from a database or a CMS
const templates = [
  {
    id: "classic",
    name: "Classic Professional",
    description:
      "A timeless, clean, and professional design. Perfect for corporate and traditional roles.",
    imageUrl: "https://picsum.photos/seed/resume1/600/776",
    imageHint: "resume screenshot",
  },
  {
    id: "modern",
    name: "Modern Two-Column",
    description:
      "A stylish two-column layout that efficiently organizes information and stands out.",
    imageUrl: "https://picsum.photos/seed/resume2/600/776",
    imageHint: "modern resume",
  },
  {
    id: "creative",
    name: "Creative Minimalist",
    description:
      "A clean, minimalist design with a touch of creative flair. Ideal for design and marketing roles.",
    imageUrl: "https://picsum.photos/seed/resume3/600/776",
    imageHint: "creative resume",
  },
];

export default function TemplatesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Choose Your Template
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a professionally designed template to start building your
          resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group overflow-hidden border-border/50"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[1/1.29] overflow-hidden">
                <Image
                  src={template.imageUrl}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={template.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col gap-3">
                    <Button asChild>
                      <Link href={`/editor?template=${template.id}`}>
                        <Pencil className="mr-2" /> Use Template
                      </Link>
                    </Button>
                    <Button variant="secondary">
                      <Eye className="mr-2" /> Preview
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 h-10">
                  {template.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="flex items-center justify-center border-dashed aspect-[1/1.45]">
          <div className="text-center text-muted-foreground">
            <h3 className="font-semibold">More templates coming soon!</h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
