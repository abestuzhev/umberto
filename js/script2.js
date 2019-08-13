$(document).on('click', '.card_add', function () {
    var el_add = $(this);
    var mod = $(this).parents('.block-commodity-card').find('.mod:checked').attr('data-mod');
    if (mod == undefined) {
        mod = $(this).parents('.block-commodity-card').find('.switch-field').find('.mod').attr('data-mod');
    }
    var action = el_add.attr('data-action');
    var id = el_add.attr('data-id');
    var count = el_add.parents('.block-commodity-card').find('.count').val();
    var maxcount = el_add.parents('.block-commodity-card').find('.count').attr('max');
    $(this).parents('.block-commodity-card').attr('data-count', count);
    var data = {'id': id, 'mod': mod, 'action': action, 'count': count, 'sessid': $('#sessid').val()};
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        // // console.log(res);
        $('#cart_price').text(res.price);
        $('#cart_count').text(res.count);
        if (res.count < 1) {
            el_add.attr('data-action', 'add_cart');
            el_add.html('В корзину');
        } else {
            if (action === 'del_cart') {
                el_add.attr('data-action', 'add_cart');
                el_add.html('В корзину');
            } else {
                el_add.html('Удалить<img src="/local/templates/umberto/img/profile-block5_small.png" class="rotate-img rotate" style="margin-left: -4px; top: 1px;position: absolute; width: auto;" alt="">');
                el_add.attr('data-action', 'del_cart');
                setTimeout(function () {
                    el_add.find('.rotate-img').removeClass('rotate');
                    el_add.find('.rotate-img').fadeOut();
                    setTimeout(function () {
                        el_add.find('.rotate-img').remove();
                    }, 1000);
                }, 2010);
            }
        }

    });
});


$(document).on('click', '.card_add_special', function () {
    var el_add = $(this);
    var action = 'card_add_special';
    var mod = '0';
    var id = el_add.attr('data-id');
    var special_id = el_add.attr('data-special-id');
    var data = {
        'id': id,
        'mod': mod,
        'action': action,
        'special_id': special_id,
        'count': 1,
        'sessid': $('#sessid').val()
    };
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        // // console.log(res);
        $('#cart_price').text(res.price);
        $('#cart_count').text(res.count);
        el_add.prop('disabled', true);
        el_add.html('Заказано <img src="/local/templates/umberto/img/profile-block5_small.png" class="rotate-img rotate" style="margin-left: -4px; top: 1px;position: absolute; width: auto;" alt="">');
        setTimeout(function () {
            el_add.find('.rotate-img').removeClass('rotate');
            el_add.find('.rotate-img').fadeOut();
            setTimeout(function () {
                el_add.find('.rotate-img').remove();
            }, 1000);
        }, 2010);
    });
});


$(document).on('click', '.basket-clozet', function (event) {
    event.preventDefault();
    var el = $(this).parents('.basket--content__bottom');
    var el_add = $(this).parents('.basket--content__bottom').find('.count_cart');
    var mod = $(this).attr('data-mod');
    var action = 'del_cart';
    var id = el_add.attr('data-id');
    var count = el_add.val();
    var data = {'id': id, 'mod': mod, 'action': action, 'count': count, 'sessid': $('#sessid').val()};
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        if (res.count === 0) {
            el.after('<h5 class="emptyCart" style="display: none">Ваша корзина пуста!</h5>');
            $('.emptyCart').slideDown('slow');
            $('.cart_step_one').hide('slow');
        }
        // // console.log(res);
        el.slideUp('slow');
        el.next('.basket-lainer').slideUp('slow');
        $('#cart_price').text(res.price);
        $('#all_cart_summ').text(res.price);
        $('#cart_count').text(res.count);
        setTimeout(function () {
            el.remove();
        }, 1000);
    });
});


$(document).on('click', '.mod', function () {
    var el_mod = $(this);
    var action = 'check_cart';
    var count = el_mod.parents('.block-commodity-card').find('.count').val();
    var but_el = el_mod.parents('.block-commodity-card').find('.card_add');
    var mod = el_mod.attr('data-mod');
    el_mod.parents('.block-commodity-card').attr('data-mod', mod);
    var m_id = el_mod.val();
    el_mod.parents('.block-commodity-card').attr('data-id', m_id);
    but_el.attr('data-id', m_id);
    var price = el_mod.attr('data-price');
    el_mod.parents('.block-commodity-card').find('.price').html(price);
    var data = {'id': m_id, 'mod': mod, 'action': action, 'count': count, 'sessid': $('#sessid').val()};
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        // // console.log(res);
        $('#cart_price').text(res.price);
        $('#cart_count').text(res.count);
        if (res.check_cart === true) {
            but_el.html('Удалить');
            but_el.attr('data-action', 'del_cart');
        } else {
            but_el.attr('data-action', 'add_cart');
            but_el.html('В корзину');
        }
    });
});


$(document).on('click', '.cart_input_count', function () {
    var el_change = $(this).find('.count_cart');
    var mod = el_change.attr('data-mod');
    var action = 'change_count';
    var id = el_change.attr('data-id');
    var count = el_change.val();
    var data = {'id': id, 'mod': mod, 'action': action, 'count': count, 'sessid': $('#sessid').val()};
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        // // console.log(res);
        $('#cart_price').text(res.price);
        $('#all_cart_summ').text(res.price);
        $('#cart_count').text(res.count);

    });
});


