import { Box, IconButton, Typography, useTheme } from '@mui/material'

import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Section from '../../style/mui/styled/Section'
import { ScallyBtn } from '../../style/buttonsStyles'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PHONE } from '../../settings/constants/arlang'
import ReactionText from '../animations/ReactionTextAnimation'
import SumTextAnimation from '../animations/SumTextAnimation'
// import WAnimation from './WAnimation'
import PulseDot from '../animations/pulse/PulseDot'
// import InterActive from './about/InterActive'

// function LogosYoutubeIcon({ size, ...props }) {
//     return (<svg xmlns="http://www.w3.org/2000/svg" width={size || "1.43em"} height={size || '1rem'} viewBox="0 0 256 180" {...props}><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"></path><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"></path></svg>);
// }
const reactor = <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 72 72"><path fill="#fff" d="M22.87 30.126c-.01 0-.02-.02-.02-.02a4.4 4.4 0 0 1-.52-.36c-.01-.01-.02-.01-.03-.02a6.1 6.1 0 0 1-1.83-2.6a6 6 0 0 1 3.16-7.51a3.977 3.977 0 0 1 6.76-2.13a5 5 0 0 1 2.72-2.41a4.92 4.92 0 0 1 3.28-.02a4.975 4.975 0 0 1 7.3-5.21a7.9 7.9 0 0 1 2.83-1.77a7.9 7.9 0 0 1 2.67-.48a5.9 5.9 0 0 1 2.03-1.23a6.003 6.003 0 0 1 7.69 3.58c.06.17.11.34.16.52q.285.047.56.14a3.95 3.95 0 0 1 2.53 2.42a4 4 0 0 1-2.39 5.12a3.94 3.94 0 0 1-2.91-.08a7.98 7.98 0 0 1-9.79 5.21a4.96 4.96 0 0 1-8.71 2.36a4.94 4.94 0 0 1-6.82 1.99a5.9 5.9 0 0 1-2.06 2.41"></path><path fill="#fff" d="M22.87 30.126c-.01 0-.02-.02-.02-.02a4.4 4.4 0 0 1-.52-.36c-.01-.01-.02-.01-.03-.02a6.1 6.1 0 0 1-1.83-2.6a6 6 0 0 1 3.16-7.51a3.977 3.977 0 0 1 6.76-2.13a5 5 0 0 1 2.72-2.41a4.92 4.92 0 0 1 3.28-.02a4.975 4.975 0 0 1 7.3-5.21a7.9 7.9 0 0 1 2.83-1.77a7.9 7.9 0 0 1 2.67-.48a5.9 5.9 0 0 1 2.03-1.23a6.003 6.003 0 0 1 7.69 3.58c.06.17.11.34.16.52q.285.047.56.14a3.95 3.95 0 0 1 2.53 2.42a4 4 0 0 1-2.39 5.12a3.94 3.94 0 0 1-2.91-.08a7.98 7.98 0 0 1-9.79 5.21a4.96 4.96 0 0 1-8.71 2.36a4.94 4.94 0 0 1-6.82 1.99a5.9 5.9 0 0 1-2.06 2.41M51 27h6v39h-6z"></path><path fill="#9b9b9a" d="M47 47.262a7.95 7.95 0 0 0-8.187 2.667c-1.111-7.296-1.17-15.131.384-19.929H33v36h14z"></path><path fill="#d0cfce" d="M33 66V30H16c3 9.257 0 29.829-5 36z"></path><path fill="#3f3f3f" d="M47 47.262V66h6V55a7.996 7.996 0 0 0-6-7.738"></path><path fill="#ea5a47" d="M51 31h6v4h-6z"></path><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M22.87 30c-.01 0-.02-.02-.02-.02a4.4 4.4 0 0 1-.52-.36c-.01-.01-.02-.01-.03-.02a6.1 6.1 0 0 1-1.83-2.6a6 6 0 0 1 3.16-7.51a3.977 3.977 0 0 1 6.76-2.13a5 5 0 0 1 2.72-2.41a4.92 4.92 0 0 1 3.28-.02a4.975 4.975 0 0 1 7.3-5.21a7.9 7.9 0 0 1 2.83-1.77a7.9 7.9 0 0 1 2.67-.48a5.9 5.9 0 0 1 2.03-1.23a6.003 6.003 0 0 1 7.69 3.58c.06.17.11.34.16.52q.285.047.56.14a3.95 3.95 0 0 1 2.53 2.42a4 4 0 0 1-2.39 5.12a3.94 3.94 0 0 1-2.91-.08a7.98 7.98 0 0 1-9.79 5.21a4.96 4.96 0 0 1-8.71 2.36a4.94 4.94 0 0 1-6.82 1.99a5.9 5.9 0 0 1-2.06 2.41M44.197 66c-5-6.171-8-26.743-5-36H16c3 9.257 0 29.829-5 36zM53 66h4V27h-6v22.721"></path><path d="M44.197 66H53V55a8 8 0 0 0-14.187-5.07"></path></g></svg>

const texts = ['مكانك لتعلم وفهم الكيمياء بسهوله',
    'تقدر تذاكر اى درس معقد بشرح مبسط',
    'بنك اسئله تحل على اى درس فى اى وقت',
    'تقدر تحفظ الايجابات بتاعتك وترجعلها فى اي وقت عشان تعرف مستواك']


