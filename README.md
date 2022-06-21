# Gith / Theikon Converter

This small library is a helper to convert dates from Gith to Theikon, and vice-versa. These are continents from my custom D&D Settings, [Era da Vela](https://eradavela.fandom.com/pt-br/wiki/Era_da_Vela_Wiki). Gith and Theikon are both large continents in the setting, each with its own way of recording time. A theikonean year lasts for 4 of gith's years, and the calendars were created on different eras, meaning their Year Zeroes are different.

All of this makes converting these dates by hand a really stressful task, specially when you have to do a bunch of it at once. So, this helper was born to help with that.

## Installation and usage

This helper doesn't need to be built. Just hit `npm install` or `yarn` to install the dependencies.

To run, hit
`(yarn|npm run) convert [calendar] [target calendar] [day] [month] [year]`.

|Param|Type|Description|
|---|---|---|
|Calendar|String|The calendar from which you want to convert. Can be either `gith` or `theikon`|
|Target calendar|String|The calendar you want the date to be converted to.|
|Day|Number|The date's month day|
|Month|String|The date's month. Needs to be the month's name. You can check they [here](src/constants/calendars.ts).|
|Year|Number|The date's year|

The result is the converted date, printed on the continent's date locale.

### Examples

**Input**: `yarn convert theikon gith 9 deirangheim 1168`

**Output**: 5 Empeço, 2000 Un

---------

**Input**: `yarn convert theikon gith 5 Teas 2000`

**Output**: 3 Martorrente, 5326 Un

-----

**Input**: `yarn convert gith theikon 25 Mês_da_virada 561`

**Output**: 88 Reo, 1/4 809 P

-----

**Input**: `yarn convert gith theikon 12 Sexto 1092`

**Output**: 77 Téam, 4/4 941 P

## Having trouble?

Found an issue? Submit it here on GH or, even better, send your own pull request 😁.
