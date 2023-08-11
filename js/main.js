const imageParams = {
    imageWidth: 0,
    imageHeight: 0,
    imagePosX: 0,
    imagePosY: 0
}

let offset;

$(document).ready(function () {
    $('body').css('touch-action', 'none');

    let image = $('#image');
    let imageWrapper = $('.image__wrapper');

    /* Uploading and show image */
    $('#image__input').change(function () {
        if (this.files && ((/\.(gif|jpe?g|png)$/i).test(this.files[0].name))){
            image
                .attr('src', URL.createObjectURL(this.files[0]))
                .on('load',function () {
                    imageParams.imageWidth =  image.width();
                    imageParams.imageHeight =  image.height();
                    imageParams.imagePosX = image.offset().left;
                    imageParams.imagePosY = image.offset().top;

                    /* Show menu */
                    $('.menu').show();
                });
        }
    });

    /* Scaling image */
    $('#scaling__button').click(function () {
        disableMenu(true);
        setBorder(true);
        $('#image-constructor__scaling-btn').show();
    });

    /* Rotate image */
    $('#rotate__button').click(function () {
        setBorder(true);
        disableMenu(true);
        $('#image-constructor__rotate-btn').show();
        offset = imageWrapper.offset();
    });

    let scalingBool = false;
    let rotateBool = false;

    $('#image-constructor__scaling-btn').bind('mousedown pointerdown', function (e) {
        if (e.which === 1)
            scalingBool = true
    });

    $('#image-constructor__rotate-btn').bind('mousedown pointerdown',function (e) {
        if (e.which === 1)
            rotateBool = true
    });

    $(document).bind('mouseup pointerup', function () {
        scalingBool = false;
        rotateBool = false;
    });

    $(document).bind('mousemove pointermove',function (e) {
        if (scalingBool){
            scaleImage(e);
        } else if (rotateBool){
            mouseRotate(e);
        }
    });

    /* Drag image function */
    $('#drag__button').click(function (){
        setBorder(true);
        disableMenu(true);

        image.addClass('move-image');
        imageWrapper.draggable({ disabled: false });
    });

    /* Saving image */
    $('#save__button').click(function () {
        imageParams.imageWidth = image.width();
        imageParams.imageHeight = image.height();
        imageParams.imagePosX = image.offset().left;
        imageParams.imagePosY = image.offset().top;

        disableMenu(false);
        setBorder(false);

        $('#image-constructor__scaling-btn').hide();
        $('#image-constructor__rotate-btn').hide();

        image.removeClass('move-image');
        imageWrapper.draggable({ disabled: true });
    });

    /* Auxiliary functions */
    function setBorder(bool){
     if (bool)
         image.css('border', '2px solid #000')
     else
         image.css('border', 'none');
    }

    function disableMenu(bool){
       $('#scaling__button').prop('disabled', bool);
       $('#rotate__button').prop('disabled', bool);
       $('#drag__button').prop('disabled', bool);
    }

    function scaleImage(e){
        image.width(e.pageX - image.offset().left)
    }

    function mouseRotate(e){
        let centerX = offset['left'] +  imageWrapper.width() / 2;
        let centerY = offset.top +  imageWrapper.height() / 2;

        let mouseX = e.pageX;
        let mouseY = e.pageY;

        let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
        let degree = (radians * (180 / Math.PI) * -1) + 90;

        imageWrapper
            .css('-moz-transform', 'rotate('+degree+'deg)')
            .css('-webkit-transform', 'rotate('+degree+'deg)')
            .css('-o-transform', 'rotate('+degree+'deg)')
            .css('-ms-transform', 'rotate('+degree+'deg)');
    }
});