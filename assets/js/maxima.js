(function($){
    "use strict";
    $(window).on('load', function(){
        $('.preloader').fadeOut(1000);
    })

    $(document).ready(function(){
        // lightcase 
        $('a[data-rel^=lightcase]').lightcase();

        // search cart option
        $(document).on('click','.cart-option .icon-check',function(){
            $(".cart-option").toggleClass("open");
        });
        $(document).on('click','.search-option .icon-search, .search-close',function(){
            $(".search-input").toggleClass("open");
        });

        // Header Section Menu Part
        $("ul li ul").parent("li").addClass("menu-item-has-children");
        $(".shop-menu>li .shop-submenu").parent("li").children("a").addClass("dd-icon-down");

        // drop down menu width overflow problem fix
        $('ul').parent().on('hover', function() {
            var menu = $(this).find("ul");
            var menupos = $(menu).offset();
            if (menupos.left + menu.width() > $(window).width()) {
                var newpos = -$(menu).width();
                menu.css({ left: newpos });    
            }
        });

        // mobile menu responsive
        $(document).on('click','.header-bar',function(){
            $(".header-bar").toggleClass("close");
            $(".mobile-menu").toggleClass("open");
        });

        //mobile drodown menu display
        $('.mobile-menu-area ul li a, .shop-menu li a').on('click', function(e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(1000,"swing");
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown(1000,"swing");
                element.siblings('li').children('ul').slideUp(1000,"swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(1000,"swing");
            }
        });
   

        //menu options
        var fixed_top = $(".header-area, .mobile-header");
        $(window).on('scroll', function(){
            if( $(this).scrollTop() > 100 ){  
                fixed_top.addClass("animated fadeInDown menu-fixed");
            }
            else{
                fixed_top.removeClass("animated fadeInDown menu-fixed");
            }
        });

        // scroll up start here
        $(function(){
            //Check to see if the window is top if not then display button
            $(window).scroll(function(){
                if ($(this).scrollTop() > 300) {
                    $('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
                } else {
                    $('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
                }
            });
            //Click event to scroll to top
            $('.scrollToTop').on('click', function(){
                $('html, body').animate({scrollTop : 0},500);
                return false;
            });
        });

        //Isotope
        jQuery(window).on('load',function() { 
            var $grid = $('.grid').isotope({
                itemSelector: '.product-item',
                masonry: {
                    columnWidth: 0
                }
            });
            // filter functions
            var filterFns = {
                // show if number is greater than 50
                numberGreaterThan50: function() {
                    var number = $(this).find('.number').text();
                    return parseInt( number, 10 ) > 50;
                },
                // show if name ends with -ium
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match( /ium$/ );
                }
            };
            // bind filter button click
            $('.product-filter-name').on( 'click', 'li', function() {
                var filterValue = $( this ).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[ filterValue ] || filterValue;
                $grid.isotope({ filter: filterValue });
            });
                // change is-checked class on buttons
            $('.product-filter-name').each( function( i, buttonGroup ) {
                var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'li', function() {
                    $buttonGroup.find('.active').removeClass('active');
                    $( this ).addClass('active');
                });
            });
        });

        // Banner slider
        var swiper = new Swiper('.banner-slider', {
            slidesPerView: 1,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner-next',
                prevEl: '.banner-prev',
            },
            loop: true,
        });

        // testi slider
        var swiper = new Swiper('.testimonial-slider', {
            // slidesPerView: 1,
            // autoplay: {
            //     delay: 10000,
            //     disableOnInteraction: false,
            // },
            loop: true,
        });

        // slider-product
        var swiper = new Swiper('.slider-product', {
            slidesPerView: 1,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.slider-product-pagination',
                clickable: true,
            },
            loop: true,
        });

        // sponsor slider
        var swiper = new Swiper('.sponsor-slider', {
            slidesPerView: 5,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                },
                420: {
                    slidesPerView: 1,
                },
            },
            loop: true,
        });

        // counterup js start here
        $('.count-number').each(function () {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter', 0).animate({
               Counter: $(this).text()
            }, {
               duration: 8000,
               step: function (func) {
                  $(this).text(parseFloat(func).toFixed(size));
               }
            });
        });

        // counter up start
        // $('.counter').counterUp({
        //     delay: 10,
        //     time: 2000
        // });

        // product view mode change js
        $(function() {
            $('.product-view-mode').on('click', 'a', function (e) {
                e.preventDefault();
                var shopProductWrap = $('.shop-product-wrap');
                var viewMode = $(this).data('target');
                $('.product-view-mode a').removeClass('active');
                $(this).addClass('active');
                shopProductWrap.removeClass('grids lists').addClass(viewMode);
            });
        });

        // shop cart + - start here
        var CartPlusMinus = $('.cart-plus-minus');
        CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
        CartPlusMinus.append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if ($button.text() === "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find("input").val(newVal);
        });

        // sop single slider
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                }
            }
        });
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.shop-slider-next',
                prevEl: '.shop-slider-prev',
            },
            thumbs: {
                swiper: galleryThumbs
            },
            loop: true,
        });

        //Review Tabs
        $('ul.review-nav').on('click', 'li', function (e) {
            e.preventDefault();
            var reviewContent = $('.review-content');
            var viewRev = $(this).data('target');
            $('ul.review-nav li').removeClass('active');
            $(this).addClass('active');
            reviewContent.removeClass('review-content-show description-show').addClass(viewRev);
        });

        // skill bar or progress bar
        $(window).on('load',function() { 
            var skillLevel1 = jQuery('.first').data('percent');
            $('.first.circle').circleProgress({
                value:  '0.' + skillLevel1,
                fill: {gradient: ['#2dca73']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel1 * progress) + '<i>%</i>');
            });
            //Circle ProgressBarTwo
            var skillLevel2 = jQuery('.second').data('percent');
            $('.second.circle').circleProgress({
                value:  '0.' + skillLevel2,
                fill: {gradient: ['#ff7d51']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel2 * progress) + '<i>%</i>');
            });
            //Circle ProgressBarThree
            var skillLevel3 = jQuery('.third').data('percent');
            $('.third.circle').circleProgress({
                value:  '0.' + skillLevel3,
                fill: {gradient: ['#ffc212']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel3 * progress) + '<i>%</i>');
            });
        });

        
        // wow animation
        new WOW().init();
    });
}(jQuery));

