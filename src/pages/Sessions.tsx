import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Session } from '@/types';
import { FileText, Plus, Search, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Sessions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      appointmentId: 'apt1',
      patientId: '1',
      professionalId: 'prof1',
      date: '2024-01-15',
      feedback: 'Paciente demonstrou ótimo progresso nas atividades propostas.',
      metrics: {
        engagement: 8,
        progress: 7,
        mood: 'positive',
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      appointmentId: 'apt2',
      patientId: '2',
      professionalId: 'prof1',
      date: '2024-01-14',
      feedback: 'Sessão produtiva, trabalhamos habilidades sociais.',
      metrics: {
        engagement: 9,
        progress: 8,
        mood: 'positive',
      },
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);

  const filteredSessions = sessions.filter((session) =>
    session.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock data para nomes de pacientes
  const patientNames: Record<string, string> = {
    '1': 'João Silva',
    '2': 'Maria Santos',
  };

  const getMoodBadge = (mood: string) => {
    const colors: Record<string, string> = {
      positive: 'bg-green-500/10 text-green-700 dark:text-green-400',
      neutral: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
      negative: 'bg-red-500/10 text-red-700 dark:text-red-400',
    };
    return colors[mood] || colors.neutral;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sessões & Devolutivas</h1>
            <p className="text-muted-foreground mt-1">Registros e feedback das sessões realizadas</p>
          </div>
          <Button onClick={() => navigate('/sessions/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Devolutiva
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredSessions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'Nenhuma sessão encontrada' : 'Nenhuma sessão registrada'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredSessions.map((session) => (
              <Card
                key={session.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/sessions/${session.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {patientNames[session.patientId] || 'Paciente'}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(session.date), "dd 'de' MMMM", { locale: ptBR })}
                        </div>
                      </div>
                    </div>
                    {session.metrics?.mood && (
                      <Badge variant="secondary" className={getMoodBadge(session.metrics.mood)}>
                        {session.metrics.mood === 'positive' && 'Positivo'}
                        {session.metrics.mood === 'neutral' && 'Neutro'}
                        {session.metrics.mood === 'negative' && 'Negativo'}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{session.feedback}</p>
                  {session.metrics && (
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Engajamento</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(session.metrics.engagement / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{session.metrics.engagement}/10</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Progresso</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(session.metrics.progress / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{session.metrics.progress}/10</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
