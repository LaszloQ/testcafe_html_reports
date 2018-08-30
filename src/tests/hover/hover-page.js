import { Selector } from "testcafe";
import Page from "../../support/page-model";


export const hoverPage = new Page( );

hoverPage.path = "/hovers";
hoverPage.firstPhoto = Selector( ".figure:first-of-type > img" );
hoverPage.firstPhotoUserName = Selector(".figure:first-of-type > img + .figcaption > h5" );
hoverPage.firstPhotoButton = Selector( ".figure:first-of-type > img + .figcaption > a" );
