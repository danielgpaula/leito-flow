import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UnitCardProps {
  title: string;
  totalBeds: number;
  occupiedBeds: number;
  icon: React.ReactNode;
  className?: string;
}

export function UnitCard({ title, totalBeds, occupiedBeds, icon, className }: UnitCardProps) {
  const availableBeds = totalBeds - occupiedBeds;
  const occupancyRate = (occupiedBeds / totalBeds) * 100;
  
  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "destructive";
    if (rate >= 70) return "warning";
    return "success";
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-destructive";
    if (rate >= 70) return "bg-warning";
    return "bg-success";
  };

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-secondary/20",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{totalBeds}</p>
            <p className="text-xs text-muted-foreground">Total de Leitos</p>
          </div>
          <Badge variant={getOccupancyColor(occupancyRate)} className="text-xs">
            {occupancyRate.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full transition-all duration-300", getProgressColor(occupancyRate))}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Livres:</span>
              <span className="font-medium text-success">{availableBeds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                occupancyRate >= 90 ? "bg-destructive" : occupancyRate >= 70 ? "bg-warning" : "bg-info"
              )}></div>
              <span className="text-muted-foreground">Ocupados:</span>
              <span className="font-medium">{occupiedBeds}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}