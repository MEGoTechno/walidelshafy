import { useSelector } from 'react-redux'

import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import Grades from '../components/home/Grades'
import UserHome from '../components/home/UserHome'
import LatestCourses from '../components/home/LatestCourses'
import SEOHelmetAsync from '../tools/SEOHelmetAsync'

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
            <Hero />
            <LatestCourses />
            {/* <AboutUS /> */}
            <Services />
            <Grades />
        </div>
    )
}

export default HomePage
