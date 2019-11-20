import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap' ;


   
    function RenderItem({item}){
        
            const comm = item.comments.map( (comment)=>{
                return( 
                   <p key={comment.id}>
                       <span> {comment.comment} </span> <br/>
                       <span> -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}  </span>
                   </p>
                );
            });
        
            return(
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                        <Card >
                            <CardImg src={item.image} alt={item.name}  />
                            <CardBody>
                                <CardTitle>{item.name}</CardTitle>
                                <CardText>{item.description}</CardText>
                            </CardBody>
                        </Card>
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <Card >
                                <CardBody>
                                    <CardTitle><h4>Comments</h4></CardTitle>
                                    <CardText> {comm}  </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    
            );
        
    }
    const ItemDetail = (props) => {
        if(props.item != null){
            return(
                
                <div className="container">
                <RenderItem item = {props.item} />
                        
                    </div>
                
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }


export default ItemDetail;