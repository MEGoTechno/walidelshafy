import { Box, Typography, useTheme } from "@mui/material"
import MainTitle from "../../style/mui/components/MainTitle"
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import Section from "../../style/mui/styled/Section"
import TimelineAnimation from "../animations/TimelineAnimation"
import TabInfo from "../ui/TabInfo"
import InfoText from "../ui/InfoText"
import BeFirst from "./BeFirst"

const PreText = () => {
    return <Box
        sx={{
            position: 'relative', height: '10px', width: '10px', bgcolor: 'primary.light',
            clipPath: ' polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', mt: '6px', flexShrink: 0
        }}
    />
}

const CardIcon = ({ url }) => <Box
    component="img"
    src={url}
    sx={{
        position: 'absolute',
        top: '-25%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: 'auto',
        objectFit: 'contain',
    }}
/>

function Services2() {
    const theme = useTheme()

    return (
        <Box sx={{ bgcolor: '#2390d810', borderRadius: { sm: '0', md: '25% 16px 0 0' }, overflow: 'hidden', position: 'relative' }}>
            <Box sx={{
                width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
                backgroundImage: 'url("/assets/hero-texture.webp")',
                backgroundSize: 'contain', backgroundPosition: 'center center', opacity: .1,
                filter: theme.palette.mode === 'light'
                    ? 'invert(1)'
                    : 'none',

            }} />
            <Section sx={{}}>
                <FlexRow sx={{
                    justifyContent: 'center',

                    // background: 'linear-gradient(135deg, #2390d810 100%), url("/assets/45-degree-fabric-dark.png") center center / cover no-repeat',
                    // backgroundSize: '16rem 16rem',backgroundRepeat: 'repeat'
                    // background: 'linear-gradient(135deg, #01b0fb10 50%, #5f27cd10 100%)',

                }} gap={'12px'}>
                    <MainTitle
                        title={<span>
                            طريقك للتفوق مع <Box component={'span'} sx={{ color: 'primary.main' }}>مستر وليــــــد</Box>  !
                        </span>}
                    />
                    <Box width={'100%'} position={'relative'}>

                        <TimelineAnimation items={[{
                            left: <FlexColumn sx={{ width: '100%', p: '12px', bgcolor: theme.palette.primary.dark + 20, color: 'primary.light', borderRadius: '16px' }} gap={'16px'}>
                                <Typography variant="h4" textAlign={'center'} fontFamily={'main'} sx={{}}>01 - فتره الشرح</Typography>
                                <TabInfo count={'من شهر 8 - 3 / 2027'} i={0} />

                            </FlexColumn>,
                            right: <Box
                                sx={{
                                    bgcolor: theme.palette.primary.dark + '20',
                                    width: '100%',
                                    mt: '20px',
                                    p: '16px',
                                    borderRadius: '22px',
                                    overflow: 'visible',
                                    border: '1px solid', borderColor: 'primary.light'
                                }}
                            >
                                <FlexColumn sx={{ alignItems: 'flex-start', position: 'relative', pt: '20px', }}>
                                    <CardIcon url={"/assets/test-tubes-science.svg"} />

                                    {/* <TabInfo count={'من شهر 8 - 3'} i={2} /> */}
                                    <Box mt={'16px'} />
                                    <InfoText label={'تفاصيل الحصه'} />
                                    <FlexRow gap={'12px'} sx={{ alignItems: 'flex-start' }}>
                                        <PreText />
                                        <Typography flex={1}>المستر بيشرح الجزئيه كامله + تطبيق عملى علي الشرح</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}>شيت علي الحصه السابقه + حل الواجب</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}> الاونلاين نفس السنتر مش هتحس بفرق</Typography>
                                    </FlexRow>
                                    <TabInfo count={'متضغطش علي نفسك اوي في الفتره دي, بس أوعا تراكم !'} i={3} />
                                </FlexColumn>
                            </Box>
                        }, {
                            first: 'right',
                            right: <FlexColumn sx={{ width: '100%', p: '12px', bgcolor: theme.palette.primary.dark + 20, color: 'primary.light', borderRadius: '16px' }} gap={'16px'}>
                                <Typography variant="h4" textAlign={'center'} fontFamily={'main'}>02 - فتره المراجعه</Typography>
                                <TabInfo count={'من شهر 3 - 6 / 2027'} i={0} />
                            </FlexColumn>,
                            left: <Box
                                sx={{
                                    bgcolor: theme.palette.primary.dark + '20',
                                    width: '100%',
                                    mt: '20px',
                                    p: '16px',
                                    borderRadius: '22px',
                                    overflow: 'visible',
                                    border: '1px solid', borderColor: 'primary.light'
                                }}
                            >
                                <FlexColumn sx={{ alignItems: 'flex-start', position: 'relative', pt: '20px', gap: '4px' }}>
                                    <CardIcon url={"/assets/flask-chemistry.svg"} />

                                    <Box mt={'16px'} />
                                    <InfoText label={'تفاصيل المراجعه مع مستر وليد'} />
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}>مراجعه شامله على المنهج + التركيز على التركات</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}> حل اكثر من 1500 سؤال + اسئله السنين السابقه</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}> حل الامتحانات الاسترشاديه + بنك الاسئله على المنصه</Typography>
                                    </FlexRow>
                                    <TabInfo count={'اهم فتره في السنه الدراسيه, ولازم تستغلها صح'} i={2} />
                                </FlexColumn>
                            </Box>
                        }, {
                            left: <FlexColumn sx={{ width: '100%', p: '12px', bgcolor: theme.palette.primary.dark + 20, color: 'primary.light', borderRadius: '16px' }}>
                                <Typography variant="h4" textAlign={'center'} fontFamily={'main'} >03 - المتابعه علي المنصه</Typography>
                            </FlexColumn>,
                            right: <Box
                                sx={{
                                    bgcolor: theme.palette.primary.dark + '20',
                                    width: '100%',
                                    mt: '20px',
                                    p: '16px',
                                    borderRadius: '22px',
                                    overflow: 'visible',
                                    border: '1px solid', borderColor: 'primary.light'

                                }}
                            >
                                <FlexColumn sx={{ alignItems: 'flex-start', position: 'relative', pt: '20px', gap: '4px' }}>
                                    <CardIcon url={"/assets/flasks-chemistry.svg"} />

                                    <Box mt={'30px'} />
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}>بيكون فيه شيتات وامتحانات دوريه بعد كل باب</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}>لازم تجيب درجات حلوه علشان منبعتش لولي الامر!</Typography>
                                    </FlexRow>
                                    <FlexRow gap={'12px'}>
                                        <PreText />
                                        <Typography flex={1}>بنك الاسئله علي المنصه تقدر تختار دروس وتحل عليها</Typography>
                                    </FlexRow>
                                </FlexColumn>
                            </Box>
                        }]}>
                        </TimelineAnimation>
                        <MainTitle variant="h6" title={'والنتيجه ؟'} sx={{ mt: { xs: '16px', md: '0' } }} />
                    </Box>
                </FlexRow>
            </Section >
            <BeFirst />
        </Box>

    )
}

export default Services2