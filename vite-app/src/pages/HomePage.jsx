import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import LatestCourses from '../components/home/LatestCourses'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'
// import AboutUS from '../components/home/AboutUS'
// import Hero2 from '../components/home/Hero2'
// import { Box } from '@mui/material'

function HomePage() {

    const user = useSelector(s => s.global.user)

    if (user) {
        return <>
            <SEOHelmetAsync
                title={'الصفحه الرئيسيه - منصه وليد الشافي'}
                desc={"الصفجه الرئيسيه فى منصه وليد الشافى"}
                url={"https://walidelshafy.com"}
            />
            <UserHome />
        </>
    }
    return (
        <div>
            <SEOHelmetAsync
                title={'الصفحه الرئيسيه - منصه وليد الشافي'}
                desc={"الصفجه الرئيسيه فى منصه وليد الشافى"}
                url={"https://walidelshafy.com"}
            />
            {/* <Hero2 /> */}
            {/* <Box mt={'50px'} /> */}
            <Hero />

            <LatestCourses />
            <Services />

            {/* <AboutUS /> */}
            <Grades />
        </div>
    )
}

export default HomePage
