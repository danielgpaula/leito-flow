import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, MapPin, Calendar, Clock, CheckCircle, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for device details
const deviceData = {
  "AVP": {
    name: "Acesso Venoso Periférico",
    location: "Membro Superior Direito",
    installDate: "2024-01-15",
    expectedRemoval: "2024-01-22",
    status: "Ativo",
    justification: "Administração de medicamentos endovenosos contínuos",
    observation: "Sítio de inserção sem sinais flogísticos. Permeabilidade mantida."
  },
  "PICC": {
    name: "Cateter Central de Inserção Periférica",
    location: "Veia Basílica Esquerda",
    installDate: "2024-01-10",
    expectedRemoval: "2024-02-10",
    status: "Ativo", 
    justification: "Acesso central para antibioticoterapia prolongada",
    observation: "Fixação adequada. Curativo trocado diariamente. Sem sinais de infecção."
  },
  "SVD": {
    name: "Sonda Vesical de Demora",
    location: "Via Uretral",
    installDate: "2024-01-12",
    expectedRemoval: "2024-01-19",
    status: "Retirado",
    justification: "Controle de diurese em paciente crítico",
    observation: "Retirada programada após melhora do quadro clínico. Sem complicações."
  }
};

export default function DeviceDetails() {
  const { unitName, patientId, deviceId } = useParams();
  const navigate = useNavigate();
  
  const device = deviceData[deviceId as keyof typeof deviceData];
  
  if (!device) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-muted-foreground">Dispositivo não encontrado</h1>
            <Button 
              onClick={() => navigate(`/unit/${unitName}/patient/${patientId}`)}
              className="mt-4"
            >
              Voltar aos Detalhes do Paciente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/unit/${unitName}/patient/${patientId}`)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold">{device.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {decodeURIComponent(unitName!)} • Paciente #{patientId}
                </p>
              </div>
            </div>
            <Badge 
              variant={device.status === "Ativo" ? "success" : "secondary"}
              className="text-sm"
            >
              {device.status}
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Informações do Dispositivo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dispositivo</label>
                <p className="text-sm font-medium">{device.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Local de Instalação</label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{device.location}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge 
                    variant={device.status === "Ativo" ? "success" : "secondary"}
                    className="flex items-center space-x-1 w-fit"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span>{device.status}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Cronologia</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Data de Instalação</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{new Date(device.installDate).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Previsão de Retirada</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{new Date(device.expectedRemoval).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tempo de Permanência</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    {Math.ceil((new Date(device.expectedRemoval).getTime() - new Date(device.installDate).getTime()) / (1000 * 60 * 60 * 24))} dias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Justificativa */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Justificativa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{device.justification}</p>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Observações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{device.observation}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}