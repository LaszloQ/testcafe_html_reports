import Page from "../../support/page-model";
import { Selector } from "testcafe";


export const checkboxPage = new Page( );

checkboxPage.path = "/checkboxes";
checkboxPage.firstCheckbox = Selector( "#checkboxes > input" ).nth( 0 );
checkboxPage.secondCheckBox = Selector( "#checkboxes > input" ).nth( 1 );
