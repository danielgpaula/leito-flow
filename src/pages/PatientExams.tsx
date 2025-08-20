import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Eye, Calendar, Clock } from "lucide-react";

interface Exam {
  id: string;
  type: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "processing";
  pdfUrl?: string;
  description: string;
}

const PatientExams = () => {
  const { unitName, patientId } = useParams();
  const navigate = useNavigate();

  // Mock patient data
  const patient = {
    id: patientId,
    name: "Maria Silva Santos",
    record: "123456",
    bed: "01A"
  };

  // Mock exams data
  const exams: Exam[] = [
    {
      id: "1",
      type: "Hemograma Completo",
      date: "2024-08-20",
      time: "08:30",
      status: "completed",
      pdfUrl: "/exams/hemograma-123456-20240820.pdf",
      description: "Hemograma completo com contagem de plaquetas"
    },
    {
      id: "2", 
      type: "Cultura de Sangue",
      date: "2024-08-20",
      time: "09:15",
      status: "completed",
      pdfUrl: "/exams/cultura-sangue-123456-20240820.pdf",
      description: "Hemocultura para identificação de patógenos"
    },
    {
      id: "3",
      type: "Raio-X de Tórax",
      date: "2024-08-19",
      time: "14:20",
      status: "completed",
      pdfUrl: "/exams/raio-x-torax-123456-20240819.pdf",
      description: "Radiografia de tórax PA e perfil"
    },
    {
      id: "4",
      type: "Tomografia de Abdome",
      date: "2024-08-19",
      time: "16:45",
      status: "completed", 
      pdfUrl: "/exams/tc-abdome-123456-20240819.pdf",
      description: "TC de abdome com contraste"
    },
    {
      id: "5",
      type: "Urocultura",
      date: "2024-08-18",
      time: "10:30",
      status: "completed",
      pdfUrl: "/exams/urocultura-123456-20240818.pdf",
      description: "Cultura de urina com antibiograma"
    },
    {
      id: "6",
      type: "Gasometria Arterial",
      date: "2024-08-20",
      time: "12:00",
      status: "processing",
      description: "Análise de gases no sangue arterial"
    },
    {
      id: "7",
      type: "Procalcitonina",
      date: "2024-08-20",
      time: "14:30",
      status: "pending",
      description: "Dosagem de procalcitonina sérica"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Concluído</Badge>;
      case "processing":
        return <Badge variant="warning">Processando</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewPDF = (exam: Exam) => {
    if (exam.pdfUrl) {
      // In a real app, this would open the PDF in a new tab or modal
      console.log("Visualizar PDF:", exam.pdfUrl);
      // For demo purposes, we'll show an alert
      alert(`PDF do exame ${exam.type} seria aberto aqui.\nArquivo: ${exam.pdfUrl}`);
    }
  };

  const handleDownloadPDF = (exam: Exam) => {
    if (exam.pdfUrl) {
      // In a real app, this would trigger a download
      console.log("Download PDF:", exam.pdfUrl);
      // For demo purposes, we'll show an alert
      alert(`Download do PDF ${exam.type} seria iniciado.\nArquivo: ${exam.pdfUrl}`);
    }
  };

  const completedExams = exams.filter(exam => exam.status === "completed");
  const processingExams = exams.filter(exam => exam.status === "processing");
  const pendingExams = exams.filter(exam => exam.status === "pending");

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
                <h1 className="text-xl font-bold text-foreground">Exames - {patient.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Prontuário: {patient.record} • Leito: {patient.bed} • {unitName}
                </p>
              </div>
            </div>
            <Badge variant="info" className="text-sm">
              {completedExams.length} Concluídos
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Concluídos</p>
                  <p className="text-lg font-bold">{completedExams.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processando</p>
                  <p className="text-lg font-bold">{processingExams.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                  <p className="text-lg font-bold">{pendingExams.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Lista de Exames</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4 hover:bg-muted/25 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium">{exam.type}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{exam.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(exam.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{exam.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    {exam.status === "completed" && exam.pdfUrl && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPDF(exam)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Visualizar</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPDF(exam)}
                          className="flex items-center space-x-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientExams;