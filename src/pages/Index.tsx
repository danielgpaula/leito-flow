import { UnitCard } from "@/components/UnitCard";
import { Activity, Heart, Baby, Bed } from "lucide-react";

const Index = () => {
  const hospitalUnits = [
    {
      title: "UTI Adulto",
      totalBeds: 24,
      occupiedBeds: 22,
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "UTI NEO",
      totalBeds: 16,
      occupiedBeds: 12,
      icon: <Baby className="h-4 w-4" />
    },
    {
      title: "Internação",
      totalBeds: 45,
      occupiedBeds: 31,
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: "Enfermaria",
      totalBeds: 32,
      occupiedBeds: 18,
      icon: <Bed className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sistema Hospitalar</h1>
              <p className="text-sm text-muted-foreground">Monitoramento de Leitos em Tempo Real</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Painel de Controle</h2>
          <p className="text-muted-foreground">
            Acompanhe a ocupação dos leitos em todas as unidades do hospital
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitalUnits.map((unit, index) => (
            <div 
              key={index}
              className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UnitCard
                title={unit.title}
                totalBeds={unit.totalBeds}
                occupiedBeds={unit.occupiedBeds}
                icon={unit.icon}
              />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Bed className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Leitos</p>
                <p className="text-2xl font-bold text-foreground">
                  {hospitalUnits.reduce((acc, unit) => acc + unit.totalBeds, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leitos Ocupados</p>
                <p className="text-2xl font-bold text-foreground">
                  {hospitalUnits.reduce((acc, unit) => acc + unit.occupiedBeds, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Ocupação</p>
                <p className="text-2xl font-bold text-foreground">
                  {(
                    (hospitalUnits.reduce((acc, unit) => acc + unit.occupiedBeds, 0) /
                    hospitalUnits.reduce((acc, unit) => acc + unit.totalBeds, 0)) * 100
                  ).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;