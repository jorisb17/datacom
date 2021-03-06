import React, {Component} from 'react';

import Card from '@material-ui/core/Card/index';
import CardActionArea from '@material-ui/core/CardActionArea/index';
import CardContent from '@material-ui/core/CardContent/index';
import Typography from '@material-ui/core/Typography/index';
import DetailChart from "../Chart/DetailChart";


class ImgMediaCard extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        const max = this.props.tijd.length;
        console.log(max);
        let dataArray = [];
        for(let i = 0; i < max; i++){
            const obj ={
                name: this.props.tijd[i],
                min: this.props.min[i],
                gem: this.props.gem[i],
                max: this.props.max[i],
            };
            dataArray.push(obj);
        }
        console.log(dataArray);
        this.setState({data: dataArray});

    }


    render(){
        const {name} = this.props;
        return (
            <Card style={{'height': '100%'}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <br/>
                        <DetailChart data={this.state.data}/>
                        <br/>
                        <br/>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default ImgMediaCard;