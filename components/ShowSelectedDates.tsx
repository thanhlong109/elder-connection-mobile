import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Modal, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { setWokingDatesString } from '~/slices/serviceBookingSlice';
import { getSelectedDaysForNextNMonths } from '~/utils/date';

interface ShowSelectedDatesProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialSelectedDates: number[];
  months: number;
  onDateChange: (numDate: number) => void;
}

const ShowSelectedDates = ({
  setVisible,
  visible,
  initialSelectedDates,
  months,
  onDateChange,
}: ShowSelectedDatesProps) => {
  const dispatch = useDispatch();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [marked, setMarked] = useState<MarkedDates>({});

  useEffect(() => {
    const dates = getSelectedDaysForNextNMonths(new Date(), initialSelectedDates, months);

    setSelectedDates(dates);
  }, [initialSelectedDates, months]);

  useEffect(() => {
    const newMarked: MarkedDates = {};
    selectedDates.forEach((date) => {
      newMarked[date] = { selected: true, marked: true, selectedColor: 'orange' };
    });
    onDateChange(selectedDates.length);
    setMarked(newMarked);
    dispatch(setWokingDatesString(selectedDates.join('|')));
  }, [selectedDates]);

  const toggleDate = (date: string) => {
    setSelectedDates((prevSelectedDates) => {
      if (prevSelectedDates.includes(date)) {
        return prevSelectedDates.filter((d) => d !== date);
      } else {
        return [...prevSelectedDates, date];
      }
    });
  };
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <TouchableOpacity
        center
        onPress={() => setVisible(false)}
        className=" h-full w-full bg-[rgba(0,0,0,0.1)]">
        <Pressable onPress={() => {}} className="mx-6 w-full p-6">
          <Calendar
            onDayPress={(day) => {
              const date = day.dateString;
              toggleDate(date);
            }}
            markedDates={marked}
          />
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

export default ShowSelectedDates;