$(document).on('change', '.prop_count_cart', function () {
    var el_prop = $(this);
    var id = el_prop.attr('data-id');
    var prop_el_us = $('.del_cart_prop[data-id=' + id + ']');
    if (prop_el_us) {
        prop_el_us.parent('.alert').remove();
    }
    var name = el_prop.parents('.modal-content-big-div').find('.cart_prop_name').text();
    var prop_price = el_prop.parents('.modal-content-big-div').find('.ing_price').text();
    var all_prop_price_el = el_prop.parents('.block-commodity-card').find('.prop_all_price');
    var all_prop_price = all_prop_price_el.text();
    var price_el = el_prop.parents('.block-commodity-card').find('.price');
    var begin_price = price_el.attr('data-bprice');
    var price = price_el.text();
    var count = el_prop.val();
    var allcount = 0;
    allcount = count*1;
    $.each(el_prop.parents('.block-commodity-card').find('.alert'), function (i, e) {
        allcount += $(this).children('.del_cart_prop').attr('data-count')*1;
    });
    var option =  el_prop.parents('.block-commodity-card').find('.prop_count_cart option');
    option.show();
    $.each(option, function (e, i) {
        if ($(this).val()*1 > (5-allcount) && !$(this).is(':selected')) {
            $(this).hide();
        }
    });
    if (allcount >= 5){
        el_prop.parents('.block-commodity-card').find('.prop_count_cart').prop('disabled', true);
    }



    if (count === '0') {
        prop_el_us.parent('.alert').remove();
    } else {
        el_prop.parents('.modal-body-big').find('.prop_cart_after').after('<div class="alert alert-light alert-dismissible" title="' + name + ' ' + count + 'шт.">\n' +
            '<button data-id="' + id + '" data-count="' + count + '" data-price="' + prop_price + '" type="button" class="close close-big del_cart_prop" data-dismiss="alert">Удалить</button>\n' +
            '<div style="width: 73%;white-space: nowrap;overflow: hidden; padding: 5px; text-overflow: ellipsis;">' + name + ' ' + count + ' шт. </div></div>');
    }
    var absprice = update_prop_price(el_prop);
    var absolut_price = absprice + begin_price * 1;
    all_prop_price_el.html(absolut_price);
    price_el.html(absolut_price);
});

function update_prop_price(el) {
    var ap = el.parents('.modal-body-big').find('.alert');
    var APPrice = 0;
    ap.each(function (i, e) {
        var price = $(this).find('.del_cart_prop').attr('data-price');
        var count = $(this).find('.del_cart_prop').attr('data-count');
        APPrice += (price * count);
    });
    return APPrice;
}

$(document).on('click', '.prop_cart_add', function () {
    var el = $(this);
    var mega_father = el.parents('.block-commodity-card');
    var mega_father_id = mega_father.attr('data-id');
    var mega_father_id_main = mega_father.find('.btn-ingredients').attr('data-target');
    var mega_father_mod = mega_father.attr('data-mod');
    var mega_father_count = mega_father.attr('data-count');
    var action = 'add_prop';
    var ap = el.parents('.list_prop_element').find('.alert');
    var prop = {};
    var el_add = mega_father.find('.card_add');
    ap.each(function (i, e) {
        var che_el = $(this).find('.del_cart_prop');
        var che_id = che_el.attr('data-id');
        var che_count = che_el.attr('data-count');
        prop[che_id] = che_count;
    });
    var data = {
        'id': mega_father_id,
        'mod': mega_father_mod,
        'action': action,
        'count': mega_father_count,
        'props': prop,
        'sessid': $('#sessid').val()
    };
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data) {
        var res = JSON.parse(data);
        // // console.log(res);
        $(mega_father_id_main).modal('hide');
        $('#cart_price').text(res.price);
        $('#cart_count').text(res.count);
        if (res.count < 1) {
            el_add.attr('data-action', 'add_cart');
            el_add.html('В корзину');
        } else {
            if (action === 'del_cart') {
                el_add.attr('data-action', 'add_cart');
                el_add.html('В корзину');
            } else {
                el_add.html('Удалить');
                el_add.attr('data-action', 'del_cart');
            }
        }
    });
});

$(document).on('click', '.del_cart_prop', function () {
    var el_prop = $(this);
    var id = el_prop.attr('data-id');
    var el_prop_del;
    var prop_el_us = $('.prop_count_cart[data-id=' + id + ']');

    prop_el_us.each(function (i, e) {
        var thisid = $(this).attr('data-id');
        if ($(this).is(':visible')) {
            el_prop_del = $(this);
            el_prop_del.val(0);

            el_prop_del.parents('.block-commodity-card').find('.prop_count_cart').prop('disabled', false);

            var allcount = 0;
            $.each(el_prop_del.parents('.block-commodity-card').find('.alert'), function (i, e) {
                allcount += $(this).children('.del_cart_prop').attr('data-count')*1;
            });
            var option =  el_prop_del.parents('.block-commodity-card').find('.prop_count_cart option');
            option.show();
            $.each(option, function (e, i) {
                if ($(this).val()*1 > (5-allcount) && !$(this).is(':selected')) {
                    $(this).hide();
                }
            });


            var price_el = el_prop_del.parents('.block-commodity-card').find('.price');
            var all_prop_price_el = el_prop_del.parents('.block-commodity-card').find('.prop_all_price');
            var begin_price = price_el.attr('data-bprice');
            var absprice = update_prop_price(el_prop_del);
            var absolut_price = absprice + (begin_price * 1);
            price_el.html(absolut_price);
            all_prop_price_el.html(absolut_price);
        }
    });
});


$(document).on({
    mouseenter: function () {
        $(this).find('.dropdown-item').show();

    },
    mouseleave: function () {
        $(this).find('.dropdown-item').hide();

    }
}, '.menu-nav-item');


