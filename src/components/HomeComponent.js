import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({f_item, isLoading, errmsg}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errmsg){
        return(
        <h4> { errmsg } </h4>
        )
    }
    else{
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={ baseUrl + f_item.image} />
                <CardBody>
                    <CardTitle>{f_item.name}</CardTitle>
                    {f_item.designation ? <CardSubtitle>{f_item.designation}</CardSubtitle> : null }
                    <CardText>{f_item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }
}

function Home(props){
    return(
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.item} isLoading = {props.itemsLoading} errmsg= {props.itemsErrMsg} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard f_item = {props.leader} isLoading={props.leaderLoading} errMess={props.leaderErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;