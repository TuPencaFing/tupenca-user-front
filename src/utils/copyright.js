import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                Tu Penca
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};
