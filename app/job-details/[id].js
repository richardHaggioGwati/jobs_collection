import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, View} from 'react-native'
import {useRouter, useLocalSearchParams, Stack} from "expo-router";
import {useState} from "react";
import {JobAbout, JobFooter, JobTabs} from "../../components";
import useFetch from "../../hook/useFetch";
import {COLORS, SIZES} from "../../constants";
import icons from "../../constants/icons";

import Company from "../../components/jobdetails/company/Company";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Specifics from "../../components/jobdetails/specifics/Specifics";

const JobDetail = () => {
    const tabs = ['About', 'Qualifications', 'Responsibilities']

    const params = useLocalSearchParams()
    const router = useRouter()
    const [refreshing, SetRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const {data, loading, refetch} = useFetch('job-details', {
        job_id: params.id
    })

    const displayTabContent = () => {
        console.log(activeTab)
        switch (activeTab) {
            case 'Qualifications':
                return <Specifics title='Qualifications' points={data[0]?.job_highlights?.Qualifications ?? ['N/A']}/>
            case 'Responsibilities':
                return <Specifics title='Responsibilities' points={data[0]?.job_highlights?.Responsibilities ?? ['N/A']}/>
            case 'About':
                return <JobAbout info={data[0]?.job_description ?? 'No data provided'} />
            default:
                break;
        }
    }

    const onRefreshing = () => {
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
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
                <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing}/>}>
                    {loading || !data ? (
                        <ActivityIndicator size="large" color={COLORS.primary}/>
                    ) : (
                        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                            <Company companyData={data[0]}/>

                            <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
                            {displayTabContent()}
                        </View>
                    )}

                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/result'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetail