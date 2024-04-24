import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CalendarComponent() {
  const [selectedDates, setSelectedDates] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDates({ ...selectedDates, [dateString]: { selected: true, color: '#2C2C2C' } });
    hideDatePicker(); // Uncomment this line if you want to hide the date picker after selection
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (selectedDates[dateString]) {
      const { [dateString]: _, ...updatedDates } = selectedDates;
      setSelectedDates(updatedDates);
    } else {
      setSelectedDates({ ...selectedDates, [dateString]: { selected: true, color: '#2C2C2C' } });
    }
  };

  return (
    <>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        style={{ borderRadius: 5 }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