$(document).on('click', '#auth_modal_submit', function (e) {
    e.preventDefault();
    var data = $('#auth_modal').serialize();
    // // console.log(data);
    $.post('/local/ajax/auth.php', data).done(function (data) {
        // // console.log(data);
        if ($("div").is('.auth_modal_error')) {
            $('.auth_modal_error').html('<div class="auth_modal_error" style="text-align: center;">' + data + '</div>');
            if ($('.notetext').text() === 'Вы были успешно зарегистрированы.') {
                $('#myModal').modal('hide');
                window.location.replace('/cabinet');
            } else {
                $('.auth_modal_error').show('slow');
            }

        } else {
            $('#auth_modal').after('<div class="auth_modal_error" style="display: none; text-align: center;">' + data + '</div>');
            if ($('.notetext').text() === 'Вы были успешно зарегистрированы.') {
                $('#myModal').modal('hide');
                window.location.replace('/cabinet');
            } else {
                $('.auth_modal_error').show('slow');
            }
        }

    });
});


$(document).on('click', '#auth_modal_submit_rq', function (e) {
    e.preventDefault();
    var data = $('#auth_modal_rq').serialize();
    // // console.log(data);
    $.post('/local/ajax/auth.php', data).done(function (data) {
        // // console.log(data);
        if ($("div").is('.rq_modal_error')) {
            $('.rq_modal_error').html(data);
        } else {
            $('#auth_modal_rq').after('<div class="rq_modal_error" style="display: none; text-align: center;">' + data + '</div>');
            $('.rq_modal_error').show('slow');
        }

    });
});

$(document).on('click', '#auth_modal_submit_a', function (e) {
    e.preventDefault();
    var data = $('#auth_modal_a').serialize();
    // // console.log(data);
    $.post('/local/ajax/auth.php', data).done(function (data) {
        // // console.log(data);
        if ($("div").is('.auth_modal_error_a')) {
            $('.auth_modal_error_a').html('<div class="auth_modal_error" style="text-align: center;">' + data + '</div>');
            if ($('.errortext').text() === '1') {
                $('#myModal').modal('hide');
                window.location.replace('/cabinet');
            } else {
                $('.auth_modal_error_a').show('slow');
            }
        } else {
            $('#auth_modal_a').after('<div class="auth_modal_error_a" style="display: none; text-align: center;">' + data + '</div>');
            if ($('.errortext').text() === '1') {
                $('#myModal').modal('hide');
                window.location.replace('/cabinet');
            } else {
                $('.auth_modal_error_a').show('slow');
            }
        }

    });
});


$(document).on('input', '#customer_street', function () {
    var word = $(this).val();
    var city = $('select[name=cityId]').val();
    // console.log(city);
    $('#customer_streets').empty();
    $('.address_hidden_blog input[name=customer_house]').val('');
    if (word.length >= 2) {
        var data = {'do': 's', 'word': word, 'cityId' : city};
        $.post('/local/ajax/searchStreet.php', data).done(function (data) {
            var res = JSON.parse(data);
            var des = 0;
            $.each(res, function (i, e) {
                des++;
                if (des <= 10) {
                    $('#customer_streets').append('<option value="' + e.NAME + '" data-id="' + e.PROPERTY_IIKO_ID_VALUE + '"></option>');
                }
            });
        });
    }

});

$(document).on('select', '#customer_streets', function () {
    $('#customer_street').attr('data-id', $("#customer_streets:selected").attr('data-id'));
});


$(document).ready(function () {
    var path = location.pathname;
    if (path === '/basket/checkout.php') {
        $('#checkout_btn').prop('disabled', true);
        // e.preventDefault();
        if ($('#checkout_form')[0].checkValidity()) {
            var data = $('#checkout_form').serializeArray();
            var city = {'name': 'cityname', 'value': $('select [name=cityId] option:selected').text()};
            // console.log(city);
            // setTimeout(function () {
                data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});
                data.push(city);

                data.push({'sessid': $('#sessid').val()});
                // // console.log(data);
                $('#discount_summ').fadeOut();
                $('#all_cart_summ').html('<img src="/local/templates/umberto/img/load.gif" alt="">');

                $.post('/local/ajax/calcCheckRes.php', data).done(function (datar) {
                    var res = JSON.parse(datar);
                    // console.log(res);
                    if (res.problem === null) {
                        $('#checkout_btn').prop('disabled', false);
                        // if (typeof (res.OrderRequest.order) !== undefined) {
                        //     var dis = res.OrderRequest.order.discountOrIncreaseSum;
                        //     var delsum = res.check.deliveryServiceProductInfo !== null && typeof (res.check.deliveryServiceProductInfo) !== "undefined" ? res.check.deliveryServiceProductInfo.productSum : undefined ;
                        //     if (res.OrderRequest.order.paymentItems.length > 1 || res.calculateCheckinResult.availablePayments.length > 0 ) {
                        //         var maxbonus = res.calculateCheckinResult.availablePayments[0].walletInfos[0].maxSum;
                        //         var bonus = res.OrderRequest.order.paymentItems[0].sum;
                        //     } else {
                        //         var maxbonus = undefined;
                        //         var bonus = 0;
                        //     }
                        //     // var maxbonus = res.OrderRequest.order.paymentItems.length > 1 ? res.OrderRequest.order.paymentItems[0].sum : undefined ;
                        //     var sum = res.OrderRequest.order.fullSum;
                        //     // var sum = ;

                        var dis = res.discountOrIncreaseSum;
                        var delsum = res.deliveryServiceProductInfo;
                        var maxbonus = res.maxBonus;
                        var bonus = res.bonus;
                        var sum = res.fullSum;
                            $('#progressbar li').last().addClass('active');

                            if (maxbonus !== null) {
                                $('#maxbonus').attr('disabled', false);
                                $('#maxbonus').val(bonus);
                                $('#maxbonus').attr('max', maxbonus);
                                sum = sum*1 - bonus*1;
                            } else {
                                $('#maxbonus').attr('disabled', true);
                            }

                            if (delsum !== null) {
                                $('#delsum').fadeIn();
                                $('#all_delsum').text(delsum);

                            } else {
                                $('#delsum').fadeOut();
                            }

                            if (dis !== undefined) {
                                $('#discount_summ').fadeIn();
                                $('#all_discount_summ').text(dis.toFixed(1));
                                $('#all_cart_summ').text(sum - dis);
                            } else {
                                $('#discount_summ').fadeOut();
                                $('#all_cart_summ').text(sum);
                            }
                        // }
                        // else {
                        //
                        // }
                    } else {
                        $('#progressbar li').last().removeClass('active');

                        $('#textCheckError').text(res.problem);
                        $('#checkError').modal('show');
                        $('#checkout_btn').prop('disabled', true);
                        if (typeof (res.fullSum) != undefined) {
                            var sum = res.fullSum;
                            $('#all_cart_summ').text(sum);
                        }
                    }

                    // // console.log(res);


                });
            // }, 100);

        }

    }
});

