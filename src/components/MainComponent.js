import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent'; 
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import { ITEMS } from '../shared/items';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ITEMS,
      comments :COMMENTS,
      promotions : PROMOTIONS,
      leaders : LEADERS
      //SelectedItem : null
    };
  }
  
    render() {
        const HomePage = () => {
            return(
                <Home item={this.state.items.filter((item) => item.featured)[0]}
                promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
      return (
        <div >
            <Header />
            <Switch>
                <Route path='/Home' component={ HomePage } />
                <Route exact path ='/Menu' component ={ () => <Menu items ={this.state.items} /> } />
                <Route exact path ='/contact' component ={ Contact } />
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>
      );
    }
  
}

export default Main;
