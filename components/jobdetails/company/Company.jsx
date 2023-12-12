import React from 'react'
import {View, Text, Image} from 'react-native'

import styles from './company.style'
import icons from "../../../constants/icons";

const Company = ({ companyData = {} }) => {

    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                {
                    companyData.employer_logo ? <Image source={{uri: companyData.employer_logo}} style={styles.logoImage} /> :
                        <Image source={require('../../../assets/images/job-post.jpg')} style={styles.logoImage} />
                }
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{companyData.job_title}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{companyData.employer_name} / </Text>
                <View style={styles.locationBox}>
                    <Image source={icons.location} resizeMode='contain' style={styles.locationImage}/>
                    <Text style={styles.locationName}>{companyData.job_country}</Text>
                </View>
            </View>
        </View>
    )
}

export default Company