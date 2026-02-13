import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import LatestCourses from '../components/home/LatestCourses'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'
import { lang } from '../settings/constants/arlang'
// import AboutUS from '../components/home/AboutUS'
// import Hero2 from '../components/home/Hero2'
// import { Box } from '@mui/material'

function HomePage() {

    const user = useSelector(s => s.global.user)

    if (user) {
        return <>
            <SEOHelmetAsync
                title={' الصفحه الرئيسيه - ' + `${lang.LOGO_AR}`}
                desc={`${lang.LOGO_Home_Description}`}
                url={window.location.href}
            />
            <UserHome />
        </>
    }
    return (
        <div>
            <SEOHelmetAsync
                title={' الصفحه الرئيسيه - ' + `${lang.LOGO_AR}`}
                desc={`${lang.LOGO_Home_Description}`}
                url={window.location.href}
                isSiteLink
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
