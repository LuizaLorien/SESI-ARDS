import React, { useState } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button } from '@mui/material';
import './Calendario.css'; 

const initialValue = dayjs('2024-07-01');

function CustomDay(props) {
  const { markedDays, day, outsideCurrentMonth, ...other } = props;
  const isSelected = !outsideCurrentMonth && markedDays.some(markedDay => markedDay.date === day.date());

  const markType = isSelected ? markedDays.find(markedDay => markedDay.date === day.date()).type : null;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? (markType === 'azul' ? '🔵' : '🔴') : undefined}
      classes={{ badge: isSelected ? (markType === 'azul' ? 'custom-badge-azul' : 'custom-badge-vermelho') : '' }}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

 function CustomCalendar() {
  const [markedDays, setMarkedDays] = useState([
    { date: 1, type: 'azul' },
    { date: 2, type: 'vermelho' },
    { date: 10, type: 'vermelho' },
    { date: 15, type: 'azul' }
  ]);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayClick = (day) => {
    const date = day.date();
    setSelectedDays(prev => {
      if (prev.includes(date)) {
        return prev.filter(d => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedDays.length > 0) {
      const newMarkedDays = [...markedDays];
      selectedDays.forEach(date => {
        const existingIndex = newMarkedDays.findIndex(markedDay => markedDay.date === date);
        if (existingIndex !== -1) {
          newMarkedDays.splice(existingIndex, 1);
        } else {
          newMarkedDays.push({ date, type: 'azul' });
        }
      });
      setMarkedDays(newMarkedDays);
      setSelectedDays([]);
    } else {
      alert("Por favor, selecione os dias para confirmar.");
    }
  };

  const handleClear = () => {
    if (window.confirm("Você realmente deseja cancelar todas as marcações?")) {
      setMarkedDays([]);
    }
  };

  const BasicDateCalendar = ()=>{
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="calendar-container">
        <DateCalendar
          defaultValue={initialValue}
          onChange={handleDayClick}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              markedDays,
            },
          }}
        />
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={handleConfirm} className="custom-button">
            Confirmar Dias Disponíveis
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClear} className="custom-button">
            Cancelar Marcações
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
 }

 export default BasicDateCalendar;