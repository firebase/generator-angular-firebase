# AngularFire + ExpressJS generator

> Yeoman generator for AngularJS + Firebase SDK 3.0 (and AngularFire) with a minimalist ExpressJS.

## Usage

For step-by-step instructions on using Yeoman and this generator to build a TODO AngularJS application from scratch see [this tutorial.](http://yeoman.io/codelab/)

Install `yo`, `grunt`, `bower`, `generator-angularfire-express` and `generator-karma`:
```
npm install -g generator-angularfire
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angularfire-express`, optionally passing an app name:
```
yo angularfire-express [app-name]
```

Run `grunt` for building and `grunt serve` for preview


## Generators

Available generators:

* [angularfire](#app) (aka [angularfire-express:app](#app))
* [angularfire-express:controller](#controller)
* [angularfire-express:directive](#directive)
* [angularfire-express:filter](#filter)
* [angularfire-express:route](#route)
* [angularfire-express:service](#service)
* [angularfire-express:provider](#service)
* [angularfire-express:factory](#service)
* [angularfire-express:value](#service)
* [angularfire-express:constant](#service)
* [angularfire-express:decorator](#decorator)
* [angularfire-express:view](#view)

### App
Sets up a new AngularJS + Firebase SDK 3.0 + ExpressJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Firebase authentication and account management, Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

Example:
```bash
yo angularfire-express
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo angularfire-express:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

**Explicitly provide route URI**

Example:
```bash
yo angularfire-express:route myRoute --uri=my/route
```

Produces controller and view as above and adds a route to `app/scripts/app.js`
with URI `my/route`

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo angularfire-express:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo angularfire-express:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo angularfire-express:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
angular.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo angularfire-express:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo angularfire-express:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myMod').service('myService', function () {
  // ...
});
```

You can also do `yo angularfire-express:factory`, `yo angularfire-express:provider`, `yo angularfire-express:value`, and `yo angularfire-express:constant` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo angularfire-express:decorator serviceName
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```javascript
angular.module('myMod').config(function ($provide) {
    $provide.decorator('serviceName', function ($delegate) {
      // ...
      return $delegate;
    });
  });
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

***(To find more options go to [generator-angular repository](https://github.com/yeoman/generator-angular)***

### CoffeeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript.

For example:
```bash
yo angularfire-express:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
angular.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

A project can mix CoffeScript and JavaScript files.

To output JavaScript files, even if CoffeeScript files exist (the default is to output CoffeeScript files if the generator finds any in the project), use `--coffee=false`.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

Note that you can also achieve the same results by adding an `--appPath` option when starting generator:
```bash
yo angularfire-express [app-name] --appPath=public
```

## Testing

Running `grunt test` will run the unit tests with karma.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
