import React from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'

import styles from './nearbyjobs.style'
import {useRouter} from "expo-router";
import useFetch from "../../../hook/useFetch";
import {COLORS} from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const NearByJobs = () => {
    const router = useRouter()

    const {data, loading} = useFetch('search', {
        query: 'Python developer in Texas, USA',
        page: '1',
        num_pages: '1'
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Near by jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {loading || !data ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : (
                    data?.map((job) => (
                        <NearbyJobCard job={job} key={`near-by-${job?.job_id}`}
                                       handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}/>
                    ))
                )}
            </View>
        </View>
    )
}

export default NearByJobs