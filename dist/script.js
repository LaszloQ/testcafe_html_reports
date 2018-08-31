var fixtures = document.querySelectorAll(".fixture");

fixtures.forEach( function ( fixture ) {
  var button = fixture.querySelector( "button" );
  button.addEventListener( "click", function( ) {
    fixture.classList.toggle( "hide-fixture" );
  });

  var testsContainer = document.querySelectorAll( ".test-container");
  testsContainer.forEach( function ( test ) {
    var button = test.querySelector( "button" );
    button.addEventListener( "click", function( ) {
      test.classList.toggle( "hide-test");
    });
  });
});
