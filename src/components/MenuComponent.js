import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap' ;
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({item }){
    return(
        <Card  >
            <Link to={`/menu/${item.id}`}>
            <CardImg width="100%" src={baseUrl + item.image} alt={item.name}  />
            <CardImgOverlay>
                <CardTitle > {item.name} </CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );
}

    const Menu = (props) => {
        const menu = props.items.items.map((item)=>{
            return(
                <div  key={item.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem item={item}  />
                </div>
                
            );
        });
        if(props.items.isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.items.errmess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4> {props.errmess} </h4>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem active> Menu </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                            {menu}
                    </div>
                </div>
            );
        }
    }
    
export default Menu;