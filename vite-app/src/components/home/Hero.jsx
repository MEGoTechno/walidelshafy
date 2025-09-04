import './home.css'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'

import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
// import Image from '../ui/Image'
import { ScallyBtn } from '../../style/buttonsStyles'

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom'
import WAnimation from './WAnimation'

function Hero() {
    const theme = useTheme()
    const isMobileScreen = useMediaQuery('(max-width:700px)');

    const content = isMobileScreen ? {
        backgroundImage: "url('./assets/wrt.png')",
        backgroundSize: "cover",    // cover entire container
        backgroundRepeat: "no-repeat",
        backgroundPosition: isMobileScreen && 'right 0% top 0', // keep left side fixed
        overflow: 'clip',
    } : {}

    return (
        <Box sx={{ position: 'relative' }}>

            <FlexColumn
                sx={{
                    animation: 'getIntoRt 1s ease', width: '100%', minHeight: '85vh', position: 'relative',
                    color: '#fff',
                    justifyContent: 'center',
                    alignItems: isMobileScreen ? 'center' : 'flex-start',
                    p: '36px 32px', ...content
                }} >
                {isMobileScreen && (
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: `linear-gradient(to top,
                            ${theme.palette.background.dark || theme.palette.background.default},
                            rgba(0,0,0,0) 70%) ` //rgb(0,0,0)
                    }} />
                )}

                <FlexRow sx={{
                    justifyContent: 'center'
                }}>
                    <WAnimation sx={{ maxWidth: '120px' }} />
                    <Typography variant='banner' component={'h1'} textAlign={'center'}   >
                        {/* sx={{ scale: isMobileScreen ? '1.1' : '1' }} */}
                        <span style={{ color: 'transparent', WebkitTextStroke: "4px #01b0fb", }}>م</span>/
                        <span style={{ color: '#01b0fb' }}>وليد</span> عبدالشافى
                    </Typography>
                </FlexRow>

                {/* <Typography variant='subBanner' >منصتك للتفوق فى الكيمياء</Typography> */}
                <FlexColumn my={'12px'} sx={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Typography variant='h6' >
                        انت عارف ان هي كيميا عشان كدا مستر وليد عملك  منصه !
                    </Typography>

                    <ul style={{ marginRight: '20px' }}>
                        <li>
                            <Typography variant='caption'>
                                تقدر تذاكر اى درس معقد بشرح مبسط
                            </Typography>
                        </li>
                        <li>
                            <Typography variant='caption'>
                                بنك اسئله تحل على اى درس فى اى وقت
                            </Typography>
                        </li>
                        <li>
                            <Typography variant='caption'>
                                تقدر تحفظ الايجابات بتاعتك وترجعلها فى اي وقت عشان تعرف مستواك
                            </Typography>
                        </li>
                    </ul>
                </FlexColumn>

                <FlexColumn sx={{ minWidth: '250px', width: '100%', maxWidth: '500px' }}>
                    <Separator sx={{ maxWidth: '300px' }} />
                    <ScallyBtn endIcon={<img style={{ width: '30px' }} alt='' src='/assets/Flask.svg' />} component={Link} to={'/grades/2'}
                        sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>كورسات الكيمياء</ScallyBtn>
                    <FlexRow>
                        <IconButton component={Link} to={'https://www.facebook.com/profile.php?id=61573860324599'}>
                            <FaFacebook style={{
                                color: theme.palette.grey[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=2001011301848"}>
                            <FaWhatsapp style={{
                                color: theme.palette.grey[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={'https://youtube.com/@mr.walidelshafi?si=CBA3KcC9Z0sCYW-L'}>
                            <FaYoutube style={{
                                color: theme.palette.grey[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={"https://www.instagram.com/mr.walidelshafi"}>
                            <FaInstagram style={{
                                color: theme.palette.grey[0],
                            }} />
                        </IconButton>
                    </FlexRow>

                </FlexColumn>

            </FlexColumn>



            <Box sx={{
                position: isMobileScreen ? 'relative' : 'absolute',
                top: 0, left: 0, zIndex: -1
            }}>
                <Box position={'relative'} sx={{
                    width: '100vw',
                    maxHeight: '90vh',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: `linear-gradient(to ${isMobileScreen ? 'bottom' : 'right'},
                        ${theme.palette.background.dark || theme.palette.background.default},
                        rgba(0,0,0,0) 70%) ` //rgb(0,0,0)
                    }} />
                    <div
                        style={{
                            width: "100%",              // full width, responsive
                            minHeight: isMobileScreen ? '40vh' : '90vh',           // or use a % if you want
                            backgroundImage: "url('./assets/wjpg.jpg')",
                            backgroundSize: "cover",    // cover entire container
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: isMobileScreen && 'left 20% top 0', // keep left side fixed
                            overflow: 'clip',
                        }}
                    ></div>
                    {/* <img src='./assets/wjpg.jpg' style={{
                        // maxWidth: '800px',
                        minHeight: '100%',
                        // borderTopRightRadius: '25%',
                        // borderBottomRightRadius: '25%',
                        minWidth: '400px',
                        objectFit: "cover",        // or 'none' if you want original size
                        objectPosition: "right", // focuses on left side
                    }} /> */}
                    {/* <WAnimation sx={{ position: 'absolute', top: '20%' }} /> */}
                </Box>
            </Box>
        </Box >
    )
}

export default Hero
