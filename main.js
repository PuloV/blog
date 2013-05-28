var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}


var searchbox= $('#s');
searchbox.keyup(function () {
    var q = searchbox.val();
    
    if(q.length >= 3 )
      { 
        var output = '<h3 id="res">Резултати:</h3>' 
        $.post("search.php", { search: q },'json')
        .done(function(data) 
                { 
                  
                   data=JSON.parse(data);
                  $.each(data , function(key,val){
                        output+= '<li class="fromSearch"><a  href="topic.php?id='
                        output+= val.res['tpc_id']
                        output+= '">'
                        output+= val.res['tpc_title']
                        output+='</a></li>'
                    });

               
                    $('#result').html(output);  
                   
                    $(".fromSearch a").click(function(event) {
                        event.preventDefault();
                        var topic = ''
                        var href = $(this).attr("href");
                        $.get(href)
                        .done(function(data) 
                             { 
                         
                           data=JSON.parse(data);
                          
                             topic+= '<h2>'
                             topic+= data['tpc_title']
                             topic+= '</h2> <br /> <p>'
                             topic+= data['tpc_text']
                             topic+='</p>'
                             topic+= '<a id="showComment"  href="comments.php?id='
                             topic+= data['tpc_id']
                             topic+= '"> Покажи коментари! </a>'
                             topic+= ''
                         $('#tabs-container').html(topic); 

                         $("#showComment").click(function(event) {
                                                event.preventDefault();
                                                $('#showComment').hide(300);

                                                var comments = '<h3>Коментари : </h3> <ul>'
                                                var comHref = $(this).attr("href");
                                                $.get(comHref).done(function(data){
                                                    data=JSON.parse(data);
                                                    
                                                   $.each(data , function(key,val){
                                                        
                                                        comments+= '<li class = "hasComment"> <div><h3><a href="mailto:'
                                                        comments+= val.cmt['cmt_mail']
                                                        comments+= '">'
                                                        comments+= val.cmt['cmt_user']
                                                        comments+= '</a> каза :</h3></div><p>'
                                                        comments+= val.cmt['cmt_text']
                                                        comments+= '</p></li>   '
                                                        

                                                    }); 
                                                      comments+= '<li class = "hasComment"> <h3>Напиши Коментар</h3>'
                                                      comments+= '<p><input type="text" id="name" size="15" placeholder="Име"  />   '
                                                      comments+= '<input type="text" id="mail" size="15" placeholder="Email"  /><br />'
                                                      comments+= ' <input type="text" id="comm" size="40" placeholder="Коментар"  />'
                                                      comments+= '<input type="button" id="sendComment" value="Добави Коментар"></p></li>'
                                                   comments+='</ul>'
                                                   $('#tabs-container').append(comments); 
                                               
                                               
                                               
                                                 $("#sendComment").click(function(event) {
                                                    var name =$('#name').val(); 
                                                    var mail =$('#mail').val();
                                                    var comm =$('#comm').val();
                                                    var newComment =''
                                                    id ='' ;
                                                     for (var i = comHref.length - 1; i >= 0; i--) {
                                                         if (comHref[i] >= 0 || comHref[i] <=9 ) {
                                                         id += comHref[i]; };
                                                     };
                                                   

                                                  $.post("add.php?id=" + id, { uname: name , email: mail , comment:comm })
                                                    .done(function(data) 
                                                        { 
                                                            newComment+= ' <div><h3><a href="mailto:'
                                                            newComment+= mail
                                                            newComment+= '">'
                                                            newComment+= name
                                                            newComment+= '</a> каза :</h3></div><p>'
                                                            newComment+= comm
                                                            newComment+= '</p> '  
                                                            $('.hasComment:last').html(newComment)
                                                         
                                                        });
                                                    });
                                                });
                                             });




                         });

                  }); 
      

});
}});

