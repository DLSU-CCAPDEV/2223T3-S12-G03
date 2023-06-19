$(document).ready(function(){

    $("#frEditBtn").click(function(e){
        if($("#frEditBtn").text() == "Edit Post"){
            $("#frEditBtn").text("Confirm");
            $(".post-description > span").attr("contenteditable", "true");
        }
        else{
            $("#frEditBtn").text("Edit Post");
            $(".post-description > span").attr("contenteditable", "false");
        }
    })
})