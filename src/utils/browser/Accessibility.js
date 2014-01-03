define(
    [ ],
    function () {

        function init() {
            attachEventHandlers();
        }

        function attachEventHandlers() {

            $(document).bind('keydown', function(e){
                var keyCode = e.keyCode || e.which;

                if(keyCode == 9) {
                    $('html').addClass('tabber');
                } else if (keyCode == 27) {
                    $('html').removeClass('tabber');
                }

            });

        }

        init();

    }

);