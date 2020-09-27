const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
const TOKEN = '1361176827:AAGjvnOZJcUcNvNUUstmcmP5h4PfN67dBcM'
const request = require('request');
const getGirls = require('./girls')
console.log('Bot has been started...')

const bot = new TelegramBot(TOKEN, {
    polling: true
})

let days = [
  'vsk',
  'pn',
  'vt',
  'sr',
  'cht',
  'pt',
  'sb'
];
let d = new Date()
let n = d.getDay()
let s = d.getDay() + 1
console.log(n)
console.log(s)


bot.onText(/\/start/, msg => {
    const { id } = msg.chat

    bot.sendMessage(id, `Приветствуем вас, ${msg.from.first_name}`, {
      reply_markup: {
        keyboard: [
          ['Клубы'],
          ['Девушки'],
          ['C видео'],
        ]
      }
    })
})




//================================== Clubs buttons

bot.onText(/Клубы/, msg => {
    const { id } = msg.chat

    bot.sendMessage(id, 'Какой клуб?', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'В Василеостровском районе',
            callback_data: 's1'
          }],
          [{
            text: 'В Выборгском районе (коттедж)',
            callback_data: 's2'
          }],
          [{
            text: 'В Адмиралтейском районе',
            callback_data: 's3'
          }],
          [{
            text: 'В Центральном районе',
            callback_data: 's4'
          }],
          [{
            text: 'В Приморском районе',
            callback_data: 's5'
          }],
          [{
            text: 'На площади Восстания (VIP)',
            callback_data: 's6'
          }],
        ]
      }
    })
})


//================================== Girls buttons
bot.onText(/Девушки/, msg => {
  const { id } = msg.chat

  bot.sendMessage(id, 'Какой клуб?', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'В Василеостровском районе',
          callback_data: 'g1'
        }],
        [{
          text: 'В Выборгском районе (коттедж)',
          callback_data: 'g2'
        }],
        [{
          text: 'В Адмиралтейском районе',
          callback_data: 'g3'
        }],
        [{
          text: 'В Центральном районе',
          callback_data: 'g4'
        }],
        [{
          text: 'В Приморском районе',
          callback_data: 'g5'
        }],
        [{
          text: 'На площади Восстания (VIP)',
          callback_data: 'g6'
        }],
      ]
    }
  })
})


bot.onText(/C видео/, msg => {
  const { id } = msg.chat

    var options = {}
    options.url='https://rayvspb.com/wp-json/wp/v2/posts?per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.video != '') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption:  'https://rayvspb.com/'+item.slug})
              }
          }

        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(id, subgirls[i])
            i++
        }
    })
})

//================================== Choose

