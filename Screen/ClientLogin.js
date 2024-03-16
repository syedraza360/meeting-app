import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Global from './Components/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';

const ClientLogin = ({ navigation }) => {
    const [name, setname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [phone, setphone] = useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = async() => {
        setErrortext('');
        if (!name) {
            alert('Please fill your name');
            return;
        }
        if (!userEmail) {
            alert('Please fill your email');
            return;
        }
        if (!phone) {
            alert('Please fill your phone number');
            return;
        }
        let dataToSend = { email: userEmail, name: name, phone: phone };

        setLoading(true);
        let respbooking = await Global.fetchpost("POST",
          "https://user-api-v2.simplybook.me/admin/clients",
           JSON.stringify(dataToSend)

        );
        let res = await respbooking.json();
        console.log("json response", res.data);
        setLoading(false);
        
        if (res.state_id == null) {
            AsyncStorage.setItem('user_id', JSON.stringify(res));
            navigation.replace('DrawerNavigationRoutes');
        } else {
            setErrortext(res.msg);
            console.log('error while client login');
        }
    }

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../Image/aboutreact.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(name) =>
                                    setname(name)
                                }
                                placeholder="Enter Name" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(phone) =>
                                    setphone(phone)
                                }
                                placeholder="Enter Phone" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="numeric"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>Client Login</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default ClientLogin;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eff1f3',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#223943',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#a1a1a1',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#dadae8',
        fontWeight:'bold'
    },
    registerTextStyle: {
        color: '#1b1b1b',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
        
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});