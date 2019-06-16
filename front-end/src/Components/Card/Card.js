import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card/index';
import CardActionArea from '@material-ui/core/CardActionArea/index';
import CardActions from '@material-ui/core/CardActions/index';
import CardContent from '@material-ui/core/CardContent/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import Divider from '@material-ui/core/Divider/index';
import MainChart from "../Chart/MainChart";


class ImgMediaCard extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        const max = this.props.module.tijd.length;
        console.log(max);
        let dataArray = [];
        for(let i = 0; i < max; i++){
            const obj ={
                name: this.props.module.tijd[i],
                temp: this.props.module.gemtemp[i],
                licht: this.props.module.gemlicht[i],
                sensor_3: this.props.module.gemsensor[i],
            };
            dataArray.push(obj);
        }
        console.log(dataArray);
        this.setState({data: dataArray});

    }


    render(){
        const {moduleId} = this.props.module;
        return (
            <Card style={{'height': '100%'}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {moduleId}
                        </Typography>
                        <br/>
                        <MainChart data={this.state.data}/>
                        <br/>
                        <Divider/>
                        <br/>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link style={{"textDecoration": 'none'}} to={`/modules/${moduleId}`}>
                        <Button className={'link'} size="small" color="primary">
                            Meer
                        </Button>
                    </Link>
                </CardActions>
            </Card>
    );
    }
}

export default ImgMediaCard;