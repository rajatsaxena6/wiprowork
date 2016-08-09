


$(function(){
	// $('#btn').on('click',function(){

	// 	var vl=$('#seacrhinput').val();
$('#f1').submit(function(){
	var temp='';
		var vl=$('#searchinput').val();
		
		//$('#t1').html('<tr><th>Title</th><th>Year</th><th>Type</th><th>imdbID</th><th>Poster</th></tr>');

		$.ajax({

			
			type:'GET',
			url:'http://www.omdbapi.com/?s='+vl,
			success: function(data)
			{
				console.log("success",data);
				var search=data.Search;

				$.each(search,function(i,item){

					//$.each(item,function(index,item){
                        
                        temp ='<tr><td>'+item.Title+'</td></tr><tr><td>'+item.Year+'</td></tr><tr><td>'+item.Type+'</td></tr><tr><td>'+item.imdbID+'</td></tr><tr><td> <img src='+item.Poster+'></td></tr>';

						//$('#newdata').append('Title:'+item.Title+'Year:'+item.Year+'imdbid:'+item.imdbID);
						//console.log(item.title);
					//});

			 				$('#t1').append(temp);

				});
			}
		});
	});
});
