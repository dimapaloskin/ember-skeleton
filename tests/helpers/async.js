window.async = function(callback, timeout) {
  stop();

  timeout = setTimeout(function() {
    start();
    ok(false, "Timeout was reached");
  }, timeout || 200);

  return function() {
    clearTimeout(timeout);

    start();

    var args = arguments;
    return Ember.run(function() {
      return callback.apply(this, args);
    });
  };
}