$(document).on('change', 'select[name=cityId]', function () {
    $('#customer_streets').empty();
    $('#customer_street').val('');
    $('input[name=customer_house]').val('');
});


$(document).on('change', '#checkout_form', function (e) {
// $(document).on('input', '#checkout_form input', function (e) {
//     // console.log('123');
    $('#checkout_btn').prop('disabled', true);
    e.preventDefault();
    if ($('#checkout_form')[0].checkValidity()) {
        var data = $('#checkout_form').serializeArray();
        var city = {'name': 'cityname', 'value': $('select[name=cityId] option:selected').text()};
        // console.log(city);
        // setTimeout(function () {
        data.push(city);
            data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});

            data.push({'sessid': $('#sessid').val()});
            // // console.log(data);
            $('#discount_summ').fadeOut();
            $('#all_cart_summ').html('<img src="/local/templates/umberto/img/load.gif" alt="">');

            $.post('/local/ajax/calcCheckRes.php', data).done(function (datar) {
                var res = JSON.parse(datar);
                // console.log(res);
                if (res.problem === null) {
                    $('#checkout_btn').prop('disabled', false);
                    // if (typeof (res.OrderRequest.order) !== undefined) {
                        // var delsum = res.check.deliveryServiceProductInfo !== null && typeof (res.check.deliveryServiceProductInfo) !== "undefined" ? res.check.deliveryServiceProductInfo.productSum : undefined ;
                    var dis = res.discountOrIncreaseSum;
                    var delsum = res.deliveryServiceProductInfo;
                    var maxbonus = res.maxBonus;
                    var bonus = res.bonus;
                    var sum = res.fullSum;

                    // if ((res.OrderRequest.order.paymentItems).length > 1 || (res.calculateCheckinResult.availablePayments).length > 0 ) {
                        //     var maxbonus = res.calculateCheckinResult.availablePayments[0].walletInfos[0].maxSum;
                        //     var bonus = res.OrderRequest.order.paymentItems[0].sum;
                        // } else {
                        //     var maxbonus = undefined;
                        //     var bonus = 0;
                        // }
                        // var maxbonus = res.OrderRequest.order.paymentItems.length > 1 ? res.OrderRequest.order.paymentItems[0].sum : undefined ;
                        // var sum = ;
                        $('#progressbar li').last().addClass('active');

                        if (maxbonus !== null) {
                            $('#maxbonus').attr('disabled', false);
                            $('#maxbonus').val(bonus);
                            $('#maxbonus').attr('max', maxbonus);
                            $('.maxbonus').text(maxbonus);
                            $('.info').fadeIn();
                            sum = sum*1 - bonus*1;
                        } else {
                            $('#maxbonus').attr('disabled', true);
                            $('#maxbonus').val(bonus);

                            $('.info').fadeOut();

                        }

                        if (delsum !== null) {
                            $('#delsum').fadeIn();
                            $('#all_delsum').text(delsum);

                        } else {
                            $('#delsum').fadeOut();
                        }

                        if (dis !== undefined && dis !== null) {
                            $('#discount_summ').fadeIn();
                            $('#all_discount_summ').text(dis.toFixed(1));
                            $('#all_cart_summ').text(sum - dis);
                        } else {
                            $('#discount_summ').fadeOut();
                            $('#all_cart_summ').text(sum);
                        }
                    // }
                    // else {
                    //
                    // }
                } else {
                    $('#progressbar li').last().removeClass('active');

                    $('#textCheckError').text(res.problem);
                    $('#checkError').modal('show');
                    $('#checkout_btn').prop('disabled', true);
                    if (typeof (res.fullSum) != undefined) {
                        var sum = res.fullSum;
                        $('#all_cart_summ').text(sum);
                    }
                }

                // // console.log(res);


            });
        // }, 100);

    }
});


