const obj = require( "../reports/result.json" );
const getTotalDuration = require( "./total_duration.js" );
const formatTime = require( "format_time.js" );
const fixtures = obj.fixtures;


const getNumberOfFailedTests = function( ) {
  const failed = [ ];

  for( let i = 0; i < fixtures.length; i++ ) {
    const tests = fixtures[ i ].tests;

    for( let j = 0; j < tests.length; j++ ) {
      if( tests[ j ].errs.length > 0 ) {
        failed.push( tests[ j ].errs[ 0 ] )
      }
    }
  }

  return failed.length;
};


const getNumberOfTotalTests = function( ) {
  return obj.total + getNumberOfFailedTests( );
};


export const results = {
  general: {
    user_agent: obj.userAgents[ 0 ],
    total_test: getNumberOfTotalTests( ),
    total_duration: formatTime( getTotalDuration( ) ),
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
      "durationMs": formatTime ( test.durationMs ),
      "screenshotPath": test.screenshotPath,
      "skipped": test.skipped
    })
  })
};
