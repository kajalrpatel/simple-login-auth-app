import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap';

function RenderCard({f_item}){
    return(
        <Card>
            <CardImg src={f_item.image} />
            <CardBody>
                <CardTitle>{f_item.name}</CardTitle>
                {f_item.designation ? <CardSubtitle>{f_item.designation}</CardSubtitle> : null }
                <CardText>{f_item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props){
    return(
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.item} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.promotion} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;