function search() {
  let query = $('#search').val()
  let search = EbayAdapter.search(query)
  search.then(function(auctions) {
    $('#results').empty()
    if (auctions) {
      auctions.forEach(auction => {
        var item = createItem(auction)
        // TO DO: replace append argument with Handlebars HTML rendering
        $('#results').append(
          `<a href="${item.linkURL}" target="_blank">
            <div class="thumbnail col-sm-4">
              <img src="${item.imgURL}" style="max-width: 100%;">
              <div class="caption">
                <h5>${item.description}</h5>
                <b>$${item.price}</b> from ${item.place}
                <div id='time${item.id}'"></div>
              </div>
            </div>
          </a>`
        )

        var timeId = $(`#time${item.id}`)
        startTimer(item.time, timeId)
      })
    } else {
      $('#results').append('<hr><h2>No matches found!</h2>')
    }
  })

  function startTimer(duration, timeId) {
      var start = Date.now(), diff, hours, minutes, seconds
      function timer() {
          diff = duration - (((Date.now() - start) / 1000) | 0)

          hours = (diff / (3600)) | 0
          minutes = ((diff % 3600) / 60) | 0
          seconds = (diff % 60) | 0
          hours = hours < 10 ? "0" + hours : hours
          minutes = minutes < 10 ? "0" + minutes : minutes
          seconds = seconds < 10 ? "0" + seconds : seconds

          $(timeId).text("(" + minutes + ":" + seconds + ")").css('font-size', '150%')

          if (seconds <= 10) {
            $(timeId).css('color', 'red')
          }

          if(seconds <= 0){
            clearInterval(interval)
          }
      }
      var interval = setInterval(timer, 500)
  }


  function createItem(auction){
    var linkURL = auction.viewItemURL[0]
    var imgURL = auction.pictureURLLarge[0]
    var description = auction.title[0]
    var time = (new Date(auction.listingInfo[0].endTime[0]) - new Date()) / 1000
    var price = auction.sellingStatus[0].currentPrice[0]['__value__']
    var place = auction.location[0].split(",").join(", ")
    return new Item(linkURL, imgURL, description, time, price, place)
  }
}
