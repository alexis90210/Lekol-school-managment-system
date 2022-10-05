import $ from 'jquery'

$(document).ready( () => {
  $(".show-menu-right").click( () => {
    $(".contextMenu").toggleClass("show-contextMenu")
  })
  
})