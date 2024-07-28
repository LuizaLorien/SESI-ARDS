import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './ClientePage.css'; // Importar o arquivo de estilos


export default function ClientPage() {
  const [eventosAtuais, setEventosAtuais] = useState([]);

  useEffect(() => {
    // Simulação de carregamento de eventos de uma API ou outro serviço
    const carregarEventos = async () => {
      // Aqui você substituiria por uma chamada real à API
      const eventos = [
        // Exemplo de dados
        {
          id: '1',
          title: 'Reunião de Planejamento',
          start: '2024-07-30T10:00:00',
          end: '2024-07-30T11:00:00',
          extendedProps: { isAdmin: true }
        },
        {
          id: '2',
          title: 'Reunião de Equipe',
          start: '2024-07-31T14:00:00',
          end: '2024-07-31T15:00:00',
          extendedProps: { isAdmin: true }
        },
        // Outros eventos
      ];

      setEventosAtuais(eventos.filter(evento => evento.extendedProps?.isAdmin));
    };

    carregarEventos();
  }, []);

  return (
    <div className='client-page'>
      <Sidebar eventos={eventosAtuais} />
      <div className='client-page-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          events={eventosAtuais}
          editable={false} // Clientes não devem poder editar eventos
          selectable={false} // Clientes não devem poder selecionar datas
        />
      </div>
    </div>
  );
}

function Sidebar({ eventos }) {
  return (
    <div className='sidebar'>
      <h2>Reuniões Marcadas ({eventos.length})</h2>
      <ul>
        {eventos.map(evento => (
          <SidebarEvent key={evento.id} evento={evento} />
        ))}
      </ul>
    </div>
  );
}

function SidebarEvent({ evento }) {
  const horarioInicial = evento.start ? new Date(evento.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
  const horarioFinal = evento.end ? new Date(evento.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

  return (
    <li>
      <b>{new Date(evento.start).toLocaleDateString()}</b>
      <span>{horarioInicial && horarioFinal ? ` ${horarioInicial} - ${horarioFinal}` : ''} </span>
      <i>{' ' + evento.title}</i>
    </li>
  );
}