$(document).on('submit', '#checkout_form', function (e) {
    e.preventDefault();
    if ($('#checkout_form')[0].checkValidity()) {
        $('body').prepend('<div id="allLoading" style="    height: 100%;\n' +
            '    width: 100%;\n' +
            '    z-index: 9000;\n' +
            '    position: fixed;\n' +
            '    background-color: #fff;\n' +
            '    opacity: 0.8;"> <div style="display: flex; justify-content: center;padding-top: 40vh;"> <img src="/local/templates/umberto/img/load.gif" alt=""> <p style="    text-align: center;\n' +
            '    margin-top: 21px;\n' +
            '    margin-left: 30px; font-family: ComicSansMS;">Загрузка</p> </div> </div>');
        $(this).css({'background': '#ffdbb9', 'position': 'relative'});
        $(this).html('Отправка<img src="/local/templates/umberto/img/profile-block5_small.png" class="rotate-img rotate" style="margin-left: -4px; top: 1px;position: absolute; width: auto;" alt="">');

        var data = $('#checkout_form').serializeArray();
        data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});
        var city = {'name': 'cityname', 'value': $('select[name=cityId] option:selected').text()};
        // console.log(city);

        data.push(city);
        data.push({'sessid': $('#sessid').val()});
        // // console.log(data);
        $.post('/local/ajax/send_order.php', data).done(function (datar) {
            var res = JSON.parse(datar);
            // // console.log(res);
            if (typeof (res.problem) !== 'undefined') {
                if (res.problem !== '') {
                    $('#allLoading').fadeOut();
                    var modalError = $('#myModal5');
                    modalError.find('.modal-body-center__h-top').text(res.problem);
                    modalError.modal('show');
                } else {
                    if (typeof (res.formUrl) !== 'undefined') {
                        if (res.formUrl !== '') {
                            window.location.href = res.formUrl;
                        }
                    } else {
                        $('#allLoading').fadeOut();
                        var modalOk = $('#myModal12');
                        modalOk.find('#orderNum').text(res.OrderRequest.order.externalId);
                        modalOk.modal('show');
                        modalOk.on('hidden.bs.modal', function (e) {
                            window.location.href = '/';
                        });
                    }
                }
            } else {
                if (typeof (res.formUrl) !== 'undefined') {
                    if (res.formUrl !== '') {
                        window.location.href = res.formUrl;
                    }
                } else {
                    $('#allLoading').fadeOut();
                    var modalOk = $('#myModal12');
                    modalOk.find('#orderNum').text(res.OrderRequest.order.externalId);
                    modalOk.modal('show');
                    modalOk.on('hidden.bs.modal', function (e) {
                        window.location.href = '/';
                    });
                }
            }

        });

    } else {
        $('#checkout_form').prepend('<p class="error" style="text-align: center; color: red; font-size: 20px;">Заполните форму корректно</p>');
        $('html, body').animate({scrollTop: $('#checkout_form').offset().top}, 500);
    }


});


$(document).on('click', '#checkout_btn', function (e) {
    e.preventDefault();
    if ($('#checkout_form')[0].checkValidity()) {
        $('body').prepend('<div id="allLoading" style="    height: 100%;\n' +
            '    width: 100%;\n' +
            '    z-index: 9000;\n' +
            '    position: fixed;\n' +
            '    background-color: #fff;\n' +
            '    opacity: 0.8;"> <div style="display: flex; justify-content: center;padding-top: 40vh;"> <img src="/local/templates/umberto/img/load.gif" alt=""> <p style="    text-align: center;\n' +
            '    margin-top: 21px;\n' +
            '    margin-left: 30px; font-family: ComicSansMS;">Загрузка</p> </div> </div>');
        $(this).css({'background': '#ffdbb9', 'position': 'relative'});
        $(this).html('Отправка<img src="/local/templates/umberto/img/profile-block5_small.png" class="rotate-img rotate" style="margin-left: -4px; top: 1px;position: absolute; width: auto;" alt="">');

        var data = $('#checkout_form').serializeArray();
        data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});
        data.push({'sessid': $('#sessid').val()});
        // // console.log(data);
        $.post('/local/ajax/send_order.php', data).done(function (datar) {
            var res = JSON.parse(datar);
            // // console.log(res);
            if (typeof (res.problem) !== 'undefined') {
                if (res.problem !== '') {
                    $('#allLoading').fadeOut();
                    var modalError = $('#myModal5');
                    modalError.find('.modal-body-center__h-top').text(res.problem);
                    modalError.modal('show');
                } else {
                    if (typeof (res.formUrl) !== 'undefined') {
                        if (res.formUrl !== '') {
                            window.location.href = res.formUrl;
                        }
                    } else {
                        $('#allLoading').fadeOut();
                        var modalOk = $('#myModal12');
                        modalOk.find('#orderNum').text(res.OrderRequest.order.externalId);
                        modalOk.modal('show');
                        modalOk.on('hidden.bs.modal', function (e) {
                            window.location.href = '/';
                        });
                    }
                }
            } else {
                if (typeof (res.formUrl) !== 'undefined') {
                    if (res.formUrl !== '') {
                        window.location.href = res.formUrl;
                    }
                } else {
                    $('#allLoading').fadeOut();
                    var modalOk = $('#myModal12');
                    modalOk.find('#orderNum').text(res.OrderRequest.order.externalId);
                    modalOk.modal('show');
                }
            }

        });

    } else {
        $('#checkout_form').prepend('<p class="error" style="text-align: center; color: red; font-size: 20px;">Заполните форму корректно</p>');
        $('html, body').animate({scrollTop: $('#checkout_form').offset().top}, 500);
    }


});


$(document).on('click', '.wock-next-step', function () {
    var el = $(this);
    var step = el.attr('data-step');
    var text = el.attr('data-text');
    var dtext = $('.wock-block__h');
    dtext.fadeOut();
    dtext.text(text);
    dtext.fadeIn();
    $('#wok_step' + step).fadeOut('slow');
    var nstep = (step * 1) + 1;
    $('#wok_step' + nstep).fadeIn('slow');
    $('.s' + nstep).addClass('active');
});


$(document).on('click', '.wock-back-step', function () {
    var el = $(this);
    var step = el.attr('data-step');
    var text = el.attr('data-text');
    var dtext = $('.wock-block__h');
    dtext.fadeOut();
    dtext.text(text);
    dtext.fadeIn();
    $('#wok_step' + step).fadeOut('slow');
    var nstep = (step * 1) - 1;
    $('#wok_step' + nstep).fadeIn('slow');
    $('.s' + step).removeClass('active');
    $('.s' + nstep).addClass('active');
});

