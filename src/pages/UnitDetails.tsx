import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, FileText, Shield, ShieldAlert } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Patient {
  id: string;
  name: string;
  record: string;
  attendance: string;
  age: number;
  bed: string;
  isolation: boolean;
  isolationType?: "contact" | "droplet" | "airborne";
}

const UnitDetails = () => {
  const { unitName } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const patients: Patient[] = [
    {
      id: "1",
      name: "Maria Silva Santos",
      record: "123456",
      attendance: "ATD001",
      age: 67,
      bed: "01A",
      isolation: true,
      isolationType: "contact"
    },
    {
      id: "2", 
      name: "João Carlos Oliveira",
      record: "234567",
      attendance: "ATD002",
      age: 45,
      bed: "02B",
      isolation: false
    },
    {
      id: "3",
      name: "Ana Paula Costa",
      record: "345678", 
      attendance: "ATD003",
      age: 72,
      bed: "03A",
      isolation: true,
      isolationType: "droplet"
    },
    {
      id: "4",
      name: "Roberto Santos Lima",
      record: "456789",
      attendance: "ATD004", 
      age: 38,
      bed: "04B",
      isolation: false
    },
    {
      id: "5",
      name: "Carmen Lúcia Ferreira",
      record: "567890",
      attendance: "ATD005",
      age: 81,
      bed: "05A", 
      isolation: true,
      isolationType: "airborne"
    }
  ];

  const getIsolationIcon = (isolation: boolean, type?: string) => {
    if (!isolation) return null;
    
    switch (type) {
      case "contact":
        return <Shield className="h-4 w-4 text-warning" />;
      case "droplet":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      case "airborne":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      default:
        return <Shield className="h-4 w-4 text-warning" />;
    }
  };

  const getIsolationBadge = (isolation: boolean, type?: string) => {
    if (!isolation) return <Badge variant="outline">Sem Isolamento</Badge>;
    
    switch (type) {
      case "contact":
        return <Badge variant="warning">Contato</Badge>;
      case "droplet":
        return <Badge variant="destructive">Gotículas</Badge>;
      case "airborne":
        return <Badge variant="destructive">Aéreo</Badge>;
      default:
        return <Badge variant="warning">Isolamento</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{unitName}</h1>
                <p className="text-sm text-muted-foreground">Pacientes Internados</p>
              </div>
            </div>
            <Badge variant="info" className="text-sm">
              {patients.length} Pacientes
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Lista de Pacientes
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Isolamento indicado por ícones</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Unidade</TableHead>
                    <TableHead className="font-semibold">Leito</TableHead>
                    <TableHead className="font-semibold">Paciente - Prontuário - Atendimento</TableHead>
                    <TableHead className="font-semibold">Idade</TableHead>
                    <TableHead className="font-semibold">Isolamento</TableHead>
                    <TableHead className="font-semibold text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-muted/25">
                      <TableCell className="font-medium">{unitName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.bed}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Prontuário: {patient.record} • Atendimento: {patient.attendance}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{patient.age}</span>
                        <span className="text-muted-foreground ml-1">anos</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getIsolationIcon(patient.isolation, patient.isolationType)}
                          {getIsolationBadge(patient.isolation, patient.isolationType)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                            onClick={() => navigate(`/unit/${unitName}/patient/${patient.id}`)}
                          >
                            <Eye className="h-3 w-3" />
                            <span>Detalhes</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                            onClick={() => {
                              // TODO: Navigate to patient exams
                              console.log("Ver exames do paciente:", patient.id);
                            }}
                          >
                            <FileText className="h-3 w-3" />
                            <span>Exames</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sem Isolamento</p>
                  <p className="text-lg font-bold">
                    {patients.filter(p => !p.isolation).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Isolamento Contato</p>
                  <p className="text-lg font-bold">
                    {patients.filter(p => p.isolationType === "contact").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Isolamento Gotículas</p>
                  <p className="text-lg font-bold">
                    {patients.filter(p => p.isolationType === "droplet").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Isolamento Aéreo</p>
                  <p className="text-lg font-bold">
                    {patients.filter(p => p.isolationType === "airborne").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnitDetails;