import { useSelector } from 'react-redux'

import Services from '../components/home/Services'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import LatestCourses from '../components/home/LatestCourses'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'
import { lang } from '../settings/constants/arlang'
import Hero2 from '../components/home/Hero2'
import Services2 from '../components/home/Services2'

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
            <Hero2 />
            <LatestCourses />
            <Services2 />
            <Services />
            {/* <BeFirst /> */}
            {/* <Hero /> */}

            {/* <AboutUS /> */}
            <Grades />
        </div>
    )
}

export default HomePage
