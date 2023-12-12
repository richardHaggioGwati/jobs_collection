import {View, Text, TouchableOpacity, Image} from 'react-native'

import styles from './popularjobcard.style'

const PopularJobCard = ({item, selectedJob, handleCardPress}) => {
    return (
        <TouchableOpacity style={styles.container(selectedJob, item)}>
            <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
                {
                    item.employer_logo ?
                        <Image source={{uri: item.employer_logo}} resizeMode='contain' style={styles.logoImage}/>
                        : <Image source={require('../../../../assets/images/job-post.jpg')} resizeMode='contain'
                                 style={styles.logoImage}/>
                }
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
