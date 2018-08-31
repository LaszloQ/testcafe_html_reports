const obj = require( "../reports/result.json" );
const getTotalDuration = require( "./total_duration.js" );


const getNumberOfFailedTests = function( ) {
  return obj.total - ( obj.skipped + obj.passed )
};


const fixtures = obj.fixtures;
export const results = {
  general: {
    user_agent: obj.userAgents[ 0 ],
    total_test: obj.total,
    total_duration: formatTime( getTotalDuration( ) ), //getTotalDuration( ),
    passed: obj.passed,
    failed: getNumberOfFailedTests( ),
    skipped: obj.skipped
  },
  fixtures: [

  ]
};


for( let i = 0; i < fixtures.length; i++ ) {
  results.fixtures[ i ] = { }
  results.fixtures[ i ].name = fixtures[ i ].name;
  results.fixtures[ i ].path = fixtures[ i ].path;
  results.fixtures[ i ].tests = [ ];

  const tests = fixtures[ i ].tests;

  tests.forEach( function( test ) {
    results.fixtures[ i ].tests.push({
      "name": test.name,
      "errs": test.errs,
      "durationMs": formatTime ( test.durationMs) ,
      "screenshotPath": test.screenshotPath,
      "skipped": test.skipped
    })
  })
};