$(document).on('click', '.add_wok_construct', function () {
    var el = $(this);
    var fel = $(this).parents('.wock-block__div-border');
    var id = fel.attr('data-id');
    var name = fel.find('.wok_name').text();
    var action = fel.attr('data-action');
    var step = fel.attr('data-step');
    var price = fel.attr('data-price');
    if (action === 'add') {
        fel.attr('data-action', 'del');
        el.text('Удалить');
        $('#wok_step4').prepend(' <div class="wock-block__div-border added_wok_prop" data-step="' + step + '" data-id="' + id + '" data-price="' + price + '">\n' +
            '            <div class="row">\n' +
            '                <div class="col-xl-7 col-lg-7 col-md-6">\n' +
            '                    <p class="wock-block__div-border__p">' + name + '</p>\n' +
            '                </div>\n' +
            '                <div class="col-xl-5 col-lg-5 col-md-6">\n' +
            '<span style=" color: #ff7e00;   font-family: ComicSansMS;">Цена: ' + price + ' руб.</span>\n' +
            '                    <button class="btn wock-block__div-border-btn change_wok_prop">Изменить</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>');
        if (step === '1') {
            var step1 = $('#wok_step1');
            var dis = step1.find('.wock-block__div-border');
            $.each(dis, function (i, o) {
                if ($(o).attr('data-action') === 'add') {
                    $(o).find('.add_wok_construct').prop('disabled', true);
                }
            });
            step1.fadeOut();
            $('#wok_step2').fadeIn();
            $('.s2').addClass('active');
        }

        if (step === '2') {
            let butst2 = $('#wok_step2').find('.wock-next-step');
            butst2.fadeIn();
            butst2.prop('disabled', false);
            let elstep2 = $('.added_wok_prop[data-step=2]');

            if (elstep2.length >= 3) {

                let butaddst2 = $('#wok_step2').find('.wock-block__div-border[data-action=add]').find('.add_wok_construct');
                butaddst2.prop('disabled', true);


            }
        }

        if (step === '3') {
            var step3 = $('#wok_step3');
            var dis3 = step3.find('.wock-block__div-border');
            $.each(dis3, function (i, o) {
                if ($(o).attr('data-action') === 'add') {
                    $(o).find('.add_wok_construct').prop('disabled', true);
                }
            });
            step3.fadeOut();
            $('#wok_step4').fadeIn();
            $('.s4').addClass('active');
        }

        var allprice = $('#wok_allprice');
        var nowprice = allprice.text();
        var newprice = (nowprice * 1) + (price * 1);
        allprice.text(newprice);
    } else {
        $('.added_wok_prop[data-id=' + id + ']').remove();
        fel.attr('data-action', 'add');
        el.text('Добавить');
        if (step === '1') {
            $('#wok_step1').find('.add_wok_construct').prop('disabled', false);
        }
        if (step === '2') {
            let elstep2 = $('.added_wok_prop[data-step=2]');
            let butaddst2 = $('#wok_step2').find('.wock-block__div-border[data-action=add]').find('.add_wok_construct');
            butaddst2.prop('disabled', false);


        }
        if (step === '3') {
            $('#wok_step3').find('.add_wok_construct').prop('disabled', false);
        }
        var allprice = $('#wok_allprice');
        var nowprice = allprice.text();
        var newprice = (nowprice * 1) - (price * 1);
        allprice.text(newprice);
    }


});


$(document).on('click', '.change_wok_prop', function () {
    var el = $(this);
    var fel = el.parents('.added_wok_prop');
    var step = fel.attr('data-step');
    $('#wok_step4').fadeOut();
    $('#wok_step' + step).fadeIn();
    $('.s').removeClass('active');
    $('.s' + step).addClass('active');
    var i = step;
    while (i > 0) {
        $('.s' + i).addClass('active');
        i--;
    }
});


$(document).ready(function () {
    $("#myModal52").modal('show');
    setTimeout(function () {
        $("#myModal52").modal('hide');
    }, 10000);
    $('#close').click(function () {
        $('#myModal52').modal('hide');
    });


    $("#myModal333").modal('show');
    // setTimeout(function () {
    //     $("#myModal333").modal('hide');
    // }, 10000);
    $('#close').click(function () {
        $('#myModal333').modal('hide');
    });


    $('input[name=customer_phone]').mask('+7(999)999-99-99');
    $('input[name=phone]').mask('+7(999)999-99-99');
    $('input[name=user_tell]').mask('+7(999)999-99-99');
    $('input[type=tel]').mask('+7(999)999-99-99');
    $('input[name=login]').mask('+7(999)999-99-99');


});


$(document).on('click', '.custom-control-input', function () {
    var filter_name = $('.custom-control-input:checked');
    $('#demo4 input[type=radio]').prop('checked', false);
    var filter = [];
    var cart_block = $('.product-item-small-card');
    filter_name.each(function (i, o) {
        filter.push($(this).val());
    });
    var ff = filter.length;
    if (ff > 0) {
        cart_block.fadeOut();
        cart_block.each(function (i, o) {
            var text_cart = $(this).find('.block-commodity-card-p').text().toLowerCase();
            var dof = 0;
            filter.forEach(function (ii, oo) {
                var word = ii.toLowerCase();
                var reg = new RegExp(word);
                if (text_cart.match(reg)) {
                    dof++;
                }
            });
            if (ff === dof) {
                $(o).fadeIn();
            }
        });
    } else {
        cart_block.fadeIn();
    }
});


$(document).on('change', '.customradio input[name=order_type]', function () {

    if ($(this).val() === "true") {
        // // console.log($(this).val());
        $('.address_hidden_blog').fadeOut();
        $('.required').prop('required', false);
        setTimeout(function () {
            $('.required_nohidden_blog').removeClass('col-xl-6 col-lg-6');
            $('.required_nohidden_blog').addClass('col-xl-12 col-lg-12');
        }, 500);

    } else {
        $('.address_hidden_blog').fadeIn();
        $('.required').prop('required', true);
        $('.required_nohidden_blog').removeClass('col-xl-12 col-lg-12');
        $('.required_nohidden_blog').addClass('col-xl-6 col-lg-6');
    }


});
$(document).on('change', '#demo4 input[type=radio]', function () {
    $('.custom-control-input').prop('checked', false);
    var el = $(this);
    var filter_val = el.val();
    var cart_block = $('.product-item-small-card');

    if (filter_val !== 'on') {
        cart_block.fadeOut();
        var filter_arr = JSON.parse(filter_val);
        // // console.log(filter_arr);
        cart_block.each(function (i, o) {
            var el = $(this);

            var el_id = $(this).find('.block-commodity-card').attr('data-id');
            if (filter_arr.indexOf(el_id) !== -1) {
                el.fadeIn();
            } else {
                el.fadeOut();
            }

        });
    } else {
        cart_block.fadeIn();
    }

});


