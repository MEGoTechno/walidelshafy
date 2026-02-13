import { IconButton, Typography } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import Image from '../ui/Image'
import Separator from '../ui/Separator'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { lang, PHONE } from '../../settings/constants/arlang'
import { Link } from 'react-router-dom'

function FooterPage() {

    return (
        <Section sx={{ minHeight: '60vh', }}>
            <Separator sx={{ borderColor: 'grey.100', borderWidth: '1px' }} />

            <FlexColumn gap={'8px'}>
                <Image img={'/assets/w-logo.png'} maxWidth='180px' ratio={'auto'} />
                <Typography variant='h5' sx={{ fontFamily: '"Changa", sans-serif' }}>
                    {lang.LOGO}
                </Typography>
                <Typography noWrap component={Link} to={'/privacy'} sx={{ cursor: 'pointer', color: 'neutral.200', textDecoration: 'underline' }}>سياسات المنصه !</Typography>
                <Separator sx={{ width: '80vw' }} />

                <FlexRow justifyContent={'center'} >
                    {lang.Socials.map((social, i) => {
                        return <IconButton key={i} component={Link} to={social.to} >
                        <Image img={social.image} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    })}
                    
                </FlexRow>

                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    منصه تعتمد على توفير الاسئله و شروحات عاليه للطلاب الثانويه العامه
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    العنوان: المنصوره الدقهليه
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    للتواصل: {PHONE}
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    ايميل: {lang.Mail}
                </Typography>
                <Separator sx={{ borderColor: 'grey.100', borderWidth: '1px', width: '40vw' }} />

                {/* Menassty */}
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
                <Typography component={Link} to={lang.WhatsAppContact} variant='body1' sx={{ color: "neutral.0", textDecoration: 'none' }} noWrap>
                    تم التطوير بواسطه <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Menassty for Education Services </span>
                </Typography>
                {/* <img src='/assets/megroup-footer.webp' style={{ borderRadius: 0, my: '12px', maxWidth: '120px' }} /> */}
                <Image borderRadius={0} sx={{ my: '12px' }} img={'/assets/Menassty-nobg.png'} maxWidth="90px" ratio={'auto'} />
            </FlexColumn>
        </Section>
    )
}

export default FooterPage
