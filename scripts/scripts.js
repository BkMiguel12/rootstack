$("#menu-toggle").click(function(e) {
    e.preventDefault();
  $(".wrapper").toggleClass("toggled");
  $(".container-content").toggleClass("container-fluid");
  $(".container-content").toggleClass("container");
  });