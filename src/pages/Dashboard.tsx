import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileText, MessageSquare, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Próximas Sessões',
      value: '8',
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Pacientes Ativos',
      value: '24',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Devolutivas Pendentes',
      value: '3',
      icon: FileText,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Mensagens Não Lidas',
      value: '5',
      icon: MessageSquare,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      patient: 'Maria Silva',
      time: '09:00',
      type: 'Fonoaudiologia',
    },
    {
      id: '2',
      patient: 'João Pedro',
      time: '10:30',
      type: 'Psicologia',
    },
    {
      id: '3',
      patient: 'Ana Costa',
      time: '14:00',
      type: 'Terapia Ocupacional',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Aqui está um resumo das suas atividades hoje
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Próximas Sessões Hoje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{apt.time}</p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/agenda')}
              >
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-success mt-2" />
                  <div>
                    <p className="text-sm font-medium">Devolutiva enviada</p>
                    <p className="text-xs text-muted-foreground">Maria Silva - Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm font-medium">Nova mensagem</p>
                    <p className="text-xs text-muted-foreground">Responsável João - Há 3 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-warning mt-2" />
                  <div>
                    <p className="text-sm font-medium">Sessão confirmada</p>
                    <p className="text-xs text-muted-foreground">Ana Costa - Há 5 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
