let store = {items: [], sellers: []};

$(function() {
  $('#submit').on('click', function() {
    event.preventDefault()
    search()
  })

  $('#history').on('click', function() {
    event.preventDefault()

    let history = store.items
    $('#results').empty()

    history.forEach(item => {
      const src = $('#auction-template').html()
      const template = Handlebars.compile(src)
      const auctionThumbnail = template(item)
      $('#results').append(auctionThumbnail) 
    })
  })
})

function search() {
  let query = $('#search').val()
  let search = EbayAdapter.search(query)
  search.then(function(auctions) {
    $('#results').empty()
    if (auctions) {
      var items = auctions.map(auction => {
        return createItem(auction)
      })

      items.forEach(item => {
        displayItem(item.id)  
      })
    } else {
      $('#results').append('<hr><h2>No matches found!</h2>')
    }
  })
}