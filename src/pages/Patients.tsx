import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Calendar, FileText } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Patients = () => {
  const patients = [
    {
      id: '1',
      name: 'Maria Silva',
      age: 8,
      diagnosis: 'TEA',
      lastSession: '2024-01-15',
      nextSession: '2024-01-22',
      guardian: 'Ana Silva',
    },
    {
      id: '2',
      name: 'João Pedro',
      age: 6,
      diagnosis: 'Atraso de Fala',
      lastSession: '2024-01-14',
      nextSession: '2024-01-21',
      guardian: 'Carlos Pedro',
    },
    {
      id: '3',
      name: 'Ana Costa',
      age: 10,
      diagnosis: 'TDAH',
      lastSession: '2024-01-16',
      nextSession: '2024-01-23',
      guardian: 'Maria Costa',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              Pacientes
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie informações dos seus pacientes
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card
              key={patient.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {patient.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} anos
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        {patient.diagnosis}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Última sessão:</span>
                        <span className="font-medium">
                          {new Date(patient.lastSession).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Próxima sessão:</span>
                        <span className="font-medium text-primary">
                          {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Responsável:</span>
                      <span>{patient.guardian}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Ver Prontuário
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Agendar Sessão
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
