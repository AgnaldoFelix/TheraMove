import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');

  const chats = [
    {
      id: '1',
      name: 'Ana Silva',
      role: 'Responsável',
      lastMessage: 'Obrigada pelas informações!',
      time: '10:30',
      unread: 2,
    },
    {
      id: '2',
      name: 'Carlos Pedro',
      role: 'Responsável',
      lastMessage: 'Podemos remarcar a sessão?',
      time: '09:15',
      unread: 0,
    },
    {
      id: '3',
      name: 'Maria Costa',
      role: 'Responsável',
      lastMessage: 'Vou enviar os documentos',
      time: 'Ontem',
      unread: 1,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      content: 'Bom dia! Como foi a sessão de ontem?',
      time: '10:25',
      isSent: false,
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Bom dia! A sessão foi muito produtiva. A Maria mostrou bastante progresso.',
      time: '10:27',
      isSent: true,
    },
    {
      id: '3',
      senderId: '1',
      content: 'Que ótimo! Obrigada pelas informações!',
      time: '10:30',
      isSent: false,
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Aqui seria enviada a mensagem
      setMessage('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-primary" />
            Mensagens
          </h1>
          <p className="text-muted-foreground mt-1">
            Converse com responsáveis e familiares
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-16rem)]">
          {/* Lista de conversas */}
          <Card className="md:col-span-1">
            <ScrollArea className="h-full">
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedChat === chat.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {chat.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{chat.role}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs text-primary-foreground font-medium">
                            {chat.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Área de mensagens */}
          <Card className="md:col-span-2 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ana Silva</p>
                  <p className="text-xs text-muted-foreground">Responsável</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.isSent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isSent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
