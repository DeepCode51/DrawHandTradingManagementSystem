jQuery.extend({  
    handleError: function( s, xhr, status, e )      {  
        // If a local callback was specified, fire it  
                if ( s.error ) {  
                    s.error.call( s.context || s, xhr, status, e );  
                }  
  
                // Fire the global callback  
                if ( s.global ) {  
                    (s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );  
                }  
    },  
    createUploadIframe: function(id, uri)  
    {  
    
        var frameId = 'jUploadFrame' + id;  
          
        if(window.ActiveXObject) {  
            if(jQuery.browser.version=="9.0")  
            {  
                io = document.createElement('iframe');  
                io.id = frameId;  
                io.name = frameId;  
            }  
            else if(jQuery.browser.version=="6.0" || jQuery.browser.version=="7.0" || jQuery.browser.version=="8.0")  
            {  
              
                var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');  
                if(typeof uri== 'boolean'){  
                    io.src = 'javascript:false';  
                }  
                else if(typeof uri== 'string'){  
                    io.src = uri;  
                }  
            }  
        }  
        else {  
            var io = document.createElement('iframe');  
            io.id = frameId;  
            io.name = frameId;  
        }  
        io.style.position = 'absolute';  
        io.style.top = '-1000px';  
        io.style.left = '-1000px';  
  
        document.body.appendChild(io);  
  
        return io;        
    },  
    ajaxUpload:function(s,xml){  
        //if((fromFiles.nodeType&&!((fileList=fromFiles.files)&&fileList[0].name)))  
  
        var uid = new Date().getTime(),idIO='jUploadFrame'+uid,_this=this;  
        var jIO=$('<iframe name="'+idIO+'" id="'+idIO+'" style="display:none">').appendTo('body');  
        var jForm=$('<form action="'+s.url+'" target="'+idIO+'" method="post" enctype="multipart/form-data"></form>').appendTo('body');  
        var oldElement = $('#'+s.fileElementId);  
        var newElement = $(oldElement).clone();  
        $(oldElement).attr('id', 'jUploadFile'+uid);  
        $(oldElement).before(newElement);  
        $(oldElement).appendTo(jForm);  
  
        this.remove=function()  
        {  
            if(_this!==null)  
            {  
                jNewFile.before(jOldFile).remove();  
                jIO.remove();jForm.remove();  
                _this=null;  
            }  
        }  
        this.onLoad=function(){  
          
            var data=$(jIO[0].contentWindow.document.body).text();  
      
      
            try{  
  
                if(data!=undefined){  
                   data = eval('(' + data + ')');  
                    try {  
                         
                        if (s.success)  
                            s.success(data, status);  
      
                        // Fire the global callback  
                        if(s.global)  
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);  
                        if (s.complete)  
                            s.complete(data, status);  
                        xml = null;  
                      } catch(e)   
                         {  
                       
                        status = "error";  
                        jQuery.handleError(s, xml, status, e);  
                      }  
  
                      // The request was completed  
                      if(s.global)  
                          jQuery.event.trigger( "ajaxComplete", [xml, s] );  
                      // Handle the global AJAX counter  
                      if (s.global && ! --jQuery.active )  
                          jQuery.event.trigger("ajaxStop");  
  
                      // Process result  
         
                }  
         }catch(ex){  
             alert(ex.message);  
         };  
        }  
        this.start=function(){jForm.submit();jIO.load(_this.onLoad);};  
        return this;  
            
    },  
    createUploadForm: function(id, url,fileElementId, data)  
    {  
        //create form     
        var formId = 'jUploadForm' + id;  
        var fileId = 'jUploadFile' + id;  
        var form = jQuery('<form  action="'+url+'" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');   
        if(data)  
        {  
            for(var i in data)  
            {  
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);  
            }             
        }     
  
        var oldElement = jQuery('#' + fileElementId);  
        var newElement = jQuery(oldElement).clone();  
        jQuery(oldElement).attr('id', fileId);  
        jQuery(oldElement).before(newElement);  
        jQuery(oldElement).appendTo(form);  
  
        //set attributes  
        jQuery(form).css('position', 'absolute');  
        jQuery(form).css('top', '-1200px');  
        jQuery(form).css('left', '-1200px');  
        jQuery(form).appendTo('body');        
        return form;  
    },  
    ajaxFileUpload: function(s) {  
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout      
        // Create the request object  
        var xml = {};  
        s = jQuery.extend({}, jQuery.ajaxSettings, s);  
        if(window.ActiveXObject){  
            var upload =  new jQuery.ajaxUpload(s,xml);  
            upload.start();  
            
       }else{  
        var id = new Date().getTime();  
        var form = jQuery.createUploadForm(id,s.url, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));  
        var io = jQuery.createUploadIframe(id, s.secureuri);  
        var frameId = 'jUploadFrame' + id;  
        var formId = 'jUploadForm' + id;          
        // Watch for a new set of requests  
        if ( s.global && ! jQuery.active++ )  
        {  
            jQuery.event.trigger( "ajaxStart" );  
        }              
        var requestDone = false;  
       
        if ( s.global )  
            jQuery.event.trigger("ajaxSend", [xml, s]);  
        // Wait for a response to come back  
        var uploadCallback = function(isTimeout)  
        {             
            var io = document.getElementById(frameId);  
      
            try   
            {                 
                if(io.contentWindow)  
                {  
                     xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;  
                     xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;  
                       
                }else if(io.contentDocument)  
                {  
                     xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;  
                     xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;  
                }                         
            }catch(e)  
            {  
                jQuery.handleError(s, xml, null, e);  
            }  
            if ( xml || isTimeout == "timeout")   
            {                 
                requestDone = true;  
                var status;  
                try {  
                    status = isTimeout != "timeout" ? "success" : "error";  
                    // Make sure that the request was successful or notmodified  
                    if ( status != "error" )  
                    {  
                        // process the data (runs the xml through httpData regardless of callback)  
                        var data = jQuery.uploadHttpData(xml, s.dataType);      
                        // If a local callback was specified, fire it and pass it the data  
                        if (s.success)  
                            s.success(data, status);  
      
                        // Fire the global callback  
                        if(s.global)  
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);  
                        if (s.complete)  
                            s.complete(data, status);  
                          
                    } else  
                        jQuery.handleError(s, xml, status);  
                } catch(e)   
                {  
                    status = "error";  
                    jQuery.handleError(s, xml, status, e);  
                }  
  
                // The request was completed  
                if(s.global)  
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );  
                // Handle the global AJAX counter  
                if (s.global && ! --jQuery.active )  
                    jQuery.event.trigger("ajaxStop");  
  
                // Process result  
                jQuery(io).unbind();  
  
                setTimeout(function()  
                                    {   try   
                                        {  
                                            jQuery(io).remove();  
                                            jQuery(form).remove();    
                                              
                                        } catch(e)   
                                        {  
                                            jQuery.handleError(s, xml, null, e);  
                                        }                                     
  
                                    }, 100);  
  
                xml = null;  
  
            }  
        };  
        // Timeout checker  
        if (s.timeout>0)   
        {  
            setTimeout(function(){  
                // Check to see if the request is still happening  
                if( !requestDone ) uploadCallback("timeout");  
            }, s.timeout);  
        }  
        
            try   
                {  
          
                    var form = jQuery('#' + formId);  
                    jQuery(form).attr('action', s.url);  
                    jQuery(form).attr('method', 'POST');  
                    jQuery(form).attr('target', frameId);  
                      
                    if(form.encoding)  
                    {  
                        jQuery(form).attr('encoding', 'multipart/form-data');                 
                    }  
                    else  
                    {     
                        jQuery(form).attr('enctype', 'multipart/form-data');              
                    }     
             
                      
                    jQuery(form).submit();  
          
                } catch(e)   
                {     
                    jQuery.handleError(s, xml, null, e);  
                }  
                  
                jQuery('#'+ frameId).load(uploadCallback);  
                return {abort: function () {}};   
    
       }  
    },  
  
    uploadHttpData: function( r, type ) {  
          
        var data = !type;  
        data = type == "xml" || data ? r.responseXML : r.responseText;  
        // If the type is "script", eval it in global context  
        if ( type == "script" )  
            jQuery.globalEval( data );  
        // Get the JavaScript object, if JSON is used.  
        if ( type == "json" ){  
     
            eval( "data = " + $(data).html() );  
        }  
        // evaluate scripts within html  
        if ( type == "html" )  
            jQuery("<div>").html(data).evalScripts();  
   
        return data;  
    }  
});  