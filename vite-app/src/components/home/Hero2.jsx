import { Box, IconButton, Typography, useTheme } from '@mui/material'

import Image from '../ui/Image'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Section from '../../style/mui/styled/Section'
import Separator from '../ui/Separator'
import { ScallyBtn } from '../../style/buttonsStyles'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PHONE } from '../../settings/constants/arlang'

// function LogosYoutubeIcon({ size, ...props }) {
//     return (<svg xmlns="http://www.w3.org/2000/svg" width={size || "1.43em"} height={size || '1rem'} viewBox="0 0 256 180" {...props}><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"></path><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"></path></svg>);
// }

function AboutUS() {

    const theme = useTheme()
    return (
        <Section>
            <FlexRow sx={{ justifyContent: 'center', flexWrap: 'wrap-reverse', gap: '16px' }}>
                <FlexColumn >
                    <FlexColumn sx={{
                        justifyContent: 'center'
                    }}>
                        {/* <WAnimation sx={{ maxWidth: '120px' }} /> */}
                        <Typography variant='banner' component={'h1'} textAlign={'center'}   >
                            {/* sx={{ scale: isMobileScreen ? '1.1' : '1' }} */}
                            <span style={{ color: 'transparent', WebkitTextStroke: "4px #01b0fb", }}>م</span>/
                            <span style={{ color: '#01b0fb' }}>وليد</span> عبدالشافى
                        </Typography>
                        <Typography variant='h6' >
                            انت عارف ان هي كيميا عشان كدا مستر وليد عملك  منصه !
                        </Typography>
                    </FlexColumn>

                    <FlexColumn sx={{ minWidth: '250px', width: '100%', maxWidth: '500px' }}>
                        {/* <Separator sx={{ maxWidth: '300px' }} /> */}
                        <ScallyBtn endIcon={<img style={{ width: '30px' }} alt='' src='/assets/Flask.svg' />} component={Link} to={'/grades/2'}
                            sx={{ minWidth: '250px', fontSize: '1.5rem', borderRadius: 1 }}>كورسات الكيمياء
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
                <img src='./assets/hero.webp' style={{ maxWidth: '550px', marginLeft: '-100px' }} />
            </FlexRow>
        </Section>
        // <Box sx={{
        //     // minHeight: '100vh',
        //     background: `linear-gradient(to left, ${theme.palette.primary.dark} 80%, ${theme.palette.primary.light} )`,
        //     display: 'flex',
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     p: '26px 12px',
        //     width: '100%',
        //     position: 'relative',
        //     minHeight: '86vh',
        //     borderTopRightRadius: '70%'
        // }}>
        //     <Box sx={{
        //         // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        //         position: 'absolute', top: 0, left: '0',
        //         width: '100%', height: '100%', zIndex: 1
        //     }} />

        //     <FlexColumn sx={{ zIndex: 2, width: '100%' }}>

        //         <Box sx={{
        //             width: '100%', maxWidth: '100vh', bgcolor: '#ddd', borderRadius: '16px', boxShadow: theme.shadows[20], mt: '16px'
        //         }}>
        //             {/* <LogosYoutubeIcon size={'3rem'} />  aspectRatio: '2/1',*/}
        //         </Box>
        //     </FlexColumn>

        // </Box>
    )
}

export default AboutUS
