import { Typography, useTheme } from '@mui/material'
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


export const TextBorderWithIcons = ({ title = '', startIcon, endIcon, color, colorOne }) => {
    const textInArr = title.split(" ")
    return (
        <FlexRow sx={{ justifyContent: 'center', my: '2.5rem' }}>

            <TextBorderAround>

                {/* <ReactLoginIcon style={{ margin: '0 10px' }} size={'2rem'} /> */}
                {startIcon}

                {textInArr?.map((text, i) => (
                    <span key={i} style={{ color: i === 0 && colorOne || color, marginRight: '10px', marginLeft: i === textInArr.length - 1 && '10px' }}> {text} </span>
                ))}

                {endIcon}
                {/* <LoginAnimatedIcon size='2rem' /> */}
            </TextBorderAround>

        </FlexRow>
    )
}

export default TextBorderAround
