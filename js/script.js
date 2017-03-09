$(document).ready(function () {

	/* Slider Settings */

	$('.top_slider').slick({
		prevArrow: $('.prev_arrow'),
		nextArrow: $('.next_arrow'),
	});


	/* Set img as background */

	$('.img img').each(function () {
		var src = $(this).attr('src');
		$(this).parent().css('background-image', 'url(' + src + ')');
	})

	/* Set smooth showing hove element in portfolio */

	function setTransition(selector, inner_selector) {
		$('body').on('mouseenter', selector, function () {
			$(this).find(inner_selector).animate({
				opacity: 1
			});
		});
		$('body').on('mouseleave', selector, function () {
			$(this).find(inner_selector).animate({
				opacity: 0
			});
		})
	}

	setTransition('.single_work', '.single_work_hover');

	/* Manage menu in mobile version */

	$('body').on('click', '.header_menu_trigger, .menu_shim', function () {
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().addClass('active');
			$('body').on('wheel touchstart keydown', preventScrolling);
		} else {
			releaseMobMenu()
		}
	});

	/* Preventing scrolling when menu is open */

	function preventScrolling(e) {
		if (e.type == 'keydown') {
			if (e.keyCode == "40" || e.keyCode == "38") {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		} else if (e.type == 'wheel') {
			e.preventDefault();
			e.stopImmediatePropagation();
		} else {
			if (e.type == 'touchstart') {
				this.firstCoord = this.getTouchCoord(e);
			} else if (e.type == 'touchmove') {
				this.lastCoord = this.getTouchCoord(e);
			} else if (e.type == 'touchend') {
				if (this.lastCoord - this.firstCoord > 10) {
					e.preventDefault();
					e.stopImmediatePropagation();
				} else if (this.lastCoord - this.firstCoord < -10) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}

			}
		}
	}

	/* Allow scrolling when menu is closed */

	function releaseMobMenu() {
		$('.header_nav').removeClass('active');
		$('body').off('wheel touchstart keydown', preventScrolling);
	}


	/* Smooth scroll to element when menu clicked */

	var header_height = parseInt($('header').css('height'));
	$("body").on("click", ".header_nav a, .back_to_top", function (event) {

		event.preventDefault();

		if ($('.header_nav').hasClass('active')) {
			releaseMobMenu()
		}

		var id = $(this).attr('href'),

			top = $(id).offset().top - header_height;


		$('body,html').animate({
			scrollTop: top
		}, 600);

	});

	/* Show and hide more text in article */

	$('.main_article .button').on('click', function (e) {
		e.preventDefault();
		var text_more = $('.main_article').find('.more');
		if (text_more.hasClass('show')) {
			$(this).text('Read more');
			text_more.removeClass('show')
		} else {
			$(this).text('Show less');
			text_more.addClass('show')
		}
	})

});


/* Map settings begins */

var google_map;

// set map on the page

function initMap() {
	
	// define size of screen and scale size of map depends on it
	
	var zoomMap = function () {
		if (window.innerWidth > 768) {
			return 15
		} else {
			return 13
		}
	}


	google_map = new google.maps.Map(document.getElementById('google_map'), {
		center: {
			lat: 38.70724745,
			lng: -77.01014757
		},
		zoom: zoomMap(),
		disableDefaultUI: true,
	});


	// settings of fontawesome icon as symbol on the map

	var symbol = {
		path: "M768 896q0 106 -75 181t-181 75t-181 -75t-75 -181t75 -181t181 -75t181 75t75 181zM1024 896q0 -109 -33 -179l-364 -774q-16 -33 -47.5 -52t-67.5 -19t-67.5 19t-46.5 52l-365 774q-33 70 -33 179q0 212 150 362t362 150t362 -150t150 -362z",
		fillColor: '#ff6e40',
		scale: 1,
		fillOpacity: 1,
		scale: 0.02,
		strokeColor: '#ff6e40',
		strokeWeight: 0,
		rotation: 180,
	};

	// settings of the map marker

	var singleMapMarker = new google.maps.Marker({
		position: {
			lat: 38.7083191,
			lng: -77.02259384
		},
		map: google_map,
		icon: symbol,
	});

	// settings of the map style

	var map_style = [{
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#353535"
      }
    ]
  },
		{
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
      }
    ]
  },
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#757575"
      }
    ]
  },
		{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#212121"
      }
    ]
  },
		{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#757575"
      }
    ]
  },
		{
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#9e9e9e"
      }
    ]
  },
		{
			"featureType": "administrative.land_parcel",
			"stylers": [
				{
					"visibility": "off"
      }
    ]
  },
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#bdbdbd"
      }
    ]
  },
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#757575"
      }
    ]
  },
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#353535"
      }
    ]
  },
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#616161"
      }
    ]
  },
		{
			"featureType": "poi.park",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#1b1b1b"
      }
    ]
  },
		{
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#2c2c2c"
      }
    ]
  },
		{
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#8a8a8a"
      }
    ]
  },
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#575757"
      }
    ]
  },
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#575757"
      }
    ]
  },
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#4e4e4e"
      }
    ]
  },
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#8b8b8b"
      }
    ]
  },
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"weight": "5"
      }
    ]
  },
		{
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#757575"
      }
    ]
  },
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#2b2b2b"
      }
    ]
  },
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#3d3d3d"
      }
    ]
  }];

	// apply style for the map

	google_map.setOptions({
		styles: map_style
	});

}

/* Map settings ends */
