import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/ClienteCalendario.css'; 

export default function ClientPage() {
  const [eventosAtuais, setEventosAtuais] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    const carregarEventos = () => {
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      setEventosAtuais(eventos.map(event => {
        if (!event.extendedProps) {
          event.extendedProps = { status: 'Pendente' };
        }
        if (!event.extendedProps.status) {
          event.extendedProps.status = 'Pendente';
        }
        return event;
      }));
    };
  
    carregarEventos();
  }, []);
  
  function handleDateSelect(selectInfo) {
    setModalInfo({
      type: 'create',
      start: selectInfo.startStr,
      end: selectInfo.endStr
    });
  }

  function handleEventClick(clickInfo) {
    setModalInfo({
      type: 'view',
      event: clickInfo.event
    });
  }

  function handleModalClose() {
    setModalInfo(null);
  }

  function handleEventCreate(title, horarioInicial, horarioFinal) {
    let [startHour, startMinute] = horarioInicial.split(':').map(Number);
    let [endHour, endMinute] = horarioFinal.split(':').map(Number);

    let startDate = new Date(modalInfo.start);
    let endDate = new Date(modalInfo.end);

    startDate.setHours(startHour, startMinute);
    endDate.setHours(endHour, endMinute);

    const newEvent = {
      id: String(Date.now()),
      title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      allDay: false,
      extendedProps: { isAdmin: false, status: 'Pendente' }
    };

    setEventosAtuais((prevEventos) => {
      const updatedEventos = [...prevEventos, newEvent];
      localStorage.setItem('eventos', JSON.stringify(updatedEventos));
      return updatedEventos;
    });

    handleModalClose();
  }

  function handleEventRemove() {
    const eventId = modalInfo.event.id;
    setEventosAtuais((prevEventos) => {
      const updatedEventos = prevEventos.filter(event => event.id !== eventId);
      localStorage.setItem('eventos', JSON.stringify(updatedEventos));
      return updatedEventos;
    });
    handleModalClose();
  }

  return (
    <body className='bodyCalendar'>
      <div className='client-page'>
        <Sidebar eventos={eventosAtuais} />
        <div className='client-page-main'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            events={eventosAtuais}
            editable={true}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </div>
        {modalInfo && (
          <ModalCliente
            info={modalInfo}
            onClose={handleModalClose}
            onCreate={handleEventCreate}
            onRemove={handleEventRemove}
          />
        )}
      </div>
    </body>
  );
}

// Componente Modal para ClientPage
function ModalCliente({ info, onClose, onCreate, onRemove }) {
  const [title, setTitle] = useState('');
  const [horarioInicial, setHorarioInicial] = useState('10:00');
  const [horarioFinal, setHorarioFinal] = useState('12:00');
  const [confirmarRemocao, setConfirmarRemocao] = useState(false);

  function handleSubmit() {
    if (info.type === 'create') {
      if (!title) {
        alert('Título é obrigatório.');
        return;
      }
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioInicial) || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(horarioFinal)) {
        alert('Formato de hora inválido. Por favor, use HH:MM no formato 24 horas.');
        return;
      }
      onCreate(title, horarioInicial, horarioFinal);
    } else if (info.type === 'view') {
      if (confirmarRemocao) {
        onRemove();
      } else {
        onClose();
      }
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>&times;</button>
        {info.type === 'create' ? (
          <>
            <h2 className="h2Modal">Marcar Evento</h2>
            <input
              type='text'
              placeholder='Título do evento'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              placeholder='Hora de início (HH:MM)'
              value={horarioInicial}
              onChange={(e) => setHorarioInicial(e.target.value)}
            />
            <input
              type='text'
              placeholder='Hora de término (HH:MM)'
              value={horarioFinal}
              onChange={(e) => setHorarioFinal(e.target.value)}
            />
            <button onClick={handleSubmit}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
          </>
        ) : (
          <>
            {confirmarRemocao ? (
              <>
                <h2>Confirmar Remoção</h2>
                <p>Você tem certeza que deseja remover o evento: <strong>{info.event.title}</strong>?</p>
                <button onClick={handleSubmit}>Confirmar</button>
                <button onClick={() => setConfirmarRemocao(false)}>Cancelar</button>
              </>
            ) : (
              <>
                <h2>Detalhes do Evento</h2>
                <p><strong>Título:</strong> {info.event.title}</p>
                <p><strong>Início:</strong> {new Date(info.event.start).toLocaleString()}</p>
                <p><strong>Fim:</strong> {new Date(info.event.end).toLocaleString()}</p>
                <button onClick={() => setConfirmarRemocao(true)}>Remover Evento</button>
                <button onClick={onClose}>Fechar</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Componente Sidebar
function Sidebar({ eventos }) {
  const eventosPendentes = eventos.filter(evento => evento.extendedProps.status === 'Pendente');
  const eventosConfirmados = eventos.filter(evento => evento.extendedProps.status === 'Confirmado');

  return (
    <div className='sidebar'>
      <h2>Reuniões Pendentes ({eventosPendentes.length})</h2>
      <ul>
        {eventosPendentes.map(evento => (
          <SidebarEvent key={evento.id} evento={evento} />
        ))}
      </ul>
      <h2>Reuniões Confirmadas ({eventosConfirmados.length})</h2>
      <ul>
        {eventosConfirmados.map(evento => (
          <SidebarEvent key={evento.id} evento={evento} />
        ))}
      </ul>
    </div>
  );
}

// Componente SidebarEvent
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
