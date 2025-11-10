import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: '1',
      time: '09:00',
      patient: 'Maria Silva',
      type: 'Fonoaudiologia',
      status: 'confirmed',
      duration: '50 min',
    },
    {
      id: '2',
      time: '10:30',
      patient: 'João Pedro',
      type: 'Psicologia',
      status: 'scheduled',
      duration: '50 min',
    },
    {
      id: '3',
      time: '14:00',
      patient: 'Ana Costa',
      type: 'Terapia Ocupacional',
      status: 'confirmed',
      duration: '50 min',
    },
    {
      id: '4',
      time: '15:30',
      patient: 'Lucas Oliveira',
      type: 'Fonoaudiologia',
      status: 'scheduled',
      duration: '50 min',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success';
      case 'scheduled':
        return 'bg-primary/10 text-primary';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'scheduled':
        return 'Agendado';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-7 w-7 text-primary" />
              Agenda
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus agendamentos e sessões
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <Card
                  key={apt.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-semibold text-base">{apt.time}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <User className="h-3 w-3" />
                              {apt.patient}
                            </p>
                          </div>
                          <Badge className={getStatusColor(apt.status)} variant="secondary">
                            {getStatusLabel(apt.status)}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {apt.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {apt.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {appointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum agendamento para este dia
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Agenda;
