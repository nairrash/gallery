this["art-partial"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=this.lambda;

  return "        <li class=\"span3\"><a class=\"thumbnail\" href=\""
    + alias1(((helper = (helper = helpers.permalink || (depth0 != null ? depth0.permalink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"permalink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><img src=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1)) != null ? stack1.src : stack1), depth0))
    + "\" title=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1)) != null ? stack1.caption : stack1), depth0))
    + "\" /></a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "gfhgjhgjhb\n\n<div class=\"row\">\n      <h1>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "<small> by "
    + alias3(this.lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "</small></h1>\n      <p>"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n    <div class=\"row\">\n      <ul class=\"thumbnails\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\n    </div>  ";
},"useData":true});