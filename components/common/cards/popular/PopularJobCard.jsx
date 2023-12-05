import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import styles from './popularjobcard.style'
import {checkImageUrl} from "../../../../utils";

const PopularJobCard = ({item, selectedJob, handleCardPress}) => {
    //TODO: fix valid Image
    const imagePlaceHolder = require('../../../../assets/images/job-post.jpg')
    const validImage = checkImageUrl(item.employer_logo) ? item.employer_logo : imagePlaceHolder

    return (
        <TouchableOpacity style={styles.container(selectedJob, item)}>
            <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
                <Image
                    source={{uri: validImage}}
                    resizeMode='contain' style={styles.logoImage}/>
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.job_title}</Text>
                <Text style={styles.location}>{item.job_country}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PopularJobCard;
