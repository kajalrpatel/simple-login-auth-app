import React,{Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalBody,ModalHeader, Label } from 'reactstrap' ;
import { Link } from 'react-router-dom';
import { Control, Errors,LocalForm} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderItem({item, comments, postComment}){
        
            const comm = comments.map( (comment)=>{
               // console.log(comment);
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
                            <FadeTransform
                                in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}>
                                <Card >
                                    <CardImg src={ baseUrl + item.image} alt={item.name}  />
                                    <CardBody>
                                        <CardTitle>{item.name}</CardTitle>
                                        <CardText>{item.description}</CardText>
                                    </CardBody>
                                </Card>
                            </FadeTransform>
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <Card >
                                <CardBody>
                                    <CardTitle><h4>Comments</h4></CardTitle>
                                    <CardText>  {comm}    <br/> 
                                        <SubmitComment postComment={postComment} itemId = {item.id} />
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    
            );
        
    }
    const ItemDetail = (props) => {
        if(props.itemLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.itemErrMsg){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4> {props.itemErrMsg} </h4>
                    </div>
                </div>
            )
        }
        else if(props.item != null){
            return(
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                            <BreadcrumbItem active>{props.item.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.item.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className='row'>
                        <RenderItem item = {props.item} comments ={props.comments} postComment = {props.postComment} />
                    </div>   
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

class SubmitComment extends Component{
    constructor(props){
        super(props);
        this.state ={
            isCommentOpen :false
        }
        this.toggleComment = this.toggleComment.bind(this);
    }

    toggleComment(){
        this.setState({
            isCommentOpen : !this.state.isCommentOpen
        });
    }
    handleSubmitComment(values){
        this.toggleComment();
        this.props.postComment(this.props.itemId,values.rating,values.comment,values.name);
    }
    render(){
        return(
            <div>
                 <Button outline onClick={this.toggleComment}>
                       <span className='fa fa-pencil fa-lg'></span> Submit Comment
                  </Button>
                <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)} >
                        <div className='form-group'>
                            <Label htmlFor= "name">Name </Label>
                             <Control.text  model='.name' id='name' name='name' 
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                              <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                              />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor= "rating">Rating </Label>
                              <Control.select model=".rating" name='rating' id='rating'
                                    className='form-control' >
                                       <option value='1'>1</option>
                                       <option value='2'>2</option>
                                       <option value='3'>3</option>
                                       <option value='4'>4</option>
                                       <option value='5'>5</option>
                                </Control.select>
                        </div>
                        <div className='form-group'>
                            <Label htmlfor= "comment">Comment </Label>
                            <Control.textarea model=".comment" id='comment' name='comment' rows='4' className='form-control'
                                     />
                        </div>
                        <Button type='submit'  value='submit' color='primary' className='mt-2'>Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
         </div>
        );
    }
}

export default ItemDetail;