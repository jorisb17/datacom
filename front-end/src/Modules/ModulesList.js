import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "../Components/Card/Card";


const ModulesList = ({modules}) =>{
    return(
        <Grid container spacing={16}>
            {modules.map(module => {
                return (
                    <Grid key={module.id} item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            module={module}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default ModulesList;