"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, Ban, Code2, Pencil, BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SubjectCard({ name, code, isActive, onToggle, onEdit }) {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <Card className="group border transition-all duration-300 hover:shadow-md bg-card hover:border-primary/40 w-full overflow-hidden">
      <CardHeader className=" relative">
        <div className="flex items-start justify-between pe-8">
          <div className="space-y-1.5 flex-1 p-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-md text-primary">
                <BookOpenText className="w-4 h-4" />
              </div>
              {active ? (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-medium h-5 px-2 text-[10px]">Active</Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200 border-none font-medium h-5 px-2 text-[10px]">Inactive</Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold capitalize leading-tight transition-colors line-clamp-2">
              {name.toLowerCase()}
            </CardTitle>
          </div>
        </div>
        <div className="absolute top-4 right-4 text-muted-foreground flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/20 text-primary border-0 shadow-none hover:shadow-sm"
              title="Edit Subject"
            >
              <Pencil size={14} strokeWidth={2} />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-lg border border-dashed border-muted-foreground/20">
          <Code2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground font-medium text-xs">Code:</span>
          <span className="font-bold text-foreground font-mono">{code}</span>
        </div>

        <div className="w-full mt-1 border-t pt-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-sm text-foreground">Status Setting</h1>
            <p className="text-xs text-muted-foreground">Toggle availability</p>
          </div>
          <div
            className="flex items-center"
            title="Toggle subject status"
          >
            <Switch checked={active} onCheckedChange={handleToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