$(document).on('click', '#wok_add', function () {
    var el = $(this);
    var fel = $('#wok_step4');
    var action = 'wok_add';
    var main_id = fel.find('.main_wok_base').attr('data-id');
    var count = 1;
    var mod = 0;
    var props = {};
    var sous = {};
    var arel = fel.find('.added_wok_prop');
    arel.each(function (i, e) {
        var che_el = $(this);
        var che_id = che_el.attr('data-id');
        var step_id = che_el.attr('data-step');
        props[che_id] = 1;


    });
    var data = {
        'id': main_id,
        'mod': mod,
        'action': action,
        'count': count,
        'props': props,
        'sous': sous,
        'sessid': $('#sessid').val()
    };
    // // console.log(data);
    $.post('/local/ajax/cart.php', data).done(function (data_res) {
        var res = JSON.parse(data_res);
        // // console.log(res);
        $('#cart_price').text(res.price);
        $('#cart_count').text(res.count);
        el.prop('disabled', true);
        el.text('В корзине');
    });
});


$(document).on('input', '#searchRow', function (e) {
    $('#customer_search').empty();
    $('#customer_search').attr('size', '0');
    var word = $('#searchRow').val();
    // // console.log(word);
    if (word.length >= 2) {
        $('#customer_streets').empty();
        var data = {'do': 'sr', 'word': word};
        $.post('/local/ajax/searchRow.php', data).done(function (data) {
            var res = JSON.parse(data);
            var des = 0;
            $('#customer_search').empty();
            // // console.log(res);
            if (res !== null) {
                $.each(res, function (i, e) {
                    des++;
                    if (des <= 10) {
                        $('#customer_search').append('<option class="click_search" data-href="/catalog/?SECTION_ID=' + e.IBLOCK_SECTION_ID + '#' + e.ID + '" value="' + e.NAME + ' Состав: ' + e.PREVIEW_TEXT + '" data-id="' + e.ID + '">' + e.NAME + '</option>');
                    }
                });
                $('#customer_search').fadeIn();
                if (des > 10) {
                    $('#customer_search').attr('size', '10');
                } else {
                    $('#customer_search').attr('size', des);
                }
            } else {
                $('#customer_search').append('<option class="click_search" >Ничего не найдено</option>');
                $('#customer_search').fadeIn();
                $('#customer_search').attr('size', '2');
            }

        });
    } else {
        $('#customer_search').attr('size', '0');
        $('#customer_search').fadeOut();
    }
});


$(document).on('change', '#customer_search', function () {
    $(this).fadeOut();
    window.location.href = $('#customer_search option:selected').attr('data-href');

});

$(document).on('click', '#customer_search', function () {
    $(this).fadeOut();
    window.location.href = $('#customer_search option:selected').attr('data-href');
    setTimeout(function () {
        giveOnSearch();
    }, 1000);
});

function giveOnSearch() {
    $('body,html').scrollTop(0);
    var hash = location.hash;
    if ($(hash).length) {
        var top = $(hash).offset().top - 270;
        $('body,html').animate({scrollTop: top}, 1500);
        $(hash).parents('.block-commodity-card').addClass('hoverCard');
        setTimeout(function () {
            $(hash).parents('.block-commodity-card').removeClass('hoverCard');
        }, 30000);
    }
}

$(document).ready(function () {
    $('body,html').scrollTop(0);
    var hash = location.hash;
    // // console.log(hash);
    if ($(hash).length) {
        var top = $(hash).offset().top - 450;
        $('body,html').animate({scrollTop: top}, 1500);
        $(hash).parents('.block-commodity-card').addClass('hoverCard');
        setTimeout(function () {
            $(hash).parents('.block-commodity-card').removeClass('hoverCard');
        }, 30000);
    }
});

$('input[type=file]').on('change', function () {
    var el = $(this);
    var size = this.files[0].size;
    var type = this.files[0].type;
    // // console.log(type);
    if (type === 'image/jpeg' || type === 'image/png' || type === 'application/pdf') {
        if (5000000 < size) {
            alert('Файл слишком большой! Найдите фотографию меньше чем 5MB');
            $(this).val('');
        }
    } else {
        // // console.log(type);
        alert('Данный вид файла не поддерживается! Принимаем файлы в формате "JPEG","PNG","PDF"');
        $(this).val('');
    }
});


$(document).on('click', '#updateStreetBut', function (e) {
    e.preventDefault();
    var el = $(this);
    var data = $('#updateStreetForm').serializeArray();
    data.push({'name': 'action', 'value': 'updateAdresses'});
    data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});
    // // console.log(data);
    $.post('/cabinet/updateInfo.php', data).done(function (dataR) {
        var res = JSON.parse(dataR);
        if (!$('#mes').length > 0) {
            el.after('<p class=" modal-footer__p" id="mes" style="display:none;">Ваши данные сохранены</p>');
            $('#mes').fadeIn();
        }
        setTimeout(function () {
            $('#myModal14').modal('hide');
        }, 3000);
    });
});


