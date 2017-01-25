
// Engineer Card Display
angular.module("myApp")
.directive('empCard', function() {
  return {
    scope: {
      engineers: "="
    },


// template to Display Engineer Card
template: '<a ui-sref="home.summary({engineerId:engineers.engineerId})"><md-card class="engineersCard"><img src="assets/logo.png" style="width:100px; height:150px;"/>\
          <div><md-card-content><span><h2>{{engineers.employeeName}}</h2></span>\
          <span><h3>{{engineers.employeeStatus}}</h3></span>\
          <span><h3>{{engineers.company}}</h3></span>\
          <span><h3>{{engineers.mobile}}</h3></span>\
          <span><h3>{{engineers.emailId}}</h3></span>\
          </md-card-content></div></md-card></a>'
  };
});
