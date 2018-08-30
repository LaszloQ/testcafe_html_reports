import { baseUrl } from "../../support/data";
import { checkboxPage } from "./checkbox-page";


  fixture `Checkboxes`
    .page( baseUrl + checkboxPage.path )



  test( "Header should be Checkboxes", async t => {
    const header = await checkboxPage.header.innerText;

    await t.expect( header ).eql( "Checkboxes" )
  });


  test( "Checkbox 2 is selected by default", async t => {
    const isSecondCheckBoxChecked = await checkboxPage.secondCheckBox.checked;

    await t.expect( isSecondCheckBoxChecked ).eql( true )
  });


  test( "Clicking on checkox 1 will select checkbox 1", async t => {
    const isFirstCheckboxCheckedByDefault = await checkboxPage.firstCheckbox.checked;

    await t
      .expect( isFirstCheckboxCheckedByDefault ).eql( false )
      .click( checkboxPage.firstCheckbox )

    const isFirstCheckboxChecked = await checkboxPage.firstCheckbox.checked;

    await t.expect( isFirstCheckboxChecked ).eql( true )
  });


  test( "Clicking on checkbox 2 will deselect checkbox 2", async t => {
    await t
      .click( checkboxPage.secondCheckBox )
      .expect( checkboxPage.secondCheckBox.checked ).eql( true )
  });
