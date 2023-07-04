# Fênetre CLDR-data
Npm module containing Unicode CLDR JSON data:

[Unicode CLDR JSON]: http://cldr.unicode.org/index/cldr-spec/json.

Uses the Unicode provided npm packages and on installation converts these to files contained within this package.
The cldr-core package is directly placed within the root of the package.
All other cldr packages (cldr-dates-modern) are merged in the main folder of this package, by mergin all their language/region specific folders found within the main folders of each package.

Combines:

- cldr-core
- cldr-numbers-modern
- cldr-dates-modern

## Credits

[Originally based on ](https://github.com/rxaviers/cldr-data-npm)