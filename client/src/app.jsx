var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var SignInView = require('./views/SignInView.jsx');
var SignUpView = require('./views/SignUpView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;
var Navigation = Router.Navigation;




var App = React.createClass({
  mixins: [Navigation],

  getInitialState: function(){
    return {
      questions: []
    };
  },

  loadAllQuestions: function(){
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        this.setState({questions: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  componentDidMount: function(){
    this.loadAllQuestions();
  },

  render: function() {
    return (
      <div id='wrapper'> 

        <div id='sidebar-wrapper'>
          <ul className='sidebar-nav'>
            <li className='sidebar-brand'>
              <Link to='default'>Regexr</Link>
            </li>
            <li>
              <Link to='default'>Questions</Link>
            </li>
            <li>
              <Link to='default'>Profile</Link>
            </li>
            <li>
              <Link to='default'>Leaderboard</Link>
            </li>
            <li>
              <Link to='default'>Solutions</Link>
            </li>
          </ul>
        </div>
        <RouteHandler questions={this.state.questions}/>
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="question" path="/question/:qNumber" handler={DetailView}/>
    <Route name="signin" path= "/signin" handler = {SignInView}/>
    <Route name="signup" path= "/signup" handler = {SignUpView}/>
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.
  render(<Root />, document.body);
});

