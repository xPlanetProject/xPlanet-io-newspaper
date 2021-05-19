var seconds = 100 //单位秒
var box_obj = document.getElementById('marketConttent')
var distance =
  box_obj.width ||
  box_obj.clientWidth ||
  box_obj.offsetWidth ||
  box_obj.scrollWidth
console.log(distance)
var i = 0

function start() {
  i--
  if (i <= -distance) {
    i = 2 * distance
    document.getElementById('marketConttent').style.right = -distance + 'px'
  } else {
    var now_left = i >= distance ? i - distance : i
    document.getElementById('marketConttent').style.left = now_left + 'px'
  }
  setTimeout(start, 10)
}

function getMarket() {
  $.get('/api/market/latest', function (res, status) {
    console.log(res)
    if (res.code == 200) {
      const { data } = res
      let htmlString = ''
      for (let index = 0; index < data.length; index++) {
        const item = data[index]
        htmlString += `
          <div class="coin">${
            item.symbol
          } <span>$${item.quote.USD.price.toFixed(2)}</span></div>
        `
      }
      $('#marketConttent').html(htmlString)
      setTimeout(start, seconds)
    }
  })
}

$('#open').on({
  click: function () {
    $('.menu .menu-list').css('right', '0px')
    $('body').css('overflow', 'hidden')
  }
})

$('#close').on({
  click: function () {
    $('.menu .menu-list').css('right', '-100%')
    $('body').css('overflow', 'auto')
  }
})

getMarket()
