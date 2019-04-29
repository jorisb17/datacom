import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme(
    {
    palette:{
        common:{
            black: "#000",
            white:"#fff"
        },
        background:{
            paper:"#fff",
            default:"#fafafa"
        },
        primary:{
            light:"#7986cb",
            main: "rgba(63, 81, 181, 1)",
            dark: "rgba(48, 63, 159, 1)",
            contrastText:"#fff"
        },
        secondary:{
            light:"#ff4081",
            main:"rgba(245, 0, 87, 1)",
            dark:"#c51162","contrastText":"#fff"
        },
        error:{
            light:"#e57373",
            main:"rgba(244, 67, 54, 1)",
            dark:"#d32f2f","contrastText":"#fff"
        },
        text:{
            primary:"rgba(0, 0, 0, 0.87)",
            secondary:"rgba(0, 0, 0, 0.54)",
            disabled:"rgba(0, 0, 0, 0.38)",
            hint:"rgba(0, 0, 0, 0.38)"
        }
    },
        typography: {
            useNextVariants: true,
        },
});