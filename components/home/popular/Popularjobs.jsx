import React, {useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native'

import styles from './popularjobs.style'
import {COLORS, SIZES} from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch'
import {router} from "expo-router";

const Popularjobs = () => {
    const [selectedJob, setSelectedJob] = useState()


    const {data, loading} = useFetch('search', {
        query: 'Python developer in Texas, USA',
        page: '1',
        num_pages: '1'
    })

    const handlePress = (item) => {
        router.push(`/job_detail/${item.job_id}`)
        setSelectedJob()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {loading || !data ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : (
                    <FlatList data={data} renderItem={
                        ({item}) => (
                            <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handlePress}/>
                        )
                    }
                              keyExtractor={item => item.job_id}
                              contentContainerStyle={{columnGap: SIZES.medium}}
                              horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default Popularjobs