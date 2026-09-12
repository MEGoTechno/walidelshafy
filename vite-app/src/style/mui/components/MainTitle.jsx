import { Box, Typography, useTheme } from "@mui/material"
import { FlexColumn, FlexRow } from "../styled/Flexbox"

function MainTitle({ title, subTitle, variant = 'header', sx = {}, endIcon, isLg = true }) {
    const theme = useTheme()
    const mainColor = theme.palette.primary.dark + 35

    const defaultSx = isLg ? { fontSize: '2.8rem', fontWeight: 800, fontFamily: 'main' } : {}
    return (
        <FlexColumn gap={'16px'} sx={{ justifyContent: 'flex-start', }}>

            <Box sx={{
                p: '12px 16px', borderRadius: '45px', border: '2px dotted',
                bgcolor: mainColor, borderColor: theme.palette.primary.dark + 80, ...defaultSx, ...sx
            }}>
                <FlexRow gap={'12px'} sx={{ justifyContent: 'center' }}>
                    <Typography variant={variant} fontSize={'inherit'} fontWeight={'inherit'} fontFamily={'inherit'}>
                        {title}
                    </Typography>

                    {endIcon}
                </FlexRow>
            </Box>


            {subTitle && (
                <FlexColumn gap={'12px'} width={'100%'}>
                    <Typography variant="subtitle2"> {subTitle}</Typography>
                    <Box sx={{ height: '6px', width: '50%', bgcolor: mainColor }} />
                </FlexColumn>
            )}
        </FlexColumn>
    )
}

export default MainTitle