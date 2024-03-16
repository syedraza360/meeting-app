import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../Components/Loader';
import Global from '../Components/Global';
import CustomSwitch from '../Components/CustomSwitch';

const screenWidth = Dimensions.get('window').width;

const Appointment = ({ route, navigation }) => {
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canceled, setcanceled] = useState(false);
  const [pastAppointments, setpastAppointments] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const ress = await AsyncStorage.getItem('user_id')
      const client = JSON.parse(ress);

      setLoading(true);
      let response = await Global.fetchpost("GET",
        `https://user-api-v2.simplybook.me/admin/bookings?filter[client_id]=${client.id}`
      );
      let res = await response.json();
      console.log("json response", res.data);
      setLoading(false);
      if (res.data) {
        setappointments(res.data);
      }
      else {
        Alert.alert("", "Something went wrong!", [{ text: "OK", onPress: () => { } }],
          {
            cancelable: false,
          }
        );
      }
    }
    fetchData();

  }, [route.params, canceled])

  const deleteAppointment = async (deleteId) => {
    console.log("delete id", deleteId);
    Alert.alert(
      "Alert",
      "Are you sure to delete this appointment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "YES", onPress: () =>

            callDeleteApi(deleteId)
        }
      ]
    );

    const callDeleteApi = async (deleteId) => {
      setLoading(true);
      setcanceled(true)
      // doctors list fetching starts
      let response = await Global.fetchpost("DELETE",
        `https://user-api-v2.simplybook.me/admin/bookings/${deleteId}`
      );
      let res = await response.json();
      console.log("json response", res);
      console.log("ssss", canceled)
      setLoading(false);
    }
  }

  const onSelectSwitch = async (index) => {
    if (index == 1) {
      setpastAppointments(false)

      const ress = await AsyncStorage.getItem('user_id')
      const client = JSON.parse(ress);

      setLoading(true);
      let response = await Global.fetchpost("GET",
        `https://user-api-v2.simplybook.me/admin/bookings?filter[client_id]=${client.id}`
      );
      let res = await response.json();
      console.log("json response", res.data);
      setLoading(false);

      if (res.data) {
        setappointments(res.data);
      }
      else {
        Alert.alert("", "Something went wrong!", [{ text: "OK", onPress: () => { } }],
          {
            cancelable: false,
          }
        );
      }
    }
    else {
      setpastAppointments(true)
    }
  };

  return (
    <View style={[styles.mainBody]}>
      <Loader loading={loading} />
      <View>
        <Text style={[styles.main_heading]}>Your Appointments</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <CustomSwitch
            selectionMode={2}
            roundCorner={false}
            option1={'Upcoming'}
            option2={'Past'}
            onSelectSwitch={onSelectSwitch}
            selectionColor={'#eeeff5'}
          />
        </View>
      </View>
      <ScrollView pagingEnabled contentContainerStyle={{ flexGrow: 1 }} decelerationRate="fast" horizontal
        showsHorizontalScrollIndicator={false}
      >
        {appointments == undefined || appointments.length == 0 || pastAppointments ? (
          <LinearGradient colors={['#5a85f6', '#5366f5', '#4c47f5']} style={{ width: "90%", height: "25%", marginVertical: 40, marginHorizontal: 20, borderRadius: 8 }}>
            <View style={{ margin: 25 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10, textAlign: 'center' }}>No Appointments</Text>
            </View>
          </LinearGradient>
        )
          :
          appointments.map((source, index) => (
            <>
              <View >
                <Text style={{ color: "#b5bbc5", textAlign: "center", fontWeight: "600" }}>{index + 1} of {appointments.length}</Text>

                <LinearGradient colors={['#5a85f6', '#5366f5', '#4c47f5']} key={source} style={[styles.appointmentCard]}>
                  <View style={{ margin: 25 }}>
                    <Text style={{ color: '#c3c8d1', fontWeight: 'bold' }}>In 3 days</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, paddingVertical: 10 }}>Consultation with {source.provider.name}</Text>
                    <Text style={[styles.appointmentCardDetails]}><Ionicons name='calendar-outline' size={24} color="white" /> {source.start_datetime}</Text>
                    <Text style={[styles.appointmentCardDetails]}><Ionicons name='time' size={24} color="white" /> {source.end_datetime} </Text>
                    <Text style={[styles.appointmentCardDetails]}><Ionicons name='location' size={24} color="white" /> {source.location == null ? 'NOT GIVEN' : source.location} </Text>
                    <Text style={[styles.appointmentCardDetails]}><Ionicons name='call' size={24} color="white" /> {source.status} </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableHighlight
                        style={[styles.rescheduleBtn]}
                        onPress={() => navigation.navigate('AddAppointment', {
                          provider_id: source.provider.id,
                          service_id: source.service.id,
                          start_time: source.start_datetime,
                          appointment_id: source.id
                        })}>
                        <Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }} >RESCHEDULE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={[styles.rescheduleBtn, { backgroundColor: '#db413d' }]}
                        onPress={() => deleteAppointment(source.id)}
                      >
                        <Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }} >CANCEL</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </>
          )).reverse()
        }
      </ScrollView>
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: "5%",
    marginTop: "10%"
  },
  main_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#0d233c",
  },
  upcomingApptBtn: {
    width: "50%",
    aspectRatio: 10 / 2.5,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 2,
  },
  appointmentCard: {
    backgroundColor: "",
    width: screenWidth - 82,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 8
  },
  appointmentCardDetails: {
    color: 'white',
    paddingVertical: 10
  },
  rescheduleBtn: {
    borderColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    width: 120,
    height: 40,
    marginVertical: 40,
    marginHorizontal: 4,
    paddingTop: 8
  }
})