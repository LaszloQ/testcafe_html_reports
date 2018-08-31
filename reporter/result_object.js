const obj = require( "../reports/result.json" );
const getTotalDuration = require( "./total_duration.js" );
const formatTime = require( "./format_time.js" );
const fixtures = obj.fixtures;


const getNumberOfFailedTests = function( ) {
  return obj.total - obj.passed;
};


const getNumberOfTotalTests = function( ) {
  return obj.total + obj.skipped;
};


const isTestPassed = function( skipped, errors ) {
  if( !skipped && errors.length === 0 ) {
    return true
  } else {
    return false
  }
};


const isTestFailed = function( skipped, errors ) {
  if( !skipped && errors.length > 0 ) {
    return true
  } else {
    return false
  }
};


const isFixtureFailed = function( fixture ) {
  const tests = fixture.tests;
  let boolean;

  for( let i = 0; i < tests.length; i++ ) {
    if( tests[i].failed ) {
      return true
    } else {
      boolean = false
    }
  }

  return boolean
};


const isFixtureSkipped = function( fixture ) {
  const tests = fixture.tests;
  let bool;

  for( let i = 0; i < tests.length; i++ ) {
    if( tests[ i ].skipped ) {
      bool = true
    } else {
      return false
    }
  }
};


const isFixturePassed = function( fixture ) {
  if( !fixture.failed && !fixture.skipped ) {
    return true
  }
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
      "durationMs": formatTime( test.durationMs ),
      "screenshotPath": test.screenshotPath,
      "skipped": test.skipped,
      "passed": isTestPassed( test.skipped, test.errs ),
      "failed": isTestFailed( test.skipped, test.errs )
    })
  })

  results.fixtures[ i ].skipped = isFixtureSkipped( results.fixtures[ i ] )
  results.fixtures[ i ].failed = isFixtureFailed( results.fixtures[ i ] )
  results.fixtures[ i ].passed = isFixturePassed( results.fixtures[ i ] )
};
