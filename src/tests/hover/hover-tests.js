import { baseUrl } from "../../support/data";
import { hoverPage } from "./hover-page";


  fixture `Hover`
    .page( baseUrl + hoverPage.path )



  test( "Header should be Hovers", async t => {
    await t.expect( hoverPage.header.innerText ).eql( "Hovers" )
  });


  test( "Hovering any photo will display the username", async t => {
    await t
      .hover( hoverPage.firstPhoto )
      .expect( hoverPage.firstPhotoUserName.visible ).eql( true )
      .expect( hoverPage.firstPhotoUserName.innerText ).eql( "user1" )
  });


  test( "Hovering any photo will display the view profile button", async t => {
    await t
      .hover( hoverPage.firstPhoto )
      .expect( hoverPage.firstPhotoButton.visible ).eql( true )
      .expect( hoverPage.firstPhotoButton.innerText ).eql( "View profile" )
  });
