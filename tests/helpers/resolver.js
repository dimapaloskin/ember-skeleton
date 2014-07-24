window.customResolver = Ember.DefaultResolver.extend({
  parseName: function (fullName) {
    var nameParts = fullName.split(":"),
        type = nameParts[0], fullNameWithoutType = nameParts[1].replace('components/', ''),
        name = fullNameWithoutType,
        namespace = (type === 'template') ? Ember : Ember.get(this, 'namespace'),
        root = namespace;

    if (type !== 'template' && name.indexOf('/') !== -1) {
      var parts = name.split('/');
      name = parts[parts.length - 1];
      var namespaceName = Ember.String.capitalize(parts.slice(0, -1).join('.'));
      root = Namespace.byName(namespaceName);

      Ember.assert('You are looking for a ' + name + ' ' + type + ' in the ' + namespaceName + ' namespace, but the namespace could not be found', root);
    }

    var obj = {
      fullName: fullName,
      type: type,
      fullNameWithoutType: fullNameWithoutType,
      name: name,
      root: root,
      resolveMethodName: "resolve" + Ember.String.classify(type)
    };

    return obj;
  }
});