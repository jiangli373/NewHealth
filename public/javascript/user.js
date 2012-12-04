/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-12-3
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
var user = {
    init:function () {
    }
};
$(user.init());

(function (user) {

    user.usermodel = Backbone.Model.extend({

    });

    user.userCollection = Backbone.Collection.extend({
        url:'/users',
       model:user.usermodel
    });
    user.list = Backbone.View.extend({
        tagname:'div',
        className:'container',
        initialize:function () {
                this.model = new user.userCollection;
                this.model.fetch({add:true});
                this.model.on('add', this.addToView);
        },
        render:function () {
            var source = $("#userTable").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(html).appendTo(this.$el);
            return this;
        },
        addToView:function (data) {
            var source = $("#user").html();
            var template = Handlebars.compile(source);
            var context = data.toJSON();
            var html = template(context);
            $('table').append(html);
        },
        events:{
            'click tr':'showDetail'
        },
        showDetail:function(e){
            var id = $(e.target).parent().attr("data-value");
            $.ajax({
                url:'/getUSerById/'+id,
                type:'get',
                success:function(data){
                        $("#username").val(data.name);
                        $("#creditno").val(data.creditno);
                        $("#birth").val(data.birth);
                        $("#activity").val(data.activity);
                        $("#sex").val(data.sex);
                        $("#height").val(data.height);
                        $("#phoneno").val(data.phoneno);
                        $("#email").val(data.email);
                        $("#city").val(data.city);
                        $("#country").val(data.country);
                        $("#comment").val(data.comment);
//                    $(".container").css({
//                        "display":"none",
//                        "-webkit-transform-style":"preserve-3d",
//                        "-webkit-transition-duration":"0.5s",
//                        "-webkit-transition-timing-function":"ease-out"
//                    });
                    $("#dialog-form").dialog("open");
                }
            });
    }
    });

    user.pagination = Backbone.View.extend({
        tagname:'div',
        className:'pagination',
        render:function(){

        }
    });
})(user);