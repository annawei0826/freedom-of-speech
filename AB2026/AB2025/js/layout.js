$(document).ready(function () {
  //preload
  $(window).load(function () {
    // makes sure the whole site is loaded
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
    $("body").delay(350).css({ overflow: "visible" });
  });

  function resize_layout () {
    var window_width = $(window).outerWidth();
    var window_height = $(window).outerHeight();
    var kv_height = $("#KV").outerHeight();

    $("#width_num").html(window_width);
    $("#height_num").html(window_height);

    if (480 < window_width) {
      $(".rplc_img").each(function () {
        var chg_img = $(this).attr("datapc");
        $(this).attr("src", chg_img);
      });
    } else {
      $(".rplc_img").each(function () {
        var chg_img = $(this).attr("datamb");
        $(this).attr("src", chg_img);
      });
    }
  }

  /**init**/
  resize_layout();

  /**resize**/
  $(window).resize(function () {
    resize_layout();
  });

  //goTop

  $(window).scroll(function () {
    var window_width = $(window).outerWidth();
    if ($(this).scrollTop() > 100) {
      $(".goTop").fadeIn();
    } else {
      $(".goTop").fadeOut();
    }

    if ($(this).scrollTop() > 500) {
      $("#HEADER").addClass("reveal");
    } else {
      $("#HEADER").removeClass("reveal");
    }
  });

  //Click event to scroll
  $(".goTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  $(".kv_img").imagesLoaded(function () {
    $(".kv_img").imagefill();
  });

  $(".intro_bg").imagesLoaded(function () {
    $(".intro_bg").imagefill();
  });

  //host
  var sec1_slider = $("#sec1-gallery").lightSlider({
    item: 3,
    loop: true,
    slideMargin: 20,
    adaptiveHeight: true,
    controls: false,
    pager: false,
    auto: true,
    enableTouch: true,
    enableDrag: true,
    speed: 2000,
    mode: "slide",
    pause: 4000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          item: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          item: 1,
          slideMargin: 0,
        },
      },
    ],
  });
  //host
  var sec3_slider = $("#sec3-gallery").lightSlider({
    item: 1,
    loop: true,
    slideMargin: 20,
    adaptiveHeight: true,
    controls: false,
    pager: false,
    auto: true,
    enableTouch: true,
    enableDrag: true,
    speed: 2000,
    mode: "slide",
    pause: 4000,
    // 下一個 slide 時的回調函式
    onAfterSlide: function (el) {
      var currentSlide = el.getCurrentSlideCount(); // 取得目前顯示的是第幾張（從 1 開始）

      // 先移除所有 active
      $(".agenda_btns img").removeClass("active");

      // 根據 slide 編號對應加上 active
      if (currentSlide === 1) {
        $(".agenda_taipei").addClass("active");
      } else if (currentSlide === 2) {
        $(".agenda_taichung").addClass("active");
      } else if (currentSlide === 3) {
        $(".agenda_kaohsiung").addClass("active");
      }
    }

  });


  $(".album_arrow_left").click(function () {
    sec1_slider.goToPrevSlide();
    $(".host_intro").fadeOut();
  });

  $(".album_arrow_right").click(function () {
    // var tt = sec1_slider.getCurrentSlideCount();
    // alert(tt);

    sec1_slider.goToNextSlide();
    $(".host_intro").fadeOut();
  });


  $(".sec3_arrow_left").click(function () {
    sec3_slider.goToPrevSlide();
    $(".host_intro").fadeOut();
  });

  $(".sec3_arrow_right").click(function () {
    sec3_slider.goToNextSlide();
    $(".host_intro").fadeOut();
  });

  $(".agenda_taipei").click(function () {
    sec3_slider.goToSlide(1);
    $(".host_intro").fadeOut();
    $(".agenda_btns img").removeClass("active");
    $(this).addClass("active");
  });

  $(".agenda_taichung").click(function () {
    sec3_slider.goToSlide(2);
    $(".host_intro").fadeOut();
    $(".agenda_btns img").removeClass("active");
    $(this).addClass("active");
  });

  $(".agenda_kaohsiung").click(function () {
    sec3_slider.goToSlide(3);
    $(".host_intro").fadeOut();
    $(".agenda_btns img").removeClass("active");
    $(this).addClass("active");
    $(".host_intro").fadeOut();
  });

  //rwd menu

  $(".scroll_btn").click(function () {
    var ta_value = $(this).attr("data");
    $("html,body").animate({ scrollTop: $(ta_value).offset().top }, 800);
    $("#NAV").toggleClass("reveal");
    $("#nav-icon3").toggleClass("open");
  });

  $(".btn_scroll").click(function () {
    var ta_value = $(this).attr("data");
    $("html,body").animate({ scrollTop: $(ta_value).offset().top }, 800);
  });

  $(".map_move").click(function () {
    $("html,body").animate({ scrollTop: $("#sec5").offset().top }, 800);
  });

  // for (let i = 0; i < $(".sec1_album_slider li").length; i++) {
  //   var ta_type = $(".sec1_album_slider li").eq(i).attr("data");
  //   if (ta_type == "type0") {
  //     $(".sec1_album_slider li").eq(i).addClass("show");
  //   }
  // }

  // $(".al_btn").on("click", function (e) {
  //   e.stopPropagation();
  //   var ta_index = $(this).index();
  //   var ta_class = "type" + ta_index;
  //   $(this).addClass("current").siblings().removeClass("current");

  //   for (let i = 0; i < $(".sec1_album_slider li").length; i++) {
  //     if ($(".sec1_album_slider li").eq(i).attr("data") == "type" + ta_index) {
  //       $(".sec1_album_slider li").eq(i).addClass("show");
  //     } else {
  //       $(".sec1_album_slider li").eq(i).removeClass("show");
  //     }
  //   }
  // });

  $(".NAV_btn_wrap").on("click", function (e) {
    e.stopPropagation();
    $("#NAV").toggleClass("reveal");
    $("#nav-icon3").toggleClass("open");
  });

  $(".host_more_btn").on("click", function (e) {
    e.stopPropagation();
    var ta_name = $(this).children(".host_name").html();
    var ta_des_txt = $(this).attr("dataDes");
    $(".box_name").html(ta_name);
    $("#host_intro").html(ta_des_txt);
    $("#host_info_box").addClass("show");
  });

  $(".close_box").on("click", function (e) {
    e.stopPropagation();
    $("#host_info_box").removeClass("show");
  });

  //animate

  var wow = new WOW({
    boxClass: "wow", // 要套用WOW.js縮需要的動畫class(預設是wow)
    animateClass: "animated", // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
    offset: 0, // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
    mobile: true, // 手機上是否要套用動畫 (預設是true)
    live: true, // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
    callback: function (box) {
      // 當每個要開始時, 呼叫這裡面的內容, 參數是要開始進行動畫特效的element DOM
    },
    scrollContainer: null, // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
  });
  wow.init();
});
