import { Box, Typography, useTheme } from '@mui/material'
import { FlexRow } from '../../style/mui/styled/Flexbox'

function TextBorderAround({ children }) {

    const theme = useTheme()

    return (
        <Typography
            variant="h5"
            color="primary.main"
            my="10px"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&:before, &:after": {
                    content: '""',
                    position: "absolute",
                    width: "50%",
                    height: "100%",
                    borderColor: "primary.main",
                    transition: "all 0.6s ease-in-out",
                },
                "&:before": {
                    top: "-10px", // start farther away
                    left: "-10px",
                    borderTop: "4px solid",
                    borderLeft: "4px solid",
                },
                "&:after": {
                    bottom: "-10px",
                    right: "-10px",
                    borderTop: "4px solid",
                    borderLeft: "4px solid",
                    transform: "rotate(180deg)",
                },
                "&:hover:before": {
                    top: "-20px", // animate closer
                    left: "-20px",
                },
                "&:hover:after": {
                    bottom: "-20px",
                    right: "-20px",
                },
            }}
        >
            {children}
        </Typography>

    )
}


export const TextBorderWithIcons = ({ title = '', startIcon, endIcon, color, colorOne, sx = {} }) => {
    const textInArr = title.split(" ")
    return (
        <FlexRow sx={{ justifyContent: 'center', my: '2.5rem', ...sx }}>

            <TextBorderAround>
                <FlexRow sx={{ gap: '12px' }}>

                    {/* <ReactLoginIcon style={{ margin: '0 10px' }} size={'2rem'} /> */}
                    {startIcon}
                    <Box>
                        {textInArr?.map((text, i) => (
                            <Box component='span' key={i} sx={{ color: i === 0 && colorOne || color, }}> {text} </Box>
                        ))}
                    </Box>

                    {endIcon}
                    {/* <LoginAnimatedIcon size='2rem' /> */}
                </FlexRow>
            </TextBorderAround>

        </FlexRow>
    )
}

export default TextBorderAround
