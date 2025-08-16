import React from 'react'
import './home.css'
import Section from '../../style/mui/styled/Section'
import Grid from '../../style/vanilla/Grid'
import { Box, Paper, Typography, useTheme } from '@mui/material'
import Battery from '../animations/battery/Battery'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Image from '../ui/Image'
import TitleWithDividers from '../ui/TitleWithDividers'
import Nucleus from '../animations/nucleus/Nucleus'



const features = [
    {
        icon: <Image img={'/assets/questions.svg'} sx={{ maxWidth: '100px' }} />,
        title: 'بنك الاسئله',
        body: " المنصه بتقدملك بنك اسئله بتقدر تختار الدروس اللي تمتحن عليها وتختار عدد الاسئله وكمان الاسئله اللي بتحلها تقدر ترجعلها فى اى وقت او حتى تجيب الاسئله اللي غلطت فيها بكل سهوله"
    },
    {
        icon: <Image img={'/assets/plan.svg'} sx={{ maxWidth: '100px' }} />,
        title: "خطه مذاكره ومتابعه",
        body: "بنعملك جدول مذاكره ومتابعه كمان عشان تقدر تقوى نفسك فى الدروس الصعبه او تقدر تحقق اقصي استفاده وباقل مجهود"
    },
    {
        icon: <Image img={'/assets/time.svg'} sx={{ maxWidth: '100px' }} />,
        title: 'الوقت',
        body: "فيديوهات متنظمه ومركزه بنتكلم فيها على ادق النقاط فى الدروس من غير تضييع للوقت وكمان فيه كورسات لكل الدروس و ممكن تسجل فى محاضره من غير ما تشتري الكورس"
    }, {
        icon: <Image img={'/assets/exam.svg'} sx={{ maxWidth: '100px' }} />,
        title: 'امتحانات دوريه',
        body: 'امتحانات دوريه طبقا لاسئله النظام الجديد وبنوضحلك الاسئله بفيديو او حتى بشرح يفهمك الدنيا من غير متصعب وكمان بندربك على اسئله السنين السابقه'
    }, {
        icon: <Image img={'/assets/contact.svg'} sx={{ maxWidth: '100px' }} />,
        title: 'سهوله التواصل',
        body: "تقدر تتواصل مع المستر بكل سهوله لو فيه نقطه مش فاهمها"
    }, {
        icon: <Image img={'/assets/contact-24.svg'} sx={{ maxWidth: '100px', backgroundColor: 'primary.main' }} />,
        title: 'الدعم الفنى',
        body: 'دعم فنى 24 ساعه لو فيه مشكله قابلتك او حتى لو محتاج حاجه تقدر تتواصل مع الدعم ومتنساش تشاركنا اراءك واقتراحاتك من خلال المنصه , يلا سجل دلوقتى وابدا رحلتك!'
    },
]

function Services() {
    const theme = useTheme()
    return (
        <Section>
            <FlexRow sx={{ justifyContent: 'center', mb: '12px' }}>
                <Typography variant='h3' textAlign={'center'}>
                    مميزات المنصه مع مستر وليد !
                </Typography>
                <Image img={'/assets/paper-fly.png'} sx={{ maxWidth: '50px' }} />
            </FlexRow>

            {/* <FlexRow width={"100%"} justifyContent={'center'}>
                <Typography variant='banner' textAlign={'center'} ><span style={{ color: 'orange', }}>المنهج عندنا</span> و المذاكره عليك </Typography>
            </FlexRow> */}
            <FlexColumn>
                <Grid max={'4'}>
                    {features.map((f, i) => {
                        return <Paper key={i} elevation={3} sx={{ p: '16px', width: '100%', textAlign: 'center', bgcolor: theme.palette.primary.main + 20 }}>
                            <FlexColumn gap={'12px'} sx={{ width: '100%' }}>
                                {f.icon}
                                <Typography variant='h4' color={'primary.main'}>
                                    {f.title}
                                </Typography>
                                <Typography variant='body1'>
                                    {f.body}
                                </Typography>
                            </FlexColumn>
                        </Paper>
                    })}
                </Grid>
            </FlexColumn>

        </Section >
    )
}
//textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'red'
export default Services
