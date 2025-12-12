(function ($) {
	$.fn.extend({
		smartpaginator: function (options) {
			var settings = $.extend({
				keyName: '.js-smartpaginator',
				totalrecords: 0,
				recordsperpage: 0,
				length: 3,
				next: '次へ',
				prev: '前へ',
				first: '最初へ',
				last: '最後へ',
				initval: 1,
				datacontainer: '', //data container id
				dataelement: '' //children elements to be filtered e.g. tr or div
			}, options);
			return this.each(function () {
				// console.log(settings.totalrecords);
				if(!$(this).hasClass('pager')){
					var currentPage = 0;
					var startPage = 0;
					var totalpages = parseInt(settings.totalrecords / settings.recordsperpage);
					if (settings.totalrecords % settings.recordsperpage > 0) totalpages++;
					var initialized = false;
					var container = $(this).addClass('pager');
					container.find('ul').remove();
					container.find('div').remove();
					container.find('span').remove();
					var dataContainer;
					var dataElements;
					if (settings.datacontainer != '') {
						dataContainer = $('.' + settings.datacontainer);
						dataElements = $('' + settings.dataelement + '', dataContainer);
					}
					var list = $('<ul/>');
					var btnPrev = $('<p/>').text(settings.prev).click(function () { if ($(this).hasClass('is-disabled')) return false; currentPage = parseInt(list.find('li a.is-active').text()) - 1; navigate(--currentPage); scrollTop(); }).addClass('btn').addClass('is-prev');
					var btnNext = $('<p/>').text(settings.next).click(function () { if ($(this).hasClass('is-disabled')) return false; currentPage = parseInt(list.find('li a.is-active').text()); navigate(currentPage); scrollTop(); }).addClass('btn').addClass('is-next');
					var btnFirst = $('<p/>').text(settings.first).click(function () { if ($(this).hasClass('is-disabled')) return false; currentPage = 0; navigate(0); scrollTop(); }).addClass('btn').addClass('is-first');
					var btnLast = $('<p/>').text(settings.last).click(function () { if ($(this).hasClass('is-disabled')) return false; currentPage = totalpages - 1; navigate(currentPage); scrollTop(); }).addClass('btn').addClass('is-last');
					container.append(btnFirst).append(btnPrev).append(list).append(btnNext).append(btnLast);
					var inputPage = $('<input/>').attr('type', 'text').keydown(function (e) {
						if (isTextSelected(inputPage)) inputPage.val('');
						if (e.which >= 48 && e.which < 58) {
							var value = parseInt(inputPage.val() + (e.which - 48));
							if (!(value > 0 && value <= totalpages)) e.preventDefault();
						} else if (!(e.which == 8 || e.which == 46)) e.preventDefault();
					});
					container.append(btnFirst).append(btnPrev).append(list).append(btnNext).append(btnLast);
					if (settings.display == 'single') {
						inputPage.css('display', 'none');
					}
					function showLabels(pageIndex) {
						$(settings.keyName).find('span').remove();
						$(settings.keyName + ' ul').after($('<span/>').addClass('is-pageCount').text(currentPage+1+'/'+totalpages));
					}
					function buildNavigation(startPage) {
						$(settings.keyName + ' ul').each(function(){
							var list = $(this);
							list.find('li').remove();
							if (settings.totalrecords > settings.recordsperpage) {
								for (var i = startPage; i < startPage + settings.length; i++) {
									if (i == totalpages) break;
									list.append($('<li/>')
										.append($('<a>').attr('id', (i + 1)).addClass('normal')
										.attr('href', 'javascript:void(0)')
										.text(i + 1))
										.click(function () {
											currentPage = startPage + $(this).closest('li').prevAll().length;
											navigate(currentPage);
											scrollTop();
										}));
								}
								list.find('li a').removeClass('is-active');
								list.find('li:eq(0) a').addClass('is-active');
								//set width of paginator
								// var width = 0;
								// list.find('li').each(function(){
								// 	var sW = $(this).find('a').outerWidth() + (parseInt($(this).css('margin-left')) * 2);
								// 	// console.log(sW);
								// 	width = width + sW;
								// });
								// if(list.is(':visible')){
								// 	list.css({ width: width });
								// }
								showRequiredButtons(startPage);
							} else {
								container.remove();
							}
							showLabels(startPage);
							inputPage.val((startPage + 1));
							list.find('li a').addClass(settings.theme).removeClass('is-active');
							list.find('li:eq(0) a').addClass(settings.theme).addClass('is-active');
							//set width of paginator
							// var width = 0;
							// list.find('li').each(function(){
							// 	var sW = $(this).find('a').outerWidth() + (parseInt($(this).css('margin-left')) * 2);
							// 	width = width + sW;
							// });
							// if(list.is(':visible')){
							// 	// list.css({ width: width });
							// }
							showRequiredButtons(startPage);
						});
					}
					function navigate(topage) {
						//make sure the page in between min and max page count
						var index = topage;
						var mid = settings.length / 2;
						if (settings.length % 2 > 0) mid = (settings.length + 1) / 2;
						var startIndex = 0;
						if (topage >= 0 && topage < totalpages) {
							if (topage >= mid) {
								if (totalpages - topage > mid)
									startIndex = topage - (mid - 1);
								else if (totalpages > settings.length)
									startIndex = totalpages - settings.length;
							}
							buildNavigation(startIndex); showLabels(currentPage);
							$(settings.keyName + ' ul').find('li a').removeClass('is-active');
							inputPage.val(currentPage + 1);
							$(settings.keyName + ' ul').find('li a[id="' + (index + 1) + '"]').addClass('is-active');
							var recordStartIndex = currentPage * settings.recordsperpage;
							var recordsEndIndex = recordStartIndex + settings.recordsperpage;
							if (recordsEndIndex > settings.totalrecords)
								recordsEndIndex = settings.totalrecords % recordsEndIndex;
							if (initialized) {
								if (settings.onchange != null) {
									settings.onchange((currentPage + 1), recordStartIndex, recordsEndIndex);
								}
							}
							if (dataContainer != null) {
								if (dataContainer.length > 0) {
									//hide all elements first
									dataElements.css('display', 'none');
									//display elements that need to be displayed
									if ($(dataElements[0]).find('th').length > 0) { //if there is a header, keep it visible always
										$(dataElements[0]).css('display', '');
										recordStartIndex++;
										recordsEndIndex++;
									}
									for (var i = recordStartIndex; i < recordsEndIndex; i++)
										$(dataElements[i]).css('display', '');
								}
							}

							showRequiredButtons();
						}
					}
					function showRequiredButtons() {
						if (currentPage > 0) {
							$(settings.keyName + ' p.is-prev').css('display', '').removeClass('is-disabled');
							$(settings.keyName + ' p.is-first').css('display', '').removeClass('is-disabled');
						}
						else {
							$(settings.keyName + ' p.is-prev').css('display', '').addClass('is-disabled');
							$(settings.keyName + ' p.is-first').css('display', '').addClass('is-disabled');
						}

						if (currentPage == totalpages - 1) {
							$(settings.keyName + ' p.is-next').css('display', '').addClass('is-disabled');
							$(settings.keyName + ' p.is-last').css('display', '').addClass('is-disabled');
						}
						else {
							$(settings.keyName + ' p.is-next').css('display', '').removeClass('is-disabled');
							$(settings.keyName + ' p.is-last').css('display', '').removeClass('is-disabled');
						}
					}
					function scrollTop() {
						var position = $('.m-single').offset().top - $('header').outerHeight() - 50;
						$('body , html').animate({scrollTop:position}, 300);
						// if (!$('body').hasClass('case') && !$('body').hasClass('garden')) {
						//     $(".articleList p.pic img:visible").imageScale();
						// }
					}
					buildNavigation(startPage);
					if (settings.initval == 0) settings.initval = 1;
					currentPage = settings.initval - 1;
					navigate(currentPage);
					initialized = true;
				}
			});
		}
	});
})(jQuery);