bot.on('callback_query', query => {
  //bot.answerCallbackQuery(query.id, `${query.data}`)
  const { chat, message_id, text } = query.message

  switch (query.data) {
    //================================== Выводим выбранный салон
    case 's1':

            function s1() {
              bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, 15 линия д 58, Василеостровский район\n\n тел: +79313504532\n\n УВАЖАЕМЫЕ ГОСТИ И ПОСТОЯННЫЕ ПОСЕТИТЕЛИ НАШИХ ЗАВЕДЕНИЙ РАДЫ ВАМ СООБЩИТЬ ОБ ОТКРЫТИИ НОВОГО «RAЯ» ВОЗЛЕ МЕТРО ВАСИЛЕОСТРОВСКАЯ И МЕТРО ПРИМОРСКАЯ. ЭТИ ОЧЕНЬ УЮТНЫЕ ТРЕХКОМНАТНЫЕ АПАРТАМЕНТЫ РАСПОЛОЖЕНЫ НЕДАЛЕКО ОТ БОЛЬШОГО ПРОСПЕКТА, НА 15 ЛИНИИ ВАСИЛЬЕВСКОГО ОСТРОВА. КАЖДАЯ КОМНАТА ОСНАЩЕНА МАЛЕНЬКОЙ КУХНЕЙ, КРОВАТЯМИ «XXL» РАЗМЕРА И КОНДИЦИОНЕРАМИ ДЛЯ ПОЛНЕЙШЕГО ВАШЕГО КОМФОРТА. \n\nТАК ЖЕ ИМЕЕТСЯ СВОЯ ПАРКОВКА ДЛЯ ПОСТОЯННЫХ ПОСЕТИТЕЛЕЙ.')
            }
            setTimeout(s1, 500);
            
    break

    //================================== Выводим выбранный салон
    case 's2':
        bot.sendMediaGroup(chat.id, [
          {
            type: 'photo',
            media: 'https://sun9-3.userapi.com/f2-L9BCsL4BFCNysLk2K9uNq-8F1MDOK93ozYA/GYBiZMAubG8.jpg',
            caption: '+79219314721',
          },
          {
            type: 'photo',
            media: 'https://sun9-41.userapi.com/rWuv6IV6m2O4WlaBHLOvY9xm-cl7AKYagU6BRQ/oy0KPI934kY.jpg',
            caption: '+79219314721',
          },
          {
            type: 'photo',
            media: 'https://sun9-8.userapi.com/S9QNXErhg_uTJyZ4dTEKL40ZExR3cLXqJasVdA/ZFru037wH8s.jpg',
            caption: '+79219314721',
          },
          {
            type: 'photo',
            media: 'https://sun9-38.userapi.com/QVp_-iTcwo567KxYloqYn4ix7qtRJ2mt7v2Tsw/nsvK37xSw1A.jpg',
            caption: '+79219314721',
          },
          {
            type: 'photo',
            media: 'https://sun9-19.userapi.com/f5Udu3S0qEzwt8ctEHnMl107FS2Zqy8gcUBfRg/nuDR4-2keWU.jpg',
            caption: '+79219314721',
          },
        ])
        
        function s2() {
          bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, Выборгский район, Вологодская 52 (Метро Озерки или Удельная)\n\n Тел: +79219314721 \n\nПРИГЛАШАЕМ ВАС В НАШ ШИКАРНЫЙ КОТТЕДЖ РАСПОЛОЖЕННЫЙ В ПОСЕЛКЕ ПАРГОЛОВО, В ВЫБОРГСКОМ РАЙОНЕ, НЕДАЛЕКО ОТ СТАНЦИЙ МЕТРО ПРОСПЕКТ ПРОСВЕЩЕНИЯ И МЕТРО ПАРНАС. КОТТЕДЖ СОСТОИТ ИЗ ТРЕХ ЭТАЖЕЙ, НА КАЖДОМ ИЗ НИХ ЕСТЬ ОТДЕЛЬНЫЙ САНУЗЕЛ. ВСЕ КОМНАТЫ ОСНАЩЕНЫ КОНДИЦИОНЕРАМИ И КРОВАТЯМИ РАЗМЕРА «XXL» ТАК ЖЕ НА ТЕРРИТОРИИ КОТТЕДЖА ЕСТЬ ОТДЕЛЬНО СТОЯЩАЯ РУССКАЯ БАНЯ НА ДРОВАХ, В КОТОРОЙ ВЫ МОЖЕТЕ ПОПАРИТЬСЯ С НАШИМИ КРАСОТКАМИ ИЛИ ПРОСТО ПРИЕХАТЬ И СКИНУТЬ СТРЕСС С ДУБОВЫМИ И БЕРЕЗОВЫМИ ВЕНИКАМИ, КОТОРЫЕ ЕСТЬ ВСЕГДА В ПРОДАЖЕ\n\n ТАК ЖЕ ИМЕЕТСЯ СВОЯ ПАРКОВКА ДЛЯ ПОСТОЯННЫХ ПОСЕТИТЕЛЕЙ.')
        }
        setTimeout(s2, 1500);
    break


    case 's3':
        bot.sendMediaGroup(chat.id, [
          {
            type: 'photo',
            media: 'https://sun9-62.userapi.com/dGAhpwZVZGikp1c-puhf9fmCKkpp1dVHCQBu_A/_GkjX1WKcOA.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-20.userapi.com/a9c6wt9gCC0lyOfgCNjf0Xm-BmMAeYKSq-MVXA/uTQpv4u8IdY.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-37.userapi.com/rbGTBBJvH-1CqiavGqi1RPPEys_wXSpMQqnQ-g/_eM6puy7u64.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-37.userapi.com/7zQGAv01ttKckpIZQ7Ibvb8-LdiA_rukJkQUQw/eJREqrUuz2Y.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-26.userapi.com/uZlvuAy56mi51mK3RC5WKJibyGjsppT0hcledw/KKeF4NEt8j4.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-55.userapi.com/8L5O_JbP3V6Elrf4br_2x53cWwv_rAo-SC5H2g/XVMbEtwRr1w.jpg',
            caption: '+7(931)5380586',
          },
          {
            type: 'photo',
            media: 'https://sun9-59.userapi.com/U2jzy7g3j2beahY0nCAB17Hi-Fyzi3D5sBjwEw/EwNCsOt9mJo.jpg',
            caption: '+7(931)5380586',
          },
        ])
        
        function s3() {
          bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, Адмиралтейский район, Набережная реки Фонтанки д. 165\n\n +7(931)5380586 \n\nШИКАРНЫЕ АПАРТАМЕНТЫ В САМОМ СЕРДЦЕ САНКТ-ПЕТЕРБУРГА ГОТОВЫ ВСТРЕТИТЬ КАК И ЖИТЕЛЕЙ ТАК И ГОСТЕЙ НАШЕЙ СЕВЕРНОЙ СТОЛИЦЫ. НАШИ ШИКАРНЫЕ, РАСКОШНЫЕ И МОЛОДЫЕ КОШЕЧКИ ПОМУРЛЫКАЮТ И НЕ ТОЛЬКО ВАМ…ЖДЕМ ВАС НА ФОНТАНКЕ В ЛЮБОЕ ВРЕМЯ ДНЯ И НОЧИ. ЭТО ЗАВЕДЕНИЕ РАСПОЛОЖЕНО В 10 МИНУТАХ ОТ СТАНЦИИ МЕТРО ТЕХНОЛОГИЧЕСКИЙ ИНСТИТУТ И В 10 МИНУТАХ ОТ СТАНЦИИ МЕТРО СПАССКАЯ.')
        }
        setTimeout(s3, 1500);
    break



    case 's4':
        bot.sendMediaGroup(chat.id, [
          {
            type: 'photo',
            media: 'https://sun9-32.userapi.com/3RmqK9ylrcVTtsGGoRxbvlb-CFUHkg2SrivGaA/7vSmGIzv4WA.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-45.userapi.com/yL7u6lis4twZ4SsJHmw3k50Ab7OIS6xGBXcNhQ/o7gdtkGTPQw.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-20.userapi.com/pdA29IayJbI2DRLB_9iN_PnSQ1R9ycI6aF2O3g/4d5CO5ZtDvU.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-32.userapi.com/3RmqK9ylrcVTtsGGoRxbvlb-CFUHkg2SrivGaA/7vSmGIzv4WA.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-74.userapi.com/7HQ2XcVWV1a7J6uRxjhHujf164K0QYvCwgJxCA/P_HEZmtX6_Y.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-28.userapi.com/b6saqLNlD68v4VkPNpwnYY8wuTtuEnpN0pOgXQ/bhpxjGPu7no.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-48.userapi.com/fnmmsWE4azIvn0D7JO3Tv1EBougp_6qZMbUjnQ/4h4VXeOQifw.jpg',
            caption: '+79217737731',
          },
          {
            type: 'photo',
            media: 'https://sun9-65.userapi.com/21HyNtuiHAFpjsXxmZsHHFTQe0DdFbXTHSsJig/b7hrGOwrPRA.jpg',
            caption: '+79217737731',
          },
        ])
        
        function s4() {
          bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, Центральный район, Литейный 16 \n\n+79217737731 \n\nНемного опишем наш уютный салон на Литейном проспекте в Центральном районе Санкт-Петербурге. Ну во первых это очень доступное место , в пешей доступности от станции метро Чернышевская и метро Владимирская. Салон из 5 уютных комнат, каждая комната оборудована своим сан узлом, кондиционером, кроватями размера «XXL»и мини кухней , что не мало важно для вашего спокойного отдыха. Дружелюбный персонал, милые администраторы и шикарные девчонки подарят Вам самый незабываемый отдых, тишину спокойствие и домашний уют.')
        }
        setTimeout(s4, 1500);
    break


    case 's5':
        bot.sendMediaGroup(chat.id, [
          {
            type: 'photo',
            media: 'https://sun9-39.userapi.com/eZ2gf8AYAYWmUGpmDloVpJ5vmLuBQeE5gJIWJQ/nGOZjn8yvg4.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-2.userapi.com/7vq-1wG9w_yL2YFF3HQLiOTa24LvgHfBWwJurw/BI0mTxh62AE.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-45.userapi.com/P4P6J8AvZegkt5Tboq4-eM96lJq9IRDJTDiwdA/u0JEUGt4Jyg.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-46.userapi.com/DUAgpGoxCDvH2NZQh1tpIM1dpHTU4q6U3q-IzQ/KyIKT7QSz9U.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-70.userapi.com/MYT9xGEh9ab3EeIIK0ktJvvnUhyCiol5ih55Jg/h1iqaHKaQ0A.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-33.userapi.com/7jjZwy6wmGae_uvxypCLro9QMvcgAwHIYCmaCA/BXRQ2-W-0cI.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-38.userapi.com/uk2E33td-Rhxw0RF9mRKu97JRlQ6Ul48Sa6OUQ/JcLKmskUIyw.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-25.userapi.com/buy-Znxh8NaNpGkAUq4dN11JwhZBxsLVQ9FAOQ/9ira7i5s_ws.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-2.userapi.com/IYr61ayx3G8XWt-qsDZt3e64M3yGYMBx2Hf66Q/4OOZ2hlG7D0.jpg',
            caption: '+79218827307',
          },
          {
            type: 'photo',
            media: 'https://sun9-56.userapi.com/_LhMftLZB7AtqRXVn2hpp72cLkTo6Ww8MLE4iQ/aSI-wzyBVxM.jpg',
            caption: '+79218827307',
          },

        ])
        
        function s5() {
          bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, Комендантский проспект 51, корп. 1 \n\n+79218827307 \n\nУникальные апартаменты с отдельным входом и уникальным дизайнерским ремонтом. Такого VIP салона вы еще не видели в Санкт-Петербурге. Каждая комната оснащена душевой кабиной, кондиционером, кроватями размера «XXL», установлена регулируемая подсветка и пилон, на котором наши красотки устроят Вам незабываемое шоу по вашему желанию. Показная с барной стойкой и мягкими диванам на которых Вы можете спокойно посидеть выпить элитные горячительные напитки и насладиться обществом наших прелестных, загорелых, сексуальных и общительных милашек.')
        }
        setTimeout(s5, 1500);
    break


    case 's6':
        bot.sendMediaGroup(chat.id, [
          {
            type: 'photo',
            media: 'https://sun9-40.userapi.com/9kjGP2XDV2SWrgtyU56ufiFKIiiWRKH5Qy-8Iw/2A3G_MAMeK0.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-2.userapi.com/eFdsUP8NrIpXSs5DAYq7n9ChXJOPCYNo0RN0JQ/224ZAOlntsE.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-12.userapi.com/-KxKdcDmVe3fLI8wMktv5EY14mMlUXBDeAhBhg/_aOuNWrRssc.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-73.userapi.com/2U7LMb5BO973f7NevFO3bzQsOYf6MiOhJVY7pg/amAydHvGCOI.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-61.userapi.com/eZDSUesokOe269zYDpgZyCFSFZntiycZjAHsTA/sWfq6B3e8jc.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-56.userapi.com/6u9IT9B1bX8xReCPiA0AjOMwVkhHrE1Fq0yVJg/CTxlTnC7nLs.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-34.userapi.com/-Tm2wmycTP6nKo1iTwVLNY8tj6MuPfHZRdsgfQ/1o9QIbQPoSM.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-4.userapi.com/xeYqW1GHFx62SVUvBeEFCHcRcbxhA0e7E2ObSg/Tbu3BUk7p44.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-69.userapi.com/1k13x-DwgYV8-YNM2ZGYqqyMIhklonp3Q52T_w/MmvTDrh24Xk.jpg',
            caption: '+79312446548',
          },
          {
            type: 'photo',
            media: 'https://sun9-69.userapi.com/Y0qKPe8-zN4yetH4O88VKncCxF_0gEFP6jE7qQ/ks1a0HmBxAI.jpg',
            caption: '+79312446548',
          },
        ])
        
        function s6() {
          bot.sendMessage(chat.id, 'Адрес: г. Санкт-Петербург, Мытнинская дом 8, Центральный район \n\n тел: +79312446548\n\n УВАЖАЕМЫЕ ГОСТИ НАШИХ ЗАВЕДЕНИЙ РАДЫ ВАМ СООБЩИТЬ ОБ ОТКРЫТИИ НОВОГО ЗАВЕДЕНИЯ В ЦЕНТРАЛЬНОМ РАЙОНЕ. КЛУБ РАСПОЛОЖЕН В ПЕШЕЙ ДОСТУПНОСТИ ОТ СТАНЦИИ МЕТРО ПЛОЩАДЬ ВОССТАНИЯ. РОСКОШЬ КРАСОТА И УЮТ НЕ ОСТАВЯТ ВАС БЕЗ ВНИМАНИЯ, НЕКОТОРЫЕ КОМНАТЫ ОСНАЩЕНЫ СВОИМИ ВАННЫМИ КОМНАТАМИ. НАШИ ШИКАРНЫЕ КРАСОТКИ ВСТРЕТЯТ ВАС В СЕМИКОМНАТНЫХ АПАРТАМЕНТАХ КЛАССА «LUX» И ОТПРАВЯТ В МИР БЛАЖЕНСТВА И НАСЛАЖДЕНИЯ.')
        }
        setTimeout(s6, 1500);
    break

    //================================== Выводим время работы
    case 'g1':
      // bot.sendMessage(chat.id, ` `, {
      //   reply_markup: {
      //     remove_keyboard: true
      //   }
      // })

      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g1w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g1w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g1w3'
            }],
          ]
        }
      })
    break

    //================================== Выводим время работы
    case 'g2':
      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g2w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g2w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g2w3'
            }],
          ]
        }
      })
    break

    case 'g3':
      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g3w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g3w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g3w3'
            }],
          ]
        }
      })
    break

    case 'g4':
      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g4w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g4w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g4w3'
            }],
          ]
        }
      })
    break


    case 'g5':
      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g5w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g5w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g5w3'
            }],
          ]
        }
      })
    break


    case 'g6':
      bot.sendMessage(chat.id, 'Когда работают?', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Сегодня',
              callback_data: 'g6w1'
            }],
            [{
              text: 'Завтра',
              callback_data: 'g6w2'
            }],
            [{
              text: 'Все девушки (много фотографий)',
              callback_data: 'g6w3'
            }],
          ]
        }
      })
    break

    //================================== Выводим девушек из Василеостровского
    case 'g1w1': 
        var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=six&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

              if (n == '1') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (n == '2') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (n == '3') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }


              if (n == '4') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }


              if (n == '5') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (n == '6') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (n == '7') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


    case 'g1w2': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=six&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

              if (s == '1') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (s == '2') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (s == '3') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }


              if (s == '4') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }


              if (s == '5') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (s == '6') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              if (s == '7') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }
              }

              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


    case 'g1w3': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=six&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

                for(var item of arr) {
                    if((item.acf.bigphoto != '')) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79313504532',})
                    }
                }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break




    //================================== Выводим девушек из Выборского
    case 'g2w1': 
        var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=one&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

              if (n == '1') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (n == '2') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (n == '3') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }


              if (n == '4') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }


              if (n == '5') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (n == '6') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (n == '7') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


    case 'g2w2': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=one&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

              if (s == '1') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (s == '2') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (s == '3') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }


              if (s == '4') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }


              if (s == '5') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (s == '6') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              if (s == '7') {
                for(var item of arr) {
                    if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }
              }

              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


    case 'g2w3': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=one&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

                for(var item of arr) {
                    if((item.acf.bigphoto != '')) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79219314721',})
                    }
                }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


  //================================== Выводим девушек из Адмиралтейского
  case 'g3w1': 
  var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=two&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (n == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (n == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (n == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }


        if (n == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }


        if (n == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (n == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (n == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }


        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
break


case 'g3w2': 
    var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=two&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (s == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (s == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (s == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }


        if (s == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }


        if (s == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (s == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        if (s == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
              }
          }
        }

        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
  break


  case 'g3w3': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=two&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

                for(var item of arr) {
                    if((item.acf.bigphoto != '')) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+7(931)5380586',})
                    }
                }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


  //================================== Выводим девушек из Центрального
  case 'g4w1': 
  var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=three&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (n == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (n == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (n == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }


        if (n == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }


        if (n == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (n == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (n == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }


        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
break


case 'g4w2': 
    var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=three&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (s == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (s == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (s == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }


        if (s == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }


        if (s == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (s == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        if (s == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
              }
          }
        }

        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
  break


  case 'g4w3': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=three&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

                for(var item of arr) {
                    if((item.acf.bigphoto != '')) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79217737731',})
                    }
                }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break




  //================================== Выводим девушек из Приморского
  case 'g5w1': 
  var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=four&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (n == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (n == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (n == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }


        if (n == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }


        if (n == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (n == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (n == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }


        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
break


case 'g5w2': 
    var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=four&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

        if (s == '1') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (s == '2') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (s == '3') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }


        if (s == '4') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }


        if (s == '5') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (s == '6') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        if (s == '7') {
          for(var item of arr) {
              if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
              }
          }
        }

        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
  break

  case 'g5w3': 
          var options = {}
          options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=four&per_page=100'
          options.method='GET'
          var promise = new Promise((resolve,reject)=>{
              request(options, function (error, response,body) {
                  if(response){
                      resolve(body) 
                  }
                  else reject()
                  });
          })
          promise.then((result)=>{
              //console.log(result);
              var arr = JSON.parse(result);
              var girls = []

                for(var item of arr) {
                    if((item.acf.bigphoto != '')) {
                    girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79218827307',})
                    }
                }


              var size = 10; //размер подмассива
              var subgirls = []; //массив в который будет выведен результат.
              
              for (var i = 0; i <Math.ceil(girls.length/size); i++){
                  subgirls[i] = girls.slice((i*size), (i*size) + size);
              }

              var i = 0;
              while (i < subgirls.length) {
                  bot.sendMediaGroup(chat.id, subgirls[i])
                  i++
              }
          })
    break


    //================================== Выводим девушек на плоащи Восстания
    case 'g6w1': 
    var options = {}
      options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=five&per_page=100'
      options.method='GET'
      var promise = new Promise((resolve,reject)=>{
          request(options, function (error, response,body) {
              if(response){
                  resolve(body) 
              }
              else reject()
              });
      })
      promise.then((result)=>{
          //console.log(result);
          var arr = JSON.parse(result);
          var girls = []
  
          if (n == '1') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (n == '2') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (n == '3') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
  
          if (n == '4') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
  
          if (n == '5') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (n == '6') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (n == '7') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
  
          var size = 10; //размер подмассива
          var subgirls = []; //массив в который будет выведен результат.
          for (var i = 0; i <Math.ceil(girls.length/size); i++){
              subgirls[i] = girls.slice((i*size), (i*size) + size);
          }
  
          var i = 0;
          while (i < subgirls.length) {
              bot.sendMediaGroup(chat.id, subgirls[i])
              i++
          }
      })
  break
  
  
  case 'g6w2': 
      var options = {}
      options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=five&per_page=100'
      options.method='GET'
      var promise = new Promise((resolve,reject)=>{
          request(options, function (error, response,body) {
              if(response){
                  resolve(body) 
              }
              else reject()
              });
      })
      promise.then((result)=>{
          //console.log(result);
          var arr = JSON.parse(result);
          var girls = []
  
          if (s == '1') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.pn != 'вых') && (item.acf.pn != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (s == '2') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.vt != 'вых') && (item.acf.vt != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (s == '3') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.sr != 'вых') && (item.acf.sr != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
  
          if (s == '4') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.cht != 'вых') && (item.acf.cht != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
  
          if (s == '5') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.pt != 'вых') && (item.acf.pt != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (s == '6') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.sb != 'вых') && (item.acf.sb != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          if (s == '7') {
            for(var item of arr) {
                if((item.acf.bigphoto != '') && (item.acf.vsk != 'вых') && (item.acf.vsk != 'отпуск') ) {
                girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
                }
            }
          }
  
          var size = 10; //размер подмассива
          var subgirls = []; //массив в который будет выведен результат.
          
          for (var i = 0; i <Math.ceil(girls.length/size); i++){
              subgirls[i] = girls.slice((i*size), (i*size) + size);
          }
  
          var i = 0;
          while (i < subgirls.length) {
              bot.sendMediaGroup(chat.id, subgirls[i])
              i++
          }
      })
    break


    case 'g6w3': 
    var options = {}
    options.url='https://rayvspb.com/wp-json/acf/v3/posts?filter[meta_key]=salonas&filter[meta_value]=five&per_page=100'
    options.method='GET'
    var promise = new Promise((resolve,reject)=>{
        request(options, function (error, response,body) {
            if(response){
                resolve(body) 
            }
            else reject()
            });
    })
    promise.then((result)=>{
        //console.log(result);
        var arr = JSON.parse(result);
        var girls = []

          for(var item of arr) {
              if((item.acf.bigphoto != '')) {
              girls.push({ type: 'photo', media: item.acf.bigphoto ,caption: item.acf.name + '\n' + '+79312446548',})
              }
          }


        var size = 10; //размер подмассива
        var subgirls = []; //массив в который будет выведен результат.
        
        for (var i = 0; i <Math.ceil(girls.length/size); i++){
            subgirls[i] = girls.slice((i*size), (i*size) + size);
        }

        var i = 0;
        while (i < subgirls.length) {
            bot.sendMediaGroup(chat.id, subgirls[i])
            i++
        }
    })
break





}
  bot.answerCallbackQuery({
    callback_query_id:query.id
  })

})


bot.on('callback_query', query => {
  //bot.sendMessage(query.message.chat.id, debug(query))
  
})