import React from 'react';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card/index';
import CardActionArea from '@material-ui/core/CardActionArea/index';
import CardActions from '@material-ui/core/CardActions/index';
import CardContent from '@material-ui/core/CardContent/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import Divider from '@material-ui/core/Divider/index';
import Chart from "../Chart/Chart";


function ImgMediaCard(props) {
    const {name, id, data} = props.module;
    return (
        <Card style={{'height': '100%'}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <br/>
                        <Chart data={data}/>
                        <br/>
                        <Divider/>
                        <br/>
                    </CardContent>
                </CardActionArea>
            <CardActions>
                <Link style={{"textDecoration": 'none'}} to={`/modules/${id}`}>
                    <Button className={'link'} size="small" color="primary">
                        Meer
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default ImgMediaCard;