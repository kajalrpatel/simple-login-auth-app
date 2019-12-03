import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent'; 
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import ItemDetail from './ItemDetailComponent';
import { Switch, Route, Redirect, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment,fetchItems, fetchComments, fetchPromos, fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup,CSSTransition } from 'react-transition-group';

const mapStateTpProps = state => {
    return{
        items: state.items,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchtoProps = (dispatch) =>({
    postComment : (itemId, rating, comment, author) => dispatch(postComment(itemId, rating, comment, author)),
    postFeedback : (f_name, l_name, phone, email , agree,  contactType, msg) => dispatch(postFeedback(f_name, l_name, phone, email , agree,  contactType, msg)),
    fetchItems: () => { dispatch(fetchItems())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {
 
  componentDidMount(){
      this.props.fetchItems();
      this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
    render() {
        const HomePage = () => {
            return(
                <Home item={this.props.items.items.filter((item) => item.featured)[0]}
                itemsLoading = {this.props.items.isLoading}
                itemsErrMsg = {this.props.items.errmess}
                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
                />
            );
        }

        const ItemwithID = ({match}) => {
           // console.log(this.state.items);
            return(
                <ItemDetail item={this.props.items.items.filter((item) => item.id === parseInt(match.params.itemId,10))[0]} 
                itemLoading = {this.props.items.isLoading}
                itemErrMsg = {this.props.items.errmess}
                comments={this.props.comments.comments.filter((comment) => comment.itemId === parseInt(match.params.itemId,10))}
                commentsErrMess={this.props.comments.errMess}
                postComment = {this.props.postComment}
                />
            );
        }

      return (
        <div >
            <Header />
            <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path='/Home' component={ HomePage } />
                    <Route exact path ='/Menu' component ={ () => <Menu items ={this.props.items} /> } />
                    <Route path = '/Menu/:itemId' component = {ItemwithID} />
                    <Route exact path ='/contact' component ={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                    <Route exact path ='/about'  component ={ () => <About leaders ={this.props.leaders.leaders} /> } />
                    <Redirect to='/home' />
                </Switch>
              </CSSTransition>
            </TransitionGroup>

            <Footer />
        </div>
      );
    }
  
}

export default withRouter(connect(mapStateTpProps, mapDispatchtoProps)(Main));
