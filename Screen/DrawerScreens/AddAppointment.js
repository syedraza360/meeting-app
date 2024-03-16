import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, Pressable, StyleSheet, Alert } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Loader from '../Components/Loader';
import Global from '../Components/Global';



const AddAppointment = ({ route, navigation }) => {
    const [question, setQuestion] = useState(1);
    const [doctorId, setdoctorId] = useState('');
    const [serviceId, setserviceId] = useState('');
    const [timeslot, settimeslot] = useState('');
    const [date, setdate] = useState('');
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState([]);
    const [doctorList, setDoctorList] = useState([])
    const [servicesList, setservicesList] = useState([
        {
            id: "1",
            name: "Consultation",
            icon: "ios-medkit"
        },
        {
            id: "2",
            name: "Tooth Pain",
            icon: "ios-hammer"
        },
        {
            id: "3",
            name: "Cleaning",
            icon: "ios-nuclear"
        },
        {
            id: "4",
            name: "Brases",
            icon: "ios-flask"
        },
        {
            id: "5",
            name: "Dental Implants",
            icon: "ios-heart"
        },

    ])


    useEffect(() => {
        setQuestion(1);
        if (route.params && route.params.appointment_id != null) {
            var str = route.params.start_time;
            var date = str.slice(0, 10);
            setdoctorId(route.params.provider_id);
            setserviceId(route.params.service_id);
            setdate(date);
        }

        async function fetchData() {
            setLoading(true);
            let response = await Global.fetchpost("GET",
                "https://user-api-v2.simplybook.me/admin/providers"
            );
            let res = await response.json();
            console.log("json response", res.data);
            setLoading(false);

            if (res.data) {
                setDoctorList(res.data)
            }
            else {
                Alert.alert("", "Data Not found", [{ text: "OK", onPress: () => { } }],
                    {
                        cancelable: false,
                    }
                );
            }
        }
        fetchData();
    }, [route.params])

    const handleSubmitPress = () => {
        if (!doctorId && question == 1) {
            alert('Please select any doctor');
            return;
        }

        if (!serviceId && question == 2) {
            alert('Please select any Service');
            return;
        }
        else {
            setQuestion(question + 1)
        }

    }
    const SubmitAppointment = async () => {
        if (!date && question == 3) {
            alert('Please select any Date');
            return;
        }
        if (!timeslot && question == 3) {
            alert('Please select any Time Slot');
            return;
        }
        else {
            const response = await AsyncStorage.getItem('user_id')
            const user_response_parsed = JSON.parse(response);
            console.log("valuess", timeslot, date, serviceId, doctorId, user_response_parsed)

            let dataToSend = { start_datetime: date + ' ' + timeslot, provider_id: doctorId, service_id: serviceId, client_id: user_response_parsed.id };
            if (route.params != undefined && route.params.appointment_id) {
                console.log("inside edit booking")
                setLoading(true);
                let respbooking = await Global.fetchpost("PUT",
                    `https://user-api-v2.simplybook.me/admin/bookings/${route.params.appointment_id}`,
                    JSON.stringify(dataToSend)
                );
                let res = await respbooking.json();
                console.log("json response", res);
                navigation.setParams({ appointment_id: null })
                setLoading(false);
                if (res.code == 400) {
                    alert('Something went wrong')

                    console.log('Something went worng', res);
                } else {
                    Alert.alert("Congratulations!", "Appointment is Rescheduled", [{
                        text: "OK", onPress: () => {
                            navigation.navigate('Appointment', { IsDataChanged: true })
                        }
                    }],
                        {
                            cancelable: false,
                        }
                    );
                }
            }
            else {
                setLoading(true);
                let respbooking = await Global.fetchpost("POST",
                    "https://user-api-v2.simplybook.me/admin/bookings",
                    JSON.stringify(dataToSend)
                );
                let res = await respbooking.json();
                console.log("json response", res.data);
                setLoading(false);
                if (res.code == 400) {
                    alert('Something went wrong')

                    console.log('Something went worng', res);
                } else {
                    Alert.alert("Congratulations!", "Appointment is successfully booked", [{
                        text: "OK", onPress: () => {
                            navigation.navigate('Appointment', { IsDataChanged: true })
                        }
                    }],
                        {
                            cancelable: false,
                        }
                    );
                }
            }
            setQuestion(1);
            setdoctorId('');
            setserviceId('');
            setdate('');
        }
    }
    const getAvailableSlots = async (selectedDate) => {
        setdate(selectedDate);
        setLoading(true);
        let response = await Global.fetchpost("GET",
            `https://user-api-v2.simplybook.me/admin/schedule/available-slots?date=${selectedDate}&provider_id=${doctorId}&service_id=${serviceId}`
        );
        let res = await response.json();
        console.log("json response", res);
        setLoading(false);

        if (res.length > 0) {
            setSlots(res)
        }
        else {
            setSlots([])
        }
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Loader loading={loading} />
            <View style={{ flex: 0.5 }}>
                <Text style={[styles.main_heading]}>Book Appointment</Text>
                <Text style={{ fontWeight: "bold", color: "#b5bbc5" }}>Sajjad Kazmi</Text>
            </View>
            <View style={[{ flex: 4 }, styles.card, styles.shadowProp]}>
                {question == 1 && (
                    <View>
                        <Text style={styles.questionBox}>SELECT A DOCTOR</Text>
                        {doctorList.map((itemDoctor) => (
                            <View key1={itemDoctor}>
                                <TouchableHighlight
                                    underlayColor="#587cf6"
                                    style={[styles.walkThrough_button, doctorId == itemDoctor.id ? styles.activeColor : styles.inactiveColor]}
                                    onPress={() => setdoctorId(itemDoctor.id)}>
                                    <Text
                                        style={[styles.walkThrough_buttonText, doctorId == itemDoctor.id ? styles.activeFontColor : styles.InactiveFontColor]}>{itemDoctor.name}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        ))}
                    </View>
                )}
                {question == 2 && (
                    <View>
                        <Text style={styles.questionBox}>HOW WE MAY HELP YOU?</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {servicesList.map((itemService) => (
                                <TouchableHighlight key2={itemService}
                                    style={[styles.category_box, serviceId == itemService.id ? styles.activeColor : styles.inactiveColor]}
                                    onPress={() => setserviceId(itemService.id)}
                                >
                                    <View style={[styles.category_box_items]}>
                                        <Ionicons name={itemService.icon} size={24} color={serviceId == itemService.id ? "white" : "#5777f6"} />
                                        <Text style={serviceId == itemService.id ? styles.activeFontColor : styles.InactiveFontColor} >{itemService.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))}
                        </View>
                    </View>
                )}
                {question == 3 && (
                    <View>
                        <View>
                            <Text style={styles.questionBox}>SELECT DATE & SLOT</Text>
                            <Calendar
                                onMonthChange={month => {
                                    setdate('');
                                    setSlots('');
                                }}
                                enableSwipeMonths={true}
                                onDayPress={day => { console.log(day); getAvailableSlots(day.dateString); }}
                                markedDates={{ [date]: { selected: true, marked: true, selectedColor: '#597ef6' } }}
                                hideExtraDays={true}
                            />
                        </View>
                        <View>
                            <Text style={styles.questionBox}>AVAILABLE SLOTS</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }} >
                                {slots == undefined || slots.length == 0 ? (
                                    <View><Text style={{ fontWeight: "bold", justifyContent: "center", textAlign: "center" }}>No Slots available</Text></View>
                                ) :
                                    slots.map((item) => (
                                        <View key3={item}>
                                            <TouchableHighlight
                                                underlayColor="#5673f6"
                                                onPress={() => settimeslot(item.time)}
                                                style={[styles.availableSlotBox, timeslot == item.time ? styles.activeColor : styles.inactiveColor]}>
                                                <Text style={[timeslot == item.time ? styles.activeFontColor : styles.InactiveFontColor, { fontWeight: 'bold' }]}>{item.time.slice(0, -3)}</Text>
                                            </TouchableHighlight>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View ><Text style={{ color: "#b5bbc5", textAlign: "center", fontWeight: "600" }}>{question} of 4</Text></View>
            <View style={[{ flex: 0.4 }, styles.card, styles.footer]}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={() => setQuestion(question != 1 ? question - 1 : 1)}>
                        <Text underlayColor={"white"} style={[styles.text]}>BACK</Text>
                    </TouchableHighlight>
                    {question == 3 ? (
                        <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={SubmitAppointment}>
                            <Text style={[styles.text]}>BOOK</Text>
                        </TouchableHighlight>
                    ) : (

                        <TouchableHighlight underlayColor={"#556ff6"} style={[styles.button]} onPress={handleSubmitPress}>
                            <Text style={[styles.text]}>NEXT</Text>
                        </TouchableHighlight>
                    )}
                </View>
            </View>
        </View>
    );
};

export default AddAppointment;

const styles = StyleSheet.create({
    main_heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#000",
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#52006A',
        elevation: 8,

    },
    category_box: {
        backgroundColor: "white",
        margin: 6,
        width: "45%",
        aspectRatio: 10 / 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#EEEFF5',
        borderWidth: 1,

    },
    category_box_items: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 12,
        width: "47%",
        alignItems: "center",
        marginHorizontal: 5,
        borderRadius: 4,
        borderColor: '#4e4ef5',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4e4ef5',
    },

    walkThrough_buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "HurmeGeometricSans4-SemiBold",
    },
    walkThrough_button: {
        borderColor: "#EEEFF5",
        borderWidth: 2,
        borderRadius: 6,
        height: 50,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    activeColor: {
        backgroundColor: '#5673f6',
    },
    inactiveColor: {
        backgroundColor: 'white',
    },
    activeFontColor: {
        color: "white"
    },
    InactiveFontColor: {
        color: "#374a5f"
    },
    availableSlotBox: {
        margin: 4,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: "white",
        borderRadius: 4,
        borderColor: '#EEEFF5',
        borderWidth: 1,
    },
    questionBox: {
        color: "#c3c8d1",
        fontSize: 14,
        marginBottom: 10,
        fontWeight: "bold",
    }
});