import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const NewPatient = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    diagnosis: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.guardianName || !birthDate) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    // Aqui você faria a chamada ao backend
    toast.success('Paciente cadastrado com sucesso!');
    navigate('/patients');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Novo Paciente</h1>
            <p className="text-muted-foreground mt-1">Cadastre um novo paciente no sistema</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Dados do Paciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome do Paciente <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Data de Nascimento <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !birthDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, 'dd/MM/yyyy') : 'Selecione a data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico / Condição</Label>
                <Input
                  id="diagnosis"
                  placeholder="Ex: TEA, TDAH, etc."
                  value={formData.diagnosis}
                  onChange={(e) => handleChange('diagnosis', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Informações adicionais sobre o paciente"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dados do Responsável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="guardianName">
                  Nome do Responsável <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="guardianName"
                  placeholder="Nome completo"
                  value={formData.guardianName}
                  onChange={(e) => handleChange('guardianName', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianEmail">E-mail</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.guardianEmail}
                    onChange={(e) => handleChange('guardianEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Telefone</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.guardianPhone}
                    onChange={(e) => handleChange('guardianPhone', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/patients')}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Cadastrar Paciente
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewPatient;
