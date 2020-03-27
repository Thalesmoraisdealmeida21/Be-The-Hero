import React from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { Feather} from '@expo/vector-icons'
import { useNavigation, useRoute} from '@react-navigation/native'
import styles from './styles'

import logoImg from './../../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'


export default function Detail(){

    const navigation = useNavigation();
    const route  = useRoute();
    const incident = route.params.incident;
    const message = 'Olá, ' + incident.name + ' estou entrando em contato pois gostaria de ajudar no caso' + incident.title + ' com o valor de' + incident.value;
  




    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: "Heroi do Caso: Cadelinha atropelada",
            recipients: ['thales.morais21@gmail.com'],
            body: message
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5555996628613&text=${message} `);
    }
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                     <Image source={logoImg}/>
                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#e82041"></Feather>
                        </TouchableOpacity>
                 </View>


                 <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0}]}>ONG: </Text>
                    <Text style={styles.incidentValue}>{incident.name} </Text>

                    <Text style={styles.incidentProperty}>Caso: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}> Valor; </Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}  </Text>
                 </View>


                 <View style = {styles.contactBox}>
                  <Text style={styles.heroTitle} >Salve o dia !</Text>
                  <Text style={styles.heroTitle} >Seja o heroi desse caso.</Text>

                  <Text style={styles.heroDescription}>Entre em Contato</Text>

                  <View style={styles.actions}>
                      <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                          <Text style={styles.actionText}>Whatsapp</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.action} onPress={sendMail}>
                          <Text style={styles.actionText}>E-mail</Text>
                      </TouchableOpacity>
                  </View>
                 </View>


             
        </View>
    )
}