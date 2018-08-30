import { Selector } from "testcafe";
import Page from "../../support/page-model";


export const hoverPage = new Page( );

hoverPage.path = "/hovers";
hoverPage.firstPhoto = Selector( ".figure:first-of-type > img" );
hoverPage.firstPhotoUserName = hoverPage.firstPhoto.sibling( ".figcaption > h5" );
hoverPage.firstPhotoButton = hoverPage.firstPhoto.sibling( ".figcaption > a" )
