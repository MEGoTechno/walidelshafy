import Section from "../../style/mui/styled/Section"
import { useGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import { TextBorderWithIcons } from "../ui/TextBorderAround"
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FilledHoverBtn, OutLinedHoverBtn } from "../../style/buttonsStyles";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import { Link } from "react-router-dom";
import UnitCourseDetails from "../content/UnitCourseDetails";


const CourseIcon = ({ size }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="64" strokeDashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" /></path><path strokeDasharray="8" strokeDashoffset="8" d="M12 12h-5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.3s" dur="0.2s" values="8;0" /><animateTransform attributeName="transform" begin="1.3s" dur="15s" repeatCount="indefinite" type="rotate" values="0 12 12;15 12 12;165 12 12;65 12 12;115 12 12;165 12 12;165 12 12;165 12 12;90 12 12;115 12 12;115 12 12;15 12 12;0 12 12" /></path></g><g fill="currentColor"><path fillOpacity="0" d="M12 21C9.41 21 7.15 20.79 5.94 19L12 21L18.06 19C16.85 20.79 14.59 21 12 21Z"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.4s" values="M12 21C9.41 21 7.15 20.79 5.94 19L12 21L18.06 19C16.85 20.79 14.59 21 12 21Z;M12 16C9.41 16 7.15 17.21 5.94 19L12 21L18.06 19C16.85 17.21 14.59 16 12 16Z" /><set fill="freeze" attributeName="fill-opacity" begin="0.6s" to="1" /></path><circle cx="7" cy="12" r="0" transform="rotate(15 12 12)"><animate fill="freeze" attributeName="r" begin="0.9s" dur="0.2s" values="0;1" /></circle><circle cx="7" cy="12" r="0" transform="rotate(65 12 12)"><animate fill="freeze" attributeName="r" begin="0.95s" dur="0.2s" values="0;1" /></circle><circle cx="7" cy="12" r="0" transform="rotate(115 12 12)"><animate fill="freeze" attributeName="r" begin="1s" dur="0.2s" values="0;1" /></circle><circle cx="7" cy="12" r="0" transform="rotate(165 12 12)"><animate fill="freeze" attributeName="r" begin="1.05s" dur="0.2s" values="0;1" /></circle><circle cx="12" cy="12" r="0"><animate fill="freeze" attributeName="r" begin="1.3s" dur="0.2s" values="0;2" /></circle></g></svg>
}

const ToDown = ({ size }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path fill="currentColor" fillOpacity="0" strokeDasharray="64" strokeDashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" /><animate fill="freeze" attributeName="fill-opacity" begin="1.1s" dur="0.15s" values="0;0.3" /></path><path strokeDasharray="12" strokeDashoffset="12" d="M12 7l0 9.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0" /></path><path strokeDasharray="8" strokeDashoffset="8" d="M12 17l4 -4M12 17l-4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0" /></path></g></svg>
}
function LatestCourses() {
    const { data } = useGetCoursesQuery({ isFixed: true, limit: 10, isModernSort: true })

    if (data?.values?.courses)
        return (
            <Section>
                <FlexColumn my={'16px'}>
                    <TextBorderWithIcons sx={{ my: '9px' }} colorOne={'primary.main'} color={'neutral.0'} title={'احدث الكورسات'}
                    startIcon={<CourseIcon size={45} />}
                        endIcon={<ToDown size={45} />} />
                    <FilledHoverBtn size="small" component={Link} to='/courses' >عرض كل الكورسات</FilledHoverBtn>
                </FlexColumn>

                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    // spaceBetween={25}
                    // slidesPerView={2.5}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 15 },   // mobile
                        640: { slidesPerView: 1.2, spaceBetween: 15 }, // small tablets
                        768: { slidesPerView: 2.25, spaceBetween: 20 },   // tablets
                    }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    {data?.values?.courses.map((course, i) => <SwiperSlide key={i}> <UnitCourseDetails course={course} /> </SwiperSlide>)}
                </Swiper>
            </Section>
        )
}

export default LatestCourses
