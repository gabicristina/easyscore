(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
         $(document).on("click", "#btn_criarGrupo", function(evt)
        {
			activate_subpage("#procura_disp"); 
        });
        
}
 $(document).ready(register_event_handlers);
})();
