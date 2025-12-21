import { IconButton, Typography } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import Image from '../ui/Image'
import Separator from '../ui/Separator'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { lang } from '../../settings/constants/arlang'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function FooterPage() {

    const user = useSelector(s => s.global.user)

    const whatsText = user?.role ? `اسم المستخدم: ${user.userName}%0A%0Aالاسم: ${user.name}` : ''

    return (
        <Section sx={{ minHeight: '60vh', }}>
            <Separator sx={{ borderColor: 'grey.100', borderWidth: '1px' }} />

            <FlexColumn gap={'8px'}>
                <Image img={'/assets/w-logo.png'} maxWidth='180px' ratio={'auto'} />
                <Typography variant='h5' sx={{ fontFamily: '"Changa", sans-serif' }}>
                    {lang.LOGO}
                    {/* Menassty */}
                </Typography>
                <Typography noWrap component={Link} to={'/privacy'} sx={{ cursor: 'pointer', color: 'neutral.200', textDecoration: 'underline' }}>سياسات المنصه !</Typography>
                <Separator sx={{ width: '80vw' }} />

                <FlexRow justifyContent={'center'} >
                    <IconButton component={Link} to={'https://www.facebook.com/profile.php?id=61573860324599'} >
                        <Image img={'/assets/facebook.webp'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={'https://youtube.com/@mr.walidelshafi?si=CBA3KcC9Z0sCYW-L'} >
                        {/*  */}
                        <Image img={'/assets/youtube.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=2001011301848&text=" + whatsText}>
                        {/*   */}
                        <Image img={'/assets/whatsapp.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={"https://www.instagram.com/mr.walidelshafi"}>
                        {/*   */}
                        <Image img={'/assets/Instagram.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={"mailto:naglaawalid101@gmail.com"}>
                        {/*   */}
                        <Image img={'https://www.svgrepo.com/show/477054/email-download.svg'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                </FlexRow>

                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    منصه تعتمد على توفير الاسئله و شروحات عاليه للطلاب الثانويه العامه
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                   العنوان: المنصوره الدقهليه
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                   للتواصل: 01011301848
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                   ايميل: naglaawalid101@gmail.com
                </Typography>
                <Separator sx={{ borderColor: 'grey.100', borderWidth: '1px', width: '40vw' }} />

                <FlexRow sx={{ gap: '8px' }}>
                    <Typography sx={{ color: "primary.600" }}>
                        &lt;/ ME&gt;
                    </Typography>
                    <Typography>
                        All Rights Reserved {new Date().getFullYear()}
                    </Typography>
                    <Typography sx={{ color: "primary.600" }}>
                        &lt;ME&gt;
                    </Typography>
                </FlexRow>
                <Typography component={Link} to={"https://api.whatsapp.com/send?phone=2001001902943&text=" + 'from Walid elshafy Platform'} variant='body1' sx={{ color: "neutral.0", textDecoration: 'none' }} noWrap>
                    تم التطوير بواسطه <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Menassty for Education Services </span>
                </Typography>
                {/* <img src='/assets/megroup-footer.webp' style={{ borderRadius: 0, my: '12px', maxWidth: '120px' }} /> */}
                <Image borderRadius={0} sx={{ my: '12px' }} img={'/assets/Menassty-nobg.png'} maxWidth="90px" ratio={'auto'} />
            </FlexColumn>
        </Section>
    )
}

export default FooterPage