$(document).on('click', '#addStreetBut', function (e) {
    e.preventDefault();
    var el = $(this);
    var data = $('#addStreetForm').serializeArray();
    data.push({'name': 'action', 'value': 'addAdresses'});
    data.push({'name': 'street_id', 'value': $('#customer_streets').find('option').attr('data-id')});
    // // console.log(data);
    $.post('/cabinet/updateInfo.php', data).done(function (dataR) {
        var res = JSON.parse(dataR);
        if (!$('#mesa').length > 0) {
            el.after('<p class=" modal-footer__p" id="mesa" style="display:none;">Ваши данные сохранены</p>');
            $('#mesa').fadeIn();
        }
        setTimeout(function () {
            $('#myModal142').modal('hide');
        }, 3000);
    });
});


$(document).on('click', '#updateDataBut', function (e) {
    e.preventDefault();
    var el = $(this);
    var data = $('#updateDataForm').serializeArray();
    data.push({'name': 'action', 'value': 'updateUser'});
    // // console.log(data);
    $.post('/cabinet/updateInfo.php', data).done(function (dataR) {
        var res = JSON.parse(dataR);
        // // console.log(res);
        if (!$('#mesD').length > 0) {
            el.after('<p class=" modal-footer__p" id="mesD" style="display:none;">Ваши данные сохранены</p>');
            $('#mesD').fadeIn();
        }
        setTimeout(function () {
            $('#myModal10').modal('hide');
        }, 3000);
    });
});

$(document).on('click', '.repeat_order', function () {
    var el = $(this);
    $('.repeat_order').prop('disabled', true);
    $('body').prepend('<div id="allLoading" style="    height: 100%;\n' +
        '    width: 100%;\n' +
        '    z-index: 9000;\n' +
        '    position: fixed;\n' +
        '    background-color: #fff;\n' +
        '    opacity: 0.8;"> <div style="display: flex; justify-content: center;padding-top: 40vh;"> <img src="/local/templates/umberto/img/load.gif" alt=""> <p style="    text-align: center;\n' +
        '    margin-top: 21px;\n' +
        '    margin-left: 30px; font-family: ComicSansMS;">Загрузка</p> </div> </div>');
    var order_id = el.attr('data-order-id');
    var data = {'order_id': order_id, 'action': 'repeat_order', 'sessid': $('#sessid').val()};
    // // console.log(data);
    $.post('/local/ajax/repeat_order.php', data).done(function (dataR) {
        var res = JSON.parse(dataR);
        // // console.log(res);
        window.location.href = '/basket/index.php';
    });
});

$(document).on('ready', function () {
    var loading = false;
    $(window).scroll(function () {
        if ($('#infinity-next-page').size() && !loading) {
            if ($(window).scrollTop() + 100 >= $(document).height() - $(window).height()) {
                loading = true;
                $.get($('#infinity-next-page').attr('href'), {is_ajax: 'y'}, function (data) {
                    $('#infinity-next-page').after(data);
                    $('#infinity-next-page').remove();
                    loading = false;
                });
            }
        }
    });
});


$(window).on("scroll", function () {
    var scrolled = $(this).scrollTop();
    if (window.innerWidth >= 1024) {
        if (scrolled > 50) {
            // // console.log($('.navbar').hasClass('scrolled'));
            $('.navbar').addClass('scrolled');
            $('#catalog').css({'margin-top': '85px'});
            // $('.navbar').nextAll('.container').css({'margin-top' : '150px'});

            $('.scrolled_line').removeClass('col-xl-7 col-lg-7');
            $('.collapse').css('width', 'max-content');
            $('.col-padding-head').css({
                'width': 'max-content',
                'position': 'absolute',
                'right': '0',
                'margin-top': '-37px'
            });
            $('.scrolled .container').css({'position': 'relative'});
            $('.scrool_fade').fadeOut('fast');

            $('.navbar').animate({height: '53'}, 0.7);

        }
        if (scrolled <= 50) {
            $('.col-padding-head').css({
                'width': 'max-content',
                'position': 'inherit',
                'right': '0',
                'margin-top': '0'
            });
            $('.scrolled .container').css({'position': 'inherit'});
            $('.navbar').removeClass('scrolled');
            $('#catalog').css({'margin-top': 'auto'});

            // $('.navbar').nextAll('.container').css({'margin-top' : '0'});
            $('.scrolled_line').addClass('col-xl-7 col-lg-7');

            $('.scrool_fade').fadeIn('fast');
            $('.navbar').animate({height: '150'}, 0.7);


        }
    } else {
        // // console.log(scrolled);
        if (scrolled > 50) {
            // // console.log($('.navbar').hasClass('scrolled'));
            $('.navbar').addClass('scrolled');
            $('#catalog').css({'margin-top': '150px'});

            $('.collapse').css('width', 'max-content');
            $('.navbar-toggler').css({'right' : '-15%', 'top': '-8px'});
            $('.navbar').css({'min-height': 'max-content',  'padding-top': '30px',
            'padding-bottom': '30px'});
            $('.col-padding-head').css({
                'width': 'max-content',
                'position': 'absolute',
                'right': '0',
                'margin-top': '-45px'
            });
            $('.scrolled .container').css({'position': 'relative'});
            $('.scrool_fade').fadeOut('fast');
            $('.navbar').animate({height: '50'}, 0.7);
        }
        if (scrolled <= 50) {
            $('.col-padding-head').css({
                'width': '-webkit-fill-available',
                'position': 'inherit',
                'right': '0',
                'margin-top': '0'
            });
            $('.navbar-toggler').css('right', '1%');

            $('.scrolled .container').css({'position': 'inherit'});
            $('.navbar').removeClass('scrolled');
            $('#catalog').css({'margin-top': 'auto'});

            $('.scrool_fade').fadeIn();
            $('.navbar').animate({height: '300'}, 0.7);
        }
    }
});

$(document).on('click', '.basket-div', function () {
    window.location.href = '/basket/'
});
