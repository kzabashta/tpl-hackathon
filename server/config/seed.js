/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var BookClub = require('../api/bookclub/bookclub.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

BookClub.find({}).remove(function() {
  BookClub.create({
  profilePic: "http://www.tansleymethodist.com/site/wp-content/uploads/2013/01/Book-Club.png",
  name: "North York Great Books Club",
  info: "I've been wanting to start a general book club in North York for a while now! I have all sorts of tastes in books, because you never know what genre a good story is going to come out of! My favourite go-to books are young adult/children's, chick-lit, mystery, sci-fi, fantasy, travel, some classics, humour and anything popular. My vision for this club would be try a bit of everything, discuss book topics, and swap books and suggested reads! Some of my favourite authors are Rowling, Bryson, Montgomery, Jonasson, Tolkien, Snicket, Suskind, Rowell, Lowry, to name a few. If this sounds like your reading tastes, then feel free to join the group and read the next monthís book. I will try to update a few months in advance to give you time to read the books. Iíll also try to pick books that are available at the library, or easily bought second-hand!",
  location: "Toronto",
  currentBook: {
    bookId: "168668"
  },
  pastBooks: ["34", "35234", "589"],
  meetUpLink: "http://www.meetup.com/North-York-Great-Books-Club/",
  nextEvent: {
    eventName: "Discussion and beer",
    eventDescription: "Let's discuss this amazing book over a pint or few",
    eventTime: "November 20th, 2015",
    eventLocation: "Awesome Pub"
  }}, 
  function() {
      console.log('finished populating book clubs');
    }
  );
});

