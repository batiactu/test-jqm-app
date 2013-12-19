var INTERFACE = "http://capinfo11.ecritel.net:443/cap-core/apps/interfaceJQM/scripts/interface.php?";

var app = {

    initialize: function() {
 
 		$('*[data-role=listview]').each(function() {
 			var pageCode = $(this).attr('data-page-code');
 						
 			$.ajax({
     		url:INTERFACE
     		,data: {
     			get:'list'
     			,codePage:pageCode
     			,jsonp:1
     		}
     		,dataType: "jsonp"
	     	}).done(function(Tab) {
	     		
	     		for(i in Tab) {
	     			
	     			row = Tab[i];
	     			
					ligne = getListLineCode(row);
	     			$('#liste-'+pageCode).append(ligne);
	     			
	     		}
	     		
	     		$('#liste-'+pageCode).listview('refresh');
	     		
	     	}) ; 
 			
 		});
 
     	
     		
     	$('*[data-role=listview]').on( "listviewbeforefilter", function ( e, data ) {
     			var pageCode = $(this).attr('data-page-code');
     			
		        var $ul = $( this ),
		            $input = $( data.input ),
		            value = $input.val(),
		            html = "";
		        $ul.html( "" );
		        if ( value && value.length > 2 ) {
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: INTERFACE
			     		,data: {
			     			get:'list-search'
			     			,codePage:pageCode
			     			,keyword:$input.val()
			     			,jsonp:1
			     		}
			     		,dataType: "jsonp"
		             })
		            .then( function ( response ) {
		            	var ligne='';
		                $.each( response, function ( i, row ) {
		                	ligne= getListLineCode(row);
		                  
		                });
		                 $ul.html(ligne);
		                $ul.listview( "refresh" );
		                $ul.trigger( "updatelayout");
		            });
		        }
		    });
     		
     		 		
     
    	    
    }
	
	,objet : function(id, pageCode) {
		$.ajax({
     		url:INTERFACE
     		,data: {
     			get:'objet'
     			,codePage:pageCode
     			,id: id
     			,jsonp:1
     		}
     		,dataType: "jsonp"
     	}).done(function(object) {
			
			$('#'+pageCode+'-titre').html(object.title);
			$('#'+pageCode+'-contenu').html(object.description);
			
			if(object.image!=null)$('#'+pageCode+'-image').html('<img src="'+object.image+'" />');
			if(object.author!=null)$('#'+pageCode+'-author').html(object.author);

			if(object.pubDate!=null)$('#'+pageCode+'-pubDate').html(object.pubDate);

			     		
     		$.mobile.navigate('#'+pageCode);
     		
     	}) ; 
		
	}
	,page:function (page) {
		$.mobile.navigate('#'+page);
	}
	,camera:function() {
		
		navigator.camera.getPicture(onSuccessCAM, onFailCAM, { quality: 50,
		    destinationType: Camera.DestinationType.DATA_URL
		 }); 
	}
    
};

function getListLineCode(row) {
		
	ligne = '<li><a href="'+row.link+'">'; //javascript:app.book('+book.id+')
     			if(row.image!='') ligne+= '<img src="'+row.image+'" />';
     			ligne += '<h2>'+row.title+'</h2>';
				ligne += '<p>'+row.description+'</p></a></li>';
     
     return ligne;		
}

function onSuccessCAM(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    
    $(document).append(image);
    
}

function onFailCAM(message) {
    alert('Failed because: ' + message);
}


$(document).on('pageinit',function(){
	app.initialize();
});