import React, { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';

const Kalendar = ({ childToParent }) => {
  const [selectedStartDate, setselectedStartDate] = useState(null);
  const [selectedEndDate, setselectedEndDate] = useState(null);

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setselectedStartDate(date);
      setselectedEndDate(null);
    }
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  var dol = startDate;
  var odl = endDate;
  if (dol !== '') {
    dol = Moment(startDate).format('DD.MM.YYYY');
    if (odl !== '') {
      odl = Moment(endDate).format('DD.MM.YYYY');
    }
  }

  var datum = dol + ' - ' + odl;
  childToParent(datum);

  return (
    <View style={styles.container}>
      <CalendarPicker
        width={300}
        height={300}
        allowRangeSelection={true}
        onDateChange={onDateChange}
        scrollable={true}
        selectedDayColor="#90EE90"
        weekdays={['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned']}
        months={[
          'Siječanj',
          'Veljača',
          'Ožujak',
          'Travanj',
          'Svibanj',
          'Lipanj',
          'Srpanj',
          'Kolovoz',
          'Rujan',
          'Listopad',
          'Studeni',
          'Prosinac',
        ]}
        firstDay='1'
        previousTitle="Prethodni"
        nextTitle="Sljedeći"
        headerWrapperStyle={styles.kalendar}
      />
      <View>
        <Text style={styles.ispis}>
          {datum}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  ispis: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  kalendar: {
    backgroundColor: '#FFD580',
    borderRadius: 20,
  },
});

export default Kalendar;