const DEFAULT_EQUATIONS = [
    ["شَرْح ", " + ", " حَلّ ", " → ", "تَفَوُّق"],
    ["المُثَابَرَة ", " + ", " الجِدّ ", " + ", "الاجْتِهَاد", " → ", "نَجَاح"],
];
function Hero2() {

    const theme = useTheme()
    const mainColor = theme.palette.primary.light
    return (
        <Section sx={{
            // backgroundSize: '16rem 16rem', backgroundRepeat: 'repeat',
            position: 'relative',
        }}>
            {/* <InterActive /> */}
            <Box sx={{
                width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
                backgroundImage: 'url("/assets/hero-texture.webp")',
                backgroundSize: 'contain', backgroundPosition: 'center center', opacity: .1
                , filter: theme.palette.mode === 'light'
                    ? 'invert(1)'
                    : 'none',
            }} />
            {/* <Box sx={{ position: 'absolute', bottom: '-0', left: 0, width: '100%' }}>
                <svg viewBox="0 0 900 220" preserveAspectRatio="none" style={{
                    display: 'block'
                }}>

                    <rect fill="url(#g)" />

                    <path d="M0,220 L0,140 Q450,-40 900,140 L900,220 Z" fill={theme.palette.background.default} />
                </svg>
            </Box> */}
            {/* <Box sx={{ bgcolor: 'background.default', clipPath: 'ellipse(60% 150% at bottom)', height: '10vh', width: '100%', position: 'absolute', bottom: 0, left: 0 }} /> */}
            <FlexRow sx={{ justifyContent: 'center', flexWrap: 'wrap-reverse' }}>
                <FlexColumn flexGrow={1} gap={'16px'} position={'relative'}>

                    <FlexColumn sx={{
                        justifyContent: 'center', alignItems: 'flex-start', gap: '16px', position: 'relative'
                    }}>
                        <Typography variant='banner' component={'h1'} textAlign={'center'} sx={{
                            fontSize: '4.4rem', fontFamily: 'main', fontWeight: '200'
                        }} >
                            {/* sx={{ scale: isMobileScreen ? '1.1' : '1' }} */}
                            <span style={{ color: 'transparent', WebkitTextStroke: `4px ${theme.palette.primary.dark}`, }}>م</span>/
                            <span style={{ color: theme.palette.primary.dark, fontFamily: 'main' }}>وليـد</span> <span>عبدالشـــــافي</span>
                        </Typography>
                        <Box sx={{
                            p: '12px 16px', borderRadius: '45px', border: '2px dotted',
                            bgcolor: theme.palette.primary.dark + 35, borderColor: theme.palette.primary.dark + 80
                        }}>
                            <Typography variant='subtitle1'>
                                خبير الكيمـــياء للصفوف الثانويه والازهر
                            </Typography>
                        </Box>
                        <Box sx={{ height: '6px', width: '50%', bgcolor: mainColor }} />
                        <FlexColumn sx={{
                            width: '100%',
                            fontFamily: 'main'
                        }}>

                            <SumTextAnimation fontSize='1.2rem'

                                equations={DEFAULT_EQUATIONS} color={theme.palette.grey[500]}
                                arrowColor={theme.palette.primary.light}
                                underlineColor={theme.palette.primary.light}
                            />
                        </FlexColumn>
                        {/* <Box sx={{
                            position: 'absolute', top: '12px', width: '50px', right: '130px'
                        }}>
                            <WAnimation sx={{ maxWidth: '120px' }} />
                        </Box> */}
                    </FlexColumn>

                    <FlexColumn sx={{ width: '100%' }}>
                        <ScallyBtn
                            colorm={theme.palette.primary.light}
                            endIcon={reactor}
                            component={Link} to={'/courses'}
                            sx={{ fontSize: '1.5rem', borderRadius: 1, width: '80%', maxWidth: '350px', fontFamily: 'main' }}>كورسات الكيميــــــاء
                        </ScallyBtn>

                        <FlexRow>
                            <IconButton component={Link} to={'https://www.facebook.com/profile.php?id=61573860324599'}>
                                <FaFacebook style={{
                                    color: theme.palette.neutral[0],
                                }} />
                            </IconButton>

                            <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=20" + PHONE}>
                                <FaWhatsapp style={{
                                    color: theme.palette.neutral[0],
                                }} />
                            </IconButton>

                            <IconButton component={Link} to={'https://youtube.com/@mr.walidelshafi?si=CBA3KcC9Z0sCYW-L'}>
                                <FaYoutube style={{
                                    color: theme.palette.neutral[0],
                                }} />
                            </IconButton>

                            <IconButton component={Link} to={"https://www.instagram.com/mr.walidelshafi"}>
                                <FaInstagram style={{
                                    color: theme.palette.neutral[0],
                                }} />
                            </IconButton>
                        </FlexRow>
                    </FlexColumn>

                </FlexColumn>

                <Box position={'relative'}>
                    <Box
                        component="img"
                        src={'/assets/hero-3.webp'}
                        alt="logo"
                        sx={{
                            width: "100%",
                            maxWidth: {
                                sm: 450,   // tablets
                                lg: 620,   // small laptops
                            },
                            display: "block",
                            mt: {
                                md: 0, lg: '-60px'
                            }
                        }}
                    />
                    <FlexColumn sx={{ position: 'absolute', bottom: '16px', right: '25%', }}>
                        {/* <SumTextAnimation fontSize='1.2rem' color={theme.palette.grey[500]} /> */}
                        <FlexRow flexDirection={'row'} gap={'16px'} sx={{
                            backgroundColor: theme.palette.primary.light + 40,
                            p: '12px', borderRadius: '16px',
                            backdropFilter: 'blur(32px) saturate(148%)',
                            // background: 'rgba(255, 255, 255, 0.07)',
                            border: '1px solid ',
                            borderColor: theme.palette.primary.light, flexWrap: 'nowrap'
                        }}>
                            <PulseDot color={theme.palette.primary.light} size={10} />
                            <ReactionText texts={texts} fontSize='.8rem' />
                        </FlexRow>
                    </FlexColumn>
                </Box>
            </FlexRow>
        </Section >
    )
}

export default Hero2
