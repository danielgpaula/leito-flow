import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, FileText, TrendingUp, Thermometer, Activity, Pill, Scissors, Droplet, Heart, TestTube, BarChart3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PatientDetails = () => {
  const { unitName, patientId } = useParams();
  const navigate = useNavigate();

  // Mock patient data
  const patient = {
    id: patientId,
    name: "Maria Silva Santos",
    record: "123456",
    attendance: "ATD001",
    age: 67,
    bed: "01A",
    evolutionDate: "2024-08-20",
    riskFactors: ["Diabetes", "Hipertensão", "Idade avançada"],
    fever: { present: true, value: 38.5 },
    devices: ["Cateter Venoso Central", "Sonda Vesical", "Ventilação Mecânica"],
    antibiotics: ["Vancomicina 1g 12/12h", "Meropenem 1g 8/8h"],
    surgery: { performed: true, type: "Laparotomia exploratória" },
    secretion: { observed: true, type: "Purulenta", location: "Ferida operatória" },
    evolutionSummary: "Paciente apresenta melhora do quadro infeccioso, com redução dos parâmetros inflamatórios. Mantém-se estável hemodinamicamente.",
    annotationSummary: "Realizado curativo em ferida operatória. Observada secreção purulenta em menor quantidade. Paciente colaborativo."
  };

  const labResults = {
    hemogram: {
      hemoglobin: "10.2 g/dL",
      hematocrit: "30.5%",
      leukocytes: "15.000/mm³",
      neutrophils: "85%",
      platelets: "180.000/mm³"
    },
    cultures: [
      { type: "Hemocultura", result: "Staphylococcus aureus", sensitivity: "Sensível à Vancomicina" },
      { type: "Urocultura", result: "Negativa", sensitivity: "-" },
      { type: "Cultura de secreção", result: "Pseudomonas aeruginosa", sensitivity: "Sensível ao Meropenem" }
    ],
    urine: {
      density: "1.020",
      protein: "Traços",
      glucose: "Ausente",
      leukocytes: "10-15/campo"
    }
  };

  const scores = [
    { name: "SOFA", value: 8, interpretation: "Disfunção orgânica moderada" },
    { name: "APACHE II", value: 15, interpretation: "Risco moderado" },
    { name: "Sepsis-3", value: "Positivo", interpretation: "Critérios para sepse" },
    { name: "NEWS2", value: 6, interpretation: "Risco médio" }
  ];

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
                onClick={() => navigate(`/unit/${unitName}`)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{patient.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Prontuário: {patient.record} • Leito: {patient.bed} • {unitName}
                </p>
              </div>
            </div>
            <Badge variant="info" className="text-sm">
              {patient.age} anos
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Detalhes</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>Exames</span>
            </TabsTrigger>
            <TabsTrigger value="scores" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Scores</span>
            </TabsTrigger>
          </TabsList>

          {/* Detalhes Tab */}
          <TabsContent value="details" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Informações do Paciente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data da Evolução</p>
                    <p className="font-medium">{new Date(patient.evolutionDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fatores de Risco</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.riskFactors.map((factor, index) => (
                        <Badge key={index} variant="outline">{factor}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sinais Vitais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5" />
                    <span>Sinais Vitais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Febre</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={patient.fever.present ? "destructive" : "success"}>
                        {patient.fever.present ? "Sim" : "Não"}
                      </Badge>
                      {patient.fever.present && (
                        <span className="font-medium">{patient.fever.value}°C</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dispositivos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Dispositivos Observados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.devices.map((device, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{device}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medicações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="h-5 w-5" />
                    <span>Antibióticos Prescritos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.antibiotics.map((antibiotic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Pill className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{antibiotic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cirurgia */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Scissors className="h-5 w-5" />
                    <span>Cirurgia</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Realizada</span>
                    <Badge variant={patient.surgery.performed ? "info" : "outline"}>
                      {patient.surgery.performed ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  {patient.surgery.performed && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{patient.surgery.type}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Secreção */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5" />
                    <span>Secreção</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Observada</span>
                      <Badge variant={patient.secretion.observed ? "warning" : "success"}>
                        {patient.secretion.observed ? "Sim" : "Não"}
                      </Badge>
                    </div>
                    {patient.secretion.observed && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Tipo</p>
                          <p className="font-medium">{patient.secretion.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Local</p>
                          <p className="font-medium">{patient.secretion.location}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Resumo da Evolução</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{patient.evolutionSummary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Resumo da Anotação</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{patient.annotationSummary}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exames Tab */}
          <TabsContent value="exams" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hemograma */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TestTube className="h-5 w-5" />
                    <span>Hemograma</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(labResults.hemogram).map(([key, value], index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key === 'hemoglobin' ? 'Hemoglobina' :
                         key === 'hematocrit' ? 'Hematócrito' :
                         key === 'leukocytes' ? 'Leucócitos' :
                         key === 'neutrophils' ? 'Neutrófilos' :
                         key === 'platelets' ? 'Plaquetas' : key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Urina */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5" />
                    <span>Exame de Urina</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(labResults.urine).map(([key, value], index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key === 'density' ? 'Densidade' :
                         key === 'protein' ? 'Proteína' :
                         key === 'glucose' ? 'Glicose' :
                         key === 'leukocytes' ? 'Leucócitos' : key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Culturas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5" />
                  <span>Culturas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.cultures.map((culture, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{culture.type}</h4>
                        <Badge variant={culture.result === "Negativa" ? "success" : "warning"}>
                          {culture.result === "Negativa" ? "Negativo" : "Positivo"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resultado:</span>
                          <span>{culture.result}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sensibilidade:</span>
                          <span>{culture.sensitivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scores Tab */}
          <TabsContent value="scores" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scores.map((score, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>{score.name}</span>
                      </div>
                      <Badge variant="info" className="text-lg font-bold">
                        {score.value}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{score.interpretation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDetails;