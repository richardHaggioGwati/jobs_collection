import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, View} from 'react-native'
import {useRouter, useLocalSearchParams, Stack} from "expo-router";
import {useState} from "react";
import {JobTabs} from "../../components";
import useFetch from "../../hook/useFetch";
import {COLORS, SIZES} from "../../constants";
import icons from "../../constants/icons";

import Company from "../../components/jobdetails/company/Company";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";

const JobDetail = () => {
    const tabs = ['About', 'Qualification', 'Responsibilities']

    const params = useLocalSearchParams()
    const router = useRouter()
    const [refreshing, SetRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const {data, loading, refetch} = useFetch('job-details', {
        job_id: params.id
    })

    const displayTabContent = () => {
        switch (activeTab) {
            case 'Qualifications':
            case 'Responsibilities':
            case 'About':
            default:
                break;
        }
    }

    const onRefreshing = () => {}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.left} dimensions="60%" handlePress={() => router.back()}/>
                ),
                //TODO: implement share
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimensions="60%"/>
                ),
                headerTitle: '',
            }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing}/> }>
                    {loading || !data ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100}}>
                            <Company companyData={data[0]}/>

                            <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </View>
                    )}
                    {displayTabContent}
                </ScrollView>
            </>
        </SafeAreaView>
    )
}

export default JobDetail