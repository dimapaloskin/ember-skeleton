Ember.js Skeleton
=================

Skeleton for development and testing ember.js modules.
Dependent on:

 - node
 - npm
 - bower
 - grunt

----------

###Conventions

The input javascript file located in the `'packages/lib'` folder. Other files are included using directive `'require'`. The input less file located in 'packages/less' and his called `'main.less'`. Files for test must be located in `'packages/test'` folder and must have the prefix `'-test.js'` on the end. All handlebars templates located in the `'packages/templates'` folder. All templates builds in `'packages/lib/templates.js'`.

###Get started

**Installation**

    npm install 
    bower install

**Setup**

Change `package.json` and `bower.json` files.

**Running**

    grunt develop
    
Visit your app at http://localhost:8000/tests

**Testing**

    grunt test

**Building**

    grunt build
    
**Releasing**

    grunt release

