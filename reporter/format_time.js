const obj = require( "../reports/result.json" );

export const formatTime = function( )
{

    const hrs = Math.floor(durationMs / 3600);
    const mins = Math.floor((durationMs % 3600) / 60);
    const secs = Math.floor(durationMs % 60);

    return hrs +"h " + mins + "m " + secs + "s ";
}
