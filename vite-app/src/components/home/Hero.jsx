import './home.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
// import Image from '../ui/Image'
import { ScallyBtn } from '../../style/buttonsStyles'

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Ballons from '../animations/ballons/ballons/Ballons'
import { useState } from 'react'
import WAnimation from './WAnimation'

function Hero() {
    const theme = useTheme()
    // const isMobileScreen = useMediaQuery('(max-width:600px)');

    const [isSee, setSee] = useState(false)
    return (
        <Section>

            {isSee && (
                <>
                    <Ballons />
                    <Box sx={{ position: 'absolute', top: 0, left: 0, bgcolor: "#00000090", width: '100%', height: '100%' }} />
                    <Typography sx={{
                        p: '12px 16px', bgcolor: 'white', outline: '5px dashed red',
                        position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)',
                        textAlign: 'center', fontSize: '40px', color: 'grey.900'
                    }}>

                        <span style={{ fontSize: '60px' }}>أهلاً ❤️</span>
                        <br />
                        بدفعه
                        <span style={{ color: 'orangered' }}>2025</span> / <span style={{ color: 'red' }}>2026</span>
                    </Typography>
                </>
            )}
            <FlexRow justifyContent={'space-evenly'} >

                {/* content */}
                <FlexColumn
                    flex={1}
                    minHeight={"85vh"}
                    maxWidth={"500px"}
                    alignItems={'flex-start'}
                    sx={{
                        animation: 'getIntoRt 1s ease',
                    }} >
                    <Box sx={{ position: 'relative' }} >

                        <Typography variant='banner' component={'h1'} textAlign={'center'}   >
                            {/* sx={{ scale: isMobileScreen ? '1.1' : '1' }} */}
                            <span style={{ color: 'transparent', WebkitTextStroke: "4px #01b0fb", }}>م</span>/
                            
                            <span style={{ color: '#01b0fb' }}>وليد</span> عبدالشافى
                        </Typography>

                    </Box>
                    <Typography variant='h5'>منصتك للتفوق فى الكيمياء</Typography>

                    <Separator sx={{ maxWidth: '300px' }} />

                    <ScallyBtn endIcon={<img style={{ width: '30px' }} alt='' src='/assets/Flask.svg' />} component={Link} to={'/grades/2'} sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>كورسات الكيمياء</ScallyBtn>

                    <Box display={'flex'} justifyContent={'space-around'} flexDirection={'row'} sx={{ minWidth: '250px' }}>
                        <IconButton component={Link} to={'https://www.facebook.com/profile.php?id=61573860324599'}>
                            <FaFacebook style={{
                                color: theme.palette.neutral[0],
                            }} />
                        </IconButton>

                        <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=2001011301848"}>
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
                    </Box>

                </FlexColumn>

                {/* banner */}
                <FlexRow sx={{ width: '100%', maxWidth: '500px' }}>
                    <WAnimation />
                </FlexRow>
            </FlexRow>


        </Section>
    )
}

export default Hero
